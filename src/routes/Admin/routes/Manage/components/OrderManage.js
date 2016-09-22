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

  checkChange() {
    console.log('change');
    this.props.updateSelectedClick(this.props.data.id);
  },

  render() {
    var pareseTime = this.pareseTime;
    var type = ''; 

    if(this.props.data.order_type == 'stationery'){
      type = '文具'; 
    }
    else if(this.props.data.order_type == 'consumable'){
      type = '耗材'; 
    }
    else if(this.props.data.order_type.trim() == 'rent'){
      type = '借物'; 
    }
    else if(this.props.data.order_type.trim() == 'activity'){
      type = '活動'; 
    }
    else if(this.props.data.order_type.trim() == 'repair'){
      type = '維修'; 
    }
    else if(this.props.data.order_type.trim() == 'receive'){
      type = '領物'; 
    }

    var status = '';
    var statusStyle = {};

    if(this.props.data.status == 'PENDING'){
      status = '未完成';
      statusStyle = {color: 'red'}
    }
    else if(this.props.data.status == 'PROCESSING'){
      status = '出貨中';
      statusStyle = {color: 'orange'}
    }
    else if(this.props.data.status == 'FINISH'){
      status = '已完成';
      statusStyle = {color: 'green'}
    }

    return(
      <tr>
        <td><a onClick={ ()=>this.toPage('/order/'+this.props.data.id) }>{pareseTime(this.props.data.order_time)}</a></td>
        <td>{this.props.data.unit}</td>
        <td>{this.props.data.customer}</td>
        <td>{type}</td>
        <td><span style={statusStyle}>{status}</span></td>
        <td>
          <div className='ui order checkbox'>
            <input type='checkbox' defaultChecked={this.props.checked} onChange={this.checkChange}/>
            <label />
          </div>
        </td>
      </tr>
    )
  }
})

const OrderManage = React.createClass({
  getInitialState() {
    return {selected: {}};
  },

  updateSelectedClick(id) {
    var selected = this.state.selected;
    if(selected[id] == undefined) {
      selected[id] = true;
    }
    else {
      selected[id] = !selected[id];
    }
    this.setState({selected:selected});
  },

  updateSelected() {
    var checked = $('.order.checkbox').checkbox('is checked');
    var orders = this.props.manage.get('orders');
    var selected = this.state.selected;

    for(var k in orders) {
      if(checked[k]) {
        selected[orders[k].id] = true;
      }
      else {
        selected[orders[k].id] = false;
      }
    }

    this.setState({selected:selected});

  },

  getSelectedIds() {
    var ids = [];
    var selected = this.state.selected;
    for(var k in selected) {
      if(selected[k]) {
        ids.push(k);
      }
    }
    return ids;
  },

  componentDidMount() {
    var initPage = 0;
    if(Cookies.get('aop') !== undefined)
      initPage = Cookies.get('aop');
    else
      Cookies.set('aop', 0);

    this.props.func.orderList(initPage);
    $('.order.page').val(parseInt(initPage)+1);

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
      onChecked: ()=>{
        $('.order.checkbox').checkbox('check');
        this.updateSelected();
      }, 
      onUnchecked: ()=>{
        $('.order.checkbox').checkbox('uncheck');
        this.updateSelected();
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
    setTimeout(()=>{
      this.props.func.orderList(0);
    }, 2000);
  },

  partTable() {
    var selected = this.getSelectedIds();

    var gen = '_';

    for(var k in selected) {
      gen += selected[k] + '_';
    }

    var win = window.open(`/table/${gen}`, '_blank'); 
    win.focus();
    setTimeout(()=>{
      this.props.func.orderList(0);
    }, 2000);
  },

  finishSel() {
    var gen = this.getSelectedIds();

    this.props.func.finishSel(gen);
  },

  delSel() {
    var gen = this.getSelectedIds();

    $.ajax({
      url: '/api/delSel',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ids:gen, uid:Cookies.get('uid'), token:Cookies.get('token')}),
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
    Cookies.set('aop', page-1);
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
    var selected = this.state.selected;
    var updateSelectedClick = this.updateSelectedClick;

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
              return <OrderRow key={order.id} data={order} checked={selected[order.id]} updateSelectedClick={updateSelectedClick}/>
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = OrderManage;
