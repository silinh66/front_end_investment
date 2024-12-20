import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
// import React, { useEffect, useState } from 'react';
import { NewsStyled } from './styled';
// import MoonImage from '/moon_empty.png';
import Empty from '@/components/Empty';
import { Flex } from 'antd';
// import Thread from '@/components/Thread';
import Paginator from '@/components/Pagination';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
const News = () => {
  // const [activeTab, setActiveTab] = useState<number>(1);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, []);
  // const data = [1, 2, 3, 4, 5];
  const isEmpty = false;
  const screenMode = useSelector(screenModeSelector);

  return (
    <CommunityLayout>
      <NewsStyled
        style={{
          backgroundColor: screenMode === 'dark' ? '#1F232C' : '#fdfdfd',
        }}
      >
        {isEmpty ? (
          <Empty />
        ) : (
          <>
            <h4
              style={{ color: screenMode === 'dark' ? '#fff' : 'black' }}
              className="title"
            >
              DANH SÁCH DIỄN ĐÀN
            </h4>
            <Flex vertical gap={16}>
              {/* {data.map((item, idx) => (
                <Thread key={idx} id={idx} loading={loading} />
              ))} */}
              <Paginator />
            </Flex>
          </>
        )}
      </NewsStyled>
    </CommunityLayout>
  );
};

export default News;
