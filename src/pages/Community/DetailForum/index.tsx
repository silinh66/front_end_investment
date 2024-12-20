/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StyledDetailForum } from './styled';
// import MoreIcon from '@/assets/icons/more_icon.svg';
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import { useLocation } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { DangerIcon, HeartIcon, SoundIcon } from '@/components/Message';
// import CreateMessage from '@/components/forms/CreateMessage';

// import { useAppSelector } from '@/redux/hooks';
// import { RootState } from '@/redux';
import {
  getListFollowingGroup,
  getListFollowingPost,
  getListPostsInForum,
  getPostLikes,
  likePostInForum,
  postComment,
  //   likePost,
  //   viewPost,
} from '@/services/servicesApi/serviceApi';
import { formatDate } from '@/utils/helper';
import { IForum, IPost, IPostInForum } from '@/types/postsType';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import Comments from '@/components/PostItem/Comments/Comments';
import CommentsPostInForum from '@/components/PostItem/Comments/CommentsPostInForum';
import { refreshAPI } from '@/redux/app';

interface Location {
  pathname: string;
  search: string;
  state: {
    forum: IForum;
  };
  hash: string;
}
const DetailForum = () => {
  const location: Location = useLocation();
  const {
    state: { forum },
  } = location;
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );

  //   const { user, refresh } = useAppSelector((state: RootState) => state.app);
  //   const [open, setOpen] = useState({
  //     detailPost: false,
  //     likedPost: false,
  //   });
  const [posts, setPosts] = useState<IPostInForum[]>([]);
  const [followingPosts, setFollowingPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getListPostsInForum(forum.forum_id).then((res) => {
      if (res && res.status === 200) {
        setPosts(res.data.posts);
      } else {
      }
    });
  }, [forum, refresh]);
  useEffect(() => {
    getListFollowingPost().then((res) => {
      if (res && res.status === 200) {
        setFollowingPosts(res.data.posts || []);
      }
    });
  }, []);

  //   const openDetail = () => {
  //     showDetailPostModal();
  //     viewAction();
  //   };

  //   const openLikedPost = () => {
  //     showLikedPostModal();
  //   };
  //   const showDetailPostModal = () => {
  //     setOpen((prev) => ({ ...prev, detailPost: true }));
  //   };

  //   const hideDetailPostModal = () => {
  //     setOpen((prev) => ({ ...prev, detailPost: false }));
  //   };
  //   const showLikedPostModal = () => {
  //     setOpen((prev) => ({ ...prev, likedPost: true }));
  //   };

  //   const hideLikedPostModal = () => {
  //     setOpen((prev) => ({ ...prev, likedPost: false }));
  //   };
  //   const viewAction = () => {
  //     viewPost(forum?.forum_id).then((res) => {
  //       if (res && res.status === 200) {
  //       } else {
  //       }
  //     });
  //   };

  return (
    <CommunityLayout>
      <StyledDetailForum>
        <Flex vertical gap={16}>
          {/* <CreateMessage /> */}
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                <PostInForum
                  forum={forum}
                  post={post}
                  followingPosts={followingPosts}
                />
              );
            })}
        </Flex>
      </StyledDetailForum>
    </CommunityLayout>
  );
};

export default DetailForum;
const PostInForum = ({
  post,
  forum,
  followingPosts,
}: {
  post: IPostInForum;
  forum: IForum;
  followingPosts: IPost[];
}) => {
  const dispatch = useAppDispatch();
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  const [showComments, setShowComments] = useState(false);
  const likeAction = (id: number) => {
    likePostInForum(forum.forum_id, id).then((res) => {
      if (res && res.status === 200) {
        dispatch(refreshAPI());
      } else {
      }
    });
  };

  return (
    <div className="message-list" key={post.forum_post_id}>
      <h4 className="title">{post.title}</h4>
      <Flex vertical gap={14}>
        <Flex vertical gap={16} key={post.forum_post_id}>
          <Flex justify="space-between">
            <div className="user">
              <img
                src="https://img.freepik.com/premium-psd/template-post-square-banner-instagram-fashion-beautiful-girl-modern-clean_123605-73.jpg"
                className="user-avatar"
              />
              <div className="user-info">
                <Flex gap={8}>
                  <Flex vertical gap={8}>
                    <div className="label">{post.author}</div>
                    <div className="label">Ngày tham gia:</div>
                    <div className="label">Lượt theo dõi: </div>
                  </Flex>
                  <Flex vertical gap={8}>
                    <div className="value">Thành viên</div>
                    <div className="value">
                      {post.created_at && formatDate(post.created_at)}
                    </div>
                    <div className="value">...</div>
                  </Flex>
                </Flex>
              </div>
            </div>
            {followingPosts.length > 0 &&
            followingPosts.some(
              (item) => item.post_id === post.forum_post_id
            ) ? (
              <Button className="unfollow-button">Huỷ theo dõi</Button>
            ) : (
              <Button className="follow-button">Theo dõi</Button>
            )}
          </Flex>
          <Flex vertical gap={16} className="body">
            <div className="body-createdAt">
              <div className="label">Ngày đăng: </div>
              <div className="value">
                {/* {formatDate(post.created_at!)} */}
              </div>
            </div>
          </Flex>
          <p className="body-content">{post.content}</p>
          <div>Last edited by a moderator: {formatDate(post.updated_at!)}</div>
          <div className="bottom-message">
            <Flex justify="space-between" align="center">
              <div className="bottom-sign">
                Chữ ký: <span>Chuyên gia phản biện</span>
              </div>
              <Flex gap={6}>
                <Button type="link" className="bottom-count">
                  {post.view_count} lượt xem
                </Button>
                <Button type="link" className="bottom-count">
                  {post.like_count} lượt thích
                </Button>
                <Button
                  type="link"
                  className="bottom-count"
                  onClick={() => setShowComments((prev) => !prev)}
                >
                  {post.comment_count} bình luận
                </Button>
              </Flex>
            </Flex>
          </div>
          <div className="actions-message">
            <Flex gap={12}>
              <Button className="action-button">
                <div className="content-button">
                  <SoundIcon className="icon" />
                  Loan tin
                  <p></p>
                </div>
              </Button>
              <Button
                className={`action-button like-button ${
                  post.likes.some((item) => item.userId === user?.userID)
                    ? 'active'
                    : ''
                }`}
                onClick={() => likeAction(post.forum_post_id)}
              >
                <div className={`content-button `}>
                  <HeartIcon className="icon" />
                  Thích
                  <p></p>
                </div>
              </Button>
              <Button className="action-button  danger">
                <div className="content-button">
                  <DangerIcon className="icon" />
                  Báo cáo
                  <p></p>
                </div>
              </Button>
            </Flex>
          </div>

          {showComments && <CommentsPostInForum forum={forum} post={post} />}
        </Flex>
      </Flex>
    </div>
  );
};
