/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge, Button, Flex, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StyledMemberApproval } from './styled';
import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
// import { updateModalState } from '@/redux/modal';
import ConfirmKickMember from '@/components/modals/ConfirmKickMember';
// import store from '@/redux';
import { useState } from 'react';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const MemberApproval = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableRecord, setTableRecord] = useState({});
  const onCancel = () => {
    setShowModal(false);
  };
  const onOk = () => {
    setShowModal(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text, record) => <>{text}</>,
    },
    {
      title: 'Địa chỉ Email',
      dataIndex: 'age',
      key: 'age',
      width: '25%',
    },

    {
      title: 'Trạng thái',
      key: 'tags',
      width: '15%',
      render: (_, { tags }) => (
        <div className="status-list">
          {tags.map((tag) => {
            let color;
            let text;
            if (tag === 'banned') {
              color = '#CA0';
              text = 'Bị cấm';
            }
            if (tag === 'blocked') {
              color = '#D46B08';
              text = 'Bị chặn';
            }
            if (tag === 'online') {
              color = '#42A732';
              text = 'Online';
            }
            if (tag === 'offline') {
              color = '#42A732';
              text = 'Offline';
            }
            return (
              <Badge
                key={color}
                color={color}
                text={text}
                style={{ color: 'white' }}
              />
            );
          })}
        </div>
      ),
    },
    {
      title: 'Hoạt động',
      key: 'action',
      width: '30%',
      render: (_, record) => (
        <Flex gap={8}>
          <Tooltip
            placement="bottomLeft"
            title={'Chặn người dùng'}
            arrow={true}
            color="#3594EF"
          >
            <Button
              type="primary"
              icon={<MinusCircleOutlined />}
              size={'small'}
              style={{ backgroundColor: '#CA0', borderRadius: 8 }}
            />
          </Tooltip>
          <Tooltip
            placement="topLeft"
            title={'Cấm người dùng'}
            arrow={true}
            color="#3594EF"
          >
            <Button
              type="primary"
              icon={<StopOutlined />}
              size={'small'}
              style={{ backgroundColor: '#D46B08', borderRadius: 8 }}
            />
          </Tooltip>
          <Tooltip
            placement="topLeft"
            title={'Duyệt người dùng'}
            arrow={true}
            color="#3594EF"
          >
            <Button
              type="primary"
              icon={<CheckOutlined />}
              size={'small'}
              style={{ backgroundColor: '#42A732', borderRadius: 8 }}
            />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={'Kick người dùng'}
            arrow={true}
            color="#3594EF"
          >
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => {
                setShowModal(true);
              }}
              size={'small'}
              style={{ backgroundColor: '#E43637', borderRadius: 8 }}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['blocked', 'offline', 'online'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '8',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '9',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
    {
      key: '10',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['blocked', 'banned', 'online'],
    },
  ];
  return (
    <StyledMemberApproval>
      <h4 className="title">XÉT DUYỆT THÀNH VIÊN</h4>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 340 }}
        onRow={(record) => {
          return {
            onClick: () => {
              setTableRecord(record);
            },
          };
        }}
      />
      <ConfirmKickMember
        record={tableRecord}
        isOpen={showModal}
        onCancel={onCancel}
        onOk={onOk}
      />
    </StyledMemberApproval>
  );
};

export default MemberApproval;
