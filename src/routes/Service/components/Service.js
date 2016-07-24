import React from 'react'
import Consumable from './Consumable'
import Stationery from './Stationery'
import Setting from './Setting'
import Orders from './Orders'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'

const Service = React.createClass({
  componentDidMount() {
    $('.ui.accordion').accordion();
    // $('.main').transition('fade');
    //
    if(Cookies.get('service_accor') === undefined)
      Cookies.set('service_accor', 0);

    var accori = parseInt(Cookies.get('service_accor'));
    $('.ui.accordion').accordion('open', accori); 
  },

  componentWillMount() {
  },

  toPage(path) {
    $('.main').transition('fade');
    browserHistory.push(path);
  },

  accorClick(num) {
    Cookies.set('service_accor', num);
  },

  componentWillReceiveProps(newProps) {
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
    };
    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'>
          <div style={ style.mainSegment }>
            <div className="ui compact styled accordion">

              <div className="title" onClick={()=>{this.accorClick(0)}}>
                <i className="dropdown icon"></i>
                耗材申請 
              </div>
              <Consumable func={this.props.func} manage={this.props.manage} service={ this.props.service } auth={this.props.auth}/>

              <div className="title" onClick={()=>{this.accorClick(1)}}>
                <i className="dropdown icon"></i>
                文具申請  
              </div>
              <div className='content'>
                <Stationery func={this.props.func} manage={this.props.manage} service={ this.props.service} auth={this.props.auth}/>
              </div>

              <div className="title" onClick={()=>{this.accorClick(2)}}>
                <i className="dropdown icon"></i>
                申請單查詢  
              </div>
              <div className='content'>
                <Orders func={this.props.func} manage={this.props.manage} service={this.props.service} auth={this.props.auth}/> 
              </div>

              <div className="title" onClick={()=>{this.accorClick(3)}}>
                <i className="dropdown icon"></i>
                設定 
              </div>
              <Setting manage={ this.props.manage } func={this.props.func}/>

            </div>

            <br/>
            <div className='ui button' onClick={()=>{this.toPage('/')}}>返回主頁</div>

          </div>
        </div>
        
        <div className='row'>
        </div>
      </div>
    )
  }
})

module.exports = Service;
