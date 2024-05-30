import React from 'react';
import {IconButton} from 'react-native-paper';

function DeleteButton({onPress}) {
  return (
    <IconButton
      iconColor="white"
      icon="delete"
      mode="default"
      size={30}
      onPress={onPress}
      testID="delete-icon"
    />
  );
}
export default DeleteButton;
