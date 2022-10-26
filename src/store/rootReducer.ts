import { combineReducers } from 'redux';

import templateReducer from './template/reducer';
import authReducer from './auth/reducer';

export default combineReducers({
  template: templateReducer,
  auth: authReducer,
});
