var qr = require('qr-image');
var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
var loginList = {};

app.use(express.static('dist'));
app.use(bodyParser.json());

var pg = require('pg');
var conString = "postgres://eden:526752@localhost/eden";

var method = {};


app.get('/code', function(req, res) {
  res.sendFile(`${__dirname}/code.zip`); 
})

app.get('/list', function(req, res) {
  res.sendFile(`${__dirname}/data/cards.json`); 
})

app.get('/qr', function(req, res) {
  var code = qr.image(req.query.t, {
    type: 'svg',
    size: 10,
  });
  res.type('svg');
  code.pipe(res);
})

app.get('/*', function(req, res) {
  res.sendFile(`${__dirname}/dist/index.html`); 
})

app.post('/login', (req, res)=>{
  var obj = {
    type: 'LOGIN_FAILED',
    token: tokenGen(),
    userType: 'normal',
  }

  var query = `select users.id, users.user_type, users.unit, unit.name from users, unit where username='${req.body.account}' and psw='${req.body.password}' and users.unit=unit.id`;

  pgquery(query, (result)=>{
    if(result.rows.length == 1) {
      obj.type = 'LOGIN_SUCCESS'; 
      obj.uid = result.rows[0].id;
      obj.unit = result.rows[0].unit;

      if(loginList[obj.token] === undefined){
        loginList[obj.token] = {
          uid:result.rows[0].id,
          user_type:result.rows[0].user_type.trim(),
          unit: result.rows[0].unit,
        };  
      }

      obj.userType = result.rows[0].user_type.trim();
      obj.user = loginList[obj.token];
      obj.user.unitName = result.rows[0].name;
    }
    res.send(obj);
  })

})

app.post('/api/:name', function(req, res){
  var api = req.params.name;

  var obj = {
    type: 'LOGIN_FAILED',
    token: req.body.token,
  }

  var apiNormal = [
    'itemList',
    'unitList',
    'orderList',
    'orderInfo',
    'consumeableOrder',
    'updateOrder',
    'getRecent',
  ]

  var apiUser = [
    'checkToken',
    'ureset',
  ]

  var apiAdmin = [
    'addItem', 
    'delItem', 
    'inout', 
    'finishOrder',
    'finishSel',
    'setPrice',
    'setOrder',
    'delSel',
    'userList',
    'addUser',
    'removeUser',
    'editUser',
    'addUnit',
    'removeUnit',
    'editUnit',
  ];

  var apiSuper = [
    'itemInfo',
    'getTable',
    'getYearRange',
    'statistics',
  ];
  
  if(apiNormal.indexOf(api) != -1){
    obj.type = 'LOGIN_SUCCESS'; 
  }
  else if(loginList[req.body.token] !== undefined) {
    if(apiUser.indexOf(api)!=-1){
      obj.type = 'LOGIN_SUCCESS'; 
    }
    else if(loginList[req.body.token].user_type!='user' && apiSuper.indexOf(api)!=-1){
      obj.type = 'LOGIN_SUCCESS'; 
    }
    else if(loginList[req.body.token].user_type=='admin' && apiAdmin.indexOf(api)!=-1){
      obj.type = 'LOGIN_SUCCESS'; 
    }
    else{
      // console.log('unknown');
      // console.log(api);
      res.send(obj);
      return;
    }
  }
  else{
    // console.log('no token');
    //   console.log(obj);
    // console.log(api);
    res.send(obj);
    return;
  }
  // console.log(api);
  method[api](obj, req.body, res);

  return;
}); 

method.checkToken = (obj, body, res)=>{
  if(loginList[body.token] !== undefined)
    obj.user = loginList[body.token];
  res.send(obj);
}

method.addItem = (obj, body, res)=> {
  var query = '';

  console.log(body.type);
  query = `INSERT INTO warehouse (name, amount, item_type) VALUES ('${body.name}', '0', '${body.type}');`

  pgquery(query, (result)=>{
    obj.type = 'ADDITEM_SUCCESSED';
    res.send(obj);
  })
}

method.delItem = (obj, body, res)=> {
  var query = '';

  query = `DELETE FROM warehouse WHERE name = '${body.name}';`
  // console.log(query);
  pgquery(query, (result)=>{
    // console.log(result);
    obj.type = 'DELITEM_SUCCESSED';
    res.send(obj);
  })
}

method.itemList = (obj, body, res)=>{
  var query = 'SELECT * FROM warehouse ORDER BY item_order ASC;'; 

  obj = {
    type: 'ITEM_LIST_SUCCESSED',
    results: [],
  }

  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj); 
  })
}

method.unitList = (obj, body, res)=>{
  var query = 'SELECT * FROM unit;'; 

  obj = {
    type: 'UNIT_LIST_SUCCESSED',
    results: [],
  }

  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj); 
  })
}

method.orderList = (obj, body, res)=> {
  var limit = '';
  var limit2 = 'limit 10';
  var unit = '';

  if(body.limit == 1){
    limit = `AND orders.status='PENDING' `
    limit2 = '';
  }
  if(body.unit !== undefined)
    unit = `and orders.unit=${body.unit} `

  var query = `select orders.id, orders.order_time, orders.status, orders.order_type, orders.customer, unit.name unit ` +
    `from orders, unit where orders.unit = unit.id ${unit} ${limit}` +
    `ORDER BY order_time DESC ${limit2} offset ${body.page*10}`;

  obj = {
    type: 'ORDER_LIST_SUCCESSED',
    results: [],
  }

  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj)
  })
}

method.inout = (obj, body, res)=>{
  var query = `UPDATE warehouse `;
  
  if(body.method == 'in' && body.donation)
    query += 'SET donation = donation+'+body.value;
  else if(body.method == 'out' && body.donation)
    query += 'SET donation = donation-'+body.value;
  else if(body.method == 'in')
    query += 'SET amount = amount+'+body.value;
  else if(body.method == 'out')
    query += 'SET amount = amount-'+body.value;

  query += ` WHERE name='${body.name}'`;

  obj = {
    type: 'INOUT_SUCCESSED',
  }

  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj); 
  })
}

method.itemInfo = (obj, body, res)=>{
  var query = `SELECT * FROM warehouse WHERE name='${body.name}'`;
  obj = {
    type: 'ITEM_INFO_SUCCESSED',
  }
  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj); 
  })
}

method.orderInfo = (obj, body, res)=>{
  var query = `select a.item, a.msg, a.amount as desired, a.export, a.export_dona, a.id, b.name, b.amount, b.donation, b.item_type from orders_item a, warehouse b where a.id = '${body.oid}' and a.item = b.id;`
  obj = {
    type: 'ORDER_INFO_SUCCESSED',
    results: {},
  }
  pgquery(query, (result)=>{

    obj.results.items = result.rows;

    query = `select orders.id, orders.order_type, orders.order_time, orders.customer, orders.status, unit.name unit ` +
      `from orders, unit where orders.unit = unit.id AND orders.id='${body.oid}'`;
    pgquery(query, (result)=>{
    
      obj.results.order = result.rows[0];
      res.send(obj); 
    })
  })
}

method.consumeableOrder = (obj, body, res)=>{
  var order_type = 'consumable';

  for(var k in body.order){
    if(body.order[k].note !== undefined)
      order_type = 'stationery'; 
    break;
  }

  var query = `INSERT INTO orders (unit, order_time, status, customer, order_type) VALUES ('${body.unit}', now(), 'PENDING', '${body.customer}', '${order_type}');`;

  for(var item in body.order) {
    var msg = body.order[item].note;
    var amount = body.order[item];
    if(msg === undefined)
      msg = '';
    if(body.order[item].amount !== undefined)
      amount = body.order[item].amount;

    query += `INSERT INTO orders_item (id, item, amount, export, msg) SELECT max(id), '${item}', '${amount}', '${amount}', '${msg}' from orders;`
  }  

  obj = {
    type: 'CONSUME_ORDER_SUCCESSED',
  }

  pgquery(query, (result)=>{
    res.send(obj);
  })
}

method.updateOrder = (obj, body, res)=>{
  var query = `delete from orders_item WHERE id=${body.oid};`;

  for(var item in body.items) {
    var msg = body.items[item].msg;
    var amount = body.items[item].desired;

    query += `INSERT INTO orders_item (id, item, amount, export, msg) values('${body.oid}', '${body.items[item].item}', '${amount}', '${amount}', '${msg}');`
  }  

  obj = {
    type: 'UPDATE_ORDER_SUCCESSED',
  }
  
  pgquery(query, (result)=>{
    res.send(obj);
  })
}

method.finishOrder = (obj, body, res)=>{
  var status = 'FINISH';
  var query = ``;
  var op = '-';

  if(body.status == 'FINISH') {
    status = 'PENDING';
    op = '+';
  }

  for(var k in body.items) {
    var itemexport = body.items[k].export;
    var itemexport_dona = body.items[k].export_dona;

    if(itemexport === undefined)
      itemexport = 0;
    if(itemexport_dona === undefined)
      itemexport_dona = 0;

    query += `UPDATE warehouse set amount=amount${op}${itemexport} WHERE id=${body.items[k].item};`; 
    query += `UPDATE warehouse set donation=donation${op}${itemexport_dona} WHERE id=${body.items[k].item};`; 
    query += `UPDATE orders_item set export=${itemexport}, export_dona=${itemexport_dona} WHERE item=${body.items[k].item} and id=${body.oid};`;
  }

  query += `UPDATE orders set status='${status}' WHERE id=${body.oid};`;

  obj = {
    type: 'FINISH_ORDER_SUCCESSED',
  }
  
  pgquery(query, (result)=>{
    res.send(obj);
  })
}

method.finishSel = (obj, body, res)=>{
  
  var query = ``;

  for(var k in body.oids) {
    query += `UPDATE warehouse set amount=warehouse.amount-b.export from warehouse d join orders_item b on b.id=${body.oids[k]};`; 
    query += `UPDATE orders set status='FINISH' WHERE id=${body.oids[k]};`;
  }
  
  obj = {
    type: 'FINISH_SEL_SUCCESSED',
  }

  pgquery(query, (result)=>{
    res.send(obj);
  })
}

method.getTable = (obj, body, res)=>{
  var ids_str = '';

  for(var k in body.ids) {
    if(body.ids[k] != '') {
      ids_str += `${body.ids[k]},`;
    }
  }

  var query = ``;

  if(ids_str.length > 0) {
    ids_str = ids_str.slice(0, -1);
    query = `select a.customer, d.name, d.item_order, c.name as unit, b.msg, b.amount, a.id, a.order_type, a.order_time from orders a, orders_item b, unit c, warehouse d where d.id=b.item and b.id=a.id and c.id=a.unit and a.id in (${ids_str}) ORDER BY a.unit, a.order_type ASC;`;

    for(var k in body.ids){
      if(body.ids[k] != '') {
        query += `UPDATE orders SET status='PROCESSING' WHERE id=${body.ids[k]};`
      }
    }
  }

  else{
    query = `select a.customer, d.name, d.item_order, c.name as unit, b.msg, b.amount, a.id, a.order_type, a.order_time from orders a, orders_item b, unit c, warehouse d where d.id=b.item and b.id=a.id and (a.status='PENDING' or a.status='PROCESSING') and c.id=a.unit ORDER BY a.unit, order_type ASC;`;

    query += `UPDATE orders SET status='PROCESSING' WHERE status='PENDING';`
  }

  pgquery(query, (result)=>{
    obj.result = result.rows;
    res.send(obj);
  })
}

method.getYearRange = (obj, body, res)=>{
  var query = `select to_char(min(orders.order_time),'YYYY') as year_min, to_char(max(orders.order_time),'YYYY') as year_max  from orders;`;  

  pgquery(query, (result)=>{
    obj.max = result.rows[0].year_max;  
    obj.min = result.rows[0].year_min;  
    res.send(obj);
  })
}

method.statistics = (obj, body, res)=>{
  var unit = `and a.unit=${body.unit} `;
  
  if(body.unit == 'all' || body.unit == 'sum')
    unit = ';'

  var query = `select a.id, a.unit, b.item, b.export, b.export_dona, to_char(a.order_time, 'MM') as month, c.id from orders a, orders_item b, unit c where to_char(a.order_time, 'YYYY')='${body.year}' and a.id=b.id and a.unit=c.id ${unit}`;

  pgquery(query, (result)=>{
    obj.orders_item = result.rows;  
    var query = `select c.id, c.name from unit c`;

    pgquery(query, (result)=>{
      obj.unit = result.rows;
      var query = `select d.id, d.name, d.price from warehouse d;`

      pgquery(query, (result)=>{
        obj.warehouse = result.rows;
        res.send(obj);
      })
    })
  })
}

method.setPrice = (obj, body, res)=>{
  var query = `update warehouse set price=${body.price} where id=${body.item}`;
  pgquery(query, (result)=>{
    res.send(obj);
  })
}

method.getRecent =(obj, body, res)=>{
  var query=`select b.item from orders_item b, orders a where a.id=b.id and a.order_time=(select max(order_time) from orders where unit=${body.unit});`;

  pgquery(query, (result)=>{
    obj.items = result.rows;
    res.send(obj);
  })
}

method.ureset =(obj, body, res)=>{
  var query = `update users set psw='${body.pwd}' where id=${body.uid};`;

  console.log(query);
  pgquery(query, (result)=>{
    obj.type = 'USER_SET_SUCCESS';
    res.send(obj);
  })
}

method.delSel =(obj, body, res)=>{
  var condition = ''
  for(var i=0; i<body.ids.length; i++) {
    if(i == body.ids.length-1)
      condition += `id=${body.ids[i]}`;
    else
      condition += `id=${body.ids[i]} OR `;
  }
  var query = `delete from orders where ${condition};`;
  query += `delete from orders_item where ${condition};`;

  pgquery(query, (result)=>{
    obj.type = 'ORDER_DELETE_SUCCESS';
    res.send(obj);
  })
}

method.setOrder =(obj, body, res)=>{
  var query = `UPDATE warehouse set item_order = ${body.order} where id= ${body.item};`;

  pgquery(query, (result)=>{
    obj.type = 'SET_ORDER_SUCCESS';
    res.send(obj);
  })
}

method.userList = (obj, body, res)=>{
  var query = `select username, user_type, unit, users.name, users.id , unit.name as unit_name from users, unit where users.unit=unit.id`;

 pgquery(query, (result)=>{
   obj.type = 'USER_LIST_SUCCESS';
   obj.result = result.rows;
   res.send(obj);
 })
}

method.addUser = (obj, body, res)=>{
  var newusername = `new_${parseInt(Math.random()*10000)}`;
  var query = `INSERT INTO users (username, psw, user_type, name, unit) select '${newusername}', '0000', 'user', '新用戶', FIRST(id) from unit ;`

  pgquery(query, (result)=>{
    obj.type = 'ADD_USER_SUCCESS';
    obj.result = result.rows;
    res.send(obj);
  })
}

method.removeUser = (obj, body, res)=>{
  var query = `DELETE FROM users WHERE id=${body.id}`;

  pgquery(query, (result)=>{
    obj.type = 'REMOVE_USER_SUCCESS';
    res.send(obj);
  })
}

method.editUser = (obj, body, res)=>{
  var query = ``; 

  for(var k in body.users){
    var user = body.users[k];
    query += `update users set user_type='${user.user_type}', username='${user.username}', name='${user.name}', unit=${user.unit} where id=${user.id};`;
  }

  pgquery(query, (result)=>{
    obj.type = 'EDIT_USER_SUCCESS';
    res.send(obj);
  })
}

method.addUnit = (obj, body, res)=>{
  var query = `INSERT INTO unit (name) VALUES('新組別');`

  pgquery(query, (result)=>{
    obj.type = 'ADD_UNIT_SUCCESS';
    obj.result = result.rows;
    res.send(obj);
  })
}

method.removeUnit = (obj, body, res)=>{
  var query = `DELETE FROM unit WHERE id=${body.id}`;

  pgquery(query, (result)=>{
    obj.type = 'REMOVE_UNIT_SUCCESS';
    res.send(obj);
  })
}

method.editUnit = (obj, body, res)=>{
  var query = ``; 

  for(var k in body.unit){
    var unit = body.unit[k];
    query += `update unit set name='${unit.name}' where id=${unit.id};`;
  }

  pgquery(query, (result)=>{
    obj.type = 'EDIT_UNIT_SUCCESS';
    res.send(obj);
  })
}

const pgquery = (query, cb)=> {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      console.log('query:'+query);
      var result = {rows:[]};
      cd(result);
      return console.error('could not connect to postgres', err);
    }
    client.query(query, function(err, result) {
      done();

      if(err) {
        console.log('query:'+query);
        var result = {rows:[]};
        cb(result);
        return console.error('error running query', err);
      }
      cb(result);
    });
  });
}

const tokenGen = ()=> {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 10; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text; 
}

app.listen(80);
