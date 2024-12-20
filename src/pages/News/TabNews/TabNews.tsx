/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { StyledTabNews } from './styled';
import { Col, Flex, Row, Tooltip } from 'antd';
import { getNews, getNewsType } from '@/services/servicesApi/serviceApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { IoHomeOutline } from 'react-icons/io5';
import Paginator from '@/components/Pagination';
import { FooterNews } from '../FooterNews/FooterNews';
import { HeaderNews } from '../HeaderNews/HeaderNews';
export const TabNews = () => {
  const screenMode = useSelector(screenModeSelector);
  const { id } = useParams();
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (id === 'chung-khoan') {
      setType('Chứng khoán');
    } else if (id === 'bat-dong-san') {
      setType('Bất động sản');
    } else if (id === 'tai-chinh') {
      setType('Tài chính');
    } else if (id === 'ngan-hang') {
      setType('Ngân hàng');
    } else if (id === 'kinh-te-viet-nam') {
      setType('Kinh tế việt nam');
    } else if (id === 'vi-mo') {
      setType('Vĩ mô');
    } else if (id === 'xa-hoi') {
      setType('Xã hội');
    } else if (id === 'doanh-nhan') {
      setType('Doanh nhân');
    } else if (id === 'khoi-nghiep') {
      setType('Khởi nghiệp');
    } else if (id === 'kinh-te-quoc-te') {
      setType('Kinh tế quốc tế');
    }
  }, [id]);
  const [news, setNews] = useState<IFeaturedPost[]>([]);
  useEffect(() => {
    getNewsType(type, undefined, currentPage).then((res) => {
      setNews(res.data.data);
    });
  }, [id, type, currentPage]);
  const next = useNavigate();

  const nextLink = (item: any) => {
    next(
      `/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`,
      { state: { item } }
    );
  };
  return (
    <StyledTabNews screen_mode={screenMode}>
      <HeaderNews />

      <Flex
        style={{
          // flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            flex: 1,
            gap: '16px',
          }}
        >
          <Row gutter={[16, 16]}>
            {news
              .filter((el) => el.image)
              .map((item) => (
                <Col
                  style={{ padding: '0 12px' }}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                >
                  <div className="item-three-header">
                    <div onClick={() => nextLink(item)}>
                      <img src={item.image} alt="image" />
                    </div>
                    <div onClick={() => nextLink(item)}>
                      <Tooltip title={item.title}>
                        <a href={item.href} className="title">
                          {item.title.length > 57
                            ? `${item.title.slice(0, 57)}...`
                            : item.title}
                        </a>
                      </Tooltip>
                      <p>
                        {item.description.length > 80
                          ? `${item.description.slice(0, 80)}...`
                          : item.description}
                      </p>
                      <div className="time">{item?.date}</div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Flex>
      <Paginator
        data={news.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <FooterNews />
    </StyledTabNews>
  );
};
