import styled from 'styled-components';

export const StyledPaginator = styled.div<{ screen_mode: string }>`
  margin-top: 24px;
  display: flex;
  align-items: start;
  justify-content: center;
  .info-page {
    min-width: 30px;
    height: 30px;
    display: flex;
    padding: 4px 15px;
    margin-right: 8px;

    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    border-radius: 8px;
  }
  .goto-page {
    height: 30px;
    display: flex;
    gap: 8px;
    padding: 4px 15px;
    margin-left: 8px;

    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    border-radius: 8px;
    .ant-input {
      width: 27px;
      height: 20px;
      padding: 4px 4px !important;
    }
  }
  .ant-pagination {
    display: flex;
    justify-content: center;
    /* flex-wrap: wrap; */
    gap: 0px;
    .ant-pagination-item-active {
      border-color: #004aea;
    }
    .ant-pagination-item-ellipsis {
      color: white !important;
    }
    .ant-pagination-options {
      display: block;
      .ant-select-single {
        height: 30px;
      }
      .ant-select-selector {
        background-color: #2a2e39 !important;

        border: none;
        color: white;
      }
      .ant-select {
        .ant-select-arrow {
          color: white !important;
        }
      }
    }
    .ant-pagination-prev,
    .ant-pagination-next {
      display: flex;
      gap: 4px;
      min-width: fit-content;
      align-items: center;
      padding: 8px;
      /* background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'}; */
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      height: 30px;
      width: 30px;
      border-radius: 6px;
      font-size: 13px;
      justify-content: center;
      svg {
        path {
          fill: ${(props) =>
            props.screen_mode === 'dark' ? 'white' : 'black'};
        }
      }
      p {
        display: block;
        width: 43px;
      }
      &.ant-pagination-disabled {
        /* background-color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)'}; */

        opacity: 0.3;
      }
    }
    .ant-pagination-item-link {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    }
    .ant-pagination-item {
      min-width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
      a {
        color: ${(props) =>
          props.screen_mode === 'dark' ? 'white' : '#565B67'};
      }
      &.ant-pagination-item-active {
        background-color: #004aea;
        color: #fff !important;
        a {
          color: ${(props) =>
            props.screen_mode === 'dark' ? 'white' : '#fff'};
        }
      }
    }
    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      min-width: 30px;
      height: 30px;
      &:hover {
        background-color: red;
      }
    }
  }
`;
