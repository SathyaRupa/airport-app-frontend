import * as Yup from 'yup';

const ValidationSchemaGate = Yup.object().shape({
  gateNumber: Yup.string()
    .required('Gate number is required')
    .matches(/^[0-9]+$/, 'Gate number must contain only numbers')
    .min(1, 'Gate number must be at least 1 character long'),
  floorNumber: Yup.string()
    .required('Floor number is required')
    .matches(/^[0-9]+$/, 'Floor number must contain only numbers')
    .min(1, 'Floor number must be at least 1 character long'),
});

export default ValidationSchemaGate;
