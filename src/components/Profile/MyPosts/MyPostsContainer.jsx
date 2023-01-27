import React from "react";
import { connect } from "react-redux";
import { addPostActionCreator, addNewPost, getPosts } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { compose } from 'redux'


class MyPostsContainer extends React.Component {
  componentDidMount() {
    this.props.getPosts(this.props.userId, this.props.currentPage, this.props.pageSize)
    
  }
  // onPageChanged = (pageNumber) => {
  //   this.props.getUsers(pageNumber, this.props.pageSize)
  // }
  render() {
    return (
      <>
        <MyPosts
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
    userId: state.profilePage.userId
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


//const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

