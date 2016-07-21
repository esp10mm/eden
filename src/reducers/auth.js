import * as Cookies from 'js-cookie'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
const USER_SET_SUCCESS = 'USER_SET_SUCCESS'

const initialState = {login: false, token: null, msg: null, user:{}}

const auth = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      Cookies.set('token', action.token);
      if(action.uid !== undefined) {
        Cookies.set('uid', action.uid);
        Cookies.set('type', action.userType);
        Cookies.set('unit', action.unit);
      }
      return {login:true, token: action.token, msg: LOGIN_SUCCESS, user: action.user}
    case LOGIN_FAILED:
      Cookies.remove('token');
      Cookies.remove('uid');
      Cookies.remove('type');
      Cookies.remove('unit');
      return {login:false, token: action.token, msg: LOGIN_FAILED, user:{}}
    case USER_SET_SUCCESS:
      alert('更改帳號密碼成功!');
      return {login:true, token: action.token, msg: USER_SET_SUCCESS, user: state.user}
    default:
      return state
  }
}

export default auth
