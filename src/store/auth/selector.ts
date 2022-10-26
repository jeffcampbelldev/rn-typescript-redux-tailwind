import { createSelector } from 'reselect';
import { RootState } from '..';

const getAuthState = ({ auth }: RootState) => auth;

export const authSelector = createSelector([getAuthState], auth => auth);
