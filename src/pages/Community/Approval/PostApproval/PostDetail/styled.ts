import styled from 'styled-components';

export const StyledPostDetail = styled.div`
  color: white;
  background-color: #1f232c;
  padding: 24px;
  width: 100%;
  border-radius: 8px;
  .text {
    .read-or-hide {
      color: #42a732;
      padding-left: 4px;
      cursor: pointer;
    }
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 16px;
    .back-link {
      font-weight: 500;
      cursor: pointer;
      position: relative;
      text-decoration: none;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        border-radius: 2px;
        background-color: white;
        transition: 0.2s linear;
      }
      &:hover:after {
        right: 0;
        width: 100%;
      }
    }
  }
  .ant-btn {
    &.prev-btn,
    &.next-btn {
      background-color: #2a2e39;
      border: none;
      color: white;
      height: 28px;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }
  .info-post {
    display: flex;
    gap: 14px;
    margin-top: 16px;
    padding-right: 16px;
    .label {
      min-width: 160px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      p {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .value {
      grow: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
  .actions {
    padding-left: 16px;
    border-left: 1px solid #3a3f42;
    height: 100%;
    margin-top: 16px;

    .title {
      color: rgba(255, 255, 255, 0.5);
      font-size: 16px;
    }
    .actions-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
      .action {
        display: flex;
        gap: 8px;
        align-items: center;
        .ant-btn-primary {
          background-color: #2a2e39;
          &.block-btn {
            &:not(:disabled):not(.ant-btn-disabled):hover {
              background-color: #ca0;
            }
          }
          &.ban-btn {
            &:not(:disabled):not(.ant-btn-disabled):hover {
              background-color: #d46b08;
            }
          }
          &.approve-btn {
            &:not(:disabled):not(.ant-btn-disabled):hover {
              background-color: #42a732;
            }
          }
          &.kick-btn {
            &:not(:disabled):not(.ant-btn-disabled):hover {
              background-color: #e43637;
            }
          }
        }
      }
    }
  }
`;
