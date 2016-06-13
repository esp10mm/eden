import React from 'react'

const ImportExport = React.createClass({
  componentDidMount() {
    $('.importList.dropdown').dropdown({
      onChange: (value, text, selected)=>{
        this.dropdownChange(text);
      }
    });

    $('.inout.dropdown').dropdown();

    $('.importList input').focus(()=>{
      $('.importList.dropdown').addClass('loading');
      this.props.func.itemList();
    })
    
    this.props.func.itemList();
  },

  dropdownChange(itemName) {
    const results = this.props.manage.get('items');
    let curAmount = 0;
    let curDonation = 0;

    for(var k in results){
      if(results[k].name == itemName) {
        curAmount = results[k].amount;
        curDonation = results[k].donation;
      }
    }

    $('.amount').text(`自購:${ curAmount}  捐物:${ curDonation }`)
  },

  componentWillReceiveProps(newProps) {
    $('.importList.dropdown').removeClass('loading');

    if(newProps.manage.get('type') === 'DELITEM_SUCCESSED') {
      $('.importList.dropdown').dropdown('set text', '刪除成功!');
      this.props.func.itemList();
    }
    else if(newProps.manage.get('type') === 'ITEM_LIST_SUCCESSED') {
      var html = '';
      var curAmount = 0;
      var curDonation = 0;

      const results = newProps.manage.get('results');

      for(var k in results){
        html += `<div class="item" data-value="${results[k].amount}">${results[k].name}</div>`;

        if(results[k].name == $('.importList.dropdown').dropdown('get text')[0]) {
          curAmount = results[k].amount;
          curDonation = results[k].donation;
        }
      }
      $('.importList.menu').html(html);
      $('importList.dropdown').dropdown('refresh');

      $('.amount').text(`自購:${ curAmount}  捐物:${ curDonation }`)
    }
    else if(newProps.manage.get('type') === 'INOUT_SUCCESSED') {
      this.props.func.itemList();
    }
  },

  inout() {

    var method = $('.inout.dropdown').dropdown('get text')=='進'?'in':'out';
    var obj = {
      name: $('.importList.dropdown').dropdown('get text')[0],
      method: method, 
      value: $('.inout.input input').val(),
      donation: $('.inout.checkbox input').is(':checked'),
    }
    
    if(isNaN(obj.value))
      alert('請輸入數字!')
    else
      this.props.func.inout(obj);
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
      amount: {
        display: 'inline-block',
      },
      inoutInput: {
        width: '90px',
      },
    };

    return(
      <div className='ui basic segment' style={ style.section }>
        <div style={ style.title }>項目進出&nbsp;:</div>&nbsp;<br/>
        <div className="ui importList search selection dropdown">
          <input type='hidden' name='items'/>
          <i className='importList dropdown icon'/>
          <div className='default text'>選擇品項</div>
          <div className='importList menu'>
          </div>
        </div>&nbsp;
        <div className='amount' style={ style.amount }>
          庫存量:0
        </div><br/>

        <div className='ui compact inout selection dropdown'>
          <input type='hidden' name='inout' value='in'/>
          <i className='dropdown icon'/>
          <div className='default text'>進</div>
          <div className='menu'>
            <div className='item' data-value='in'>進</div>
            <div className='item' data-value='out'>出</div>
          </div>
        </div>&nbsp;數量:&nbsp;
        
        <div className='ui inout input' style={ style.inoutInput }>
          <input type='text' defaultValue='1'/>
        </div>&nbsp;

        <div className='ui inout checkbox'>
          <input type='checkbox'/>
          <label>捐物</label>
        </div>&nbsp;

        <div className='ui button' style={ style.sectionBtn } onClick={ this.inout }>送出</div>
      </div>
    )
  }
})

module.exports = ImportExport;
