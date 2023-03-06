import React from "react";
import s from "./dialogs.module.css";
import MessageComponent from "./message/message.component";
import DialogItemComponent from "./dialog-item/dialog-item.component";
import { Navigate } from "react-router-dom"
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../common/form-controls/form-controls";
import { maxLengthCreator, required } from "../../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50)

const DialogsComponent = (props) => {

  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => <DialogItemComponent image={d.image} key={d.id} name={d.name} id={d.id} />)
  let messageElements = state.messages.map(m => <MessageComponent messages={m.message} key={m.id} id={m.id} />)

  
  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody)
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
      <Field component={Textarea} validate= {[required, maxLength50 ]}  name='newMessageBody' placeholder='enter your message'></Field>
      <button>Send</button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddmessageForm'})(AddMessageForm)



export default DialogsComponent;
