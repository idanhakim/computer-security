import React, {useState} from 'react';
import './styles.css';
import {Formik} from "formik";
import * as Yup from "yup";
import {emailSchema} from "../../utils/validationSchemas";
import {SubmitButton} from "../../components/SubmitButton";
import {forgotPasswordAPI} from "../../api";


export const ForgotPassword = () => {
    const [isReset, setIsReset] = useState(false);

    const handleSubmit = async (values, {setSubmitting}) => {
        const res = await forgotPasswordAPI(values.email)
        setSubmitting(false);
        setIsReset(true);
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            {!isReset ?
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={Yup.object({
                        email: emailSchema,
                    })}
                    onSubmit={handleSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder={'email'}
                                />
                                {errors.email && touched.email && errors.email}
                            </div>

                            <SubmitButton disabled={isSubmitting} text={'Reset'}/>
                        </form>
                    )}
                </Formik>
                :
                <div>send reset password to your email!</div>
            }

        </div>
    );
}