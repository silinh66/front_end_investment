import styled from 'styled-components';

export const StyledEvents = styled.div<{
  screen_mode: string;
}>`
  padding: 0px 24px 24px 24px;
  max-height: 1960px;
  @media (max-width: 1600px) {
    padding: 0px 20px 20px 20px !important;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.5);
  }
  ::-webkit-scrollbar {
    width: 2px;
    background-color: rgba(255, 255, 255, 0.3);
  }
  ::-webkit-scrollbar-thumb {
    background-color: #42a732;
  }
  .box-list {
    .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
      color: ${(props) => (props.screen_mode === 'light' ? '#1f232c' : '#fff')};
    }
    > .ant-select .ant-select-selection-placeholder {
      color: ${(props) =>
        props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4'};
    }
    > .ant-select-outlined:not(.ant-select-disabled):not(
        .ant-select-customize-input
      ):not(.ant-pagination-size-changer):hover
      .ant-select-selector,
    .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(41, 43, 50, 1)'
          : '1px solid #D5D7DC'};
      background: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(41, 43, 50, 1)' : '#fff'};
      &:hover {
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid #818498'
            : '1px solid  #878D9B'};
      }
    }
    > .ant-select .ant-select-arrow {
      color: ${(props) =>
        props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4'};
    }
    > .ant-select:not(.ant-select-customize-input) .ant-select-selector input {
      color: ${(props) =>
        props.screen_mode === 'light' ? '#1f232c' : '#F0F3FA'};
    }
  }
`;
export const StyledEventItem = styled.div<{ screen_mode: string }>`
  @media (max-width: 1600px) {
    .card {
      .content {
        .header-group {
          width: 100%;
        }
      }
    }
  }
  .card {
    padding: 16px 12px;
    width: 100%;
    border-radius: 6px;

    display: flex;
    align-items: center;
    gap: 16px;
    .header {
      width: 66px;
      height: 66px;
      .logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 66px;
        height: 66px;
        object-fit: cover;
        border-radius: 12px;
      }
    }
    .content {
      .header-group {
        display: flex;
        gap: 6px;
        align-items: center;
        .btn-join {
          display: none;
          padding: 0px 8px;
          border-radius: 6px;
          background-color: rgba(0, 74, 234, 1);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
          line-height: 23px;
          height: 24px;
          font-weight: 500;
          min-width: 76px;
          &:hover {
            background-color: #0042cc;
          }
        }
        .title {
          font-size: 14px;
          /* flex-grow: 1; */
          /* white-space: nowrap;
          overflow: hidden; */
          /* text-overflow: ellipsis; */
          line-height: 20px;
          font-weight: 500;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        }
      }
      .desc {
        font-size: 12px;

        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : '#747B8B'};
        font-weight: 400;
        line-height: 16px;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .footer {
        font-size: 12px;
        display: flex;
        gap: 10px;
        font-weight: 400;
        line-height: 16px;
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(8, 8, 8, 0.50)'};
      }
    }

    &:hover {
      cursor: pointer;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(41, 43, 50, 1)' : '#F9FAFA'};
      .header-group {
        .btn-join {
          display: block;
        }
        /* .title {
          max-width: calc(100% - 140px);
        } */
      }
    }
  }

  /* .header, */
  .content,
  .footer {
    margin-bottom: 5px;
  }
`;
