import React from 'react'
import ItemRow from './ItemRow'

const ItemTable = React.createClass({
  itemAmount(item) {
    var obj = {};
    if(this.props.classPrefix == '.s')
      obj = this.props.service.get('SelectedSAmount').toObject();
    else if(this.props.classPrefix == '.c')
      obj = this.props.service.get('SelectedAmount').toObject();

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

    let list = this.props.service.get('SelectedItems');
    let orderType = 0;
    if(this.props.classPrefix == '.s'){
      list = this.props.service.get('SelectedSItems')
      orderType = 1;
    }


    return(
      <tbody>
      {list.map(function(item){
        return <ItemRow key={item} data={{item:getItemData(item), num: itemAmount(item)}} updateSelectedAmount={updateSelectedAmount} orderType={orderType}/>
      })}
      </tbody>
    )
  }
})

module.exports = ItemTable;
