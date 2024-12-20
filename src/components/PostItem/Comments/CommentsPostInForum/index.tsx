/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Button, Flex, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';
import { Comment, IForum, IPost, IPostInForum } from '@/types/postsType';
import {
  getCommentsPostInForum,
  postCommentPostInForum,
} from '@/services/servicesApi/serviceApi';
import { StyledComments } from './styled';
import CommentItemSkeleton from '../CommentItemSkeleton';
import { CommentInputStyled } from '../CommentInput/styled';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { refreshAPI } from '@/redux/app';
import CommentInputPostInForum from '../CommentInputPostInForum';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
const { TextArea } = Input;
type CommentsProps = {
  post: IPostInForum;
  forumId: number;
};
const CommentsPostInForum: React.FC<CommentsProps> = ({ post, forumId }) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const dispatch = useAppDispatch();
  const { user, refresh } = useAppSelector((state: RootState) => state.app);
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    setLoading(true);
    getCommentsPostInForum(post.forum_post_id).then((res) => {
      if (res && res.status === 200) {
        setComments(res.data.comments?.reverse() || []);
        setLoading(false);
      }
    });
  }, [refresh, dispatch, post]);
  const handleComment = () => {
    postCommentPostInForum(forumId, post.forum_post_id, comment).then((res) => {
      if (res && res.status === 200) {
      }
    });
  };
  return (
    <StyledComments screen_mode={screenMode}>
      <Flex vertical>
        <Flex vertical gap={0} style={{ marginTop: 16 }}>
          <CommentInputPostInForum
            screenMode={screenMode}
            forumId={forumId}
            postId={post?.forum_post_id}
          />
          {fetchLoading ? (
            <CommentItemSkeleton />
          ) : comments.length === 0 ? (
            <Flex>
              <p className="empty">Chưa có bình luận nào</p>
            </Flex>
          ) : (
            comments.length > 0 &&
            comments.map((comment: Comment) => (
              <div>
                <CommentItem screenMode={screenMode} comment={comment} />
              </div>
            ))
          )}
        </Flex>
      </Flex>
    </StyledComments>
  );
};

export default CommentsPostInForum;
//   let [commentInput, setCommentInput] = useState('');
//   let [comments, setComments] = useState([
//     {
//       id: 1,
//       display: 'c1',
//       children: [
//         {
//           id: 2,
//           display: 'c11',
//           children: [],
//         },
//         {
//           id: 3,
//           display: 'c12',
//           children: [],
//         },
//       ],
//     },
//   ]);

//   function addReply(commentId, replyText) {
//     let commentsWithNewReply = [...comments];
//     insertComment(commentsWithNewReply, commentId, replyText);
//     setComments(commentsWithNewReply);
//   }

//   function newComment(text) {
//     return {
//       id: new Date().getTime(),
//       display: text,
//       children: [],
//     };
//   }

//   function insertComment(comments, parentId, text) {
//     for (let i = 0; i < comments.length; i++) {
//       let comment = comments[i];
//       if (comment.id === parentId) {
//         comment.children.unshift(newComment(text));
//       }
//     }

//     for (let i = 0; i < comments.length; i++) {
//       let comment = comments[i];
//       insertComment(comment.children, parentId, text);
//     }
//   }
//   useEffect(() => {}, []);
//   sample data user
