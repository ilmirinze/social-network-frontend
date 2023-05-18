import { todolistAPI } from "../api/todolist-api"
const SET_TASKS = 'SET-TASKS'
const ADD_TASK = 'ADD-TASK'


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
                tasks: [...state.tasks, action.newTask],
            }
        }
        default:
            return state;
    }


}
export const setTasks = (tasks) => ({ type: SET_TASKS, tasks })
export const addTasks = (newText) => ({ type: ADD_TASK, newText })


export const getTodolist = (userId) => {
    return (dispatch) => {
        todolistAPI.getTasks(userId)
            .then(data => {
                dispatch(setTasks(data.tasks))
            })
    }
}

export const addNewTask = (userId, NewText) => (dispatch) => {
    debugger
    todolistAPI.addTask(userId, NewText)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTasks(NewText))
            }
        })

}

export default todolistReducer