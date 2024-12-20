/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Avatar, Button, Flex, Input } from 'antd';
import { CommentInputStyled } from './styled';
import { IUser } from '@/types/postsType';

const { TextArea } = Input;
type CommentInputProps = {
  commentText?: string;
  setCommentText?: (value: string) => void;
  user?: IUser;
  createLoading?: boolean;
  onCreateComment?: (commentText: string) => void;
};
const CreateMessage: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment,
}) => {
  return (
    <CommentInputStyled>
      <Flex gap={20}>
        <div>
          {JSON.stringify(user)}
          <Avatar
            className="comment-avatar"
            shape="circle"
            size={36}
            src={user?.avatar}
          />
        </div>
        <TextArea
          placeholder="Hãy chia sẻ những gì bạn đang nghĩ..."
          className="comment-input"
          autoSize
        />
        <Button className="comment-button">Tạo bài viết</Button>
      </Flex>
    </CommentInputStyled>
  );
};

export default CreateMessage;
