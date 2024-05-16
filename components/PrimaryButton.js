import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

function Primarybutton({title,handleOnPress}) {
  return(
    <Button
      style={styles.button}
      mode="contained"
      onPress={handleOnPress}>
      {title}
    </Button>
  );
}

export default Primarybutton;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: '#4cb5ed',
    width: 150,
    height: 40,
  },
});
