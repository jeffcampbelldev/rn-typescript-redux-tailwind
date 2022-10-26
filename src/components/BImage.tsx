import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

export const BImage = (props: FastImageProps) => <FastImage {...props}>{props.children}</FastImage>;
