/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Empty,
  Flex,
  Modal,
  Row,
  Tabs,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  StyledFollowersModal,
  StyledFriendsModal,
  StyledProfile,
} from './styled';
import PostItem from '@/components/PostItem';
import RightContent from '@/layouts/CommunityLayout/RightContent';
import MessageProfile from './MessageProfile';
import CurrentActive from './CurrentActive';
import Posts from './Posts';
import Information from './Information';
import {
  addFriends,
  getFollowers,
  getUserId,
  getUserInfo,
  getUserPosts,
  postFollowUser,
  postUnFollowUser,
} from '@/services/servicesApi/serviceApi';
import { CloseOutlined } from '@ant-design/icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IFriend } from '@/layouts/CommunityLayout/RightContent/RealtimeContent/Messenger';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLogin, setUserInfo } from '@/redux/app';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { convertDateMoment } from '@/components/ConvertDate';
import {
  AreaCustomStyles,
  StyledFollowing,
} from '@/layouts/CommunityLayout/LeftContent/styles';
import axios from 'axios';
import { config } from '@/config/env';
interface IFollower {
  userID: number;
  name: string;
  email: string;
  avatar: string;
}
interface IFollowingUser {
  userID: number;
  name: string;
  email: string;
  avatar: string;
}
interface Location {
  pathname: string;
  search: string;
  state: {
    user: IFriend;
  };
  hash: string;
}
const ProfileUser = () => {
  const token = localStorage.getItem('token');
  const screenMode = useSelector(screenModeSelector);
  const { id } = useParams();
  const [postUser, setPostUser] = useState([]);
  const [followers, setFollowers] = useState<IFollower[]>([]);
  const [followingUsers, setFollowingUsers] = useState<IFollowingUser[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [currentToken, setCurrentToken] = useState<null | string>(null);
  const [dateBirthDay, setDateBirthDay] = useState(null);
  const [textBirthDay, setTextBirthDay] = useState(null);
  const [infoUser, setInfoUser] = useState<null | Array>([]);

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const [myLinkYoutube, setMyLinkYoutube] = useState(
    'https://www.youtube.com/@hoangvinhdautubenvung'
  );
  const [myLinkTikTok, setMyLinkTikTok] = useState(
    'https://www.youtube.com/@hoangvinhdautubenvung'
  );
  const [introduce, setIntroduce] = useState('');
  const [updateProfile, setUpdateProfile] = useState(false);
  const dispatch = useAppDispatch();
  const getUser = () => {
    getUserId(id).then((res) => setInfoUser(res?.data));
  };
  useEffect(() => {
    getUser();
  }, [id]);
  const [isModal, setModal] = useState({
    isFollowers: false,
    isFriends: false,
  });
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  useEffect(() => {
    const currentToken = localStorage.getItem('authToken');
    setCurrentToken(currentToken);
  }, []);
  useEffect(() => {
    getUserInfo()
      .then((res) => {
        dispatch(setUserInfo(res.data));
        dispatch(setLogin());
      })
      .catch((err) => {
        dispatch(setUserInfo(null));
      });
  }, [currentToken, dispatch, refresh]);
  useEffect(() => {
    getFollowers().then((res) => {
      if (res && res.status === 200) {
        setFollowers(res.data.followers);
      }
    });
  }, []);
  const openFollowersModal = () => {
    setModal((prev) => ({ ...prev, isFollowers: true }));
  };
  const closeFollowersModal = () => {
    setModal((prev) => ({ ...prev, isFollowers: false }));
  };
  const openFriendsModal = () => {
    setModal((prev) => ({ ...prev, isFriends: true }));
  };
  const closeFriendsModal = () => {
    setModal((prev) => ({ ...prev, isFriends: false }));
  };
  const followUser = (userId: number) => {
    postFollowUser(userId).then((res) => {
      if (res && res.status === 200) {
      } else {
      }
    });
  };
  const unFollowUser = (userId: number) => {
    postUnFollowUser(userId).then((res) => {
      if (res && res.status === 200) {
      } else {
      }
    });
  };
  const checkFollowing = (userID: number) => {
    const isFollowing = followingUsers.some((user) => user.userID === userID);
    return isFollowing;
  };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateBirthDay(date, dateString);
    setTextBirthDay(dateString);
  };
  const getListPost = () => {
    getUserPosts(id).then((res) => {
      if (res && res.status === 200) {
        setPostUser(res?.data?.topics);
      }
    });
  };
  useEffect(() => {
    getListPost();
  }, [id]);
  const actionAddFriend = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/addFriend`,
        {
          friendId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'foobar',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res && res.status === 200) {
          // dispatch(refreshAPI());

          getUser();
        } else {
        }
      });
  };
  const actionUnFriend = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/rejectFriend`,
        {
          friendId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'foobar',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res && res.status === 200) {
          // dispatch(refreshAPI());

          getUser();
        } else {
        }
      });
  };
  return (
    <CommunityLayout hideSide={'both'}>
      <StyledProfile screen_mode={screenMode} $collapsed={activeTab === 2}>
        <div className="profile-left">
          <Flex vertical gap={12}>
            <div className="card-side-user">
              <img src={infoUser?.avatar} className="cover" />

              <div className="info-user">
                <h4 className="user-name">{infoUser?.name}</h4>
                <div className="birthday">
                  <div className="labels">Sinh nhật:</div>
                  <div className="values">
                    <p>{convertDateMoment(infoUser?.birthdate)}</p>
                  </div>
                </div>
                <div className="birthday">
                  <div className="labels">Bài viết:</div>
                  <div className="values">{postUser?.length}</div>
                </div>
                {/* <div className="link">
                  <div className="values">
                    <a
                      style={{
                        color:
                          screenMode === 'dark'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : '#747B8B',
                      }}
                      href={infoUser?.youtube_url}
                    >
                      <svg
                        width="19"
                        height="13"
                        viewBox="0 0 19 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2484 2.15169C18.639 3.51888 18.639 6.44857 18.639 6.44857C18.639 6.44857 18.639 9.3457 18.2484 10.7454C18.0531 11.5267 17.4346 12.1126 16.6859 12.3079C15.2861 12.666 9.75228 12.666 9.75228 12.666C9.75228 12.666 4.18587 12.666 2.78613 12.3079C2.03743 12.1126 1.41895 11.5267 1.22363 10.7454C0.833008 9.3457 0.833008 6.44857 0.833008 6.44857C0.833008 6.44857 0.833008 3.51888 1.22363 2.15169C1.41895 1.37044 2.03743 0.751953 2.78613 0.556641C4.18587 0.166016 9.75228 0.166016 9.75228 0.166016C9.75228 0.166016 15.2861 0.166016 16.6859 0.556641C17.4346 0.751953 18.0531 1.37044 18.2484 2.15169ZM7.92936 9.08529L12.5518 6.44857L7.92936 3.81185V9.08529Z"
                          fill={screenMode === 'dark' ? 'white' : '#747B8B'}
                        />
                      </svg>
                    </a>
                  </div>

                  <div className="values">
                    <a
                      style={{
                        color:
                          screenMode === 'dark'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : '#747B8B',
                      }}
                      href={infoUser?.tiktok_url}
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.6997 2.85C10.1302 2.19961 9.81625 1.3645 9.81634 0.5H7.24134V10.8333C7.22189 11.3927 6.98594 11.9226 6.58326 12.3112C6.18059 12.6999 5.64267 12.917 5.08301 12.9167C3.89967 12.9167 2.91634 11.95 2.91634 10.75C2.91634 9.31667 4.29967 8.24167 5.72467 8.68333V6.05C2.84967 5.66667 0.333008 7.9 0.333008 10.75C0.333008 13.525 2.63301 15.5 5.07467 15.5C7.69134 15.5 9.81634 13.375 9.81634 10.75V5.50833C10.8605 6.25821 12.1141 6.66054 13.3997 6.65833V4.08333C13.3997 4.08333 11.833 4.15833 10.6997 2.85Z"
                          fill={screenMode === 'dark' ? 'white' : '#747B8B'}
                        />
                      </svg>
                    </a>
                  </div>
                </div> */}
                {infoUser?.status === 'not' && (
                  <div className="btn-update" onClick={actionAddFriend}>
                    Thêm bạn bè
                  </div>
                )}

                <div className="box-btn-profile">
                  {infoUser?.status === 'pending' && (
                    <div className="pending">Chờ xác nhận</div>
                  )}
                  {infoUser?.status === 'acceptFriend' && (
                    <div className="my-friend">
                      <svg
                        width="17"
                        height="15"
                        viewBox="0 0 17 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5833 7.41732L16.75 8.59232L11.3083 14.084L8.41667 11.1673L9.58333 9.99232L11.3083 11.7257L15.5833 7.41732ZM6.33333 11.1673L8.83333 13.6673H0.5V12.0007C0.5 10.159 3.48333 8.66732 7.16667 8.66732L8.74167 8.75898L6.33333 11.1673ZM7.16667 0.333984C8.05072 0.333984 8.89857 0.685174 9.52369 1.31029C10.1488 1.93542 10.5 2.78326 10.5 3.66732C10.5 4.55137 10.1488 5.39922 9.52369 6.02434C8.89857 6.64946 8.05072 7.00065 7.16667 7.00065C6.28261 7.00065 5.43476 6.64946 4.80964 6.02434C4.18452 5.39922 3.83333 4.55137 3.83333 3.66732C3.83333 2.78326 4.18452 1.93542 4.80964 1.31029C5.43476 0.685174 6.28261 0.333984 7.16667 0.333984Z"
                          fill="#0F8A61"
                        />
                      </svg>
                      Bạn bè
                    </div>
                  )}
                  {infoUser?.status !== 'not' && (
                    <div onClick={actionUnFriend} className="unfriend">
                      Huỷ kết bạn
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <AreaCustomStyles screen_mode={screenMode} label="Đang theo dõi">
              <div className="areaCustom-title">Đang theo dõi</div>
              <StyledFollowing screen_mode={screenMode}>
                <Flex vertical gap={20}>
                  {filterFlGroup?.length > 0 && (
                    <div>
                      <Flex vertical gap={8}>
                        {filterFlGroup?.map((item, index) => {
                          return (
                            <div
                              // target="_blank"
                              className="card"
                            >
                              <Link
                                to={`/detail-company/${item.symbol}`}
                                className="header"
                              >
                                <img
                                  src={item.imageUrl || ImageDefault}
                                  alt="Vingroup Logo"
                                  className="logo"
                                />
                                <p className="title">{item.companyName}</p>
                              </Link>

                              {!item.isFollow ? (
                                <div
                                  onClick={() => handleFollowTopic(item.symbol)}
                                  className="btn-join"
                                >
                                  Tham gia
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    handleUnFollowTopic(item.symbol)
                                  }
                                  className="btn-join"
                                >
                                  Rời nhóm
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </Flex>
                    </div>
                  )}
                  <div className="more">Xem thêm</div>
                </Flex>
              </StyledFollowing>
            </AreaCustomStyles> */}
            {/* <AreaCustom label="Danh sách bạn bè">
              <Flex vertical wrap={'wrap'} gap={10}>
                <Flex gap={10}>
                  {friends.length > 0 &&
                    friends.map((item, idx) => {
                      return <FriendItem data={item} />;
                    })}
                </Flex>
                <div onClick={() => setShowModal(true)} className="more">
                  Xem thêm
                </div>
              </Flex>
            </AreaCustom> */}
          </Flex>
        </div>

        {/* bài viết user */}
        <div className="main-user">
          {postUser.length > 0 ? (
            <Flex vertical gap="8px">
              {postUser?.map((post, idx) => (
                <PostItem key={idx} id={idx} post={post} />
              ))}
            </Flex>
          ) : (
            <div className="table-no-data">
              <Empty />
            </div>
          )}
        </div>

        <Modal
          open={isModal.isFollowers}
          onOk={closeFollowersModal}
          onCancel={closeFollowersModal}
          footer={false}
          width={600}
          closable={false}
        >
          <StyledFollowersModal screen_mode={screenMode}>
            <div className="head">
              <h4>DANH SÁCH NGƯỜI THEO DÕI</h4>
              <div className="close-btn" onClick={closeFollowersModal}>
                <CloseOutlined style={{ fontSize: '19px' }} />
              </div>
            </div>
            <div className="body">
              <p className="follower-count">
                Số người theo dõi:{followers?.length}
              </p>
              <ul className="follower-list">
                {followers &&
                  followers.length > 0 &&
                  followers.map((follower) => {
                    return (
                      <li className="follower-item" key={follower?.userID}>
                        <div className="left-item">
                          <Avatar
                            shape="square"
                            size={55}
                            src={follower.avatar}
                          />
                          <div className="user-info">
                            <p>{follower?.name}</p>
                            <span>Thành viên rất tích cực</span>
                          </div>
                        </div>
                        <div className="right-item">
                          {checkFollowing(follower.userID) ? (
                            <Button
                              onClick={() => unFollowUser(follower.userID)}
                              className="unfollow-btn btn"
                            >
                              Bỏ theo dõi
                            </Button>
                          ) : (
                            <Button
                              className="follow-btn btn"
                              onClick={() => followUser(follower.userID)}
                            >
                              Theo dõi lại
                            </Button>
                          )}

                          <Button className="btn">Gỡ theo dõi</Button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </StyledFollowersModal>
        </Modal>
        <Modal
          open={isModal.isFriends}
          onOk={closeFriendsModal}
          onCancel={closeFriendsModal}
          footer={false}
          width={600}
          closable={false}
        >
          <StyledFriendsModal>
            <div className="head">
              <h4>DANH SÁCH BẠN BÈ</h4>
              <div className="close-btn" onClick={closeFriendsModal}>
                <CloseOutlined style={{ fontSize: '19px' }} />
              </div>
            </div>
            <div className="body"></div>
          </StyledFriendsModal>
        </Modal>
      </StyledProfile>
    </CommunityLayout>
  );
};

export default ProfileUser;
const listTab = [
  {
    iconUrl: '',
    text: 'TIN NHẮN HỒ SƠ',
    id: 0,
    view: <MessageProfile />,
  },
  {
    iconUrl: '',
    text: 'HOẠT ĐỘNG GẦN ĐÂY',
    id: 1,
    view: <CurrentActive />,
  },
  {
    iconUrl: '',
    text: 'CÁC BÀI ĐĂNG',
    id: 2,
    view: <Posts />,
  },
  {
    iconUrl: '',
    text: 'CỘNG ĐỒNG',
    id: 3,
    // view: <Information />,
    link: '/cong-dong/forum/forum',
  },
];
