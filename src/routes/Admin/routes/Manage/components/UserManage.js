import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const UserRow = React.createClass({
  componentDidMount(){
    $('.utd.dropdown').dropdown();
    $('.uud.dropdown').dropdown();
  },

  removeUser(){

  },

  render(){
    let user_type = this.props.user.user_type===undefined?'':this.props.user.user_type.trim();

    if(user_type == 'admin')
      user_type = '管理者';
    else if(user_type == 'super')
      user_type = '監督';
    else if(user_type == 'user')
      user_type = '使用者';

    let style = {
      input: {
        maxWidth: '120px',
      }     
    }

    return(
      <tr>
        <td>
          <div className='ui input' style={style.input}>
            <input type='text' defaultValue={this.props.user.username.trim()}/>
          </div>
        </td>
        <td>
          <div className='ui input' style={style.input}>
            <input type='text' defaultValue={this.props.user.name.trim()}/>
          </div>
        </td>
        <td>
          <div className={`ui selection dropdown ${this.props.user.id} uud`}>
            <input type='hidden' value={this.props.user.unit}/>
            <i className='dropdown icon'/>
            <div className='default text'>{this.props.user.unit_name}</div>
            <div className='menu' style={style.input}>
            {
              this.props.unit.map((unit)=>{
                return(
                    <div className='item' data-value={unit.id} key={unit.id}>{unit.name}</div>
                  )
              })
            }
            </div>
          </div>
        </td>
        <td>
          <div className={`ui selection dropdown ${this.props.user.id} utd`}>
            <input type='hidden' value={this.props.user.user_type}/>
            <i className='dropdown icon'/>
            <div className='default text'>{user_type}</div>
            <div className='menu' style={style.input}>
              <div className='item' data-value='admin' key='1'>管理者</div>
              <div className='item' data-value='super' key='2'>監督</div>
              <div className='item' data-value='user' key='3'>使用者</div>
            </div>
          </div>
        </td>
        <td>
          <i className='ui remove red icon' onClick={this.removeUser}/>
        </td>
      </tr>
    )
  }
})

const UserList = React.createClass({
  render() {
    return(
      <table className='ui striped table'>
        <thead>
          <tr>
            <th>帳號</th>
            <th>名稱</th>
            <th>組別</th>
            <th>權限</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.users.map((user)=>{
            return(
              <UserRow user={user} key={user.id} unit={this.props.unit}/>
              )
          })
        }
        </tbody>
      </table>
    )
  }

})

const UserManage = React.createClass({
  getInitialState(){
    return({users:[]});
  },

  componentDidMount(){
    this.userList();
  },

  userList(){
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
      this.setState({users:res.result});
    })
  },

  addUser(){
    $.ajax({
      url: '/api/addUser',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        uid: Cookies.get('uid'),
      }),
    })
    .done((res)=>{
      this.userList();
    })
  },

  render() {
    let unit = [];

    if(this.props.manage.get('unit') !== undefined)
      unit = this.props.manage.get('unit');

    return(
      <div className='content'>
        <UserList users={this.state.users} unit={unit}/>
        <div className='ui button' onClick={this.addUser}>新增用戶</div>
      </div>
    )
  }
})

module.exports = UserManage;
