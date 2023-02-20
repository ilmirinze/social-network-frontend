import React from "react";
import { sendMessageCreator,  } from "../../../redux/dialogs-reducer";
import DialogsComponent from "./dialogs.component";
import { connect } from "react-redux";
import { compose } from "redux";


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => { dispatch(sendMessageCreator(newMessageBody)) },
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //withAuthNavigate
)(DialogsComponent)
