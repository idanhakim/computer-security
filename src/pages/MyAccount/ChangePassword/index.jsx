import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {newPasswordSchema} from "../../../utils/validationSchemas";
import {useHistory} from "react-router-dom";
import {SubmitButton} from "../../../components/SubmitButton";
import {changePasswordAPI} from "../../../api";

export const ChangePassword = () => {
    let history = useHistory();

    const handleSubmit = async (values, {setSubmitting}) => {
        const res = await changePasswordAPI(values.password)
        setSubmitting(false);
        history.push('/my-account');
    }

    return <div>
        <h3>Change Password</h3>
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
    </div>
}