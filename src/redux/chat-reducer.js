import {chatAPI} from '../api/chat-api'
import {v1} from 'uuid'


let initialState = {
    senderId: window.localStorage.getItem("userId"),
    recipientId: null,
    senderName: '',
    content: null,
    timestamp: new Date(),
    messages: [],
    status: null,
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages, senderId) => ({
        type: 'SN/chat/MESSAGES_RECEVIED', payload: {messages, senderId}
    } ),
    statusChanged: (status) => ({
        type: 'SN/chat/STATUS_CHANGED', payload: {status}
    } )
}

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

export const startMessagesListening = () => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message ) => async (dispatch) => {
    chatAPI.sendMessage(message, initialState.senderId)
}


export default chatReducer