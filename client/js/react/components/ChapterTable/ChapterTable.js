import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const onEditRow = (id) => {
  window.location.href = `/edit-chapter/${id}`;
};

const onQuestionRow = (id) => {
  window.location.href = `/questions/${id}`;
};

class ChapterTable extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Chapter',
            accessor: 'title'
          },
          {
            Header: 'Actions',
            accessor: '_id',
            Cell: ({ value }) =>
              (
                <div>
                  <button
                    className="btn btn-secondary btn-sm mr-10"
                    onClick={() => onEditRow(value)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onQuestionRow(value)}
                  >
                    List of Questions
                  </button>
                </div>
              )
          }
        ]}
        noDataText="No chapter yet!"
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationBottom
      />
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
