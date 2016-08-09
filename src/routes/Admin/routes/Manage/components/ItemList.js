import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'
import AddItem from './AddItem'

const ItemRow = React.createClass({
  getInitialState() {
    return {
      order: this.props.data.item_order, 
      amount: this.props.data.amount, 
      donation: this.props.data.donation, 
      price: this.props.data.price,
      safety: this.props.data.safety,
      name: this.props.data.name,
      item_limit: this.props.data.item_limit,
    };
  },

  toPage() {
    this.props.toPage(`/admin/item/${this.props.data.name}`);
  },

  componentWillReceiveProps(newProps){
    if(newProps.data.item_order !== this.state.order){
      var state = this.state;
      state.order = newProps.data.item_order;
      this.setState(state);
    } 
  },

  nameChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    state.name = newOrder;

    this.setState(state);
  },

  orderChange(value) {
    var target = this.props.items[this.props.index + value];
    if(target !== undefined){
      var state = this.state;
      var oldOrder = state.order;
      var newOrder = target.item_order;

      target.order = oldOrder;
      this.props.changeOrder(this.props.index+value, oldOrder);

      $.ajax({
        url: '/api/setItem',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          token: Cookies.get('token'), 
          item: target.id,
          state: target,
          uid: Cookies.get('uid')
        }),
      })
      .done((res)=>{
        state.order = newOrder;
        this.setState(state);
        this.submitChange();
      })
    }
  },

  orderValChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

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

  safetyChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    if(isNaN(parseInt(newOrder))){
      alert('請輸入數字!');
      return;
    }
    else
      state.safety = newOrder;

    this.setState(state);
  },

  limitChange(event) {
    var newOrder = event.target.value; 
    var state = this.state; 

    state.item_limit = newOrder;

    this.setState(state);
  },

  submitChange() {
    var item = this.props.data.id;

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
      this.props.func.itemList();
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
      else if(num == 5){
        return(
          <td>{this.props.data.safety}</td>
        )
      }
      else if(num == 6){
        return(
          <td>{this.props.data.name}</td>
        )
      }
      else if(num == 7){
        return(
          <td>{this.props.data.item_limit}</td>
        )
      }
    }
    else{
      if(num == -1){
        return(
          <td>
            <div className='ui item_order input' style={{width:'80px'}} >
              <input type='text' value={this.state.order} onChange={this.orderValChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 0){
        return(
          <td>
            <i className='big caret up icon' onClick={()=>{this.orderChange(-1)}}/>
            <i className='big caret down icon' onClick={()=>{this.orderChange(1)}}/>
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
            <div className='ui item_amount input' style={{width:'80px'}} >
              <input type='text' value={this.state.amount} onChange={this.amountChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 3){
        return(
          <td>
            <div className='ui item_donation input' style={{width:'80px'}} >
              <input type='text' value={this.state.donation} onChange={this.donationChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 4){
        return(
          <td>
            <div className='ui item_price input' style={{width:'80px'}} >
              <input type='text' value={this.state.price} onChange={this.priceChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 5){
        return(
          <td>
            <div className='ui item_safety input' style={{width:'80px'}} >
              <input type='text' value={this.state.safety} onChange={this.safetyChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 6){
        return(
          <td>
            <div className='ui item_name input' style={{width:'100px'}} >
              <input type='text' value={this.state.name} onChange={this.nameChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
      else if(num == 7){
        return(
          <td>
            <div className='ui item_limit input' style={{width:'80px'}} >
              <input type='text' value={this.state.item_limit} onChange={this.limitChange} onBlur={this.submitChange}/>
            </div>
          </td>
        )
      }
    }
  },

  render() {
    var status = '';
    if((this.props.data.amount+this.props.data.donation) < this.props.data.safety)
      status = 'negative';
    return(
      <tr className={status}>
        {this.adminRender(6)}
        {this.adminRender(2)}
        {this.adminRender(3)}
        {this.adminRender(4)}
        {this.adminRender(5)}
        {this.adminRender(7)}
        {this.adminRender(0)}
        {this.adminRender(-1)}
        {this.adminRender(1)}
      </tr>
    )
  }
})

const ItemList = React.createClass({
  getInitialState() {
    return {list: 'consumable', items:[]};
  },

  componentWillReceiveProps(newProps){
    if(newProps.manage.get('type')=='ITEM_LIST_SUCCESSED'){
      var old = this.state;
      old.items = newProps.manage.get('items');
      this.setState(old);
    }
  },

  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  switchList(listName) {
    this.props.func.itemList();

    this.setState({list:listName});
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
      else if(num == -1){
        return(
          <th>順序(值)</th>
        )
      }
      else if(num == 1){
        return(
          <th>刪除</th>
        )
      }
    }
  },

  changeOrder(index, value){
    var state = this.state;
    state.items[index].item_order = value;
  },

  render() {
    var consumeableList = [];
    var stationeryList = [];
    var activityList = [];
    var rentList = [];
    var repairList = [];

    var target = consumeableList;
    
    var items = this.state.items;

    if(items[0] !== undefined) {
      for(var k in items) {
        if(items[k].item_type == 0)
          consumeableList.push(items[k]);
        else if(items[k].item_type == 1) 
          stationeryList.push(items[k]);
        else if(items[k].item_type == 2) 
          rentList.push(items[k]);
        else if(items[k].item_type == 3) 
          activityList.push(items[k]);
        else if(items[k].item_type == 4) 
          repairList.push(items[k]);
      }
    }

    if(this.state.list == 'stationery')
      target = stationeryList;
    else if(this.state.list == 'rent')
      target = rentList;
    else if(this.state.list == 'activity')
      target = activityList;
    else if(this.state.list == 'repair')
      target = repairList;

    return(
      <div className='content'>

        <AddItem func={this.props.func} manage={ this.props.manage } />

        <div className='ui button' onClick={()=>{this.switchList('consumeable')}}>
          耗材
        </div>
        <div className='ui button' onClick={()=>{this.switchList('stationery')}}>
          文具
        </div>
        <div className='ui button' onClick={()=>{this.switchList('rent')}}>
          借物 
        </div>
        <div className='ui button' onClick={()=>{this.switchList('activity')}}>
          活動 
        </div>
        <div className='ui button' onClick={()=>{this.switchList('repair')}}>
          維修 
        </div>

        <table className='ui striped table'>
          <thead>
            <tr>
              <th>項目名稱</th>
              <th>自購數量</th>
              <th>捐贈數量</th>
              <th>單價</th>
              <th>安全量</th>
              <th>管制量</th>
              {this.adminRender(0)}
              {this.adminRender(-1)}
              {this.adminRender(1)}
            </tr>
          </thead>
          <tbody className='itemList tbody'>
          {
            target.map((item, i)=>{
              return <ItemRow data={item} key={item.id} items={target} index={i} toPage={this.toPage} func={this.props.func} changeOrder={this.changeOrder}/>
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = ItemList;
