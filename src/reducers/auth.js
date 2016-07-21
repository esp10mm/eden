import * as Cookies from 'js-cookie'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
const USER_SET_SUCCESS = 'USER_SET_SUCCESS'

const initialState = {login: false, token: null, msg: null, userType: 'user'}

const auth = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      Cookies.set('token', action.token);
      if(action.uid !== undefined) {
        Cookies.set('uid', action.uid);
        Cookies.set('type', action.userType);
      }
      return {login:true, token: action.token, msg: LOGIN_SUCCESS, userType: action.userType}
    case LOGIN_FAILED:
      Cookies.remove('token');
      Cookies.remove('uid');
      Cookies.remove('type');
      return {login:false, token: action.token, msg: LOGIN_FAILED, userType: 'user'}
    case USER_SET_SUCCESS:
      alert('更改帳號密碼成功!');
      return {login:true, token: action.token, msg: USER_SET_SUCCESS, userType: state.userType}
    default:
      return state
  }
}

export default auth
