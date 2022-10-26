import { createStore, applyMiddleware, compose, Reducer, CombinedState, AnyAction } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { TemplateState, AuthState } from '_app/types';

declare const window: any;

type RootReducer = Reducer<
  CombinedState<{
    template: TemplateState;
    auth: AuthState;
  }>,
  AnyAction
>;

export type RootState = ReturnType<RootReducer>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createDebugger = require('redux-flipper').default;

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(__DEV__ ? applyMiddleware(sagaMiddleware, createDebugger()) : applyMiddleware(sagaMiddleware)),
);

if (__DEV__) {
  window.store = store;
}

sagaMiddleware.run(rootSaga, store.dispatch);

export default store;

export const persistor = persistStore(store);
