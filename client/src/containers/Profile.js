import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalButton from './modal/ModalButton';
import AddBook from './books/AddBook';
import AddedBooks from './books/AddedBooks';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

class Profile extends Component {

  render() {
    return (
      <div className="container">
        <h2>Profile</h2>
        <div>
        <h3>{this.props.user.userName} <ModalButton /></h3>
        <p><i className="fa fa-user" aria-hidden="true"></i> {this.props.user.name}</p>
        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.user.city}, {this.props.user.state}</p>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first"><i className="fa fa-search-plus" aria-hidden="true"></i> Add Book</NavItem>
                <NavItem eventKey="second"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Books Added</NavItem>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first"><AddBook /></Tab.Pane>
                <Tab.Pane eventKey="second"><AddedBooks /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>;
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
