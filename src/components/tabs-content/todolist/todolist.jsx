import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addNewTask, getTodolist, changeDoneDispatch, deleteTaskDispatch } from '../../../redux/todolist-reducer'
import s from './todolist.module.css'

const Todolist = () => {
    const tasks = useSelector(store => store.todolist.tasks)
    const dispatch = useDispatch()
    useEffect(() => {
        getTodolist()(dispatch)
    }, [])
    const [task, setTask] = useState('')
    const newTask = () => {
        if (!task) {
            return
        }
        dispatch(addNewTask(task))
        setTask('')
    }

    const changeDone = (id, done) => {
        dispatch(changeDoneDispatch(id, done))
    }

    const deleteTask = (id) => {
        dispatch(deleteTaskDispatch(id))
    }

    return <div>
        <div id={s.myDIV} className={s.header}>
            <h2>My To Do List</h2>
            <input id={s.myInput} placeholder="Title..." onChange={(e) => setTask(e.currentTarget.value)} value={task}></input>
            <span onClick={newTask} className={s.addBtn}>Add</span>
        </div>
        {tasks.map((t) => {
            return(
            <div onClick={() => changeDone(t.id, !t.done)} >
                <ul id={s.myUL}>
                    <li className={t.done && s.done}>{t.description} {t.timestamp} {t.done ? 'done' : 'not done'} </li> <div onClick={() => deleteTask(t.id)}>delete</div>
                </ul>
            </div>)
        })}

    </div>
}
export default Todolist