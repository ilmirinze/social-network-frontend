import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './users.module.css'

let UsersComponent = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.userProfile.photo != null ? u.userProfile.photo : "https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png"} className={s.userPhoto} />
                        </NavLink>
                        
                    </div>
                    <div>{u.userProfile.fullName}</div>
                    <div>
                        {/* {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>
                                Unfollow
                            </button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {                               
                                props.follow(u.id)
                            }}>
                                Follow
                            </button>
                        } */}

                    </div>
                </span>
            </div>)
        }
    </div>
}

export default UsersComponent