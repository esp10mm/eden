import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const OrderRow = React.createClass({
  toPage(path) {
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
    var status = this.props.data.status=='FINISH'?'完成':'未完成';
    var statusStyle = this.props.data.status=='FINISH'?{color:'green'}:{color:'red'};
    var type = this.props.data.order_type=='consumable'?'耗材':'文具';

    return(
      <tr>
        <td><a onClick={ ()=>this.toPage('/order/'+this.props.data.id) }>{pareseTime(this.props.data.order_time)}</a></td>
        <td>{this.props.data.unit}</td>
        <td>{this.props.data.customer}</td>
        <td>{type}</td>
        <td><span style={statusStyle}>{status}</span></td>
        <td>
          <div className='ui order checkbox'>
            <input type='checkbox' />
            <label />
          </div>
        </td>
      </tr>
    )
  }
})

const OrderManage = React.createClass({
  componentDidMount() {
    this.props.func.orderList(0);
    $('.order.page').val('1');
    $('.order.page').change(()=>{
      var page = parseInt($('.order.page').val());
      if(isNaN(page)) {
        $('.order.page').val('1');
        this.props.func.orderList(0);
      }
      else
        this.props.func.orderList(page-1);
    })
    $('.selectAll.checkbox').checkbox().first().checkbox({
      onChange: ()=>{
        $('.order.checkbox').checkbox('toggle');
      } 
    })
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') == 'ORDER_LIST_SUCCESSED') {
    }
    else if(newProps.manage.get('type') == 'FINISH_SEL_SUCCESSED') {
      var page = parseInt($('.order.page').val());
      if(isNaN(page)) {
        $('.order.page').val('1');
        this.props.func.orderList(0);
      }
      else
        this.props.func.orderList(page-1);
    }
  },

  tableGen() {
    var win = window.open('/table/_', '_blank'); 
    win.focus();
  },

  partTable() {
    var checked = $('.order.checkbox').checkbox('is checked');
    var orders = this.props.manage.get('orders');

    var gen = '_';

    for(var k in checked) {
      if(checked[k])
        gen += orders[k].id + '_';
    }

    var win = window.open(`/table/${gen}`, '_blank'); 
    win.focus();
  },

  finishSel() {
    var checked = $('.order.checkbox').checkbox('is checked');
    var orders = this.props.manage.get('orders');

    var gen = [];

    for(var k in checked) {
      if(checked[k])
        gen.push(orders[k].id);
    }
    
    this.props.func.finishSel(gen);
  },

  delSel() {
    var checked = $('.order.checkbox').checkbox('is checked');
    var orders = this.props.manage.get('orders');

    var gen = [];

    for(var k in checked) {
      if(checked[k])
        gen.push(orders[k].id);
    }

    $.ajax({
      url: '/api/delSel',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ids:gen, uid:Cookies.get('uid')}),
    }) 
    .done((res)=>{
      alert('刪除訂單成功!');
      var page = parseInt($('.order.page').val());
      if(isNaN(page)) {
        $('.order.page').val('1');
        this.props.func.orderList(0);
      }
      else
        this.props.func.orderList(page-1);
    })
  },

  nextPage(next) {
    var page = parseInt($('.order.page').val());
    page = page + next;

    if(page < 1)
      page = 1;

    $('.order.page').val(''+page);
    this.props.func.orderList(page-1);
  },

  adminRender(num){
    var style = {
      pageInput: {
        width: 70,
        marginTop: '5px',
      },
      button: {
        marginTop: '5px',
      }
    }
    if(Cookies.get('type') != 'admin') 
      return;
    else if(num == 0){
      return(
        <div className='ui button' style={style.button} onClick={()=>this.finishSel()}>完成勾選的訂單</div>
      )
    }
    else if(num == 1){
      return(
        <div className='ui button' style={style.button} onClick={()=>this.delSel()}>刪除勾選的訂單</div>
      )
    }
  },

  render() {
    var style = {
      pageInput: {
        width: 70,
        marginTop: '5px',
      },
      button: {
        marginTop: '5px',
      }
    }
    return(
      <div className='content'>
        <div className='ui button' style={style.button} onClick={()=>this.nextPage(-1)}>前一頁</div>
        第&nbsp;
        <div className='ui mini input' style={style.pageInput}>
          <input type='text' className='order page'/>
        </div>&nbsp;
        <div className='ui button' style={style.button} onClick={()=>this.nextPage(1)}>下一頁</div>
        <div className='ui button' style={style.button} onClick={()=>this.tableGen()}>產生所有出貨單</div>
        <div className='ui button' style={style.button} onClick={()=>this.partTable()}>產生勾選的出貨單</div>

        {this.adminRender(0)}

        {this.adminRender(1)}

        <table className='ui striped table'>
          <thead>
            <tr>
              <th>時間</th>
              <th>單位</th>
              <th>申請人</th>
              <th>類別</th>
              <th>狀態</th>
              <th>
                <div className='ui selectAll checkbox'>
                  <input type='checkbox' />
                  <label />
                </div>
              </th>
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
  }
})

module.exports = OrderManage;
