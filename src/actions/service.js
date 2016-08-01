export const updateSelected = (items, type)=>{
  var actionType = 'UPDATE_SELECTED';
  if(type == 1)
    actionType = 'UPDATE_S_SELECTED';
  return dispatch => {
    dispatch({type: actionType, items: items});
  }
} 

export const updateSelectedAmount = (item, num, type)=>{
  var actionType = 'UPDATE_SELECTED_AMOUNT';
  if(type == 1)
    actionType = 'UPDATE_S_SELECTED_AMOUNT';
  return dispatch => {
    dispatch({type: actionType, item: item, num: num});
  }
}

export const clearSelected = ()=>{
  return dispatch => {
    dispatch({type: 'CLEAR_SELECTED'});
  }
}

export const consumeableOrder = (unit, order, customer, type)=>{
  return dispatch => {
    var req = {
      unit: unit,
      order: order,
      customer: customer,
      type: type,
    };
    console.log(req);
    $.ajax({
      url: '/api/consumeableOrder',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}

export const updateOrder = (items, oid)=>{
  return dispatch => {
    var req = {
      oid: oid,
      items: items,
    };
    $.ajax({
      url: '/api/updateOrder',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(req),
    }) 
    .done((res)=>{
      dispatch(res);
    })
  } 
}
