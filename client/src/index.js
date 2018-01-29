import React from 'react';
import ReactDOM from 'react-dom';
import Root from './presentational/Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();