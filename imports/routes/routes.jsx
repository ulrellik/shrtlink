import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import createHistory from "history/createBrowserHistory"

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import ShrtLink from '../ui/ShrtLink';
import NotFound from '../ui/NotFound';

const authPaths = ['/links'];
const unauthPaths = ['/', '/signup'];
const history = createHistory();

export function onAuthChange() {
  const isAuth = !!Meteor.userId();
  if (isAuth && unauthPaths.includes(history.location.pathname)) {
    history.replace('/links');
  } else if (!isAuth && authPaths.includes(history.location.pathname)) {
    history.replace('/');
  }
}

export default <Router>
    <Switch>
      <Route exact path="/" render={() => !Meteor.userId() ? <Login/> : <Redirect to="/links"/>}/>
      <Route exact path="/links" render={() => !!Meteor.userId() ? <ShrtLink/> : <Redirect to="/"/>}/>
      <Route exact path="/signup" render={() => !Meteor.userId() ? <Signup/> : <Redirect to="/links"/>}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>;
