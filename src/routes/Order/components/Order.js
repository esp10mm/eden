import React from 'react'
import { browserHistory } from 'react-router'
import ItemList from './ItemList'

const Order = React.createClass({
  componentDidMount() {
    this.props.func.orderInfo(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if(newProps.service.get('type') === 'ORDER_INFO_SUCCESSED') {
      // $('.item.amount').text(newProps.manage.get('results')[0].amount);
    }
    else if(newProps.service.get('type') === 'UPDATE_ORDER_SUCCESSED') {
      alert('修改訂單成功!');
    }
  },
  
  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  updateOrder() {
    var amount = {};
    $('.item.amount.input').each((i, e)=>{
      var iid = $(e).attr('data-iid');
      amount[iid] = $(e).val();
    });    
    this.props.func.updateOrder(amount, this.props.params.id);
  },

  render() {
    var style = {
      container: {
        maxWidth: '700px',
        height: '100%',
        margin: '0px auto',
      },
      mainSegment: {
        width: '95%',
        margin: '0px auto',
      },
      button: {
        width: '200px',
        height: '100px',
        margin: '0px auto',
        lineHeight: '40px',
        fontSize: '30px',
        textAlign: 'center',
      },
      title: {
        fontSize: '35px',
        fontWeight: 'bold',
        display: 'inline-block',
      },
      title2: {
        fontSize: '20px',
        display: 'inline-block',
      },
    }

    let manage = this.props.manage.toObject();
    let unit = '';
    let items = [];
    let status = '';
    let customer = '';

    if(manage.results.order !== undefined) {
      unit = manage.results.order.unit;
      status = manage.results.order.status;
      customer = manage.results.order.customer;
    }

    if(manage.results.items !== undefined)
      items = manage.results.items;

    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'>
          <div style={style.mainSegment}>
            <div className='ui segment'>

              <div style={style.title2}>申請單位:&nbsp;{ unit }</div><br/>

              <div style={style.title2}>訂單狀態:&nbsp;{ status }</div><br/>

              <div style={style.title2}>申請人:&nbsp;{ customer }</div><br/>

              <div style={style.title2}>申請項目:&nbsp;</div><br/>

              <ItemList items={items}/><br/>

              <div className='ui button' onClick={ ()=>this.toPage('/service') }>回申請頁面</div>
              <div className='ui button' onClick={ this.updateOrder }>修改訂單</div>

            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Order;
