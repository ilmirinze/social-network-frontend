import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening, setMessage, findChatMessage } from '../../../redux/chat-reducer'
import s from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ChatUsers from './chatUsers'


const ChatPage = () => {
    return <div>
        <Chat />
    </div>
}

const Chat = (props) => {




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
      const senderId = useSelector(state => state.auth.userId)
      const onConnected = () => { 
        console.log("connected");
        stompClient.subscribe(
          "/user/" + senderId + "/queue/messages",
          onMessageReceived
        );
      };
      
      const onError = (err) => {
        console.log(err);
      };
      const recipientId = useSelector(state => state.chat.recipientId)
      const onMessageReceived = (notificationRequest) => {
        
        const notification = JSON.parse(notificationRequest.body);
      
      
        if (recipientId === notification.senderId) {
          
          findChatMessage(notification.id).then((message) => {
            debugger
            setMessage(message);
          });
        } else {
          // message.info("Received a new message from " + notification.senderName);
        }
        // loadContacts();
      };

      const chatWS = {      
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


    }

    sendMessage = (msg, senderId, recipientId) => {
        if (msg.trim() !== "") {
          const message = {
            senderId: senderId,
            recipientId: recipientId,
            senderName: "qwe",
            recipientName: "sdfgs",
            content: msg,
            timestamp: new Date(),
          };
          stompClient.send("/app/chat", {}, JSON.stringify(message));      
        }
      }



    
    const dispatch = useDispatch()

    const status = useSelector((state) => state.chat.status)


    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    

    return <div className={s.dialogs}>
        {status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <div className={s.mainContent}>
            <div className={s.messagesSection}>
                <div className={s.massages}>
                    <Messages />                    
                </div>
            </div>
            <AddMessageForm />
        </div>
        <div className={s.addedContent}>
          <ChatUsers />
        </div>

    </div>
}

const Messages = ({ }) => {
    const messages = useSelector((state) => state.chat.messages)
    const messagesAnchorRef = useRef(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return <div onScroll={scrollHandler} >
        {messages.map((m, index) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}


const Message = React.memo(({ message }) => {
    console.log(">>>>>>Message")
    return <div className={s.dialogs}>
        {message.content}
        <div >
            <img src={message.photo} style={{ width: '30px' }} /> <b>{message.userName}</b>
        </div>
    </div >
})


const AddMessageForm = (state) => {

    const senderId = useSelector((store) => store.auth.userId)
    const recipientId = useSelector((store) => store.chat.recipientId)
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state) => state.chat.status)
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message, senderId, recipientId))
        setMessage('')
    }


    

    return  <div className={s.sendMessage}>
            <input className={s.input} onChange={(e) => setMessage(e.currentTarget.value)} value={message}></input>
        <div>
            <button className={s.btn} onClick={sendMessageHandler}><FontAwesomeIcon className={s.icon} icon={faPaperPlane} /></button>
        </div>
        </div>
}

export default ChatPage