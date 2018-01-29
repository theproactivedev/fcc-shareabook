import React, { Component } from 'react';
import { connect } from 'react-redux';
import Results from '../Results';
import { getAllBooks } from '../../actions.js';

class AllBooks extends Component {

  componentWillMount() {
    this.props.dispatch(getAllBooks());
  }

  requestBook(item) {
    console.log(item.googleBookId);
  }

  render() {
    return (
      <div className="container">
        <h3>My Books</h3>
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
