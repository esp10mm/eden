import React from 'react'
import { browserHistory } from 'react-router'

const Login = React.createClass({
  componentDidMount() {
    $('.main').transition('fade');
    
    $('.password, .account').keyup((event)=>{
      if(event.keyCode == 13)
        $('.login.button').click();
    })
    .focus(()=>{
      $('.icon.input').removeClass('error');
      $('.account, .password').attr('placeholder', '');
    })
  },

  componentWillReceiveProps(newProps) {
    $('.icon.input').removeClass('loading');
    $('.account, .password').val('');

    if(newProps.auth.login) {
      $('.main').transition('fade');

      setTimeout(()=>{
        browserHistory.push('/home');
      }, 500)
    }

    else {
      $('.icon.input').addClass('error');

      switch(newProps.auth.msg) {
        case 'LOGIN_FAILED':
          $('.account, .password').attr('placeholder', '帳號或密碼錯誤');
          break;
      }
    }
  },

  loginSubmit() {
    var account = $('.account').val();      
    var password = $('.password').val();      
    $('.account, .password').blur();
    $('.icon.input').addClass('loading');
    this.props.func.login(account, password);
  },

  toHomePage() {
    $('.main').transition('fade');

    setTimeout(()=>{
      browserHistory.push('/');
    }, 500)
  },

  render() {
    var style = {
      container: {
        maxWidth: '700px',
        height: '100%',
        margin: '0px auto',
      },
      title: {
        fontSize: '50px',
        color: 'black',
        margin: '0px auto',
        display: 'block',
      },
      formContainer: {
        margin: '0px auto',
      },
      formLabel: {
        fontSize: '20px',
        textAlign: 'left',
        marginBottom: '5px',
      },
      button: {
        textShadow: '#707070 0.05px 0.05px 0.05px',
        fontFamily: 'Arial,"Microsoft YaHei"',
        fontWeight: '400',
      },
    };

    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='ui row'/>       
        <div className='ui row'>       
          <div className='main' style={ style.title }>
            登入
          </div>
        </div>
        <div className='ui row'>       
          <div className='ui main center compact aligned segment' style={ style.formContainer }>
            <div className='ui form'>
              <div className='field' style={ style.formLabel }>
                帳號:
              </div>
              <div className='field'/>
              <div className='field'>
                <div className='ui icon input'>
                  <input className='account' type='text'/>
                  <i className='icon'/> 
                </div>
              </div>
              <div className='field'/>
              <div className='field' style={ style.formLabel }>
                密碼:
              </div>
              <div className='field'/>
              <div className='field'>
                <div className='ui icon input'>
                  <input className='password' type='password'/>
                  <i className='icon'/> 
                </div>
              </div>
              <div className='field'/>
            </div>
            <div className='ui login button' style={ style.button } onClick={ this.loginSubmit }>
              登入
            </div>
          </div>
        </div>
        <div className='ui row'/>       
      </div>
    )
  }
})

module.exports = Login;
