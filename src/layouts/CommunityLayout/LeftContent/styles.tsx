import styled from 'styled-components';

export const Styles = styled.div`
  .ant-space-gap-col-middle {
    gap: 8px !important;
  }
  @media (max-width: 1920px) {
    .root-left {
      width: 455px;
    }
  }
  @media (max-width: 1600px) {
    .root-left {
      width: 343px;
    }
  }
  @media (max-width: 1280px) {
    width: 305px;
  }
  .more {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#747B8B'};
    &:hover {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgb(111 155 247)' : 'rgb(31 102 255)'};
    }
  }
  color: white;
  position: sticky;

  .statistic-body__image {
    width: 24px;
    height: 24px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
type Props = {
  screen_mode: string;
};
export const AreaCustomStyles = styled.div<Props>`
  /* background-color: #1f232c; */
  padding: 0px 24px 24px 24px;
  border-radius: 6px;
  background: ${(props) =>
    props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};

  .areaCustom-title {
    margin-bottom: 16px;
    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
    padding: 14px 0;
    font-size: 15px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
    font-weight: 600;
    line-height: 20px;
  }
  .more {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#747B8B'};
    &:hover {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgb(111 155 247)' : 'rgb(31 102 255)'};
    }
  }
`;

export const FollowingItemStyles = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .cardItem-body__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cardItem-body__title {
    font-size: 13px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
    font-weight: 400;
    line-height: 20px;
  }
  .cardItem-body__desc {
    font-size: 12px;

    font-weight: 400;
    line-height: 16px;
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#747B8B'};
  }
`;
export const FriendItemStyles = styled.div`
  display: flex;
  gap: 10px;
  .friendItem-body__title {
    font-size: 14px;
    line-height: 16px;
  }
  .friendItem-body__desc {
    font-size: 12px;
    margin-top: 8px;
    line-height: 14px;
    display: flex;
    align-items: center;
    span {
      margin-left: 2px;
    }
  }
`;
export const StyledFriendsModal = styled.div`
  background: #1f232c;
  padding: 24px;
  border-radius: 8px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    .close-btn {
      cursor: pointer;
    }
  }
  .body {
    .friend-count {
      color: white;
      margin-top: 16px;
    }
    .friend-list {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      .friend-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left-item {
          display: flex;
          align-items: center;
          gap: 16px;
          .user-info {
            p {
              color: white;
              font-size: 18px;
            }
            span {
              color: rgba(255, 255, 255, 0.5);
              font-size: 16px;
            }
          }
        }
        .right-item {
          display: flex;
          gap: 16px;
          .btn {
            border: none;
            outline: none;
            color: white;
            background-color: #2a2e39;
            font-weight: 500;
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.follow-btn {
              background-color: #42a732;
            }
            &.unfollow-btn {
              background-color: rgba(66, 167, 50, 0.2);
              border: 1px solid #42a732;
              color: #42a732;
            }
            &:hover {
              filter: brightness(1.1);
            }
          }
        }
      }
    }
  }
`;

export const StyledStatistic = styled.div<Props>`
  .statistic-body__title {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
  }
  .statistic-body__desc {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
`;
export const StyledFollowing = styled.div<Props>`
  .following-title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
  }
  .more {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#747B8B'};
    &:hover {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgb(111 155 247)' : 'rgb(31 102 255)'};
    }
  }
  .card {
    color: white;
    border-radius: 5px;
    max-width: 400px;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    position: relative;
    justify-content: space-between;
    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      .logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      .title {
        font-size: 13px;
        width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 20px;
        font-weight: 400;
        color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      }
    }

    .btn-join {
      padding: 8px 16px;
      border-radius: 6px;
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(74, 76, 90, 1)'
          : '1px solid #BFC2CA'};
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};

      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      line-height: 20px;
      display: none; /* Ẩn nút khi không hover */
      &:hover {
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid #818498'
            : '1px solid  #878D9B'};
      }
    }

    &:hover {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(41, 43, 50, 1)' : '#fff'};
      border-radius: 6px;
      .btn-join {
        display: block; /* Hiển thị nút khi hover */
      }
    }
  }

  .cardItem-body__title {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
  }

  .statistic-body__title {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
  }
  .statistic-body__desc {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
`;
