import styled from 'styled-components';

export const NoticeStyled = styled.div`
  background-color: rgba(30, 72, 23, 0.5);
  position: relative;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  .notice-icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: white;
  }
  .message {
    font-size: 20px;
    color: white;
    padding-left: 30px;
    font-family: Roboto;
  }
  .close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    color: white;
    cursor: pointer;
  }
`;
