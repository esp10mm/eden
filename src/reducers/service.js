import Immutable from 'immutable'

const initialState = Immutable.fromJS({SelectedAmount: {}, SelectedItems: [], type: null,});

const UPDATE_SELECTED = 'UPDATE_SELECTED'
const UPDATE_SELECTED_AMOUNT = 'UPDATE_SELECTED_AMOUNT'

const CONSUME_ORDER_SUCCESSED = 'CONSUME_ORDER_SUCCESSED'

const UPDATE_ORDER_SUCCESSED = 'UPDATE_ORDER_SUCCESSED'

const CLEAR_SELECTED = 'CLEAR_SELECTED'

const service = (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED:
      return state.withMutations((ctx)=>{
        ctx.set('type', UPDATE_SELECTED);
        ctx.set('SelectedItems', action.items);
      })
    case UPDATE_SELECTED_AMOUNT:
      return state.withMutations((ctx)=>{
        ctx.set('type', UPDATE_SELECTED_AMOUNT);
        ctx.setIn(['SelectedAmount', action.item], action.num);
      })
    case CONSUME_ORDER_SUCCESSED:
      return state.set('type', CONSUME_ORDER_SUCCESSED);
    case CLEAR_SELECTED:
      return initialState.set('type', CLEAR_SELECTED);
    case UPDATE_ORDER_SUCCESSED:
      alert('修改訂單成功!');
      return state.set('type', UPDATE_ORDER_SUCCESSED);
    default:
      return state
  }
}

export default service
