import React from "react";
import * as Yup from "yup";
import { nameSchema} from "../../../utils/validationSchemas";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import {SubmitButton} from "../../../components/SubmitButton";

export const AddClient = () => {
    let history = useHistory();

    const handleSubmit = (values, {setSubmitting}) => {
        setTimeout(() => {
            setSubmitting(false);
            history.push('my-account');
        }, 400);
    }

    return <div>
        <h3>Add Client</h3>
        <Formik
            initialValues={{name: ""}}
            validationSchema={Yup.object({
                name: nameSchema,
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
                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder={'name'}
                        />
                        {errors.name && touched.name && errors.name}
                    </div>

                    <SubmitButton disabled={isSubmitting} text={'Add'}/>
                </form>
            )}
        </Formik>
    </div>
}