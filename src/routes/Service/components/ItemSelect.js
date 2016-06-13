import React from 'react'

const SelectOption = React.createClass({
  render() {
    return (
      <option value={this.props.data.id}>{this.props.data.name}</option>
    )
  }
})

const ItemSelect = React.createClass({
  selectChange() {
    var newValue = $('.itemSelect.dropdown').dropdown('get value');
    if(newValue === null)
      this.props.func.updateSelected([]);  
    else
      this.props.func.updateSelected(newValue);  
  },

  componentDidMount() {
    $('.itemSelect.dropdown').dropdown({
      onChange: this.selectChange
    }).dropdown('clear');
    this.props.func.updateSelected([]);  
  },

  render() {
    var itemlist = this.props.itemlist;
    return(
      <select className="ui fluid multiple itemSelect search dropdown" multiple=''>
      {itemlist.map(function(option){
        return <SelectOption key={option.id} data={option} />
      })}
      </select>
    );
  }
})

module.exports = ItemSelect;
