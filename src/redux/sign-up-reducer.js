import { signUpAPI } from "../api/api"

const NEXT_STEP = 'NEXT-STEP'
const PREVIOUS_STEP = 'PREVIOUS-STEP'
const ACCOUNT_SETUP_INFO = 'ACCOUNT-SETUP-INFO'
const PERSONAL_DETAILS_INFO = 'PERSONAL-DETAILS-INFO'
const EDUCATION_DETAILS_INFO = 'EDUCATION-DETAILS-INFO'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'




let initialState = {
    email: null,
    username: null,
    phone: null,
    role: null,
    password: null,
    firstName: null,
    lastName: null,
    birthday: null,
    gender: null,
    group: null,
    institution: null,
    faculty: null,
    course: null,
    currentStep: 1,
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_STEP: {
            return {
                ...state, currentStep: state.currentStep + 1
            }
        }
        case PREVIOUS_STEP: {
            return {
                ...state, currentStep: state.currentStep - 1
            }
        }
        case ACCOUNT_SETUP_INFO: {
            
            return {
                ...state,
                username: action.username,
                email: action.email,
                phone: action.phone,
                password: action.password,
                role: action.role
            }
        }
        case PERSONAL_DETAILS_INFO: {
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                gender: action.gender,
                birthday: action.birthday
            }
        }
        case EDUCATION_DETAILS_INFO: {
            return {
                ...state,
                institution: action.institution,
                faculty: action.faculty,
                course: action.course,
                group: action.group
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                signUp: {...signUp, photos: action.photos}
            }
        }
        default: {
            return state
        }
    }
}

export const nextStep = () => ({ type: NEXT_STEP})
export const previousStep = () => ({ type: PREVIOUS_STEP})
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos})

export const accountSetupInfoAC = (username, email, phone, password, role) => ({
    type: ACCOUNT_SETUP_INFO,
    username,
    email,
    phone,
    password,
    role
})

export const personalDetailsInfoAC = (firstName, lastName, gender, birthday) => ({
    type: PERSONAL_DETAILS_INFO,
    firstName,
    lastName,
    gender,
    birthday
})

export const educationDetailsInfoAC = (institution, faculty, course, group) => ({
    type: EDUCATION_DETAILS_INFO,
    institution,
    faculty,
    course,
    group
})

export const signUp = () => (dispatch, getState) => {
    signUpAPI.signUp(getState().signUp)
        .then(response => {
            if (response.data.result) {
                dispatch()
            }
        })
}

export const savePhoto = (file) => (dispatch) => {
    let response = signUpAPI.savePhoto(file)
    if (response.data.result) {
        dispatch(savePhotoSuccess(response.data.photos))
    }
}

