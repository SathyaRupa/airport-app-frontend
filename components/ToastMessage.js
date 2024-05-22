import Toast from 'react-native-toast-message';

export const SuccessToast = message => {
  Toast.show({
    text1: 'Success',
    text2: message,
    type: 'success',
  });
};

export const ErrorToast = message => {
  Toast.show({
    text1: 'Error',
    text2: message,
    type: 'error',
  });
};
