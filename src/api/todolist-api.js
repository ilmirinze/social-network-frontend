import axios from "axios"


let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})


export const todolistAPI = {
    addTask(userId, text) {
        return instance.post(`todolist/task`, { text })
    },
    getTasks(userId, currentPage = 1, pageSize = 10 ) {
        return instance.get(`todolist?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data)
    }
}