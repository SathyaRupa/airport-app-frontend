import {IconButton} from 'react-native-paper';

export default function UpdateButton({onPress}) {
  return (
    <IconButton
      icon="pencil"
      mode="default"
      iconColor="white"
      size={30}
      onPress={onPress}
    />
  );
}
