/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from 'antd';
import { StyledForum } from './styled';
import { useEffect, useState } from 'react';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
// import Thread from '@/components/Thread';
// import PostItem from '@/components/PostItem';
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import {
  getListFollowingGroup,
  // getListForum,
} from '@/services/servicesApi/serviceApi';
import { IForum } from '@/types/postsType';
import { Link } from 'react-router-dom';
import ForumItem from '@/components/ForumItem';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';

const FollowingForum = () => {
  // const [activeTab, setActiveTab] = useState<number>(1);
  // const [loading, setLoading] = useState(true);
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const [forums, setForums] = useState<IForum[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getListFollowingGroup().then((res) => {
        if (res && res.status === 200) {
          setForums(res.data.forums);
        } else {
        }
      });
    }
  }, []);

  return (
    <CommunityLayout>
      <StyledForum screen_mode={screenMode}>
        <h4 className="title">DANH SÁCH DIỄN ĐÀN ĐANG THEO DÕI</h4>
        <Flex vertical gap={16}>
          {forums.map((item, idx) => (
            <Link to="">
              <ForumItem id={idx} forum={item} />
            </Link>
          ))}
        </Flex>
      </StyledForum>
    </CommunityLayout>
  );
};

export default FollowingForum;
