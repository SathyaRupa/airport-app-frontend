import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Primarybutton from './PrimaryButton';
import Toast from 'react-native-toast-message';
import ValidationSchemaGate from '../screens/gates/utils/ValidationSchemaGate';

function GateForm({handleSubmit}) {
  return (
    <Formik
      initialValues={{gateNumber: '', floorNumber: ''}}
      validationSchema={ValidationSchemaGate}
      onSubmit={handleSubmit}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Gate Number *"
            onChangeText={handleChange('gateNumber')}
            value={values.gateNumber}
            keyboardType="number-pad"
            theme={{
              colors: {
                primary: '#4D869C',
              },
            }}
          />
          {touched.gateNumber && errors.gateNumber && (
            <Text style={styles.error}>{errors.gateNumber}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Floor Number *"
            onChangeText={handleChange('floorNumber')}
            value={values.floorNumber}
            keyboardType="number-pad"
            theme={{
              colors: {
                primary: '#4D869C',
              },
            }}
          />
          {touched.floorNumber && errors.floorNumber && (
            <Text style={styles.error}>{errors.floorNumber}</Text>
          )}

          <Primarybutton handleOnPress={handleSubmit} title="Submit" />
          <Toast />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(77, 134, 156, 0.4)',
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: '#E72929',
    marginBottom: 10,
  },
});

export default GateForm;
