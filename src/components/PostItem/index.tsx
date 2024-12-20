/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Divider, Modal, notification } from 'antd';

import {
  PostActionsStyled,
  PostBodyStyled,
  PostBottomStyled,
  PostHeadStyled,
  PostStyled,
  StyledLikedPost,
  StyledModalPostDetail,
} from './styled';
import MoreIcon from '@/assets/icons/more_icon.svg';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Comments from './Comments/Comments';
import { IFollowingUser, IPost } from '@/types/postsType';
import { formatDate, getTimeDifference } from '@/utils/helper';
import {
  // commentPost,
  // getComments,
  // getPostLikes,
  likePost,
  likePostCompany,
  postFollowUser,
  postUnFollowUser,
  unlikePost,
  unlikePostCompany,
  viewPost,
} from '@/services/servicesApi/serviceApi';
// import CommentInput from './Comments/CommentInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { Link } from 'react-router-dom';
import { refreshAPI } from '@/redux/app';
import { screenModeSelector } from '@/redux/screen/selector';
import { shallowEqual, useSelector } from 'react-redux';
import { ModalPost } from '../modals/ModalPost/ModalPost';

interface PostProps {
  post: IPost;
  id: number;
  loading: boolean;
}

const Post = ({
  id,
  loading,
  post,
  type,
  api,
  getList,
  likeAction,
  unLikeAction,
}: PostProps) => {
  const [apiNoti, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const { user } = useAppSelector((state: RootState) => state.app);
  const [liked, setLiked] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<IFollowingUser[]>([]);
  const openNotification = () => {
    apiNoti.info({
      message: `Nhắc nhở!`,
      description: <div>Bạn cần đăng nhập để thao tác ở cộng đồng!</div>,
      placement: 'topRight',
    });
  };
  const [open, setOpen] = useState({
    detailPost: false,
    likedPost: false,
  });
  const openDetail = () => {
    showDetailPostModal();
    viewAction();
  };

  const openLikedPost = () => {
    showLikedPostModal();
  };
  const showDetailPostModal = () => {
    setOpen((prev) => ({ ...prev, detailPost: true }));
  };

  const hideDetailPostModal = () => {
    setOpen((prev) => ({ ...prev, detailPost: false }));
  };
  const showLikedPostModal = () => {
    setOpen((prev) => ({ ...prev, likedPost: true }));
  };

  const hideLikedPostModal = () => {
    setOpen((prev) => ({ ...prev, likedPost: false }));
  };
  const viewAction = () => {
    viewPost(post?.topic_id).then((res) => {
      if (res && res.status === 200) {
      } else {
      }
    });
  };
  const handleLike = () => {
    likeAction(post); // Gọi hành động like
    setLiked(true); // Đánh dấu bài viết là đã liked
  };

  const handleUnLike = () => {
    unLikeAction(post); // Gọi hành động unlike
    setLiked(false); // Đánh dấu bài viết là đã unliked
  };
  const followUser = (id: number) => {
    postFollowUser(id).then((res) => {
      if (res && res.status === 200) {
        // dispatch(refreshAPI());
        fetchFollowingUsers();
      }
    });
  };
  const UnfollowUser = (id: number) => {
    postUnFollowUser(id).then((res) => {
      if (res && res.status === 200) {
        dispatch(refreshAPI());
        fetchFollowingUsers();
      }
    });
  };
  // postUnFollowUser

  const PostHead = () => (
    <PostHeadStyled screen_mode={screenMode} onClick={openDetail}>
      <div className="head-author">
        <div className="title-author">{post.title}</div>
        <div className="head-author__info">
          <div className="img-header">
            <img src={post.avatar} alt="" className="head-company__avatar" />
            <img src={post.avatar} alt="" className="head-author__avatar" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="top-info">Tên công ty</div>
            <div className="bottom-info">
              <span className="name">{post.author}</span>
              <svg
                width="2"
                height="2"
                viewBox="0 0 2 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                  fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                />
              </svg>

              <span className="date">
                {post && getTimeDifference(post.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PostHeadStyled>
  );

  const PostBody = () => {
    return (
      <PostBodyStyled screen_mode={screenMode} onClick={openDetail}>
        <div className="body-para">
          <blockquote
            dangerouslySetInnerHTML={{
              __html: post?.description?.replace(/\n/g, '<br/>'),
            }}
          />
        </div>
        <div className="body-img">
          <img src={post?.image_url} />
        </div>
      </PostBodyStyled>
    );
  };
  const PostBottom = () => (
    <PostBottomStyled screen_mode={screenMode}>
      <div className="bottom-right">
        <div type="link" className="bottom__count" onClick={openLikedPost}>
          {post?.like_count} Lượt thích
        </div>
        <div type="link" className="bottom__count" onClick={openDetail}>
          {post?.comment_count} Bình luận
        </div>
      </div>
      <div className="button-post">
        <div
          className={`${
            post.likes.some((item) => item.userId === user?.userID)
              ? 'active'
              : ''
          } btn`}
          onClick={() => {
            post.likes.some((item) => item.userId === user?.userID)
              ? unLikeAction(post)
              : likeAction(post);
          }}
        >
          {post.likes.find((item) => item.userId === user?.userID) ? (
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 9.51583C20 8.20114 18.9375 7.5125 17.5 7.5125H13.3125C13.625 6.38562 13.75 5.32135 13.75 4.38229C13.75 0.751249 12.75 0 11.875 0C11.3125 0 10.875 0.0626044 10.3125 0.375625C10.125 0.500833 10.0625 0.626041 10 0.813854L9.375 4.19448C8.8132 5.62688 7.58367 6.93387 6.40256 7.94465C6.30893 8.02478 6.25432 8.14139 6.25432 8.26462V17.3448C6.25432 17.5238 6.36921 17.6817 6.53409 17.7514C6.7574 17.8459 6.99315 17.964 7.25 18.0926C7.34205 18.1345 7.4341 18.1775 7.5263 18.2206C8.1227 18.4995 8.72544 18.7812 9.375 18.7812H15.3125C16.5625 18.7812 17.5 17.7796 17.5 16.9031C17.5 16.7153 17.5 16.5901 17.4375 16.4649C18.1875 16.1519 18.75 15.5258 18.75 14.712C18.75 14.3363 18.6875 14.0233 18.5625 13.7103C19.0625 13.3973 19.5 12.8338 19.5 12.2078C19.5 11.8322 19.3125 11.4566 19.125 11.1435C19.625 10.7679 20 10.1419 20 9.51583Z"
                fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
              />
              <path
                d="M4.17098 18.7812C4.4011 18.7812 4.58765 18.5947 4.58765 18.3646V7.92916C4.58765 7.69904 4.4011 7.51249 4.17098 7.51249H1.25C0.5625 7.51249 0 8.07593 0 8.76458V17.5292C0 18.2178 0.5625 18.7812 1.25 18.7812H4.17098Z"
                fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.5 7.5125C18.9375 7.5125 20 8.20114 20 9.51583C20 10.1419 19.625 10.7679 19.125 11.1435C19.3125 11.4566 19.5 11.8322 19.5 12.2078C19.5 12.8338 19.0625 13.3973 18.5625 13.7103C18.6875 14.0233 18.75 14.3363 18.75 14.712C18.75 15.5258 18.1875 16.1519 17.4375 16.4649C17.5 16.5901 17.5 16.7153 17.5 16.9031C17.5 17.7796 16.5625 18.7812 15.3125 18.7812H9.375C8.72544 18.7812 8.12276 18.4995 7.52637 18.2207C7.43414 18.1776 7.34207 18.1345 7.25 18.0926C6.87981 17.9072 6.55345 17.7437 6.24499 17.6413C6.1879 18.2779 5.64978 18.7812 5 18.7812H1.25C0.5625 18.7812 0 18.2178 0 17.5292V8.76458C0 8.07593 0.5625 7.51249 1.25 7.51249H5C5.48115 7.51249 5.90107 7.78846 6.1098 8.19018C7.37492 7.15002 8.76656 5.7458 9.375 4.19448L10 0.813854C10.0625 0.626041 10.125 0.500833 10.3125 0.375625C10.875 0.0626044 11.3125 0 11.875 0C12.75 0 13.75 0.751249 13.75 4.38229C13.75 5.32135 13.625 6.38562 13.3125 7.5125H17.5ZM6.25 9.70364V16.2771C6.74999 16.4023 7.24999 16.6527 7.74998 16.9031C8.37498 17.2161 8.875 17.4666 9.375 17.4666H15.3125C15.8125 17.4666 16.25 17.2161 16.25 16.8405C16.25 16.5585 16.2185 16.3709 16.1943 16.2263C16.1593 16.0178 16.1393 15.8984 16.25 15.7136C16.3166 15.6247 16.4778 15.5595 16.6635 15.4843C17.0009 15.3477 17.4194 15.1783 17.5 14.7746V14.6494C17.5 14.2737 17.3906 14.0546 17.2969 13.8668C17.2031 13.679 17.125 13.5225 17.1875 13.2721C17.239 13.0916 17.4282 12.9855 17.633 12.8706C17.9256 12.7065 18.25 12.5245 18.25 12.0826C18.25 11.6855 18.0753 11.4633 17.9291 11.2773C17.7988 11.1115 17.6911 10.9745 17.75 10.7679C17.7968 10.6273 17.9398 10.5306 18.1006 10.4219C18.3693 10.2402 18.6875 10.0251 18.6875 9.51583C18.6875 9.0776 18.125 8.76458 17.5 8.76458H11.875C11.5 8.76458 11.25 8.51416 11.25 8.13854C11.25 7.76291 11.5 7.5125 11.875 7.5125H12C12.3125 6.32302 12.5 5.32135 12.5 4.38229C12.5 2.00333 12 1.25208 11.875 1.25208C11.5625 1.25208 11.375 1.25208 11.125 1.31469L10.5625 4.44489V4.5701C9.8125 6.76125 7.8125 8.51416 6.25 9.70364ZM1.25 17.5292V8.76458H5V17.5292H1.25Z"
                fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
              />
            </svg>
          )}
          Thích
        </div>
        <div className="btn" onClick={openDetail}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6409 2.62563C10.3801 2.10338 8.99274 1.96674 7.65427 2.23298C6.3158 2.49921 5.08634 3.15638 4.12136 4.12136C3.15638 5.08634 2.49921 6.3158 2.23298 7.65427C1.96674 8.99274 2.10338 10.3801 2.62563 11.6409C3.14787 12.9017 4.03226 13.9794 5.16696 14.7375C6.30166 15.4957 7.6357 15.9004 9.0004 15.9004C10.1415 15.9004 11.2172 15.6236 12.164 15.1341C12.2859 15.0711 12.4257 15.0517 12.5602 15.0793L15.7297 15.7297L15.0793 12.5602C15.0517 12.4257 15.0711 12.2858 15.1342 12.1638C15.6243 11.2164 15.9004 10.1424 15.9004 9.00039C15.9004 7.6357 15.4957 6.30166 14.7375 5.16696C13.9794 4.03226 12.9017 3.14787 11.6409 2.62563ZM7.42016 1.05603C8.99141 0.743493 10.6201 0.9039 12.1001 1.51697C13.5802 2.13004 14.8453 3.16824 15.7353 4.50028C16.6253 5.83231 17.1004 7.39837 17.1004 9.00039C17.1004 10.2617 16.8125 11.4561 16.2965 12.5223L17.0881 16.3798C17.1287 16.5773 17.0673 16.7821 16.9247 16.9247C16.7821 17.0673 16.5773 17.1287 16.3798 17.0881L12.5222 16.2965C11.4567 16.8117 10.261 17.1004 9.0004 17.1004C7.39837 17.1004 5.83231 16.6253 4.50028 15.7353C3.16824 14.8453 2.13004 13.5802 1.51697 12.1001C0.9039 10.62 0.743493 8.99141 1.05603 7.42016C1.36857 5.84892 2.14003 4.40563 3.27283 3.27283C4.40564 2.14002 5.84892 1.36857 7.42016 1.05603Z"
              fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
            />
          </svg>
          Bình luận
        </div>
      </div>
    </PostBottomStyled>
  );

  return (
    <PostStyled id={id} screen_mode={screenMode}>
      {contextHolder}
      <Card
        loading={loading}
        bordered={false}
        style={{
          width: '100%',

          color: 'white',
        }}
      >
        <PostHead />
        <PostBody />
        <PostBottom />
      </Card>
      <Modal
        style={{ padding: 0 }}
        open={open.likedPost}
        onOk={showLikedPostModal}
        onCancel={hideLikedPostModal}
        closeIcon={false}
        footer={false}
        centered
        width={400}
      >
        <StyledLikedPost screen_mode={screenMode}>
          <h5>Đã thích</h5>
          <ul className="likedUser-list">
            {post.likes.map((likedUser) => (
              <li key={likedUser.userId}>
                <Link to="" className="likedUser-info">
                  <img src={likedUser.avatar} className="likedUser-avatar" />
                  <div className="likedUser-name">{likedUser.name}</div>
                </Link>
                {likedUser.userId === user?.userID ? (
                  <></>
                ) : followingUsers.length > 0 &&
                  followingUsers.some(
                    (item) => item.userID === likedUser.userId
                  ) ? (
                  <Button
                    className="unfollow-btn"
                    onClick={() => UnfollowUser(likedUser.userId)}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className="follow-btn"
                    onClick={() => followUser(likedUser.userId)}
                  >
                    Follow
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </StyledLikedPost>
      </Modal>

      <ModalPost
        openNotification={openNotification}
        screenMode={screenMode}
        open={open}
        setOpen={setOpen}
        post={post}
        PostBody={PostBody}
        PostBottom={PostBottom}
        openLikedPost={openLikedPost}
        user={user}
        likeAction={likeAction}
        unLikeAction={unLikeAction}
      />
    </PostStyled>
  );
};

export default Post;
