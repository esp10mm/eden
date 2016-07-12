import React from 'react'
import { browserHistory } from 'react-router'
import ItemList from './ItemList'

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
    else if(newProps.service.get('type') === 'UPDATE_ORDER_SUCCESSED') {
      alert('修改訂單成功!');
    }
  },
  
  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  updateOrder() {
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
    status = status=='PENDING'?'未出貨':'已出貨'; 
    type = this.state.order_type=='stationery'?'文具':'耗材';
    typeNum = this.state.order.order_type=='stationery'?1:0;

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

              <ItemList items={this.state.items} itemSet={this.itemSet} list={list} removeItem={this.removeItem}/><br/>

              <span style={{color:'red'}}>*修改訂單後記得按 [修改訂單] 按鈕!</span><br/><br/>

              <div className='ui button' onClick={ ()=>this.toPage('/service') }>回申請頁面</div>
              <div className='ui button' onClick={ this.itemAdd }>增加一項</div>
              <div className='ui button' onClick={ this.updateOrder }>修改訂單</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Order;
