import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Parse from 'parse';
import App from './components/App';
import MessageCenter from './containers/MessageCenter';
import SignInOrUp from './containers/SignInOrUp';
import NewMessage from './components/NewMessage';

const requireAuth = (nextState, replace) => {
  if (!Parse.User.current()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const getIndexRoute = (nextState, done) => {
  done(null, Parse.User.current() ? MessageCenter : SignInOrUp);
};

export default (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getIndexRoute} />
    <Route path="messages/new" component={NewMessage} onEnter={requireAuth} />
    <Redirect from="*" to="/" />
  </Route>
);
