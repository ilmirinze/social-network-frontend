import React, { useState } from "react";
import s from "./navbar.module.css";
import { NavLink } from 'react-router-dom';
import classNames from "classnames";

const Navbar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [

		{
			text: "Profile",
			icon: "001-reading.png",
			link: "/profile"
		},
		{
			text: "Messages",
			icon: "",
			link: '/dialogs'
		},
		{
			text: "table",
			icon: "",
			link: ""
		},
		{
			text: "todolist",
			icon: "",
			link: ""
		},
		{
			text: "friends",
			icon: "",
			link: ""
		},
		{
			text: "users",
			icon: "",
			link: "/users"

		},
		{
			text: "teachers",
			icon: "",
			link: "/users"
		},
		{
			text: "Settings",
			icon: "",
			link: "/users"
		},


	];
	return (
		//<nav className={s.nav}>
			<div
				className={
					isExpanded
						? s.sideNavContainer
						: classNames(s.sideNavContainer, s.sideNavContainerNX)
				}
			>
				<div className={s.navUpper}>
					<div className={s.navHeading}>
						{isExpanded && (
							<div className={s.navBrand}>
								<img src="icons/Logo.svg" alt="" srcset="" />
								<h2>Showkart</h2>
							</div>
						)}
						<button
							className={
								isExpanded ? classNames(s.hamburger, s.hamburgerIn) : classNames(s.hamburger, s.hamburgerOut)
							}
							onClick={() => setExpendState(!isExpanded)}
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
					<div className={s.navMenu}>
						{menuItems.map(({ text, icon, link }) => (
							<NavLink to={link}
								className={isExpanded ? s.menuItem : classNames(s.menuItem, s.menuItemNX)}
							>
								<img className={s.menuItemIcon} src={icon} alt="" srcset="" />
								{isExpanded && <p >{text}</p>}
							</NavLink>
						))}
					</div>
				</div>
				<div className={s.navFooter}>
					{isExpanded && (
						<div className={s.navDetails}>
							<img
								className={s.navFooterAvatar}
								src="icons/admin-avatar.svg"
								alt=""
								srcset=""
							/>
							<div className={s.navFooterInfo}>
								<p className={s.navFooterUserName}>M Showkat</p>
								<p className={s.navFooterUserPosition}>store admin</p>
							</div>
						</div>
					)}
					<img className={s.logoutIcon} src="icons/logout.svg" alt="" srcset="" />
				</div>
			</div>
		//</nav >

	);
};

export default Navbar;
