import * as Cookies from 'js-cookie'

export const addItem = (obj)=>{
  return dispatch => {
    var req = {
      name: obj.name,
      isStationery: obj.isStationery,
      token: Cookies.get('token'),
      uid: Cookies.get('uid'),
    };
    $.ajax({
      url: '/api/addItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    })
    .done((res)=>{
      dispatch(res);
    })
  }
}

export const delItem = (obj)=>{
  return dispatch => {
    var req = {
      name: obj.name,
      token: Cookies.get('token'),
      uid: Cookies.get('uid'),
    };
    $.ajax({
      url: '/api/delItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    })
    .done((res)=>{
      dispatch(res);
    })
  }
}

export const unitList = ()=>{
  return dispatch => {
    var req = {
      token: Cookies.get('token'),
    };
    $.ajax({
      url: '/api/unitList',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const itemList = ()=>{
  return dispatch => {
    var req = {
      token: Cookies.get('token'),
    };
    $.ajax({
      url: '/api/itemList',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const orderList = (page, limit, unit)=>{
  return dispatch => {
    var req = {
      token: Cookies.get('token'),
      page: page,
      limit: limit,
      unit: unit,
    };
    $.ajax({
      url: '/api/orderList',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const inout = (obj)=>{
  return dispatch => {
    var req = obj;
    req.uid  = Cookies.get('uid');

    req.token = Cookies.get('token');
    $.ajax({
      url: '/api/inout',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const itemInfo = (obj)=>{
  return dispatch => {
    var req = obj;
    req.token = Cookies.get('token');
    req.uid  = Cookies.get('uid');
    $.ajax({
      url: '/api/itemInfo',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const orderInfo = (oid)=>{
  return dispatch => {
    var req = {
      oid: oid,
    };
    req.token = Cookies.get('token');
    req.uid  = Cookies.get('uid');
    $.ajax({
      url: '/api/orderInfo',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const finishOrder = (oid, status, items)=>{
  return dispatch => {
    var req = {
      oid: oid,
      status: status,
      items: items,
    };
    req.token = Cookies.get('token');
    req.uid  = Cookies.get('uid');
    $.ajax({
      url: '/api/finishOrder',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const finishSel = (oids)=>{
  return dispatch => {
    var req = {
      oids: oids,
    };
    req.token = Cookies.get('token');
    req.uid  = Cookies.get('uid');
    $.ajax({
      url: '/api/finishSel',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}
