import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { Navigate } from "react-router-dom";
import { registration } from "../../redux/auth-reducer";
import classNames from "classnames";
import s from './Registration.module.css'



const RegistrationForm = (props) => {
    return (
        <form id={s.msform}>
            <h2 className={s.signUp}>sign up</h2>
            <ul id={s.progressbar}>
                <li className="active">Account Setup</li>
                <li>Social Profiles</li>
                <li>Personal Details</li>
            </ul>

            <fieldset>
                <h2 className={s.fs_title}>Create your account</h2>
                <h3 className={s.fs_subtitle}>This is step 1</h3>
                <Field placeholder={'username'} name={'username'} component={Input} />
                <Field placeholder={'email'} name={'email'} component={Input} />
                <Field placeholder={'password'} name={'password'} type={"password"} component={Input} />
                <select className={s.selecttor}>
                    <option disabled selected hidden>choose your chempion</option>
                    <option value="teacher">teacher</option>
                    <option value="student">student</option>
                </select>
                <button className={classNames(s.next, s.action_button)}>next</button>
            </fieldset>
            <fieldset>
                <h2 className={s.fs_title}>Social Profiles</h2>
                <h3 className={s.fs_subtitle}>Your presence on the social network</h3>
                <input type="text" name="twitter" placeholder="Twitter" />
                <input type="text" name="facebook" placeholder="Facebook" />
                <input type="text" name="gplus" placeholder="Google Plus" />
                <input type="button" name="previous" className={classNames(s.previous, s.action_button)} value="Previous" />
                <input type="button" name="next" className={classNames(s.next, s.action_button)} value="Next" />
            </fieldset>
            <fieldset>
                <h2 className={s.fs_title}>Personal Details</h2>
                <h3 className={s.fs_subtitle}>We will never sell it</h3>
                <input type="text" name="fname" placeholder="First Name" />
                <input type="text" name="lname" placeholder="Last Name" />
                <input type="text" name="phone" placeholder="Phone" />
                <textarea name="address" placeholder="Address"></textarea>
                <input type="button" name="previous" className={classNames(s.previous, s.action_button)} value="Previous" />
                <a href="https://twitter.com/GoktepeAtakan" className="submit action-button" target="_top">Submit</a>
            </fieldset>
        </form>

    )
}

const RegistrationReduxForm = reduxForm({ form: 'registration' })(RegistrationForm)

const Registration = (props) => {
    const onSubmit = (formData) => {
        props.registration(formData.username, formData.email, formData.password)
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }



    return (
        <div>
            <RegistrationReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps, { registration })(Registration)