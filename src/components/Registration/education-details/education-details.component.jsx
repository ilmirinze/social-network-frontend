import React from "react";
import {Field, reduxForm} from "redux-form";
import {signUp} from "../../../redux/sign-up-reducer";
import classNames from "classnames";
import s from '../SignUp.module.css'
import {NavLink} from 'react-router-dom';
import {Input} from "../../common/FormsControls/FormsControls";


const EducationDetailsForm = (props) => {
    return (
        <form id={s.msform} onSubmit={props.handleSubmit}>
            <h2 className={s.signUp}>sign up</h2>
            <ul id={s.progressbar}>
                <li className={s.active}>Account Setup</li>
                <li className={s.active}>Personal Details</li>
                <li className={s.active}>Education Details</li>
            </ul>
            <div className={s.fieldset}>
                <h2 className={s.fs_title}>Create your account</h2>
                <h3 className={s.fs_subtitle}>This is step 1</h3>
                <Field name="institution" placeholder="educational institution" component={Input}/>
                <Field name="faculty" placeholder="faculty" component={Input}/>
                <Field name="course" placeholder="course" component={Input}/>
                <Field  name="group" placeholder="group" component={Input}/>
                <button type="button" className={s.text_button} onClick={props.previousStep}>back</button>
                <button type="submit" className={classNames(s.next, s.action_button)}>Sign up</button>
                <NavLink to='/login' className={s.signIn}>Sign in</NavLink>
            </div>
        </form>
    )
}

const EducationDetailsReduxForm = reduxForm({form: 'signUp'})(EducationDetailsForm)

const EducationDetailsComponent = (props) => {
    const onSubmit = (formData) => {
        props.educationDetailsInfo(formData.institution, formData.faculty, formData.course, formData.group)
        props.signUp(props.userData)
    }
    return <EducationDetailsReduxForm onSubmit={onSubmit} previousStep={props.previousStep}/>
}


export default EducationDetailsComponent