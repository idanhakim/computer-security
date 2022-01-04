import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {newPasswordSchema, passwordSchema} from "../../../utils/validationSchemas";
import {useHistory} from "react-router-dom";
import {SubmitButton} from "../../../components/SubmitButton";
import {changePasswordAPI} from "../../../api";

export const ChangePassword = () => {
    let history = useHistory();

    const handleSubmit = async (values, {setSubmitting}) => {
        const {isAuthenticated, errorMsg} = await changePasswordAPI(values.password, values.newPassword)
        setSubmitting(false);
        if (isAuthenticated) {
            history.push('/my-account');
        } else {
            alert(JSON.stringify(errorMsg, null, 2))
        }
    }

    return <div>
        <h3>Change Password</h3>
        <Formik
            initialValues={{password: '', newPassword: ''}}
            validationSchema={Yup.object({
                password: newPasswordSchema,
                newPassword: newPasswordSchema,
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

                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
                            placeholder={'new password'}
                        />
                        {errors.newPassword && touched.newPassword && errors.newPassword}
                    </div>

                    <SubmitButton disabled={isSubmitting} text={'Change'}/>

                </form>
            )}
        </Formik>
    </div>
}