import React from "react";
import s from "../dialogs.module.css";


const MessageComponent = (props) => {
  let userId = 2
  return <div className={userId === 1 ? s.mymessage : s.alienmessage}>{props.messages}</div>;
};

export default MessageComponent;