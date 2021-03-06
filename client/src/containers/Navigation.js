import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  addUser, removeUser
} from '../actions.js';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state={
      activeItem: ""
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailed = this.onFailed.bind(this);
    this.logout = this.logout.bind(this);
    this.activate = this.activate.bind(this);
  }

  onSuccess(response) {
    let that = this;
    const token = response.headers.get('x-auth-token');
    response.json().then(function(user) {
      if (token) {
        let bookUser = {
          "userName" : user.user.userName,
          "userId" : user.user.userId,
          "userToken" : token
        };
        // localStorage.setItem("sk00b",JSON.stringify(bookUser));
        that.props.dispatch(addUser(bookUser));
      }
    });
  };

  onFailed(error) {
    alert(error);
  };

  logout() {
    // dispatch remove user from state
    this.props.dispatch(removeUser());
    localStorage.removeItem("$k00b");
  }

  activate(item) {
    this.setState({activeItem: item});
  }

  render() {
    const navbarInstance = (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to="/"><Navbar.Brand>Share-A-Book</Navbar.Brand></LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            {this.props.isUserAuthenticated &&
              <Nav pullRight>
              <LinkContainer to="/allBooks">
                <NavItem eventKey={'/allBooks'} href={'/allBooks'} className={this.state.activeItem === "allbooks" ? "activeLink" : ""} onClick={() => {this.activate("allbooks")}}><i className="fa fa-book" aria-hidden="true"></i> All Books</NavItem>
              </LinkContainer>
              <LinkContainer to="/profile">
              <NavItem eventKey={'/profile'} className={this.state.activeItem === "profile" ? "activeLink" : ""} onClick={() => {this.activate("profile")}}><i className="fa fa-user-o" aria-hidden="true"></i> Profile</NavItem>
              </LinkContainer>
                <LinkContainer to="/">
                <NavItem eventKey={'logout'} onClick={this.logout} className="signOut"><i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</NavItem>
                </LinkContainer>
              </Nav>
            }

            {!this.props.isUserAuthenticated &&
              <Nav pullRight>
              <NavItem eventKey={'/twitter-authenticate'}>
                <TwitterLogin className="twitter-btn" showIcon={false} loginUrl="https://eg-fcc-shareabook.herokuapp.com/api/v1/auth/twitter"
                onFailure={this.onFailed} onSuccess={this.onSuccess}
                requestTokenUrl="https://eg-fcc-shareabook.herokuapp.com/api/v1/auth/twitter/reverse" />
              </NavItem>
              </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
    );


    return (
      <div>
        <div>{navbarInstance}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, isUserAuthenticated } = state;
  return { user, isUserAuthenticated };
}

export default connect(mapStateToProps)(Navigation);
