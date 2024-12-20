/* eslint-disable no-console */
// CommentItem.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import {
  CommenItemHeadStyled,
  CommentItemActionsStyled,
  CommentItemStyled,
} from './styled';
import { Avatar, Button, Flex } from 'antd';
import { Comment } from '@/types/postsType';
import { getTimeDifference } from '@/utils/helper';
import {
  likeComment,
  unLikeComment,
  repCommentCompany,
} from '@/services/servicesApi/serviceApi';
import TextArea from 'antd/es/input/TextArea';
import { LuSendHorizonal } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';

type UserType = {
  userID: string;
  name: string;
  avatar: string;
  // Thêm các trường khác nếu cần
};

type CommentItemProps = {
  comment: Comment;
  comments: Comment[];
  screenMode: string;
  openNotification: () => void;
  topicId: string;
  key: string;
  addComment: (newComment: Comment) => void;
  updateComment: (updatedComment: Comment) => void;
};

type CommentItemChildProps = {
  comment: Comment;
  user: UserType; // Thay thế bằng kiểu dữ liệu thực tế
  level: number;
  comments: Comment[];
  addComment: (newComment: Comment) => void;
  updateComment: (updatedComment: Comment) => void;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  comments,
  screenMode,
  openNotification,
  topicId,
  key,
  addComment,
  updateComment,
}) => {
  const [openRepCmt, setOpenRepCmt] = useState<string | null>(null);
  const [textRepCmt, setTextRepCmt] = useState('');
  const { user } = useAppSelector((state: RootState) => state.app);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quản lý trạng thái like cục bộ
  const [isLiked, setIsLiked] = useState<boolean>(
    Array.isArray(comment?.liked_by) &&
      comment.liked_by.some((like) => like.userId === user?.userID)
  );
  const [likeCount, setLikeCount] = useState<number>(comment.like_count);

  const likeAction = async () => {
    if (!user) {
      openNotification();
      return;
    }

    // Lưu lại trạng thái hiện tại để phục hồi nếu cần
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    // Optimistic update: cập nhật UI ngay lập tức
    setIsLiked(!previousIsLiked);
    setLikeCount((prev) => prev + (previousIsLiked ? -1 : 1));

    try {
      if (previousIsLiked) {
        await unLikeComment(topicId, comment.comment_id);
      } else {
        await likeComment(topicId, comment.comment_id);
      }

      // Nếu cần, cập nhật lại comment với dữ liệu mới từ backend
      // Ví dụ: const updatedComment = res.data;
      // updateComment(updatedComment);
    } catch (error) {
      console.error('Error updating like status:', error);
      // Phục hồi lại trạng thái cũ nếu có lỗi
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      // Có thể thêm thông báo lỗi cho người dùng tại đây
    }
  };

  const submitRepComment = async () => {
    if (!user) {
      openNotification();
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Tạo một bình luận mới với trạng thái tạm thời
      const tempComment: Comment = {
        comment_id: `temp-${Date.now()}`, // Sử dụng ID tạm thời
        topic_id: topicId, // Đảm bảo `topicId` được truyền từ component cha
        userId: user.userID,
        content: textRepCmt,
        created_at: new Date().toISOString(),
        parent_id: comment.comment_id,
        name: user.name,
        avatar: user.avatar,
        like_count: 0,
        liked_by: [],
      };

      // Thêm bình luận tạm thời vào UI
      addComment(tempComment);
      console.log('Thêm bình luận tạm thời:', tempComment);

      // Gọi API để gửi bình luận
      const res = await repCommentCompany(
        topicId,
        textRepCmt,
        comment.comment_id
      );
      console.log('Phản hồi từ API:', res);

      if (res.status === 200) {
        const newComment: Comment = res.data; // Giả sử API trả về bình luận mới
        console.log('Bình luận mới từ server:', newComment);

        // Cập nhật bình luận tạm thời với dữ liệu thực từ server
        updateComment({
          ...tempComment,
          comment_id: newComment.comment_id, // Cập nhật ID thực
          created_at: newComment.created_at, // Cập nhật thời gian thực
        });

        // Reset giá trị input
        setOpenRepCmt(null);
        setTextRepCmt('');
        console.log('Bình luận phản hồi đã được gửi và ô input đã được reset.');
      } else {
        throw new Error('Failed to post reply comment');
      }
    } catch (error) {
      console.error('Error submitting reply comment:', error);

      // Xóa bình luận tạm thời nếu có lỗi bằng cách lọc dựa trên tempComment.comment_id
      updateComment({
        ...tempComment,
        content: 'Bình luận không được gửi. Vui lòng thử lại.',
      });

      // Hoặc nếu bạn muốn loại bỏ bình luận hoàn toàn, hãy sử dụng hàm sau:
      // updateComment(() => comments.filter(c => c.comment_id !== tempComment.comment_id));

      // Thông báo lỗi cho người dùng
      openNotification();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm lọc bình luận đến cấp 3
  const getCommentsFromLevel = (comments: Comment[], level: number) => {
    const commentsFromLevel: Comment[] = [];

    const getChildComments = (parentId: string, currentLevel: number) => {
      const childComments = comments.filter((c) => c.parent_id === parentId);

      if (currentLevel <= level) {
        commentsFromLevel.push(...childComments);
      }

      if (currentLevel < level) {
        childComments.forEach((childComment) =>
          getChildComments(childComment.comment_id, currentLevel + 1)
        );
      }
    };

    getChildComments(comment.comment_id, 1);

    return commentsFromLevel;
  };

  const CommentItemHead = () => (
    <CommenItemHeadStyled screen_mode={screenMode}>
      <Flex justify="space-between">
        <Flex gap={10}>
          <img src={comment.avatar} className="head-avatar" alt="avatar" />
          <div className="head-detail">
            <div className="box-cmt">
              <p className="head-username">{comment.name}</p>
              <div
                style={{
                  color: screenMode === 'dark' ? '#fff' : '#000',
                  fontSize: '14px',
                }}
              >
                {comment?.content}
              </div>
            </div>
          </div>
        </Flex>
      </Flex>
    </CommenItemHeadStyled>
  );

  const CommentItemActions = () => {
    return (
      <CommentItemActionsStyled>
        <Flex align="center" gap={18}>
          <div className="head-created">
            {getTimeDifference(comment?.created_at)}
          </div>
          <Button
            style={{ color: isLiked ? '#99BAFF' : '' }}
            type="link"
            className="action-button"
            onClick={likeAction}
          >
            Thích ({likeCount})
          </Button>
          <div className="comment-area">
            <Button
              type="link"
              className="action-button"
              onClick={() => {
                if (user) {
                  setOpenRepCmt(comment.comment_id);
                } else {
                  openNotification();
                }
              }}
            >
              Phản hồi
            </Button>
          </div>
        </Flex>
      </CommentItemActionsStyled>
    );
  };

  const CommentItemChild: React.FC<CommentItemChildProps> = ({
    comment,
    user,
    level,
    comments,
    addComment,
    updateComment,
  }) => {
    const [isSubmittingChild, setIsSubmittingChild] = useState(false);
    const [openRepChild, setOpenRepChild] = useState<string | null>(null);
    const [textRepChild, setTextRepChild] = useState('');

    // Quản lý trạng thái like cục bộ cho bình luận con
    const [isLiked, setIsLiked] = useState<boolean>(
      Array.isArray(comment?.liked_by) &&
        comment.liked_by.some((like) => like.userId === user.userID)
    );
    const [likeCount, setLikeCount] = useState<number>(comment.like_count);

    const likeActionChild = async () => {
      if (!user) {
        openNotification();
        return;
      }

      // Lưu lại trạng thái hiện tại để phục hồi nếu cần
      const previousIsLiked = isLiked;
      const previousLikeCount = likeCount;

      // Optimistic update: cập nhật UI ngay lập tức
      setIsLiked(!previousIsLiked);
      setLikeCount((prev) => prev + (previousIsLiked ? -1 : 1));

      try {
        if (previousIsLiked) {
          await unLikeComment(topicId, comment.comment_id);
        } else {
          await likeComment(topicId, comment.comment_id);
        }

        // Nếu cần, cập nhật lại comment với dữ liệu mới từ backend
        // Ví dụ: const updatedComment = res.data;
        // updateComment(updatedComment);
      } catch (error) {
        console.error('Error updating like status (child):', error);
        // Phục hồi lại trạng thái cũ nếu có lỗi
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);
        // Có thể thêm thông báo lỗi cho người dùng tại đây
      }
    };

    const submitRepCommentChild = async () => {
      if (!user) {
        openNotification();
        return;
      }

      if (isSubmittingChild) return;

      try {
        setIsSubmittingChild(true);

        // Tạo một bình luận mới với trạng thái tạm thời
        const tempComment: Comment = {
          comment_id: `temp-${Date.now()}`, // Sử dụng ID tạm thời
          topic_id: comment.topic_id,
          userId: user.userID,
          content: textRepChild,
          created_at: new Date().toISOString(),
          parent_id: comment.comment_id,
          name: user.name,
          avatar: user.avatar,
          like_count: 0,
          liked_by: [],
        };

        // Thêm bình luận tạm thời vào UI
        addComment(tempComment);
        console.log('Thêm bình luận tạm thời (child):', tempComment);

        // Gọi API để gửi bình luận
        const res = await repCommentCompany(
          comment.topic_id,
          textRepChild,
          comment.comment_id
        );
        console.log('Phản hồi từ API (child):', res);

        if (res.status === 200) {
          const newComment: Comment = res.data; // Giả sử API trả về bình luận mới
          console.log('Bình luận mới từ server (child):', newComment);

          // Cập nhật bình luận tạm thời với dữ liệu thực từ server
          updateComment({
            ...tempComment,
            comment_id: newComment.comment_id, // Cập nhật ID thực
            created_at: newComment.created_at, // Cập nhật thời gian thực
          });

          // Reset giá trị input
          setOpenRepChild(null);
          setTextRepChild('');
          console.log(
            'Bình luận phản hồi đã được gửi và ô input đã được reset (child).'
          );
        } else {
          throw new Error('Failed to post reply comment (child)');
        }
      } catch (error) {
        console.error('Error submitting reply comment (child):', error);

        // Xóa bình luận tạm thời nếu có lỗi bằng cách lọc dựa trên tempComment.comment_id
        updateComment({
          ...tempComment,
          content: 'Bình luận không được gửi. Vui lòng thử lại.',
        });

        // Hoặc nếu bạn muốn loại bỏ bình luận hoàn toàn, hãy sử dụng hàm sau:
        // updateComment(() => comments.filter(c => c.comment_id !== tempComment.comment_id));

        // Thông báo lỗi cho người dùng
        openNotification();
      } finally {
        setIsSubmittingChild(false);
      }
    };

    const canReply = level < 3; // Cho phép phản hồi nếu chưa đến cấp 3

    // Hàm để lấy các bình luận con đến cấp 3
    const getChildComments = (
      comments: Comment[],
      parentId: string,
      currentLevel: number
    ) => {
      const childComments = comments.filter((c) => c.parent_id === parentId);
      let result: Comment[] = [];

      if (currentLevel <= 3) {
        result = [...childComments];
      }

      if (currentLevel < 3) {
        childComments.forEach((child) => {
          result = result.concat(
            getChildComments(comments, child.comment_id, currentLevel + 1)
          );
        });
      }

      return result;
    };

    const childComments = getChildComments(
      comments,
      comment.comment_id,
      level + 1
    );

    return (
      <div style={{ marginLeft: level * 20 }}>
        <Flex vertical gap={4} style={{ padding: '0px 24px 0px 24px' }}>
          <CommenItemHeadStyled screen_mode={screenMode}>
            <Flex justify="space-between">
              <Flex gap={10}>
                <img
                  src={comment.avatar}
                  className="head-avatar"
                  alt="avatar"
                />
                <div className="head-detail">
                  <div className="box-cmt">
                    <p className="head-username">{comment.name}</p>
                    <div
                      style={{
                        fontSize: '14px',
                        color: screenMode === 'dark' ? '#fff' : '#000',
                      }}
                    >
                      {comment?.content}
                    </div>
                  </div>
                </div>
              </Flex>
            </Flex>
          </CommenItemHeadStyled>

          <CommentItemActionsStyled>
            <Flex align="center" gap={18}>
              <div className="head-created">
                {getTimeDifference(comment?.created_at)}
              </div>
              <Button
                style={{ color: isLiked ? '#99BAFF' : '' }}
                type="link"
                className="action-button"
                onClick={likeAction}
              >
                Thích ({likeCount})
              </Button>
              {canReply && (
                <div className="comment-area">
                  <Button
                    type="link"
                    className="action-button"
                    onClick={() => {
                      if (user) {
                        setOpenRepCmt(comment.comment_id);
                      } else {
                        openNotification();
                      }
                    }}
                  >
                    Phản hồi
                  </Button>
                </div>
              )}
            </Flex>
          </CommentItemActionsStyled>

          {openRepCmt === comment.comment_id && canReply && (
            <Flex style={{ marginLeft: '43px', marginBottom: '4px' }} gap={8}>
              <div>
                <Avatar
                  className="comment-avatar"
                  shape="circle"
                  size={34}
                  src={user?.avatar}
                />
              </div>
              <div style={{ position: 'relative', width: '100%' }}>
                <TextArea
                  placeholder="Hãy chia sẻ suy nghĩ của bạn..."
                  className="comment-input-child"
                  autoSize
                  value={textRepCmt}
                  onChange={(e) => setTextRepCmt(e.target.value)}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      submitRepComment();
                    }
                  }}
                />
                <div
                  className="comment-button"
                  onClick={submitRepComment}
                  style={{ cursor: 'pointer' }} // Thêm con trỏ để chỉ ra đây là nút có thể nhấp
                >
                  <LuSendHorizonal className="icon" />
                </div>
              </div>
            </Flex>
          )}
        </Flex>

        {/* Render các bình luận con nếu level < 3 */}
        {childComments.map((childComment) => (
          <CommentItemChild
            key={childComment.comment_id}
            comment={childComment}
            user={user}
            level={level + 1} // Tăng cấp độ
            comments={comments}
            addComment={addComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    );
  };

  return (
    <CommentItemStyled screen_mode={screenMode}>
      <Flex vertical gap={4}>
        <CommentItemHead />
        <CommentItemActions />

        {openRepCmt === comment.comment_id && (
          <Flex style={{ marginLeft: '40px', marginBottom: '4px' }} gap={8}>
            <div>
              <Avatar
                className="comment-avatar"
                shape="circle"
                size={34}
                src={user?.avatar}
              />
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <TextArea
                placeholder="Hãy chia sẻ suy nghĩ của bạn..."
                className="comment-input-child"
                autoSize
                value={textRepCmt}
                onChange={(e) => setTextRepCmt(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    submitRepComment();
                  }
                }}
              />
              <div
                className="comment-button"
                onClick={submitRepComment}
                style={{ cursor: 'pointer' }} // Thêm con trỏ để chỉ ra đây là nút có thể nhấp
              >
                <LuSendHorizonal className="icon" />
              </div>
            </div>
          </Flex>
        )}

        {/* Render các bình luận con đến cấp 3 */}
        {getCommentsFromLevel(comments, 3).map((childComment) => (
          <CommentItemChild
            key={childComment.comment_id}
            comment={childComment}
            user={user}
            level={2} // Cấp độ 2
            comments={comments}
            addComment={addComment}
            updateComment={updateComment}
          />
        ))}
      </Flex>
    </CommentItemStyled>
  );
};

export default CommentItem;
