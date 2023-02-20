import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './navbar.module.css'


const Nafbar = () => {
  return (
    <nav className={s.nav}>
      <div>
        <NavLink to='/profile' className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
      </div>
      {/* <div>
        <NavLink to='/dialogs' className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
      </div> */}
      <div>
        <NavLink to='/users' className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
      </div>
      {/* <div>
        <NavLink to='1' className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
      </div>
      <div>
        <NavLink to='2' className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
      </div>
      <div>
        <NavLink to='3' className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
      </div>
      <div>
        <NavLink to='4' className={navData => navData.isActive ? s.active : s.item}>friends</NavLink>
      </div> */}
      {/* <div className={s.allImages}>
        <div>
          <NavLink to='5' className={navData => navData.isActive ? s.active : s.item}><img src='https://i.pinimg.com/736x/12/8b/22/128b2276ba476261c4992b2b7f54b818.jpg' /></NavLink>
        </div>
        <div>
          <NavLink to='6' className={navData => navData.isActive ? s.active : s.item}><img src='https://i.pinimg.com/736x/12/8b/22/128b2276ba476261c4992b2b7f54b818.jpg' /></NavLink>
        </div>
        <div>
          <NavLink to='7' className={navData => navData.isActive ? s.active : s.item}><img src='https://i.pinimg.com/736x/12/8b/22/128b2276ba476261c4992b2b7f54b818.jpg' /></NavLink>
        </div>
      </div> */}
    </nav>
  )
}


export default Nafbar;