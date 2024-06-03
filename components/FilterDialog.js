import React from 'react';
import {Portal, Dialog, Text, Button} from 'react-native-paper';
import {View, TextInput, StyleSheet} from 'react-native';

export default function FilterDialog({visible, dismiss, onClick, setFloor}) {
  return (
    <Portal>
      <View style={styles.container}>
        <Dialog visible={visible} onDismiss={dismiss} style={styles.dialog}>
          <Dialog.Content>
            <Text>Floor number :</Text>
            <TextInput
              style={styles.input}
              onChangeText={newText => setFloor(newText)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onClick}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
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
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
