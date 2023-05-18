import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, setRecipientId, findChatMessages } from '../../../redux/chat-reducer'
import classNames from 'classnames'

import s from './chat.module.css'

const ChatUsers = () => {
    const users = useSelector(store => store.chat.users)
    const myId = useSelector(store => store.auth.userId)
    const [isActive, setIsActive] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        getUsers(1, 10)(dispatch)
    }, [])

    // useEffect = {
    //     <title>Messsages</title>
    // }

    const onUserClick = (id, index) => {
        let activeArr = []
        for (let i = 0; i < isActive.length; i++) {
            activeArr[i] = false
        }
        activeArr[index] = true
        setIsActive(activeArr)
        dispatch(setRecipientId(id))
        findChatMessages(myId, id)(dispatch)

    }



    return <div>
        users
        {
            users.map((u, u_index) => {
                return Number(myId) !== u.id &&
                    <div key={u.id}>
                        {console.log(myId, u.id)}
                        <span >
                            <div onClick={() => onUserClick(u.id, u_index)} className={isActive[u_index] ? classNames(s.active) : s.dialogsItems}>
                                <div className={s.user}>
                                    <img className={s.image} src={u.userProfile.photo != null ? u.userProfile.photo : "https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png"} />
                                    <div className={s.item}>
                                        <div>{u.userProfile.firstName} {u.userProfile.lastName}</div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
            })
        }

    </div>
}

export default ChatUsers