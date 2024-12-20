/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import { Form, Row, Col, Button, Tabs } from 'antd';
import { StyledSearch } from './styled';
import FindAll from './FindAll';
import FindInProfile from './FindInProfile';
import FindConceptAndPost from './FindConceptAndPost';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';

const searchTypeOptions = [
  { value: 'all', label: 'Tìm tất cả', view: <FindAll /> },
  {
    value: 'title',
    label: 'Tìm trong tiêu đề và bài viết',
    view: <FindConceptAndPost />,
  },
  {
    value: 'profile',
    label: 'Tìm trong bài viết hồ sơ cá nhân',
    view: <FindInProfile />,
  },
];

const Search = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const handleSubmit = (value: any) => {};
  return (
    <CommunityLayout>
      <StyledSearch screen_mode={screenMode}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item style={{ width: '100%' }} name="typeSearch">
              <Tabs
                tabPosition={'left'}
                items={searchTypeOptions.map((tab, i) => {
                  const id = String(i + 1);
                  return {
                    label: (
                      <div className="label-tab">
                        <span className="dot"></span>
                        {tab.label}
                      </div>
                    ),
                    key: id,
                    children: tab.view,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
      </StyledSearch>
    </CommunityLayout>
  );
};

export default Search;
