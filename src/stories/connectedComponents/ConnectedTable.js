import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapTableDispatchToProps, mapTableStateToProps } from "../settingFiles/tableSettings";
import DowTable from '../../Components/DowTable/DowTable';
class TableWrapper extends Component {
  // onTableChange = (table) => {
  //   this.props.tableActions.setFilteredRecords(table.filteredData());
  // }
  render() {
    return <DowTable {...this.props.table} {...this.props} onTableChange={this.onTableChange} {...this.props.tableActions} />
  }
}
export default connect(mapTableStateToProps, mapTableDispatchToProps
)(TableWrapper);