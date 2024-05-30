import React from 'react';
import {IconButton} from 'react-native-paper';

function UpdateButton({onPress}) {
  return (
    <IconButton
      icon="pencil"
      mode="default"
      iconColor="white"
      size={30}
      onPress={onPress}
      testID="update-icon"
    />
  );
}
export default UpdateButton;
