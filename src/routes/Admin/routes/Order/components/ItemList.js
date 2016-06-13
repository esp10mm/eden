import React from 'react'
import { browserHistory } from 'react-router'

const ItemRow = React.createClass({
  componentDidMount() {

  },

  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  render() {
    var style = {
      input: {
        width: '70px',
        height: '30px',
      },
    }

    var disabled = this.props.isFinished? 'disabled':'';
    
    return(
      <tr>
        <td><a onClick={ ()=>this.toPage('/admin/item/'+this.props.item.name)}>{this.props.item.name}</a></td>
        <td>{this.props.item.desired}</td>
        <td>{this.props.item.amount + this.props.item.donation}</td>
        <td>
          <div className={`ui ${disabled} export input `} style={style.input}>
            <input type='text' defaultValue={this.props.item.export} />
          </div>
        </td>
        <td>
          <div className={`ui ${disabled} export_dona input `} style={style.input}>
            <input type='text' defaultValue={this.props.item.export_dona} />
          </div>
        </td>
      </tr>
    )
  }
})

const ItemList = React.createClass({
  componentDidMount() {
  },

  componentWillReceiveProps(newProps) {
  },

  render() {
    let isFinished = this.props.isFinished;

    return(
      <table className='ui striped table'>
        <thead>
          <tr>
            <th>項目名稱</th>
            <th>申請數量</th>
            <th>庫存總量</th>
            <th>自購出貨量</th>
            <th>捐物出貨量</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.items.map(function(item, i){
            return <ItemRow key={item.item} item={item} index={i} isFinished={isFinished}/> 
          })
        }
        </tbody>
      </table>
    )
  }
})

module.exports = ItemList;
