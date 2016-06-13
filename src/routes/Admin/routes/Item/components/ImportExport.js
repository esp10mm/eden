import React from 'react'

const ImportExport = React.createClass({
  componentDidMount() {
    $('.inout.dropdown').dropdown();
  },

  componentWillReceiveProps(newProps) {

    if(newProps.manage.get('type') === 'INOUT_SUCCESSED') {
      this.props.func.itemInfo({name:this.props.name});
    }

  },

  inout() {

    var method = $('.inout.dropdown').dropdown('get text')=='進'?'in':'out';
    var obj = {
      name: this.props.name,
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
