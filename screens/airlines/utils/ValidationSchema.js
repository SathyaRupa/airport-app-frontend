import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(
      /^[a-zA-Z ]+$/,
      'Name must not contain numbers or special characters',
    )
    .min(2, 'Name must be at least 2 characters long'),
  count: Yup.string()
    .matches(/^[0-9]+$/, 'Count must only contain numbers')
    .min(1, 'Count must be at least 1'),
});

export default ValidationSchema;
