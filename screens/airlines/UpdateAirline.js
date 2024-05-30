import React from 'react';
import AirlineForm from '../../components/AirlineForm';
import AirlineService from '../../helpers/AirlineService';
import {SuccessToast, ErrorToast} from '../../components/ToastMessage';
export default function UpdateAirline({route, navigation}) {
  const {id} = route.params;

  const handleSubmit = async values => {
    values.count = parseInt(values.count);
    try {
      const response = await AirlineService.update(values, id);
      if (response.status === 201) {
        SuccessToast(response.data.message);
        setTimeout(() => {
          navigation.pop();
        }, 1000);
      } else {
        ErrorToast(response);
      }
    } catch {
      ErrorToast();
    }
  };
  return <AirlineForm handleSubmit={handleSubmit} />;
}
