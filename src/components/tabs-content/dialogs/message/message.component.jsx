import React from "react";
import s from "../dialogs.module.css";


const MessageComponent = (props) => {
  let userId = 0
  return <div className={userId === 1 ? s.mymessage : s.alienmessage}><p>{props.messages}</p></div>;
};

export default MessageComponent;