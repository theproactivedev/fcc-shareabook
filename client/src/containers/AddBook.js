import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';

class AddBook extends Component {

  constructor() {
    super();

    this.state = {
      book: ""
    };

    this.handleBookChange = this.handleBookChange.bind(this);
    // this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleBookChange(e) {
    this.setState({
      book: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form>
        <FormGroup>
    			<InputGroup>
    				<InputGroup.Addon className="searchIcon"><i className="fa fa-search" aria-hidden="true"></i></InputGroup.Addon>
    				<FormControl type="text" className="searchBtn" value={this.state.book} onChange={this.handleBookChange} placeholder="Search book..." />
    			</InputGroup>
    		</FormGroup>
        </form>
      </div>
    );
  }
}

export default AddBook;
