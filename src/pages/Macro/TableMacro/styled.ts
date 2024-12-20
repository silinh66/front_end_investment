import { styled } from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledMarcoTable = styled.div<Props>`
  .typeLaiSuat:hover {
    color: red;
  }

  /* Trong tệp CSS ngoài */
  .custom-header-cell {
    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid #3a3f42 '
        : '1px solid #D5D7DC '};
    border-right: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid #3a3f42 !important'
        : '1px solid #D5D7DC !important'};
    width: 300px;
    padding: 0 20px;
    /* background-color: screenMode === 'dark' ? '#202127' : '#ECECEF', */
    background-color: ${(props) =>
      props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
  }

  .table-macrco {
    /* position: relative; */
    padding: 0 16px;
    overflow-x: auto;
    height: 270px;
    .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > td,
    .ant-table-placeholder {
      background: ${(props) =>
        props.screen_mode === 'dark'
          ? '#202127 !important'
          : 'rgba(236, 236, 239, 1) !important'};
    }
    .ant-empty-normal .ant-empty-description {
      color: ${(props) =>
        props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4'};
    }
    .ant-table-wrapper .ant-table .ant-table-header {
      border-radius: unset;
    }
    .ant-table-wrapper
      .ant-table-container
      table
      > thead
      > tr:first-child
      > *:first-child {
      padding: 0;
    }
    .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder :hover {
      background-color: ${(props) =>
        props.screen_mode === 'light'
          ? '#ECECEF !important'
          : '#202127 !important'};
    }
    .ant-table-tbody > tr:nth-child(2n) > td {
      background-color: ${(props) =>
        props.screen_mode === 'light'
          ? '#ECECEF !important'
          : '#202127 !important'};
    }

    .ant-table-wrapper
      .ant-table-container
      table
      > thead
      > tr:first-child
      > *:last-child {
      border-start-end-radius: 0px;
    }
    .ant-table-wrapper .ant-table-sticky-scroll {
      display: none !important;
    }
    .ant-table-wrapper .ant-table-sticky-scroll {
      border: unset;
    }
    .ant-table-wrapper .ant-table-thead > tr:not(:last-child) > th[colspan] {
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #3a3f42 !important'
          : '1px solid #D5D7DC !important'};
    }
    .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination .ant-pagination-next .ant-pagination-item-link {
      background-color: ${(props) =>
        props.screen_mode === 'light' ? '#ECECEF' : '#323546'};
    }

    .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination .ant-pagination-next button {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }
    .ant-pagination .ant-pagination-item a {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }
    .ant-pagination .ant-pagination-item-active a {
      color: #1677ff;
    }
    .ant-pagination .ant-pagination-disabled .ant-pagination-item-link {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }
    /* CSS file */
    .last-column-year th,
    .last-column-year td {
      border-right: 2px dotted #dee2e6;
    }
    .ant-table-wrapper .ant-table {
      background-color: transparent;
    }
    .ant-table-wrapper
      .ant-table-thead
      > tr
      > th:not(:last-child):not(.ant-table-selection-column):not(
        .ant-table-row-expand-icon-cell
      ):not([colspan])::before {
      background-color: transparent;
    }
    .ant-table-wrapper .ant-table-thead > tr > th {
      border-bottom: none;
    }
    .ant-table-thead > tr > th {
      text-align: center;
    }
    .ant-table-wrapper .ant-table-tbody > tr > td {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #3a3f42 !important'
          : '1px solid #D5D7DC !important'};
    }

    .ant-table-wrapper .ant-table-tbody > tr > td:nth-child(1) {
      font-size: 13px;
      font-weight: 400;
      text-align: left;
      background-color: transparent !important;
      padding-left: 12px;
    }
    .ant-table-wrapper .ant-table-tbody > tr > td:last-child {
      border-radius: 0 4px 4px 0;
    }
    .ant-table-tbody > tr > td {
      padding: 8px 25px;
    }
    /* .ant-table-tbody > tr > td {
      background-color: ${(props) =>
      props.screen_mode === 'light' ? '#f0f3fa' : 'rgba(31, 35, 44, 1)'};
    } */
  }
`;
