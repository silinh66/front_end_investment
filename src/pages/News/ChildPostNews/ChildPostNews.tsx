/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ChildPostNews = ({ newsType, newsData, nextLink, screenMode }) => {
  const [activeTab, setActiveTab] = useState('');
  const history = useNavigate();

  const handleNewsTypeClick = (type) => {
    let tabPath = '';
    switch (type) {
      case 'Chứng khoán':
        tabPath = 'chung-khoan';
        break;
      case 'Bất động sản':
        tabPath = 'bat-dong-san';
        break;
      case 'Tài chính':
        tabPath = 'tai-chinh';
        break;
      case 'Ngân hàng':
        tabPath = 'ngan-hang';
        break;
      case 'Kinh tế việt nam':
        tabPath = 'kinh-te-viet-nam';
        break;
      case 'Vĩ mô':
        tabPath = 'vi-mo';
        break;
      case 'Xã hội':
        tabPath = 'xa-hoi';
        break;
      case 'Doanh nhân':
        tabPath = 'doanh-nhan';
        break;
      case 'Khởi nghiệp':
        tabPath = 'khoi-nghiep';
        break;
      case 'Kinh tế quốc tế':
        tabPath = 'kinh-te-quoc-te';
        break;
      default:
        tabPath = '';
    }
    setActiveTab(tabPath);
    history(`/tab-news/${tabPath}`);
  };
  return (
    <div className="box-type-news">
      <div
        className="header-more"
        onClick={() => handleNewsTypeClick(newsType)}
      >
        <div className="title-more">{newsType}</div>
        <svg
          width="1"
          height="12"
          viewBox="0 0 1 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.5"
            y1="2.18557e-08"
            x2="0.499999"
            y2="12"
            stroke={screenMode === 'dark' ? '#30323B' : '#D5D7DC'}
          />
        </svg>
        <div className="more">
          Xem thêm{'  '} {'  '}
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.529247 9.47205C0.268897 9.21171 0.268897 8.7896 0.529247 8.52925L4.05784 5.00065L0.529247 1.47206C0.268897 1.21171 0.268897 0.789596 0.529246 0.529247C0.789596 0.268897 1.21171 0.268897 1.47206 0.529247L5.47206 4.52925C5.73241 4.7896 5.73241 5.21171 5.47206 5.47206L1.47206 9.47205C1.21171 9.7324 0.789596 9.7324 0.529247 9.47205Z"
              fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
            />
          </svg>
        </div>
      </div>
      {/* <div onClick={() => handleNewsTypeClick(newsType)} className="tile-type">
        {newsType}
      </div> */}
      <div className="layout-header-news">
        <div className="big-news">
          {newsData[0] && (
            <div className="css-1rxr2le eis2tu50">
              <div
                // to={`/detail-news/${encodeURIComponent(newsData[0]?.url.replace('https://', ''))}`}
                onClick={() => nextLink(newsData[0])}
              >
                <img
                  width="100%"
                  height="418.67px"
                  src={newsData[0].image}
                  alt={newsData[0].title}
                  style={{
                    borderRadius: '6px',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                onClick={() => nextLink(newsData[0])}
                className="css-0 e1ik1iw00"
              >
                <div className="css-9t3nig e7j57mt0">
                  <a>
                    {newsData[0].title?.length > 65
                      ? `${newsData[0].title?.slice(0, 65)}...`
                      : newsData[0].title}
                  </a>
                </div>
                <p className="css-hv6hrz e7x1xmz0">
                  {newsData[0]?.description?.length > 230
                    ? `${newsData[0]?.description?.slice(0, 230)}...`
                    : newsData[0]?.description}
                </p>
                <div className="time">{newsData[0].date}</div>
              </div>
            </div>
          )}
        </div>
        <div className="second-header">
          <div className="news-child">
            {newsData.slice(1, 5).map((newsItem, index) => (
              <div
                onClick={() => nextLink(newsItem)}
                className="news-second"
                key={index}
              >
                <img
                  // width="30%"
                  // height="33.33%"
                  src={newsItem.image}
                  alt={newsItem.title}
                />
                <div className="info">
                  <div className="gioithieu">
                    <a>
                      {newsItem?.title?.length > 75
                        ? `${newsItem?.title?.slice(0, 75)}...`
                        : newsItem?.title}
                    </a>
                  </div>
                  <p className="des">
                    {newsItem?.description?.length > 120
                      ? `${newsItem?.description?.slice(0, 120)}...`
                      : newsItem?.description}
                  </p>
                  <div className="time">{newsItem.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChildPostNews;
