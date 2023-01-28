import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { Navigate } from "react-router-dom";

const RegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate= {[required]} placeholder={'username'} name={'userName'} component={Input}/>
            </div>
            <div>
                <Field validate= {[required]} placeholder={'email'} name={'email'} component={Input}/>
            </div>
            <div>
                <Field validate= {[required]} placeholder={'password'} name={'password'} type={"password"} component={Input}/>
            </div>

            <div>
                <button>Registration</button>
            </div>
        </form>
    )
}

const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm)

const Registration = (props) => {
    const onSubmit = (formData) => {
        props.registration(formData.userName, formData.email, formData.password)
    }

    if (props.isAuth) {
        return <Navigate to= {"/profile"} />
    }

    return (
        <div>
            <h1>Registration</h1>
            <RegistrationReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(Registration)