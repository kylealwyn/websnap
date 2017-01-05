import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import Parse from 'parse';

import configureStore from './store/configureStore';
import Root from './containers/Root';
import './styles/main.scss';

// Initialize Redux Store
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Initialize Parse
Parse.initialize('01b79222-caa1-4f27-894a-79bfc4986436');
Parse.serverURL = 'https://gqs.emeraldcloudlab.com/kyle/';

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
            document.getElementById('root'),
        );
  });
}
