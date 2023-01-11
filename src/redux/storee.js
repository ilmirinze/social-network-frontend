import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"



let store = {
    _state: {
        dialogsPage: {
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
        },
        profilePage: {
            posts: [
                { id: 0, message: "hi, how are you?", likesCount: "12" },
                { id: 1, message: "it's my first post", likesCount: "13" },
            ],
            newPostText: ''
        }
    },
    _callSubscriber() {

    },


    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },


    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._callSubscriber(this._state)
    }
}




export default store;
window.store = store;


