import React from 'react'
import { browserHistory } from 'react-router'
import ItemList from './ItemList'
import * as Cookies from 'js-cookie'

const Order = React.createClass({
  getInitialState() {
    return {order:{}, items:[], lastKey:0, list:[], prototype:{}}
  },

  componentDidMount() {
    this.props.func.itemList();
    this.props.func.orderInfo(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') === 'ORDER_INFO_SUCCESSED') {
      // $('.item.amount').text(newProps.manage.get('results')[0].amount);
      var order = newProps.manage.get('results').order;
      var items = newProps.manage.get('results').items;

      for(var k=0; k<items.length; k++) {
        items[k].key = k;
      }
      
      this.setState({
        order:order,
        items:items,
        lastKey:items.length-1,
        prototype: items[0],
      })
    }
    else if(newProps.manage.get('type') === 'FINISH_ORDER_SUCCESSED') {
      this.props.func.orderInfo(this.props.params.id);
    }
    if(newProps.service.get('type') === 'UPDATE_ORDER_SUCCESSED') {
    }
  },
  
  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  goBack() {
    browserHistory.goBack();
  },

  updateOrder() {
    if(this.state.order.status == 'PROCESSING' && Cookies.get('type') !== 'admin'){
      alert('出貨中之訂單無法修改!');
      return;
    }

    var itemList = this.props.manage.get('items');
    for(var k in this.state.items) {
      var index = itemList.findIndex((c)=>{
        return c.id == this.state.items[k].item;
      })
      if(parseInt(this.state.items[k].desired) > itemList[index].item_limit){
        alert(`${this.state.items[k].name}超出限額，請重新填寫!`);
        return;
      }
    }

    this.props.func.updateOrder(this.state.items, this.props.params.id);
  },

  itemSet(key, cate, value, val2) {
    var items = this.state.items;
    var order = this.state.order;
    var lastKey = this.state.lastKey;

    var index = items.findIndex((c)=>{
      return c.key == key;
    })

    if(cate == 'item') {
      items[index][cate] = parseInt(value);
    }
    else
      items[index][cate] = value;

    this.setState({items:items, order:order, lastKey:lastKey});
  },

  finishOrder(status) {
    var items = this.state.items;
    var obj = [];
    for(var k in items) {
      var item = items[k];
      item.export = item.desired;
      obj.push(item);
    }

    this.props.func.finishOrder(this.props.params.id, this.state.order.status, obj);
  },

  finishBtn() {
    if(this.state.order.order_type !== undefined){
      var type = this.state.order.order_type.trim();
      if(type == 'rent')
        return
    }

    if(Cookies.get('type') == 'admin') {
      let status = this.state.order.status;
      let finishBTNClass = 'ui button green';
      let finishBTNText = '完成訂單';
      if(status == 'FINISH'){
        finishBTNClass = 'ui button red';
        finishBTNText = '取消完成訂單';
      }
      return(
        <div className={finishBTNClass} onClick={ ()=>this.finishOrder(status) }>{finishBTNText}</div>
      )
    }  
    else{
      let status = this.state.order.status;
      let finishBTNText = '簽收訂單';
      let finishBTNClass = 'ui button green';
      if(status == 'PROCESSING'){
        return(
          <div className={finishBTNClass} onClick={ ()=>this.finishOrder(status) }>{finishBTNText}</div>
        )
      }
      else
        return

    }
  },

  itemAdd() {
    var state = this.state;
    var newobj = jQuery.extend({}, this.state.prototype)
    newobj.key = state.lastKey + 1; 
    newobj.desired = 1;
    newobj.msg = '';
    state.items.push(newobj);
    state.lastKey = newobj.key;

    this.setState(state);
  },

  removeItem(key) {
    var state = this.state;
    var index = state.items.findIndex((c)=>{
      return c.key == key;
    })
    state.items.splice(index, 1);
    this.setState(state);
  },

  render() {
    var style = {
      container: {
        maxWidth: '700px',
        height: '100%',
        margin: '0px auto',
      },
      mainSegment: {
        width: '95%',
        margin: '0px auto',
      },
      button: {
        width: '200px',
        height: '100px',
        margin: '0px auto',
        lineHeight: '40px',
        fontSize: '30px',
        textAlign: 'center',
      },
      title: {
        fontSize: '35px',
        fontWeight: 'bold',
        display: 'inline-block',
      },
      title2: {
        fontSize: '20px',
        display: 'inline-block',
      },
    }

    let manage = this.props.manage.toObject();
    let items = [];
    let status = '';
    let type = '';
    let typeNum = 0;
    let list = [];

    status = this.state.order.status;
    if(this.state.order.order_type !== undefined)
      type = this.state.order.order_type.trim();

    if(type == 'stationery'){
      type = '文具'; 
      typeNum = 1;
    }
    else if(type == 'consumable'){
      type = '耗材'; 
      typeNum = 0;
    }
    else if(type == 'rent'){
      type = '借物'; 
      typeNum = 2;
    }
    else if(type == 'activity'){
      type = '活動'; 
      typeNum = 3;
    }
    else if(type == 'repair'){
      type = '維修'; 
      typeNum = 4;
    }

    if(status == 'PENDING')
      status = '未完成';
    else if(status == 'PROCESSING')
      status = '出貨中';
    else if(status == 'FINISH')
      status = '已完成';

    if(manage.items[0] !== undefined){
      for(var k in manage.items) {
        if(manage.items[k].item_type == typeNum)
          list.push(manage.items[k]);
      }
    }

    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'>
          <div style={style.mainSegment}>
            <div className='ui segment'>

              <div style={style.title2}>申請單位:&nbsp;{ this.state.order.unit }</div><br/>

              <div style={style.title2}>訂單狀態:&nbsp;{ status }</div><br/>

              <div style={style.title2}>訂單類別:&nbsp;{ type }</div><br/>

              <div style={style.title2}>申請人:&nbsp;{ this.state.order.customer }</div><br/>

              <div style={style.title2}>申請項目:&nbsp;</div><br/>

              <ItemList items={this.state.items} itemSet={this.itemSet} list={list} type={type} removeItem={this.removeItem}/><br/>

              <span style={{color:'red'}}>*修改訂單後記得按 [修改訂單] 按鈕!</span><br/><br/>

              <div className='ui button' onClick={ ()=>this.goBack() }>回上一頁</div>
              <div className='ui button' onClick={ this.itemAdd }>增加一項</div>
              <div className='ui button' onClick={ this.updateOrder }>修改訂單</div>
              { this.finishBtn() }
              
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Order;
