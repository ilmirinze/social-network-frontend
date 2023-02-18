import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, ReduxFormSelect} from "../../common/FormsControls/FormsControls";
import {signUp} from "../../../redux/sign-up-reducer";
import classNames from "classnames";
import s from '../SignUp.module.css'
import {NavLink} from 'react-router-dom';


const AccountSetupForm = (props) => {

    const roleOptions = [
        {
            label: 'Teacher',
            value: 'TEACHER'
        },
        {
            label: 'Student',
            value: 'STUDENT'
        }
    ]
    return (
        <form id={s.msform} onSubmit={props.handleSubmit}>
            <h2 className={s.signUp}>sign up</h2>
            <ul id={s.progressbar}>
                <li className={s.active}>Account Setup</li>
                <li>Personal Details</li>
                <li>Education Details</li>
            </ul>
            <div className={s.fieldset}>
                <h2 className={s.fs_title}>Create your account</h2>
                <h3 className={s.fs_subtitle}>This is step 1</h3>
                <Field placeholder={'username'} name={'username'} component={Input}/>
                <Field placeholder={'email'} name={'email'} component={Input}/>
                <Field placeholder={'phone'} name={'phone'} component={Input}/>
                <Field placeholder={'password'} name={'password'} type={"password"} component={Input}/>
                <Field name={'role'} className={s.reactSelect} component={ReduxFormSelect} options={roleOptions}/>
                <button className={classNames(s.next, s.action_button)}>next</button>
                <NavLink to='/login' className={s.signIn}>Sign in</NavLink>
            </div>
        </form>
    )
}

const AccountSetupReduxForm = reduxForm({form: 'signUp'})(AccountSetupForm)

const AccountSetupComponent = (props) => {
    const onSubmit = async (formData) => {
        props.accountSetupInfo(formData.username, formData.email, formData.phone, formData.password, formData.role)
        props.nextStep()
    }
    return <AccountSetupReduxForm onSubmit={onSubmit}/>
}

export default AccountSetupComponent