import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import QuestionEditor from '../QuestionEditor/QuestionEditor';

import ToastFactory from '../../../factories/toast.factory';

const onSave = data =>
  axios.put('/api/question', data)
    .then(() => ToastFactory.success('Edit Success!'))
    .catch(() => ToastFactory.warn('Failed to edit'));

class EditQuestion extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <QuestionEditor
          question={data}
          chapters={this.props.data2}
          onSave={d => onSave(d)}
        />
      </div>
    );
  }
}

EditQuestion.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    result: PropTypes.number
  }),
  data2: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }))
};

export default EditQuestion;
