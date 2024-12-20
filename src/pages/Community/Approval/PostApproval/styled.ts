import styled from 'styled-components';

export const StyledPostApproval = styled.div`
  color: white;
  background-color: #1f232c;
  padding: 24px;
  border-radius: 8px;
  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 16px;
  }
  .ant-table {
    background-color: transparent;
    color: white;
    .ant-table-header {
      border-bottom: 1px solid #3a3f42;
      .ant-table-cell {
        background-color: transparent !important;
        color: white;
        font-size: 12px;
        padding: 8px 12px;
        &.ant-table-cell-scrollbar {
          display: none;
        }
      }
    }
    .ant-table-body {
      .ant-table-cell {
        font-size: 12px;
        color: white;
        padding: 8px 12px;
      }
    }
    .status-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .ant-badge-status-text {
        font-size: 12px;
      }
    }
    ::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: grey;
      border-radius: 10px;
    }
    .list_container {
      overflow: auto;
      height: 50px;
      width: 40px;
    }
  }
`;
