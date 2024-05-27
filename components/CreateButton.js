import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

export default CreateButton = ({handleOnPress}) => {
  return (
    <View style={styles.container}>
      <Button style={styles.button} mode="contained" onPress={handleOnPress}>
        Create
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    padding: 10,
  },
  button: {
    width: 120,
    backgroundColor: '#7AB2B2',
  },
});
