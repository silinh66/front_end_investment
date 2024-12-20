/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Avatar, Button, Flex, Input } from 'antd';
import { CommentInputStyled } from './styled';
import { postCommentPostInForum } from '@/services/servicesApi/serviceApi';
import { refreshAPI } from '@/redux/app';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { IForum } from '@/types/postsType';
import { LuSendHorizonal } from 'react-icons/lu';
const { TextArea } = Input;
type CommenInputProps = {
  postId: number;
  forumId: number;
};
const CommentInputPostInForum: React.FC<CommenInputProps> = ({
  postId,
  forumId,
  screenMode,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.app);
  const [value, setValue] = useState('');

  const commentAction = () => {
    postCommentPostInForum(forumId, postId, value).then((res) => {
      if (res && res.status === 200) {
        setValue('');
        dispatch(refreshAPI());
      }
    });
  };

  return (
    <CommentInputStyled screen_mode={screenMode}>
      <Flex gap={20}>
        <div>
          <Avatar
            className="comment-avatar"
            shape="circle"
            size={36}
            src={user?.avatar}
          />
        </div>
        <TextArea
          placeholder="Hãy chia sẻ suy nghĩ của bạn..."
          className="comment-input"
          autoSize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // onPressEnter={(e) => {
          //   if (!e.altKey) {
          //     e.preventDefault();
          //   } else {
          //     e.defaultPrevented;
          //   }
          // }}
        />
        <Button className="comment-button" onClick={commentAction}>
          <LuSendHorizonal />
        </Button>
      </Flex>
    </CommentInputStyled>
  );
};

export default CommentInputPostInForum;
