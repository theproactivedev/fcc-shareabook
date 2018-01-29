import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../presentational/Home';
import Profile from './Profile';
import AllBooks from './books/AllBooks';

export default class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/allBooks" component={AllBooks} />
      </Switch>
    );
  }
}
