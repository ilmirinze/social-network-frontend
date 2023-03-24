import axios from "axios"

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data)
    },
    getUnfollow(id) {
        return instance.delete(`follow/${id}`,)
            .then(response => response.data)
    },
    getFollow(id) {
        return instance.post(`follow/${id}`,)
            .then(response => response.data)
    },
    getProfile(userId) {
        return profileAPI.getProfile
    },
   
}

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
        return instance.get('sign_up/check', { params: { username }})
        
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


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status })
    },
}

export const postAPI = {
    addPost(userId, text) {
        return instance.post('profile/' + userId + '/post', { text })
    },
    getPosts(userId, currentPage = 1, pageSize = 10) {
        return instance.get(`profile/${userId}/post?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data)
    }
}


export const messageAPI = {
    showMessage(userId, toUserId) {
        return instance.get(`dialogs/` + userId + toUserId)
        .then(response => response.data)
    },
    sendMessage(userId, toUserId, message) {
        return instance.post(`dislogs/`, {message, userId, toUserId})
    }
}
