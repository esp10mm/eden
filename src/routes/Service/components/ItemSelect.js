import React from 'react'

const SelectOption = React.createClass({
  render() {
    return (
      <option value={this.props.data.id}>{this.props.data.name}</option>
    )
  }
})

const ItemSelect = React.createClass({
  getInitialState(){
    return({orderType:0});
  },

  selectChange() {
    var newValue = $(`${this.props.classPrefix}.itemSelect.dropdown`).dropdown('get value');
    console.log(newValue);
    if(newValue === null)
      this.props.func.updateSelected([], this.state.orderType);  
    else
      this.props.func.updateSelected(newValue, this.state.orderType);  
  },

  componentDidMount() {
    $(`${this.props.classPrefix}.itemSelect.dropdown`).dropdown({
      onChange: this.selectChange
    }).dropdown('clear');

    var orderType = 0;
    if(this.props.classPrefix == '.s')
      orderType = 1;
    else if(this.props.classPrefix == '.c')
      orderType = 0;

    this.setState({orderType:orderType});
    this.props.func.updateSelected([], orderType);  
  },

  render() {
    var itemlist = this.props.itemlist;
    var orderType = this.state.orderType;
    var classPrefix = this.props.classPrefix=='.s'?'s':'c';

    return(
      <select className={`ui fluid multiple ${classPrefix} itemSelect search dropdown`} multiple=''>
      {itemlist.map(function(option){
        
        if(option.item_type == orderType)
          return <SelectOption key={option.id} data={option} />
      })}
      </select>
    );
  }
})

module.exports = ItemSelect;
