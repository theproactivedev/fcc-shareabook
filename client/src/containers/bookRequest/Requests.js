import React, { Component } from 'react';
import { getBookRequests, removeBookRequest } from '../../actions.js';
import { connect } from 'react-redux';
import RequestList from './RequestList';

class Requests extends Component {

  componentWillMount() {
    this.props.dispatch(getBookRequests(this.props.user.userToken));
  }

  removeBook(item) {
    this.props.dispatch(removeBookRequest(item, this.props.user.userToken))
  }

  render() {
    return (
      <div>
        <h3>My Book Requests</h3>
        {this.props.bookRequests !== undefined  &&
          <RequestList method={this.removeBook.bind(this)} items={this.props.bookRequests} isFetching={this.props.isFetching} buttonText="Remove" />
        }
        {this.props.bookRequests === undefined &&
          <div>
            <p>You haven&#39;t made any book request yet.</p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, bookRequests, isFetching } = state;
  return { user, bookRequests, isFetching };
}


export default connect(mapStateToProps)(Requests);
