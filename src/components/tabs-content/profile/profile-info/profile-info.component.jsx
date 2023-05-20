import React from 'react';
import Preloader from '../../../common/preloader/preloader';
import s from './profile-info.module.css'
import ProfileStatusWithHooksComponent from './profile-status-with-hooks.component';


const ProfileInfoComponent = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.mainContent}>
      <div className={s.descriptionBlock}>
        <div>
          <img className={s.img} src={"https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png"}></img>
          <></>
        </div>
        <div className={s.info}>
          <h2 className={s.name}>{props.profile.firstName} {props.profile.lastName}</h2>
          <div className={s.text}><strong>Дата рождения:</strong> {props.profile.birthday}</div>
          <div className={s.text}><strong>Университет:</strong> {props.profile.institution}</div>
          <div className={s.text} ><strong>Факультет:</strong> {props.profile.faculty}</div>
          <div className={s.text}><strong>группа:</strong> {props.profile.group}</div>
          <div className={s.text}><strong>курс:</strong> {props.profile.course}</div>
        </div>
        {/* <ProfileStatusWithHooksComponent status={props.status} updateStatus={props.updateStatus} /> */}
      </div>
    </div>
  )
}

export default ProfileInfoComponent;