import React from "react";
import {Field, reduxForm} from "redux-form";
import {signUp} from "../../../../redux/sign-up-reducer";
import classNames from "classnames";
import s from '../../../../styles/auth.module.css'
import {NavLink} from 'react-router-dom';
import {Input, ReduxFormSelect, File} from "../../../common/form-controls/form-controls";
import { required, validateName } from "../../../../utils/validators/validators";



const PersonalDetailsForm = (props, savePhoto) => {
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

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

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
                <h3 className={s.fs_subtitle}>This is step 2</h3>
                <Field placeholder={'firstName'} name={'firstName'} component={Input} validate={[required, validateName]}/>
                <Field placeholder={'lastName'} name={'lastName'} component={Input} validate={[required, validateName]}/>
                <Field name={'gender'} className={s.reactSelect} component={ReduxFormSelect} options={genderOptions} validate={required}/>
                <Field placeholder={'birthday'} name={'birthday'} component={Input} validate={required} />
                <input type={'file'} onChange={onMainPhotoSelected}></input>
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
        props.personalDetailsInfo(formData.firstName, formData.lastName, formData.gender.value, formData.birthday)
        props.nextStep()
    }
    return <PersonalDetailsReduxForm onSubmit={onSubmit} previousStep={props.previousStep}/>
}

export default PersonalDetailsComponent