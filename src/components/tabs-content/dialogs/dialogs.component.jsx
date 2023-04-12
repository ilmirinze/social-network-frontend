import React, { useEffect, useState } from "react";
import s from "./dialogs.module.css";
import MessageComponent from "./message/message.component";
import DialogItemComponent from "./dialog-item/dialog-item.component";
import { Navigate } from "react-router-dom"
import { Field, reduxForm } from "redux-form";
import { Input } from "../../common/form-controls/form-controls";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import SockJsClient from 'react-stomp';


var stompClient = null;


const DialogsComponent = (props) => {


  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => <DialogItemComponent image={d.image} key={d.id} name={d.name} id={d.id} />)
  let messageElements = state.messages.map(m => <MessageComponent messages={m.message} key={m.id} id={m.id} />)


  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody)
  }
    
  useEffect(() => {
    connect();
  }, []);


  const connect = () => {
    
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("connected");
  };

  const onError = (err) => {
    debugger
    console.log(err);
  };


  
  return (
    <div className={s.dialogs}>
      <div className={s.mainContent}>
        <div className={s.messagesSection}>
          <div className={s.massages}>
            {messageElements}
          </div>
        </div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
      <div className={s.addedContent}>
        {dialogsElements}
      </div>

    </div>

  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.sendMessage}>
      <Field component={Input} name='newMessageBody' placeholder='Enter your message' className={s.input}></Field>
      <button className={s.btn}><FontAwesomeIcon className={s.icon} icon={faPaperPlane} /></button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddmessageForm' })(AddMessageForm)



export default DialogsComponent;
