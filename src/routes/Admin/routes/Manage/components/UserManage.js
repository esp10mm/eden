import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const UserList = React.createClass({
  render() {
    return(
      <table className='ui striped table'>
        <thead>
          <tr>
            <th>帳號</th>
            <th>名稱</th>
            <th>權限</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    )
  }

})

const UserManage = React.createClass({
  componentDidMount(){
    $.ajax({
      url: '/api/userList',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        uid: Cookies.get('uid')
      }),
    })
    .done((res)=>{
      console.log(res);
    })
  },

  render() {
    return(
      <div className='content'>
        <UserList/>
      </div>
    )
  }
})

module.exports = UserManage;
