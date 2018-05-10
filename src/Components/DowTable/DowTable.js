import React, { Component } from 'react';
import { debounce, chain, } from 'lodash';
import { Table, Input, Row, Col } from 'antd';
import DowButton from './DowTableButton'
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };
class DowTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      searchText: '',
      searchFilters: [],
      pagination: {},
      filters: {},
      sorter: {}
    }
    this.searchColumn = debounce(this.searchColumn, 300);
  }
  onButtonClick = (buttonEvent, button) => button.onClick && button.onClick(buttonEvent, this);

  searchColumn = (searchValue, id) => {
    const searchFilters = this.state.searchFilters.filter(item => item.id !== id);
    searchValue !== '' && searchFilters.push({ id: id, searchValue: searchValue });
    this.setState({ searchFilters }, this.onTableChange);
  }
  onInputChange = (e) => {
    const searchValue = e.target.value;
    const dataIndex = e.target.id;
    this.searchColumn(searchValue, dataIndex)
    this.setState({ searchText: { ...this.state.searchText, [dataIndex]: searchValue } });
  }
  makeColumnsFilterable = (columns) => {
    if (columns.length > 0 && columns[0].filter) return columns;
    const filteredColumns = columns.map((column, index) => {
      // const tmpColumn = column;
      const columnFilter = chain(this.fullFilter(this.props.dataSource))
        .map(item => item[column.dataIndex])
        .uniq()
        .value();

      return {
        ...column,
        filters: columnFilter.length < 100 ?
          columnFilter.map(item => ({
            text: item || 'Blank',
            value: item || 'BLANK'
          }))
          : undefined,
        onFilter: (value, record) => {
          /* eslint-disable */
          return value === 'BLANK' ?
            (record[column.dataIndex] || '').length === 0 :
            record[column.dataIndex] == value;
          /* eslint-enable */
        },
        title: <div style={{ textAlign: 'center' }} key={`${column.dataIndex}headerColumn`}>
          {column.title}
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            id={column.dataIndex}
            value={this.state.searchText[column.dataIndex]}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          /></div>,
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a[column.dataIndex] - b[column.dataIndex],
        onFilterDropdownVisibleChange: (visible, ) => {
          setTimeout(() => this.searchInput && this.searchInput.focus(), 50);
        }
      }
    });
    return filteredColumns
  }
  fullFilter = (data) => {
    const tmpData = this.searchFilterData(data);
    const filteredData = this.defaultFilterData(tmpData);
    return filteredData;
  }
  nestedFilter = (tmpArray, filter) => {
    return tmpArray.filter(filter);
  }
  searchFilterData = data => {
    if (this.state.searchFilters.length === 0) return data.map(item => item);
    let tmpArray = data.slice(0);
    this.state.searchFilters.forEach(filter => {
      return tmpArray = this.nestedFilter(
        tmpArray,
        (record) => record[filter.id] && record[filter.id].toString().includes(filter.searchValue)
      )
    });
    return tmpArray;
  }
  defaultFilterData = (tableData) => {
    if (!tableData) tableData = this.fullFilter(this.props.dataSource);
    let tmpData = tableData.slice(0)
    const { filters } = this.state;
    const newFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) newFilters[key] = filters[key]
    });
    const keys = Object.keys(newFilters);
    if (keys.length === 0) return tableData.map(item => item);
    keys.forEach(key => {
      return tmpData = this.nestedFilter(
        tmpData,
        data =>
          newFilters[key].includes(data[key] && data[key].toString()) ||
          (newFilters[key].includes('BLANK') && !data[key])
      )
    });
    return tmpData;
  }
  onTableChange = () => {
    const { setFilteredRecords, dataSource } = this.props;
    setFilteredRecords && setFilteredRecords(this.fullFilter(dataSource))
    this.props.onTableChange && this.props.onTableChange(this)
  };
  tableChanged = (pagination, filters, sorter) => {
    this.setState({ pagination, filters, sorter }, this.onTableChange);
  }
  render() {
    const { columns, buttons, dataSource, pagination } = this.props;
    const tmpColumns = this.makeColumnsFilterable(columns);
    const tableData = this.fullFilter(dataSource);
    const tmpPagination = pagination ||
      {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50', '100', tableData.length.toString()]
      }
    return (
      <div>
        {buttons && buttons.map((button) =>
          <DowButton {...button} key={`tableButton${button.name}`} onButtonClick={this.onButtonClick} />
        )}
        <Row>
          <Col sm={0} md={24}>
            <Table
              {...this.props}
              onChange={this.tableChanged}
              dataSource={tableData}
              columns={tmpColumns}
              rowKey="id"
              pagination={tmpPagination}
              size={tmpColumns.length > 6 ? 'small' : 'middle'}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DowTable;