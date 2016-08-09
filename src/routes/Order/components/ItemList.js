import React from 'react'
import { browserHistory } from 'react-router'

const ItemRow = React.createClass({
  componentDidMount() {
    $(`.oed.${this.props.item.key}`).dropdown({
      onChange: (value, text)=>{
        this.props.itemSet(this.props.item.key, 'item', value);
      }
    });
  },

  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  noteOnBlur(e) {
    this.props.itemSet(this.props.item.key, 'msg', e.target.value);
  },

  amountOnBlur(e) {
    this.props.itemSet(this.props.item.key, 'desired', e.target.value);
  },

  noteTd() {
    if(this.props.type == '文具' || this.props.type == '維修' ||this.props.type=='借物' || this.props.type=='活動') {
      return(
        <td>
          <div className='ui mini input'>
            <input type='text' className='item note input' data-iid={this.props.item.item} defaultValue={this.props.item.msg.trim()} onBlur={this.noteOnBlur}/>
          </div>
        </td>
      )
    }
  },

  removeItem() {
    this.props.removeItem(this.props.item.key);
  },

  render() {
    return(
      <tr>
        <td>
          <div className={`ui selection dropdown ${this.props.item.key} oed`}>
            <input type='hidden' value={this.props.item.item}/>
            <i className='dropdown icon'/>
            <div className='default text'>{this.props.item.name}</div>
            <div className='menu'>
            {
              this.props.list.map((litem)=>{
                return(
                  <div className='item' data-value={litem.id} key={litem.id}>{litem.name}</div>
                )
              })
            }
            </div>
          </div>
        </td>
        <td>
          <div className='ui mini input'>
            <input type='text'className='item amount input' data-iid={this.props.item.item} defaultValue={this.props.item.desired} onBlur={this.amountOnBlur}/>
          </div>
        </td>
        {this.noteTd()}
        <td>
          <i className='ui remove red icon' onClick={this.removeItem}/>
        </td>
      </tr>
    )
  },

})

const ItemList = React.createClass({
  componentDidMount() {
  },

  componentWillReceiveProps(newProps) {
  },

  tableHead() {
    if(this.props.type == '耗材'){
      return(
        <tr>
          <th>項目名稱</th>
          <th>申請數量</th>
          <th>刪除</th>
        </tr>
      )
    }
    else if(this.props.type == '文具'){
      return(
        <tr>
          <th>項目名稱</th>
          <th>申請數量</th>
          <th>備註(說明)</th>
          <th>刪除</th>
        </tr>
      )
    }
    else {
      return(
        <tr>
          <th>項目名稱</th>
          <th>申請數量</th>
          <th>備註(說明)</th>
          <th>刪除</th>
        </tr>
      )
    }

  },

  render() {
    let itemSet = this.props.itemSet;
    let list = this.props.list;
    let removeItem = this.props.removeItem;
    let type = this.props.type;

    return(
      <table className='ui striped table'>
        <thead>
        {this.tableHead()}
        </thead>
        <tbody>
        {
          this.props.items.map(function(item){
            return <ItemRow list={list} key={item.key} item={item} type={type} itemSet={itemSet} removeItem={removeItem}/> 
          })
        }
        </tbody>
      </table>
    )
  }
})

module.exports = ItemList;
