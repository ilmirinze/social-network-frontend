import React from 'react';
import MyPostsContainer from './my-posts/my-posts.container';
import ProfileInfoComponent from "./profile-info/profile-info.component";
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, getUserProfile, getStatus } from '../../../redux/profile-reducer';
import { useEffect } from 'react';


const ProfileComponent = () => {

  const profile = useSelector(store => store.profilePage.profile)
  const status = useSelector(store => store.profilePage.status)
  const userId = useSelector(store => store.auth.userId)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId))
    }
  }, [userId])

  return <div>
    <ProfileInfoComponent profile={profile} status={status} updateStatus={dispatch(updateStatus)} />
  </div>
}

export default ProfileComponent;