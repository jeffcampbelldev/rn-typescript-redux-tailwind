import Config from 'react-native-config';

import { APP_ENV } from '_app/types';

type AppConfig = {
  API_URL: string;
  APP_ENV: APP_ENV;
};

const config: AppConfig = {
  API_URL: Config.API_URL,
  APP_ENV: (Config.APP_ENV as APP_ENV) || APP_ENV.dev,
};

export default config;
