import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import QuestionEditor from '../QuestionEditor/QuestionEditor';


const getQuestion = () => ({
  content: '',
  answers: [],
  result: 0,
  chapter: 0
});

const onSave = (data, url = '/') =>
  axios.post('/api/question', data)
    .then(() => { window.location.href = url; })
    .catch(() => toast('Failed to save', { type: toast.TYPE.ERROR, autoClose: 5000 }));

const onSaveOnce = data => onSave(data, '/');
const onSaveNext = data => onSave(data, '/new-question');

class NewQuestion extends React.Component {
  render() {
    return (
      <div>
        <QuestionEditor question={getQuestion()} onSave={onSaveOnce} onSaveNext={onSaveNext} />
        <ToastContainer />
      </div>
    );
  }
}

export default NewQuestion;
