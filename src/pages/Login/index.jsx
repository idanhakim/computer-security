import React from 'react';
import './styles.css';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {emailSchema, passwordSchema, userNameSchema} from "../../utils/validationSchemas";
import {useAuth} from "../../store";
import {useHistory, useLocation} from "react-router-dom";
import {SubmitButton} from "../../components/SubmitButton";
import {loginAPI} from "../../api";


export const Login = () => {
    const auth = useAuth();
    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/my-account"}};

    const handleSubmit = async (values, {setSubmitting}) => {
        const res = await loginAPI(values.email, values.password)

        setSubmitting(false);
        auth.signin(() => {
            history.replace(from);
        });

    }


    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={{userName: '', password: ''}}
                validationSchema={Yup.object({
                    userName: userNameSchema,
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
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder={'password'}
                            />
                            {errors.password && touched.password && errors.password}
                        </div>

                        <SubmitButton disabled={isSubmitting} text={'login'}/>

                    </form>
                )}
            </Formik>
        </div>
    );
}