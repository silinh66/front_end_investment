import styled from 'styled-components';

export const StyledWorldIndices = styled.div<{ screen_mode: string }>`
  padding: 0px 16px;

  .bottom-tab-active {
    background-color: #197fbf;
    border: 1px solid #197fbf;
  }
  .bottom-tab-active:hover {
    background-color: #197fbf;
    border: 1px solid #197fbf;
    cursor: pointer;
  }
  .bottom-tab:hover {
    background-color: rgb(25, 127, 191, 0.18);
    border: 1px solid #197fbf;
    cursor: pointer;
  }
  .bottom-tab {
    background-color: rgb(25, 127, 191, 0.18);
    border: 1px solid rgb(25, 127, 191, 0.18);
  }

  @keyframes animate {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
  h5 {
    font-size: 18px;

    margin-bottom: 8px;
    text-transform: uppercase;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
  }
  .animate {
    animation: animate 0.5s linear;
  }
  .ant-table-wrapper {
    .ant-table {
      background: transparent !important;
      .ant-table-thead > tr > th {
        background: transparent !important;
        color: #c8c3bc !important;
        font-weight: 700;
        padding: 0;
      }
      .ant-table-tbody {
        > tr {
          // color: white;
          > td {
            padding: 6px 0;

            &:first-child {
              color: #3594ef;
              font-weight: 700;
            }
            &:nth-child(2) {
              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(0, 0, 0, 0.8)'};
            }
            &:nth-child(3) {
            }
          }
          &.ant-table-placeholder {
            background: transparent !important;
            .ant-empty-description {
              color: rgba(255, 255, 255, 0.8);
            }
            &:hover {
              background: transparent !important;
              > td {
                background: transparent !important;
              }
            }
          }
        }
      }
    }
  }
`;
export const StyledListConversation = styled.div<{ screen_mode: string }>`
  padding: 0px 16px;
  min-height: 400px;
  .header {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
    padding: 8px 0px;
    line-height: 28px;
    font-size: 15px;
    border-bottom: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC'};
    margin-bottom: 16px;
  }
`;
export const StyledGroupMessage = styled.div<{ screen_mode: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: 0.1s linear;
  padding: 8px;
  border-radius: 6px;
  &:hover {
    background-color: #292b32;
  }
  .group-info {
    display: flex;
    gap: 8px;
    align-items: center;
    img {
      height: 44px;
      width: 44px;
    }
    .group-info__name {
      font-size: 14px;
      line-height: 20px;
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    }
    .group-info__last-message {
      line-height: 20px;
      font-size: 13px;
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    }
    .last-mess {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
    }
    .time {
      line-height: 20px;
      font-size: 13px;
      color: #abadba;
    }
  }
  .member-count {
    font-size: 10px;
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255,255,255,0.5)'
        : 'rgba(2, 2, 2, 0.50)'};
  }
`;
export const StyledDirectMessage = styled.div<{ screen_mode: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: 0.1s linear;
  padding: 8px;
  border-radius: 6px;
  &:hover {
    background-color: #292b32;
  }
  .direct-avatar {
    border-radius: 9999999%;
  }
  .direct-info {
    .direct-info__name {
      font-size: 14px;
      line-height: 20px;
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    }
    .direct-info__last-message {
      display: flex;
      font-size: 13px;
      align-items: center;
      gap: 4px;
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(8, 8, 8, 0.5)'};
    }
  }
  .last-message {
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(8, 8, 8, 0.5)'};
    font-size: 13px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
`;
export const StyledDetailDirectMessage = styled.div<{ screen_mode: string }>`
  position: relative;
  height: 587px;
  .back {
    height: 24px;
    width: 24px;
    display: grid;
    place-content: center;
    cursor: pointer;
  }
  .user-name {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
  }
  .close {
    cursor: pointer;
  }
  .user-currentActive {
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(8, 8, 8, 0.5)'};
  }
`;
export const StyledBoxChat = styled.div<{ screen_mode: string }>`
  flex-direction: column;
  display: flex;
  gap: 12px;

  .created-time {
    position: absolute;
    bottom: 4px;
    right: 8px;
    font-size: 10px;
  }
  .chat-input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 52px;
    display: flex;
    padding: 8px 16px;
    gap: 16px;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
    align-items: center;
    .ant-input {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#292B32' : '#ECECEF'};
      border-radius: 100px;
      height: 36px;
      outline: none;
      padding: 8px 12px;

      border: none;
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      &::placeholder {
        font-size: 14px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#818498' : 'rgba(8, 8, 8, 0.50)'};
      }
      &:focus {
        box-shadow: none;
      }
    }
    .input-btn {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};

      border-radius: 0px;
      border: none;
      outline: none;
      height: 48px;
      width: 48px;
      &:hover {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      }
      &:focus {
        border: none;
        animation: none;
        > div {
          display: none;
        }
      }
      &.icon-btn {
        color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      }
      &.send-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          path {
            fill: #0042cc;
          }
        }
      }
    }
  }
`;
export const StyledDetailGroupMessage = styled.div<{ screen_mode: string }>`
  padding: 0px 16px;
  position: relative;

  .user-name{
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
  }
  .user-currentActive{
    font-size:10px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
  }
  
  }
  .menu {
    position: relative;
    .icon {
      cursor: pointer;
    }
    .dropdown{
      &.active {
        display: inline-flex;
      }
      position: absolute;
      top: calc(100% + 15px);
      right: 0;
      display: none;
      flex-direction: column;
      gap: 8px;
      transition: 0.2s linear;
      width: fit-content;
      z-index: 9;
      border-radius: 8px;
      border: 1px solid rgba(66, 167, 50, 0.6);
      background: rgba(30, 72, 23, 0.2);
      backdrop-filter: blur(7px);
      padding: 8px;
      .dropdown-item {
        display: flex;
        gap: 8px;
        align-items: center;
        min-width: 150px;
        color: rgba(255, 255, 255, 0.5);
        width: auto;
        cursor: pointer;
        &:hover {
          color: white;
          svg {
            path {
              stroke-opacity: 1;
            }
            &.add-icon {
              path {
                fill: white;
              }
            }
          }
        }
      }
    }
  }
`;
