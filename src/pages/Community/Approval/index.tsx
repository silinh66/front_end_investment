import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import { Col, Row } from 'antd';
// import React from 'react';
import MemberApproval from './MemberApproval';
import PostApproval from './PostApproval';

const Approval = () => {
  return (
    <CommunityLayout hideSide={'both'}>
      <Row gutter={24}>
        <Col span={12}>
          <MemberApproval />
        </Col>
        <Col span={12}>
          <PostApproval />
        </Col>
      </Row>
    </CommunityLayout>
  );
};

export default Approval;
