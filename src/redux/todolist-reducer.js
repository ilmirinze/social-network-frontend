import { todolistAPI } from "../api/todolist-api"
const SET_TASKS = 'SET-TASKS'
const ADD_TASK = 'ADD-TASK'
const CHANGE_DONE = 'CHANGE-DONE'
const DELETE_TASK = 'DELETE-TASK'


let initialState = {
    tasks: [],
}

export const todolistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...state, tasks: action.tasks
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, { id: action.id, description: action.description, timestamp: action.timestamp, done: action.done }],
            }
        }
        case CHANGE_DONE: {
            let stateTasks = state.tasks.map((el) => {
                if (el.id === action.id) { el.done = action.done }
                return el
            })
            return {
                ...state, tasks: stateTasks
            }
        }
        case DELETE_TASK: {
            let stateTasks = state.tasks.filter((el) => el.id !== action.id)
            return {
                ...state, tasks: stateTasks
            }
        }
        default:
            return state;
    }


}
export const setTasks = (tasks) => ({ type: SET_TASKS, tasks })
export const addTask = (id, description, timestamp, done) => ({ type: ADD_TASK, id, description, timestamp, done })
export const changeDone = (id, done) => ({ type: CHANGE_DONE, id, done })
export const deleteTask = (id) => ({type: DELETE_TASK, id})


export const getTodolist = () => {
    return (dispatch) => {
        todolistAPI.getTasks()
            .then(data => {
                dispatch(setTasks(data.tasks))
            })
    }
}

export const addNewTask = (NewText) => (dispatch) => {
    todolistAPI.addTask(NewText)
        .then(response => {

            dispatch(addTask(response.data.id, response.data.description, response.data.timestamp, response.data.done))

        })

}

export const changeDoneDispatch = (id, done) => (dispatch) => {
    todolistAPI.changeDone(id, done)
        .then(response => {
            if (response.data.id === id) {
                dispatch(changeDone(response.data.id, response.data.done))
            }
        })
}

export const deleteTaskDispatch = (id) => (dispatch) => {
    todolistAPI.deleteTask(id)
        .then(response => {
            if (response.data.result) {
                dispatch(deleteTask(id))
            }
        })

}

export default todolistReducer