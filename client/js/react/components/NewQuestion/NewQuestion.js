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

const onSave = data =>
  axios.post('/api/question', data)
    .then(() => ToastFactory.success('Save Success!'))
    .catch(() => ToastFactory.warn('Failed to save'));

class NewQuestion extends React.Component {
  render() {
    return (
      <div>
        <QuestionEditor
          question={getQuestion()}
          chapters={this.props.data2}
          onSave={onSave}
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
