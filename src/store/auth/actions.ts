import { createAction } from 'redux-actions';
import { LOG_OUT, START } from '../common';

export const FETCH_USER = 'FETCH_USER';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const APPLE_LOGIN = 'APPLE_LOGIN';
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const EMAIL_SIGNUP = 'EMAIL_SIGNUP';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const logOutAction = createAction(LOG_OUT);
export const fetchUserAction = createAction(FETCH_USER + START);
export const googleLoginAction = createAction(GOOGLE_LOGIN + START);
export const appleLoginAction = createAction(APPLE_LOGIN + START);
export const emailLoginAction = createAction(EMAIL_LOGIN + START);
export const emailSignupAction = createAction(EMAIL_SIGNUP + START);
export const updateProfileAction = createAction(UPDATE_PROFILE + START);
