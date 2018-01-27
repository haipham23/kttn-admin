import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import ToastFactory from '../../../factories/toast.factory';

const columns = [{
  dataField: 'title',
  text: 'Chapter List',
  align: 'left',
  headerFormatter: column => <h1>{column.text}</h1>
}];

class ChapterTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedRow: '' };

    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onQuestion = this.onQuestion.bind(this);
  }

  onSelect(row) {
    this.setState({
      selectedRow: row._id
    });
  }

  onEdit() {
    const { selectedRow } = this.state;

    if (selectedRow) {
      window.location.href = `/edit-chapter/${selectedRow}`;
    }
  }

  onDelete() {
    const { selectedRow } = this.state;

    if (selectedRow) {
      return axios.delete(`/api/chapter/${selectedRow}`)
        .then(() => { window.location.reload(true); })
        .catch(() => ToastFactory.warn('Failed to delete'));
    }

    return null;
  }

  onQuestion() {
    const { selectedRow } = this.state;

    if (selectedRow) {
      window.location.href = `/questions/${selectedRow}`;
    }
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
          noDataIndication="No Chapter"
        />
        <div className="row">
          <div className="col-md-6 mt-40" style={{ display: 'flex' }}>
            <button
              className="btn btn-warning mr-10"
              disabled={this.state.selectedRow === ''}
              onClick={this.onEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              disabled={this.state.selectedRow === ''}
              onClick={this.onDelete}
            >
              Delete
            </button>
          </div>
          <div className="col-md-6 mt-40" style={{ display: 'flex' }}>
            <a
              className="btn btn-primary"
              style={{ marginLeft: 'auto' }}
              href="/new-chapter"
            >
              Add New Chapter
            </a>
            <button
              className="btn btn-primary ml-10"
              disabled={this.state.selectedRow === ''}
              onClick={this.onQuestion}
            >
              Manage Questions
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

ChapterTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    quote: PropTypes.string,
    prayer: PropTypes.string
  })).isRequired
};

export default ChapterTable;
