import React from 'react'
import ItemEdit from './ItemEdit'
import ItemList from './ItemList'
import OrderManage from './OrderManage'
import Statistics from './Statistics'
import Setting from './Setting'
import UserManage from './UserManage'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const Manage = React.createClass({
  componentDidMount() {

    $('.main').transition('fade');
    this.props.func.itemList();

    if(Cookies.get('admin_accor') === undefined)
      Cookies.set('admin_accor', 0);

    var accori = parseInt(Cookies.get('admin_accor'));
    $('.ui.accordion').accordion('open', accori); 
  },

  toPage(path) {
    $('.main').transition('fade');
    browserHistory.push(path);
  },

  accorClick(num) {
    Cookies.set('admin_accor', num);
  },

  adminRender(num){
    if(Cookies.get('type') != 'admin') 
      return;
    else if(num == 0){
      return(
        <div>
          <div className="title" onClick={ ()=>this.accorClick(0) }>
            <i className="dropdown icon"></i>
            項目編輯 
          </div>
          <ItemEdit manage={ this.props.manage } func={this.props.func}/>
        </div>
      )
    }
    else if(num == 2){
      return(
        <div>
          <div className="title" onClick={ ()=>this.accorClick(5) }>
            <i className="dropdown icon"></i>
            設定 
          </div>
          <Setting manage={ this.props.manage } func={this.props.func}/>
        </div>
      )
    }
    else if(num == 1){
      return(
        <div>
          <div className="title" onClick={ ()=>this.accorClick(4) }>
            <i className="dropdown icon"></i>
            用戶管理 
          </div>
          <UserManage manage={ this.props.manage } func={this.props.func}/>
        </div>
      )
    }
  },

  render() {
    var style = {
      container: {
        maxWidth: '900px',
        height: '100%',
        margin: '0px auto',
      },
      mainSegment: {
        width: '95%',
        margin: '0px auto',
      },
      accordion:{
        width: '100%',
      },
      button: {
        width: '200px',
        height: '100px',
        margin: '0px auto',
        lineHeight: '40px',
        fontSize: '30px',
        textAlign: 'center',
      },
    };
    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'>
          <div style={style.mainSegment}>
            <div className="ui styled accordion" style={style.accordion}>

              {this.adminRender(0)}

              <div className="title" onClick={ ()=>this.accorClick(1) }>
                <i className="dropdown icon"></i>
                項目清單 
              </div>
              <ItemList manage={ this.props.manage } func={this.props.func}/>

              <div className="title" onClick={ ()=>this.accorClick(2) }>
                <i className="dropdown icon"></i>
                訂單管理 
              </div>
              <OrderManage manage={ this.props.manage } func={this.props.func}/>

              <div className="title" onClick={ ()=>this.accorClick(3) }>
                <i className="dropdown icon"></i>
                統計資料 
              </div>
              <Statistics manage={ this.props.manage } func={this.props.func}/>

              {this.adminRender(1)}

              {this.adminRender(2)}

            </div>
            <br/>
            <div className='ui button' onClick={()=>{this.toPage('/')}}>返回主頁</div>
          </div>
        </div>
        <div className='row'>
        </div>
      </div>
    )
  },
})

module.exports = Manage;
