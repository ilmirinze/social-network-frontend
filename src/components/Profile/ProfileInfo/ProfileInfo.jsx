import React from 'react';
import s from './ProfileInfo.module.css'


const ProfileInfo = () => {
  return(
    <div>
      <div><img src='https://i.pinimg.com/736x/67/fd/67/67fd67b9eb8c036f4067a72e8b567a98--fairytail-shrek.jpg' /></div>
        <div className={s.descriptionBlock}>
          ava + description
        </div>    
  </div>
  )
}

export default ProfileInfo;