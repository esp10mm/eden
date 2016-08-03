import React from 'react'
import ItemTable from './ItemtTable'
import ItemSelect from './ItemSelect'

const Stationery = React.createClass({
  componentDidMount() {
    this.props.func.itemList();
    this.props.func.unitList();
  },

  componentWillReceiveProps(newProps) {
    if(newProps.service.get('type') === 'STATIONERY_ORDER_SUCCESSED') {
      $('.s.itemSelect.dropdown').dropdown('clear');
      $('.scustomer.input input').val('');
      this.props.func.clearSelected();
      alert('文具申請成功!');
      this.props.func.orderList(0, 1);
    }
  },

  submitOrder() {
    var unit = this.props.auth.user.unit;
    var items = $('.s.itemSelect.dropdown').dropdown('get value');
    var customer = $('.scustomer.input input').val();
    var order = {};

    var orders = this.props.manage.get('orders');
    for(var k in orders){
      if(orders[k].unit.trim() == this.props.auth.user.unitName.trim()){
        if(orders[k].order_type.trim() == 'stationery' && orders[k].status.trim() == 'PENDING'){
          alert(`${this.props.auth.user.unitName.trim()}有未出貨的文具訂單，請利用修改訂單的功能集中填寫!`);
          return;
        }
      }
    }

    if(unit.length == 0) {
      alert('請選擇組別!');
      return;
    }

    if(customer.length == 0) {
      alert('請填寫申請人!');
      return;
    }
    for(var k in items) {
      var SelectedItems = this.props.service.get('SelectedSAmount').toObject(); 
      console.log(SelectedItems);
      if(SelectedItems[items[k]] === undefined)
        order[items[k]] = 1;
      else
        order[items[k]] = SelectedItems[items[k]];
    }
    this.props.func.consumeableOrder(unit, order, customer, 'stationery');
  },

  render() {

    var style = {
      title: {
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'inline-block',
      },
      sectionBtn: {
        marginTop: '3px',
      },
      section: {
        margin: '0px',
      },
    };

    return(
      <div className='active content'>

        <div className='ui basic segment' style={ style.section }>

          <div style={style.title}>{this.props.auth.user.unitName}</div><br/><br/>

          <div style={ style.title }>申請人姓名&nbsp;:</div>&nbsp;<br/>
          <div className='ui scustomer input'>
            <input type='text' />
          </div><br/><br/>

          <div style={ style.title }>選擇品項(多選)&nbsp;:</div>&nbsp;<br/>
          <ItemSelect itemlist={ this.props.manage.get('items') } func={this.props.func} classPrefix='.s'/>
          <br/> 

          <div style={ style.title }>數量填寫&nbsp;:</div>&nbsp;<br/>
          <div className='amount display'>
            <table className='ui table'>
            <thead>
            <tr>
              <th>品項</th>
              <th>數量</th>
            </tr>
            </thead>
              <ItemTable itemlist={ this.props.manage.get('items') } service={ this.props.service } func={this.props.func} type='stationery' classPrefix='.s'/>
            </table>
          </div>

          <br/><div className='ui button' style={ style.sectionBtn } onClick={ this.submitOrder }>送出</div>
        </div>
      </div>
    )
  }
})

module.exports = Stationery;
