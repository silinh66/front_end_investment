import React from 'react';
import { NoticeStyled } from './styled';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
const Notice = ({ message }: { message: string }) => {
  return (
    <NoticeStyled>
      <ExclamationCircleOutlined className="notice-icon" />
      <div className="message">{message}</div>
      <CloseOutlined className="close-icon" />
    </NoticeStyled>
  );
};

export default Notice;
