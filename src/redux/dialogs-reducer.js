const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
    dialogs: [
        { id: 1, name: "Ilmir", image: "https://i.ytimg.com/vi/GGXF-566Dkg/maxresdefault.jpg" },
        { id: 2, name: "Silent sword", image: "https://i.ytimg.com/vi/wbusQOv0UIU/maxresdefault.jpg" },
    ],
    messages: [
        { id: 0, message: "hi" },
        { id: 1, message: "how are u?" },
        { id: 2, message: "pidr1" },
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {

    let stateCopy
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 3,
                message: state.newMessageText,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
            
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            }     
        default:
            return state;
    }


}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageTextCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })

export default dialogsReducer