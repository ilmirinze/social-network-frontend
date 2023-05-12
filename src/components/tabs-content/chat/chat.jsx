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