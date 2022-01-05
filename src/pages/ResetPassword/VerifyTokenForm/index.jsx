import React from "react";
import * as Yup from "yup";
import {tokenSchema} from "../../../utils/validationSchemas";
import {SubmitButton} from "../../../components/SubmitButton";
import {Formik} from "formik";
import {verifyResetPasswordTokenAPI} from "../../../api";

export const VerifyTokenForm = ({onSuccess}) => {
    const handleSubmit = async (values, {setSubmitting}) => {
        const {isAuthenticated, errorMsg} = await verifyResetPasswordTokenAPI(values.token);
        setSubmitting(false);
        if (isAuthenticated) {
            onSuccess();
        } else {
            alert(JSON.stringify(errorMsg, null, 2))
        }
    }

    return (
        <div>
            <h2>Please enter verify token:</h2>
            <Formik
                initialValues={{token: ''}}
                validationSchema={Yup.object({
                    token: tokenSchema,
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
                                name="token"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.token}
                                placeholder={'token'}
                            />
                            {errors.token && touched.token && errors.token}
                        </div>

                        <SubmitButton disabled={isSubmitting} text={'Verify'}/>

                    </form>
                )}
            </Formik>
        </div>
    );

}