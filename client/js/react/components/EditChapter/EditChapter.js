import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ChapterEditor from '../ChapterEditor/ChapterEditor';

import ToastFactory from '../../../factories/toast.factory';

const onSave = data =>
  axios.put('/api/chapter', data)
    .then(() => { window.location.href = '/chapters'; })
    .catch(() => ToastFactory.warn('Failed to edit'));

const onDelete = id =>
  axios.delete(`/api/chapter/${id}`)
    .then(() => { window.location.href = '/chapters'; })
    .catch(() => ToastFactory.warn('Failed to edit'));

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
