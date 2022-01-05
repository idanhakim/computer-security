import React, {useState} from "react";
import {
    useHistory,
    useParams
} from "react-router-dom";

import {resetPasswordAPI} from "../../api";
import * as Yup from "yup";
import {passwordSchema} from "../../utils/validationSchemas";
import {SubmitButton} from "../../components/SubmitButton";
import {Formik} from "formik";
import {VerifyTokenForm} from "./VerifyTokenForm";

export const ResetPassword = () => {
    let history = useHistory();
    const [isVerify, setIsVerify] = useState(false);

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
        <h2>Reset password</h2>
        {
            !isVerify ?
                <VerifyTokenForm onSuccess={() => setIsVerify(true)}/>
                :
                <Formik
                    initialValues={{password: ''}}
                    validationSchema={Yup.object({
                        password: passwordSchema,
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
        }


    </div>
}