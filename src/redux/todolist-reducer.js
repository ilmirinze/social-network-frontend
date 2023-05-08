import { todolistAPI } from "../api/todolist-api"
const SET_TABLE = 'SET-TABLE'
const ADD_TASK = 'ADD-TASK'


let initialState = {
    text: "",
    tasks: []
}

export const todolistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABLE: {
            return {
                ...state, tasks: action.text
            }
        }
        case ADD_TASK: {
            let newTask = {
                text: action.newText,
            };
            return {
                ...state,
                tasks: [...state.tasks, newTask],
            }
        }
        default:
            return state;
    }


}
export const setTasks = (text) => ({ type: SET_TABLE, text })
export const addTasks = (userId, newText) => ({ type: ADD_TASK, userId, newText })


export const getTodolist = (userId) => {
    return (dispatch) => {
        todolistAPI.getTasks(userId)
            .then(data => {
                dispatch(setTasks(data.posts))
            })
    }
}

export const addNewTask = (userId, NewText) => (dispatch) => {
    todolistAPI.addTask(userId, NewText)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTasks(userId, NewText))
            }
        })
}

export default todolistReducer