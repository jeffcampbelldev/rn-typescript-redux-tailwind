import { all, fork } from 'redux-saga/effects';
import { Dispatch } from 'redux';

import templateSaga from './template/saga';
import authSaga from './auth/saga';

export default function* rootSaga(_: Dispatch<any>) {
  yield all([fork(templateSaga), fork(authSaga)]);
}
