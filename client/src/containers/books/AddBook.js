import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Alert } from 'react-bootstrap';
import { searchBook, addBook } from '../../actions.js';
import { connect } from 'react-redux';
import Results from './Results';

class AddBook extends Component {

  constructor() {
    super();

    this.state = {
      book: "",
      added: false
    };

    this.handleBookChange = this.handleBookChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  handleBookChange(e) {
    this.setState({
      added:false,
      book: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.searchBook("/search/" + this.state.book);
    }
  }

  addBook(item) {
    item.owner = this.props.user.userId;
    this.props.addBook(item, this.props.user.userToken);
    this.setState({
      book: "",
      added: true
    });
  }


  render() {
    return (
      <div>
        <h3>Search your Book</h3>
        <form>
        <FormGroup>
    			<InputGroup>
    				<InputGroup.Addon className="searchIcon"><i className="fa fa-search" aria-hidden="true"></i></InputGroup.Addon>
    				<FormControl type="text" className="searchBtn" value={this.state.book} onChange={this.handleBookChange} onKeyDown={this.handleKeyDown} placeholder="Search book..." />
    			</InputGroup>
    		</FormGroup>
        </form>
        {this.state.added &&
          <div>
          <Alert bsStyle="primary" className="primary">
            <p>You have just added a book. Search for more.</p>
          </Alert>
          </div>
        }
        {this.state.book !== "" &&
          <Results method={this.addBook} items={this.props.books} isFetching={this.props.isFetching} buttonText="Add to List" />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, books, isFetching } = state;
  return { user, books, isFetching };
}

function mapDispatchToProps(dispatch) {
  return {
    searchBook: (link) => {
      dispatch(searchBook(link))
    },
    addBook: (item, token) => {
      dispatch(addBook(item, token))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
