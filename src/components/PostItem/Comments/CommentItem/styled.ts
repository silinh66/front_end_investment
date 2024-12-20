import styled from 'styled-components';

export const CommentItemStyled = styled.div<{ screen_mode: string }>`
  position: relative;
  .comment-input-child {
    border-radius: 100px;
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
    right: 12px;
    top: 6px;
    width: 20px;
    height: 20px;
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
export const CommenItemHeadStyled = styled.div<{ screen_mode: string }>`
  .head-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .head-detail {
    .box-cmt {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#292B32' : '#f0f2f5'};
      padding: 8px 12px;
      border-radius: 12px;
      .head-username {
        font-size: 13px;
        font-weight: 600;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#050505'};
      }
    }
  }
  .head-count {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
`;
export const CommentItemActionsStyled = styled.div`
  margin-left: 42px;
  margin-bottom: 4px;
  .head-created {
    color: ${(props) => (props.screen_mode === 'dark' ? '#ABADBA' : '#656768')};
    font-size: 10px;
    line-height: 11.72px;
  }
  .action-button {
    padding: 0;
    color: ${(props) => (props.screen_mode === 'dark' ? '#ABADBA' : '#656768')};
    font-size: 12px;
    height: 20px;
    font-weight: bold;
    &.active {
      color: #42a732;
    }
  }
`;
