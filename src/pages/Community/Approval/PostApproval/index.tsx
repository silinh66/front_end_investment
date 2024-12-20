import { Badge, Button, Flex, Table, Tooltip } from 'antd';
// import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { StyledPostApproval } from './styled';
import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
interface DataType {
  key: string;
  name: string;
  age: number;
  body: string;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Tên người dùng',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    // (text,record)
    render: (text) => <>{text}</>,
  },
  {
    title: 'Tên tên bài',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
    render: (text) => <>{text}</>,
  },
  {
    title: 'Nội dung bài viết',
    dataIndex: 'body',
    key: 'body',
    width: '20%',
    render: (text) => <>{text}</>,
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
    // _, record
    render: () => (
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
    body: 'Tôi nghĩ là bạn nên l...',
    address: 'New York No. 1 Lake Park',
    tags: ['blocked', 'banned', 'online'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    body: 'Tôi nghĩ là bạn nên l...',
    address: 'London No. 1 Lake Park',
    tags: ['blocked', 'offline', 'online'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    body: 'Tôi nghĩ là bạn nên l...',
    address: 'Sydney No. 1 Lake Park',
    tags: ['blocked', 'banned', 'online'],
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    body: 'Tôi nghĩ là bạn nên l...',
    address: 'Sydney No. 1 Lake Park',
    tags: ['blocked', 'banned', 'online'],
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    body: 'Tôi nghĩ là bạn nên l...',
    address: 'Sydney No. 1 Lake Park',
    tags: ['blocked', 'banned', 'online'],
  },
];
const PostApproval = () => {
  const navigate = useNavigate();
  return (
    <StyledPostApproval>
      <h4 className="title">XÉT DUYỆT BÀI VIẾT</h4>
      <Table
        columns={columns}
        dataSource={data}
        // pagination={{ pageSize: 50 }}
        scroll={{ y: 340 }}
        pagination={false}
        onRow={(data) => {
          return {
            onClick: () => {
              navigate(
                `/cong-dong/approval/member-and-post-approval/post/${data.name}`
              );
            },
          };
        }}
      />
    </StyledPostApproval>
  );
};

export default PostApproval;
