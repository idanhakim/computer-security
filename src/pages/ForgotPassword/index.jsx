import React, {useState} from 'react';
import './styles.css';
import {Formik} from "formik";
import * as Yup from "yup";
import {emailSchema} from "../../utils/validationSchemas";
import {SubmitButton} from "../../components/SubmitButton";


export const ForgotPassword = () => {
    const [isReset, setIsReset] = useState(false);

    return (
        <div>
            <h2>Forgot Password</h2>
            {!isReset ?
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={Yup.object({
                        email: emailSchema,
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            setIsReset(true);
                        }, 400);
                    }}
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