import { combineActions, handleActions } from 'redux-actions';
import produce from 'immer';

import * as actions from './actions';
import { FAIL, LOG_OUT, START, SUCCESS } from '../common';
import { AuthState } from '_app/types';

const initialState: AuthState = {
  loading: false,
  user: undefined,
  error: undefined,
};

const reducer = handleActions<AuthState, any>(
  {
    [LOG_OUT]: () => initialState,
    [`${combineActions(
      actions.EMAIL_LOGIN + START,
      actions.EMAIL_SIGNUP + START,
      actions.GOOGLE_LOGIN + START,
      actions.APPLE_LOGIN + START,
      actions.UPDATE_PROFILE + START,
    )}`]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = undefined;
      }),
    [`${combineActions(
      actions.EMAIL_LOGIN + SUCCESS,
      actions.EMAIL_SIGNUP + SUCCESS,
      actions.GOOGLE_LOGIN + SUCCESS,
      actions.APPLE_LOGIN + SUCCESS,
      actions.UPDATE_PROFILE + SUCCESS,
    )}`]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = false;
        draft.user = payload;
        draft.error = undefined;
      }),
    [`${combineActions(
      actions.EMAIL_LOGIN + FAIL,
      actions.EMAIL_SIGNUP + FAIL,
      actions.GOOGLE_LOGIN + FAIL,
      actions.APPLE_LOGIN + FAIL,
      actions.UPDATE_PROFILE + FAIL,
    )}`]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = false;
        draft.user = undefined;
        draft.error = payload;
      }),
    [actions.FETCH_USER + SUCCESS]: (state, { payload }) =>
      produce(state, draft => {
        draft.user = payload;
        draft.error = undefined;
      }),
    [actions.FETCH_USER + FAIL]: (state, { payload }) =>
      produce(state, draft => {
        draft.user = undefined;
        draft.error = payload;
      }),
  },
  initialState,
);

export default reducer;
