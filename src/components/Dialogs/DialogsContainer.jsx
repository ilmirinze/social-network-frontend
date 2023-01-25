import React from "react";
import { sendMessageCreator, updateNewMessageTextCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => { dispatch(sendMessageCreator()) },
    updateNewMessageText: (text) => { dispatch(updateNewMessageTextCreator(text)) }
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(Dialogs)
