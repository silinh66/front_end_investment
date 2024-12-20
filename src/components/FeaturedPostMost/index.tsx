/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { StyledFeaturedPostMost } from './styled';
import {
  getPostLikes,
  likePost,
  unlikePost,
} from '@/services/servicesApi/serviceApi';
import { refreshAPI } from '@/redux/app';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { formatDate } from '@/utils/helper';
import { Link } from 'react-router-dom';

export const FeaturedPostMost = ({ featuredPosts }) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.app);

  const [checkLikePost, setCheckLikePost] = useState([]);
  let maxLikeCount = 0;
  let maxLikeCountPost = null;

  featuredPosts.forEach((post) => {
    if (post.like_count > maxLikeCount) {
      maxLikeCount = post.like_count;
      maxLikeCountPost = post;
    }
  });

  useEffect(() => {
    getPostLikes(maxLikeCountPost?.forum_post_id).then((res) => {
      if (res && res.status === 200) {
        setCheckLikePost(res.data.likes);
      }
    });
  }, []);

  const likeAction = (post) => {
    post.likes.find((item) => item.userId === user?.userID);
    likePost(post?.forum_post_id).then((res) => {
      if (res && res.status === 200) {
        getPostLikes(post.forum_post_id).then((res) => {
          if (res && res.status === 200) {
            setCheckLikePost(res.data.likes);
          }
        });
        dispatch(refreshAPI());
      } else {
      }
    });
  };
  const unlikeAction = (post) => {
    post.likes.find((item) => item.userId === user?.userID);
    unlikePost(post?.forum_post_id).then((res) => {
      if (res && res.status === 200) {
        getPostLikes(post.forum_post_id).then((res) => {
          if (res && res.status === 200) {
            setCheckLikePost(res.data.likes);
          }
        });
        dispatch(refreshAPI());
      } else {
      }
    });
  };
  return (
    <StyledFeaturedPostMost screen_mode={screenMode}>
      <div className="box-most">
        <div className="title">BÀI VIẾT NỔI BẬT NHẤT</div>

        <div className="body-most">
          <Link
            to={{
              pathname: `/cong-dong/forum/forum/${maxLikeCountPost?.forum_post_id}`,
            }}
          >
            <img src={maxLikeCountPost?.image_url} className="img-most"></img>
          </Link>
          <div className="content">
            <div className="header-content">
              <div className="header">
                <div className="title">
                  <div className="text-title">{maxLikeCountPost?.title}</div>

                  <div className="text-bottom">
                    Ngày đăng: {formatDate(maxLikeCountPost?.created_at)}
                  </div>
                </div>
                <div className="icon-header">
                  <Link
                    to={{
                      pathname: `/cong-dong/forum/forum/${maxLikeCountPost?.forum_post_id}`,
                    }}
                    className="icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M6.96049 9C6.96049 9.52214 7.16791 10.0229 7.53712 10.3921C7.90634 10.7613 8.40709 10.9688 8.92924 10.9688C9.45138 10.9688 9.95214 10.7613 10.3214 10.3921C10.6906 10.0229 10.898 9.52214 10.898 9C10.898 8.47786 10.6906 7.9771 10.3214 7.60788C9.95214 7.23867 9.45138 7.03125 8.92924 7.03125C8.40709 7.03125 7.90634 7.23867 7.53712 7.60788C7.16791 7.9771 6.96049 8.47786 6.96049 9ZM16.5617 8.54648C14.8953 5.03613 12.3763 3.26953 8.99955 3.26953C5.62104 3.26953 3.10385 5.03613 1.43744 8.54824C1.3706 8.68978 1.33594 8.84436 1.33594 9.00088C1.33594 9.1574 1.3706 9.31198 1.43744 9.45352C3.10385 12.9639 5.62279 14.7305 8.99955 14.7305C12.3781 14.7305 14.8953 12.9639 16.5617 9.45176C16.697 9.16699 16.697 8.83652 16.5617 8.54648ZM8.92924 12.0938C7.22065 12.0938 5.83549 10.7086 5.83549 9C5.83549 7.29141 7.22065 5.90625 8.92924 5.90625C10.6378 5.90625 12.023 7.29141 12.023 9C12.023 10.7086 10.6378 12.0938 8.92924 12.0938Z"
                        fill="#42A732"
                      />
                    </svg>
                  </Link>
                  <div
                    onClick={() => {
                      checkLikePost?.find(
                        (item) => item.userId === user?.userID
                      )
                        ? unlikeAction(maxLikeCountPost)
                        : likeAction(maxLikeCountPost);
                    }}
                    className={`icon`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M15.3096 9.3563C15.5931 8.99263 15.75 8.54706 15.75 8.08346C15.75 7.34793 15.3264 6.65172 14.6447 6.26348C14.4692 6.16354 14.2693 6.11095 14.0659 6.11113H10.0193L10.1205 4.09784C10.1441 3.61131 9.96694 3.14936 9.62269 2.79715C9.45375 2.62356 9.24992 2.48544 9.02382 2.39133C8.79772 2.29722 8.55413 2.24912 8.30813 2.25001C7.43063 2.25001 6.65438 2.82336 6.4215 3.64408L4.97194 8.73872H4.96688V15.75H12.9369C13.0922 15.75 13.2441 15.7205 13.3841 15.6615C14.1874 15.329 14.7054 14.5673 14.7054 13.722C14.7054 13.5156 14.6751 13.3124 14.6143 13.1159C14.8978 12.7522 15.0548 12.3066 15.0548 11.843C15.0548 11.6366 15.0244 11.4335 14.9636 11.2369C15.2471 10.8732 15.4041 10.4277 15.4041 9.96406C15.4007 9.75765 15.3703 9.55288 15.3096 9.3563ZM2.25 9.26293V15.2258C2.25 15.5157 2.49131 15.75 2.79 15.75H3.88688V8.73872H2.79C2.49131 8.73872 2.25 8.97298 2.25 9.26293Z"
                        fill={
                          checkLikePost?.find(
                            (item) => item.userId === user?.userID
                          )
                            ? '#42A732'
                            : '#333'
                        }
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="info-user">
                <div className="user">
                  <img
                    className="avt"
                    src="https://imgflip.com/s/meme/Smiling-Cat.jpg"
                    alt=""
                  />
                  <div className="info">
                    <div className="name">
                      <div className="name-user">
                        CHuyên{'    '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="6"
                          viewBox="0 0 7 6"
                          fill="none"
                        >
                          <circle cx="3.5" cy="3" r="3" fill="#42A732" />
                        </svg>
                      </div>
                      <div className="btn-vip">
                        <div className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                          >
                            <path
                              d="M8.85156 9.48969H4.15156C3.94156 9.48969 3.70656 9.32469 3.63656 9.12469L1.56656 3.33469C1.27156 2.50469 1.61656 2.24969 2.32656 2.75969L4.27656 4.15469C4.60156 4.37969 4.97156 4.26469 5.11156 3.89969L5.99156 1.55469C6.27156 0.804688 6.73656 0.804688 7.01656 1.55469L7.89656 3.89969C8.03656 4.26469 8.40656 4.37969 8.72656 4.15469L10.5566 2.84969C11.3366 2.28969 11.7116 2.57469 11.3916 3.47969L9.37156 9.13469C9.29656 9.32469 9.06156 9.48969 8.85156 9.48969Z"
                              stroke="white"
                              stroke-width="0.75"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M3.75 11H9.25"
                              stroke="white"
                              stroke-width="0.75"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5.25 7H7.75"
                              stroke="white"
                              stroke-width="0.75"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="text">VIP</div>
                      </div>
                    </div>
                    <div className="role">(Chuyên gia)</div>
                  </div>
                </div>
                <div className="relationship">
                  <div className="btn-add">Thêm bạn</div>
                  <div className="btn-fl">Theo dõi</div>
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="text">{maxLikeCountPost?.content}</div>
              <div className="list-info">
                <div className="view">
                  <div className="number">{maxLikeCountPost?.view_count}</div>
                  <div className="text">Lượt xem</div>
                </div>
                <div className="view">
                  <div className="number">{maxLikeCountPost?.like_count}</div>
                  <div className="text">Lượt thích</div>
                </div>
                <div className="view">
                  <div className="number">
                    {maxLikeCountPost?.comment_count}
                  </div>
                  <div className="text">Bình luận</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledFeaturedPostMost>
  );
};
