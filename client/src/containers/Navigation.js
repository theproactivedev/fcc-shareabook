import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  addUser, removeUser
} from '../actions.js';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailed = this.onFailed.bind(this);
    this.logout = this.logout.bind(this);
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

  render() {
    const navbarInstance = (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to="/"><Navbar.Brand>Share-A-Book</Navbar.Brand></LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/allBooks">
              <NavItem eventKey={'/allBooks'} href={'/allBooks'}>All Books</NavItem>
            </LinkContainer>

            {this.props.isUserAuthenticated &&

              <NavDropdown eventKey={'account'} title='Account' id='basic-nav-dropdown'>
                <LinkContainer to="/profile">
                <MenuItem eventKey={'/profile'}><i className="fa fa-user-o" aria-hidden="true"></i> Profile</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <LinkContainer to="/">
                <MenuItem eventKey={'logout'} onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</MenuItem>
                </LinkContainer>
              </NavDropdown>
            }

            {!this.props.isUserAuthenticated &&
              <NavItem eventKey={'/twitter-authenticate'}>
                <TwitterLogin className="twitter-btn" showIcon={false} loginUrl="http://localhost:3000/api/v1/auth/twitter"
                onFailure={this.onFailed} onSuccess={this.onSuccess}
                requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse" />
              </NavItem>
            }
          </Nav>
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
