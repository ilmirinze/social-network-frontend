import axios from "axios"
import { setMessage, findChatMessage } from "../redux/chat-reducer"
import { useSelector } from 'react-redux'

// import store from "../redux/redux-store"


//const state = store.getState()


let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})




export const chatAPI = {
 
  findChatMessages(senderId, recipientId) {
    return instance.get('messages/' + senderId + '/' + recipientId ) 
  },
  findChatMessage(id) {
    return instance.get('messages/' + id) 
  },


}


