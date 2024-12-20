import styled from 'styled-components';

export const CommentInputStyled = styled.div<{ screen_mode: string }>`
  border-radius: 8px;
  /* background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#1f232c' : '#F0F3FA'}; */
  .ant-input {
    line-height: 28px !important;
  }
  .comment-avatar {
    display: block;
  }
  .input {
    grid-row: 1;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#2a2e39' : '#F0F2F5'};
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255,255,255,0.5)'
        : 'rgba(0,0,0,0.5)'};
    outline: none;
    box-shadow: none;
    border: none;
    &::placeholder {
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(255,255,255,0.5)'
          : 'rgba(0,0,0,0.5)'};
    }
  }
  .comment-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 13px;
    top: 10px;
    width: 20px;
    height: 20px;
    z-index: 11;
    cursor: pointer;
    &:hover svg path {
      fill: ${(props) =>
        props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
    }
  }
  .icon {
    cursor: pointer;
    color: #95a5a6;
    &:hover {
      color: #fff;
    }
  }
`;
