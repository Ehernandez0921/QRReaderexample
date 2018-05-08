import React, { Component } from 'react';
import _ from 'lodash';
import { Table, Input, Button } from 'antd';
class DowTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      searchText: '',
      searchFilters: [],
    }
    this.searchColumn = _.debounce(this.searchColumn, 300);
  }
  searchColumn = (searchValue, id) => {
    const searchFilters = this.state.searchFilters.filter(item => item.id !== id);
    searchValue !== '' && searchFilters.push({ id: id, searchValue: searchValue });
    this.setState({ searchFilters });
  }
  onInputChange = (e) => {
    const searchValue = e.target.value;
    const dataIndex = e.target.id;
    this.searchColumn(searchValue, dataIndex)
    this.setState({ searchText: searchValue });
  }
  makeColumnsFilterable = (columns) => {
    if (columns.length > 0 && columns[0].filter) return columns;
    const filteredColumns = columns.map((column, index) => {
      const tmpColumn = column;
      const columnFilter = _.chain(this.props.dataSource)
        .map(item => item[column.dataIndex])
        .uniq()
        .value();

      return {
        ...column,
        filters: columnFilter.length < 100 ?
          columnFilter.map(item => ({ text: item || 'Blank', value: item || 'BLANK' })) : undefined,
        onFilter: (value, record) => value === 'BLANK' ?
          (record[column.dataIndex] || '').length === 0 :
          record[column.dataIndex] == value,
        filterDropdown: columnFilter.length > 100 ? (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Search name"
              id={column.dataIndex}
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
          </div>
        ) : undefined,
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a[column.dataIndex] - b[column.dataIndex],
        onFilterDropdownVisibleChange: (visible, ) => {
          setTimeout(() => this.searchInput && this.searchInput.focus(), 50);
        }
      }
    });
    return filteredColumns
  }
  filteredTable = data => {
    if (this.state.searchFilters.length === 0) return data;
    const tmpData = [];
    this.state.searchFilters.forEach(filter => {
      tmpData.push(
        ...data.filter(record =>
          record[filter.id].toString().indexOf(filter.searchValue) > -1
        )
      )
    }
    )
    return tmpData;
  }
  render() {
    const tmpColumns = this.makeColumnsFilterable(this.props.columns);
    const tableData = this.filteredTable(this.props.dataSource);
    const pagination = this.props.pagination ||
      {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50', '100', tableData.length.toString()]
      }
    console.log(tmpColumns, 'DowTable.js 87 ');
    return (
      <Table {...this.props} dataSource={tableData} columns={tmpColumns} rowKey="id" pagination={pagination} size={tmpColumns.length > 6 ? 'small' : 'middle'} />
    );
  }
}

export default DowTable;