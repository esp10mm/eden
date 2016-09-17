import React from 'react'

const Receive = React.createClass({
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
        if(results[k].item_type==5)
          stationery.push(results[k]);
      }
      this.setState({stationery:stationery});
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
    var unit = this.props.auth.user.unit;
    var customer = $('.rccustomer.input input').val();
    var buffer = this.state.buffer;
    var obj = {};

    var orders = this.props.manage.get('orders');

    for(var k in buffer) {
      if(buffer[k].data != undefined)
        obj[buffer[k].data.stationery] = {amount:buffer[k].data.amount, note:buffer[k].data.note};
    }

    if(customer.length == 0) {
      alert('請填寫申請人!');
      return;
    }

    var req = {
      unit: unit,
      order: obj,
      customer: customer,
      type: 'receive',
    };

    $.ajax({
      url: '/api/consumeableOrder',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      alert('領物申請成功!');

      var stationery = this.state.stationery;
      var key = this.state.key;

      this.setState({stationery:stationery, buffer:[{key:key+1}], key:key+1});
      this.props.func.orderList(0, 1, this.props.auth.user.unit);
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

          <div style={style.title}>{this.props.auth.user.unitName}</div><br/><br/>

          <div style={ style.title }>申請人姓名&nbsp;:</div>&nbsp;<br/>
          <div className='ui rccustomer input'>
            <input type='text' />
          </div><br/><br/>

          <table className='ui table'>
          <thead>
          <tr>
            <th>品項</th>
            <th style={{width: '100px'}}>數量</th>
            <th style={{width: '25%'}}>備註(說明)</th>
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
    $(`.dropdown.rc${this.props.index}`).dropdown({
      onChange: ()=>{this.updateData(false)}
    });
  },

  delRow() {
    var key = this.props.index;
    this.props.delRow(key);
  },

  updateData(source) {
    var stationery = $(`.dropdown.rc${this.props.index}`).dropdown('get value');
    var amount = $(`.rcamount.input.rc${this.props.index} input`).val();
    var note = $(`.rcnote.input.rc${this.props.index} input`).val();

    if(isNaN(parseInt(amount)) && source) {
      alert('數量請填寫數字!');
      $(`.rcamount.input.rc${this.props.index} input`).val('');
      return;
    }

    this.props.setRowState(this.props.index, {stationery:stationery, amount:amount, note:note});
  },

  render() {
    return(
      <tr>
        <td>
          <select className={`ui receive dropdown rc${this.props.index}`}>
          {
            this.props.stationery.map((s, i)=>{
              return <option value={s.id} key={i}>{s.name}</option>
            })
          }
          </select>
        </td>
        <td>
          <div className={`ui fluid rcamount input rc${this.props.index}`} onBlur={()=>{this.updateData(true)}}>
            <input type='text' />
          </div>
        </td>
        <td>
          <div className={`ui fluid rcnote input rc${this.props.index}`} onBlur={()=>{this.updateData(false)}}>
            <input type='text' />
          </div>
        </td>
        <td><i className='ui red icon remove' onClick={this.delRow}/></td>
      </tr>
    )
  } 
})

module.exports = Receive;
