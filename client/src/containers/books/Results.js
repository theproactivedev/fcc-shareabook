import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class Results extends Component {

  render() {
    let items = this.props.items;
    let books = [];

    if (items !== undefined) {
      for (let i = 0; i < items.length; i++) {
        const book = (
          <div className="card col-xs-12 col-sm-4 col-lg-3" key={items[i].title+i+""}>
            <div className="image">
            <img src={items[i].imageUrl} alt={items[i].title} className="img-responsive" />
            </div>
            <div className="info">
              <p>Title: {items[i].title}</p>
              <p>Author/s: {items[i].authors}</p>
              <p>Published Date: {items[i].publishedDate}</p>
              <p></p>
              <p></p>
            </div>
            <div className="bookBtn" onClick={() => {this.props.method(items[i])}}>
            <p><i className="fa fa-plus" aria-hidden="true"></i> {this.props.buttonText}</p>
            </div>
          </div>
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
        books
      }
      </div>
    );
  }
}

export default Results;
