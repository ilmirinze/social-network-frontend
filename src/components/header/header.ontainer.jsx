import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from './header.component';
import { getAuthUserData, logout } from '../../redux/auth-reducer';



class HeaderOntainer extends React.Component {
    componentDidMount() {
      this.props.getAuthUserData()
    }



    render() {
        return <HeaderComponent {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, { getAuthUserData, logout })(HeaderOntainer);