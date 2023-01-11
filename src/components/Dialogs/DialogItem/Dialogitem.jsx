import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div >
      <img className={s.image} src={props.image} /><NavLink className={(masData) => masData.isActive ? s.active : s.item} to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;