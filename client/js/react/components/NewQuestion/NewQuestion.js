import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import QuestionEditor from '../QuestionEditor/QuestionEditor';

import ToastFactory from '../../../factories/toast.factory';


const getQuestion = () => ({
  content: '',
  answers: [],
  result: 0,
  chapter: ''
});

const onSave = (data, url = '/') =>
  axios.post('/api/question', data)
    .then(() => { window.location.href = url; })
    .catch(() => ToastFactory.warn('Failed to save'));

const onSaveOnce = data => onSave(data, '/');
const onSaveNext = data => onSave(data, '/new-question');

class NewQuestion extends React.Component {
  render() {
    return (
      <div>
        <QuestionEditor
          question={getQuestion()}
          chapters={this.props.data2}
          onSave={onSaveOnce}
          onSaveNext={onSaveNext}
        />
      </div>
    );
  }
}

NewQuestion.propTypes = {
  data2: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }))
};

export default NewQuestion;
