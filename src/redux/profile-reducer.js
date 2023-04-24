import { profileAPI, postAPI } from "../api/profile-api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SET_POSTS = 'SET-POSTS'

let initialState = {
    posts: [],
    profile: null,
    status: "",
    postsTotalCount: null,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                text: action.newPostText,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_POSTS: {
            return { ...state, posts: action.posts }
        }
        default:
            return state;
    }


}
export const setPosts = (posts) => ({ type: SET_POSTS, posts })
export const addPostActionCreator = (userId, newPostText) => ({ type: ADD_POST, newPostText, userId })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export const getPosts = (userId, currentPage, pageSize) => {
    return (dispatch) => {
        //dispatch(toggleIsFetching(true))
        postAPI.getPosts(userId, currentPage, pageSize)
            .then(data => {
                //dispatch(toggleIsFetching(false))
                dispatch(setPosts(data.posts))
               // dispatch(setTotalPostsCount(data.postsTotalCount))
            })
    }
}

export const addNewPost = (userId, text) => (dispatch) => {
    postAPI.addPost(userId, text)
    .then(response => {
        if (response.data.resultCode === 0) {
            dispatch(addPostActionCreator(userId, text))
        }
    })
}

export default profileReducer