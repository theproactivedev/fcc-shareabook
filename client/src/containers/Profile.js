import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalButton from './modal/ModalButton';
import AddBook from './books/AddBook';
import AddedBooks from './books/AddedBooks';
import Requests from './bookRequest/Requests';
import RequestsFromUsers from './bookRequest/RequestsFromUsers';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { getUserProfile } from '../actions.js';

class Profile extends Component {

  componentWillMount() {
    this.props.dispatch(getUserProfile(this.props.user.userToken));
  }

  render() {
    return (
      <div>
      <div className="profile">
      <div className="container">
      <h2 className="name">{this.props.user.userName} <ModalButton /></h2>
      <p><i className="fa fa-user" aria-hidden="true"></i> {this.props.user.name}</p>
      <p><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.user.city}, {this.props.user.state}</p>
      </div>
      </div>
      <div className="container parentDiv">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first"><i className="fa fa-search-plus" aria-hidden="true"></i> Add Book</NavItem>
                <NavItem eventKey="second"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Books Added</NavItem>
                <NavItem eventKey="third">Book Requests</NavItem>
                <NavItem eventKey="fourth">User Requests</NavItem>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first"><AddBook /></Tab.Pane>
                <Tab.Pane eventKey="second"><AddedBooks /></Tab.Pane>
                <Tab.Pane eventKey="third"><Requests /></Tab.Pane>
                <Tab.Pane eventKey="fourth"><RequestsFromUsers /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>;
      </div>
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
