import React from "react";
import AccountSetupComponent from "./account-setup/account-setup.component";
import EducationDetailsComponent from "./education-details/education-details.component";
import PersonalDetailsComponent from "./personal-details/personal-details.component";


const SignUpComponent = (props) => {
    switch (props.step) {
        case 2: {
            return <PersonalDetailsComponent
                nextStep={props.nextStep}
                previousStep={props.previousStep}
                personalDetailsInfo={props.personalDetailsInfo}/>
        }
        case 3: {
            return <EducationDetailsComponent
                previousStep={props.previousStep}
                educationDetailsInfo={props.educationDetailsInfo}
                signUp={props.signUp}/>
        }
        default: {
            return <AccountSetupComponent
                nextStep={props.nextStep}
                accountSetupInfo={props.accountSetupInfo}/>
        }
    }

}


export default SignUpComponent