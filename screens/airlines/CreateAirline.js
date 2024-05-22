import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Primarybutton from '../../components/PrimaryButton';
import airlinesService from '../../helpers/airlinesService';
import Toast from 'react-native-toast-message';
import { SuccessToast } from '../../components/ToastMessage';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(
      /^[a-zA-Z ]+$/,
      'Name must not contain numbers or special characters',
    )
    .min(2, 'Name must be at least 2 characters long'),
  count: Yup.string()
    .required('Count is required')
    .matches(/^[0-9]+$/, 'Count must only contain numbers')
    .min(1, 'Count must be at least 1'),
});

const CreateAirline = ({navigation}) => {


  const handleSubmit = async values => {
    values.count = parseInt(values.count);
    const response = await airlinesService.create(values);
    console.log(response.data)
    if (response.status === 201) {
      SuccessToast(response.data);

      setTimeout(() => {
        navigation.pop();
      }, 4000);
    } else {
      ErrorToast(response.data)
    }
  };

  return (
    <Formik
      initialValues={{name: '', count: ''}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Airline Name"
            onChangeText={handleChange('name')}
            value={values.name}
          />
          {touched.name && errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Number of Aircrafts"
            onChangeText={handleChange('count')}
            value={values.count}
            keyboardType="numeric"
          />
          {touched.count && errors.count && (
            <Text style={styles.error}>{errors.count}</Text>
          )}

          <Primarybutton handleOnPress={handleSubmit} title="Submit" />
          <Toast ref={ref => Toast.setRef(ref)} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#4D869C',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: '#E72929',
    marginBottom: 10,
  },
});

export default CreateAirline;
