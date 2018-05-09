import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  mapTableDispatchToProps,
  mapTableStateToProps,
  columns,
  tableButtons
} from "../settingFiles/tableSettings";
import DowTable from '../../Components/DowTable/DowTable';
class TableWrapper extends Component {
  // onTableChange = (table) => {
  //   this.props.tableActions.setFilteredRecords(table.filteredData());
  // }
  constructor(props) {
    super(props);
    this.tableButtons = tableButtons.bind(this);
  }
  render() {
    return <DowTable {...this.props.table} {...this.props} onTableChange={this.onTableChange} {...this.props.tableActions} buttons={this.tableButtons()} />
  }
}
export default connect(mapTableStateToProps, mapTableDispatchToProps
)(TableWrapper);