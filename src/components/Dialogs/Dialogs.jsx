import React from "react";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/Dialogitem";

const Dialogs = (props) => {

  let state = props.dialogsPage;  
  let dialogsElements = state.dialogs.map(d => <DialogItem image={d.image} key={d.id} name={d.name} id={d.id} />)
  let messageElements = state.messages.map(m => <Message messages={m.message} key={m.id} id={m.id} />)


  let onSendMessage = () => {
    props.sendMessage()
  }

  let onMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.massages}>
        {messageElements}
        <div className={s.sendMessage}>
          <textarea onChange={onMessageChange} value={state.newMessageText} />
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};





export default Dialogs;
