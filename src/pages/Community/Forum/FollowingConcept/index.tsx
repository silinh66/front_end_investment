// import { Badge, Button, Card, Flex, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { StyledForum } from './styled';
// import { useEffect, useState } from 'react';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
// import Thread from '@/components/Thread';
// import PostItem from '@/components/PostItem';
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import { screenModeSelector } from '@/redux/screen/selector';
const FollowingConcept = () => {
  // const [activeTab, setActiveTab] = useState<number>(1);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, []);
  // const data = [1, 2, 3, 4, 5];
  const screenMode = useSelector(screenModeSelector);

  return (
    <CommunityLayout>
      <StyledForum
        style={{
          backgroundColor: screenMode === 'dark' ? '#1F232C' : '#fdfdfd',
        }}
      >
        <h4
          style={{
            color: screenMode === 'dark' ? '#fff' : 'black',
          }}
          className="title"
        >
          DANH SÁCH CHỦ ĐỀ ĐANG THEO DÕI
        </h4>
        {/* <Flex vertical gap={16}> */}
        {/* {data.map((item, idx) => (
            <Thread key={idx} id={idx} loading={loading} />
          ))} */}
        {/* </Flex> */}
      </StyledForum>
    </CommunityLayout>
  );
};

export default FollowingConcept;
