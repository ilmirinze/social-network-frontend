import React from 'react';
import MyPostsContainer from './my-posts/my-posts.container';
import ProfileInfoComponent from "./profile-info/profile-info.component";


const ProfileComponent = (props) => {

  return <div>
      <ProfileInfoComponent profile={props.profile} status = {props.status} updateStatus={props.updateStatus} />
    </div>
}

export default ProfileComponent;