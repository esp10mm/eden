import React from 'react'

const DelItem = React.createClass({
  componentDidMount() {
    $('.deleteList.dropdown').dropdown();

    $('.deleteList input').focus(()=>{
      $('.deleteList.dropdown').addClass('loading');
      this.props.func.itemList();
    })
  },

  delItem() {
    var obj = {
      name: $('.deleteList.dropdown').dropdown('get value')[0]
    } 
    this.props.func.delItem(obj);
  },

  componentWillReceiveProps(newProps) {
    $('.deleteList.dropdown').removeClass('loading');

    if(newProps.manage.get('type') === 'DELITEM_SUCCESSED') {
      $('.deleteList.dropdown').dropdown('set text', '刪除成功!');
      this.props.func.itemList();
    }
    else if(newProps.manage.get('type') === 'ITEM_LIST_SUCCESSED') {
      var html = '';
      const results = newProps.manage.get('results');
      for(var k in results){
        html += `<div class="item" data-value="${results[k].name}">${results[k].name}</div>`;
      }
      $('.deleteList.menu').html(html);
      $('deleteList.dropdown').dropdown('refresh');
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
        <div style={ style.title }>刪除項目&nbsp;:</div>&nbsp;<br/>
        <div className="ui deleteList search selection dropdown">
          <input type='hidden' name='items'/>
          <i className='deleteList dropdown icon'/>
          <div className='default text'>選擇品項</div>
          <div className='deleteList menu'>
          </div>
        </div>&nbsp;
        <div className='ui button' style={ style.sectionBtn } onClick={ this.delItem }>送出</div>
      </div>
    )
  }
})

module.exports = DelItem;
