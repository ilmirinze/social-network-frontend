import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div><img src='https://i.pinimg.com/736x/67/fd/67/67fd67b9eb8c036f4067a72e8b567a98--fairytail-shrek.jpg' /></div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large}></img>
        ava + description
      </div>
    </div>
  )
}

export default ProfileInfo;