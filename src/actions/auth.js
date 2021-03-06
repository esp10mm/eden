import * as Cookies from 'js-cookie'

export const login = (account, password)=>{
  return dispatch => {
    var req = {account: account, password: password};
    $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    })
    .done((res)=>{
      dispatch(res);
    })
  }
} 

export const checkToken = ()=>{
  console.log('check');
  return dispatch => {
    var req = {token: Cookies.get('token'), uid: Cookies.get('uid')};
    $.ajax({
      url: '/api/checkToken',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    })
    .done((res)=>{
      dispatch(res);
    })
  }
}

export const ureset = (pwd)=>{
  return dispatch => {
    var req = {
      token: Cookies.get('token'), 
      uid: Cookies.get('uid'),
      username: '',
      pwd: pwd, 
    };
    $.ajax({
      url: '/api/ureset',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    })
    .done((res)=>{
      dispatch(res);
    })
  }
}
