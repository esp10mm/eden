import React from 'react'
import * as Cookies from 'js-cookie'

const ItemRow = React.createClass({
  render() {
    if(this.props.data2 !== undefined){
      return(
        <tr>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.amount}</td>
          <td>{this.props.data.msg}</td>
          <td>{this.props.data2.name}</td>
          <td>{this.props.data2.amount}</td>
          <td>{this.props.data2.msg}</td>
        </tr>
      )
    }
    else{
      return(
        <tr>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.amount}</td>
          <td>{this.props.data.msg}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    }
  }
})

const Table = React.createClass({
  convertTimezone(time) {
    var hour = parseInt(time.split(':')[0]);
    hour += 8;
    if(hour > 23)
      hour -= 24;
    if(hour < 10)
      return '0'+hour+':'+time.split(':')[1]+':'+time.split(':')[2];
    else
      return hour+':'+time.split(':')[1]+':'+time.split(':')[2];
  },

  parseTime(timestamp) {
    var date = timestamp.split('T')[0];
    // var time = timestamp.split('T')[1].split('.')[0];
    return date;
  },

  tableHead1() {
    var parseTime = '申請時間:'+this.parseTime(this.props.data[0].order_time);
    var unit = this.props.data[0].unit.trim();
    var customer = '申請人:'+this.props.data[0].customer;

    return(
      <tr>
        <th style={{'width':'23%'}}>{parseTime}</th>
        <th style={{'width':'10%'}}>{unit}</th>
        <th style={{'width':'16%'}}>{customer}</th>
        <th style={{'width':'23%'}}/>
        <th style={{'width':'10%'}}>簽收:</th>
        <th style={{'width':'16%'}}/>
      </tr>
    )
  },

  tableHead2() {
    return(
      <tr>
        <th>品項</th>
        <th>數量</th>
        <th>備註(說明)</th>
        <th>品項</th>
        <th>數量</th>
        <th>備註(說明)</th>
      </tr>
    )
  },

  tableBody() {
    var bias = 0;
    if(this.props.data.length%2 == 0)
      bias = this.props.data.length/2;
    else
      bias = (this.props.data.length+1)/2;
    return(
      this.props.data.map((item, i)=>{
        if(i >= bias)
          return
        else if(this.props.data[i+bias] == undefined)
          return <ItemRow key={i} data={item} />
        else
          return <ItemRow key={i} data={item} data2={this.props.data[i+bias]} />
      })
    )
  },

  render() {
    var tableStyle = {pageBreakInside:'avoid'};
    return(
      <div>
        <table className='ui table' style={tableStyle}>
          <thead>
            { this.tableHead1() }
          </thead>
          <thead>
            { this.tableHead2() }
          </thead>
          <tbody>
            { this.tableBody() }
          </tbody>
        </table><br/>
      </div>
    )
  }
})

const Tables = React.createClass({
  getInitialState() {
    return {
      orders: [],
    }
  },

  componentDidMount() {
    $('body').css('overflow', 'scroll');
    var ids = this.props.params.ids.split('_');
    $.ajax({
      url: '/api/getTable',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({token: Cookies.get('token'), ids:ids, uid: Cookies.get('uid')}),
    })
    .done((res)=>{
      var orders = [];
      var orders_list = [];

      for(var k in res.result) {
        var id = res.result[k].id;

        if(orders_list.indexOf(id) != -1)
          orders[orders_list.indexOf(id)].push(res.result[k]);
        else {
          orders_list.push(id);
          orders[orders_list.indexOf(id)] = [res.result[k]];
        }
      }
      // console.log(orders);
      for(var k in orders) {
        orders[k].sort((a,b)=>{
          return a.item_order - b.item_order;
        }) 
      }
      this.setState({orders:orders});
    })
  },

  render() {
    var previousUnit = null;

    return(
      <div>
      {
        this.state.orders.map((order, index)=>{
          if(order[0].unit == previousUnit || index == 0){
            previousUnit = order[0].unit;
            return <Table key={index} data={order} index={index}/> 
          }
          else {
            previousUnit = order[0].unit;
            return(
              <div>
                <Table key={index} data={order} index={index}/> 
              </div>
            )
          }
        }) 
      }
      </div>
    )
  }
})

module.exports = Tables;
