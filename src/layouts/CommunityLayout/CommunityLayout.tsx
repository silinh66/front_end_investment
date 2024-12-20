/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row, Col, Flex, ConfigProvider, Menu } from 'antd';
// import Icon1 from '@/assets/icons/community_global.svg';
// import Icon2 from '@/assets/icons/community_fund.svg';
// import Icon3 from '@/assets/icons/community_message.svg';
import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import MessageUser from './MessageUser';
import LeftContent from './LeftContent';

import RightContent from './RightContent';
// import Notice from '@/components/Notice';
// import Forum from '@/pages/Community/Forum/Forum';
// import Search from '@/pages/Community/Forum/Search';
// import FollowingForum from '@/pages/Community/Forum/FollowingForum';
// import FollowingConcept from '@/pages/Community/Forum/FollowingConcept';
// import NewConcepts from '@/pages/Community/WhatOnToday/NewConcepts';
// import CurrentPosts from '@/pages/Community/WhatOnToday/CurrentPosts';
// import News from '@/pages/Community/News';
import {
  GlobalOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { StyledCommunityLayout } from './styled';

import type { MenuProps } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
const QuestionIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="icon/filled/suggested/question-circle">
      <path
        id="Vector"
        d="M7 1.375C3.61758 1.375 0.875 4.11758 0.875 7.5C0.875 10.8824 3.61758 13.625 7 13.625C10.3824 13.625 13.125 10.8824 13.125 7.5C13.125 4.11758 10.3824 1.375 7 1.375ZM7 11.0547C6.69785 11.0547 6.45312 10.81 6.45312 10.5078C6.45312 10.2057 6.69785 9.96094 7 9.96094C7.30215 9.96094 7.54688 10.2057 7.54688 10.5078C7.54688 10.81 7.30215 11.0547 7 11.0547ZM7.85996 8.05371C7.73615 8.10152 7.62961 8.18554 7.55425 8.2948C7.47889 8.40405 7.43821 8.53349 7.4375 8.66621V8.97656C7.4375 9.03672 7.38828 9.08594 7.32812 9.08594H6.67188C6.61172 9.08594 6.5625 9.03672 6.5625 8.97656V8.68262C6.5625 8.3668 6.6541 8.05508 6.83457 7.79531C7.01094 7.54102 7.25703 7.34688 7.54688 7.23613C8.01172 7.05703 8.3125 6.66738 8.3125 6.24219C8.3125 5.63926 7.72324 5.14844 7 5.14844C6.27676 5.14844 5.6875 5.63926 5.6875 6.24219V6.34609C5.6875 6.40625 5.63828 6.45547 5.57812 6.45547H4.92188C4.86172 6.45547 4.8125 6.40625 4.8125 6.34609V6.24219C4.8125 5.70488 5.04766 5.20313 5.47422 4.82988C5.88438 4.47031 6.42578 4.27344 7 4.27344C7.57422 4.27344 8.11562 4.47168 8.52578 4.82988C8.95234 5.20313 9.1875 5.70488 9.1875 6.24219C9.1875 7.03242 8.6666 7.74336 7.85996 8.05371Z"
        fill="white"
      />
    </g>
  </svg>
);
const GlobalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 15"
    fill="none"
  >
    <path
      d="M11.6813 11.4498C11.684 11.4457 11.6881 11.4416 11.6908 11.4375C12.5863 10.3725 13.125 8.9998 13.125 7.5C13.125 6.0002 12.5863 4.62754 11.6922 3.5625C11.6895 3.5584 11.6854 3.55566 11.6826 3.55156C11.6676 3.53379 11.6539 3.51738 11.6389 3.50098C11.6334 3.49414 11.6279 3.48867 11.6225 3.48184L11.5664 3.41758L11.565 3.41621C11.5445 3.39297 11.5227 3.36973 11.5021 3.34648L11.5008 3.34512C11.457 3.29863 11.4133 3.25215 11.3682 3.20703L11.3668 3.20566L11.3012 3.14004L11.2971 3.13594C11.2766 3.11543 11.2561 3.09629 11.2355 3.07715C11.2287 3.07031 11.2219 3.06348 11.2137 3.05664C11.2 3.04297 11.1863 3.03066 11.1727 3.01836C11.1686 3.01426 11.1631 3.01016 11.159 3.00469C10.068 1.99297 8.60645 1.375 7 1.375C5.39355 1.375 3.93203 1.99297 2.83965 3.00469C2.83555 3.00879 2.83008 3.01289 2.82598 3.01836C2.8123 3.03066 2.79863 3.04434 2.78496 3.05801C2.77812 3.06484 2.77129 3.07168 2.76309 3.07852C2.74258 3.09766 2.72207 3.11816 2.70156 3.1373L2.69746 3.14141L2.63184 3.20703L2.63047 3.2084C2.58535 3.25352 2.5416 3.3 2.49785 3.34648L2.49648 3.34785C2.47461 3.37109 2.4541 3.39434 2.43359 3.41758L2.43223 3.41895C2.41309 3.43945 2.39395 3.46133 2.37617 3.4832C2.3707 3.49004 2.36523 3.49551 2.35977 3.50234C2.34473 3.51875 2.33105 3.53652 2.31602 3.55293C2.31328 3.55703 2.30918 3.55977 2.30645 3.56387C1.41367 4.62754 0.875 6.0002 0.875 7.5C0.875 8.9998 1.41367 10.3725 2.30781 11.4375C2.31055 11.4416 2.31465 11.4457 2.31738 11.4498L2.35977 11.5004C2.36523 11.5072 2.3707 11.5127 2.37617 11.5195L2.43223 11.5838C2.43223 11.5852 2.43359 11.5852 2.43359 11.5865C2.4541 11.6098 2.47461 11.633 2.49648 11.6549L2.49785 11.6562C2.5416 11.7027 2.58535 11.7492 2.6291 11.7943L2.63047 11.7957C2.65234 11.8176 2.67285 11.8395 2.69473 11.86L2.69883 11.8641C2.74395 11.9092 2.79043 11.9529 2.83691 11.9953C3.93203 13.007 5.39355 13.625 7 13.625C8.60645 13.625 10.068 13.007 11.1604 11.9953C11.2069 11.9526 11.2525 11.9089 11.2971 11.8641L11.3012 11.86C11.323 11.8381 11.3449 11.8176 11.3654 11.7957L11.3668 11.7943C11.4119 11.7492 11.4557 11.7027 11.498 11.6562L11.4994 11.6549C11.5199 11.6316 11.5418 11.6098 11.5623 11.5865C11.5623 11.5852 11.5637 11.5852 11.5637 11.5838C11.5828 11.5633 11.602 11.5414 11.6197 11.5195C11.6252 11.5127 11.6307 11.5072 11.6361 11.5004C11.6516 11.4839 11.6666 11.467 11.6813 11.4498ZM11.7373 9.5002C11.5486 9.9459 11.2998 10.3588 10.9963 10.7334C10.6545 10.438 10.2807 10.1816 9.88203 9.96914C10.0406 9.32793 10.1391 8.62383 10.165 7.88281H12.127C12.0859 8.44199 11.9547 8.98477 11.7373 9.5002ZM12.127 7.11719H10.165C10.1391 6.37617 10.0406 5.67207 9.88203 5.03086C10.2826 4.81758 10.6559 4.56055 10.9963 4.2666C11.6561 5.07868 12.0507 6.07366 12.127 7.11719ZM9.0002 2.7627C9.54297 2.99238 10.0365 3.30957 10.4713 3.70879C10.2187 3.92384 9.94687 4.11514 9.65918 4.28027C9.44453 3.66504 9.16973 3.13047 8.8498 2.70254C8.90039 2.72168 8.95098 2.74219 9.0002 2.7627ZM7.76152 12.3412C7.63574 12.4396 7.50996 12.5148 7.38281 12.5654V10.0293C7.9253 10.0671 8.45878 10.188 8.96465 10.3875C8.85117 10.7238 8.71992 11.0342 8.56816 11.3145C8.33027 11.7574 8.05137 12.1115 7.76152 12.3412ZM8.56816 3.68555C8.71855 3.96719 8.85117 4.27754 8.96465 4.6125C8.45878 4.81205 7.9253 4.93286 7.38281 4.9707V2.43594C7.50859 2.48652 7.63574 2.56035 7.76152 2.66016C8.05137 2.88848 8.33027 3.24258 8.56816 3.68555ZM7.38281 9.26231V7.88281H9.39941C9.37754 8.48711 9.30234 9.07363 9.17656 9.63008L9.17246 9.64648C8.5987 9.42891 7.99532 9.29938 7.38281 9.26231ZM7.38281 7.11719V5.7377C8.00898 5.69941 8.61055 5.5668 9.17246 5.35352L9.17656 5.36992C9.30234 5.92637 9.37754 6.51152 9.39941 7.11719H7.38281ZM6.61719 7.88281V9.26231C5.99102 9.30059 5.38945 9.4332 4.82754 9.64648L4.82344 9.63008C4.69766 9.07363 4.62246 8.48848 4.60059 7.88281H6.61719ZM4.60059 7.11719C4.62246 6.51289 4.69766 5.92637 4.82344 5.36992L4.82754 5.35352C5.38945 5.5668 5.98965 5.69941 6.61719 5.7377V7.11719H4.60059ZM6.61719 10.0293V12.5641C6.49141 12.5135 6.36426 12.4396 6.23848 12.3398C5.94863 12.1115 5.66836 11.7561 5.43047 11.3131C5.28008 11.0314 5.14746 10.7211 5.03398 10.3861C5.54258 10.1865 6.07168 10.0676 6.61719 10.0293ZM6.61719 4.9707C6.0747 4.93286 5.54122 4.81205 5.03535 4.6125C5.14883 4.27617 5.28008 3.96582 5.43184 3.68555C5.66973 3.24258 5.94863 2.88711 6.23984 2.65879C6.36562 2.56035 6.49141 2.48516 6.61855 2.43457V4.9707H6.61719ZM4.9998 2.7627C5.05039 2.74219 5.09961 2.72168 5.1502 2.70254C4.83027 3.13047 4.55547 3.66504 4.34082 4.28027C4.05371 4.11621 3.78164 3.9248 3.52871 3.70879C3.96348 3.30957 4.45703 2.99238 4.9998 2.7627ZM2.2627 5.4998C2.45137 5.0541 2.7002 4.64121 3.00371 4.2666C3.34414 4.56055 3.71738 4.81758 4.11797 5.03086C3.95938 5.67207 3.86094 6.37617 3.83496 7.11719H1.87305C1.91406 6.55801 2.04531 6.01523 2.2627 5.4998ZM1.87305 7.88281H3.83496C3.86094 8.62383 3.95938 9.32793 4.11797 9.96914C3.71927 10.1816 3.34554 10.438 3.00371 10.7334C2.34395 9.92132 1.94929 8.92634 1.87305 7.88281ZM4.9998 12.2373C4.45703 12.0076 3.96348 11.6904 3.52871 11.2912C3.78164 11.0752 4.05371 10.8852 4.34082 10.7197C4.55547 11.335 4.83027 11.8695 5.1502 12.2975C5.09961 12.2783 5.04902 12.2578 4.9998 12.2373ZM9.0002 12.2373C8.94961 12.2578 8.90039 12.2783 8.8498 12.2975C9.16973 11.8695 9.44453 11.335 9.65918 10.7197C9.94629 10.8838 10.2184 11.0752 10.4713 11.2912C10.0389 11.6888 9.54128 12.0088 9.0002 12.2373Z"
      fill="white"
    />
  </svg>
);
const parentNavs: MenuProps['items'] = [
  {
    icon: (
      <div
        style={{
          width: '18px',
          height: '18px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#42A732',
          borderRadius: '50%',
        }}
      >
        <StarFilled style={{ fontSize: '14px' }} />
      </div>
    ),
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/forum/forum' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Diễn đàn</>
        </NavLink>
      </>
    ),
    key: 'forum',
  },
  {
    icon: (
      <div
        style={{
          width: '18px',
          height: '18px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#42A732',
          borderRadius: '50%',
        }}
      >
        <QuestionIcon />
      </div>
    ),
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/what-on-today/new-concepts' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Hôm nay có gì</>
        </NavLink>
      </>
    ),
    key: 'what-on-today',
  },

  {
    icon: (
      <div
        style={{
          width: '18px',
          height: '18px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#42A732',
          borderRadius: '50%',
        }}
      >
        {' '}
        <GlobalIcon />
      </div>
    ),
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/news' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Bảng tin</>
        </NavLink>
      </>
    ),
    key: 'news',
  },
  // {
  //   icon: (
  //     <div
  //       style={{
  //         width: '18px',
  //         height: '18px',
  //         display: 'inline-flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: '#42A732',
  //         borderRadius: '50%',
  //       }}
  //     >
  //       {' '}
  //       <GlobalOutlined />
  //     </div>
  //   ),
  //   label: (
  //     <>
  //       <NavLink
  //         to={{ pathname: '/cong-dong/approval/member-and-post-approval' }}
  //         end
  //         className={({ isActive, isPending }) =>
  //           `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
  //         }
  //       >
  //         <>Xét duyệt</>
  //       </NavLink>
  //     </>
  //   ),
  //   key: 'approval',
  // },
];
const forumChildNavs: MenuProps['items'] = [
  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/forum/forum' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Diễn đàn</>
        </NavLink>
      </>
    ),
    key: 'forum',
  },
  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/forum/search' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Tìm kiếm</>
        </NavLink>
      </>
    ),
    key: 'search',
  },

  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/forum/following-forums' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Diễn đàn đang theo dõi</>
        </NavLink>
      </>
    ),
    key: 'following-forums',
  },
  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/forum/following-concepts' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Chủ đề đang theo dõi</>
        </NavLink>
      </>
    ),
    key: 'following-concepts',
  },
];
const whatOnTodayChildNavs: MenuProps['items'] = [
  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/what-on-today/new-concepts' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Các chủ đề mới</>
        </NavLink>
      </>
    ),
    key: 'new-concepts',
  },
  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/what-on-today/current-posts' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Bài viết gần đây</>
        </NavLink>
      </>
    ),
    key: 'current-posts',
  },
];

const approvalChildNavs: MenuProps['items'] = [
  {
    label: (
      <>
        <NavLink
          to={{ pathname: '/cong-dong/approval/member-and-post-approval' }}
          end
          className={({ isActive, isPending }) =>
            `${isPending ? 'pending' : isActive ? 'active' : ''} tab-content`
          }
        >
          <>Xét duyệt thành viên/ bài viết</>
        </NavLink>
      </>
    ),
    key: 'member-and-post-approval',
  },
];
const CommunityLayout = ({
  children,
  hideSide,
  activeTab,
}: {
  children: React.ReactNode;
  hideSide?: 'left' | 'right' | 'both';
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const [isLogin] = useState(false);
  const [selectChildMenu, setSelectChildMenu] = useState();
  const location = useLocation();
  const currentPath = location.pathname.split('/');
  const activeParentTab = currentPath[2];
  const activeChildTab = currentPath[3];
  const [off, setOff] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setOff(false);
    } else {
      setOff(true);
    }
  }, [token]);
  const childNavs = useMemo(() => {
    if (activeParentTab === 'forum') {
      return forumChildNavs;
    } else if (activeParentTab === 'what-on-today') {
      return whatOnTodayChildNavs;
    } else if (activeParentTab === 'approval') {
      return approvalChildNavs;
    } else {
      return [];
    }
  }, [activeParentTab]);

  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {}, [activeTab]);
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLogin(true);
  //   }, 500);
  // }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: 'transparent',
            itemColor: 'white',
            itemSelectedColor: 'white',
            horizontalItemGutter: 0,
          },
          Table: {
            rowHoverBg: 'rgba(66, 167, 50, 0.10)',
            headerSplitColor: 'transparent',
            borderColor: 'transparent',
          },
        },
      }}
    >
      <StyledCommunityLayout screen_mode={screenMode}>
        <div className="navs">
          {/* <div className="parent-navs">
            <Menu
              selectedKeys={[activeParentTab!]}
              mode="horizontal"
              items={parentNavs}
              style={{
                background: 'transparent',
                color: 'white',
                fontSize: '18px',
              }}
            />
          </div>
          {activeParentTab === 'forum' && (
            <div className="menu-navs">
              {forumChildNavs.map((item, index) => {
                const isActive =
                  location.pathname ===
                  item.label.props.children.props.to.pathname;
                const itemClass = isActive ? ' item-true' : 'item-menu';
                return <div className={itemClass}>{item.label}</div>;
              })}
            </div>
          )} */}

          {off && (
            <div className="child-navs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M18 2.25C9.30234 2.25 2.25 9.30234 2.25 18C2.25 26.6977 9.30234 33.75 18 33.75C26.6977 33.75 33.75 26.6977 33.75 18C33.75 9.30234 26.6977 2.25 18 2.25ZM18 31.0781C10.7789 31.0781 4.92188 25.2211 4.92188 18C4.92188 10.7789 10.7789 4.92188 18 4.92188C25.2211 4.92188 31.0781 10.7789 31.0781 18C31.0781 25.2211 25.2211 31.0781 18 31.0781Z"
                  fill="white"
                />
                <path
                  d="M16.3125 24.1875C16.3125 24.6351 16.4903 25.0643 16.8068 25.3807C17.1232 25.6972 17.5524 25.875 18 25.875C18.4476 25.875 18.8768 25.6972 19.1932 25.3807C19.5097 25.0643 19.6875 24.6351 19.6875 24.1875C19.6875 23.7399 19.5097 23.3107 19.1932 22.9943C18.8768 22.6778 18.4476 22.5 18 22.5C17.5524 22.5 17.1232 22.6778 16.8068 22.9943C16.4903 23.3107 16.3125 23.7399 16.3125 24.1875ZM17.1562 20.25H18.8438C18.9984 20.25 19.125 20.1234 19.125 19.9688V10.4062C19.125 10.2516 18.9984 10.125 18.8438 10.125H17.1562C17.0016 10.125 16.875 10.2516 16.875 10.4062V19.9688C16.875 20.1234 17.0016 20.25 17.1562 20.25Z"
                  fill="white"
                />
              </svg>
              Bạn không thể bình luận trên diễn đàn, để có thể thực hiện bình
              luận bạn phải đăng nhập tài khoản.
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  width: '38.9%',
                  cursor: 'pointer',
                }}
                onClick={() => setOff(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M13.1541 12L18.9578 5.28129C19.0551 5.16963 18.9733 5 18.8229 5H17.0586C16.9547 5 16.8552 5.04509 16.7867 5.12239L12 10.6644L7.21332 5.12239C7.147 5.04509 7.0475 5 6.94138 5H5.17705C5.02671 5 4.9449 5.16963 5.04218 5.28129L10.8459 12L5.04218 18.7187C5.02039 18.7436 5.00641 18.774 5.0019 18.8064C4.99739 18.8388 5.00254 18.8717 5.01674 18.9014C5.03094 18.931 5.0536 18.956 5.08201 18.9735C5.11043 18.991 5.14341 19.0002 5.17705 19H6.94138C7.04529 19 7.14479 18.9549 7.21332 18.8776L12 13.3356L16.7867 18.8776C16.853 18.9549 16.9525 19 17.0586 19H18.8229C18.9733 19 19.0551 18.8304 18.9578 18.7187L13.1541 12Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        {/* <Notice message="Bạn không thể bình luận trên diễn đàn, để có thể thực hiện bình luận bạn phải đăng nhập tài khoản." /> */}
        {hideSide === 'left' && (
          <Row
            style={{ display: 'flex', justifyContent: 'space-between' }}
            gutter={24}
          >
            <Col span={isLogin ? 12 : 18}>
              <Flex
                justify="center"
                style={{ borderRadius: '8px', overflow: 'hidden', flexGrow: 1 }}
              >
                {children}
              </Flex>
            </Col>
            <Col span={isLogin ? 2 : 0}>
              <MessageUser />
            </Col>
            <Col span={6}>
              <RightContent />
            </Col>
          </Row>
        )}

        {
          !hideSide && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: '8px',
                justifyContent: 'space-between',
              }}
            >
              <LeftContent />

              <Flex justify="center" className="center-layout">
                {children}
              </Flex>

              <RightContent />
            </div>
          )

          // <Row gutter={24}>
          //   <Col span={5}>
          //     <LeftContent />
          //   </Col>
          //   <Col span={isLogin ? 11 : 13}>
          //     <Flex
          //       justify="center"
          //       style={{ borderRadius: '8px', overflow: 'hidden' }}
          //     >
          //       {children}
          //     </Flex>
          //   </Col>
          //   <Col span={isLogin ? 2 : 0}>
          //     <MessageUser />
          //   </Col>
          //   <Col span={6}>
          //     <RightContent />
          //   </Col>
          // </Row>
        }

        {hideSide === 'both' && (
          <div style={{ overflow: 'hidden' }}>{children}</div>
        )}
      </StyledCommunityLayout>
    </ConfigProvider>
  );
};
export default CommunityLayout;
