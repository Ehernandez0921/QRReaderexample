import React, { Component } from 'react';
import { Table } from 'antd';
class DowTable extends Component {
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.dataSource, 'DowTable.js 5 ');
  }
  render() {
    return (
      <Table {...this.props} />
    );
  }
}

export default DowTable;