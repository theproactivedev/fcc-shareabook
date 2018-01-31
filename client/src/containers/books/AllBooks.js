import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Results from './Results';
import { getAllBooks, requestBook } from '../../actions.js';

class AllBooks extends Component {

  constructor() {
    super();
    this.state = {requested: false, message: "You have just requested a book."};
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getAllBooks());
  }

  requestBook(item) {
    if (item.owner === this.props.user.userId) {
      this.setState({message: "This is your book. You already have this."});
    } else {
      let book = {
        title: item.title,
        googleBookId: item.googleBookId,
        owner: item.owner,
        borrower: this.props.user.userId
      };
      this.props.dispatch(requestBook(book, this.props.user.userToken));
    }
    this.setState({requested: true});
  }

  hideMessage() {
    this.setState({requested: false});
  }

  render() {
    return (
      <div className="container parentDiv">
        <h2>My Books</h2>
        {this.state.requested &&
          <Alert bsStyle="success" className="primary" onClick={this.hideMessage}>
            <p>{this.state.message}</p>
          </Alert>
        }
        {this.props.allBooks !== undefined  &&
          <Results method={this.requestBook.bind(this)} items={this.props.allBooks} isFetching={this.props.isFetching} buttonText="Request Book" />
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, allBooks, isFetching } = state;
  return { user, allBooks, isFetching };
}


export default connect(mapStateToProps)(AllBooks);
