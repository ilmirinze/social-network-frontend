const SEND_MESSAGE = 'SEND-MESSAGE'

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
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 3,
                message: action.newMessageBody,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
            
       
        default:
            return state;
    }


}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer