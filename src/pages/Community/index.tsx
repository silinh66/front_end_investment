// import { Row, Col, Tabs, ConfigProvider } from 'antd';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/cong-dong/forum/forum');
  }, [navigate]);
  return <></>;
};
export default Community;
