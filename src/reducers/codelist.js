import { ADD_CODE } from '../actions/codelist'

const initialState = []

export default function codelist(state=initialState, action) {
  switch (action.type) {
    case ADD_CODE:
      state = action.cards
      return state 
    default:
      return state
  }
}
