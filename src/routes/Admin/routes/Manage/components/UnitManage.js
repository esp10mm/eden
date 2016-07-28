import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const UnitRow = React.createClass({
  componentDidMount(){
    $(`.utd.dropdown.${this.props.user.id}`).dropdown({
      onChange:(val, text)=>{this.updateType(val)}
    });
    $(`.uud.dropdown.${this.props.user.id}`).dropdown({
      onChange:(val, text)=>{this.updateUnit(val)}
    });
  },

  removeUser(){
    this.props.removeUser(this.props.user.id);
  },

  updateUsername(e){
    this.props.updateState(this.props.user.id, `username`, e.target.value);
  },

  updateName(e){
    this.props.updateState(this.props.user.id, `name`, e.target.value);
  },

  updateUnit(value){
    this.props.updateState(this.props.user.id, `unit`, value);
  },

  updateType(value){
    this.props.updateState(this.props.user.id, `user_type`, value);
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
            <input type='text' defaultValue={this.props.user.username.trim()} onBlur={this.updateUsername}/>
          </div>
        </td>
        <td>
          <div className='ui input' style={style.input}>
            <input type='text' defaultValue={this.props.user.name.trim()} onBlur={this.updateName}/>
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

const UnitList = React.createClass({
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
              <UserRow user={user} key={user.id} unit={this.props.unit} removeUser={this.props.removeUser} updateState={this.props.updateState}/>
              )
          })
        }
        </tbody>
      </table>
    )
  }

})

const UnitManage = React.createClass({
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
      }),
    })
    .done((res)=>{
      this.userList();
    })
  },

  updateState(id, prop, value){
    let state = this.state;
    let index = state.users.findIndex((c)=>{
      return c.id == id;
    });
    state.users[index][prop] = value;
    this.setState(state);
  },

  removeUser(id){
    $.ajax({
      url: '/api/removeUser',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        id: id,
      }),
    })
    .done((res)=>{
      this.userList();
    })
  },

  saveChange(){
    $.ajax({
      url: '/api/editUnit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        unit: this.state.unit,
      }),
    })
    .done((res)=>{
      alert('儲存變更成功!');
      this.func.unitList();
    })
  },

  render() {
    let unit = [];

    if(this.props.manage.get('unit') !== undefined)
      unit = this.props.manage.get('unit');

    return(
      <div className='content'>
        <UnitList unit={unit} removeUnit={this.removeUnit} updateState={this.updateState}/>
        <div className='ui button' onClick={this.addUnit}>新增單位</div>
        <div className='ui button' onClick={this.saveChange}>儲存變更</div>
      </div>
    )
  }
})

module.exports = UnitManage;
