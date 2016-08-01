import React from 'react'

const ItemRow = React.createClass({
  componentDidMount() {
    console.log(this.props.orderType);
    this.props.updateSelectedAmount(this.props.data.item.id, 1, this.props.orderType);
  },

  onBlur(e) {
    if(isNaN(parseInt(e.target.value)) && e.target.value.length > 0) {
      alert('請輸入數字');
    }
    else if(e.target.value.length > 0)
      this.props.updateSelectedAmount(this.props.data.item.id, parseInt(e.target.value), this.props.orderType);
  },

  render() {
    return(
      <tr>
        <td>{ this.props.data.item.name }</td>
        <td>
          <div className='ui mini input'>
            <input type='text' onBlur={ this.onBlur } placeholder='1'/>
          </div>
        </td>
      </tr>
    )
  }
  
})

module.exports = ItemRow;
