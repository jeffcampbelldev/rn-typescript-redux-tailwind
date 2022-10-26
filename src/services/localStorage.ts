import AsyncStorage from '@react-native-async-storage/async-storage';

const session = 'boltplus_access_token';

export const setAuthToken = async (token: string) => {
  await AsyncStorage.setItem(session, token);
};

export const clearAuthToken = async () => {
  await AsyncStorage.removeItem(session);
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem(session);
};
