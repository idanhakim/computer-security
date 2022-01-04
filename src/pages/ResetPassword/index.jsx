import React, {useEffect, useState} from "react";
import {
    useHistory,
    useParams
} from "react-router-dom";

import {registerAPI, resetPasswordAPI, verifyResetPasswordTokenAPI} from "../../api";
import * as Yup from "yup";
import {newPasswordSchema} from "../../utils/validationSchemas";
import {SubmitButton} from "../../components/SubmitButton";
import {Formik} from "formik";

export const ResetPassword = () => {
    let {token} = useParams();
    let history = useHistory();
    const [isVerify, setIsVerify] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        console.log('token', token);
        const {isAuthenticated, errorMsg} = await verifyResetPasswordTokenAPI(token);
        if (isAuthenticated) {
            setIsLoading(false);
            setIsVerify(true);
        } else {
            alert(errorMsg)
        }
    }, [])

    const handleSubmit = async (values, {setSubmitting}) => {
        const {isAuthenticated, errorMsg} = await resetPasswordAPI(values.password)
        setSubmitting(false);
        if (isAuthenticated) {
            history.push('/login');
        } else {
            alert(JSON.stringify(errorMsg, null, 2))
        }
    }

    return <div>

        {isLoading ?
            <div>Checking Token...</div>
            :
            <>
                {
                    isVerify ?
                        <>
                            <h2>Reset password</h2>
                            <Formik
                                initialValues={{password: ''}}
                                validationSchema={Yup.object({
                                    password: newPasswordSchema,
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
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                placeholder={'password'}
                                            />
                                            {errors.password && touched.password && errors.password}
                                        </div>

                                        <SubmitButton disabled={isSubmitting} text={'Change'}/>

                                    </form>
                                )}
                            </Formik>
                        </>
                        :
                        <div>Error token</div>
                }
            </>
        }
    </div>
}