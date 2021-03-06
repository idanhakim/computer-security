import React, {useState} from 'react';
import './styles.css';
import {Formik} from "formik";
import * as Yup from "yup";
import {emailSchema, userNameSchema} from "../../utils/validationSchemas";
import {SubmitButton} from "../../components/SubmitButton";
import {forgotPasswordAPI} from "../../api";
import {useHistory} from "react-router-dom";


export const ForgotPassword = () => {


    let history = useHistory();

    const handleSubmit = async (values, {setSubmitting}) => {
        const {isAuthenticated, errorMsg} = await forgotPasswordAPI(values.userName)
        setSubmitting(false);
        if (isAuthenticated) {
            history.push('/reset-password/');
        } else {
            alert(JSON.stringify(errorMsg, null, 2))
        }
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <Formik
                initialValues={{userName: ''}}
                validationSchema={Yup.object({
                    userName: userNameSchema,
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
                                type="text"
                                name="userName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.userName}
                                placeholder={'user name'}
                            />
                            {errors.userName && touched.userName && errors.userName}
                        </div>

                        <SubmitButton disabled={isSubmitting} text={'Reset'}/>
                    </form>
                )}
            </Formik>
        </div>
    );
}