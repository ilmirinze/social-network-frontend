import React from 'react';
import s from './Post.module.css'


const Post = (props) => {
  return <div className={s.item}>
    <img src="https://i.pinimg.com/736x/67/fd/67/67fd67b9eb8c036f4067a72e8b567a98--fairytail-shrek.jpg" />
    {props.massage}
    <div>
      <span>like</span>
      {props.likesCount}
    </div>
  </div>
}

export default Post;