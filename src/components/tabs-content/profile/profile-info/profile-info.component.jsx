import React from 'react';
import Preloader from '../../../common/preloader/preloader';
import s from './profile-info.module.css'
import ProfileStatusWithHooksComponent from './profile-status-with-hooks.component';


const ProfileInfoComponent = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={ "https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png"}></img>
        <div>{props.profile.fullName}</div>
        <ProfileStatusWithHooksComponent status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  )
}

export default ProfileInfoComponent;