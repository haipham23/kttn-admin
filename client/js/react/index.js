import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

import reactElements from './config';

const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};

domready(() => {
  reactElements.forEach((e) => {
    const dom = document.getElementById(`react-${e.dom}`);

    if (dom) {
      const dataDom = document.getElementById(`react-data-${e.data}`);
      const data = dataDom ? parse(dataDom.innerText) : {};

      ReactDOM.render(<e.element data={data} />, dom);
    }
  });
});
