/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
  notification,
  Row,
  Tabs,
} from 'antd';
import ImageDefault from '/default.jpg';
import React, { useEffect, useState } from 'react';
import youtube from '@assets/icons/youtube.svg';
import tiktok from '@assets/icons/tiktok.svg';
import {
  StyledFollowersModal,
  StyledFriendsModal,
  StyledProfile,
} from './styled';
import RightContent from '@/layouts/CommunityLayout/RightContent';
import MessageProfile from './MessageProfile';
import CurrentActive from './CurrentActive';
import Posts from './Posts';
import Information from './Information';
import {
  getAllSocialPosts,
  getFollowers,
  getFriends,
  getInfoStatistical,
  getListFollowingGroup,
  getUserInfo,
  getUserPosts,
  postFollowUser,
  postUnFollowUser,
  updateUser,
} from '@/services/servicesApi/serviceApi';
import { CloseOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { IFriend } from '@/layouts/CommunityLayout/RightContent/RealtimeContent/Messenger';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLogin, setUserInfo } from '@/redux/app';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import moment from 'moment';
import { convertDate, convertDateMoment } from '@/components/ConvertDate';
import { makeUploadImage } from '@/components/ConvertLinkImage';
import {
  AreaCustomStyles,
  StyledFollowing,
} from '@/layouts/CommunityLayout/LeftContent/styles';
import { AreaCustom, FriendItem } from '@/layouts/CommunityLayout/LeftContent';
import PostItem from '@/components/PostItem';
import { ModalUpload } from '@/components/modals/ModalUploadUser/ModalUpload';
import icons from '@/constants/icons';

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
const Profile = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);

  const screenMode = useSelector(screenModeSelector);
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );

  const [followingGroup, setFollowingGroup] = useState<IForum[]>([]);
  const [friends, setFriends] = useState<IFriend[]>([]);

  const [followers, setFollowers] = useState<IFollower[]>([]);
  const [followingUsers, setFollowingUsers] = useState<IFollowingUser[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [currentToken, setCurrentToken] = useState<null | string>(null);
  const [dateBirthDay, setDateBirthDay] = useState(
    user?.birthdate ? moment(user.birthdate) : null
  );
  const [textBirthDay, setTextBirthDay] = useState(user?.birthdate);
  const [avt, setAvt] = useState(user?.avatar);
  const token = localStorage.getItem('token');

  const [listPostCompany, setListPostCompany] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const [myLinkYoutube, setMyLinkYoutube] = useState(user?.youtube_url);

  const [myLinkTikTok, setMyLinkTikTok] = useState(user?.tiktok_url);
  const [introduce, setIntroduce] = useState('');
  const [updateProfile, setUpdateProfile] = useState(false);
  const dispatch = useAppDispatch();

  const [isModal, setModal] = useState({
    isFollowers: false,
    isFriends: false,
  });
  useEffect(() => {
    if (user) {
      setAvt(user?.avatar);
      setMyLinkYoutube(user.youtube_url);
      setMyLinkTikTok(user?.tiktok_url);
      setDateBirthDay(user?.birthdate ? moment(user.birthdate) : null);
      setTextBirthDay(user?.birthdate ? moment(user.birthdate) : null);
    }
  }, [user]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    if (token) {
      getListFollowingGroup().then((res) => {
        if (res && res.status === 200) {
          setFollowingGroup(res?.data?.data);
        }
      });
    }
    //  getListFollowingPost().then((res) => {
    //    if (res && res.status === 200) {
    //      setFollowingPosts(res.data.posts);
    //    }
    //  });

    getFriends().then((res) => {
      if (res && res.status === 200) {
        setFriends(res.data.friends);
      }
    });
    //  getInfoStatistical().then((res) => {
    //    if (res && res.status === 200) {
    //      setStatistical(res.data.data);
    //    }
    //  });
  }, [refresh]);
  const handleFollowTopic = (topic: any) => {
    postFollowTopic(topic)
      .then((result) => {
        getListFollowingGroup().then((res) => {
          if (res && res.status === 200) {
            setFollowingGroup(res?.data?.data);
          }
        });
      })
      .catch((err) => {});
  };
  const handleUnFollowTopic = (topic: any) => {
    postUnFollowTopic(topic)
      .then((result) => {
        getListFollowingGroup().then((res) => {
          if (res && res.status === 200) {
            setFollowingGroup(res?.data?.data);
          }
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    const currentToken = localStorage.getItem('authToken');
    setCurrentToken(currentToken);
  }, []);
  const getInfoUser = () => {
    getUserInfo()
      .then((res) => {
        dispatch(setUserInfo(res.data));
        dispatch(setLogin());
      })
      .catch((err) => {
        dispatch(setUserInfo(null));
      });
  };
  useEffect(() => {
    getInfoUser();
  }, [currentToken, dispatch, refresh]);

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
    if (date && date.isValid()) {
      setDateBirthDay(date);
      setTextBirthDay(dateString);
    }
  };

  const handleUpdateUser = () => {
    const formattedDate = moment(textBirthDay, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );

    // Ensure the object keys match the server's expected parameters
    updateUser({
      image: avt, // Changed from 'avt' to 'image' if that's what the server expects
      birthdate: formattedDate,
      tiktok_url: myLinkTikTok,
      youtube_url: myLinkYoutube,
    })
      .then((res) => {
        if (res.status === 200) {
          setUpdateProfile(false);
          getInfoUser();
        }
      })
      .catch((error) => {
        api.warning({
          message: `Nhắc nhở!`,
          description: 'Bạn cần đăng nhập để chỉnh sửa thông tin!',
          placement: 'topRight',
        });
      });
  };
  const filterFlGroup = followingGroup.filter((item) => item.isFollow === true);
  const getListPost = () => {
    getUserPosts(user?.userID).then((res) => {
      if (res && res.status === 200) setMyPosts(res?.data?.topics);
    });
  };
  useEffect(() => {
    getListPost();
  }, [user?.userID]);
  return (
    <CommunityLayout hideSide={'both'}>
      {contextHolder}

      <StyledProfile screen_mode={screenMode} $collapsed={activeTab === 2}>
        <div className="profile-left">
          <Flex vertical gap={12}>
            <div className="card-side-user">
              <img
                src={user?.avatar || icons.HEADER_AVATAR_ICON}
                className="cover"
              />

              <div className="info-user">
                <h4 className="user-name">{user?.name}</h4>
                <div className="birthday">
                  <div className="labels">Sinh nhật:</div>
                  <div className="values">
                    <p>{convertDateMoment(user?.birthdate)}</p>
                  </div>
                </div>
                <div className="birthday">
                  <div className="labels">Bài viết:</div>
                  <div className="values">{myPosts.length}</div>
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
                      href={user?.youtube_url}
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
                      href={user?.tiktok_url}
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

                <div
                  className="btn-update"
                  onClick={() => setUpdateProfile(true)}
                >
                  Chỉnh sửa
                </div>
              </div>
            </div>
            <AreaCustomStyles screen_mode={screenMode} label="Đang theo dõi">
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
            </AreaCustomStyles>
            <AreaCustom label="Danh sách bạn bè">
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
            </AreaCustom>
          </Flex>
        </div>
        <div className="main-user">
          {myPosts.length > 0 ? (
            <Flex vertical gap="8px">
              {myPosts?.map((post, idx) => (
                <PostItem key={idx} id={idx} loading={loading} post={post} />
              ))}
            </Flex>
          ) : (
            <div className="table-no-data">
              <Empty />
            </div>
          )}
        </div>
        <ModalUpload
          setMyLinkTikTok={setMyLinkTikTok}
          myLinkTikTok={myLinkTikTok}
          setMyLinkYoutube={setMyLinkYoutube}
          myLinkYoutube={myLinkYoutube}
          user={user}
          updateProfile={updateProfile}
          setUpdateProfile={setUpdateProfile}
          handleUpdateUser={handleUpdateUser}
          setAvt={setAvt}
          avt={avt}
          onChange={onChange}
          dateFormatList={dateFormatList}
          dateBirthDay={dateBirthDay}
        />
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

export default Profile;
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
