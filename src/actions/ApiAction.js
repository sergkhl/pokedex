import {API_CALL_BEGIN, API_CALL_ERROR} from '../constants';

export const ApiCallBeginAction = () => ({
    type: API_CALL_BEGIN
});

export const ApiCallErrorAction = () => ({
    type: API_CALL_ERROR
});


