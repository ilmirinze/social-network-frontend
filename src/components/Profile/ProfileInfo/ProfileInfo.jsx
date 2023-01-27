import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'


const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photo}></img>
        <div>{props.profile.fullName}</div>
        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  )
}

export default ProfileInfo;