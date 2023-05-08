import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubjects } from '../../../redux/table-reducer'

import s from './table.module.css'

const Table = () => {
    const table = useSelector(store => store.table.subjects)
    const university = useSelector(store => store.table.university)
    const faculty = useSelector(store => store.table.faculty)
    const course = useSelector(store => store.table.course)
    const group = useSelector(store => store.table.group)

    const dispatch = useDispatch()
    useEffect(() => {
        getSubjects()(dispatch)
    }, [])

    
    return <div>
        table
        {
            table.map(u => <div key={u.id}>
                <tr>
                    <td>{u.days}</td>
                </tr>
                <tr>
                    <td>{u.subjects}</td>
                </tr>
            </div>)
        }
    </div>
}

export default Table