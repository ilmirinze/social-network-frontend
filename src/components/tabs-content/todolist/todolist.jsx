import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addNewTask, getTodolist } from '../../../redux/todolist-reducer'
import s from './todolist.module.css'

const Todolist = () => {
    const tasks = useSelector(store => store.todolist.tasks)
    const userId = useSelector(store => store.auth.userId)
    const dispatch = useDispatch()
    useEffect(() => {
        getTodolist(userId)(dispatch)
    }, [])
    const [task, setTask] = useState('')
    const newTask = () => {
        if (!task) {
            return
        }
        dispatch(addNewTask(task))
        setTask('')
    }


    return <div>
        <div id={s.myDIV} className={s.header}>
            <h2>My To Do List</h2>
            <input id={s.myInput} placeholder="Title..." onChange={(e) => setTask(e.currentTarget.value)} value={task}></input>
            <span onClick={newTask} className={s.addBtn}>Add</span>
        </div>
        <div>
            <ul id={s.myUL}>
                <li>{tasks}</li>
            </ul>
        </div>
    </div>
}
export default Todolist