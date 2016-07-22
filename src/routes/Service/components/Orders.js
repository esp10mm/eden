import React from 'react'
import { browserHistory } from 'react-router'

const OrderRow = React.createClass({
  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

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

  pareseTime(timestamp) {
    var date = timestamp.split('T')[0];
    var time = timestamp.split('T')[1].split('.')[0];
    return date+' '+this.convertTimezone(time);
  },

  render() {
    var pareseTime = this.pareseTime;
    let order_type = this.props.data.order_type=='consumable'?'耗材':'文具';
    return(
      <tr>
        <td><a onClick={ ()=>this.toPage('/order/'+this.props.data.id)}>{pareseTime(this.props.data.order_time)}</a></td>
        <td>{order_type}</td>
        <td>{this.props.data.unit}</td>
        <td>{this.props.data.customer}</td>
      </tr>
    )
  }
})

const Orders = React.createClass({
  componentDidMount() {
    this.props.func.orderList(0, 1, this.props.auth.user.unit);
  },

  render() {
    var style = {
      title: {
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'inline-block',
      },
      sectionBtn: {
        marginTop: '3px',
      },
      section: {
        margin: '0px',
      },
    };

    return(
      <div className='active content'>
        <table className='ui striped table'>
          <thead>
            <tr>
              <th>時間</th>
              <th>類別</th>
              <th>單位</th>
              <th>申請人</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.manage.get('orders').map(function(order){
              return <OrderRow key={order.id} data={order}/> 
            })
          }
          </tbody>
        </table>
      </div>

    )
  },
})

module.exports = Orders;
