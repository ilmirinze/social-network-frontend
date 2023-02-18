import { stopSubmit } from "redux-form"
import { signUpAPI } from "../api/api"

const NEXT_STEP = 'NEXT-STEP'




let initialState = {
    userId: window.localStorage.getItem("userId"),
    email: window.localStorage.getItem("email"),
    username: window.localStorage.getItem("username"),
    role: window.localStorage.getItem("role"),
    firstName: window.localStorage.getItem("firstName"),
    lastName: window.localStorage.getItem("lastName"),
    birthday: window.localStorage.getItem("birthday"),
    male: window.localStorage.getItem("male"),
    group: window.localStorage.getItem("group"),
    university: window.localStorage.getItem("university"),
    faculty: window.localStorage.getItem("faculty"),
    course: window.localStorage.getItem("course"),
    isAuth: false,
    step: 1,
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_STEP: {
            return {    
                ...state, step: state.step + 1
        }
    }
}
}


export const signUp = (username, email, password, isAuth) => (dispatch) => {
    signUpAPI.signUp(username, email, password, isAuth = true)
        .then(response => {
            if (response.data.result) {
                dispatch()
            }
        })
}