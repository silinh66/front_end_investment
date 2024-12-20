import styled from 'styled-components';

export const StyledDetailForum = styled.div`
  color: white;
  width: 100%;
  .message-list {
    padding: 16px;
    border-radius: 8px;
    background-color: #1f232c;
    .title {
      font-size: 24px;
      font-weight: 500;
      color: white;
      margin-bottom: 16px;
    }
  }
  .follow-button {
    background-color: #42a732;
    border: none;
    color: white;
    padding: 8px 12px;
    line-height: 1rem;
    &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
      color: white;
    }
  }
  .unfollow-button {
    background-color: #2a2e39;
    border: none;
    color: white;
    padding: 8px 12px;
    line-height: 1rem;
    &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
      color: white;
    }
  }
  .user {
    display: flex;
    gap: 16px;
    .user-avatar {
      display: block;
      width: 74px;
      height: 74px;
      border-radius: 5px;
    }
    .user-info {
      .label {
        font-weight: 500;
      }
      .value {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .body {
    .body-createdAt {
      display: flex;
      .label {
      }
      .value {
        margin-left: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .body-content {
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
  }
  .bottom-message {
    .bottom-sign {
      span {
        font-style: italic;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .bottom-count {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .actions-message {
    .action-button {
      &.ant-btn {
        background-color: #2a2e39;
        border: none;
        color: white;
        padding: 8px;
        height: 36px;
        transition: 0.15s linear;
        &.active {
          background-color: #42a732;
          &.like-button {
            svg {
              path {
                fill: white;
                stroke: white !important;
              }
            }
            &:hover {
              color: white !important;
            }
          }
        }

        &:hover {
          color: #42a732 !important;
          .icon {
            path {
              stroke: #42a732 !important;
            }
          }
        }
        .icon {
          path {
            stroke: white;
          }
        }
      }
      &.danger {
        &.ant-btn {
          background-color: #e43637;
          border: none;
          color: white;
          .icon {
            path {
              stroke: white !important;
            }
          }
          &:hover {
            color: white !important;
            .icon {
              path {
                stroke: white !important;
              }
            }
          }
        }
      }
      .content-button {
        display: flex;
        gap: 8px;
        &.active {
          background-color: #42a732;
        }
      }
    }
  }
`;
