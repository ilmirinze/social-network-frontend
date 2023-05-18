import React from "react";
import Navbar from "./navbar.component";
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';

class NavbarContainer extends React.Component {
    render () {
        return <Navbar   {...this.props} username={this.props.username} role={this.props.role}/> 
    }
}

let mapStateToProps = (state) => ({
    userName: state.auth.username
  })
  
  export default (
    connect(mapStateToProps,{logout}))(NavbarContainer)