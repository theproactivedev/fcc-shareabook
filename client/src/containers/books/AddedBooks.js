import React, { Component } from 'react';
import { getAddedBooks, removeBook } from '../../actions.js';
import { connect } from 'react-redux';
import Results from './Results';

class AddedBooks extends Component {

  componentWillMount() {
    this.props.dispatch(getAddedBooks(this.props.user.userToken));
  }

  removeBook(item) {
    console.log(item.googleBookId);
    this.props.dispatch(removeBook(item.googleBookId, this.props.user.userToken))
  }

  render() {
    return (
      <div>
        <h3>My Books</h3>
        {this.props.addedBooks !== undefined  &&
          <Results method={this.removeBook.bind(this)} items={this.props.addedBooks} isFetching={this.props.isFetching} buttonText="Remove" />
        }
        {this.props.addedBooks === undefined &&
          <div>
            <p>No added books. Go to Add Book section and start adding your books online.</p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, addedBooks, isFetching } = state;
  return { user, addedBooks, isFetching };
}


export default connect(mapStateToProps)(AddedBooks);
