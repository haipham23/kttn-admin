import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import ChapterEditor from '../ChapterEditor/ChapterEditor';


const getIniState = () => ({
  title: '',
  quote: '',
  prayer: ''
});

const onSave = (data, url = '/chapters') =>
  axios.post('/api/chapter', data)
    .then(() => { window.location.href = url; })
    .catch(() => toast('Failed to save', { type: toast.TYPE.ERROR, autoClose: 5000 }));

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
        <ToastContainer />
      </div>
    );
  }
}

export default NewQuestion;
