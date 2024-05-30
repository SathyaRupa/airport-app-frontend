import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Primarybutton from './PrimaryButton';
import Toast from 'react-native-toast-message';
import ValidationSchema from '../screens/airlines/utils/ValidationSchema';

function AirlineForm({handleSubmit}) {
  return (
    <Formik
      initialValues={{name: '', count: ''}}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Airline Name"
            onChangeText={handleChange('name')}
            value={values.name}
            theme={{
              colors: {
                primary: '#4D869C',
              },
            }}
          />
          {touched.name && errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Number of Aircrafts"
            onChangeText={handleChange('count')}
            value={values.count}
            keyboardType="number-pad"
            theme={{
              colors: {
                primary: '#4D869C',
              },
            }}
          />
          {touched.count && errors.count && (
            <Text style={styles.error}>{errors.count}</Text>
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

export default AirlineForm;
