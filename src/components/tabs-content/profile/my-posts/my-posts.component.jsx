import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import s from "./my-posts.module.css";
import PostComponent from "./post/post.component";
import { Textarea } from "../../../common/form-controls/form-controls";

const MyPostsComponent = (props) => {
  let postsElements = props.posts.map(p => <PostComponent text={p.text} key={p.id}/>)

  let onAddPost = (values) => {
    props.addPost(props.userId, values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <div>
        <h3>My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost} />
        <div className={s.posts}>
          {postsElements }
        </div>
      </div>
    </div>
  );
};

let maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newPostText'} component={Textarea} validate= {[required, maxLength10 ]}/>
      </div>
      <div>
        <button>add post</button>
      </div>
    </form>
  )
}

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPostsComponent;
