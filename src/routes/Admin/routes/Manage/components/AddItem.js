import React from 'react'

const AddItem = React.createClass({
  componentDidMount() {
    $('.addItem input').focus(()=>{
      $('.addItem.icon').removeClass('green checkmark');
      $('.addItem input').attr('placeholder', '');
    })
  },

  addItem() {
    var obj = {
      name: $('.addItem input').val(),
      isStationery: $('.stationery.checkbox input').is(':checked'),
    } 
    $('.addItem.input').addClass('loading');
    this.props.func.addItem(obj);
  },

  componentWillReceiveProps(newProps) {
    $('.addItem input').val('');
    $('.addItem.input').removeClass('loading');

    if(newProps.manage.get('type') === 'ADDITEM_SUCCESSED') {
      $('.addItem input').attr('placeholder', '操作成功');
      $('.addItem.icon').addClass('green checkmark');
      this.props.func.itemList();
    }
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
      <div className='ui basic segment' style={ style.section }>
        <div style={ style.title }>新增項目&nbsp;:</div>&nbsp;<br/>

        <div className='ui icon addItem input'>
          <input className='addItem' type='text'/>
          <i className='addItem icon'/> 
        </div>&nbsp;

        <div className='ui stationery checkbox'>
          <input type='checkbox'/>
          <label>文具</label>
        </div>&nbsp;

        <div className='ui button' style={ style.sectionBtn } onClick={ this.addItem }>送出</div>
      </div>
    )
  }
})

module.exports = AddItem;
