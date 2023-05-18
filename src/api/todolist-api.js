import axios from "axios"
import { deleteTask } from "../redux/todolist-reducer"


let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})


export const todolistAPI = {
    addTask( text) {
        return instance.post(`todolist/task`, { text })
    },
    getTasks(currentPage = 1, pageSize = 10 ) {
        return instance.get(`todolist?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data)
    },
    dropTask(id){
        return instance.delete(`todolist/task?${id}`)
    },
    changeDone(id, done){
        return instance.post(`todolist/task/${id}`, { done })
    },
    deleteTask(id){
        return instance.delete(`todolist/task/${id}`)
    }
}