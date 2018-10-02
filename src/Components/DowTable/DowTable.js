import React, { Component } from 'react';
import { debounce, chain, orderBy, isEmpty } from 'lodash';
import { Table, Input, Row, Col, List } from 'antd';
import DowButton from './DowTableButton';

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
      sorter: {},
      filteredInfo: null
    }
    this.searchColumn = debounce(this.searchColumn, 600);
  }
  componentWillReceiveProps = (nextProps) => {
    const { setFilteredRecords } = this.props;
    if (nextProps.dataSource.length > 0 && this.fullFilter(nextProps.dataSource).length === 0) this.setState({ searchFilters: [], searchText: '', filteredInfo: null }, () =>
      setFilteredRecords && setFilteredRecords([])
    )
    // if (!isEqual(this.props.dataSource, nextProps.dataSource))
    //   this.setState({ searchFilters: [], searchText: '', filteredInfo: null }, () =>
    //     setFilteredRecords && setFilteredRecords([])
    //   )
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
  makeColumnsFilterable = (columns, dataSource) => {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    if (columns.length > 0 && columns[0].filter) return columns;
    const filteredColumns = columns.map((column, index) => {
      const { title, ...noTitleColumn } = column;
      const columnFilter = chain(this.fullFilter(this.props.dataSource))
        .map(item => item[column.dataIndex])
        .uniq()
        .value();
      const searchFilter = this.state.searchFilters.find(item => item && item.id === column.dataIndex);
      const subFilter = searchFilter ?
        columnFilter
          .filter(item => item && item.toString().includes(searchFilter.searchValue)) :
        columnFilter.slice(0, 25);
      return {
        filters:
          columnFilter.length < 100 ?
            orderBy(columnFilter.map(item => ({
              text: item || 'Blank',
              value: item || 'BLANK'
            })), 'text')
            : orderBy(subFilter
              .map(item => ({
                text: item || 'Blank',
                value: item || 'BLANK'
              })), 'text'),
        filteredValue: filteredInfo[column.dataIndex] || null,
        onFilter: (value, record) => {
          /* eslint-disable */
          return value === 'BLANK' ?
            (record[column.dataIndex] || '').length === 0 :
            record[column.dataIndex] == value;
          /* eslint-enable */
        },
        title: (<span
          style={{
            textAlign: 'center',
            color: filteredInfo[column.dataIndex] && filteredInfo[column.dataIndex].length > 0 ? 'blue' : ''
          }}
          key={`${column.dataIndex}headerColumn`}>
          {column.title}
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            id={column.dataIndex}
            value={this.state.searchText[column.dataIndex]}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
        </span>),
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a[column.dataIndex] - b[column.dataIndex],
        onFilterDropdownVisibleChange: (visible, ) => {
          setTimeout(() => this.searchInput && this.searchInput.focus(), 50);
        },
        ...noTitleColumn,
      }
    });

    //Dianne
    if (dataSource.length !== 0)
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
  filteredInfoObject = () => {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const newFilters = {};
    Object.keys(filteredInfo).forEach(key => {
      if (filteredInfo[key] && filteredInfo[key].length > 0) newFilters[key] = filteredInfo[key]
    });
    return newFilters
  }
  defaultFilterData = (tableData) => {
    if (!tableData) tableData = this.fullFilter(this.props.dataSource);
    let tmpData = tableData.slice(0)
    const newFilters = this.filteredInfoObject();
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
    console.log(this.props, 'DowTable.js Line-162')
    const filters = this.filteredInfoObject();
    if (setFilteredRecords) {
      if (this.state.searchFilters.length === 0 && isEmpty(filters)) {
        setFilteredRecords([]);
      } else {
        setFilteredRecords(this.fullFilter(dataSource));
      }

    }
    this.props.onTableChange && this.props.onTableChange(this)
  };
  tableChanged = (pagination, filters, sorter) => {
    this.setState({ pagination, filteredInfo: filters, sorter }, this.onTableChange);
  }
  render() {
    const { columns, buttons, dataSource, pagination, actions } = this.props;

    /*  const colNew = [];
     for (let i = 0; i < columns.length - 4; i++) {
       colNew.push({
         title: columns[i].title,
         dataIndex: columns[i].dataIndex,
         render: columns[i].render,
 
       });
     } */

    /*  const listData = [];
     for (let i = 0; i < dataSource.length; i++) {
       listData.push({
         href: 'http://ant.design',
         title: dataSource[i].id,
         date: dataSource[i].CreatedDate,
         description: dataSource[i].KTEXT,
         dueDate: dataSource[i].DueDate,
         equipmentNum: dataSource[i].EQUNR,
         PMO: dataSource[i].AUFNR,
         fLoc: dataSource[i].TPLNR
 
       });
     } */

    //Dianne
    const tmpColumns = this.makeColumnsFilterable(columns, dataSource);

    const tableData = this.fullFilter(dataSource);

    const tmpPagination = pagination ||
      {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50', '100', tableData.length > 700 ? '700' : tableData.length.toString()]
      };

    return (
      <div>
        {this.props.tableHeader && <Row style={{ textAlign: 'center' }}><h3>{this.props.tableHeader}</h3></Row>}
        {buttons && buttons.map((button) =>
          <DowButton {...button} key={`tableButton${button.name}`} onButtonClick={this.onButtonClick} />
        )}

        <Row>

          <Col xs={0} md={24}>
            <Table
              {...this.props}
              onChange={this.tableChanged}
              dataSource={tableData}
              columns={tmpColumns}
              rowKey="id"
              pagination={tmpPagination}
            // size={tmpColumns.length > 6 ? 'small' : 'middle'}
            />
          </Col>

          <Col sm={24} md={0}>
            <List
              dataSource={tableData}
              renderItem={(item, index) => (
                <List.Item
                  key={`${index}tblList`}
                  actions={actions && actions(item)}
                >
                  <List.Item.Meta
                    title={item.PMO}
                    description={columns.map((column, index) => <div key={`${index}listColumn`}>{item[column.dataIndex]}</div>)}
                  />

                </List.Item>
              )}
            //size={tmpColumns.length < 6 ? 'small' : 'middle'}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DowTable;