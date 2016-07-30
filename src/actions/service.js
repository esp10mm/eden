export const updateSelected = (items)=>{
  return dispatch => {
    dispatch({type: 'UPDATE_SELECTED', items: items});
  }
} 

export const updateSelectedAmount = (item, num)=>{
  return dispatch => {
    dispatch({type: 'UPDATE_SELECTED_AMOUNT', item: item, num: num});
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
