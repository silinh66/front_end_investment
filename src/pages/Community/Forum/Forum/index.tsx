/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Flex,
  Input,
  Select,
  Skeleton,
  Tabs,
  Tooltip,
} from 'antd';
import { StyledCreatePost, StyledForum, StyledSocialNetwork } from './styled';
import { useEffect, useState } from 'react';
import { AndroidOutlined } from '@ant-design/icons';
// import Thread from '@/components/Thread';
import PostItem from '@/components/PostItem';

import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import Paginator from '@/components/Pagination';
import {
  getAllSocialPosts,
  getFeaturedPosts,
  getNews,
  likePostCompany,
  postPost,
  unlikePostCompany,
} from '@/services/servicesApi/serviceApi';
import { IFeaturedPost, IPost } from '@/types/postsType';
import FeaturedPost from '@/components/FeaturedPost';
import { FeaturedPostMost } from '@/components/FeaturedPostMost';
import { CarouselPost } from '@/components/Carousel';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { refreshAPI } from '@/redux/app';
import { sortByCreatedAt } from '@/utils/helper';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd/lib';
import InfiniteScroll from 'react-infinite-scroll-component';
const SocialIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M14 2.50312C14 1.47681 12.9924 0.753609 12.0201 1.08197L1.02008 4.7966C0.410426 5.00248 0 5.57427 0 6.21776V7.78323C0 8.42595 0.409472 8.99725 1.01813 9.20372L3 9.87603V11C3 12.6568 4.34315 14 6 14C7.35497 14 8.50014 13.1017 8.87246 11.8681L12.0181 12.9353C12.9909 13.2652 14 12.5419 14 11.5148V2.50312ZM4 10.2153L7.9244 11.5465C7.6866 12.3854 6.91507 13 6 13C4.89543 13 4 12.1045 4 11V10.2153Z"
      fill="white"
    />
  </svg>
);
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M12.4161 4.82735L8.94482 4.32286L7.39306 1.17696C7.35068 1.09083 7.28095 1.0211 7.19482 0.978716C6.97881 0.872075 6.71631 0.960943 6.6083 1.17696L5.05654 4.32286L1.58525 4.82735C1.48955 4.84102 1.40205 4.88614 1.33506 4.9545C1.25407 5.03774 1.20944 5.14973 1.21098 5.26586C1.21251 5.38199 1.26009 5.49276 1.34326 5.57383L3.85478 8.02247L3.26142 11.4801C3.24751 11.5605 3.25641 11.6432 3.28712 11.7189C3.31782 11.7945 3.36911 11.86 3.43515 11.908C3.5012 11.9559 3.57936 11.9845 3.66078 11.9903C3.7422 11.9961 3.82362 11.9789 3.8958 11.9408L7.00068 10.3084L10.1056 11.9408C10.1903 11.9859 10.2888 12.001 10.3831 11.9846C10.621 11.9436 10.781 11.718 10.7399 11.4801L10.1466 8.02247L12.6581 5.57383C12.7265 5.50684 12.7716 5.41934 12.7853 5.32364C12.8222 5.08438 12.6554 4.8629 12.4161 4.82735Z"
      fill="white"
    />
  </svg>
);
const Forum = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <CommunityLayout activeTab={activeTab}>
      <StyledForum $collapsed={activeTab === 1} screen_mode={screenMode}>
        <SocialNetwork />
      </StyledForum>
    </CommunityLayout>
  );
};

export default Forum;

const NewsList = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<IFeaturedPost[]>([]);
  useEffect(() => {
    getNews().then((res) => {
      setNews(res.data.data);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      <CarouselPost />
      <Flex vertical gap={16}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          {news.map((item: any, idx) => (
            <div
              style={{
                width: '500px',
                height: '200px',
                backgroundColor: '#2A2E39',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <h3>
                <Tooltip title={item?.title}>
                  <a href={item?.href} style={{ color: '#fff' }}>
                    {item?.title?.length > 50
                      ? `${item?.title?.slice(0, 50)}...`
                      : item?.title}
                  </a>
                </Tooltip>
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <a href={item?.href}>
                  <img
                    src={item?.thumbnailUrl}
                    alt="image"
                    style={{ width: '100px', height: '100px' }}
                  />
                </a>

                <p style={{ color: '#fff' }}>{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Flex>
    </>
  );
};
const FeaturedThreadList = () => {
  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState<IFeaturedPost[]>([]);
  useEffect(() => {
    getFeaturedPosts().then((res) => {
      if (res && res.status === 200) {
        setFeaturedPosts(res.data.posts);
      } else {
      }
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      <CarouselPost />
      <FeaturedPostMost featuredPosts={featuredPosts} />
      <Flex vertical gap={16}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {featuredPosts.map((item, idx) => (
            <FeaturedPost post={item} key={idx} id={idx} loading={loading} />
          ))}
        </div>
        <Paginator />
      </Flex>
    </>
  );
};

const SocialNetwork = () => {
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  const [sortLike, setSortLike] = useState('newest');
  const [page, setPage] = useState<number>(1);

  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const [loading, setLoading] = useState(true);
  const [isUploading, setUploading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const location = useLocation();
  useEffect(() => {
    const tab = location.state?.tab || 'moi-nhat';
    switch (tab) {
      case 'moi-nhat':
        setSortLike('newest');
        break;
      case 'nhieu-tuong-tac':
        setSortLike('more-interaction');
        break;

      default:
        break;
    }
  }, [location]);
  // const sortedPosts = [...posts]);
  const listPosts = async (sortLike, page) => {
    setLoading(true);
    try {
      const res = await getAllSocialPosts(page, sortLike); // Truyền sortLike vào API call
      if (res && res.status === 200) {
        setLoading(false);
        if (page === 1) {
          // Nếu đang ở trang đầu tiên thì làm mới posts
          setPosts(res.data.topics);
        } else {
          // Nếu không phải trang đầu tiên thì thêm bài viết mới vào
          setPosts((prevPosts) => [...prevPosts, ...res.data.topics]);
        }
        setHasMore(res.data.totalTopics > res.data.topics.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    listPosts(sortLike, 1);
  }, [sortLike]);

  const fetchData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Tăng trang khi kéo xuống
      listPosts(sortLike, page + 1); // Fetch thêm dữ liệu
    }
  };
  const likeAction = (post) => {
    if (user) {
      likePostCompany(post?.topic_id).then((res) => {
        if (res && res.status === 200) {
          // Cập nhật trạng thái nút like ngay lập tức
          setPosts((prevPosts) =>
            prevPosts.map((p) =>
              p.topic_id === post.topic_id
                ? {
                    ...p,
                    like_count: p.like_count + 1,
                    likes: [...p.likes, { userId: user.userID }], // Thêm người dùng vào danh sách likes
                  }
                : p
            )
          );
        }
      });
    } else {
      openNotification();
    }
  };

  const unLikeAction = (post) => {
    unlikePostCompany(post?.topic_id).then((res) => {
      if (res && res.status === 200) {
        // Cập nhật trạng thái nút unlike ngay lập tức
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.topic_id === post.topic_id
              ? {
                  ...p,
                  like_count: p.like_count - 1,
                  likes: p.likes.filter((item) => item.userId !== user?.userID), // Xóa người dùng khỏi danh sách likes
                }
              : p
          )
        );
      }
    });
  };

  return (
    <StyledSocialNetwork screen_mode={screenMode}>
      {/* {user && <CreatePost />} */}
      {isUploading && (
        <div className="skeleton">
          <div className="placeholder title"></div>
          <div className="placeholder content"></div>
        </div>
      )}
      <Flex style={{ width: '610px' }} vertical gap={8}>
        <div className="filter-post">
          <div
            className={`btn-filter ${sortLike === 'newest' ? 'active' : ''}`}
            onClick={() => {
              setSortLike('newest');
            }}
          >
            Mới nhất
          </div>
          <div
            className={`btn-filter ${
              sortLike === 'more-interaction' ? 'active' : ''
            }`}
            onClick={() => {
              setSortLike('more-interaction');
            }}
          >
            Nhiều tương tác
          </div>
        </div>
        <div
          className="list-post-scroll"
          id="scrollable-posts"
          style={{ overflowY: 'auto', height: '80vh' }}
        >
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 4 }} />}
            endMessage={
              <div style={{ textAlign: 'center' }}>Không còn dữ liệu.</div>
            }
            scrollableTarget="scrollable-posts"
          >
            {posts.length > 0 &&
              posts.map((post, idx) => (
                <PostItem
                  key={idx}
                  id={idx}
                  loading={loading}
                  post={post}
                  likeAction={likeAction} // Truyền hàm likeAction vào PostItem
                  unLikeAction={unLikeAction}
                  api={listPosts}
                />
              ))}
          </InfiniteScroll>
        </div>
      </Flex>
    </StyledSocialNetwork>
  );
};

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.app);
  const [value, setValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const handlePost = () => {
    setUploading(true);
    postPost({
      title: 'Xin chào',
      content: value,
      image_url:
        'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
    })
      .then((res) => {
        if (res && res.status === 200) {
          setValue('');
          dispatch(refreshAPI());
          setUploading(false);
        }
      })
      .catch((err) => {
        setUploading(false);
      });
  };
  const handleChange = (value: string) => {};
  return (
    <StyledCreatePost screen_mode={screenMode}>
      <Flex
        align="center"
        gap={12}
        style={{ padding: '12px 0', marginBottom: '16px' }}
      >
        <Select
          className="tabs"
          defaultValue="new"
          // style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: 'new', label: 'Mới nhất' },
            { value: 'hot', label: 'Nhiều tương tác nhất' },
          ]}
        />
      </Flex>
    </StyledCreatePost>
  );
};
const listTab = [
  // {
  //   icon: ,
  //   text: '',
  //   id: 0,
  //   view: <SocialNetwork />,
  // },
  // {
  //   icon: <StarIcon />,
  //   text: 'Tin tức',
  //   id: 2,
  //   view: <NewsList />,
  // },
];
