import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'


const Header = (props) => {
    return <header className={s.header}>
        <img src="https://w7.pngwing.com/pngs/876/201/png-transparent-logo-graphic-designer-logos-company-logo-wikimedia-commons.png" />

        <div className={s.loginBlock}>
            { props.isAuth ? <div>{props.login}</div> 
            : <NavLink to = {'/login'}>Login</NavLink> }
        </div>
    </header>;
}

export default Header;