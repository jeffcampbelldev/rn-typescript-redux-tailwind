import { Dimensions } from 'react-native';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

export const UNIT = windowWidth / 414;
export const h1Size = windowHeight * 0.05;
export const isXsDevice = UNIT < 1;

export const WIDTH_UNIT = windowWidth / 400;
export const HEIGHT_UNIT = windowWidth / 400;
