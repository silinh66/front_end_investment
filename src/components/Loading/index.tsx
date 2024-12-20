import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading = () => {
  return (
    <StyledLoading>
      <Spin indicator={antIcon} />
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
