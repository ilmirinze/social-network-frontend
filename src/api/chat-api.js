import axios from "axios"


let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/',
    headers: {
        "API-KEY": "36cb0cd3-4170-40c7-b77b-4b6c48422257"
    }
})


const subcribers = {
  'messages-received': [],
  'status-changed': []
}
var sock
var SockJS = require("sockjs-client");
var stompClient = null;


const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}
const messageHandler = (e) => {
  const newMessages = JSON.parse(e.data)
  subcribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('REFRESH PAGE')
}
const cleanUp = () => {
  sock?.removeEventListener('close', closeHandler)
  sock?.removeEventListener('message', messageHandler)
  sock?.removeEventListener('open', openHandler)
  sock?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status) => {
  subcribers['status-changed'].forEach(s => s(status))
}


function createChannel() {
  cleanUp()
  //stompClient?.close()
  
  notifySubscribersAboutStatus('pending')
 
  const Stomp = require("stompjs");
  var SockJS = require("sockjs-client");
  SockJS = new SockJS("http://localhost:8888/ws");
  stompClient = Stomp.over(SockJS);
  stompClient.connect({}, onConnected, onError);
}

const onConnected = () => {
  console.log("connected");
  stompClient.subscribe(
    "/user/" + 1 + "/queue/messages",
    onMessageReceived
  );
};

const onError = (err) => {
  console.log(err);
};

const onMessageReceived = (msg) => {
  // const notification = JSON.parse(msg.body);
  // const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
  //   .chatActiveContact;

  // if (active.id === notification.senderId) {
  //   findChatMessage(notification.id).then((message) => {
  //     const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
  //       .chatMessages;
  //     newMessages.push(message);
  //     setMessages(newMessages);
  //   });
  // } else {
  //   message.info("Received a new message from " + notification.senderName);
  // }
  // loadContacts();
};


export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subcribers['messages-received'] = []
    subcribers['status-changed'] = []
    cleanUp()
    sock?.close()
  },
  subscribe(eventName, callback) {
    // @ts-ignore
    subcribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName, callback) {
    // @ts-ignore
    subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
  },
  findChatMessages(senderId, recipientId) {
    return instance.get('messages/' + senderId + '/' + recipientId ) 
  },

  sendMessage(msg, senderId) {
    if (msg.trim() !== "") {
      const message = {
        senderId: senderId,
        recipientId: 2,
        senderName: "qwe",
        recipientName: "sdfgs",
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));      
    }
  }
}


