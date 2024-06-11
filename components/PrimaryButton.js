import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

function Primarybutton({title, handleOnPress, disabled}) {
  return (
    <Button
      style={[
        styles.button,
        disabled ? styles.disabledButton : styles.enabledButton,
      ]}
      mode="contained"
      onPress={handleOnPress}
      disabled={disabled}>
      {title}
    </Button>
  );
}

export default Primarybutton;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: 150,
    height: 40,
  },
  enabledButton: {
    backgroundColor: '#7AB2B2',
  },
  disabledButton: {
    backgroundColor: '#B0C4DE',
  },
});
