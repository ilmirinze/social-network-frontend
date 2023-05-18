import { chatAPI } from '../api/chat-api'
import { usersAPI } from "../api/users-api"
import { v1 } from 'uuid'


const SET_USERS = 'SET-USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
const SET_RECIPIENTID = 'SET-RECIPIENTID'
const SET_MESSAGES = 'SET-MESSAGES'
const SET_MESSAGE = 'SET-MESSAGE'


let initialState = {
    recipientId: null,
    senderName: '',
    content: null,
    timestamp: new Date(),
    messages: [],
    status: null,
    users: [],
    isFetching: false,
    isactive: false
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case SET_RECIPIENTID: {
            return {
                ...state, recipientId: action.recipientId
            }
        }
        case SET_MESSAGES: {
            return {
                ...state, messages: action.messages
            }
        }
        case SET_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages, senderId) => ({
        type: 'SN/chat/MESSAGES_RECEVIED', payload: { messages, senderId }
    }),
    statusChanged: (status) => ({
        type: 'SN/chat/STATUS_CHANGED', payload: { status }
    })
}

export const setUsers = (users) => ({ type: SET_USERS, users })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
export const setRecipientId = (recipientId) => ({type: SET_RECIPIENTID, recipientId})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const setMessage = (message) => ({type: SET_MESSAGE, message})

let _newMessageHandler = null
const newMessageHandlerCreator = (dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler = null
const statusChangedHandlerCreator = (dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = () => async (dispatch, getState) => {
    chatAPI.start(dispatch, getState)
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message, senderId, recipientId) => async (dispatch) => {
    chatAPI.sendMessage(message, senderId, recipientId)
}

export const getUsers = (currentPage, pageSize) => {
    console.log('getusers')
    return (dispatch) => {
        console.log('then')
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {                
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.users))
            })
    }
}

export const findChatMessages = (senderId, recipientId) => {
    return (dispatch) => {
        chatAPI.findChatMessages(senderId, recipientId)
            .then(data => {                
                dispatch(setMessages(data.data))
            })
    }
}

export const findChatMessage = (id) => {
    
    return (dispatch) => {
        debugger  
        chatAPI.findChatMessage(id)
            .then(data => { 
                  
                dispatch(setMessage(data.data))
            })
    }
}




export default chatReducer