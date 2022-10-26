import { Alert } from 'react-native';

export const showMessage = (message: string, callback = () => {}) => {
  Alert.alert('', message, [{ text: 'OK', onPress: callback }]);
};

export const showConfirmDialog = (title: string, message: string, confirmText = 'OK', onConfirm = () => {}, cancelText = 'Cancel') => {
  Alert.alert(title, message, [{ text: cancelText }, { text: confirmText, onPress: onConfirm }]);
};

export const showErrorMessage = (message: string, callback = () => {}) => {
  Alert.alert('Error', message, [{ text: 'OK', onPress: callback }]);
};
