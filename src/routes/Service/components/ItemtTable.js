import React from 'react'
import ItemRow from './ItemRow'

const ItemTable = React.createClass({
  itemAmount(item) {
    var obj = this.props.service.get('SelectedAmount');
    var obj = this.props.service.get('SelectedAmount').toObject();
    if(obj[item] === undefined)
      return 1;
    return obj[item];
  },

  getItemData(item) {
    for(var k in this.props.itemlist) {
      if(this.props.itemlist[k].id == item)
        return this.props.itemlist[k];
    }
  },

  render() {
    const itemAmount = this.itemAmount;
    const getItemData = this.getItemData;
    const updateSelectedAmount = this.props.func.updateSelectedAmount;

    return(
      <tbody>
      {this.props.service.get('SelectedItems').map(function(item){
        return <ItemRow key={item} data={{item:getItemData(item), num: itemAmount(item)}} updateSelectedAmount={updateSelectedAmount}/>
      })}
      </tbody>
    )
  }
})

module.exports = ItemTable;
