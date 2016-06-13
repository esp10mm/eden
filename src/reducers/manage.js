import Immutable from 'immutable'

const initialState = Immutable.fromJS({results: [], type: null, unit:[], orders:[], items:[]});

const ADDITEM_SUCCESSED = 'ADDITEM_SUCCESSED'
const ADDITEM_FAILED= 'ADDITEM_FAILED'

const DELITEM_SUCCESSED = 'DELITEM_SUCCESSED'
const DELITEM_FAILED= 'DELITEM_FAILED'

const ITEM_LIST_SUCCESSED = 'ITEM_LIST_SUCCESSED'
const ITEM_LIST_FAILED = 'ITEM_LIST_FAILED'

const UNIT_LIST_SUCCESSED = 'UNIT_LIST_SUCCESSED'
const UNIT_LIST_FAILED = 'UNIT_LIST_FAILED'

const ITEM_INFO_SUCCESSED = 'ITEM_INFO_SUCCESSED'
const ITEM_INFO_FAILED = 'ITEM_INFO_FAILED'

const INOUT_SUCCESSED = 'INOUT_SUCCESSED'

const ORDER_LIST_SUCCESSED = 'ORDER_LIST_SUCCESSED'

const ORDER_INFO_SUCCESSED = 'ORDER_INFO_SUCCESSED'

const FINISH_ORDER_SUCCESSED = 'FINISH_ORDER_SUCCESSED'

const FINISH_SEL_SUCCESSED = 'FINISH_SEL_SUCCESSED'

const manage = (state=initialState, action) => {
  switch (action.type) {
    case ADDITEM_SUCCESSED:
      return state.set('type', ADDITEM_SUCCESSED)
    case ADDITEM_FAILED:
      return state.set('type', ADDITEM_FAILED)
    case DELITEM_SUCCESSED:
      return state.set('type', DELITEM_SUCCESSED)
    case DELITEM_FAILED:
      return state.set('type', DELITEM_FAILED)
    case INOUT_SUCCESSED:
      return state.set('type', INOUT_SUCCESSED)
    case ITEM_LIST_SUCCESSED:
      return state.withMutations((ctx)=>{
        ctx.set('type', ITEM_LIST_SUCCESSED);
        ctx.set('items', action.results);
        ctx.set('results', action.results);
      })
    case UNIT_LIST_SUCCESSED:
      return state.withMutations((ctx)=>{
        ctx.set('type', UNIT_LIST_SUCCESSED);
        ctx.set('unit', action.results);
      })
    case ITEM_INFO_SUCCESSED:
      return state.withMutations((ctx)=>{
        ctx.set('type', ITEM_INFO_SUCCESSED);
        ctx.set('results', action.results);
      })
    case ORDER_INFO_SUCCESSED:
      return state.withMutations((ctx)=>{
        ctx.set('type', ORDER_INFO_SUCCESSED);
        ctx.set('results', action.results);
      })
    case ORDER_LIST_SUCCESSED:
      return state.withMutations((ctx)=>{
        ctx.set('type', ORDER_LIST_SUCCESSED);
        ctx.set('orders', action.results);
      })
    case FINISH_ORDER_SUCCESSED:
      return state.set('type', FINISH_ORDER_SUCCESSED)
    case FINISH_SEL_SUCCESSED:
      return state.set('type', FINISH_SEL_SUCCESSED)
    default:
      return state
  }
}

export default manage
