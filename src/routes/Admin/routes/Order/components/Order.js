import React from 'react'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'
import ItemList from './ItemList'

const Order = React.createClass({
  componentDidMount() {
    this.props.func.orderInfo(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') === 'FINISH_ORDER_SUCCESSED') {
      this.props.func.orderInfo(this.props.params.id);
    }
  },
  
  toPage(path) {
    browserHistory.push(path);
  },

  finishOrder(status) {
    var items = this.props.manage.toObject().results.items;

    $('.export.input input').each((i, t)=>{
      items[i].export = parseInt($(t).val());
    })

    $('.export_dona.input input').each((i, t)=>{
      items[i].export_dona = parseInt($(t).val());
    })

    this.props.func.finishOrder(this.props.params.id, status, items);
  },

  adminRender(data){
    if(Cookies.get('type') != 'admin') 
      return;
    else{
      return(
              <div className={data.finishBTNClass} onClick={ ()=>this.finishOrder(status) }>{data.finishBTNText}</div>
      )
    }
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
    let statusView = '';
    let customer = '';
    let order_type = '';

    let isFinished = false;

    let finishBTNClass = 'ui button green';
    let finishBTNText = '完成訂單';

    if(manage.results.order !== undefined) {
      unit = manage.results.order.unit;
      status = manage.results.order.status;
      statusView = (status=='FINISH')?'已完成':'未完成';
      customer = manage.results.order.customer;
      order_type = manage.results.order.order_type;

      $('.ui.checkbox').checkbox('set enabled');

      if(status == 'FINISH') {
        finishBTNClass = 'ui button red';
        finishBTNText = '取消完成訂單';
        isFinished = true;
        $('.ui.checkbox').checkbox('set disabled');
      }

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

              <div style={style.title2}>訂單狀態:&nbsp;{ statusView }</div><br/>

              <div style={style.title2}>申請人:&nbsp;{ customer }</div><br/>

              <div style={style.title2}>申請項目:&nbsp;</div><br/>

              <ItemList items={items} isFinished={isFinished} order_type={order_type}/><br/>

              <div className='ui button' onClick={ ()=>this.toPage('/admin') }>回管理頁面</div>

              {this.adminRender({finishBTNText:finishBTNText, finishBTNClass:finishBTNClass})}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Order;
