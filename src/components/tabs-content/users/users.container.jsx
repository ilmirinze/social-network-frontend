import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, setCurrentPage, getUsers, toggleFollowingProgress } from '../../../redux/users-reducer'
import { getUsersSuperSelector, getTotalUsersCountSelect, getPageSizeSelect, getCurrentPageSelect, getIsFetchingSelect, getFollowingInProgressSelect } from '../../../redux/users-selectors'
import UsersComponent from './users.component'
import Preloader from '../../common/preloader/preloader'
import { compose } from 'redux'

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <UsersComponent
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        totalUsersCount: getTotalUsersCountSelect(state),
        pageSize: getPageSizeSelect(state),
        currentPage: getCurrentPageSelect(state),
        isFetching: getIsFetchingSelect(state),
        followingInProgress: getFollowingInProgressSelect(state)

    }
}


//let withNavigate = withAuthNavigate(UsersContainer)




export default compose (
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers}),
    //withAuthNavigate
)(UsersContainer)