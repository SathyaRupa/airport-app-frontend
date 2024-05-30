import React from 'react';
import AirlineService from '../../helpers/AirlineService';
import {SuccessToast, ErrorToast} from '../../components/ToastMessage';
import AirlineForm from '../../components/AirlineForm';

const CreateAirline = ({navigation}) => {
  const handleSubmit = async values => {
    values.count = parseInt(values.count);
    try {
      const response = await AirlineService.create(values);
      if (response.status === 201) {
        SuccessToast(response.data);
        setTimeout(() => {
          navigation.pop();
        }, 1000);
      } else {
        ErrorToast(response.data);
      }
    } catch {
      ErrorToast();
    }
  };

  return <AirlineForm handleSubmit={handleSubmit} />;
};

export default CreateAirline;
