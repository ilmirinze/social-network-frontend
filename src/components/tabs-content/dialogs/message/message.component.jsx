import React from "react";
import s from "../dialogs.module.css";


const MessageComponent = (props) => {
  let userId = 10
  return <div className={userId === 1 ? s.mymessageContainer : s.alienmessageContainer}><div className={userId === 1 ? s.mymessage : s.alienmessage}>{props.messages}</div></div>;
};

export default MessageComponent;