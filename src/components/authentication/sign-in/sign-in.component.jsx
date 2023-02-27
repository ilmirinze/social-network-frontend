import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../utils/validators/validators";
import { Input } from "../../common/form-controls/form-controls";
import { login } from "../../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from '../../../styles/auth.module.css'
import { NavLink } from 'react-router-dom';
import classNames from "classnames";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} id={s.msform} >
            <h2 className={s.signUp}>sign in</h2>
            <div className={s.fieldset}>
                <h2 className={s.fs_title}>Write your login and password</h2>
                <Field validate={[required]} placeholder={'email'} name={'email'} component={Input} />
                <Field validate={[required]} placeholder={'password'} name={'password'} type={"password"} component={Input} />
                <div className={s.rememberMe}>
                    <Field component={Input} name={'rememberMe'} type={'checkbox'} /> 
                    <div className={s.texts}>remember me</div>
                    </div>                
                <button className={classNames(s.next, s.action_button)}>Login</button>
                <NavLink to='/signUp' className={s.texts}>Sign up</NavLink>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const SignInComponent = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.isAuth = true)
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
    
}

const mapStateToProps = (state) => ({
    isAuth: state.isAuth
})

export default connect(mapStateToProps, { login })(SignInComponent)