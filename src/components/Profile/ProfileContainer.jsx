import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, addNewPost } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import { compose } from 'redux';


export function withRouter(Children) {
  return (props) => {

    const match = { params: useParams() };
    return <Children {...props} match={match} />
  }
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 27621
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }
  
  render() {
    return (      
      <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} addNewPost= {this.props.addNewPost}/>
    )
  }
}




let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.profilePage.userId
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, addNewPost }),
  withRouter,
)(ProfileContainer)
