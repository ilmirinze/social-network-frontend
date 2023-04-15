const subcribers = {
    'messages-received': [],
    'status-changed': [] 
}
var sock 
var SockJS = require("sockjs-client");


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
    sock?.close()
    var sock = new SockJS('http://localhost:8888/ws');
    notifySubscribersAboutStatus('pending')
    sock.addEventListener('close', closeHandler)
    sock.addEventListener('message', messageHandler)
    sock.addEventListener('open', openHandler)
    sock.addEventListener('error', errorHandler)
}


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
    sendMessage(message) {
        sock?.send(message)
    }
}



