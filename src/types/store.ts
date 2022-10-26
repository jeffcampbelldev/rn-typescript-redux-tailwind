import { BoltError } from './error';
import { User } from './user';

export interface TemplateState {
  template: boolean;
}

export interface AuthState {
  loading: boolean;
  user: User | undefined;
  error: BoltError | undefined;
}
