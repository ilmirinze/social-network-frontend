// import React from 'react';
// import { connect } from 'react-redux';
// import { getUserProfile, getStatus, updateStatus, addNewPost } from '../../../redux/profile-reducer';
// import { useParams } from 'react-router-dom';
// import ProfileComponent from './profile.component';
// import { compose } from 'redux';


// export function withRouter(Children) {
//   return (props) => {

//     const match = { params: useParams() };
//     return <Children {...props} match={match} />
//   }
// }

// class ProfileOntainer extends React.Component {
//   refreshProfile() {
//     let userId = this.props.match.params.userId
//     if (!userId) {
//       userId = this.props.userId
//     }
//     this.props.getUserProfile(userId)
//     this.props.getStatus(userId)
//   }

//   componentDidMount() {
//     this.refreshProfile()
//   }
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.props.match.params.userId != prevProps.match.params.userId) {
//       this.refreshProfile()
//     }
//   }

//   render() {
//     return (
//       <ProfileComponent {...this.props} status={this.props.status} updateStatus={this.props.updateStatus} addNewPost={this.props.addNewPost} />
//     )
//   }
// }




// let mapStateToProps = (state) => ({
//   profile: state.profilePage.profile,
//   status: state.profilePage.status,
//   userId: state.auth.userId
// })

// export default compose(
//   connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, addNewPost }),
//   withRouter,
// )(ProfileOntainer)
