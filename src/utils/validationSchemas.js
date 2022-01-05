import * as Yup from 'yup';

export const REQUIRED_FIELD_VALIDATION_MSG = 'Required Field';
export const NEW_PASSWORD_VALIDATION_MSG = 'Use 10 or more characters';
export const NUMBER_VALIDATION_MSG = 'Only numbers';
export const EMAIL_VALIDATION_MSG = 'Invalid email address';
    export const MIN_LENGTH_PASSWORD = 0;
export const MINIMUM_PHONE_NUMBER = 5;
export const MINIMUM_FIVE_VALIDATION_TEXT = 'Please enter at least 5 digits';

export const tokenSchema = Yup.string()
    .required(REQUIRED_FIELD_VALIDATION_MSG);

export const emailSchema = Yup.string()
    .email(EMAIL_VALIDATION_MSG)
    .required(REQUIRED_FIELD_VALIDATION_MSG);

export const userNameSchema = Yup.string()
    .required(REQUIRED_FIELD_VALIDATION_MSG);

export const passwordSchema = Yup.string().required(
    REQUIRED_FIELD_VALIDATION_MSG
);

export const newPasswordSchema = Yup.string()
    .oneOf([Yup.ref('password'), null])
    .min(MIN_LENGTH_PASSWORD, NEW_PASSWORD_VALIDATION_MSG)
    .required(REQUIRED_FIELD_VALIDATION_MSG);

export const nameSchema = Yup.string().matches(
    /^[aA-zZ\s]+$/,
    'Name must only contain letters'
).required(REQUIRED_FIELD_VALIDATION_MSG);

export const numberSchema = Yup.number(NUMBER_VALIDATION_MSG);
