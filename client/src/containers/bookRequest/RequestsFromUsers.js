import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestList from './RequestList';
import { getUserRequests, acceptRequest, rejectRequest } from '../../actions.js';

class RequestsFromUsers extends Component {
  componentWillMount() {
    this.props.dispatch(getUserRequests(this.props.user.userToken));
  }

  rejectRequest(item) {
    this.props.dispatch(rejectRequest(item, this.props.user.userToken));
  }

  acceptRequest(item) {
    this.props.dispatch(acceptRequest(item, this.props.user.userToken));
  }

  render() {
    return (
      <div>
      <h3>Requests from Other Users</h3>
        {this.props.requestedBooksFromUsers !== undefined  &&
          <RequestList method={this.rejectRequest.bind(this)} items={this.props.requestedBooksFromUsers} isFetching={this.props.isFetching} buttonText="Accept" acceptRequest={this.acceptRequest.bind(this)} />
        }
        {this.props.requestedBooksFromUsers === undefined &&
          <div>
            <p>No requests from other user/s yet</p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, isFetching, requestedBooksFromUsers } = state;
  return { user, isFetching, requestedBooksFromUsers };
}


export default connect(mapStateToProps)(RequestsFromUsers);
