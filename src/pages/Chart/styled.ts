/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from 'styled-components';
import plus from '@assets/icons/plus.svg';
import minus from '@assets/icons/minus.svg';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledChart = styled.div<Props>`
  padding: 0px 16px 12px 16px;
  height: 100%;
  @media (max-width: 1920px) {
    .root-right-chart {
      width: 455px;
    }
  }
  @media (max-width: 1600px) {
    .root-right-chart {
      width: 343px;
      .wrapper-scroll {
        height: 542px;
      }
      .t-mua-parent .t-mua {
        font-size: 13px !important;
      }
      .frame-parent267 .parent-wrapper .parent-second,
      .frame-parent267 .parent-wrapper .parent-first {
        font-size: 13px !important;
      }
      .chart-match-thirt,
      .chart-match-second,
      .chart-match-first {
        font-size: 13px !important;
      }
      .div377,
      .div378,
      .gTOtxW .khp-parent {
        font-size: 13px !important;
      }
      .khp,
      .gi,
      .div376,
      .kl {
        color: ${(props) =>
          props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#020202'};
        width: 66.5px !important;
        font-size: 13px !important;
      }
      .div377,
      .div378,
      .div380 {
        width: 64.5px !important;
        font-size: 13px !important;
      }
      .wrapper-buy {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        .box-buy {
          .content {
            .number,
            .text {
              font-size: 13px !important;
            }
          }
        }
      }
    }
  }
  @media (max-width: 1280px) {
    .root-right-chart {
      width: 305px;
    }
  }
  .root-right-chart {
    height: 100%;
    .frame-parent256 {
      height: 100%;
    }
  }
  .t-mua-parent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
    text-align: right;
    padding: 6px 0;
    width: 100%;

    border-top: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};

    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};

    .t-bn,
    .t-mua {
      font-size: 14px;
      font-weight: 500;
      height: 20px;
      flex-shrink: 0;

      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(129, 132, 152, 1)'
          : 'rgba(8, 8, 8, 0.50)'};
    }
  }

  .frame-parent265,
  .frame-parent279 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .frame-parent279 {
    align-self: stretch;
    gap: 2px;
    text-align: right;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }
  .frame-parent279::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .kl-mua-ch-ng-parent,
  .tng-kl-khp-parent {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    padding: 6px 12px;
    align-items: center;
    justify-content: space-between;
    border-top: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
  }
  .frame-parent266,
  .gi,
  .khp {
    display: flex;
    align-items: center;
  }
  .frame-parent266 {
    flex-direction: column;
    justify-content: flex-start;
    .show-more {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      .text-show {
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(153, 186, 255, 1)'
            : 'rgba(0, 74, 234, 1)'};
        text-align: center;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        &:hover {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgb(111 155 247)'
              : 'rgb(31 102 255)'};
        }
      }
      &:hover svg path {
        cursor: pointer;
        fill: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgb(111 155 247)'
            : 'rgb(31 102 255)'};
      }
    }
  }
  .s-lnh-wrapper {
    align-self: stretch;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 20px;
    margin-bottom: 8px;
  }
  .s-lnh-wrapper,
  .t-bn,
  .t-mua {
    display: flex;
    align-items: center;
  }
  .s-lnh {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#020202')};
  }

  .t-bn {
    text-align: left;
  }

  .khp-parent {
    align-self: stretch;
    flex-direction: row;
    padding: 6px 12px;
    justify-content: space-between;
    color: #fff;
    border-top: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
  }
  .transaction {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-direction: row;
    padding: 4px 0;
    justify-content: space-between;
    color: #fff;
  }
  .div377,
  .div378,
  .khp-parent {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .div378 {
    color: #42a732;
    width: 40px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .div380 {
    display: flex;
    align-items: center;
    width: 60px;
  }
  .div378_new {
    font-weight: 500;
    color: #42a732;
    width: 25px;
    font-size: 12px;
  }
  .ratio-change {
    font-size: 14px;
    font-weight: 500;
    color: #42a732;
    /* width: 10px; */
  }
  .b16 {
    font-weight: 500;
    color: #e43637;

    height: 20px;
    margin-right: 10px;
  }
  .b16,
  .div381,
  .div382 {
    display: flex;
    align-items: center;
  }
  .frame-parent280 {
    align-self: stretch;
    flex-direction: column;
    /* padding: 4px 4px 0px 4px; */
    gap: 8px;
    text-align: right;
  }
  .frame-parent264,
  .frame-parent280,
  .mc-gi-wrapper {
    display: flex;

    justify-content: flex-start;
  }
  .b16,
  .div378,
  .div380,
  .div376_new,
  .mb {
    position: relative;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#020202'};
  }
  .div377 {
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255, 255, 255, 0.50)'
        : 'rgba(8, 8, 8, 0.50)'};
    position: relative;
    text-align: left;
    width: 64px;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .gi,
  .khp {
    position: relative;
    font-weight: 500;

    flex-shrink: 0;
  }
  .khp,
  .gi,
  .div376,
  .kl {
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#020202'};
    width: 90.75px;
  }
  .khp {
    text-align: left;
  }
  .gi {
  }
  .div376 {
    height: 20px;
  }
  .div377,
  .div378,
  .div380 {
    width: 90.75px;
  }

  .kl {
    height: 20px;
  }
  .div376_new {
    width: 40px;
    height: 20px;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#020202')};
  }
  .parent45 {
    display: flex;
    flex-direction: row;
    padding: 0 0 0 4px;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }

  .buy {
    position: relative;
    display: flex;
    align-items: center;
    width: 32px;
    height: 20px;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 400;
  }
  .group-wrapper13 {
    position: relative;
    width: 84px;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
    color: #42a732;
  }
  .group-div {
    position: absolute;
    top: calc(50% - 12px);
    right: 0;
    width: 49px;
    height: 24px;
  }
  .div365 {
    position: absolute;
    top: calc(50% - 10px);
    right: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    width: 41px;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .group-child16 {
    position: absolute;
    top: calc(50% - 12px);
    right: 0;
    background-color: #234838;
    width: 12px;
    height: 24px;
  }
  .group-wrapper14 {
    position: relative;
    width: 84px;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .sell {
    position: relative;
    width: 72px;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .frame-parent270 {
    position: absolute;
    top: calc(50% - 12px);
    left: 0;
    width: 49px;
    height: 24px;
  }
  .group-child17 {
    position: absolute;
    top: calc(50% - 12px);
    left: 0;
    background-color: #234838;
    width: 12px;
    height: 24px;
  }
  .div366 {
    position: absolute;
    top: calc(50% - 10px);
    left: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    width: 41px;
    height: 20px;
    font-size: 13px;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#020202')};
  }
  .div367,
  .frame-parent269 {
    display: flex;
    align-items: center;
  }
  .div367 {
    position: relative;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#020202')};

    text-align: right;
    width: 60px;
    height: 20px;
    flex-shrink: 0;
    justify-content: flex-end;
    font-size: 13px;
    font-weight: 400;
  }
  .frame-parent269 {
    color: #42a732;
  }
  .frame-parent267,
  .frame-parent268,
  .frame-parent271 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .frame-parent267 {
    flex-direction: column;
    width: 100%;
    .parent-wrapper {
      width: 100%;
      padding: 6px 12px;
      display: flex;
      gap: 46px;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(48, 50, 59, 1)'
          : '1px solid #D5D7DC'};

      .parent-second,
      .parent-first {
        width: 50%;
        display: flex;
        line-height: 20px;
        align-items: center;
        justify-content: space-between;
        height: 20px;

        font-weight: 400;
        font-size: 14px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#020202'};
      }
      .parent-second {
        .text1 {
          padding-left: 3px;
        }
      }
    }
  }
  .frame-parent264 {
    flex-direction: column;
    .box-chart-match {
      margin: 24px 0;
      display: flex;
      gap: 12px;
      justify-content: space-between;
      align-items: flex-start;
      align-self: stretch;

      .chart-match-thirt,
      .chart-match-second,
      .chart-match-first {
        height: 80px;
        display: flex;
        width: calc(100% / 3);
        padding: 8px 4px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        border-radius: 8px;
        font-size: 14px;

        background: ${(props) =>
          props.screen_mode === 'dark' ? '#32333B' : '#F6F6F6'};
        .text-box-match {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(129, 132, 152, 1)'
              : 'rgba(8, 8, 8, 0.50)'};
          text-align: center;

          font-style: normal;
          font-weight: 500;
          line-height: 20px;
        }
      }
    }
  }
  .ant-table-content .ant-table-thead tr .ant-table-cell {
    color: ${(props) =>
      props.screen_mode === 'light' ? '#333 !important' : '#fff !important'};
    background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(31, 35, 44, 1) !important'
        : '#fff !important'};
  }
  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:first-child {
    border-start-start-radius: 0;
  }
  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:last-child {
    border-start-end-radius: 0;
  }
  .ant-table-wrapper .ant-table-tbody > tr > td {
    background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(31, 35, 44, 1) !important'
        : '#fff !important'};
  }
  .ant-empty-normal .ant-empty-description {
    color: ${(props) =>
      props.screen_mode === 'light' ? '#333 !important' : '#fff !important'};
  }
  .ant-menu-root {
    width: 100% !important;
    background-color: #1f232c;
  }
  .ant-menu-submenu {
    height: 100px !important ;
    color: #fff;
  }

  .frame-parent216 {
    /* position: absolute;
  top: 100px;
  left: 24px; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${(props) => (props.screen_mode === 'dark' ? '#5f6b7c' : '#a3a09b')};
  }
  .frame-parent217 {
    align-self: stretch;
    border-radius: 8px 8px 0 0;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#28292f' : '#d2d2d2'};
    display: flex;
    flex-direction: row;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
  }
  .frame-parent218,
  .iconoutlinedsuggestedplus-parent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  }
  .iconoutlinedsuggestedplus-parent {
    gap: 12px;
  }
  .vuesaxlinearchart-container,
  .vuesaxlinearchart-parent {
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }
  .vuesaxlinearchart-container {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#333')};
  }
  .rectangle-parent {
    position: relative;
    width: 24px;
    height: 24px;
  }
  .volume {
    position: relative;
    font-weight: 500;
  }
  .frame-parent218,
  .iconoutlinedsuggestedplus-parent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  }
  .iconoutlinedsuggestedplus-parent {
    gap: 12px;
  }
  .edit-path {
    position: relative;
    width: 20px;
    height: 20px;
    overflow: hidden;
    flex-shrink: 0;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#333')};
  }
  .title-chart {
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
  }
  .title-chart-default {
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
  }
  .chil-btn {
    display: flex;
    align-items: center;
    margin-left: 24px;
  }
  .icon-btn {
    margin-right: 24px;
  }
  .title {
    margin-left: 12px;

    font-size: 20px;
    color: ${(props) =>
      props.screen_mode === 'light' ? '#080808' : 'rgba(253, 253, 253, 1)'};
  }
  .title-chart:hover {
    background-color: rgba(66, 167, 50, 0.18) !important;
    border: 1px solid rgba(66, 167, 50, 1);

    cursor: pointer;
  }
  .status-code {
    width: 300px;
    display: flex;
    height: 316px;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 24px;
    background: ${(props) =>
      props.screen_mode === 'light' ? '#fdfdfd' : '#1F232C'};
  }
  .title-status {
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};

    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .table-code {
    display: flex;
    height: 228px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;
  }
  .body-table {
    /* display: flex; */
    justify-content: center;
    align-items: center;
    align-self: stretch;
  }
  .items-code {
    display: flex;
    padding: 2px 4px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
  .item {
    width: 51px;
    color: #3594ef;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .item1 {
    color: #42a732;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 64px;
  }

  .item2 {
    width: 49px;
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .item3 {
    width: 55px;
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .item4 {
    width: 55px;
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .item5 {
    width: 76px;
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .item6 {
    width: 98px;
    color: #42a732;
    text-align: right;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .header-table {
    display: flex;
    height: 32px;
    padding: 3px 5px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 4px;
    background: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(42, 46, 57, 1)'
        : 'rgba(240, 243, 250, 1)'};
  }
  .radius-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .virtual-transactions {
  }
  .total-mass {
    display: flex;
    justify-content: space-between;
    color: #fff;

    font-size: 14px;
    margin: 5px 0;
  }
  .my-acc {
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    font-size: 14px;
    background-color: ${(props) =>
      props.screen_mode === 'light'
        ? 'rgba(240, 243, 250, 1)'
        : ' rgba(42, 46, 57, 1)'};
    height: 32px;
    align-items: center;
    padding: 0 5px;
    font-weight: 500;
  }
  .my-acc1 {
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
    font-size: 14px;
    padding: 0 5px;

    background-color: transparent;
    height: 32px;
    border-radius: 4px;

    align-items: center;
    font-weight: 500;
  }
  .main-container {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#1f232c' : '#fdfdfd'};

    padding: 10px 12px;
    height: 98%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .wrapper-scroll {
    overflow-x: scroll;
    height: 768px;
    padding: 0px 18px 0px 24px;
    .box-header-pagechart {
      display: flex;
      gap: 16px;
      flex-direction: column;
      margin-bottom: 24px;
      .header {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        color: #fff;
        width: 100%;
        .name-company {
          font-weight: 600;
          font-size: 18px;
          line-height: 28px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(153, 186, 255, 1)'
              : '#020202'};
        }
      }
      .price-stock-chart {
        padding: 8px 16px 12px 16px;
        border-radius: 6px;
        background-color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(41, 43, 50, 1)'
            : 'rgba(249, 250, 250, 1)'};
        .text {
          font-size: 13px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(129, 132, 152, 1);
        }
        .box-number {
          display: flex;
          gap: 16px;
          .number {
            font-size: 20px;
            font-weight: 600;
            line-height: 24px;
            /* color: rgba(209, 84, 73, 1); */
          }
        }
      }
    }
  }
  .id-company {
    color: rgba(53, 148, 239, 1);
    font-weight: 700;
    font-size: 18px;
  }
  .order-form {
    .form-group {
      display: flex;
      justify-content: space-between;
      color: #fff;

      margin: 12px 0;
      align-items: center;
      /* border-radius: 4px; */
    }
  }
  .setting-indicator-chart {
    display: flex;
    padding: 8px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    .title {
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
      text-align: center;

      font-size: 16px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      margin-left: 0;
    }
    .show-price {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      align-self: stretch;
      .box-first {
        display: flex;
        padding: 6px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        border-radius: 4px;
        background: ${(props) =>
          props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
        .text {
          color: #3594ef;
          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .number {
          color: #e43637;
          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
      .box-second {
        display: flex;
        height: 46px;
        padding: 6px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        border-radius: 4px;
        border: 1px solid
          var(--button-color-button-primary-color-button-primary, #42a732);
        background: var(
          --button-color-button-primary-color-button-primary_none,
          rgba(66, 167, 50, 0.2)
        );
        .text {
          color: var(
            --button-color-button-primary-color-button-primary,
            #42a732
          );
          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .number {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : 'black'};
          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
      .box-thirt {
        display: flex;
        padding: 6px;
        height: 46px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        border-radius: 4px;
        border: 1px solid
          var(--button-color-button-primary-color-button-primary, #42a732);
        background: var(
          --button-color-button-primary-color-button-primary_none,
          rgba(66, 167, 50, 0.2)
        );
        .text {
          color: var(
            --button-color-button-primary-color-button-primary,
            #42a732
          );
          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .number {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : 'black'};

          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
    }
  }
  .button-indicator-chart {
    display: flex;
    padding: 6px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 4px;
    background: var(
      --button-color-button-primary-color-button-primary,
      #f05d40
    );
    color: var(--text-text-primary-text-primary_D, #fff);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 10.5px;
  }
  .end-box-chart {
    display: flex;
    height: 166px;
    padding: 16px 16px 0px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    background: transparent;
    .tab-end-box {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      .tab-first {
        display: flex;
        padding: 6px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        background: var(
          --button-color-button-secondary-color-button-primary_none,
          rgba(53, 148, 239, 0.2)
        );
        color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};

        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .tab-second {
        color: var(--text-text-primary-text-primary_D, #fff);
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        display: flex;
        padding: 6px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        background: var(
          --button-color-button-secondary-color-button-primary,
          #3594ef
        );
      }
    }
    .table-end {
      width: 100%;
      div {
        .header-noti {
          display: flex;
          padding: 2px 4px;
          justify-content: space-between;
          align-items: center;
          align-self: stretch;
          .text-first {
            display: flex;
            width: 64px;
            height: 20px;
            flex-direction: column;
            justify-content: center;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};

            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
          .text-second {
            display: flex;
            width: 160px;
            height: 20px;
            justify-content: start;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};

            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
          .text-third {
            width: 52px;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};

            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
        }
        .noti :hover {
          overflow-y: scroll;
        }
      }
    }
  }
  .indicator-tool {
    overflow-y: scroll;
  }
  .buy-power {
    font-size: 14px;
    height: 32px;
    width: 199px;
    border-radius: 8px;
    padding: 8px;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA'};
    border: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(42, 46, 57, 1)'
        : '1px solid #F0F3FA'};
    text-align: left;
  }
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sell-button,
  .buy-button {
    width: 161px;
    height: 32px;
    border-radius: 8px;
    padding: 8px 12px;

    font-weight: 500;
    color: #fff;
    cursor: pointer;
  }

  .sell-button {
    background-color: rgba(228, 54, 55, 1);
    border: 1px solid rgba(228, 54, 55, 1);
  }
  .sell-button:hover {
    background-color: rgba(228, 54, 55, 0.5);
  }
  .buy-button {
    background-color: rgba(66, 167, 50, 1);
    border: 1px solid rgba(66, 167, 50, 1);
  }
  .buy-button:hover {
    background-color: rgba(66, 167, 50, 0.18) !important;
  }
  .input-transactions {
    position: relative;
    width: 339px;
    height: 36px;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA'};
    border-radius: 8px;
    margin: 8px 0;
    .search {
      background-color: transparent;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 8px;
      padding-left: 36px;
      outline: none;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
    }
    .search::placeholder {
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(255, 255, 255, 0.50)'
          : 'rgba(8, 8, 8, 0.50)'};

      font-size: 16px;
      font-style: italic;
      font-weight: 500;
      line-height: normal;
    }
  }
  .frame-parent257 {
    background: ${(props) =>
      props.screen_mode === 'dark'
        ? 'linear-gradient(to bottom, black, #1F232C)'
        : 'linear-gradient(to bottom, #ECECEF, #FDFDFD)'};
  }
  .input-friend {
    position: relative;
    width: 234px;
    height: 28px;
    background-color: rgba(36, 50, 44, 1);
    border-radius: 8px;
    outline: rgba(66, 167, 50, 1);
    border: 1px rgba(66, 167, 50, 1);
    margin: 8px 8px;
  }
  .icon-search-friend {
    position: absolute;
    top: 7px;
    left: 5px;
    width: 16px;
    height: 16px;
  }
  .icon-search {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  .search-friend {
    background-color: transparent;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    padding-left: 28px;
    outline: none;
    color: #fff;
  }
  .tab-transaction {
    padding: 0px 24px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 8px;
  }
  .ant-switch .ant-switch-inner {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
  }
  .btn-transaction {
    width: 50%;
    font-size: 15px;

    padding: 8px 12px;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: #fff;
    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
    font-size: 15px;
  }
  .btn-transaction1 {
    width: 50%;

    border-radius: 8px;
    padding: 14.5px 0;
    border: none;
    cursor: pointer;
    /* background-color: transparent; */
    color: #fff;
    font-size: 15px;
  }
  .btn-transaction:hover {
    border-bottom: 3px solid rgba(87, 90, 106, 1);
  }

  .up-down {
    position: relative;
  }
  .list-plus {
    position: absolute;
    top: 8px;
    right: 5px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: rgba(42, 46, 57, 1);
    border: none;
  }
  .ant-select-selector:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer).ant-select-selector {
    border: none;
    outline: none;
  }
  .ant-select-focused .ant-select-selector,
  .ant-select-selector:focus,
  .ant-select-selector:active,
  .ant-select-open .ant-select-selector {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
  }
  .ant-select-single.ant-select-open .ant-select-selection-item {
    color: #fff;
  }
  .ant-select-single .ant-select-selector {
    color: #fff !important;
  }
  .ant-select .ant-select-arrow {
    color: #fff;
  }
  :where(.css-dev-only-do-not-override-nllxry).ant-select-dropdown {
    background-color: #42a732;
  }
  .popper {
    position: absolute;
    backdrop-filter: blur(14px);
    width: 250px;
    height: 294px;
    border-radius: 8px;
    background-color: rgba(30, 72, 23, 0.2);
    border: 1px solid rgba(66, 167, 50, 0.6);
    right: 0;
    top: 30px;
  }
  .numerical-order {
    display: flex;
    width: 24px;
    height: 24px;
    padding: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10000px;
    background: rgba(66, 167, 50, 0.2);
    color: #42a732;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .item-indicator1 {
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 24px;
    flex: 1 0 0;
    border-radius: 8px;
    height: 32px;
    background: #2a2e39;
    font-size: 14px;
    font-weight: 400;
  }
  .check-box {
    display: flex;
    padding: 4px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 4px;
    /* background: #42A732; */
    cursor: pointer;
  }
  .ant-switch.ant-switch-checked .ant-switch-inner {
    background-color: rgba(66, 167, 50, 1);
  }
  .add-signal {
    display: flex;
    padding: 6px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 4px;
    background: #3594ef;
    width: 100%;
    height: 28px;
    border: #3594ef;
    margin-top: 8px;
    color: #fff;
  }
  .title-notification {
    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .notification {
    display: flex;
    height: 32px;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 8px;
    background: #2a2e39;
    margin-top: 11px;
  }
  .box1 {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
  }
  .noti-top {
    background: rgba(66, 167, 50, 0.2);
  }
  .noti-up {
    background: #42a732;
  }
  .noti-up,
  .noti-top {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: end;
    gap: 24px;
    flex: 1 0 0;
    border-radius: 8px;

    color: #fff;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex: 1 0 0;
    margin-top: 12px;
  }
  .wrapper-buy {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    .box-buy {
      display: flex;
      gap: 12px;
      align-items: center;
      .content {
        padding: 8px 4px;
        background-color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(41, 43, 50, 1)'
            : 'rgba(249, 250, 250, 1)'};
        width: calc(100% / 3);
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 6px;
        .number,
        .text {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(129, 132, 152, 1)'
              : 'rgba(116, 123, 139, 1)'};
        }
      }
    }
  }
`;
