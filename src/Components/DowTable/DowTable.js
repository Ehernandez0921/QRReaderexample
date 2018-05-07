import React, { Component } from 'react';
import { Table } from 'antd';
class DowTable extends Component {
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.dataSource, 'DowTable.js 5 ');
  }
  makeColumnsFilterable = (columns) => {
    if (columns[0].filter) return columns;
    let filterecColumns = columns.map((column, index) => {
      console.log(column, index, 'DowTable.js 10 ');
      return column;
    })
    console.log(columns, 'DowTable.js 8 ');
    return filterecColumns;
  }
  render() {
    let filterableColumns = this.makeColumnsFilterable(this.props.columns)
    return (
      <Table {...this.props} columns={filterableColumns} rowKey="id" />
    );
  }
}

export default DowTable;