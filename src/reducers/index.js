import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import api from './apiReducer';

export default combineReducers({
  user,
  runtime,
  api
});
