import React from 'react';
import { StyleTableComponent } from './TableComponentStyle';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { Table } from 'antd';

const TableComponent = () => {
  const screenMode = useSelector(screenModeSelector);
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'type_code',
      key: 'type_code',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
  ];
  return (
    <StyleTableComponent screen_mode={screenMode}>
      <Table
        width="100%"
        columns={columns}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        sticky={true}
      />
    </StyleTableComponent>
  );
};

export default TableComponent;
