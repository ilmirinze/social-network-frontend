import axios from "axios"




let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
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
    }
}
