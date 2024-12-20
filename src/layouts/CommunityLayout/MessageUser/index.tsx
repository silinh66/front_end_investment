import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Flex } from 'antd';
import React from 'react';
import { MessageUserStyled } from './styled';

const MessageUser = () => {
  return (
    <MessageUserStyled>
      <Flex align="end" vertical gap={20}>
        {' '}
        <Badge count={1} className="user-badge">
          <Avatar
            shape="circle"
            style={{}}
            icon={<UserOutlined />}
            size={46}
            src="https://image.shutterstock.com/image-photo/portrait-smiling-mature-man-standing-260nw-2137527991.jpg"
          />
        </Badge>
        <Badge count={1} className="user-badge">
          <Avatar
            shape="circle"
            style={{}}
            icon={<UserOutlined />}
            size={46}
            src="https://image.shutterstock.com/image-photo/portrait-smiling-mature-man-standing-260nw-2137527991.jpg"
          />
        </Badge>
        <Badge count={1} className="user-badge">
          <Avatar
            shape="circle"
            style={{}}
            icon={<UserOutlined />}
            size={46}
            src="https://image.shutterstock.com/image-photo/portrait-smiling-mature-man-standing-260nw-2137527991.jpg"
          />
        </Badge>
        <div className="badge-rest">
          <Badge>
            <Avatar
              shape="circle"
              style={{}}
              icon={<UserOutlined />}
              size={46}
              src="https://image.shutterstock.com/image-photo/portrait-smiling-mature-man-standing-260nw-2137527991.jpg"
            />
          </Badge>
          <span className="overlay">+10</span>
          <div className="restUser-pop">
            <div className="restUser-pop__title">Danh sách nhắn tin</div>
            <div className="restUser-pop__body">
              <div>Nhóm A (99+)</div>
              <div>Nguyễn Văn A (10)</div>
              <div>Nguyễn Văn A (5)</div>
            </div>
          </div>
        </div>
      </Flex>
    </MessageUserStyled>
  );
};

export default MessageUser;
