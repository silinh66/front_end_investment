import styled from 'styled-components';
export const StyledForumItem = styled.div<{ id: number; screen_mode: string }>`
  /*Style forum card hover  */
  .ant-card-body {
    border-radius: 8px;
    border: 1px solid transparent;
    background: ${(props) =>
      props.id % 2 === 0
        ? props.screen_mode === 'dark'
          ? '#1F232C'
          : '#F0F3FA'
        : props.screen_mode === 'dark'
          ? '#2A2E39'
          : 'white'};
    &:hover {
      border: 1px solid green;
    }
  }
  .forumCard-img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    @media only screen and (min-width: 1600px) {
      width: 156px;
      height: 156px;
    }
  }
  .forumCard-title {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
  }
  .forumCard-info {
    /* margin-top: 4px; */
    font-size: 12px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    @media only screen and (min-width: 1600px) {
      font-size: 14px;
    }
    span {
      color: #42a732;
      font-weight: 500;
    }
  }
  .forumCard-desc {
    display: -webkit-box;
    width: 80%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 12px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    @media only screen and (min-width: 1600px) {
      font-size: 14px;
    }
  }
  .forumCard-actions {
    display: flex;
    gap: 8px;
    .action {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${(props) =>
        props.screen_mode === 'dark'
          ? props.id % 2 === 0
            ? '#1f232c'
            : '#2A2E39'
          : props.id % 2 === 0
            ? 'white'
            : '#F0F3FA'};
    }
  }
  .forumCard-bottom {
    margin-top: 6px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    @media only screen and (min-width: 1400px) {
      margin-top: 10px;
      flex-direction: row;
    }
    .forumCard-countInfo {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .forumCard-author {
      display: flex;
      align-items: center;
      gap: 8px;
      @media only screen and (min-width: 1600px) {
        gap: 16px;
      }
      .forumCard-author__avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: block;
      }
      .forumCard-author__detail {
        display: flex;
        flex-direction: column;
        .forumCard-author__detail-name {
          font-weight: 600;
        }
        .forumCard-author__detail-createdAt {
          font-size: 12px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255,255,255,0.5)'
              : 'rgba(0,0,0,0.5)'};
        }
      }
    }
  }
  .forumCard-subInfo {
    font-size: 11.5px;
    color: rgba(255, 255, 255, 0.5);
    @media only screen and (min-width: 1600px) {
      font-size: 14px;
    }
  }
`;
