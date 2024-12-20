/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import { StyledCompanyDetail, StyledCreatePost } from './styled';
import { shallowEqual, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { screenModeSelector } from '@/redux/screen/selector';
import ImageDefault from '/default.jpg';
import { useParams } from 'react-router-dom';
import api from '@/config/api';
import { Button, Flex, Input, Modal } from 'antd';
import { makeUploadImage } from '@/components/ConvertLinkImage';
import axios from 'axios';
import { config } from '@/config/env';
import { selectAppSelector } from '@/redux/app/selector';
import Paginator from '@/components/Pagination';
import Post from '@/components/PostItem';
import { InfoCompany } from '../InfoCompany/InfoCompany';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoAddSharp } from 'react-icons/io5';
import { ModalCreate } from '@/components/modals/ModalCreate/ModalCreate';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getListFollowingGroup,
  likePostCompany,
  postFollowTopic,
  postUnFollowTopic,
  unlikePostCompany,
} from '@/services/servicesApi/serviceApi';
import { refreshAPI } from '@/redux/app';
import { sortByCreatedAt } from '@/utils/helper';
import dayjs from 'dayjs';
import moment from 'moment';
import { convertDate } from '@/components/ConvertDate';
import InfiniteScroll from 'react-infinite-scroll-component';

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#0861F2',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 500,
  color: '#fff',
  fontSize: '14px',
  cursor: 'pointer',
};
const btnDisable = {
  padding: '10px 16px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 500,
  color: 'rgba(87, 90, 106, 1)',
  fontSize: '14px',
  cursor: 'pointer',
};
const buttonHoverStyle = {
  backgroundColor: 'rgb(29 87 182)',
};
export const Company = () => {
  const { id } = useParams();
  const user = useSelector(selectAppSelector, shallowEqual);
  const { refresh, isLogin } = useAppSelector((state: RootState) => state.app);
  const [listPostCompany, setListPostCompany] = useState([]);
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [openStock, setOpenStock] = useState<boolean>(false);
  const [dataClosedSession, setDataClosedSession] = useState<any>([]);
  useEffect(() => {
    if (openStock === false) {
      const dayClosedSession = new Date().toLocaleDateString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      const formattedDate = dayjs(dayClosedSession).format('DD/MM/YYYY');
      const encodedDate = encodeURIComponent(formattedDate);
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=1&pageSize=20&fromDate=${dayStart}&toDate=${dayEnd}`
      //   )
      //   .then((res) => {
      //     setDataClosedSession(res?.data?.data[0]);
      //   })
      //   .catch((err) => {
      //   });
      const date = new Date();
      const dateMin = moment(date).subtract(5, 'days').format('DD/MM/YYYY');
      axios
        .get(
          `${
            config.app.VITE_APP_API_URL
          }/DailyStockPrice?symbol=${id}&fromDate=${dateMin}&toDate=${convertDate(
            date
          )}`
          // `${
          //   config.app.VITE_APP_API_URL
          // }/DailyStockPrice?symbol=${company}&fromDate=${convertDateMin(
          //   date
          // )}&toDate=${convertDate(date)}`
        )
        .then((res) => {
          const dataCloseSession = res?.data?.data.pop();
          setDataClosedSession(dataCloseSession);
        })
        .catch((err) => {});
    }
  }, [id, openStock]);
  const [tab, setTab] = useState('congdong');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [disable, setDisable] = useState(true);
  const [description, setDescription] = useState('');
  const [followingGroup, setFollowingGroup] = useState<any>([]);
  const [companyData, setcompanyData] = useState<any>();
  const [modal2Open, setModal2Open] = useState(false);
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const token = localStorage.getItem('token');
  const [style, setStyle] = React.useState(buttonStyle);
  const [filterOptions] = useState(['Nổi bật nhất', 'Tương tác nhất']);
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      const openTime = '09:15:00';
      const closeTime = '14:30:00';
      const middleBreakTime = '11:30:00';
      const middleBreakTimeEnd = '13:00:00';
      // if (now >= openTime && now <= closeTime) {
      //   setOpenStock(true);
      // } else {
      //   setOpenStock(false);
      // }
      if (now >= openTime && now <= middleBreakTime) {
        setOpenStock(true);
      } else if (now >= middleBreakTimeEnd && now <= closeTime) {
        setOpenStock(true);
      } else {
        setOpenStock(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const getList = () => {
    if (!hasMore) return; // Prevent fetching if there's no more data

    setLoading(true);

    // Determine the sort parameter based on selectedOption
    let sortParam = '';
    if (selectedOption === 'Nổi bật nhất') {
      sortParam = 'newest'; // Assuming 'newest' is recognized by your API
    } else if (selectedOption === 'Tương tác nhất') {
      sortParam = 'most_interacted'; // Assuming 'most_interacted' is recognized by your API
    }

    // Construct the API URL with pagination and sorting
    const apiUrl = `${config.app.VITE_APP_API_URL}/getTopics/${id}`;
    const params = {
      page: currentPage,
      limit: itemPerPage,
      sort: sortParam,
    };

    axios
      .get(apiUrl, { params })
      .then((res) => {
        setLoading(false);
        const newPosts = res?.data?.topics || [];

        // Update the list of posts
        setListPostCompany((prevPosts) => [...prevPosts, ...newPosts]);

        // Determine if there's more data to load
        if (newPosts.length < itemPerPage) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error('Error fetching posts:', err);
      });
  };
  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
    getList(); // Fetch next set of posts
  };
  useEffect(() => {
    // Reset states
    setListPostCompany([]);
    setCurrentPage(1);
    setHasMore(true);

    // Fetch the first page of data with the new sorting
    getList();
  }, [selectedOption, id]);

  useEffect(() => {
    if (token) {
      getListFollowingGroup().then((res) => {
        if (res && res.status === 200) {
          setFollowingGroup(res?.data?.data);
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
  const groupFollow = filterFlGroup.map((item) => item.symbol);

  useEffect(() => {
    if (description !== '' && title !== '') {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [description, title]);
  useEffect(() => {
    getList();
  }, [id]);
  useEffect(() => {
    api.get(`/company-info?symbol=${id}`).then((resCompanyData) => {
      setcompanyData(resCompanyData?.data?.data[0]);
    });
  }, [id]);
  const screenMode = useSelector(screenModeSelector);
  const hideModal = () => {
    setModal2Open(false);
    setTitle('');
    setDescription('');
  };
  const submit = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/createTopic`,
        {
          title: `${id} - ${title}`,
          image: image,
          symbol_name: id,
          description: description,
          userId: user?.user ? user?.user?.userID : null,
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
        if (res.status === 200) {
          setModal2Open(false);
          setTitle('');
          setDescription('');
          getList();
        }
      });
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDes = (value) => {
    setDescription(value);
  };
  const sortedPosts = [...listPostCompany].sort((a, b) => {
    if (b.like_count !== a.like_count) {
      return b.like_count - a.like_count; // Sắp xếp theo số lượng like từ lớn đến bé
    }
    return new Date(a.created_at) - new Date(b.created_at); // Sắp xếp thời gian từ bé đến lớn nếu like_count bằng nhau
  });
  const isGreen = dataClosedSession?.PriceChange >= 0;
  const itemPerPage = 10;
  const loader = useRef(null);

  const displayedPosts =
    listPostCompany.length > 0 && selectedOption === 'Nổi bật nhất'
      ? sortedPosts.reverse().slice(0, currentPage * itemPerPage)
      : sortByCreatedAt(listPostCompany)
          .reverse()
          .slice(0, currentPage * itemPerPage);
  const likeAction = (post) => {
    if (user) {
      likePostCompany(post?.topic_id).then((res) => {
        if (res && res.status === 200) {
          // Cập nhật trạng thái nút like ngay lập tức
          setListPostCompany((prevPosts) =>
            prevPosts.map((p) =>
              p.topic_id === post.topic_id
                ? {
                    ...p,
                    like_count: p.like_count + 1,
                    likes: [...p.likes, { userId: user?.user?.userID }], // Thêm người dùng vào danh sách likes
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
        setListPostCompany((prevPosts) =>
          prevPosts.map((p) =>
            p.topic_id === post.topic_id
              ? {
                  ...p,
                  like_count: p.like_count - 1,
                  likes: p.likes.filter(
                    (item) => item.userId !== user?.user?.userID
                  ), // Xóa người dùng khỏi danh sách likes
                }
              : p
          )
        );
      }
    });
  };
  return (
    <CommunityLayout>
      <StyledCompanyDetail screen_mode={screenMode}>
        <div className="wrapper">
          <div
            style={{
              backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
            }}
            className="info-company"
          >
            <img
              className="banner-company"
              src={
                `https://cdn02.wigroup.vn/logo_company/${id}.jpeg` ||
                ImageDefault
              }
              alt=""
            />
            <div className="header">
              <div className="title">{companyData?.companyName}</div>
              <div className="box-btn-header">
                {groupFollow.includes(companyData?.symbol) ? (
                  <div className="btn-is-join">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3337 1L5.00033 8.33333L1.66699 5"
                        stroke={screenMode === 'dark' ? '#99FFDD' : '#0F8A61'}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Đã tham gia
                  </div>
                ) : (
                  <div
                    className="btn-join"
                    onClick={() => handleFollowTopic(companyData?.symbol)}
                  >
                    Tham gia
                  </div>
                )}
                {groupFollow.includes(companyData?.symbol) && (
                  <div
                    onClick={() => handleUnFollowTopic(companyData?.symbol)}
                    className="leave-group"
                  >
                    Rời nhóm
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <Flex vertical gap={16}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div className="create-post">
                  <button
                    className="btn-create"
                    onClick={() => setModal2Open(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 0C8.27614 0 8.5 0.223858 8.5 0.5V7.5H15.5C15.7761 7.5 16 7.72386 16 8C16 8.27614 15.7761 8.5 15.5 8.5H8.5V15.5C8.5 15.7761 8.27614 16 8 16C7.72386 16 7.5 15.7761 7.5 15.5V8.5H0.5C0.223858 8.5 0 8.27614 0 8C0 7.72386 0.223858 7.5 0.5 7.5H7.5V0.5C7.5 0.223858 7.72386 0 8 0Z"
                        fill="white"
                      />
                    </svg>{' '}
                    Tạo chủ đề mới
                  </button>
                  <div onClick={toggleDropdown} className="filter-drop">
                    <div
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '6px',
                        alignItems: 'center',
                      }}
                    >
                      {selectedOption}
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.410419 0.910093C0.735856 0.584656 1.26349 0.584656 1.58893 0.910093L5.99967 5.32084L10.4104 0.910093C10.7359 0.584656 11.2635 0.584656 11.5889 0.910093C11.9144 1.23553 11.9144 1.76317 11.5889 2.0886L6.58893 7.0886C6.26349 7.41404 5.73586 7.41404 5.41042 7.0886L0.410419 2.0886C0.0849819 1.76317 0.0849819 1.23553 0.410419 0.910093Z"
                          fill="#ABADBA"
                        />
                      </svg>
                    </div>
                    <div className={`option-drop ${isOpen ? 'show' : ''}`}>
                      {filterOptions
                        .filter((option) => option !== selectedOption)
                        .map((option) => (
                          <div
                            key={option}
                            className="item-option"
                            onClick={() => handleSelect(option)}
                            style={{ cursor: 'pointer' }}
                          >
                            {option}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <ModalCreate
                  submit={submit}
                  user={user}
                  setModal2Open={setModal2Open}
                  modal2Open={modal2Open}
                  title={title}
                  handleChange={handleChange}
                  handleChangeDes={handleChangeDes}
                  description={description}
                ></ModalCreate>
                <InfiniteScroll
                  dataLength={listPostCompany.length}
                  next={loadMorePosts}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                >
                  <Flex className="scroll-post" vertical gap="8px">
                    {listPostCompany.map((item, index) => (
                      <Post
                        key={index}
                        post={item}
                        loading={loading}
                        likeAction={likeAction} // Truyền hàm likeAction vào PostItem
                        unLikeAction={unLikeAction}
                        api={getList}
                      />
                    ))}
                  </Flex>
                </InfiniteScroll>
                <div ref={loader} />
                {/* <Paginator itemPerPage={5} data={listPostCompany} /> */}
              </div>
            </Flex>
          </div>
        </div>
      </StyledCompanyDetail>
    </CommunityLayout>
  );
};
