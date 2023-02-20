import React from "react";
import s from "../dialogs.module.css";


const MessageComponent = (props) => {
  return <div className={s.massage}>{props.messages}</div>;
};

export default MessageComponent;