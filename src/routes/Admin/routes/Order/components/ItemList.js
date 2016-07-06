import React from 'react'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'

const ItemRow = React.createClass({
  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  adminRender(num){
    if(Cookies.get('type')=='admin' && num==0){
      return(
        <td>
          <div className={`ui ${disabled} export input `} style={style.input}>
            <input type='text' defaultValue={this.props.item.export} />
          </div>
        </td>
      )
    }
    else if(num == 0){
      return(
        <td>
          {this.props.item.export}
        </td>
      )
    }
    else if(Cookies.get('type')=='admin' && num==1){
      return(
        <td>
          <div className={`ui ${disabled} export_dona input `} style={style.input}>
            <input type='text' defaultValue={this.props.item.export_dona} />
          </div>
        </td>
      )
    }  
    else if(num == 1){
      return(
        <td>
          {this.props.item.export_dona}
        </td>
      )
    }
  },

  render() {
    var style = {
      input: {
        width: '70px',
        height: '30px',
      },
    }

    var disabled = this.props.isFinished? 'disabled':'';

    const msg = ()=>{
      if(this.props.order_type == 'stationery'){
        return <td>{this.props.item.msg}</td>;
      }
    }

    return(
      <tr>
        <td><a onClick={ ()=>this.toPage('/admin/item/'+this.props.item.name)}>{this.props.item.name}</a></td>
        <td>{this.props.item.desired}</td>
        <td>{this.props.item.amount + this.props.item.donation}</td>
        { msg() }
        {this.adminRender(0)}
        {this.adminRender(1)}
      </tr>
    )
  }
})

const ItemList = React.createClass({
  componentDidMount() {
  },

  componentWillReceiveProps(newProps) {
  },

  tableHead(){
    if(this.props.order_type == 'stationery'){
      return(
        <th>備註(說明)</th>
      );
    }
    else{
      return;
    }
  },

  render() {
    let isFinished = this.props.isFinished;
    let orderTypeHead = '';
    let order_type = this.props.order_type;
    
    return(
      <table className='ui striped table'>
        <thead>
          <tr>
            <th>項目名稱</th>
            <th>申請數量</th>
            <th>庫存總量</th>
            { this.tableHead() }
            <th>自購出貨量</th>
            <th>捐物出貨量</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.items.map(function(item, i){
            return <ItemRow key={item.item} item={item} index={i} isFinished={isFinished} order_type={order_type}/> 
          })
        }
        </tbody>
      </table>
    )
  }
})

module.exports = ItemList;
