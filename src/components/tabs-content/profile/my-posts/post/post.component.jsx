import React from 'react';
import s from './post.module.css'


const PostComponent = (props) => {
  return <div className={s.item}>
    <img src={props.photo} alt={"photo"}/>
    {props.text}
  </div>
}

export default PostComponent;