import React from 'react'

const Setting = React.createClass({

  ureset() {
    var pwd = $('.pwd.input input').val();
    var pwd_confirm = $('.pwd_confirm.input input').val();

    if(pwd == pwd_confirm) {
      $('.pwd.input input').val('');
      $('.pwd_confirm.input input').val('');
      this.props.func.ureset(pwd);
    }
    else
      alert('密碼不相符!');
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
      input: {
        height: '30px',
        marginTop: '5px',
      },
    };

    return(
      <div className='content'>
        <div style={ style.title }>更改密碼&nbsp;:</div>&nbsp;<br/>
        
        新密碼&nbsp;:&nbsp;
        <div className='ui pwd input' style={ style.input }>
          <input className='' type='password'/>
        </div>&nbsp;<br/>

        密碼確認&nbsp;:&nbsp;
        <div className='ui pwd_confirm input' style={ style.input }>
          <input className='' type='password'/>
        </div>&nbsp;<br/>

        <div className='ui button' style={ style.sectionBtn } onClick={ this.ureset } >確認修改</div>
      </div>
    )
  }
})

module.exports = Setting;
