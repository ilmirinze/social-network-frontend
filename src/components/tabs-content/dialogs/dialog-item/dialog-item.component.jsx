import React from "react";
import { NavLink } from "react-router-dom";
import s from "../dialogs.module.css";
const DialogItemComponent = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div >
      <img className={s.image} src={props.image} /><NavLink className={(masData) => masData.isActive ? s.active : s.item} to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItemComponent;