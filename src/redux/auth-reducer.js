import { stopSubmit } from "redux-form"
import { authAPI, registrationAPI } from "../api/auth-api"

const SET_USER_DATA = 'SET-USER-DATA'


let initialState = {
    userId: window.localStorage.getItem("userId"),
    email: window.localStorage.getItem("email"),
    username: window.localStorage.getItem("username"),
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            window.localStorage.setItem("userId", action.payload.userId);
            window.localStorage.setItem("email", action.payload.email);
            window.localStorage.setItem("username", action.payload.username);
            return {
                ...state,
                ...action.payload,
            }       
        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth} })

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
    .then(response => {
        if (response.data.result) {
            let { id, email, username} = response.data
            dispatch(setAuthUserData(id, email, username, true))
        }
    })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
    .then(response => {
        if (response.data.result) {
            dispatch(getAuthUserData())
        } else {
            let action = stopSubmit('login, {Email is wrong}')
            dispatch(action)
        }
    })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
    .then(response => {
        if (response.data.result) {
            dispatch()
        }
    })
}




export default authReducer