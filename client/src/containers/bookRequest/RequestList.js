import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class RequestList extends Component {

  render() {
    let items = this.props.items;
    let books = [];

    if (items !== undefined) {
      for (let i = 0; i < items.length; i++) {
        const book = (
          <ListGroupItem key={i}>{items[i].title}
          { items[i].rejected &&
            <span>&nbsp;&nbsp;(rejected)</span>
          }
          {
            items[i].accepted &&
            <span>&nbsp;&nbsp;(accepted)</span>
          }
          <span className="pull-right">
          { this.props.buttonText === "Accept" &&
            <i className="fa fa-check iconBtn" aria-hidden="true" onClick={() => {this.props.acceptRequest(items[i])}}></i>
          }
          &nbsp;&nbsp;<i className="fa fa-times iconBtn" aria-hidden="true" onClick ={() => {this.props.method(items[i])}}></i></span>
          </ListGroupItem>
        );
        books.push(book);
      }
    }

    return (
      <div>
      <div className="spinner">
        <ClipLoader
          color={'#3c3c3d'}
          loading={this.props.isFetching}
        />
      </div>

      {!this.props.isFetching &&
        <ListGroup>{books}</ListGroup>
      }
      </div>
    );
  }
}

export default RequestList;
