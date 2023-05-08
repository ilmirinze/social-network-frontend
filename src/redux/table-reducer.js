
import {tableAPI} from "../api/table-api"
const SET_TABLE = 'SET-TABLE'


let initialState = {
    subjects: []
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABLE: {
            return {
                ...state, subjects: action.subjects
            }
        
        }
        default:
            return state;
    }


}
export const setSubjects = (subjects) => ({ type: SET_TABLE, subjects })


export const getSubjects = (university, faculty, course ,group, subjects) => (dispatch) => {
    tableAPI.getTable(university, faculty, course ,group, subjects).then(response => {
        dispatch(setSubjects(response.subjects))
    })
}


export default tableReducer