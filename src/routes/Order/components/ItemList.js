import React from 'react'
import { browserHistory } from 'react-router'

const ItemRow = React.createClass({
  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  render() {
    return(
      <tr>
        <td><a>{this.props.item.name}</a></td>
        <td>
          <div className='ui mini input'>
            <input type='text'className='item amount input' data-iid={this.props.item.item} defaultValue={this.props.item.desired}/>
          </div>
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

  render() {
    return(
      <table className='ui striped table'>
        <thead>
          <tr>
            <th>項目名稱</th>
            <th>申請數量</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.items.map(function(item){
            return <ItemRow key={item.item} item={item}/> 
          })
        }
        </tbody>
      </table>
    )
  }
})

module.exports = ItemList;
