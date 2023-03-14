import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, ReduxFormSelect} from "../../../common/form-controls/form-controls";
import {signUp} from "../../../../redux/sign-up-reducer";
import classNames from "classnames";
import s from '../../../../styles/auth.module.css'
import {NavLink} from 'react-router-dom';
import { required, maxLengthCreator, minLengthCreator, validateMail, validatePhone, usernameCheckValidate } from "../../../../utils/validators/validators";
import { signUpAPI } from "../../../../api/api";





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
                <Field placeholder={'username'} name={'username'} component={Input} validate={[required, minLengthCreator(3), maxLengthCreator(15)]}/>
                <Field placeholder={'email'} name={'email'} component={Input} validate={[required, validateMail]}/>
                <Field placeholder={'phone'} name={'phone'} component={Input} validate={[required, validatePhone]}/>
                <Field placeholder={'password'} name={'password'} type={"password"} component={Input} validate={required}/>
                <Field name={'role'} className={s.reactSelect} component={ReduxFormSelect} options={roleOptions} />
                <button className={classNames(s.next, s.action_button)}>next</button>
                <div>Already have an account?<NavLink to='/login' className={s.texts}>Sign in</NavLink></div>
            </div>
        </form>
    )
}

const AccountSetupReduxForm = reduxForm({form: 'signUp'})(AccountSetupForm)

const AccountSetupComponent = (props) => {
    const onSubmit = async (formData) => {
        props.accountSetupInfo(formData.username, formData.email, formData.phone, formData.password, formData.role.value)
        props.nextStep()
    }
    return <AccountSetupReduxForm onSubmit={onSubmit}/>
}

export default AccountSetupComponent