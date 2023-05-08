import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import {signUpReducer} from "./sign-up-reducer";
import tableReducer from "./table-reducer";
import todolistReducer from "./todolist-reducer";
import chatReducer from "./chat-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    signUp: signUpReducer,
    chat: chatReducer,
    table: tableReducer,
    todolist: todolistReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;