import React from 'react'

const ItemRow = React.createClass({
  componentDidMount() {
    this.props.updateSelectedAmount(this.props.data.item.id, 1);
  },

  onBlur(e) {
    if(isNaN(parseInt(e.target.value)) && e.target.value.length > 0) {
      alert('請輸入數字');
    }
    else if(e.target.value.length > 0)
      this.props.updateSelectedAmount(this.props.data.item.id, parseInt(e.target.value));
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
