import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import ToastFactory from '../../../factories/toast.factory';


const columns = [{
  dataField: 'content',
  text: 'Question List',
  align: 'left',
  headerFormatter: column => <h1>{column.text}</h1>
}];

class QuestionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedRow: '' };

    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onSelect(row) {
    this.setState({
      selectedRow: row._id
    });
  }

  onEdit() {
    const { selectedRow } = this.state;

    if (selectedRow) {
      window.location.href = `/edit-question/${selectedRow}`;
    }
  }

  onDelete() {
    const { selectedRow } = this.state;

    if (selectedRow) {
      return axios.delete(`/api/question/${selectedRow}`)
        .then(() => { window.location.reload(true); })
        .catch(() => ToastFactory.warn('Failed to delete'));
    }

    return null;
  }

  selectRow() {
    return {
      mode: 'radio',
      clickToSelect: true,
      style: { backgroundColor: '#E3E5DF' },
      onSelect: this.onSelect,
      hideSelectColumn: true
    };
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <BootstrapTable
          keyField="_id"
          data={data}
          columns={columns}
          selectRow={this.selectRow()}
          pagination={paginationFactory()}
          bordered={false}
          noDataIndication="No Question"
        />
        <div className="row mt-40">
          <div className="col-12" style={{ display: 'flex' }}>
            <button
              className="btn btn-warning mr-10"
              disabled={this.state.selectedRow === ''}
              onClick={this.onEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mr-10"
              disabled={this.state.selectedRow === ''}
              onClick={this.onDelete}
            >
              Delete
            </button>
            <a
              className="btn btn-primary"
              style={{ marginLeft: 'auto' }}
              href="/new-question"
            >
              Add New Question
            </a>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

QuestionTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    result: PropTypes.number
  })).isRequired
};

export default QuestionTable;
