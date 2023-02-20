import React from "react";
import { connect } from "react-redux";
import { addNewPost, getPosts } from "../../../../redux/profile-reducer";
import MyPostsComponent from "./my-posts.component";
import { compose } from 'redux'


class MyPostsContainer extends React.Component {
  is = true;
  componentDidMount() {
    this.props.getPosts(this.props.userId, this.props.currentPage, this.props.pageSize)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.is)
    this.props.getPosts(this.props.userId, this.props.currentPage, this.props.pageSize)
    this.is = false;
  }

  // onPageChanged = (pageNumber) => {
  //   this.props.getUsers(pageNumber, this.props.pageSize)
  // }
  render() {
    return (
      <>
        <MyPostsComponent
             posts = {this.props.posts}
             newPostText ={this.props.newPostText}
             userId= {this.props.userId}
             addPost = {this.props.addNewPost}

        />
      </>
    )
  }


}

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

export default compose (
  connect(mapStateToProps, {getPosts, addNewPost}),
  //withAuthNavigate
)(MyPostsContainer)

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (userId, newPostText) => { dispatch(addNewPost(userId, newPostText)) }
//   }
// }


//const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(my-posts);

