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

export const consumeableOrder = (unit, order, customer)=>{
  return dispatch => {
    var req = {
      unit: unit,
      order: order,
      customer: customer,
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

export const updateOrder = (amount, oid)=>{
  return dispatch => {
    var req = {
      oid: oid,
      amount: amount,
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
