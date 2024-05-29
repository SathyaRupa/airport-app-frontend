import {IconButton} from 'react-native-paper';

export default function DeleteButton({onPress}) {
  return (
    <IconButton
      iconColor="white"
      icon="delete"
      mode="default"
      size={30}
      onPress={onPress}
    />
  );
}
