import React, {useState} from 'react';
import {Portal, Dialog, Text, Button} from 'react-native-paper';
import {View, TextInput, StyleSheet} from 'react-native';

export default function FilterDialog({
  visible,
  dismiss,
  onClick,
  setFloor,
  floor,
}) {
  const [floorError, setFloorError] = useState('');
  function handleFloorChange(newText) {
    if (!/^\d*$/.test(newText)) {
      setFloorError('Floor number must be a number.');
    } else if (parseInt(newText) > 10) {
      setFloorError('Floor number should not exceed 10.');
    } else {
      setFloorError('');
    }
    setFloor(newText);
  }
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={dismiss} style={styles.dialog}>
        <Dialog.Content>
          <Text>Floor number :</Text>
          <TextInput
            style={styles.input}
            value={floor}
            onChangeText={handleFloorChange}
            testID="floor-input-column"
          />
          {floorError ? (
            <Text style={styles.errorText}>{floorError}</Text>
          ) : (
            <Text> </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="text"
            disabled={!!floorError}
            onPress={onClick}
            style={styles.dialogButton}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
    height: 190,
    width: 290,
    alignSelf: 'center',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 11,
  },
  dialogButton: {
    marginBottom: 5,
  },
});
