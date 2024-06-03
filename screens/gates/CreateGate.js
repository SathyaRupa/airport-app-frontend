import React from 'react';
import GateService from '../../helpers/GateService';
import {SuccessToast, ErrorToast} from '../../components/ToastMessage';
import GateForm from '../../components/GateForm';

const CreateGate = ({navigation}) => {
  const handleSubmit = async values => {
    const payload = {
      gate_number: parseInt(values.gateNumber),
      floor_number: parseInt(values.floorNumber),
    };
    try {
      const response = await GateService.create(payload);
      if (response.status === 200) {
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

  return <GateForm handleSubmit={handleSubmit} />;
};

export default CreateGate;
