import styled from 'styled-components';

export const CommentInputStyled = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #1f232c;
  .ant-input {
    line-height: 28px !important;
  }
  .comment-avatar {
    display: block;
  }
  .comment-input {
    background-color: #2a2e39;
    /* height: 40px !important; */
    border: none;
    outline: none;
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .comment-button {
    background-color: #42a732;
    color: white;
    border: none;
    height: 36px;
    &:hover {
      color: white !important;
    }
  }
`;
