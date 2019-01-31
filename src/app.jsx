import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/index.js';
import {Main} from './components/Main/Main.js';

import 'react-select/dist/react-select.css';

const store = configureStore();

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app-root'),
);

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept(undefined, function() {
    // Require the new version and render it instead
    var NextApp = require('./components/Main/Main.js');
    ReactDOM.render(<Main />, document.getElementById('app-root'));
  });
}
