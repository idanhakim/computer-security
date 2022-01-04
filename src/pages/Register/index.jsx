import React from 'react';
import './styles.css';
import {Formik} from "formik";
import * as Yup from "yup";
import {emailSchema, newPasswordSchema, userNameSchema} from "../../utils/validationSchemas";
import {useAuth} from "../../store";
import {useHistory, useLocation} from "react-router-dom";
import {SubmitButton} from "../../components/SubmitButton";
import {registerAPI} from "../../api";


export const Register = () => {
    const auth = useAuth();
    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/my-account"}};

    const handleSubmit = async (values, {setSubmitting}) => {
        const {isAuthenticated, errorMsg} = await registerAPI(values.email,values.password, values.userName)
        setSubmitting(false);
        if (isAuthenticated) {
            auth.signin(values.userName, () => {
                history.replace(from);
            });
        } else {
            alert(JSON.stringify(errorMsg, null, 2))
        }
    }

    return (
        <div>
            <h2>Register</h2>

            <Formik
                initialValues={{userName: "", email: '', password: ''}}
                validationSchema={Yup.object({
                    userName: userNameSchema,
                    email: emailSchema,
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
                                type="text"
                                name="userName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.userName}
                                placeholder={'user name'}
                            />
                            {errors.userName && touched.userName && errors.userName}
                        </div>

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

                        <SubmitButton disabled={isSubmitting} text={'Register'}/>
                    </form>
                )}
            </Formik>
        </div>
    );
}