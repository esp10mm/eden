import React from 'react'
import ItemTable from './ItemtTable'
import ItemSelect from './ItemSelect'

const Stationery = React.createClass({
  componentDidMount() {
  },

  getInitialState() {
    return {stationery: [], key:0, buffer:[{key:0}]};
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') === 'ITEM_LIST_SUCCESSED') {
      var results = newProps.manage.get('results');
      var stationery = [];
      for(var k in results) {
        if(results[k].item_type==1)
          stationery.push(results[k]);
      }
      this.setState({stationery:stationery});
    }
    if(newProps.manage.get('type') === 'UNIT_LIST_SUCCESSED') {
      $('.sunit.dropdown').dropdown();
    }
    if(newProps.service.get('type') === 'CONSUME_ORDER_SUCCESSED') {
    }
  },

  addRow() {
    var stationery = this.state.stationery;
    var buffer = this.state.buffer;
    var key = this.state.key+1;

    buffer.push({key:key});

    this.setState({key:key, stationery:stationery, buffer:buffer});
  },

  delRow(i) {
    var stationery = this.state.stationery;
    var buffer = this.state.buffer;
    var key = this.state.key;

    for(var k in buffer) {
      if(buffer[k].key == i)
        buffer.splice(k, 1);
    }

    this.setState({stationery:stationery, buffer:buffer, key:key});
  },

  setRowState(key, data) {
    var stationery = this.state.stationery;
    var buffer = this.state.buffer;
    var key = this.state.key;

    for(var k in buffer) {
      if(buffer[k].key == key)
        buffer[k].data = data;
    }

    this.setState({stationery:stationery, buffer:buffer, key:key});
  },

  sunbmitOrder() {
    var unit = $('.sunit.dropdown').dropdown('get value');
    var customer = $('.scustomer.input input').val();
    var buffer = this.state.buffer;
    var obj = {};

    for(var k in buffer) {
      if(buffer[k].data != undefined)
        obj[buffer[k].data.stationery] = {amount:buffer[k].data.amount, note:buffer[k].data.note};
    }

    if(unit.length == 0) {
      alert('請選擇組別!');
      return;
    }

    if(customer.length == 0) {
      alert('請填寫申請人!');
      return;
    }

    var req = {
      unit: unit,
      order: obj,
      customer: customer,
    };

    $.ajax({
      url: '/api/consumeableOrder',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      alert('文具申請成功!');

      var stationery = this.state.stationery;
      var key = this.state.key;

      this.setState({stationery:stationery, buffer:[{key:key+1}], key:key+1});
    })

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

          <div className="ui sunit selection dropdown">
            <input type="hidden" name="unit"/>
            <i className="dropdown icon"/>
            <div className="default text">選擇組別</div>
            <div className="menu">
            {
              this.props.manage.get('unit').map(function(u){
                return <div className='item' key={u.id} data-value={u.id}>{u.name}</div> 
              })
            } 
            </div>
          </div><br/><br/>

          <div style={ style.title }>申請人姓名&nbsp;:</div>&nbsp;<br/>
          <div className='ui scustomer input'>
            <input type='text' />
          </div><br/><br/>

          <table className='ui table'>
          <thead>
          <tr>
            <th>品項</th>
            <th style={{width: '100px'}}>數量</th>
            <th style={{width: '25%'}}>備註</th>
            <th>刪除</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.buffer.map((r, i)=>{
              return <BRow key={r.key} index={r.key} data={this.state.buffer[i]} stationery={this.state.stationery} delRow={ this.delRow } setRowState={this.setRowState}/>
            }) 
          }
          </tbody>
          </table>
          <div className='ui button' style={ style.sectionBtn } onClick={ this.addRow }>增加一項</div>

          <br/><div className='ui button' style={ style.sectionBtn } onClick={ this.sunbmitOrder }>送出</div>
        </div>
      </div>
    )
  }
})

const BRow = React.createClass({
  componentDidMount() {
    $(`.dropdown.s${this.props.index}`).dropdown({
      onChange: ()=>{this.updateData(false)}
    });
  },

  delRow() {
    var key = this.props.index;
    this.props.delRow(key);
  },

  updateData(source) {
    var stationery = $(`.dropdown.s${this.props.index}`).dropdown('get value');
    var amount = $(`.samount.input.s${this.props.index} input`).val();
    var note = $(`.snote.input.s${this.props.index} input`).val();

    if(isNaN(parseInt(amount)) && source) {
      alert('數量請填寫數字!');
      $(`.samount.input.s${this.props.index} input`).val('');
      return;
    }

    this.props.setRowState(this.props.index, {stationery:stationery, amount:amount, note:note});
  },

  render() {
    return(
      <tr>
        <td>
          <select className={`ui stationery dropdown s${this.props.index}`}>
          {
            this.props.stationery.map((s, i)=>{
              return <option value={s.id} key={i}>{s.name}</option>
            })
          }
          </select>
        </td>
        <td>
          <div className={`ui fluid samount input s${this.props.index}`} onBlur={()=>{this.updateData(true)}}>
            <input type='text' />
          </div>
        </td>
        <td>
          <div className={`ui fluid snote input s${this.props.index}`} onBlur={()=>{this.updateData(false)}}>
            <input type='text' />
          </div>
        </td>
        <td><i className='ui red icon remove' onClick={this.delRow}/></td>
      </tr>
    )
  } 
})

module.exports = Stationery;
