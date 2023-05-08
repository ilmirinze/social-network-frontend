import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, setRecipientId, findChatMessages } from '../../../redux/chat-reducer'

import s from './chat.module.css'

const ChatUsers = () => {
    const users = useSelector(store => store.chat.users)
    const myId = useSelector(store => store.auth.userId)
    let isactive = false
    const dispatch = useDispatch()
    useEffect(() => {
        getUsers(1, 10)(dispatch)
    }, [])

    const onUserClick = (id) => {
        dispatch(setRecipientId(id))
        findChatMessages(myId, id)(dispatch)
    }



    return <div>
        users
        {
            users.map(u => <div key={u.id}>
                <span onClick={() => onUserClick(u.id)}>
                    <div className={s.user}>
                        <div className={s.dialogsItems}>
                            <div className={s.item}>
                                <img className={s.image} src={u.userProfile.photo != null ? u.userProfile.photo : "https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png"} />
                            </div>
                            <div className={ isactive ?  s.active : ''}>{u.userProfile.firstName} {u.userProfile.lastName}</div>
                        </div>
                    </div>
                </span>
            </div>)
        }
    </div>
}

export default ChatUsers