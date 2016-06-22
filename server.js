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
  }

  var query = `select id from users where username='${req.body.account}' and psw='${req.body.password}'`;

  pgquery(query, (result)=>{
    if(result.rows.length == 1) {
      obj.type = 'LOGIN_SUCCESS'; 
      obj.uid = result.rows[0].id;

      if(loginList[obj.uid] === undefined)
        loginList[obj.uid] = [];  

      loginList[obj.uid].push(obj.token);
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

  var apiWhitelist = [
    'itemList',
    'unitList',
    'orderList',
    'orderInfo',
    'consumeableOrder',
    'updateOrder',
    'getRecent',
  ]

  // obj.type = 'LOGIN_SUCCESS'; 
  if(req.body.uid !== undefined) {
    if(loginList[req.body.uid] === undefined)
      loginList[req.body.uid] = [];
    if(loginList[req.body.uid].indexOf(req.body.token) != -1)
      obj.type = 'LOGIN_SUCCESS'; 
  }
  else if(apiWhitelist.indexOf(api) == -1) {
    res.send(obj);
    return;
  }

  switch(api) {
    case 'addItem': 
      addItem(obj, req.body, res);
      return;
    case 'delItem': 
      delItem(obj, req.body, res);
      return;
    case 'itemList': 
      itemList(obj, req.body, res);
      return;
    case 'unitList': 
      unitList(obj, req.body, res);
      return;
    case 'inout': 
      inout(obj, req.body, res);
      return;

    case 'itemInfo': 
      itemInfo(obj, req.body, res);
      return;
    case 'orderInfo': 
      orderInfo(obj, req.body, res);
      return;

    case 'consumeableOrder': 
      consumeableOrder(obj, req.body, res);
      return;
    case 'updateOrder': 
      updateOrder(obj, req.body, res);
      return;
    case 'orderList':
      orderList(obj, req.body, res);
      return;
    case 'finishOrder':
      finishOrder(obj, req.body, res);
      return;
    case 'finishSel':
      finishSel(obj, req.body, res);
      return;

    case 'getTable':
      getTable(obj, req.body, res);
      return;
    case 'getYearRange':
      getYearRange(obj, req.body, res);
      return;
    case 'statistics':
      statistics(obj, req.body, res);
      return;
    case 'getRecent':
      getRecent(obj, req.body, res);
      return;
    case 'setPrice':
      setPrice(obj, req.body, res);
      return;
    case 'ureset':
      ureset(obj, req.body, res);
      return;
    case 'delSel':
      delSel(obj, req.body, res);
      return;
  }

  res.send(obj);
  return;
}); 

const addItem = (obj, body, res)=> {
  var query = '';

  query = `INSERT INTO warehouse (name, amount) VALUES ('${body.name}','0');`

  pgquery(query, (result)=>{
    obj.type = 'ADDITEM_SUCCESSED';
    res.send(obj);
  })
}

const delItem = (obj, body, res)=> {
  var query = '';

  query = `DELETE FROM warehouse WHERE name = '${body.name}';`
  // console.log(query);
  pgquery(query, (result)=>{
    // console.log(result);
    obj.type = 'DELITEM_SUCCESSED';
    res.send(obj);
  })
}

const itemList = (obj, body, res)=>{
  var query = 'SELECT * FROM warehouse ORDER BY id ASC;'; 

  obj = {
    type: 'ITEM_LIST_SUCCESSED',
    results: [],
  }

  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj); 
  })
}

const unitList = (obj, body, res)=>{
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

const orderList = (obj, body, res)=> {
  var limit = '';
  if(body.limit == 1)
    limit = `AND orders.status='PENDING' `
  var query = `select orders.id, orders.order_time, orders.status, orders.customer, unit.name unit ` +
    `from orders, unit where orders.unit = unit.id ${limit}` +
    `ORDER BY order_time DESC limit 10 offset ${body.page*10}`;

  obj = {
    type: 'ORDER_LIST_SUCCESSED',
    results: [],
  }

  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj)
  })
}

const inout = (obj, body, res)=>{
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

const itemInfo = (obj, body, res)=>{
  var query = `SELECT * FROM warehouse WHERE name='${body.name}'`;
  obj = {
    type: 'ITEM_INFO_SUCCESSED',
  }
  pgquery(query, (result)=>{
    obj.results = result.rows;
    res.send(obj); 
  })
}

const orderInfo = (obj, body, res)=>{
  var query = `select a.item, a.amount as desired, a.export, a.export_dona, a.id, b.name, b.amount, b.donation from orders_item a, warehouse b where a.id = '${body.oid}' and a.item = b.id;`
  obj = {
    type: 'ORDER_INFO_SUCCESSED',
    results: {},
  }
  pgquery(query, (result)=>{

    obj.results.items = result.rows;

    query = `select orders.id, orders.order_time, orders.customer, orders.status, unit.name unit ` +
      `from orders, unit where orders.unit = unit.id AND orders.id='${body.oid}'`;
    pgquery(query, (result)=>{
    
      obj.results.order = result.rows[0];
      res.send(obj); 
    })
  })
}

const consumeableOrder = (obj, body, res)=>{
  var query = `INSERT INTO orders (unit, order_time, status, customer) VALUES ('${body.unit}', now(), 'PENDING', '${body.customer}');`;

  for(var item in body.order) {
    query += `INSERT INTO orders_item (id, item, amount, export) SELECT max(id), '${item}', '${body.order[item]}', '${body.order[item]}' from orders;`
  }  

  obj = {
    type: 'CONSUME_ORDER_SUCCESSED',
  }

  pgquery(query, (result)=>{
    res.send(obj);
  })
}

const updateOrder = (obj, body, res)=>{
  var query = ``;

  for(var item in body.amount) {
    query += `UPDATE orders_item set amount=${body.amount[item]} WHERE item=${item} AND id=${body.oid};`;
  }

  obj = {
    type: 'UPDATE_ORDER_SUCCESSED',
  }
  
  pgquery(query, (result)=>{
    res.send(obj);
  })
}

const finishOrder = (obj, body, res)=>{
  var status = 'FINISH';
  var query = ``;
  var op = '-';

  if(body.status == 'FINISH') {
    status = 'PENDING';
    op = '+';
  }

  for(var k in body.items) {
    query += `UPDATE warehouse set amount=amount${op}${body.items[k].export} WHERE id=${body.items[k].item};`; 
    query += `UPDATE warehouse set donation=donation${op}${body.items[k].export_dona} WHERE id=${body.items[k].item};`; 
    query += `UPDATE orders_item set export=${body.items[k].export}, export_dona=${body.items[k].export_dona} WHERE item=${body.items[k].item} and id=${body.oid};`;
  }

  query += `UPDATE orders set status='${status}' WHERE id=${body.oid};`;

  obj = {
    type: 'FINISH_ORDER_SUCCESSED',
  }
  
  pgquery(query, (result)=>{
    res.send(obj);
  })
}

const finishSel = (obj, body, res)=>{
  
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

const getTable = (obj, body, res)=>{
  var ids_str = '';

  for(var k in body.ids) {
    if(body.ids[k] != '') {
      ids_str += `${body.ids[k]},`;
    }
  }

  var query = ``;

  if(ids_str.length > 0) {
    ids_str = ids_str.slice(0, -1);
    query = `select a.customer, d.name, c.name as unit, b.amount, a.id, a.order_time from orders a, orders_item b, unit c, warehouse d where d.id=b.item and b.id=a.id and a.status='PENDING' and c.id=a.unit and a.id in (${ids_str});`;
  }

  else
    query = `select a.customer, d.name, c.name as unit, b.amount, a.id, a.order_time from orders a, orders_item b, unit c, warehouse d where d.id=b.item and b.id=a.id and a.status='PENDING' and c.id=a.unit;`;

  pgquery(query, (result)=>{
    obj.result = result.rows;
    res.send(obj);
  })
}

const getYearRange = (obj, body, res)=>{
  var query = `select to_char(min(orders.order_time),'YYYY') as year_min, to_char(max(orders.order_time),'YYYY') as year_max  from orders;`;  

  pgquery(query, (result)=>{
    obj.max = result.rows[0].year_max;  
    obj.min = result.rows[0].year_min;  
    res.send(obj);
  })
}

const statistics = (obj, body, res)=>{
  var unit = `and a.unit=${body.unit} `;
  
  if(body.unit == 'all' || body.unit == 'sum')
    unit = ';'

  var query = `select a.id, a.unit, b.item, b.export, b.export_dona, to_char(a.order_time, 'MM') as month, c.id from orders a, orders_item b, unit c where to_char(a.order_time, 'YYYY')='${body.year}' and a.id=b.id and a.unit=c.id ${unit}`;

  pgquery(query, (result)=>{
    obj.orders_item = result.rows;  
    var query = `select c.id, c.name from unit c`;

    pgquery(query, (result)=>{
      obj.unit = result.rows;
      var query = `select d.id, d.name from warehouse d;`

      pgquery(query, (result)=>{
        obj.warehouse = result.rows;
        res.send(obj);
      })
    })
  })
}

const setPrice = (obj, body, res)=>{
  var query = `update warehouse set price=${body.price} where id=${body.item}`;
  pgquery(query, (result)=>{
    res.send(obj);
  })
}

const getRecent =(obj, body, res)=>{
  var query=`select b.item from orders_item b, orders a where a.id=b.id and a.order_time=(select max(order_time) from orders where unit=${body.unit});`;

  pgquery(query, (result)=>{
    obj.items = result.rows;
    res.send(obj);
  })
}

const ureset =(obj, body, res)=>{
  var query = `update users set username='${body.username}', psw='${body.pwd}' where id=${body.uid};`;

  console.log(query);
  pgquery(query, (result)=>{
    obj.type = 'USER_SET_SUCCESS';
    res.send(obj);
  })
}

const delSel =(obj, body, res)=>{
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

const pgquery = (query, cb)=> {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      cb(result);
      return console.error('could not connect to postgres', err);
    }
    client.query(query, function(err, result) {
      done();

      if(err) {
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
