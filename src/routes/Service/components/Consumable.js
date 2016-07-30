import React from 'react'
import ItemTable from './ItemtTable'
import ItemSelect from './ItemSelect'

const Consumable = React.createClass({
  componentDidMount() {
    this.props.func.itemList();
    this.props.func.unitList();
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') === 'UNIT_LIST_SUCCESSED') {
      $('.unit.dropdown').dropdown({
        onChange: (value, text, selected)=>{
          if(value == '')
            return;

          $.ajax({
            url: '/api/getRecent',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({unit:value}),
          })
          .done((res)=>{

            var items = [];
            for(var k in res.items) {
              items.push(''+res.items[k].item);
            }

            $('.itemSelect.dropdown').dropdown('clear');
            this.props.func.clearSelected();
            $('.ItemSelect.dropdown').dropdown('set selected', items);

          })

        }
      });
    }
    if(newProps.service.get('type') === 'CONSUME_ORDER_SUCCESSED') {
      $('.unit.dropdown').dropdown('clear');
      $('.itemSelect.dropdown').dropdown('clear');
      $('.customer.input input').val('');
      this.props.func.clearSelected();
      alert('耗材申請成功!');
      this.props.func.orderList(0, 1);
    }
  },

  sunbmitOrder() {
    var unit = this.props.auth.user.unit;
    var items = $('.itemSelect.dropdown').dropdown('get value');
    var customer = $('.customer.input input').val();
    var obj = {};

    if(unit.length == 0) {
      alert('請選擇組別!');
      return;
    }

    if(customer.length == 0) {
      alert('請填寫申請人!');
      return;
    }

    for(var k in items) {
      var SelectedItems = this.props.service.get('SelectedAmount').toObject(); 
      if(SelectedItems[items[k]] === undefined)
        obj[items[k]] = 1;
      else
        obj[items[k]] = SelectedItems[items[k]];
    }

    this.props.func.consumeableOrder(unit, obj, customer, 'consumable');
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
          <div className='ui customer input'>
            <input type='text' />
          </div><br/><br/>

          <div style={ style.title }>選擇品項(多選)&nbsp;:</div>&nbsp;<br/>
          <ItemSelect itemlist={ this.props.manage.get('items') } func={this.props.func}/>
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
              <ItemTable itemlist={ this.props.manage.get('items') } service={ this.props.service } func={this.props.func}/>
            </table>
          </div>

          <br/><div className='ui button' style={ style.sectionBtn } onClick={ this.sunbmitOrder }>送出</div>
        </div>
      </div>
    )
  }
})

module.exports = Consumable;
