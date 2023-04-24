import axios from "axios"

const CHAT_SERVICE = "http://localhost:8888";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/sign_in`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}