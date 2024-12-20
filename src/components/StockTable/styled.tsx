import styled from 'styled-components';
type Props = {
  screen_mode: string;
};
export const StyleStockTable = styled.div<Props>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  padding: 0px 16px;
  @media (max-width: 1600px) {
    .whiteTextTable .ant-table-cell,
    .whiteTextTable .ant-table-header .ant-table-cell,
    .whiteTextTable .ant-table-thead > tr > th,
    .whiteTextTable .ant-table-tbody > tr > td {
      font-size: 10px !important;
    }
  }

  .wrapper-table {
    padding: 16px;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)'};
    border-radius: 6px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
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
    .search-bar {
      .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
        color: ${(props) =>
          props.screen_mode === 'light' ? '#1f232c' : '#fff'};
      }
      :where(.css-dev-only-do-not-override-1k979oh).ant-select-outlined:not(
          .ant-select-disabled
        ):not(.ant-select-customize-input):not(
          .ant-pagination-size-changer
        ):hover
        .ant-select-selector,
      .ant-select-outlined:not(.ant-select-customize-input)
        .ant-select-selector {
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid rgba(74, 76, 90, 1)'
            : '1px solid rgba(213, 215, 220, 1)'};
        cursor: pointer;
        &:hover {
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid #878D9B'
              : '1px solid #818498'};
        }
      }
      > .ant-select .ant-select-selection-placeholder {
        color: ${(props) =>
          props.screen_mode === 'light' ? 'rgba(135, 141, 155, 1)' : '#D4D4D4'};
      }
      > .ant-select-outlined:not(.ant-select-customize-input)
        .ant-select-selector {
        background: ${(props) =>
          props.screen_mode === 'dark' ? '#1f232c' : '#F0F3FA'};
      }
      > .ant-select .ant-select-arrow {
        color: ${(props) =>
          props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4'};
      }
      > .ant-select:not(.ant-select-customize-input)
        .ant-select-selector
        input {
        color: ${(props) =>
          props.screen_mode === 'light' ? '#1f232c' : '#F0F3FA'};
      }
    }
    .whiteTextTable {
      .ant-pagination .ant-pagination-item-active {
        background-color: #1677ff;
        color: ${(props) =>
          props.screen_mode === 'light' ? '#1f232c' : '#F0F3FA'};
      }
    }
    .whiteTextTable
      .ant-table-wrapper
      .ant-table-tbody
      .ant-table-row
      > .ant-table-cell-row-hover {
      background: ${(props) =>
        props.screen_mode === 'dark' ? '#1f232c' : '#F0F3FA'};
    }
    .ant-table-wrapper
      .ant-table-container
      table
      > thead
      > tr:first-child
      > *:first-child,
    .ant-table-wrapper
      .ant-table-container
      table
      > thead
      > tr:first-child
      > *:last-child {
      border-radius: 0px !important;
    }
    .whiteTextTable .ant-table {
      border-collapse: separate;
      border-spacing: 0;
    }
    .whiteTextTable .ant-table-tbody > tr > .custom-column-cell,
    .whiteTextTable .ant-table-tbody > tr > .custom-column,
    .whiteTextTable .ant-table-thead > tr > .custom-column-cell,
    .whiteTextTable .ant-table-thead > tr > .custom-column {
      /* background-color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(25, 26, 31, 1) !important'
          : '#fff !important'}; */
    }
    .ant-table-wrapper .ant-table-thead > tr:not(:last-child) > th[colspan] {
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(64, 66, 78, 1) !important'
          : '1px solid #ccc !important'};
    }
    .whiteTextTable .ant-table-cell,
    .whiteTextTable .ant-table-header .ant-table-cell,
    .whiteTextTable .ant-table-thead > tr > th,
    .whiteTextTable .ant-table-tbody > tr > td {
      color: ${(props) =>
        props.screen_mode === 'light'
          ? 'rgba(46, 49, 56, 1) !important'
          : '#fff !important'};

      font-size: 13px;
      // border: 1px solid rgba(229, 231, 235, 0.5);
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(64, 66, 78, 1)'
          : '1px solid #ccc '};
      border-width: 0 0 1px 1px;
      padding: 4px 8px;
      cursor: pointer;
    }

    .whiteTextTable .ant-table-thead > tr > th {
      background-color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(25, 26, 31, 1)'
          : 'rgba(249, 250, 250, 1)'};
      color: #c1c1c1;
      position: relative;
      padding: 4px 8px;
    }

    .whiteTextTable .ant-table-thead > tr > th::before {
      display: none;
    }

    /* .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:nth-child(even) {
      background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(32, 33, 39, 1) !important'
        : '#eee !important'};
    } */
    .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:nth-child(odd) {
      background-color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(32, 33, 39, 1) '
          : 'rgba(236, 236, 239, 1) '};
    }

    /* Màu nền cho các hàng chẵn */
    .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:nth-child(even) {
      background-color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(32, 33, 39, 1) !important'
          : '#fff !important'};
    }

    /* Màu nền cho các hàng chẵn */
    /* .ant-table-wrapper .ant-table-tbody > tr.ant-table-row > td {
      background-color: #fff !important;
    } */
    /* .ant-table-wrapper .ant-table-tbody > tr.ant-table-row > td {
      background-color: transparent !important;
    } */
    .whiteTextTable .ant-table-row {
      height: auto;
    }

    .whiteTextTable .ant-table-tbody > tr > td {
      padding: 4px 8px;
    }

    .anticon:hover {
      background-color: #001529;
    }
    .ant-pagination
      .ant-pagination-jump-next
      .ant-pagination-item-container
      .ant-pagination-item-ellipsis {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }
    .ant-pagination .ant-pagination-prev,
    .ant-pagination .ant-pagination-next {
      background-color: ${(props) =>
        props.screen_mode === 'light' ? '#ECECEF' : 'transparent'};
      :hover {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#30323B' : '#F9FAFA'};
      }
    }

    .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination .ant-pagination-next button {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }
    .ant-pagination .ant-pagination-item a {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }
    .ant-pagination .ant-pagination-item-active a {
      color: #f0f3fa;
    }
    .ant-pagination .ant-pagination-disabled .ant-pagination-item-link {
      color: ${(props) => (props.screen_mode === 'light' ? 'black' : '#fff')};
    }

    .ant-pagination
      .ant-pagination-item:not(.ant-pagination-item-active):hover {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#30323B' : '#F9FAFA'};
    }
    .items {
      display: flex;
      .user {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid rgba(74, 76, 90, 1)'
            : '1px solid rgba(213, 215, 220, 1)'};
        border-radius: 6px;
        padding-left: 16px;
        padding-right: 8px;
        background: ${(props) =>
          props.screen_mode === 'dark'
            ? 'transparent'
            : 'rgba(255, 255, 255, 1)'};
        height: 40px;
        font-size: 14px;
        min-width: 200px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : 'rgba(46, 49, 56, 1)'};
        &:hover {
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid #878D9B'
              : '1px solid #818498'};
        }
        > img {
          width: 24px;
          height: 24px;
        }
        > span {
          font-size: 16px;
          font-weight: 500;
          font-family: 'Roboto';
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#020202'};
        }
        .icon-up {
          display: block;
        }
        .icon-down {
          display: none;
        }
        &:hover {
          .dropdown {
            display: block;
            z-index: 20;
          }
          .icon-down {
            display: block;
          }
          .icon-up {
            display: none;
          }
        }
        .dropdown {
          display: none;
          position: absolute;
          top: calc(100%);
          left: 0;
          width: 400px;
          padding-top: 8px;
          border-radius: 6px;
          background-color: ${(props) =>
            props.screen_mode === 'dark' ? 'rgba(37, 38, 45, 1)' : '#fff'};
          color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#333')};
          box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);

          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(48, 50, 59, 1)'
              : '1px solid rgba(213, 215, 220, 1)'};

          div {
            cursor: pointer;
            display: block;
            font-size: 14px;
            line-height: 20px;
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(227, 228, 232, 1)'
                : 'rgba(46, 49, 56, 1)'};
            &:hover {
              color: #e38007;
            }
            .focus-input {
              border: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid rgba(74, 76, 90, 1)'
                  : '1px solid rgba(213, 215, 220, 1)'};
              border-radius: 6px;
              padding: 0px 16px;
              height: 40px;
              background-color: transparent;
              width: 316px;
              color: #fff;
              &:hover {
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid #818498'
                    : '1px solid #878D9B'};
              }
            }
            .focus-input::placeholder {
              font-size: 14px;
              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(129, 132, 152, 1)'
                  : 'rgba(135, 141, 155, 1)'};
            }
            .add {
              display: grid;
              place-items: center;
              border-radius: 6px;
              width: 40px;
              height: 40px;
              border: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid rgba(74, 76, 90, 1)'
                  : '1px solid rgba(213, 215, 220, 1)'};
              &:hover {
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid #818498'
                    : '1px solid #878D9B'};
              }
            }
            .box-icon {
              display: flex;
              gap: 12px;
              align-items: center;
            }
          }
          &:after {
            position: absolute;
            content: '';
            width: 160px;
            height: 20px;
            bottom: 100%;
            right: 0;
            background-color: transparent;
          }
        }
        .dropdown:hover {
          display: block;
        }
      }
    }
  }
`;
