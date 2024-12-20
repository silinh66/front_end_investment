// import { Flex } from 'antd';
import { StyledForum } from './styled';
// import { useEffect, useState } from 'react';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
// import Thread from '@/components/Thread';
// import PostItem from '@/components/PostItem';
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
const CurrentPosts = () => {
  // const [activeTab, setActiveTab] = useState<number>(1);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, []);
  // const data = [1, 2, 3, 4, 5];
  return (
    <CommunityLayout>
      <StyledForum>
        <h4 className="title">BÀI VIẾT GẦN ĐÂY</h4>
        {/* <Flex vertical gap={16}> */}
        {/* {data.map((item, idx) => (
            <Thread key={idx} id={idx} loading={loading} />
          ))} */}
        {/* </Flex> */}
      </StyledForum>
    </CommunityLayout>
  );
};

export default CurrentPosts;
