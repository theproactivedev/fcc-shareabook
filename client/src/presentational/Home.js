import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Home = () => {
  return(
    <div className="container" id="home">
      <Jumbotron>
      <h1>Share a Book</h1>
      <p>Catalogue your books online and see other users&#39; books as well.</p>
      <p>Sign in and get started!</p>
      </Jumbotron>;
    </div>
  );
};

export default Home;
