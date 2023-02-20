import React from "react";
import {Field, reduxForm} from "redux-form";
import {signUp} from "../../../../redux/sign-up-reducer";
import classNames from "classnames";
import s from '../sign-up.module.css'
import {NavLink} from 'react-router-dom';
import {Input, ReduxFormSelect} from "../../../common/form-controls/form-controls";


const PersonalDetailsForm = (props) => {
    const genderOptions = [
        {
            label: 'Man',
            value: 'MAN'
        },
        {
            label: 'Woman',
            value: 'WOMAN'
        }
    ]
    return (

        <form id={s.msform} onSubmit={props.handleSubmit}>
            <h2 className={s.signUp}>sign up</h2>
            <ul id={s.progressbar}>
                <li className={s.active}>Account Setup</li>
                <li className={s.active}>Personal Details</li>
                <li>Education Details</li>
            </ul>
            <div className={s.fieldset}>
                <h2 className={s.fs_title}>Create your account</h2>
                <h3 className={s.fs_subtitle}>This is step 1</h3>
                <Field placeholder={'firstName'} name={'firstName'} component={Input}/>
                <Field placeholder={'lastName'} name={'lastName'} component={Input}/>
                <Field name={'gender'} className={s.reactSelect} component={ReduxFormSelect} options={genderOptions}/>
                <Field placeholder={'birthday'} name={'birthday'} component={Input} />
                <button type="button" className={s.text_button} onClick={props.previousStep}>back</button>
                <button type="submit" className={classNames(s.next, s.action_button)}>next</button>
                <NavLink to='/login' className={s.signIn}>Sign in</NavLink>
            </div>
        </form>
    )
}

const PersonalDetailsReduxForm = reduxForm({form: 'signUp'})(PersonalDetailsForm)

const PersonalDetailsComponent = (props) => {
    const onSubmit = (formData) => {
        props.personalDetailsInfo(formData.firstName, formData.lastName, formData.gender, formData.birthday)
        props.nextStep()
    }
    return <PersonalDetailsReduxForm onSubmit={onSubmit} previousStep={props.previousStep}/>
}

export default PersonalDetailsComponent