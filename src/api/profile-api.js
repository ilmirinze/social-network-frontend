import axios from "axios"


let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})


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