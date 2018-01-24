import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

import Counter from './components/Counter/Counter';

domready(() => {
  ReactDOM.render(
    <Counter />,
    document.getElementById('react-counter')
  );
});
