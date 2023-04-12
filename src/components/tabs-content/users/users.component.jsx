import React from "react";
import { Field, reduxForm } from "redux-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import s from './users.module.css'
import { Input, ReduxFormSelect, File } from "../../common/form-controls/form-controls";

let UsersComponent = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <SearchFormRedux />
        <div>

            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div className={s.mainContent}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.userProfile.photo != null ? u.userProfile.photo : "https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png"} className={s.userPhoto} />
                        </NavLink>
                    </div>
                    <div>{u.userProfile.fullName}</div>
                    <div>
                        {/* <div className={s.addedContent}>
                            <div>Университет</div>
                            <Field name={'university'} component={Input} />
                            <div>Факультет</div>
                            <Field name={'faculty'} component={Input} />
                            <div>Курс</div>
                            <Field name={'course'} component={Input} />
                            <div>Направление</div>
                            <Field name={'course'} component={Input} />
                            <div>Группа</div>
                            <div>Возраст</div>
                            <div>Пол</div>

                        </div> */}
                    </div>
                </span>
            </div>)
        }

    </div>
}

const searchForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.sendMessage}>
            <Field component={Input} name='Search' placeholder='search users' className={s.input}></Field>
            <button className={s.btn}><FontAwesomeIcon className={s.icon} /></button>
        </form>
    )
}

const SearchFormRedux = reduxForm({ form: 'usersSearchFormRedux' })(searchForm)

export default UsersComponent