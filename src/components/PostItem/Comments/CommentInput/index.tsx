/* eslint-disable no-console */
// CommentInput.tsx
import React, { useState } from 'react';
import { Avatar, Flex, Input } from 'antd';
import { CommentInputStyled } from './styled';

import { postCommentCompany } from '@/services/servicesApi/serviceApi';

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { Comment } from '@/types/postsType';

const { TextArea } = Input;

type CommentInputProps = {
  postId: number;
  openNotification: () => void;
  addComment: (newComment: Comment) => void; // Hàm để thêm bình luận mới
  updateComment: (updatedComment: Comment) => void; // Hàm để cập nhật bình luận hiện có
};

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  openNotification,
  addComment,
  updateComment,
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);

  const { user } = useAppSelector((state: RootState) => state.app);
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentAction = async () => {
    if (!value.trim()) {
      console.log('Nội dung bình luận trống.');
      return; // Kiểm tra nội dung không rỗng
    }

    if (!user) {
      openNotification();
      return; // Kiểm tra người dùng đã đăng nhập
    }

    if (isSubmitting) {
      console.log('Đang gửi bình luận...');
      return; // Nếu đang gửi thì không làm gì
    }

    setIsSubmitting(true); // Đặt trạng thái là đang gửi

    // Tạo một bình luận tạm thời với ID tạm thời
    const tempComment: Comment = {
      comment_id: `temp-${Date.now()}`, // ID tạm thời
      topic_id: postId,
      userId: user.userID,
      content: value,
      created_at: new Date().toISOString(),
      parent_id: null, // Bình luận gốc
      name: user.name,
      avatar: user.avatar,
      like_count: 0,
      liked_by: [],
    };

    try {
      addComment(tempComment);
      const res = await postCommentCompany(postId, value);
      if (res && res.status === 200) {
        const newComment: Comment = res.data;
        setValue('');
        updateComment({
          ...tempComment,
          comment_id: newComment.comment_id,
          created_at: newComment.created_at,
        });
      } else {
        console.error('Failed to post comment. Phản hồi không hợp lệ.');
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      updateComment({
        ...tempComment,
        content: 'Bình luận không được gửi. Vui lòng thử lại.',
      });
      openNotification();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommentInputStyled screen_mode={screenMode}>
      <Flex gap={8}>
        <div>
          <Avatar
            className="comment-avatar"
            shape="circle"
            size={36}
            src={user?.avatar}
          />
        </div>
        <div style={{ position: 'relative', width: '612px' }}>
          <TextArea
            placeholder="Hãy chia sẻ suy nghĩ của bạn..."
            className="input"
            autoSize
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                commentAction();
              }
            }}
          ></TextArea>
          <div
            className="comment-button"
            onClick={commentAction}
            style={{ cursor: 'pointer' }} // Thêm con trỏ để chỉ ra đây là nút có thể nhấp
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.7422 0.757822C1.62674 0.709284 1.49935 0.696558 1.37657 0.721294C1.25378 0.746031 1.14126 0.807088 1.0536 0.896548C0.965936 0.986008 0.907173 1.09974 0.884933 1.223C0.862692 1.34627 0.877999 1.47337 0.928869 1.58782L3.50637 7.37532H9.83304C9.9988 7.37532 10.1578 7.44117 10.275 7.55838C10.3922 7.67559 10.458 7.83456 10.458 8.00032C10.458 8.16608 10.3922 8.32505 10.275 8.44226C10.1578 8.55947 9.9988 8.62532 9.83304 8.62532H3.50637L0.928869 14.4128C0.877999 14.5273 0.862692 14.6544 0.884933 14.7776C0.907173 14.9009 0.965936 15.0146 1.0536 15.1041C1.14126 15.1936 1.25378 15.2546 1.37657 15.2793C1.49935 15.3041 1.62674 15.2914 1.7422 15.2428L17.5755 8.57616C17.6888 8.52837 17.7854 8.44826 17.8534 8.34584C17.9213 8.24342 17.9576 8.12323 17.9576 8.00032C17.9576 7.87741 17.9213 7.75723 17.8534 7.65481C17.7854 7.55239 17.6888 7.47227 17.5755 7.42449L1.7422 0.757822Z"
                fill={screenMode === 'dark' ? '#818498' : '#747B8B'}
              />
            </svg>
          </div>
        </div>
      </Flex>
    </CommentInputStyled>
  );
};

export default CommentInput;
