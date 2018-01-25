import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const onRowClick = (state, rowInfo) => ({
  onClick: () => {
    window.location.href = `/edit-question/${rowInfo.original._id}`;
  }
});

class QuestionTable extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Question',
            accessor: 'content'
          }
        ]}
        noDataText="No question yet!"
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationBottom
        getTrProps={onRowClick}
      />
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
