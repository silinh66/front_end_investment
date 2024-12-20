/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from 'react';
import { ForumDetailStyled } from './styled';
// import MoreIcon from '@/assets/icons/more_icon.svg';
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { DangerIcon, HeartIcon, SoundIcon } from '@/components/Message';
// import CreateMessage from '@/components/forms/CreateMessage';

// import { useAppSelector } from '@/redux/hooks';
// import { RootState } from '@/redux';
// import { likePost, viewPost } from '@/services/servicesApi/serviceApi';
import { formatDate } from '@/utils/helper';
import { IPostFeaturedInForum, IForum, IPostInForum } from '@/types/postsType';
import CommentsPostInForum from '@/components/PostItem/Comments/CommentsPostInForum';
import { useEffect, useState } from 'react';
import {
  getDetailFeaturedPost,
  getListForum,
  likePostInForum,
} from '@/services/servicesApi/serviceApi';
import { refreshAPI } from '@/redux/app';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import Forum from '../Forum';

interface Location {
  pathname: string;
  search: string;
  state: {
    post: IPostFeaturedInForum;
  };
  hash: string;
}
const DetailFeaturedPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [post, setPost] = useState<IPostInForum | null>(null);
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  useEffect(() => {
    if (id) {
      getDetailFeaturedPost(Number(id)).then((res) => {
        setPost(res.data.post);
      });
    }
  }, [id]);
  const likeAction = () => {
    post &&
      likePostInForum(post.forum_id, post.forum_post_id).then((res) => {
        if (res && res.status === 200) {
          dispatch(refreshAPI());
        } else {
        }
      });
  };
  return (
    <CommunityLayout>
      <ForumDetailStyled>
        <Flex vertical gap={16}>
          {/* <CreateMessage /> */}
          <div className="message-list">
            <h4 className="title">{post?.title}</h4>
            <Flex vertical gap={14}>
              <Flex vertical gap={16}>
                <Flex justify="space-between">
                  <div className="user">
                    <img
                      src="https://img.freepik.com/premium-psd/template-post-square-banner-instagram-fashion-beautiful-girl-modern-clean_123605-73.jpg"
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <Flex gap={8}>
                        <Flex vertical gap={8}>
                          <div className="label">{post?.author}</div>
                          <div className="label">Ngày tham gia:</div>
                          <div className="label">Lượt theo dõi: </div>
                        </Flex>
                        <Flex vertical gap={8}>
                          <div className="value">Thành viên</div>
                          <div className="value"></div>
                          <div className="value"></div>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                  <Button className="follow-button">Theo dõi</Button>
                </Flex>
                <Flex vertical gap={16} className="body">
                  <div className="body-createdAt">
                    <div className="label">Ngày đăng: </div>
                    <div className="value">
                      {post?.created_at && formatDate(post?.created_at)}
                    </div>
                  </div>
                </Flex>
                <p className="body-content">{post?.content}</p>
                <div>
                  Last edited by a moderator:{' '}
                  {post?.updated_at && formatDate(post?.updated_at)}
                </div>
                <div className="bottom-message">
                  <Flex justify="space-between" align="center">
                    <div className="bottom-sign">
                      Chữ ký: <span>Chuyên gia phản biện</span>
                    </div>
                    <Flex gap={6}>
                      <Button type="link" className="bottom-count">
                        {post?.view_count} lượt xem
                      </Button>
                      <Button type="link" className="bottom-count">
                        {post?.like_count} lượt thích
                      </Button>
                      <Button type="link" className="bottom-count">
                        {post?.comment_count} bình luận
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
                        post?.likes &&
                        post?.likes.length > 0 &&
                        post?.likes.some((item) => item.userID === user?.userID)
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => likeAction()}
                    >
                      <div className="content-button">
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
                {post && (
                  <CommentsPostInForum forumId={post.forum_id} post={post} />
                )}
                {/* {showComments && <Comments post={post} />} */}
              </Flex>
            </Flex>
          </div>
        </Flex>
      </ForumDetailStyled>
    </CommunityLayout>
  );
};

export default DetailFeaturedPost;
