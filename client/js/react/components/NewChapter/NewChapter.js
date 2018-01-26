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

const onSave = (data, url = '/chapters') =>
  axios.post('/api/chapter', data)
    .then(() => { window.location.href = url; })
    .catch(() => ToastFactory.warn('Failed to save'));

const onSaveOnce = data => onSave(data, '/chapters');
const onSaveNext = data => onSave(data, '/new-chapter');

class NewQuestion extends React.Component {
  render() {
    return (
      <div>
        <ChapterEditor
          chapter={getIniState()}
          onSave={onSaveOnce}
          onSaveNext={onSaveNext}
        />
      </div>
    );
  }
}

export default NewQuestion;
