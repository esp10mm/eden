export const ADD_CODE = 'ADD_CODE';

function addCards(cards) {
  return {
    type: ADD_CODE,
    cards: cards, 
  }
}

export function updateCodes() {
  return dispatch => {
    $.getJSON('/list', data => {
      dispatch(addCards(data))
    })
  }
}
