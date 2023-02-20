import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './header.module.css'
import logo from '../../assets/img/logo.png'


const HeaderComponent = (props) => {
    return <header className={s.header}>
        <img src={logo}/>

        <div className={s.loginBlock}>
            { props.isAuth ? <div>{props.login} <button onClick={props.logout}>log out</button>  </div> 
            : <div><NavLink to = {'/login'}>Login</NavLink> <NavLink to = {'/sign-up'}>Registration</NavLink> </div> }
        </div>
    </header>;
}

export default HeaderComponent;