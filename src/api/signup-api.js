import axios from "axios"

const CHAT_SERVICE = "http://localhost:8888";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})


export const signUpAPI = {
    signUp(userData) {
        return instance.post(`auth/sign_up`, {
            email: userData.email,
            username: userData.username,
            role: userData.role,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthday: userData.birthday,
            gender: userData.gender,
            group: userData.group,
            institution: userData.institution,
            faculty: userData.faculty,
            course: userData.course,
            phone: userData.phone
        })
    },
    isUsernameAvailable(username) {
        return instance.get('sign_up/check', { params: { username } })

    },
    savePhoto(photoFile) {
        var formData = new formData()
        formData.append('image', photoFile)
        return instance.put('sign_up/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}