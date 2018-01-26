import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const onRowClick = (state, rowInfo) => ({
  onClick: () => {
    window.location.href = `/edit-chapter/${rowInfo.original._id}`;
  }
});

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
          }
        ]}
        noDataText="No chapter yet!"
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationBottom
        getTrProps={onRowClick}
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
