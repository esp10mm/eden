import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const ItemRow = React.createClass({
  getInitialState() {
    return {order: this.props.data.item_order, amount: this.props.data.amount, donation: this.props.data.donation, price: this.props.data.price};
  },

  toPage() {
    this.props.toPage(`/admin/item/${this.props.data.name}`);
  },

  orderChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    if(isNaN(parseInt(newOrder))){
      alert('請輸入數字!');
      return;
    }
    else
      state.order = newOrder;

    this.setState(state);
  },

  amountChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    if(isNaN(parseInt(newOrder))){
      alert('請輸入數字!');
      return;
    }
    else
      state.amount = newOrder;

    this.setState(state);
  },

  donationChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    if(isNaN(parseInt(newOrder))){
      alert('請輸入數字!');
      return;
    }
    else
      state.donation = newOrder;

    this.setState(state);
  },

  priceChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    if(isNaN(parseInt(newOrder))){
      alert('請輸入數字!');
      return;
    }
    else
      state.price = newOrder;

    this.setState(state);
  },

  submitChange() {
    var item = this.props.data.id;
    console.log(this.state);

    $.ajax({
      url: '/api/setItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        item: item,
        state: this.state,
        uid: Cookies.get('uid')
      }),
    })
    .done((res)=>{
      // alert('變更順序成功!');
    })
  },

  adminRender(num) {
    if(Cookies.get('type') != 'admin'){
      if(num == 2){
        return(
          <td>{this.props.data.amount}</td>
        )
      }
      else if(num == 3){
        return(
          <td>{this.props.data.donation}</td>
        )
      }
      else if(num == 4){
        return(
          <td>{this.props.data.price}</td>
        )
      }
    }
    else{
      if(num == 0){
        return(
          <td>
            <div className='ui item_order input' style={{width:'100px'}} >
              <input type='text' value={this.state.order} onChange={this.orderChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 1){
        return(
          <td>
            <i className='remove red icon' onClick={()=>{this.props.func.delItem({name:this.props.data.name})}}/>
          </td>
        )
      }
      else if(num == 2){
        return(
          <td>
            <div className='ui item_amount input' style={{width:'100px'}} >
              <input type='text' value={this.state.amount} onChange={this.amountChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 3){
        return(
          <td>
            <div className='ui item_donation input' style={{width:'100px'}} >
              <input type='text' value={this.state.donation} onChange={this.donationChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 4){
        return(
          <td>
            <div className='ui item_donation input' style={{width:'100px'}} >
              <input type='text' value={this.state.price} onChange={this.priceChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
    }
  },

  render() {
    return(
      <tr>
        <td><a className='tdname' onClick={this.toPage}>{this.props.data.name}</a></td>
        {this.adminRender(2)}
        {this.adminRender(3)}
        {this.adminRender(4)}
        {this.adminRender(0)}
        {this.adminRender(1)}
      </tr>
    )
  }
})

const ItemList = React.createClass({
  getInitialState() {
    return {list: 'consumable'};
  },

  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  toggleList() {
    this.props.func.itemList();

    var list = this.state.list;

    if(list == 'stationery')
      list = 'consumable';
    else
      list = 'stationery';

    this.setState({list:list});
  },

  adminRender(num){
    if(Cookies.get('type') != 'admin') 
      return;
    else{
      if(num == 0){
        return(
          <th>順序</th>
        )
      }
      else if(num == 1){
        return(
          <th>刪除</th>
        )
      }
    }
  },

  render() {
    var consumeableList = [];
    var stationeryList = [];
    var target = consumeableList;
    
    var items = this.props.manage.get('items');

    if(items[0] !== undefined) {
      for(var k in items) {
        if(items[k].item_type == 0)
          consumeableList.push(items[k]);
        else 
          stationeryList.push(items[k]);
      }
    }

    if(this.state.list == 'stationery')
      target = stationeryList;

    return(
      <div className='content'>
        <div className='ui button' onClick={this.toggleList}>
          耗材/文具
        </div>
        <table className='ui striped table'>
          <thead>
            <tr>
              <th>項目名稱</th>
              <th>自購數量</th>
              <th>捐贈數量</th>
              <th>單價</th>
              {this.adminRender(0)}
              {this.adminRender(1)}
            </tr>
          </thead>
          <tbody className='itemList tbody'>
          {
            target.map((item, i)=>{
              return <ItemRow data={item} key={item.id} toPage={this.toPage} func={this.props.func}/>
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = ItemList;
