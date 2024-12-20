/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Flex, Modal, Space, Typography } from 'antd';
const { Title } = Typography;
import {
  AreaCustomStyles,
  FollowingItemStyles,
  FriendItemStyles,
  StyledFollowing,
  StyledFriendsModal,
  StyledStatistic,
  Styles,
} from './styles';
import ImageDefault from '/default.jpg';
import Icon1 from '@/assets/icons/community_people.svg';
import Icon2 from '@/assets/icons/community_profile.svg';
import Icon3 from '@/assets/icons/community_write.svg';
import Icon4 from '@/assets/icons/community_lines.svg';
import {
  getFriends,
  getInfoStatistical,
  getListFollowingGroup,
  getListFollowingPost,
  postFollowTopic,
  postUnFollowTopic,
} from '@/services/servicesApi/serviceApi';
import { IForum, IPost } from '@/types/postsType';
import { Link } from 'react-router-dom';
import { IFriend } from '../RightContent/RealtimeContent/Messenger';
import { CloseOutlined } from '@ant-design/icons';
import useScreenMode from '@/redux/screen/hook';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { StyledEventItem } from '../RightContent/Events/styled';
import { refreshAPI } from '@/redux/app';

const LeftContent = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [followingGroup, setFollowingGroup] = useState<IForum[]>([]);
  const [followingPosts, setFollowingPosts] = useState<IPost[]>([]);
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [statistical, setStatistical] = useState<IFriend[]>([]);
  const [showMoreFlTopic, setShowMoreFlTopic] = useState<any>(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    if (token) {
      getListFollowingGroup().then((res) => {
        if (res && res.status === 200) {
          setFollowingGroup(res?.data?.data);
        }
      });

      getFriends().then((res) => {
        if (res && res.status === 200) {
          setFriends(res.data.friends);
        }
      });
      getInfoStatistical().then((res) => {
        if (res && res.status === 200) {
          setStatistical(res.data.data);
        }
      });
    }
  }, [refresh]);
  const handleFollowTopic = (topic: any) => {
    postFollowTopic(topic)
      .then((result) => {
        getListFollowingGroup().then((res) => {
          if (res && res.status === 200) {
            setFollowingGroup(res?.data?.data);
            dispatch(refreshAPI());
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
            dispatch(refreshAPI());
          }
        });
      })
      .catch((err) => {});
  };
  const filterFlGroup = followingGroup.filter((item) => item.isFollow === true);

  return (
    <Styles screen_mode={screenMode}>
      <Space className="root-left" direction="vertical" gap={8} size="middle">
        <AreaCustom label="Thống kê">
          <StyledStatistic screen_mode={screenMode}>
            <Flex gap={16}>
              <Flex vertical gap={16}>
                <Flex align="center" gap={10}>
                  <div className="statistic-body__image">
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 14.9908V17.122H12.6482C12.5205 16.7132 12.4506 16.2786 12.4483 15.828H1.32372V14.9908C1.32372 14.6871 1.40138 14.4219 1.5567 14.195C1.71201 13.9672 1.99044 13.7498 2.39197 13.5428C3.38034 13.0269 4.42167 12.6318 5.51595 12.3575C6.61199 12.0832 7.86203 11.946 9.26605 11.946C10.6701 11.946 11.9197 12.0832 13.0148 12.3575C13.2937 12.4274 13.5691 12.5051 13.8409 12.5906C14.2285 12.228 14.6817 11.9354 15.1807 11.7327C14.569 11.5 13.9595 11.2985 13.3524 11.1282C12.2202 10.8108 10.858 10.6521 9.26605 10.6521C7.67406 10.6521 6.31239 10.8108 5.18105 11.1282C4.04882 11.4457 2.90866 11.8718 1.76055 12.4067C1.22312 12.6655 0.795116 13.0105 0.47654 13.4419C0.158847 13.8741 0 14.3904 0 14.9908Z"
                        fill={screenMode === 'dark' ? '#5CD680' : '#5EBA7A'}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.46241 6.62389C7.23988 7.38475 8.17442 7.76518 9.26605 7.76518V7.76389C10.3612 7.7682 11.2962 7.38863 12.071 6.62519C12.8458 5.86174 13.2346 4.94732 13.2372 3.88195C13.2399 2.81657 12.8511 1.90302 12.071 1.14129C11.2909 0.37957 10.3559 -0.000859837 9.26605 1.45918e-06C8.17619 0.000865471 7.24164 0.381296 6.46241 1.14129C5.68318 1.90129 5.294 2.81484 5.29489 3.88195C5.29577 4.94905 5.68494 5.86303 6.46241 6.62389ZM11.1365 5.71034C10.6176 6.21758 9.9941 6.4712 9.26605 6.4712V6.46991C8.54154 6.4725 7.9185 6.21931 7.39696 5.71034C6.87541 5.20137 6.61596 4.59191 6.61861 3.88195C6.62126 3.17198 6.88071 2.56295 7.39696 2.05484C7.91321 1.54674 8.53624 1.29312 9.26605 1.29398C9.99586 1.29485 10.6193 1.54847 11.1365 2.05484C11.6536 2.56122 11.9126 3.17026 11.9135 3.88195C11.9144 4.59364 11.6554 5.2031 11.1365 5.71034Z"
                        fill={screenMode === 'dark' ? '#5CD680' : '#5EBA7A'}
                      />
                      <path
                        d="M19 15.8049C19 17.0172 18.0222 18 16.8161 18C15.61 18 14.6322 17.0172 14.6322 15.8049C14.6322 14.5925 15.61 13.6098 16.8161 13.6098C18.0222 13.6098 19 14.5925 19 15.8049Z"
                        fill={screenMode === 'dark' ? '#5CD680' : '#5EBA7A'}
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="statistic-body__desc">
                      <span>{statistical.onlineCount}</span> người đang online
                    </p>
                  </div>
                </Flex>
                <Flex align="center" gap={10}>
                  <div className="statistic-body__image">
                    <svg
                      width="24"
                      height="17"
                      viewBox="0 0 24 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.599609 16.1996V14.2579C0.599609 13.7108 0.74508 13.2404 1.03602 12.8466C1.32777 12.4537 1.71973 12.1393 2.2119 11.9035C3.26333 11.4162 4.30748 11.0279 5.34436 10.7387C6.38043 10.4494 7.62743 10.3048 9.08536 10.3048C10.5433 10.3048 11.7907 10.4494 12.8276 10.7387C13.8645 11.0279 14.9086 11.4162 15.96 11.9035C16.4514 12.1393 16.843 12.4537 17.1347 12.8466C17.4256 13.2404 17.5711 13.7108 17.5711 14.2579V16.1996H0.599609ZM19.9956 16.1996V14.2036C19.9956 13.5198 19.8534 12.8749 19.5689 12.269C19.2852 11.6622 18.882 11.1419 18.3591 10.708C18.9547 10.8259 19.5285 10.9894 20.0805 11.1985C20.6316 11.4083 21.1772 11.6437 21.717 11.9047C22.2423 12.1617 22.6541 12.4906 22.9523 12.8914C23.2505 13.2923 23.3996 13.7297 23.3996 14.2036V16.1996H19.9956ZM9.08536 7.67455C8.08566 7.67455 7.22981 7.32794 6.51781 6.63471C5.80582 5.94148 5.44942 5.10874 5.44861 4.13649C5.4478 3.16424 5.8042 2.3319 6.51781 1.63945C7.23143 0.947011 8.08727 0.600397 9.08536 0.599611C10.0834 0.598825 10.9397 0.945439 11.6541 1.63945C12.3685 2.33347 12.7245 3.16581 12.7221 4.13649C12.7197 5.10717 12.3637 5.9403 11.6541 6.63589C10.9445 7.33147 10.0883 7.6773 9.08536 7.67337M17.8984 4.13649C17.8984 5.10953 17.542 5.94266 16.8292 6.63589C16.1164 7.32911 15.2606 7.67494 14.2617 7.67337C14.2099 7.67337 14.1445 7.66787 14.0653 7.65687C13.9861 7.64586 13.9206 7.63329 13.8689 7.61914C14.2803 7.13026 14.5958 6.58794 14.8157 5.99217C15.0363 5.39562 15.1466 4.77627 15.1466 4.13413C15.1466 3.49199 15.0314 2.87893 14.8011 2.29496C14.5708 1.71098 14.2601 1.16433 13.8689 0.655022C13.9344 0.632229 13.9998 0.617295 14.0653 0.610222C14.1307 0.603148 14.1962 0.599611 14.2617 0.599611C15.2614 0.599611 16.1172 0.946225 16.8292 1.63945C17.5412 2.33268 17.8976 3.16503 17.8984 4.13649ZM1.81186 15.0206H16.3589V14.2579C16.3589 13.9812 16.2877 13.7395 16.1455 13.5328C16.0033 13.3261 15.7479 13.128 15.3794 12.9386C14.475 12.4686 13.5214 12.1086 12.5185 11.8587C11.5155 11.6087 10.3712 11.4838 9.08536 11.4838C7.79957 11.4838 6.6548 11.6087 5.65106 11.8587C4.64893 12.1086 3.69529 12.4686 2.79015 12.9386C2.42243 13.1272 2.16745 13.3253 2.02522 13.5328C1.88298 13.7395 1.81186 13.9812 1.81186 14.2579V15.0206ZM9.08536 6.49559C9.7521 6.49559 10.3231 6.26451 10.7983 5.80236C11.2735 5.34021 11.5107 4.78492 11.5099 4.13649C11.5091 3.48806 11.2719 2.93317 10.7983 2.4718C10.3247 2.01043 9.75371 1.77936 9.08536 1.77857C8.41701 1.77778 7.84644 2.00886 7.37366 2.4718C6.90089 2.93474 6.66328 3.48963 6.66086 4.13649C6.65844 4.78335 6.89604 5.33864 7.37366 5.80236C7.85129 6.26609 8.42186 6.49677 9.08536 6.49441"
                        fill={screenMode === 'dark' ? '#9B99FF' : '#6966FF'}
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="statistic-body__desc">
                      <span>{statistical.totalCount}</span> thành viên
                    </p>
                  </div>
                </Flex>
              </Flex>
              <Flex vertical gap={16}>
                <Flex align="center" gap={10}>
                  <div className="statistic-body__image">
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.43059 14.5294H18.1C18.2804 14.5294 18.4463 14.4579 18.5976 14.3148C18.749 14.1718 18.8243 14.0142 18.8235 13.8421V3.35294H4.70588V13.8421C4.70588 14.0134 4.78118 14.171 4.93177 14.3148C5.08235 14.4586 5.24824 14.5302 5.42941 14.5294M5.42941 15.6471C4.88824 15.6471 4.43608 15.4749 4.07294 15.1307C3.70981 14.7865 3.52863 14.3569 3.52941 13.8421V1.805C3.52941 1.29088 3.71098 0.861336 4.07412 0.516355C4.43726 0.171375 4.88941 -0.000742689 5.43059 2.40872e-06H18.1C18.6412 2.40872e-06 19.0933 0.17212 19.4565 0.516355C19.8196 0.86059 20.0008 1.29014 20 1.805V13.8421C20 14.3562 19.8188 14.7854 19.4565 15.1296C19.0941 15.4738 18.6416 15.6463 18.0988 15.6471H5.42941ZM1.9 19C1.35883 19 0.906669 18.8279 0.543532 18.4836C0.180395 18.1394 -0.000781778 17.7099 2.5355e-06 17.195V4.0403H1.17647V17.195C1.17647 17.3664 1.25177 17.524 1.40235 17.6678C1.55294 17.8116 1.71883 17.8831 1.9 17.8824H15.7471V19H1.9Z"
                        fill={screenMode === 'dark' ? '#D19B49' : '#BB965F'}
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="statistic-body__desc">
                      <span>{statistical.groupCount}</span> diễn đàn
                    </p>
                  </div>
                </Flex>
                <Flex align="center" gap={10}>
                  <div className="statistic-body__image">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.818 18C1.29975 18 0.867375 17.8267 0.520875 17.4802C0.174375 17.1337 0.00075 16.701 0 16.182V1.818C0 1.29975 0.173625 0.867375 0.520875 0.520875C0.868125 0.174375 1.3005 0.00075 1.818 0H13.0241L18 4.97587V16.1831C18 16.7006 17.8267 17.133 17.4802 17.4802C17.1338 17.8275 16.701 18.0007 16.182 18H1.818ZM1.818 16.875H16.1831C16.3849 16.875 16.5506 16.8101 16.6804 16.6804C16.8101 16.5506 16.875 16.3849 16.875 16.1831V5.625H12.375V1.125H1.818C1.6155 1.125 1.44937 1.18987 1.31962 1.31962C1.18987 1.44937 1.125 1.6155 1.125 1.818V16.1831C1.125 16.3849 1.18987 16.5506 1.31962 16.6804C1.44937 16.8101 1.6155 16.875 1.818 16.875ZM3.9375 13.5H14.0625V12.375H3.9375V13.5ZM3.9375 5.625H9V4.5H3.9375V5.625ZM3.9375 9.5625H14.0625V8.4375H3.9375V9.5625Z"
                        fill={screenMode === 'dark' ? '#F07575' : '#D16161'}
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="statistic-body__desc">
                      <span>{statistical.postCount}</span> bài viết
                    </p>
                  </div>
                </Flex>
              </Flex>
            </Flex>
          </StyledStatistic>
        </AreaCustom>
        <AreaCustom label="Đang theo dõi">
          <StyledFollowing screen_mode={screenMode}>
            <Flex vertical gap={20}>
              {filterFlGroup?.length > 0 && (
                <div>
                  <Flex vertical gap={8}>
                    {showMoreFlTopic
                      ? filterFlGroup.map((item, index) => {
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
                        })
                      : filterFlGroup.slice(0, 5).map((item, index) => {
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
              {filterFlGroup.length > 5 && (
                <div
                  onClick={() => setShowMoreFlTopic(!showMoreFlTopic)}
                  className="more"
                >
                  <span>{showMoreFlTopic ? 'Thu gọn' : 'Xem thêm'}</span>
                </div>
              )}
            </Flex>
          </StyledFollowing>
        </AreaCustom>
        {/* <AreaCustom label="Bài viết">
          <Flex vertical wrap={'wrap'} gap={10}>
            {followingPosts.length > 0 && (
              <Flex vertical gap={10}>
                {followingPosts.map((item) => {
                  return <FollowingPostItem key={item.post_id} data={item} />;
                })}
              </Flex>
            )}
            <div className="more">Xem thêm</div>
          </Flex>
        </AreaCustom> */}
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
        <Modal
          open={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          footer={false}
          width={600}
          closable={false}
        >
          <StyledFriendsModal>
            <div className="head">
              <h4>DANH SÁCH BẠN BÈ</h4>
              <div className="close-btn" onClick={() => setShowModal(false)}>
                <CloseOutlined style={{ fontSize: '19px' }} />
              </div>
            </div>
            <div className="body">
              <p className="friend-count">Số bạn bè: {friends.length}</p>
              <ul className="friend-list">
                {friends.length > 0 &&
                  friends.map((friend) => {
                    return (
                      <li className="friend-item" key={friend.userId}>
                        <div className="left-item">
                          <Avatar
                            shape="square"
                            size={55}
                            src={friend.avatar}
                          />
                          <div className="user-info">
                            <p>{friend.name}</p>
                            <span>Thành viên rất tích cực</span>
                          </div>
                        </div>
                        <div className="right-item">
                          {/* <Button className="follow-btn btn">Kết bạn</Button> */}
                          <Button className="unfollow-btn btn">
                            Hủy kết bạn
                          </Button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </StyledFriendsModal>
        </Modal>
      </Space>
    </Styles>
  );
};

export default LeftContent;

export const AreaCustom = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  return (
    <AreaCustomStyles screen_mode={screenMode}>
      <h5 className="areaCustom-title">{label}</h5>
      <>{children}</>
    </AreaCustomStyles>
  );
};

// const FollowingCard = ({
//   title,
//   type,
//   data,
// }: {
//   title: string;
//   type: 'forum' | 'post';
//   data: IForum[] | IPost[];
// }) => {
//   return (
//     <div>
//       <Title
//         level={5}
//         style={{
//           marginBottom: 8,
//           fontSize: '16px',
//           color: 'white',
//           fontWeight: '600',
//           textTransform: 'uppercase',
//         }}
//       >
//         {title}
//       </Title>
//       <Flex vertical gap={10}>
//         {data.map((item) => {
//           return (
//             <FollowingItem
//               key={item.forum_id}
//               title={item.name}
//               count={item.count}
//               type={type}
//               imageUrl={item.image_url}
//             />
//           );
//         })}
//       </Flex>
//     </div>
//   );
// };
const FollowingForumItem = ({ data }: { data: IForum }) => {
  const { image_url, name, post_count, forum_id } = data;
  return (
    <Link
      to={`/cong-dong/forum/following-forums/${forum_id}`}
      state={{ forum: data }}
    >
      <FollowingItemStyles>
        <div className="cardItem-body__image">
          <img
            src={image_url}
            alt=""
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
            }}
          />
        </div>
        <div>
          <h5 className="cardItem-body__title">{name}</h5>
          <div className="cardItem-body__desc">
            {post_count}
            <span>bài viết</span>
            <span className="trending">Trending</span>
          </div>
        </div>
      </FollowingItemStyles>
    </Link>
  );
};

const FollowingPostItem = ({ data }: { data: IPost }) => {
  const { image_url, title, post_id, comment_count } = data;
  return (
    <Link to={`/cong-dong/forum/forum/${post_id}`} state={{ post: data }}>
      <FollowingItemStyles>
        <div className="cardItem-body__image">
          <img
            src={image_url}
            alt=""
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
            }}
          />
        </div>
        <div>
          <h5 className="cardItem-body__title">{title}</h5>
          <div className="cardItem-body__desc">{comment_count} bình luận</div>
        </div>
      </FollowingItemStyles>
    </Link>
  );
};
export const FriendItem = ({ data }: { data: IFriend }) => {
  const { avatar, name, isOnline, userId } = data;
  return (
    <FriendItemStyles>
      <Link
        to={{ pathname: `/cong-dong/profile/${userId}` }}
        state={{ user: data }}
        className="friendItem-body__image"
      >
        <Avatar
          src={avatar}
          shape="square"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
          }}
        />
      </Link>
    </FriendItemStyles>
  );
};
