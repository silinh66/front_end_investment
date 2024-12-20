/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
// Comments.tsx
import { Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';
import { Comment, IPost } from '@/types/postsType';
import { getCommentsCompany } from '@/services/servicesApi/serviceApi';
import { StyledComments } from './styled';
import CommentItemSkeleton from '../CommentItemSkeleton';

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';

import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';

type CommentsProps = {
  post: IPost;
  open: any; // Đảm bảo kiểu dữ liệu phù hợp
  openNotification: () => void;
};

const Comments: React.FC<CommentsProps> = ({
  post,
  open,
  openNotification,
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const { refresh } = useAppSelector((state: RootState) => state.app);
  const [comments, setComments] = useState<Comment[]>([]);

  const [fetchLoading, setLoading] = useState(false);

  const getListComments = () => {
    setLoading(true);

    if (open.detailPost === true) {
      getCommentsCompany(post.topic_id)
        .then((res) => {
          if (res && res.status === 200) {
            setComments(res.data.comments?.reverse() || []);
            setLoading(false);
          } else {
            setComments([]);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
          setComments([]);
          setLoading(false);
        });
    } else {
      setComments([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListComments();
  }, [refresh, post, open]);

  // Hàm để thêm bình luận mới vào state
  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  // Hàm để cập nhật bình luận hiện có trong state
  const updateComment = (updatedComment: Comment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === updatedComment.comment_id
          ? updatedComment
          : comment
      )
    );
  };

  return (
    <StyledComments screen_mode={screenMode}>
      <div className="root-comment">
        <Flex vertical>
          <Flex
            className="scroll-comment"
            vertical
            gap={0}
            style={{ marginTop: 16 }}
          >
            {fetchLoading ? (
              <CommentItemSkeleton />
            ) : comments?.length === 0 ? (
              <Flex>
                <p className="empty">Chưa có bình luận nào</p>
              </Flex>
            ) : (
              comments?.length > 0 &&
              comments
                ?.filter((comment) => comment.parent_id === null)
                .map((comment) => (
                  <CommentItem
                    post={post}
                    openNotification={openNotification}
                    topicId={post?.topic_id}
                    key={comment.comment_id}
                    comment={comment}
                    comments={comments}
                    screenMode={screenMode}
                    addComment={addComment} // Truyền hàm addComment
                    updateComment={updateComment} // Truyền hàm updateComment
                  />
                ))
            )}
          </Flex>
          <div className="comment-input">
            <CommentInput
              openNotification={openNotification}
              postId={post?.topic_id}
              addComment={addComment} // Truyền hàm addComment
            />
          </div>
        </Flex>
      </div>
    </StyledComments>
  );
};

export default Comments;
