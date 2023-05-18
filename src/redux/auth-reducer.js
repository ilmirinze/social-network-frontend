import { stopSubmit } from "redux-form"
import { authAPI, registrationAPI } from "../api/auth-api"
import path from "path"

const SET_USER_DATA = 'SET-USER-DATA'


let initialState = {
    userId: null,
    email: null,
    username: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            let currentLocationList = window.location.href.split('/')
            let path = currentLocationList[currentLocationList.length - 1]
            if (response.data.result) {
                let { id, email, username } = response.data
                dispatch(setAuthUserData(id, email, username, true))
                if (path === "") {
                    window.location.replace('/profile')
                }
            } else {
                if (path !== "login" && path !== "signUp") {
                    window.location.replace('/login')
                }
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