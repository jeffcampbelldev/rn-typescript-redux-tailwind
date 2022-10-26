import Config from './config';

export const WEB_CLIENT_ID = {
  dev: '286761658-5r6ek1dvrippidl4ta5o1oo4g6raqcbm.apps.googleusercontent.com',
  staging: '744777520501-pdbso5e2bk9k743rkcmv69ectkngob94.apps.googleusercontent.com',
  prod: '286761658-5r6ek1dvrippidl4ta5o1oo4g6raqcbm.apps.googleusercontent.com',
}[Config.APP_ENV];
