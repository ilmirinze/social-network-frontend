import React from "react";
import { sendMessageCreator, updateNewMessageTextCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";


let mapStateToProps = (state) => {  
  return {
    dialogsPage: state.dialogsPage
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {dispatch(sendMessageCreator())},
    updateNewMessageText: (text) => {dispatch(updateNewMessageTextCreator(text))}
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);



export default DialogsContainer;
