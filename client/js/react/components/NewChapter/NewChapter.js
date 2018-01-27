import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import ChapterEditor from '../ChapterEditor/ChapterEditor';

import ToastFactory from '../../../factories/toast.factory';


const getIniState = () => ({
  title: '',
  quote: '',
  prayer: ''
});

const onSave = data =>
  axios.post('/api/chapter', data)
    .then(() => ToastFactory.success('Save Success!'))
    .catch(() => ToastFactory.warn('Failed to save'));

class NewQuestion extends React.Component {
  render() {
    return (
      <div>
        <ChapterEditor
          chapter={getIniState()}
          onSave={onSave}
        />
      </div>
    );
  }
}

export default NewQuestion;
