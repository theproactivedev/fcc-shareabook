import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class Home extends Component {

  render() {
    return(
      <div id="carousel">
      <Carousel>
        <Carousel.Item>
          <div className="overlay">
          <Carousel.Caption>
            <h1>Share a Book</h1>
            <p>Discover amazing books that you can trade with other readers.</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay">
          <Carousel.Caption>
            <h2>Organize your Books</h2>
            <p>Catalogue your books online. Sign in with Twitter and get started!</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay">
          <Carousel.Caption>
            <h2>Don&#39;t let your books go to waste.</h2>
            <p>Share it with other people who will read it.</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
      </div>
    );
  }
}

export default Home;
