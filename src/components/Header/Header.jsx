import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'
import logo from '../../assets/img/logo.png'


const Header = (props) => {
    return <header className={s.header}>
        <img src={logo}/>

        <div className={s.loginBlock}>
            { props.isAuth ? <div>{props.login} <button onClick={props.logout}>log out</button>  </div> 
            : <div><NavLink to = {'/login'}>Login</NavLink> <NavLink to = {'/registration'}>Registration</NavLink> </div> } 
        </div>
    </header>;
}

export default Header;