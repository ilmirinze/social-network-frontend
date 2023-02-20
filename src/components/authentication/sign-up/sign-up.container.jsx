import {connect} from "react-redux";
import React from "react";
import SignUpComponent from "./sign-up.component";
import {nextStep, previousStep, signUp, accountSetupInfoAC, personalDetailsInfoAC, educationDetailsInfoAC} from "../../../redux/sign-up-reducer";

class SignUpContainer extends React.Component {

    render() {
        return <>
            <SignUpComponent
                step={this.props.currentStep}
                nextStep={this.props.nextStep}
                previousStep={this.props.previousStep}
                signUp={this.props.signUp}
                accountSetupInfo={this.props.accountSetupInfoAC}
                personalDetailsInfo={this.props.personalDetailsInfoAC}
                educationDetailsInfo={this.props.educationDetailsInfoAC}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        currentStep: state.signUp.currentStep
    }
}

export default (
    connect(mapStateToProps, {
        nextStep,
        previousStep,
        accountSetupInfoAC,
        personalDetailsInfoAC,
        educationDetailsInfoAC,
        signUp
    }))(SignUpContainer)