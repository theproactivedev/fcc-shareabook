import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalButton from './ModalButton';
import OwnedBooks from './OwnedBooks';
import AddBook from './AddBook';

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      state: "",
      city: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name || "",
      state: this.props.user.state || "",
      city: this.props.user.city || ""
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.user.name || "",
      state: nextProps.user.state || "",
      city: nextProps.user.city || ""
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Profile</h2>
        <div>
        <h3>{this.props.user.userName} <ModalButton /></h3>
        <p><i className="fa fa-user" aria-hidden="true"></i> {this.state.name}</p>
        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.city}, {this.state.state}</p>
        </div>
        <AddBook />
        <OwnedBooks />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isUserAuthenticated, user } = state;
  return {
    isUserAuthenticated, user
  };
}

export default connect(mapStateToProps)(Profile);
