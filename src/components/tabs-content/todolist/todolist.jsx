import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodolist } from '../../../redux/todolist-reducer'
import s from './todolist.module.css'

const Todolist = () => {
    const tasks = useSelector(store => store.todolist.tasks)

    const dispatch = useDispatch()
    useEffect(() => {
        getTodolist()(dispatch)
    }, [])

    const newTask = () => {
        
    }


    return <div>
        <div id={s.myDIV} className={s.header}>
            <h2>My To Do List</h2>
            <input type="text" id={s.myInput} placeholder="Title..."></input>
            <span onclick={newTask} className={s.addBtn}>Add</span>
        </div>
        {
            tasks.map(u => <div key={u.id}>
                <ul id={s.myUL}>
                    <li>{tasks}</li>
                </ul>
            </div>)
        }
    </div>
}
export default Todolist