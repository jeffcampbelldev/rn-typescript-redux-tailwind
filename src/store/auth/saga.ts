import { all, fork, put, take } from 'redux-saga/effects';
import { GoogleSignin, User as GUser } from '@react-native-google-signin/google-signin';
import { appleAuth, AppleRequestResponse } from '@invertase/react-native-apple-authentication';

import { GoogleConfig } from '_app/config';
import { FAIL, LOG_OUT, START, SUCCESS } from '../common';
import * as actions from './actions';
import { Dialog, mapError } from '_app/helper';
import { AxiosInstance, LocalStorageService, NavigationService } from '_app/services';
import { PRODUCTS, User } from '_app/types';

GoogleSignin.configure({ webClientId: GoogleConfig.WEB_CLIENT_ID });

function* logOut() {
  while (true) {
    yield LocalStorageService.clearAuthToken();
    yield take(LOG_OUT);
  }
}

function* fetchUser() {
  while (true) {
    yield take(actions.FETCH_USER + START);
    try {
      const { data }: { data: User } = yield AxiosInstance.get('/users/me');
      yield put({ type: actions.FETCH_USER + SUCCESS, payload: data });
    } catch (error) {
      const e = mapError(error);
      if (e.status === 401) {
        yield put({ type: LOG_OUT });
      }
      yield put({ type: actions.FETCH_USER + FAIL, payload: e });
    }
  }
}

function* googleLogin() {
  while (true) {
    yield take(actions.GOOGLE_LOGIN + START);
    try {
      const gUser: GUser = yield GoogleSignin.signIn();
      const { data }: { data: { user: User; token: string } } = yield AxiosInstance.post('/auth/google', { token: gUser.idToken });
      yield put({ type: actions.GOOGLE_LOGIN + SUCCESS, payload: data.user });
      yield LocalStorageService.setAuthToken(data.token);
      if (!data.user.profile && data.user.email) {
        NavigationService.navigate({
          name: 'UserName',
          params: { email: data.user.email, fName: gUser.user.givenName || '', lName: gUser.user.familyName || '', isSocialSignup: true },
        });
        continue;
      }
      NavigationService.replace('AuthedStack');
    } catch (error) {
      const e = mapError(error);
      if (!e.message.includes('RNGoogleSignInError: The user canceled')) {
        Dialog.showErrorMessage(e.message);
      }
      yield put({ type: actions.GOOGLE_LOGIN + FAIL, payload: e });
    }
  }
}

function* appleLogin() {
  while (true) {
    yield take(actions.APPLE_LOGIN + START);
    try {
      const appleResponse: AppleRequestResponse = yield appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const { data }: { data: { user: User; token: string } } = yield AxiosInstance.post('/auth/apple', {
        token: appleResponse.identityToken,
      });
      yield put({ type: actions.APPLE_LOGIN + SUCCESS, payload: data.user });
      yield LocalStorageService.setAuthToken(data.token);

      if (!data.user.profile && data.user.email) {
        NavigationService.navigate({
          name: 'UserName',
          params: {
            email: data.user.email,
            isSocialSignup: true,
          },
        });
        continue;
      }

      NavigationService.replace('AuthedStack');
    } catch (error) {
      const e = mapError(error);
      if (!e.message.includes('AuthorizationError error 1001')) {
        Dialog.showErrorMessage(e.message);
      }
      yield put({ type: actions.APPLE_LOGIN + FAIL, payload: e });
    }
  }
}

function* emailLogin() {
  while (true) {
    const { payload } = yield take(actions.EMAIL_LOGIN + START);
    try {
      const { data }: { data: { user: User; token: string } } = yield AxiosInstance.post('/auth/login', { ...payload });
      yield put({ type: actions.EMAIL_LOGIN + SUCCESS, payload: data.user });
      if (data.user.emailVerified) {
        yield LocalStorageService.setAuthToken(data.token);
        NavigationService.replace('AuthedStack');
      } else {
        NavigationService.reset(['Welcome', 'EmailVerify']);
      }
    } catch (error) {
      const e = mapError(error);
      Dialog.showErrorMessage(e.message);
      yield put({ type: actions.EMAIL_LOGIN + FAIL, payload: e });
    }
  }
}

function* emailSignup() {
  while (true) {
    const { payload } = yield take(actions.EMAIL_SIGNUP + START);
    try {
      const { data }: { data: { user: User; token: string } } = yield AxiosInstance.post('/auth/register', {
        ...payload,
        product: PRODUCTS.BOLT_PLUS,
      });
      yield put({ type: actions.EMAIL_SIGNUP + SUCCESS, payload: data.user });
      if (data.user.emailVerified) {
        yield LocalStorageService.setAuthToken(data.token);
        NavigationService.replace('AuthedStack');
      } else {
        NavigationService.reset(['Welcome', 'EmailVerify']);
      }
    } catch (error) {
      const e = mapError(error);
      Dialog.showErrorMessage(e.message);
      yield put({ type: actions.EMAIL_SIGNUP + FAIL, payload: e });
    }
  }
}

function* updateProfile() {
  while (true) {
    const { payload } = yield take(actions.UPDATE_PROFILE + START);
    try {
      const { data }: { data: { user: User; token: string } } = yield AxiosInstance.post('/users/profile', {
        ...payload,
      });
      yield put({ type: actions.UPDATE_PROFILE + SUCCESS, payload: data });
      NavigationService.replace('AuthedStack');
    } catch (error) {
      const e = mapError(error);
      Dialog.showErrorMessage(e.message);
      yield put({ type: actions.UPDATE_PROFILE + FAIL, payload: e });
    }
  }
}

export default function* () {
  yield all([fork(logOut), fork(googleLogin), fork(appleLogin), fork(emailLogin), fork(emailSignup), fork(fetchUser), fork(updateProfile)]);
}
