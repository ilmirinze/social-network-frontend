import React from "react";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/Dialogitem";
import { Navigate } from "react-router-dom"
import { Field, reduxForm } from "redux-form";

const Dialogs = (props) => {

  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => <DialogItem image={d.image} key={d.id} name={d.name} id={d.id} />)
  let messageElements = state.messages.map(m => <Message messages={m.message} key={m.id} id={m.id} />)

  
  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody)
  }

  if (!props.isAuth) {
    return <Navigate to="/login" />
  }
  

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.massages}>
        {messageElements}
        <div className={s.sendMessage}>
          <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component='textarea' name='newMessageBody' placeholder='enter your message'></Field>
      <button>Send</button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddmessageForm'})(AddMessageForm)



export default Dialogs;
