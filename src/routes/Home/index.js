import React from 'react'
import LoadingPage from '../../components/LoadingPage'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'

const button = (pos) => {
  var style = {
    width: '200px',
    height: '100px',
    margin: '0px auto',
  };

  if(pos === 'right') {
    return style;
  }
  else {
    return style;
  }

}

const Home = React.createClass({

  componentDidMount() {
    $('.inverted.segment').on('mouseover',(e)=>{$(e.target).addClass('secondary')})
    $('.inverted.segment').on('mouseleave',(e)=>{$(e.target).removeClass('secondary')})
    $('.main').transition('fade');
  },

  toPage(path) {
    $('.main').transition('fade');
    browserHistory.push(path);
  },

  logout() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } 

    browserHistory.push('/login');
  },

  render() {

    var style = {
      container: {
        maxWidth: '700px',
        height: '100%',
        margin: '0px auto',
      },
      button: {
        width: '200px',
        height: '100px',
        margin: '0px auto',
        lineHeight: '40px',
        fontSize: '30px',
        textAlign: 'center',
        cursor: 'pointer',
        cursor: 'hand',
      },
      buttonSmall: {
        width: '100px',
        height: '50px',
        margin: '0px auto',
        lineHeight: '20px',
        fontSize: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        cursor: 'hand',
      },
    };

    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'/>
        <div className='row'>

          <div className='ui main center inverted green aligned segment' onClick={ ()=>this.toPage('/service') } style={ style.button }>
            倉庫服務 
          </div>
          
        </div>
        <div className='row'>
          <div className='ui main center segment' onClick={()=>this.toPage('/admin')} style={ style.buttonSmall }> 
            總務管理 
          </div>
          <div className='ui main center segment' onClick={this.logout} style={ style.buttonSmall }> 
            登出 
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Home;
