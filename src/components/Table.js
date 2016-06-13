import React from 'react'
import * as Cookies from 'js-cookie'

const ItemRow = React.createClass({
  render() {
    return(
      <tr>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.amount}</td>
        <td></td>
        <td></td>
      </tr>
    )
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

  render() {
    var parseTime = this.parseTime(this.props.data[0].order_time);
    console.log(this.props.data);

    return(
      <table className='ui table'>
        <thead>
          <tr>
            <th>
              {`${this.props.index+1}.${this.props.data[0].unit}`}
            </th>
            <th>{`申請時間: ${parseTime}`}</th>
            <th>申請人:{ this.props.data[0].customer }</th>
            <th>簽收:</th>
          </tr>
          <tr>
            <th>品項</th>
            <th>數量</th>
            <th>確認</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.data.map((item, i)=>{
            return <ItemRow key={i} data={item} />
          })
        }
        </tbody>
      </table>
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
      this.setState({orders:orders});
    })
  },

  render() {
    return(
      <div>
      {
        this.state.orders.map((order, index)=>{
          return <Table key={index} data={order} index={index}/> 
        }) 
      }
      </div>
    )
  }
})

module.exports = Tables;
