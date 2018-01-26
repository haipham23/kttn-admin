import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import QuestionEditor from '../QuestionEditor/QuestionEditor';

const onSave = data =>
  axios.put('/api/question', data)
    .then(() => { window.location.href = '/'; })
    .catch(() => toast('Failed to edit', { type: toast.TYPE.ERROR, autoClose: 5000 }));

const onDelete = id =>
  axios.delete(`/api/question/${id}`)
    .then(() => { window.location.href = '/'; })
    .catch(() => toast('Failed to delete', { type: toast.TYPE.ERROR, autoClose: 5000 }));

class EditQuestion extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <QuestionEditor
          question={data}
          onSave={d => onSave(d)}
          onDelete={d => onDelete(d)}
          isEdit
        />
        <ToastContainer />
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
  })
};

export default EditQuestion;
