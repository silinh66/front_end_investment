import styled from 'styled-components';
type Props = {
  screen_mode: string;
};
export const StyledProfile = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  .profile-left {
    min-width: 455px;
    .card-side-user {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      border-radius: 6px;
      width: 100%;
      min-height: 100px;
      padding: 24px;
      display: flex;
      gap: 16px;
      align-items: center;

      .cover {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
      }
      .upload {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        border-radius: 8px;
      }
      .info-user {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex-grow: 1;
        .user-name {
          color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#000')};
          font-size: 15px;
          font-weight: 600;
          line-height: 20px;
        }
        .birthday {
          display: flex;
          align-items: center;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(171, 173, 186, 1)'
              : '#747B8B'};
          font-size: 14px;
          line-height: 20px;
          gap: 3px;
        }
        .link {
          display: flex;
          gap: 8px;
        }
        .btn-update {
          place-items: center;
          cursor: pointer;
          margin-top: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          max-width: 110px;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          justify-content: center;
          font-weight: 500;
          background-color: #004aea;
          color: #fff;
          height: 28px;
        }
        .box-btn-profile {
          display: flex;
          gap: 12px;
          .pending {
            place-items: center;
            cursor: pointer;
            margin-top: 8px;
            border: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid rgba(74, 76, 90, 1)'
                : '1px solid #BFC2CA'};
            padding: 8px 12px;
            border-radius: 6px;
            width: 50%;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: center;
            font-weight: 500;
            background-color: #d0d2d8;
            color: #565b67;
            height: 28px;
          }
          .my-friend {
            place-items: center;
            cursor: pointer;
            margin-top: 8px;
            padding: 8px 12px;
            border-radius: 6px;
            width: 50%;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: center;
            font-weight: 500;
            background-color: #b8e0d3;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#0F8A61' : '#2E3138'};
            height: 28px;
          }
          .unfriend {
            place-items: center;
            cursor: pointer;
            margin-top: 8px;
            border: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid rgba(74, 76, 90, 1)'
                : '1px solid #BFC2CA'};
            padding: 8px 12px;
            border-radius: 6px;
            width: 50%;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: center;
            font-weight: 500;

            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
            height: 28px;
          }
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        align-items: center;
        .labels {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : 'black'};
          display: flex;
          flex-direction: column;
          gap: 6px;
          p {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};
            font-weight: 500;
          }
        }
        .values {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'black'};
          a,
          p {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'black'};

            font-weight: 500;
          }
          .ant-picker-outlined:hover {
            background: var(--color-color-tertiary-color-secondary_D, #2a2e39);
          }
          .ant-picker-outlined {
            background: var(--color-color-tertiary-color-secondary_D, #2a2e39);
          }
          .ant-picker .ant-picker-suffix {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};
          }
          .ant-picker ::placeholder {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};
          }
          input {
            display: flex;
            padding: 8px;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
            border-radius: 8px;
            background: var(--color-color-tertiary-color-secondary_D, #2a2e39);
            outline: none;
            border: none;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};
          }
        }
      }
      .head {
        display: flex;
        justify-content: space-between;
        color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
      }
      .followers {
        display: flex;
        margin-top: 12px;
        gap: 16px;
        max-width: 100%;
        overflow: hidden;
        img {
          width: 64px;
          height: 64px;
          display: block;
          border-radius: 8px;
        }
      }
      .more-btn {
        margin-top: 12px;
        color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
      }
    }
  }
  .main-user {
    width: 767px;
    > .table-no-data {
      min-height: 100%;

      background-color: ${(props) =>
        props.screen_mode === 'light'
          ? 'rgba(236, 236, 239, 1) !important'
          : '#202127 !important'};

      padding: 24px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > .ant-empty {
        > .ant-empty-description {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
      }
    }
    .user-name {
      font-size: 18px;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
      margin-bottom: 16px;
    }
    .ant-tabs-tab-btn {
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
    }
    .user-subInfo {
      margin-bottom: 8px;
      display: flex;
      gap: 8px;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
      p {
        color: rgba(255, 255, 255, 0.5);
      }
      span {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .ant-tabs {
    margin: 16px 0;
    .ant-tabs-tab {
      text-transform: uppercase;
      font-size: 16px;
      padding: 8px 12px;
      border-radius: 8px;
      &:hover {
        color: white;
      }
      &.ant-tabs-tab-active {
        background-color: #2a2e39 !important;
      }
    }
    .ant-tabs-nav {
      margin: 0;
      &:before {
        display: none;
      }
    }
  }
`;

export const StyledFollowersModal = styled.div`
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
  padding: 24px;
  border-radius: 8px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
    .close-btn {
      cursor: pointer;
    }
  }
  .body {
    .follower-count {
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};

      margin-top: 16px;
    }
    .follower-list {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .follower-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left-item {
          display: flex;
          align-items: center;
          gap: 8px;
          .user-info {
            p {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : 'black'};

              font-size: 18px;
            }
            span {
              color: rgba(255, 255, 255, 0.5);
              font-size: 16 px;
            }
          }
        }
        .right-item {
          display: flex;
          gap: 16px;
          .btn {
            border: none;
            outline: none;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};

            background-color: ${(props) =>
              props.screen_mode === 'dark' ? '#2a2e39' : '#fff'};
            font-weight: 500;
            &.follow-btn {
              background-color: #42a732;
            }
            &.unfollow-btn {
              background-color: rgba(66, 167, 50, 0.2);
              border: 1px solid #42a732;
              color: #42a732;
            }
          }
        }
      }
    }
  }
`;
export const StyledFriendsModal = styled.div`
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
  padding: 24px;
  border-radius: 8px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
    .close-btn {
      cursor: pointer;
    }
  }
`;
