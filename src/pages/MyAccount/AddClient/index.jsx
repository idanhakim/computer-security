import React from "react";
import * as Yup from "yup";
import {emailSchema, nameSchema} from "../../../utils/validationSchemas";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import {SubmitButton} from "../../../components/SubmitButton";
import {addClientAPI} from "../../../api";

export const AddClient = () => {
    let history = useHistory();

    const handleSubmit = async (values, {setSubmitting}) => {
        const {firstName, lastName, email} = values;
        const {isAuthenticated, errorMsg, msg} = await addClientAPI(firstName, lastName, email)
        setSubmitting(false);
        if (isAuthenticated) {
            alert(JSON.stringify(msg, null, 2))
            history.push('my-account');
        } else {
            alert(JSON.stringify(errorMsg, null, 2))
        }
    }

    return <div>
        <h3>Add Client</h3>
        <Formik
            initialValues={{firstName: "", lastName: "", email: "",}}
            validationSchema={Yup.object({
                firstName: nameSchema,
                lastName: nameSchema,
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
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder={'first name'}
                        />
                        {errors.firstName && touched.firstName && errors.firstName}
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder={'last name'}
                        />
                        {errors.lastName && touched.lastName && errors.lastName}
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

                    <SubmitButton disabled={isSubmitting} text={'Add'}/>
                </form>
            )}
        </Formik>
    </div>
}