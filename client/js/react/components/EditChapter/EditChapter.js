import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import ChapterEditor from '../ChapterEditor/ChapterEditor';

const onSave = data =>
  axios.put('/api/chapter', data)
    .then(() => { window.location.href = '/chapters'; })
    .catch(() => toast('Failed to edit', { type: toast.TYPE.ERROR, autoClose: 5000 }));

const onDelete = id =>
  axios.delete(`/api/chapter/${id}`)
    .then(() => { window.location.href = '/chapters'; })
    .catch(() => toast('Failed to delete', { type: toast.TYPE.ERROR, autoClose: 5000 }));

class EditChapter extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <ChapterEditor
          chapter={data}
          onSave={d => onSave(d)}
          onDelete={d => onDelete(d)}
          isEdit
        />
        <ToastContainer />
      </div>
    );
  }
}

EditChapter.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    quote: PropTypes.string,
    prayer: PropTypes.string
  })
};

export default EditChapter;
