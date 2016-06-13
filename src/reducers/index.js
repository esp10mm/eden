import { combineReducers } from 'redux'
import codelist from './codelist'
import auth from './auth'
import manage from './manage'
import service from './service'

const rootReducer = combineReducers({
  codelist,
  auth,
  manage,
  service,
})

export default rootReducer
