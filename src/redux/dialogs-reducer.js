

const SEND_MESSAGE = 'SEND-MESSAGE'


let initialState = {
    dialogs: [
        {id : null, name : '',}
    ],
    messages: [
        {id : null, message : ''}
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

export const sendMessageAC = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer