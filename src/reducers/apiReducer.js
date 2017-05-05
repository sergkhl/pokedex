import * as _ from 'lodash';
import {API_CALL_BEGIN, API_CALL_ERROR} from '../constants';
import initialState from './initialState';

const apiReducer = (state = initialState.apiReducer, action) => {
  if (action.type === API_CALL_BEGIN) {
    return {
      ...state, apiCallsInProgress: state.apiCallsInProgress + 1
    };

  } else if (isApiCallFinished(action.type) || action.type === API_CALL_ERROR) {
    return {
      ...state, apiCallsInProgress: state.apiCallsInProgress - 1
    };
  }

  return state;
};

function isApiCallFinished(type) {
  return _.endsWith(type, '_RESPONSE');
}

export default apiReducer;
