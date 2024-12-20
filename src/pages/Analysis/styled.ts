import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledAnalysis = styled.div<Props>`
  .highcharts-legend-nav-active,
  .highcharts-legend-nav-inactive,
  .highcharts-legend-navigation .highcharts-button {
    transform: translateX(85%) translateY(-25px);
  }
  .highcharts-legend-navigation {
    display: none !important; /* Ẩn các nút điều hướng mặc định của Highcharts */
  }
  .highcharts-legend-nav-active circle,
  .highcharts-legend-nav-inactive circle {
    fill: none; /* Transparent fill for the circle */
    stroke: rgba(255, 255, 255, 0.2); /* Light circle border */
    stroke-width: 2px;
  }

  .highcharts-legend-nav-active path,
  .highcharts-legend-nav-inactive path {
    fill: none; /* No background fill for the arrow */
    stroke: #ccc; /* Arrow color */
    stroke-width: 2px;
  }

  .highcharts-legend-nav-active:hover circle {
    fill: rgba(255, 255, 255, 0.1); /* Hover background color */
  }

  @media (max-width: 1920px) {
    > .left-analysis {
      width: 360px;
      > .company-infomation {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)'};
        padding: 24px;
        border-radius: 6px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        > .company-list {
          > .ant-select {
            cursor: pointer;
            width: 78px;
            height: 35px;
            > .ant-select-selector {
              padding: 8px 12px 8px 16px;
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'transparent'
                  : 'rgba(255, 255, 255, 1)'};
              border-radius: 6px;
              border: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid rgba(74, 76, 90, 1)'
                  : '1px solid rgba(213, 215, 220, 1)'};
              > .ant-select-selection-item {
                font-size: 14px;
                font-weight: 300;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
              &:hover {
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid #818498'
                    : '1px solid  #878D9B'};
              }
            }
            > .ant-select-arrow {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
            }
          }
          > .ant-select-focused {
            > .ant-select-selector {
              &:hover {
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid #818498'
                    : '1px solid  #878D9B'};
              }
              > .ant-select-selection-search {
                input {
                  font-size: 16px;
                  font-weight: 500;

                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#202127'};
                }
              }
            }
          }
        }
        > .company {
          display: flex;
          gap: 24px;
          align-items: center;

          > img {
            border-radius: 6px;
            width: 120px;
            /* object-fit: contain;
          height: 60px; */
          }
          > .company-code {
            display: flex;
            flex-direction: column;
            gap: 8px;
            > span:first-of-type {
              font-size: 20px;
              font-weight: 600;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
            }
            > span:last-of-type {
              font-size: 20px;
              font-weight: 600;
              color: #42a732;
            }
          }
        }
        > .company-name {
          font-size: 20px;
          font-weight: 600;

          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        > .business-areas {
          display: flex;
          gap: 16px;

          > div {
            padding: 2px 12px;
            border-radius: 100px;
            min-width: 60px;

            background: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(54, 66, 99, 1)'
                : 'rgba(204, 221, 255, 1)'};
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'rgba(0, 74, 234, 1)'};
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
        }
        > .cash-flow {
          > .cash-flow-details {
            display: flex;
            flex-direction: column;

            border-radius: 4px;
            padding: 4px 5px;
            margin-bottom: 6px;
            > span {
              font-size: 14px;
              font-weight: 600;

              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(129, 132, 152, 1)'
                  : 'rgba(116, 123, 139, 1)'};
              line-height: 20px;
            }
            > span:last-of-type {
              font-size: 14px;
              font-weight: 400;

              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
              line-height: 20px;
            }
          }
        }
        > .company-description {
          > span:first-of-type {
            display: inline-block;
            > div {
              font-size: 14px;
              font-weight: 400;

              line-height: 24px;
              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : '#202127'};
            }
          }
          > span:first-of-type {
            display: inline-block;
            > p {
              font-size: 14px;
              font-weight: 400;

              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(255, 255, 255)'
                  : 'rgba(2, 2, 2)'};
              margin: 0;
            }
          }
          > span:last-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 400;

            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(153, 186, 255, 1)'
                : 'rgba(0, 74, 234, 1)'};
            cursor: pointer;
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
    }
    > .right-analysis {
      width: calc(100% - 360px - 12px);
      display: flex;
      margin-bottom: 8px;
      flex-direction: column;
      gap: 8px;
      .ant-tabs-nav {
        > .ant-tabs-nav-wrap {
          > .ant-tabs-nav-list {
            gap: 16px;
            > .ant-tabs-tab {
              justify-content: center;
              min-height: 19px;
              padding: 8px 11px;

              /* border-radius: 8px; */
              margin: 0;

              > .ant-tabs-tab-btn {
                font-size: 15px;
                font-weight: 400;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
            }
            > .ant-tabs-tab:hover {
              /* background-color: rgba(66, 167, 50, 0.18);
              border: 1px solid rgba(66, 167, 50, 1); */
            }
            > .ant-tabs-tab-active {
              min-width: 106px;
              padding: 8px 11px;
              border-bottom: 3px solid rgba(0, 74, 234, 1);
              > .ant-tabs-tab-btn {
                font-size: 15px;
                font-weight: 500;
                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(153, 186, 255, 1)'
                    : 'rgba(0, 74, 234, 1)'};
              }
            }
            > .ant-tabs-tab-active:hover {
              /* border-radius: 8px;
              background-color: ${(props) =>
                props.screen_mode === 'dark' ? '#42A732' : '#42A732'};
              backdrop-filter: blur(7px); */
              > .ant-tabs-tab-btn {
                font-weight: 400;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'rgb(32, 33, 39)'};
              }
            }
            > .ant-tabs-ink-bar {
              display: none;
            }
          }
        }
      }
      .ant-tabs-nav::before {
        display: none;
      }
      .ant-tabs-content-holder {
        > .ant-tabs-content-top {
          > .ant-tabs-tabpane {
          }
        }
      }
      > .company-financial {
        /* flex: 80%;
      padding: 24px 24px 10px 24px;
      background: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)'};
      border-radius: 8px; */
        .ant-tabs-nav {
          > .ant-tabs-nav-wrap {
            > .ant-tabs-nav-list {
              gap: 16px;
              > .ant-tabs-tab {
                /* justify-content: center; */
                min-height: 19px;
                padding: 8px 11px;

                /* border-radius: 8px; */
                margin: 0;
                &:hover .ant-tabs-tab-btn {
                  /* color: #42a732; */
                }
                > .ant-tabs-tab-btn {
                  font-size: 15px;
                  font-weight: 400;

                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#202127'};
                }
              }
              > .ant-tabs-tab:hover {
                /* background-color: rgba(66, 167, 50, 0.18);
              border: 1px solid rgba(66, 167, 50, 1); */
              }
              > .ant-tabs-tab-active {
                min-width: 106px;
                padding: 8px 11px;
                /* border-bottom: 3px solid rgba(0, 74, 234, 1); */
                > .ant-tabs-tab-btn {
                  font-size: 15px;
                  font-weight: 500;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(153, 186, 255, 1)'
                      : 'rgba(0, 74, 234, 1)'};
                }
              }
              > .ant-tabs-tab-active:hover {
                /* border-radius: 8px;
              background-color: ${(props) =>
                  props.screen_mode === 'dark' ? '#42A732' : '#42A732'};
              backdrop-filter: blur(7px); */
                > .ant-tabs-tab-btn {
                  font-weight: 400;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : 'rgb(32, 33, 39)'};
                }
              }
              > .ant-tabs-ink-bar {
                display: none;
              }
            }
          }
        }
        .ant-tabs-nav::before {
          display: none;
        }
        .ant-tabs-content-holder {
          > .ant-tabs-content-top {
            > .ant-tabs-tabpane {
            }
          }
        }
        > .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          > .general-stock {
            background-color: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            .normal {
              .ant-tabs-nav {
                > .ant-tabs-nav-wrap {
                  > .ant-tabs-nav-list {
                    gap: 16px;
                    > .ant-tabs-tab {
                      justify-content: center;
                      min-height: 19px;
                      padding: 8px 11px;

                      /* border-radius: 8px; */
                      margin: 0;
                      &:hover .ant-tabs-tab-btn {
                        /* color: #42a732; */
                      }
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 400;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? '#fff' : '#202127'};
                      }
                    }
                    > .ant-tabs-tab:hover {
                      border-bottom: 3px solid rgba(87, 90, 106, 1);
                    }
                    > .ant-tabs-tab-active {
                      min-width: 106px;
                      padding: 8px 24px;
                      /* border-bottom: 3px solid rgba(0, 74, 234, 1); */
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 500;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : 'rgba(0, 74, 234, 1)'};
                      }
                    }
                    > .ant-tabs-tab-active:hover {
                      /* border-radius: 8px;
              background-color: ${(props) =>
                        props.screen_mode === 'dark' ? '#42A732' : '#42A732'};
              backdrop-filter: blur(7px); */
                      > .ant-tabs-tab-btn {
                        font-weight: 400;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '#fff'
                            : 'rgb(32, 33, 39)'};
                      }
                    }
                    > .ant-tabs-ink-bar {
                      display: none;
                    }
                  }
                }
              }
              .ant-tabs-nav::before {
                display: none;
              }
              .ant-tabs-content-holder {
                > .ant-tabs-content-top {
                  > .ant-tabs-tabpane {
                  }
                }
              }
            }
            .tab-chart {
              .ant-tabs-nav {
                margin: 0 !important;
                border: none;
                > .ant-tabs-nav-wrap {
                  > .ant-tabs-nav-list {
                    gap: 16px;
                    > .ant-tabs-tab {
                      justify-content: center;
                      min-height: 19px;
                      padding: 8px 11px;
                      margin: 0;
                      &:hover {
                        /* color: #42a732; */
                        border-bottom: 3px solid rgba(87, 90, 106, 1);
                      }
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 400;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? '#fff' : '#202127'};
                      }
                    }
                    > .ant-tabs-tab:hover {
                      /* background-color: rgba(66, 167, 50, 0.18);
              border: 1px solid rgba(66, 167, 50, 1); */
                    }
                    > .ant-tabs-tab-active {
                      min-width: 106px;
                      padding: 8px 24px;
                      /* border-bottom: 3px solid rgba(0, 74, 234, 1); */
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 500;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : 'rgba(0, 74, 234, 1)'};
                      }
                    }
                    > .ant-tabs-tab-active:hover {
                      > .ant-tabs-tab-btn {
                        font-weight: 400;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '#fff'
                            : 'rgb(32, 33, 39)'};
                      }
                    }
                    > .ant-tabs-ink-bar {
                      display: none;
                    }
                  }
                }
              }
              .ant-tabs-nav::before {
                display: none;
              }
              .ant-tabs-content-holder {
                > .ant-tabs-content-top {
                  > .ant-tabs-tabpane {
                  }
                }
              }
            }
            > .box-stock {
              display: flex;
              > .number-stock {
                padding: 16px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(41, 43, 50, 1)'
                    : 'rgba(249, 250, 250, 1)'};
                border-radius: 6px;
                width: calc(100% - 77.7%);
                > .stock-price {
                  display: flex;
                  /* justify-content: space-between; */
                  flex-direction: column;
                  gap: 20px;
                  padding-bottom: 20px;
                  > .stock-price-children {
                    display: flex;
                    align-items: center;
                    > .infomation {
                      justify-content: center;
                      align-items: center;
                      display: flex;
                      > span:nth-of-type(1) {
                        font-size: 36px;
                        font-weight: 600;

                        color: #e43637;
                        padding-right: 18px;
                      }
                      > span:nth-of-type(2) {
                        font-size: 24px;
                        font-weight: 500;

                        color: #e43637;
                        padding-right: 12px;
                      }
                      > span:nth-of-type(3) {
                        padding: 8px 12px;
                        border-radius: 100px;
                        background: #e43637;
                        backdrop-filter: blur(7px);
                        font-size: 14px;
                        font-weight: 400;
                        color: #fff;
                        /* margin-right: 16px; */
                      }
                    }
                  }
                  > .market {
                    display: flex;
                    align-items: center;
                    /* padding-top: 12px; */
                    gap: 8px;
                    padding: 4px 8px;
                    border-radius: 100px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.2)'
                        : '1px solid rgba(213, 215, 220, 1)'};
                    width: 95px;
                    justify-content: center;
                    > span {
                      font-size: 13px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(116, 123, 139, 1)'};
                    }
                  }
                }
                > .limit-price {
                  display: flex;
                  gap: 20px;
                  flex-direction: column;
                  > .lowest-price {
                    display: flex;

                    flex-direction: column;
                    padding-right: 46px;
                    > span:first-of-type {
                      font-size: 14px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(116, 123, 139, 1)'};
                    }
                    > span:last-of-type {
                      font-size: 20px;
                      font-weight: 600;

                      color: rgba(209, 84, 73, 1);
                    }
                  }
                  > .highest-price {
                    display: flex;

                    flex-direction: column;

                    padding-right: 16px;
                    > span:first-of-type {
                      font-size: 14px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(116, 123, 139, 1)'};
                    }
                    > span:last-of-type {
                      font-size: 20px;
                      font-weight: 600;

                      color: rgba(92, 214, 128, 1);
                    }
                  }
                  > .hour {
                    > .ant-select {
                      cursor: pointer;
                      width: 78px;
                      height: 35px;
                      > .ant-select-selector {
                        &:hover {
                          border: ${(props) =>
                            props.screen_mode === 'dark'
                              ? '1px solid #818498'
                              : '1px solid  #878D9B'};
                        }
                        padding: 8px 12px;
                        background: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '#2a2e39'
                            : 'rgba(255, 255, 255, 1)'};
                        border-radius: 8px;
                        > .ant-select-selection-item {
                          font-size: 16px;
                          font-weight: 500;

                          color: ${(props) =>
                            props.screen_mode === 'dark' ? '#fff' : '#202127'};
                        }
                      }
                    }
                  }
                }
              }
              > .financial-report {
                display: flex;
                width: 77.7%;
                > .vic-table {
                  padding: 0 40px;
                  width: calc(100% / 3);
                  /* padding-right: 8px; */
                  border-right: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > div:first-of-type {
                    font-size: 15px;
                    font-weight: 600;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                    padding-bottom: 8px;
                  }
                  > table {
                    width: 100%;
                    border-collapse: collapse;
                    > tbody {
                      > tr {
                        > td:first-of-type {
                          padding: 8px 23px 8px 0px;
                          list-style-type: disc;
                          /* list-style: decimal; */
                          font-size: 14px;
                          font-weight: 500;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(171, 173, 186, 1)'
                              : 'rgba(116, 123, 139, 1)'};
                          line-height: 20px;
                        }
                        > td:last-of-type {
                          padding: 8px 0;

                          font-size: 13px;
                          font-weight: 400;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(255, 255, 255, 1)'
                              : '#202127'};
                          line-height: 20px;
                        }
                      }
                    }
                  }
                }
                > .vic-table:last-of-type {
                  border-right: none;
                }
              }
            }
            > .company-introduce {
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? '#202127'
                  : 'rgba(236, 236, 239, 1)'};

              border-radius: 8px;

              > .wrapper-information {
                display: flex;
                gap: 64px;
                > .vic-table {
                  /* flex: 10%; */
                  /* padding-right: 80px; */
                  border-right: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid #343434'
                      : '1px solid rgb(204, 204, 204)'};
                  border-color: ${(props) =>
                    props.screen_mode === 'dark' ? '#3a3f42' : '#EDEDED'};
                  > div:first-of-type {
                    font-size: 15px;
                    font-weight: 500;
                    line-height: 28px;
                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#202127'};
                  }
                  > .box-info {
                    display: flex;
                    gap: 40px;
                    > .left {
                      > table {
                        /* width: 100%; */
                        min-width: 239px;
                        border-collapse: collapse;
                        > tbody {
                          > tr {
                            > td:first-of-type {
                              height: 36px;
                              display: flex;
                              align-items: center;
                              gap: 8px;
                              font-size: 14px;
                              font-weight: 400;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? 'rgba(171, 173, 186, 1)'
                                  : 'rgba(116, 123, 139, 1)'};
                              line-height: 20px;
                            }
                            > td:last-of-type {
                              height: 36px;

                              text-align: left;
                              font-size: 13px;
                              font-weight: 300;
                              line-height: 20px;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? '#fff'
                                  : '#202127'};
                            }
                          }
                        }
                      }
                    }
                    > .right {
                      > table {
                        /* width: 100%; */
                        min-width: 239px;
                        border-collapse: collapse;
                        > tbody {
                          > tr {
                            > td:first-of-type {
                              height: 36px;
                              display: flex;
                              align-items: center;
                              gap: 8px;
                              font-size: 14px;
                              font-weight: 400;
                              margin-right: 10px;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? 'rgba(171, 173, 186, 1)'
                                  : 'rgba(116, 123, 139, 1)'};
                              line-height: 20px;
                            }
                            > td:last-of-type {
                              height: 36px;

                              text-align: left;
                              font-size: 13px;
                              font-weight: 300;
                              line-height: 20px;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? '#fff'
                                  : '#202127'};
                            }
                          }
                        }
                      }
                    }
                  }
                }
                > .vic-table:first-of-type {
                  padding-right: 64px;
                }
                > .vic-table:last-of-type {
                  padding-left: 8px;
                  border-right: none;
                }
              }
            }
            > .wrapper-financial {
              .ant-table-wrapper .ant-table-cell,
              :where(.css-dev-only-do-not-override-1k979oh).ant-table-wrapper
                .ant-table-thead
                > tr
                > th {
                padding: 11px 16px;
              }
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
              > .financial {
                background-color: ${(props) =>
                  props.screen_mode === 'light'
                    ? 'rgba(236, 236, 239, 1) !important'
                    : '#202127 !important'};
                border-radius: 8px;

                .table {
                  overflow-x: auto;
                  /* height: 270px; */
                  .ant-table-wrapper .ant-table .ant-table-header {
                    border-radius: unset;
                  }
                  .ant-table-wrapper .ant-table-sticky-holder {
                    background: transparent !important;
                  }
                  .ant-table-wrapper
                    .ant-table-container
                    table
                    > thead
                    > tr:first-child
                    > *:first-child {
                    padding: 0;
                  }
                  .ant-table-wrapper
                    .ant-table-tbody
                    > tr.ant-table-placeholder
                    :hover {
                    background-color: ${(props) =>
                      props.screen_mode === 'light'
                        ? 'rgba(236, 236, 239, 1) !important'
                        : '#202127 !important'};
                  }
                  .ant-table-tbody > tr:nth-child(2n) > td {
                    background-color: ${(props) =>
                      props.screen_mode === 'light'
                        ? 'rgba(236, 236, 239, 1) !important'
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
                  .ant-table-wrapper
                    .ant-table-thead
                    > tr:not(:last-child)
                    > th[colspan] {
                    border-bottom: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid #3a3f42 !important'
                        : '1px solid #ccc !important'};
                  }
                  .ant-pagination
                    .ant-pagination-prev
                    .ant-pagination-item-link,
                  .ant-pagination
                    .ant-pagination-next
                    .ant-pagination-item-link {
                    background-color: ${(props) =>
                      props.screen_mode === 'light'
                        ? 'rgba(236, 236, 239, 1)'
                        : '#323546'};
                  }

                  .ant-pagination
                    .ant-pagination-prev
                    .ant-pagination-item-link,
                  .ant-pagination .ant-pagination-next button {
                    color: ${(props) =>
                      props.screen_mode === 'light' ? 'black' : '#fff'};
                  }
                  .ant-pagination .ant-pagination-item a {
                    color: ${(props) =>
                      props.screen_mode === 'light' ? 'black' : '#fff'};
                  }
                  .ant-pagination .ant-pagination-item-active a {
                    color: #1677ff;
                  }
                  .ant-pagination
                    .ant-pagination-disabled
                    .ant-pagination-item-link {
                    color: ${(props) =>
                      props.screen_mode === 'light' ? 'black' : '#fff'};
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
                    font-size: 13px;
                    font-weight: 400;
                    text-align: center;
                    border-bottom: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid #3a3f42 !important'
                        : '1px solid #ccc !important'};
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(171, 173, 186, 1)'
                        : 'rgba(46, 49, 56, 1)'};
                    line-height: 20px;
                  }

                  .ant-table-wrapper .ant-table-tbody > tr > td:nth-child(1) {
                    font-size: 14px;
                    font-weight: 400;
                    text-align: left;

                    padding-left: 12px;
                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    line-height: 20px;
                  }
                  .ant-table-wrapper .ant-table-tbody > tr > td:last-child {
                    border-radius: 0 4px 4px 0;
                  }
                  .ant-table-tbody > tr > td {
                    padding: 8px 25px;
                  }
                  /* .ant-table-tbody > tr > td {
      background-color: ${(props) =>
                    props.screen_mode === 'light'
                      ? 'rgba(213, 215, 220, 1)'
                      : 'rgba(31, 35, 44, 1)'};
    } */
                }
                .note {
                  display: flex;
                  align-items: center;
                  background: ${(props) =>
                    props.screen_mode === 'dark'
                      ? ' #202127'
                      : 'rgba(236, 236, 239, 1)'};
                  padding: 12px 18px;
                  > span:first-of-type {
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                    font-size: 14px;

                    font-style: italic;
                    font-weight: 500;
                  }
                  > span:last-of-type {
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                    font-size: 14px;

                    font-style: italic;
                    font-weight: 400;
                  }
                }
              }
            }
          }
          .box-content-general {
            display: flex;
            gap: 8px;
            > .news {
              width: calc(100% / 3);
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? '#202127'
                  : 'rgba(236, 236, 239, 1)'};
              max-height: 920px;
              padding: 0px 24px 24px 24px;
              border-radius: 8px;
              > .title {
                font-size: 15px;
                font-weight: 600;

                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 1)'
                    : '#202127'};
                padding: 17px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .boxlist-news {
                overflow-y: auto;
                height: 832px;

                > .posts {
                  display: flex;
                  gap: 16px;
                  padding: 24px 0;
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid #3a3f42 '
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > img {
                    background: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '#fff'
                        : 'rgba(213, 215, 220, 1)'};
                  }
                  > .post {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    > a {
                      > .post-title {
                        font-size: 15px;
                        font-weight: 500;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(255, 255, 255, 1)'
                            : '#202127'};
                        line-height: 20px;
                      }
                    }
                    > .content {
                      font-size: 13px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(2, 2, 2)'};
                      line-height: 20px;
                    }
                    > .post-time {
                      display: flex;
                      gap: 16px;
                      justify-content: space-between;
                      > div:first-of-type {
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 20px;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(79, 120, 58, 1)'};
                      }
                      > .time {
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 20px;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(171, 173, 186, 1)'
                            : 'rgba(116, 123, 139, 1)'};
                      }
                    }
                  }
                }
              }
              > .boxlist-news::-webkit-scrollbar {
                display: none; /* Ẩn thanh cuộn cho trình duyệt Webkit (Chrome, Safari, Edge) */
              }

              > .boxlist-news {
                -ms-overflow-style: none; /* Ẩn thanh cuộn cho Internet Explorer và Edge */
                scrollbar-width: none; /* Ẩn thanh cuộn cho Firefox */
              }

              > .posts:last-child {
                padding-bottom: 0;
              }
            }
            > .analysis-tabs {
              .title-analysis {
                font-size: 15px;
                font-weight: 600;

                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 1)'
                    : '#202127'};
                padding: 17px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .analysis-report {
                height: 845px;
                scrollbar-width: none;
                overflow-y: scroll;
                > .analysis-report-children {
                  cursor: pointer;
                  padding: 24px 0;

                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  display: flex;
                  gap: 8px;
                  .icon-child {
                    width: 20px;
                    height: 20px;
                  }
                  > .item-child {
                    /* min-width: 410px; */
                    flex-grow: 1;
                    > .title {
                      font-size: 14px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff ' : '#202127'};
                      margin-bottom: 4px;
                    }
                    > .post-time {
                      display: flex;
                      gap: 16px;
                      justify-content: space-between;
                      align-items: center;

                      > div:first-of-type {
                        font-size: 13px;
                        font-weight: 400;
                      }
                      > .time {
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        > span {
                          font-size: 13px;
                          font-weight: 400;
                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(171, 173, 186, 1)'
                              : 'rgba(116, 123, 139, 1)'};
                        }
                      }
                    }
                  }
                }
              }
              > .download-report {
                height: 845px;
                overflow-y: scroll;
                scrollbar-width: none;
                > .column-report {
                  display: flex;
                  justify-content: space-between;
                  padding: 10px 0;
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > span:first-of-type {
                    flex: 10%;

                    font-size: 14px;
                    font-weight: 500;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > span:nth-of-type(2) {
                    flex: 12%;
                    font-size: 14px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > span:nth-of-type(3) {
                    flex: 50%;
                    font-size: 14px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > span:last-of-type {
                    flex: 20%;
                  }
                }
                > .row-record {
                  display: flex;
                  justify-content: space-between;
                  padding: 10px 4px;
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > span:first-of-type {
                    flex: 12%;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > span:nth-of-type(2) {
                    flex: 12%;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255, 1)'
                        : 'rgba(46, 49, 56, 1)'};
                  }
                  > span:nth-of-type(3) {
                    flex: 65%;
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > span:last-of-type {
                    flex: 5%;
                    text-align: right;
                    padding-right: 10px;

                    cursor: pointer;
                    &:hover svg path {
                      cursor: pointer;
                      fill: ${(props) =>
                        props.screen_mode === 'light'
                          ? 'rgb(111 155 247)'
                          : 'rgb(31 102 255)'};
                    }
                  }
                }
              }
            }
            > .analysis-tabs {
              width: calc(100% / 3);

              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? '#202127'
                  : 'rgba(236, 236, 239, 1)'};
              max-height: 920px;
              padding: 0px 24px 24px 24px;
              border-radius: 8px;
              > .ant-tabs {
                > .ant-tabs-content-holder {
                  overflow: auto;
                  height: 823px;
                  width: 100%;
                }
                .ant-tabs-content-holder::-webkit-scrollbar {
                  display: none; /* Ẩn thanh cuộn cho trình duyệt Webkit (Chrome, Safari, Edge) */
                }

                .ant-tabs-content-holder {
                  -ms-overflow-style: none; /* Ẩn thanh cuộn cho Internet Explorer và Edge */
                  scrollbar-width: none; /* Ẩn thanh cuộn cho Firefox */
                }
                > .ant-tabs-nav {
                  margin: 0;
                  > .ant-tabs-nav-wrap {
                    > .ant-tabs-nav-list {
                      > .ant-tabs-tab {
                        padding: 0;
                        > .ant-tabs-tab-btn {
                          font-size: 20px;
                          font-weight: 400;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(255, 255, 255, 1)'
                              : 'rgba(2, 2, 2)'};
                        }
                      }
                      > .ant-tabs-tab-active {
                        padding: 12px 0;
                        > .ant-tabs-tab-btn {
                          font-size: 15px;
                          font-weight: 600;
                          line-height: 28px;
                          color: ${(props) =>
                            props.screen_mode === 'dark' ? '#fff ' : '#202127'};
                        }
                      }
                      > .ant-tabs-ink-bar {
                        display: none;
                      }
                    }
                  }
                }
                > .ant-tabs-nav::before {
                  display: none;
                }
                > .ant-tabs-content-holder {
                  > .ant-tabs-content {
                    > .ant-tabs-tabpane {
                    }
                  }
                }
              }
            }

            > .general-chart {
              width: calc(100% / 3);

              > .company-chart {
                position: relative;
                > div:first-of-type {
                  position: absolute;
                  left: 4%;
                  top: 4%;
                  font-size: 20px;
                  font-weight: 500;

                  z-index: 10;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff ' : '#202127'};
                }
                > .tab-data {
                  position: absolute;
                  top: 3%;
                  left: 24%;
                  > .ant-tabs {
                    > .ant-tabs-nav {
                      > .ant-tabs-nav-wrap {
                        > .ant-tabs-nav-list {
                          > .ant-tabs-tab {
                            font-size: 14px;
                            font-weight: 500;

                            color: ${(props) =>
                              props.screen_mode === 'dark'
                                ? 'rgba(255, 255, 255)'
                                : 'rgba(2, 2, 2)'};
                          }
                          .ant-tabs-tab {
                            margin-right: 18px;
                            width: 46px;
                            height: 32px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          }
                          > .ant-tabs-tab-active {
                            background: #3594ef;
                            padding: 2px 14px;
                            border-radius: 8px;
                            > .ant-tabs-tab-btn {
                              font-size: 14px;
                              font-weight: 500;

                              color: #fff;
                            }
                          }
                          > .ant-tabs-ink-bar {
                            display: none;
                          }
                        }
                      }
                    }
                    > .ant-tabs-nav::before {
                      display: none;
                    }
                    > .ant-tabs-content-holder {
                      display: none;
                    }
                  }
                }
              }
              > .company-chart:first-of-type {
                margin-bottom: 16px;
              }
              .echarts-for-react {
                background: ${(props) =>
                  props.screen_mode === 'dark' ? '#202127' : '#fff'};
                border-radius: 8px;
                height: 430px !important;
                max-width: unset !important;
                > div {
                  > canvas {
                    width: 650px !important;
                  }
                }
              }
            }
          }
        }
      }

      > .wrapper-profile {
        display: flex;
        width: 100%;
        > .profile {
          width: 100%;
          /* flex: 100%; */
          display: flex;
          flex-direction: column;
          gap: 8px;
          > .children-company-01 {
            /* margin-bottom: 12px; */
            height: 420px;
            /* padding: 0px 24px 24px 24px; */
            border-radius: 6px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            > .table-no-data {
              height: 80%;
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
            > .title-company-01 {
              display: flex;
              width: 100%;
              > .company-child {
                font-size: 16px;
                font-weight: 600;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                line-height: 28px;
                padding: 14px 0;
                width: 100%;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .title1 {
                width: 98%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
              > .title2 {
                width: 25%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
            }
            > .table-list {
              display: flex;
              height: 390px;
              flex-direction: column;
              align-items: flex-start;

              flex: 1 0 0;
              width: 100%;
              padding-bottom: 16px;
              > .header {
                display: flex;

                > .item {
                  text-align: left;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 20px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(129, 132, 152, 1)'
                      : 'rgba(116, 123, 139, 1)'};
                  padding: 6px 0;
                  > tr {
                    > th {
                      padding: 2px 4px;
                      font-weight: 500;
                    }
                    > th:last-of-type {
                      text-align: right;
                    }
                  }
                }
                > .item:nth-of-type(1) {
                  padding-left: 12px;
                  width: 37px;
                }
                > .item:nth-of-type(2) {
                  width: 295px;
                }
                > .item:nth-of-type(3) {
                  width: 152px;
                }
                > .item:nth-of-type(4) {
                  width: 91px;
                }
                > .item:nth-of-type(5) {
                  width: 113px;
                }

                > tbody::before {
                  content: '';
                  display: block;
                  height: 12px;
                }
              }
              > .body-tb {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: flex-start;
                overflow-y: scroll;
                /* padding-left: 12px; */
                > .item-tb {
                  display: flex;
                  padding: 6px 0px;
                  /* justify-content: space-between; */
                  align-items: center;
                  align-self: stretch;
                  border-top: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > td:nth-of-type(1) {
                    padding-left: 12px;
                    width: 37px;
                    text-align: left;
                    color: rgba(129, 132, 152, 1);
                  }
                  > td:nth-of-type(2) {
                    text-align: left;
                    width: 295px;
                  }
                  > td:nth-of-type(3) {
                    width: 152px;
                  }
                  > td:nth-of-type(4) {
                    width: 91px;
                  }
                  > td:nth-of-type(5) {
                    width: 113px;
                  }
                  > td {
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 400;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > td:last-of-type {
                    text-align: left;
                  }
                }
              }
            }
            > .shareholder-box {
              display: flex;
              gap: 8px;
              width: 100%;
              > .table-list-shareholder {
                padding: 0 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                display: flex;
                height: 420px;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                width: 736px;
                padding-bottom: 16px;
                .title1 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                > .header {
                  display: flex;
                  padding: 2px 4px;
                  justify-content: space-between;
                  align-items: center;
                  /* align-self: stretch; */
                  > .item {
                    text-align: left;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : 'rgba(116, 123, 139, 1)'};
                    /* > tr {
                  > th {
                    padding: 2px 4px;
                    font-weight: 500;
                  }
                  > th:last-of-type {
                    text-align: right;
                  }
                } */
                  }
                  > .item:nth-of-type(1) {
                    width: 41px;
                    text-align: left;
                  }
                  > .item:nth-of-type(2) {
                    width: 81px;
                    text-align: left;
                  }
                  > .item:nth-of-type(3) {
                    width: 231px;
                    text-align: left;
                  }
                  > .item:nth-of-type(4) {
                    width: 120px;
                    text-align: left;
                  }
                  > .item:nth-of-type(5) {
                    width: 84px;
                    text-align: left;
                  }
                  > .item:nth-of-type(6) {
                    width: 120px;
                    text-align: right;
                  }
                  > tbody::before {
                    content: '';
                    display: block;
                    height: 12px;
                  }
                }
                > .body-tb {
                  display: flex;
                  width: 100%;
                  flex-direction: column;
                  align-items: flex-start;
                  overflow-y: scroll;
                  > .item-tb {
                    display: flex;
                    padding: 6px 4px;
                    /* justify-content: space-between; */
                    align-items: center;
                    align-self: stretch;
                    /* gap: 16px; */
                    border-top: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid rgba(213, 215, 220, 1)'};
                    > td:nth-of-type(1) {
                      width: 37px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                    }
                    > td:nth-of-type(2) {
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                      width: 84px;
                    }
                    > td:nth-of-type(3) {
                      width: 227px;
                    }
                    > td:nth-of-type(4) {
                      width: 121px;
                    }
                    > td:nth-of-type(5) {
                      width: 139px;
                    }
                    > td {
                      padding: 2px 4px;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(255, 255, 255)'
                          : 'rgba(2, 2, 2)'};
                    }
                    > td:last-of-type {
                      text-align: right;
                    }
                  }
                }
              }
              > .chart {
                padding: 0px 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                width: 50%;
                .title2 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                .highcharts-container {
                  margin-top: 40px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }

          > .history-general {
            padding: 24px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            border-radius: 8px;
            > .general {
              > div {
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
              > .content {
                > span {
                  > div {
                    font-size: 16px !important;
                    font-weight: 400;

                    padding: 16px 0;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                }
              }
            }
          }
        }
      }
      .connect {
        display: flex;
        gap: 8px;

        .box-company-connection {
          width: 736px;

          > .children-company-01 {
            margin-bottom: 8px;
            height: 420px;
            padding: 0px 24px 24px 24px;
            border-radius: 6px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            > .table-no-data {
              height: 80%;
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
            > .title-company-01 {
              display: flex;
              width: 100%;
              > .company-child {
                font-size: 16px;
                font-weight: 600;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                line-height: 28px;
                padding: 14px 0;
                width: 100%;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .title1 {
                width: 98%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
              > .title2 {
                width: 25%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
            }
            > .table-list {
              display: flex;
              height: 355px;
              flex-direction: column;
              align-items: flex-start;

              flex: 1 0 0;
              width: 100%;
              padding-bottom: 16px;
              > .header {
                display: flex;

                > .item {
                  text-align: left;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 20px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(129, 132, 152, 1)'
                      : 'rgba(116, 123, 139, 1)'};
                  padding: 6px 0;
                  > tr {
                    > th {
                      padding: 2px 4px;
                      font-weight: 500;
                    }
                    > th:last-of-type {
                      text-align: right;
                    }
                  }
                }
                > .item:nth-of-type(1) {
                  padding-left: 12px;
                  width: 37px;
                }
                > .item:nth-of-type(2) {
                  width: 295px;
                }
                > .item:nth-of-type(3) {
                  width: 152px;
                }
                > .item:nth-of-type(4) {
                  width: 91px;
                }
                > .item:nth-of-type(5) {
                  width: 113px;
                }

                > tbody::before {
                  content: '';
                  display: block;
                  height: 12px;
                }
              }
              > .body-tb {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: flex-start;
                overflow-y: scroll;
                /* padding-left: 12px; */
                > .item-tb {
                  display: flex;
                  padding: 6px 0px;
                  /* justify-content: space-between; */
                  align-items: center;
                  align-self: stretch;
                  border-top: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > td:nth-of-type(1) {
                    padding-left: 12px;
                    width: 37px;
                    text-align: left;
                    color: rgba(129, 132, 152, 1);
                  }
                  > td:nth-of-type(2) {
                    text-align: left;
                    width: 295px;
                  }
                  > td:nth-of-type(3) {
                    width: 152px;
                  }
                  > td:nth-of-type(4) {
                    width: 91px;
                  }
                  > td:nth-of-type(5) {
                    width: 113px;
                  }
                  > td {
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 400;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > td:last-of-type {
                    text-align: left;
                  }
                }
              }
            }
            > .shareholder-box {
              display: flex;
              gap: 8px;
              width: 100%;
              > .table-list-shareholder {
                padding: 0 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                display: flex;
                height: 420px;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                width: 50%;
                padding-bottom: 16px;
                .title1 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                > .header {
                  display: flex;
                  padding: 2px 4px;
                  justify-content: space-between;
                  align-items: center;
                  /* align-self: stretch; */
                  > .item {
                    text-align: left;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : 'rgba(116, 123, 139, 1)'};
                    /* > tr {
                  > th {
                    padding: 2px 4px;
                    font-weight: 500;
                  }
                  > th:last-of-type {
                    text-align: right;
                  }
                } */
                  }
                  > .item:nth-of-type(1) {
                    width: 41px;
                    text-align: left;
                  }
                  > .item:nth-of-type(2) {
                    width: 81px;
                    text-align: left;
                  }
                  > .item:nth-of-type(3) {
                    width: 231px;
                    text-align: left;
                  }
                  > .item:nth-of-type(4) {
                    width: 120px;
                    text-align: left;
                  }
                  > .item:nth-of-type(5) {
                    width: 84px;
                    text-align: left;
                  }
                  > .item:nth-of-type(6) {
                    width: 139px;
                    text-align: right;
                  }
                  > tbody::before {
                    content: '';
                    display: block;
                    height: 12px;
                  }
                }
                > .body-tb {
                  display: flex;
                  width: 100%;
                  flex-direction: column;
                  align-items: flex-start;
                  overflow-y: scroll;
                  > .item-tb {
                    display: flex;
                    padding: 6px 4px;
                    /* justify-content: space-between; */
                    align-items: center;
                    align-self: stretch;
                    /* gap: 16px; */
                    border-top: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid rgba(213, 215, 220, 1)'};
                    > td:nth-of-type(1) {
                      width: 37px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                    }
                    > td:nth-of-type(2) {
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                      width: 84px;
                    }
                    > td:nth-of-type(3) {
                      width: 227px;
                    }
                    > td:nth-of-type(4) {
                      width: 121px;
                    }
                    > td:nth-of-type(5) {
                      width: 139px;
                    }
                    > td {
                      padding: 2px 4px;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(255, 255, 255)'
                          : 'rgba(2, 2, 2)'};
                    }
                    > td:last-of-type {
                      text-align: right;
                    }
                  }
                }
              }
              > .chart {
                padding: 0px 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                width: 50%;
                .title2 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                .highcharts-container {
                  margin-top: 40px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
          > .children-company-02 {
            padding: 0px 24px 24px 24px;
            border-radius: 8px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            height: 420px;
            overflow-y: auto;
            > .table-no-data {
              height: 80%;
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
            > div {
              font-size: 16px;
              font-weight: 600;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
              line-height: 28px;
              padding: 14px 0;
              width: 100%;
              border-bottom: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid rgba(48, 50, 59, 1)'
                  : '1px solid rgba(213, 215, 220, 1)'};
            }
            > table {
              width: 100%;
              border-collapse: collapse;
              > thead {
                > tr {
                  > th {
                    padding: 6px 0;

                    text-align: left;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > th:nth-of-type(1) {
                    padding-left: 12px;
                  }
                  > th:nth-of-type(2) {
                    padding-left: 5px;
                  }
                }
              }
              > tbody {
                > tr {
                  border-top: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > td:nth-of-type(1) {
                    color: rgba(129, 132, 152, 1);
                    padding-left: 12px;
                  }
                  > td {
                    padding: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > td:last-of-type {
                    text-align: right;
                  }
                }
              }
            }
          }
        }
        > .leadership {
          width: 50%;
          height: 852px;
          background: ${(props) =>
            props.screen_mode === 'dark'
              ? '#202127'
              : 'rgba(236, 236, 239, 1)'};
          padding: 0px 24px 24px 24px;
          border-radius: 8px;
          > div:first-of-type {
            font-size: 16px;
            font-weight: 600;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : '#202127'};
            line-height: 28px;
            padding: 14px 0;
            width: 100%;
            border-bottom: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)'};
          }
          .leadership-list {
            overflow-y: scroll;
            height: 770px;
            display: flex;
            flex-wrap: wrap;
            gap: 24px;

            > .ant-flex {
              width: 100%;
              margin-top: 24px;
              display: flex;
              flex-wrap: wrap; /* Đảm bảo các item có thể xuống dòng */
              gap: 24px; /* Khoảng cách giữa các item */

              > div {
                padding: 0;
                flex: 1 1 30%; /* Tự động chia theo chiều rộng, khoảng 3 item mỗi hàng */
                max-width: 213.3px; /* Đảm bảo mỗi item không lớn hơn 213.3px */

                > .leadership-children {
                  display: flex;
                  border-radius: 6px;
                  gap: 8px;
                  flex-direction: column;
                  padding: 24px;
                  border: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  justify-content: center;
                  align-items: center;
                  width: 100%; /* Chiếm toàn bộ chiều rộng có sẵn */

                  > div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    justify-content: center;
                    align-items: center;

                    > span:first-of-type {
                      text-align: center;
                      font-size: 13px;
                      font-weight: 600;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    }

                    > span:last-of-type {
                      font-size: 12px;
                      font-weight: 400;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(153, 186, 255, 1)'
                          : 'rgba(0, 74, 234, 1)'};
                    }
                  }
                }
              }
            }
          }
        }
      }

      > .transaction {
        background: ${(props) =>
          props.screen_mode === 'dark' ? ' #202127' : 'rgba(236, 236, 239, 1)'};
        padding: 24px 24px 16px;
        border-radius: 8px;
        max-height: 900px;
        overflow: auto;
        > .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          > .search {
            display: flex;
            align-items: center;
            gap: 16px;
            > .time {
              display: flex;
              flex-direction: column;
              gap: 8px;
              > span {
                font-size: 14px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
              > .ant-picker {
                background: ${(props) =>
                  props.screen_mode === 'dark' ? '#202127' : '#fff'};
                border-radius: 8px;
                > .ant-picker-input {
                  > input {
                    font-size: 14px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#202127'};
                  }
                  > input::placeholder {
                    font-size: 14px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > .ant-picker-suffix {
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                }
              }
            }
            > button {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5px;
              padding: 8px 12px;
              margin-top: 24px;
              background-color: rgba(53, 148, 239, 1);
            }
          }
          > .transaction-tabs {
            .ant-tabs-nav {
              > .ant-tabs-nav-wrap {
                > .ant-tabs-nav-list {
                  gap: 8px;
                  > .ant-tabs-tab {
                    /* justify-content: center; */
                    min-width: 160px;
                    min-height: 19px;
                    padding: 8px 12px;
                    margin: 0;
                    > .ant-tabs-tab-btn {
                      font-size: 15px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    }
                  }
                  > .ant-tabs-tab-active {
                    border-radius: 8px;
                    background: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(53, 148, 239, 1)'
                        : 'rgba(53, 148, 239, 1)'};
                    backdrop-filter: blur(7px);

                    > .ant-tabs-tab-btn {
                      font-size: 15px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#fff'};
                    }
                  }
                  > .ant-tabs-ink-bar {
                    display: none;
                  }
                }
              }
            }
            .ant-tabs-nav::before {
              display: none;
            }
            .ant-tabs-nav {
              margin: 0;
            }
            .ant-tabs-content-holder {
              display: none;
            }
          }
        }
        .ant-table {
          background: ${(props) =>
            props.screen_mode === 'dark' ? '#202127' : '#fff'};
          .ant-table-container {
            .ant-table-content {
              > table {
                > thead {
                  > tr {
                    > th {
                      background: ${(props) =>
                        props.screen_mode === 'dark'
                          ? '#202127'
                          : 'rgba(236, 236, 239, 1)'};
                      font-size: 14px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                      border-bottom: none;
                      padding: 8px 2px;
                    }
                    > th::before {
                      display: none;
                    }
                  }
                }
                > tbody {
                  > tr {
                    > td {
                      font-size: 14px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(255, 255, 255)'
                          : 'rgba(2, 2, 2)'};
                      border-bottom: none;
                      padding: 2px 4px;
                    }
                    > td:nth-of-type(3) {
                    }
                    .ant-table-cell-row-hover {
                      background: none;
                    }
                    .ant-empty-description {
                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    }
                  }
                  .ant-table-placeholder {
                    .ant-table-cell {
                      background: ${(props) =>
                        props.screen_mode === 'dark' ? '#202127' : '#fff'};
                    }
                  }
                  .odd-row {
                    background: ${(props) =>
                      props.screen_mode === 'dark' ? '#2a2e39' : '#EDEDED'};
                  }
                }

                > tbody::before {
                  content: '';
                  display: block;
                  height: 14px;
                }
              }
            }
          }
        }
        .ant-pagination {
          margin: 16px 0 0 0;
        }
        .ant-pagination-item a {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        .ant-pagination-item-active {
          border: none;
          background-color: #fff;
        }
        .ant-pagination-item-active a {
          color: #fff;
          background-color: rgba(42, 46, 57, 1);
        }
        .ant-pagination-item-link {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? '#fff !important'
              : '#202127 !important'};
        }
        .ant-pagination-item-link-icon {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? '#fff !important'
              : '#202127 !important'};
        }
        .ant-pagination-jump-next {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        .ant-pagination-jump-prev {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        .ant-pagination-item-ellipsis {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? '#fff !important'
              : '#202127 !important'};
        }
      }

      > .wrapper-financial-chart {
        > .financial-chart-empty {
          min-height: 300px;
          background: ${(props) =>
            props.screen_mode === 'dark' ? ' #202127' : '#fff'};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > .ant-empty {
            > .ant-empty-description {
              color: ${(props) =>
                props.screen_mode === 'dark' ? ' #fff' : '#202127'};
            }
          }
        }
        > .financial-chart {
          display: flex;
          flex-direction: column;
          gap: 8px;
          > .title {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};

            font-size: 20px;
            font-weight: 500;
          }
          > .first-layout {
            display: flex;
            gap: 8px;
            height: 420px;

            > .common-chart {
              border-radius: 8px;
              padding: 0px 24px 24px 24px;
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? ' #202127'
                  : 'rgba(236, 236, 239, 1)'};
              /* flex: 33.33%; */
              flex: 1;

              > .echarts-for-react {
                height: 350px !important;
              }
              > .header-common-chart {
                display: flex;
                justify-content: space-between;
                padding: 14px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                > .quarter-and-year {
                  > .ant-select {
                    > .ant-select-selector {
                      cursor: pointer;
                      min-width: 98px;
                      width: 98px;
                      height: 32px;
                      padding: 0px 12px;
                      border-radius: 6px;
                      border: ${(props) =>
                        props.screen_mode === 'dark'
                          ? '1px solid rgba(74, 76, 90, 1)'
                          : '1px solid rgba(213, 215, 220, 1)'};
                      background: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'transparent'
                          : 'rgba(255, 255, 255, 1)'};
                      > .ant-select-selection-item {
                        font-size: 12px;
                        font-weight: 500;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                      }
                      &:hover {
                        border: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '1px solid #818498'
                            : '1px solid  #878D9B'};
                      }
                    }
                  }
                }
                > .label {
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                }
              }
            }
            > .common-chart:nth-of-type(3) {
              > .label {
                left: 43%;
              }
            }
          }
          > .first-layout-private {
            display: flex;
            gap: 8px;
            height: 420px;
            > .common-chart {
              border-radius: 8px;
              padding: 0px 24px 24px 24px;
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? ' #202127'
                  : 'rgba(236, 236, 239, 1)'};
              flex: 33.33%;

              > .echarts-for-react {
                height: 350px !important;
              }
              > .header-common-chart {
                display: flex;
                justify-content: space-between;
                padding: 14px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                > .quarter-and-year {
                  > .ant-select {
                    > .ant-select-selector {
                      cursor: pointer;
                      min-width: 98px;
                      width: 98px;
                      height: 32px;
                      padding: 0px 12px;
                      border-radius: 6px;
                      border: ${(props) =>
                        props.screen_mode === 'dark'
                          ? '1px solid rgba(74, 76, 90, 1)'
                          : '1px solid rgba(213, 215, 220, 1)'};
                      background: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'transparent'
                          : 'rgba(255, 255, 255, 1)'};
                      > .ant-select-selection-item {
                        font-size: 12px;
                        font-weight: 500;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                      }
                      &:hover {
                        border: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '1px solid #818498'
                            : '1px solid #878D9B'};
                      }
                    }
                  }
                }
                > .label {
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                }
              }
            }
            > .common-chart:nth-of-type(3) {
              > .label {
                left: 43%;
              }
            }
          }
          > .first-layout:nth-of-type(2) {
            > .common-chart:first-of-type {
              > .label {
                left: 38%;
              }
            }
            > .common-chart:nth-of-type(2) {
              > .label {
                left: 35%;
              }
            }
            > .common-chart:nth-of-type(3) {
              > .label {
                left: 41%;
              }
            }
          }
        }
      }
      .volume-column {
        padding: 0 !important;
      }
    }
  }
  @media (max-width: 1600px) {
    > .left-analysis {
      width: 268px;
      > .company-infomation {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)'};
        padding: 20px;
        border-radius: 6px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        > .company-list {
          > .ant-select {
            cursor: pointer;
            width: 78px;
            height: 35px;
            > .ant-select-selector {
              padding: 8px 12px 8px 16px;
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'transparent'
                  : 'rgba(255, 255, 255, 1)'};
              border-radius: 6px;
              border: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid rgba(74, 76, 90, 1)'
                  : '1px solid rgba(213, 215, 220, 1)'};
              > .ant-select-selection-item {
                font-size: 14px;
                font-weight: 300;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
              &:hover {
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid #818498'
                    : '1px solid  #878D9B'};
              }
            }
            > .ant-select-arrow {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
            }
          }
          > .ant-select-focused {
            > .ant-select-selector {
              > .ant-select-selection-search {
                input {
                  font-size: 16px;
                  font-weight: 500;

                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#202127'};
                }
              }
            }
          }
        }
        > .company {
          display: flex;
          gap: 16px;
          align-items: center;

          > img {
            border-radius: 6px;
            width: 120px;
            /* object-fit: contain;
          height: 60px; */
          }
          > .company-code {
            display: flex;
            flex-direction: column;
            gap: 8px;
            > span:first-of-type {
              font-size: 19px;
              font-weight: 600;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
            }
            > span:last-of-type {
              font-size: 19px;
              font-weight: 600;
              color: #42a732;
            }
          }
        }
        > .company-name {
          font-size: 15px;
          font-weight: 600;

          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        > .business-areas {
          display: flex;
          gap: 8px;

          > div {
            padding: 2px 12px;
            border-radius: 100px;
            min-width: 60px;

            background: ${(props) =>
              props.screen_mode === 'dark' ? 'rgba(54, 66, 99, 1)' : '#197FBF'};
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'rgba(236, 236, 239, 1)'};
            font-size: 13px;
            font-weight: 400;
            line-height: 20px;
          }
        }
        > .cash-flow {
          > .cash-flow-details {
            display: flex;
            flex-direction: column;

            border-radius: 4px;
            padding: 4px 5px;
            margin-bottom: 6px;
            > span {
              font-size: 13px;
              font-weight: 600;

              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(129, 132, 152, 1)'
                  : '#202127'};
              line-height: 20px;
            }
            > span:last-of-type {
              font-size: 13px;
              font-weight: 400;

              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
              line-height: 20px;
            }
          }
        }
        > .company-description {
          > span:first-of-type {
            display: inline-block;
            > div {
              font-size: 14px !important;
              font-weight: 400;

              line-height: 20px;
              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : '#202127'};
            }
          }
          > span:first-of-type {
            display: inline-block;
            > p {
              font-size: 13px;
              font-weight: 400;

              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(255, 255, 255)'
                  : 'rgba(2, 2, 2)'};
              margin: 0;
            }
          }
          > span:last-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 400;

            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(153, 186, 255, 1)'
                : 'rgba(0, 74, 234, 1)'};
            cursor: pointer;
          }
        }
      }
    }
    > .right-analysis {
      width: calc(100% - 268px - 12px);
      display: flex;
      margin-bottom: 8px;
      flex-direction: column;
      gap: 8px;
      .ant-tabs-nav {
        > .ant-tabs-nav-wrap {
          > .ant-tabs-nav-list {
            gap: 16px;
            > .ant-tabs-tab {
              justify-content: center;
              min-height: 19px;
              padding: 8px 11px;

              /* border-radius: 8px; */
              margin: 0;
              /* &:hover .ant-tabs-tab-btn {
              color: #42a732;
            } */
              > .ant-tabs-tab-btn {
                font-size: 15px;
                font-weight: 400;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
            }
            > .ant-tabs-tab:hover {
              /* background-color: rgba(66, 167, 50, 0.18);
              border: 1px solid rgba(66, 167, 50, 1); */
            }
            > .ant-tabs-tab-active {
              min-width: 106px;
              padding: 8px 11px;
              border-bottom: 3px solid rgba(0, 74, 234, 1);
              > .ant-tabs-tab-btn {
                font-size: 15px;
                font-weight: 500;
                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(153, 186, 255, 1)'
                    : 'rgba(0, 74, 234, 1)'};
              }
            }
            > .ant-tabs-tab-active:hover {
              /* border-radius: 8px;
              background-color: ${(props) =>
                props.screen_mode === 'dark' ? '#42A732' : '#42A732'};
              backdrop-filter: blur(7px); */
              > .ant-tabs-tab-btn {
                font-weight: 400;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'rgb(32, 33, 39)'};
              }
            }
            > .ant-tabs-ink-bar {
              display: none;
            }
          }
        }
      }
      .ant-tabs-nav::before {
        display: none;
      }
      .ant-tabs-content-holder {
        > .ant-tabs-content-top {
          > .ant-tabs-tabpane {
          }
        }
      }
      > .company-financial {
        /* flex: 80%;
      padding: 24px 24px 10px 24px;
      background: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)'};
      border-radius: 8px; */
        .ant-tabs-nav {
          > .ant-tabs-nav-wrap {
            > .ant-tabs-nav-list {
              gap: 16px;
              > .ant-tabs-tab {
                /* justify-content: center; */
                min-height: 19px;
                padding: 8px 11px;

                /* border-radius: 8px; */
                margin: 0;
                &:hover .ant-tabs-tab-btn {
                  /* color: #42a732; */
                }
                > .ant-tabs-tab-btn {
                  font-size: 15px;
                  font-weight: 400;

                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#202127'};
                }
              }
              > .ant-tabs-tab:hover {
                /* background-color: rgba(66, 167, 50, 0.18);
              border: 1px solid rgba(66, 167, 50, 1); */
              }
              > .ant-tabs-tab-active {
                min-width: 106px;
                padding: 8px 11px;
                /* border-bottom: 3px solid rgba(0, 74, 234, 1); */
                > .ant-tabs-tab-btn {
                  font-size: 15px;
                  font-weight: 500;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(153, 186, 255, 1)'
                      : 'rgba(0, 74, 234, 1)'};
                }
              }
              > .ant-tabs-tab-active:hover {
                /* border-radius: 8px;
              background-color: ${(props) =>
                  props.screen_mode === 'dark' ? '#42A732' : '#42A732'};
              backdrop-filter: blur(7px); */
                > .ant-tabs-tab-btn {
                  font-weight: 400;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : 'rgb(32, 33, 39)'};
                }
              }
              > .ant-tabs-ink-bar {
                display: none;
              }
            }
          }
        }
        .ant-tabs-nav::before {
          display: none;
        }
        .ant-tabs-content-holder {
          > .ant-tabs-content-top {
            > .ant-tabs-tabpane {
            }
          }
        }
        > .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          > .general-stock {
            background-color: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            .normal {
              .ant-tabs-nav {
                > .ant-tabs-nav-wrap {
                  > .ant-tabs-nav-list {
                    gap: 16px;
                    > .ant-tabs-tab {
                      justify-content: center;
                      min-height: 19px;
                      padding: 8px 11px;

                      /* border-radius: 8px; */
                      margin: 0;
                      &:hover .ant-tabs-tab-btn {
                        /* color: #42a732; */
                      }
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 400;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? '#fff' : '#202127'};
                      }
                    }
                    > .ant-tabs-tab:hover {
                      border-bottom: 3px solid rgba(87, 90, 106, 1);
                    }
                    > .ant-tabs-tab-active {
                      min-width: 106px;
                      padding: 8px 24px;
                      /* border-bottom: 3px solid rgba(0, 74, 234, 1); */
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 500;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : 'rgba(0, 74, 234, 1)'};
                      }
                    }
                    > .ant-tabs-tab-active:hover {
                      /* border-radius: 8px;
              background-color: ${(props) =>
                        props.screen_mode === 'dark' ? '#42A732' : '#42A732'};
              backdrop-filter: blur(7px); */
                      > .ant-tabs-tab-btn {
                        font-weight: 400;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '#fff'
                            : 'rgb(32, 33, 39)'};
                      }
                    }
                    > .ant-tabs-ink-bar {
                      display: none;
                    }
                  }
                }
              }
              .ant-tabs-nav::before {
                display: none;
              }
              .ant-tabs-content-holder {
                > .ant-tabs-content-top {
                  > .ant-tabs-tabpane {
                  }
                }
              }
            }
            .tab-chart {
              .ant-tabs-nav {
                margin: 0 !important;
                border: none;
                > .ant-tabs-nav-wrap {
                  > .ant-tabs-nav-list {
                    gap: 16px;
                    > .ant-tabs-tab {
                      justify-content: center;
                      min-height: 19px;
                      padding: 8px 11px;
                      margin: 0;

                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 400;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? '#fff' : '#202127'};
                      }
                    }
                    > .ant-tabs-tab:hover {
                      /* background-color: rgba(66, 167, 50, 0.18);
              border: 1px solid rgba(66, 167, 50, 1); */
                    }
                    > .ant-tabs-tab-active {
                      min-width: 106px;
                      padding: 8px 24px;
                      /* border-bottom: 3px solid rgba(0, 74, 234, 1); */
                      > .ant-tabs-tab-btn {
                        font-size: 15px;
                        font-weight: 500;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : 'rgba(0, 74, 234, 1)'};
                      }
                    }
                    > .ant-tabs-tab-active:hover {
                      > .ant-tabs-tab-btn {
                        font-weight: 400;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '#fff'
                            : 'rgb(32, 33, 39)'};
                      }
                    }
                    > .ant-tabs-ink-bar {
                      display: none;
                    }
                  }
                }
              }
              .ant-tabs-nav::before {
                display: none;
              }
              .ant-tabs-content-holder {
                > .ant-tabs-content-top {
                  > .ant-tabs-tabpane {
                  }
                }
              }
            }
            > .box-stock {
              display: flex;
              > .number-stock {
                padding: 16px 20px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(41, 43, 50, 1)'
                    : 'rgba(249, 250, 250, 1)'};
                border-radius: 6px;
                width: calc(100% - 77.7%);
                > .stock-price {
                  display: flex;
                  /* justify-content: space-between; */
                  flex-direction: column;
                  gap: 16px;
                  padding-bottom: 16px;
                  > .stock-price-children {
                    display: flex;
                    align-items: center;
                    > .infomation {
                      justify-content: center;
                      align-items: center;
                      display: flex;
                      > span:nth-of-type(1) {
                        font-size: 29px;
                        font-weight: 600;
                        line-height: 33.98px;
                        color: #e43637;
                        padding-right: 18px;
                      }
                      > span:nth-of-type(2) {
                        font-size: 29px;
                        font-weight: 600;
                        line-height: 33.98px;
                        color: #e43637;
                        padding-right: 18px;
                      }
                      > span:nth-of-type(3) {
                        padding: 4px 8px;
                        border-radius: 100px;
                        background: #e43637;
                        backdrop-filter: blur(7px);
                        font-size: 13px;
                        font-weight: 400;
                        color: #fff;
                        /* margin-right: 16px; */
                      }
                    }
                  }
                  > .market {
                    display: flex;
                    align-items: center;
                    /* padding-top: 12px; */
                    gap: 8px;
                    padding: 4px 8px;
                    border-radius: 100px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.2)'
                        : '1px solid rgba(213, 215, 220, 1)'};
                    width: 95px;
                    justify-content: center;
                    > span {
                      font-size: 12px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(116, 123, 139, 1)'};
                    }
                  }
                }
                > .limit-price {
                  display: flex;
                  gap: 16px;
                  flex-direction: column;
                  > .lowest-price {
                    display: flex;

                    flex-direction: column;
                    padding-right: 46px;
                    > span:first-of-type {
                      font-size: 13px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(116, 123, 139, 1)'};
                    }
                    > span:last-of-type {
                      font-size: 18px;
                      font-weight: 600;

                      color: rgba(209, 84, 73, 1);
                    }
                  }
                  > .highest-price {
                    display: flex;

                    flex-direction: column;

                    padding-right: 16px;
                    > span:first-of-type {
                      font-size: 13px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(116, 123, 139, 1)'};
                    }
                    > span:last-of-type {
                      font-size: 18px;
                      font-weight: 600;

                      color: rgba(92, 214, 128, 1);
                    }
                  }
                  > .hour {
                    > .ant-select {
                      cursor: pointer;
                      width: 78px;
                      height: 35px;
                      > .ant-select-selector {
                        padding: 8px 12px;
                        background: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '#2a2e39'
                            : 'rgba(255, 255, 255, 1)'};
                        border-radius: 8px;
                        &:hover {
                          border: ${(props) =>
                            props.screen_mode === 'dark'
                              ? '1px solid #818498'
                              : '1px solid  #878D9B'};
                        }
                        > .ant-select-selection-item {
                          font-size: 16px;
                          font-weight: 500;

                          color: ${(props) =>
                            props.screen_mode === 'dark' ? '#fff' : '#202127'};
                        }
                      }
                    }
                  }
                }
              }
              > .financial-report {
                display: flex;
                width: 77.7%;
                > .vic-table {
                  padding: 0 24px;
                  width: calc(100% / 3);
                  /* padding-right: 8px; */
                  border-right: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > div:first-of-type {
                    font-size: 14px;
                    font-weight: 600;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                    padding-bottom: 8px;
                  }
                  > table {
                    width: 100%;
                    border-collapse: collapse;
                    > tbody {
                      > tr {
                        > td:first-of-type {
                          display: flex;
                          align-items: center;
                          gap: 6px;
                          padding: 8px 8px 8px 0px;
                          list-style-type: disc;
                          /* list-style: decimal; */
                          font-size: 12px;
                          font-weight: 500;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(171, 173, 186, 1)'
                              : 'rgba(116, 123, 139, 1)'};
                          line-height: 20px;
                        }
                        > td:last-of-type {
                          padding: 8px 0;

                          font-size: 12px;
                          font-weight: 400;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(255, 255, 255, 1)'
                              : '#202127'};
                          line-height: 20px;
                        }
                      }
                    }
                  }
                }
                > .vic-table:last-of-type {
                  border-right: none;
                }
              }
            }
            > .company-introduce {
              border-radius: 6px;

              > .wrapper-information {
                display: flex;
                gap: 40px;
                > .vic-table {
                  /* flex: 10%; */
                  /* padding-right: 80px; */
                  border-right: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid #343434'
                      : '1px solid rgb(204, 204, 204)'};
                  border-color: ${(props) =>
                    props.screen_mode === 'dark' ? '#3a3f42' : '#EDEDED'};
                  > div:first-of-type {
                    font-size: 15px;
                    font-weight: 500;
                    line-height: 28px;
                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#202127'};
                  }
                  > .box-info {
                    > .left {
                      > table {
                        /* width: 100%; */
                        min-width: 239px;
                        border-collapse: collapse;
                        > tbody {
                          > tr {
                            > td:first-of-type {
                              height: 36px;
                              display: flex;
                              align-items: center;
                              gap: 8px;
                              font-size: 12px;
                              font-weight: 400;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? 'rgba(171, 173, 186, 1)'
                                  : 'rgba(116, 123, 139, 1)'};
                              line-height: 20px;
                            }
                            > td:last-of-type {
                              height: 36px;

                              text-align: left;
                              font-size: 12px;
                              font-weight: 300;
                              line-height: 20px;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? '#fff'
                                  : '#202127'};
                            }
                          }
                        }
                      }
                    }
                    > .right {
                      > table {
                        /* width: 100%; */
                        min-width: 239px;
                        border-collapse: collapse;
                        > tbody {
                          > tr {
                            > td:first-of-type {
                              height: 36px;
                              display: flex;
                              align-items: center;
                              gap: 8px;
                              font-size: 12px;
                              font-weight: 400;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? 'rgba(171, 173, 186, 1)'
                                  : 'rgba(116, 123, 139, 1)'};
                              line-height: 20px;
                            }
                            > td:last-of-type {
                              height: 36px;

                              text-align: left;
                              font-size: 12px;
                              font-weight: 300;
                              line-height: 20px;

                              color: ${(props) =>
                                props.screen_mode === 'dark'
                                  ? '#fff'
                                  : '#202127'};
                            }
                          }
                        }
                      }
                    }
                  }
                }
                > .vic-table:first-of-type {
                  padding-right: 27px;
                }
                > .vic-table:last-of-type {
                  padding-left: 8px;
                  border-right: none;
                }
              }
            }
            > .wrapper-financial {
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
              > .financial {
                background-color: ${(props) =>
                  props.screen_mode === 'light'
                    ? 'rgba(236, 236, 239, 1) !important'
                    : '#202127 !important'};
                border-radius: 8px;

                .table {
                  overflow-x: auto;
                  /* height: 270px; */
                  .ant-table-wrapper
                    .ant-table-tbody
                    > tr.ant-table-placeholder:hover
                    > td,
                  .ant-table-placeholder {
                    background: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '#202127 !important'
                        : 'rgba(236, 236, 239, 1) !important'};
                  }
                  .ant-empty .ant-empty-description {
                    color: ${(props) =>
                      props.screen_mode === 'light'
                        ? '#1f232c !important'
                        : '#D4D4D4 !important'};
                  }
                  .ant-table-wrapper .ant-table .ant-table-header {
                    border-radius: unset;
                  }
                  .ant-table-wrapper .ant-table-sticky-holder {
                    background: transparent !important;
                  }
                  .ant-table-wrapper
                    .ant-table-container
                    table
                    > thead
                    > tr:first-child
                    > *:first-child {
                    padding: 0;
                  }
                  .ant-table-wrapper
                    .ant-table-tbody
                    > tr.ant-table-placeholder
                    :hover {
                    background-color: ${(props) =>
                      props.screen_mode === 'light'
                        ? 'rgba(236, 236, 239, 1) !important'
                        : '#202127 !important'};
                  }
                  .ant-table-tbody > tr:nth-child(2n) > td {
                    background-color: ${(props) =>
                      props.screen_mode === 'light'
                        ? 'rgba(236, 236, 239, 1) !important'
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
                  .ant-table-wrapper
                    .ant-table-thead
                    > tr:not(:last-child)
                    > th[colspan] {
                    border-bottom: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid #3a3f42 !important'
                        : '1px solid #ccc !important'};
                  }
                  .ant-pagination
                    .ant-pagination-prev
                    .ant-pagination-item-link,
                  .ant-pagination
                    .ant-pagination-next
                    .ant-pagination-item-link {
                    background-color: ${(props) =>
                      props.screen_mode === 'light'
                        ? 'rgba(236, 236, 239, 1)'
                        : '#323546'};
                  }

                  .ant-pagination
                    .ant-pagination-prev
                    .ant-pagination-item-link,
                  .ant-pagination .ant-pagination-next button {
                    color: ${(props) =>
                      props.screen_mode === 'light' ? 'black' : '#fff'};
                  }
                  .ant-pagination .ant-pagination-item a {
                    color: ${(props) =>
                      props.screen_mode === 'light' ? 'black' : '#fff'};
                  }
                  .ant-pagination .ant-pagination-item-active a {
                    color: #1677ff;
                  }
                  .ant-pagination
                    .ant-pagination-disabled
                    .ant-pagination-item-link {
                    color: ${(props) =>
                      props.screen_mode === 'light' ? 'black' : '#fff'};
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
                    font-size: 13px;
                    font-weight: 400;
                    text-align: center;
                    border-bottom: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid #3a3f42 !important'
                        : '1px solid #ccc !important'};
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(171, 173, 186, 1)'
                        : 'rgba(46, 49, 56, 1)'};
                    line-height: 20px;
                  }

                  .ant-table-wrapper .ant-table-tbody > tr > td:nth-child(1) {
                    font-size: 13px;
                    font-weight: 400;
                    text-align: left;

                    padding-left: 12px;
                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    line-height: 20px;
                  }
                  .ant-table-wrapper .ant-table-tbody > tr > td:last-child {
                    border-radius: 0 4px 4px 0;
                  }
                  .ant-table-tbody > tr > td {
                    padding: 8px 25px;
                  }
                  /* .ant-table-tbody > tr > td {
      background-color: ${(props) =>
                    props.screen_mode === 'light'
                      ? 'rgba(213, 215, 220, 1)'
                      : 'rgba(31, 35, 44, 1)'};
    } */
                }
                .note {
                  display: flex;
                  align-items: center;
                  background: ${(props) =>
                    props.screen_mode === 'dark'
                      ? ' #202127'
                      : 'rgba(236, 236, 239, 1)'};
                  padding: 12px 18px;
                  > span:first-of-type {
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                    font-size: 14px;

                    font-style: italic;
                    font-weight: 500;
                  }
                  > span:last-of-type {
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                    font-size: 14px;

                    font-style: italic;
                    font-weight: 400;
                  }
                }
              }
            }
          }
          .box-content-general {
            display: flex;
            gap: 8px;
            > .news {
              width: calc(100% / 3);
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? '#202127'
                  : 'rgba(236, 236, 239, 1)'};
              max-height: 920px;
              padding: 0px 20px 20px 20px;
              border-radius: 8px;
              > .title {
                font-size: 15px;
                font-weight: 600;

                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 1)'
                    : '#202127'};
                padding: 14px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .boxlist-news {
                overflow-y: auto;
                height: 832px;

                > .posts {
                  display: flex;
                  gap: 16px;
                  padding: 24px 0;
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid #3a3f42 '
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > img {
                    background: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '#fff'
                        : 'rgba(213, 215, 220, 1)'};
                  }
                  > .post {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    > a {
                      > .post-title {
                        font-size: 14px;
                        font-weight: 500;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(255, 255, 255, 1)'
                            : '#202127'};
                        line-height: 20px;
                      }
                    }
                    > .content {
                      font-size: 12px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : 'rgba(2, 2, 2)'};
                      line-height: 20px;
                    }
                    > .post-time {
                      display: flex;
                      gap: 16px;
                      justify-content: space-between;
                      > div:first-of-type {
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 20px;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(79, 120, 58, 1)'};
                      }
                      > .time {
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 20px;
                        color: ${(props) =>
                          props.screen_mode === 'dark'
                            ? 'rgba(171, 173, 186, 1)'
                            : 'rgba(116, 123, 139, 1)'};
                      }
                    }
                  }
                }
              }
              > .boxlist-news::-webkit-scrollbar {
                display: none; /* Ẩn thanh cuộn cho trình duyệt Webkit (Chrome, Safari, Edge) */
              }

              > .boxlist-news {
                -ms-overflow-style: none; /* Ẩn thanh cuộn cho Internet Explorer và Edge */
                scrollbar-width: none; /* Ẩn thanh cuộn cho Firefox */
              }

              > .posts:last-child {
                padding-bottom: 0;
              }
            }
            > .analysis-tabs {
              .title-analysis {
                font-size: 14px;
                font-weight: 600;

                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 1)'
                    : '#202127'};
                padding: 14px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .analysis-report {
                height: 845px;
                scrollbar-width: none;
                overflow-y: scroll;
                > .analysis-report-children {
                  cursor: pointer;
                  padding: 24px 0;

                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  display: flex;
                  gap: 8px;
                  .icon-child {
                    width: 20px;
                    height: 20px;
                  }
                  > .item-child {
                    /* min-width: 410px; */
                    flex-grow: 1;
                    > .title {
                      font-size: 13px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff ' : '#202127'};
                      margin-bottom: 4px;
                    }
                    > .post-time {
                      display: flex;
                      gap: 16px;
                      justify-content: space-between;
                      align-items: center;

                      > div:first-of-type {
                        font-size: 13px;
                        font-weight: 400;
                      }
                      > .time {
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        > span {
                          font-size: 12px;
                          font-weight: 400;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(171, 173, 186, 1)'
                              : 'rgba(116, 123, 139, 1)'};
                        }
                      }
                    }
                  }
                }
              }
              > .download-report {
                height: 845px;
                overflow-y: scroll;
                scrollbar-width: none;
                > .column-report {
                  display: flex;
                  justify-content: space-between;
                  padding: 10px 0;
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > span:first-of-type {
                    flex: 10%;

                    font-size: 13px;
                    font-weight: 500;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > span:nth-of-type(2) {
                    flex: 12%;
                    font-size: 13px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > span:nth-of-type(3) {
                    flex: 50%;
                    font-size: 13px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > span:last-of-type {
                    flex: 20%;
                  }
                }
                > .row-record {
                  display: flex;
                  justify-content: space-between;
                  padding: 10px 4px;
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > span:first-of-type {
                    flex: 10%;
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 20px;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > span:nth-of-type(2) {
                    flex: 12%;
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255, 1)'
                        : 'rgba(46, 49, 56, 1)'};
                  }
                  > span:nth-of-type(3) {
                    flex: 65%;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > span:last-of-type {
                    flex: 5%;
                    text-align: right;
                    padding-right: 10px;
                    > img {
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            > .analysis-tabs {
              width: calc(100% / 3);

              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? '#202127'
                  : 'rgba(236, 236, 239, 1)'};
              max-height: 920px;
              padding: 0px 20px 20px 20px;
              border-radius: 8px;
              > .ant-tabs {
                > .ant-tabs-content-holder {
                  overflow: auto;
                  height: 823px;
                  width: 100%;
                }
                .ant-tabs-content-holder::-webkit-scrollbar {
                  display: none; /* Ẩn thanh cuộn cho trình duyệt Webkit (Chrome, Safari, Edge) */
                }

                .ant-tabs-content-holder {
                  -ms-overflow-style: none; /* Ẩn thanh cuộn cho Internet Explorer và Edge */
                  scrollbar-width: none; /* Ẩn thanh cuộn cho Firefox */
                }
                > .ant-tabs-nav {
                  margin: 0;
                  > .ant-tabs-nav-wrap {
                    > .ant-tabs-nav-list {
                      > .ant-tabs-tab {
                        padding: 0;
                        > .ant-tabs-tab-btn {
                          font-size: 20px;
                          font-weight: 400;

                          color: ${(props) =>
                            props.screen_mode === 'dark'
                              ? 'rgba(255, 255, 255, 1)'
                              : 'rgba(2, 2, 2)'};
                        }
                      }
                      > .ant-tabs-tab-active {
                        padding: 12px 0;
                        > .ant-tabs-tab-btn {
                          font-size: 15px;
                          font-weight: 600;
                          line-height: 28px;
                          color: ${(props) =>
                            props.screen_mode === 'dark' ? '#fff ' : '#202127'};
                        }
                      }
                      > .ant-tabs-ink-bar {
                        display: none;
                      }
                    }
                  }
                }
                > .ant-tabs-nav::before {
                  display: none;
                }
                > .ant-tabs-content-holder {
                  > .ant-tabs-content {
                    > .ant-tabs-tabpane {
                    }
                  }
                }
              }
            }

            > .general-chart {
              width: calc(100% / 3);

              > .company-chart {
                position: relative;
                > div:first-of-type {
                  position: absolute;
                  left: 4%;
                  top: 4%;
                  font-size: 20px;
                  font-weight: 500;

                  z-index: 10;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff ' : '#202127'};
                }
                > .tab-data {
                  position: absolute;
                  top: 3%;
                  left: 24%;
                  > .ant-tabs {
                    > .ant-tabs-nav {
                      > .ant-tabs-nav-wrap {
                        > .ant-tabs-nav-list {
                          > .ant-tabs-tab {
                            font-size: 14px;
                            font-weight: 500;

                            color: ${(props) =>
                              props.screen_mode === 'dark'
                                ? 'rgba(255, 255, 255)'
                                : 'rgba(2, 2, 2)'};
                          }
                          .ant-tabs-tab {
                            margin-right: 18px;
                            width: 46px;
                            height: 32px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          }
                          > .ant-tabs-tab-active {
                            background: #3594ef;
                            padding: 2px 14px;
                            border-radius: 8px;
                            > .ant-tabs-tab-btn {
                              font-size: 14px;
                              font-weight: 500;

                              color: #fff;
                            }
                          }
                          > .ant-tabs-ink-bar {
                            display: none;
                          }
                        }
                      }
                    }
                    > .ant-tabs-nav::before {
                      display: none;
                    }
                    > .ant-tabs-content-holder {
                      display: none;
                    }
                  }
                }
              }
              > .company-chart:first-of-type {
                margin-bottom: 16px;
              }
              .echarts-for-react {
                background: ${(props) =>
                  props.screen_mode === 'dark' ? '#202127' : '#fff'};
                border-radius: 8px;
                height: 430px !important;
                max-width: unset !important;
                > div {
                  > canvas {
                    width: 650px !important;
                  }
                }
              }
            }
          }
        }
      }

      > .wrapper-profile {
        display: flex;
        width: 100%;
        > .profile {
          width: 100%;
          /* flex: 100%; */
          display: flex;
          flex-direction: column;
          gap: 8px;
          > .children-company-01 {
            background-color: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            /* margin-bottom: 12px; */
            height: 420px;
            /* padding: 0px 24px 24px 24px; */
            border-radius: 6px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            > .table-no-data {
              height: 80%;
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
            > .title-company-01 {
              display: flex;
              width: 100%;
              > .company-child {
                font-size: 16px;
                font-weight: 600;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                line-height: 28px;
                padding: 14px 0;
                width: 100%;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .title1 {
                width: 98%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
              > .title2 {
                width: 25%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
            }
            > .table-list {
              display: flex;
              height: 390px;
              flex-direction: column;
              align-items: flex-start;

              flex: 1 0 0;
              width: 100%;
              padding-bottom: 16px;
              > .header {
                display: flex;

                > .item {
                  text-align: left;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 20px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(129, 132, 152, 1)'
                      : 'rgba(116, 123, 139, 1)'};
                  padding: 6px 0;
                  > tr {
                    > th {
                      padding: 2px 4px;
                      font-weight: 500;
                    }
                    > th:last-of-type {
                      text-align: right;
                    }
                  }
                }
                > .item:nth-of-type(1) {
                  padding-left: 12px;
                  width: 37px;
                }
                > .item:nth-of-type(2) {
                  width: 295px;
                }
                > .item:nth-of-type(3) {
                  width: 152px;
                }
                > .item:nth-of-type(4) {
                  width: 91px;
                }
                > .item:nth-of-type(5) {
                  width: 113px;
                }

                > tbody::before {
                  content: '';
                  display: block;
                  height: 12px;
                }
              }
              > .body-tb {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: flex-start;
                overflow-y: scroll;
                /* padding-left: 12px; */
                > .item-tb {
                  display: flex;
                  padding: 6px 0px;
                  /* justify-content: space-between; */
                  align-items: center;
                  align-self: stretch;
                  border-top: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > td:nth-of-type(1) {
                    padding-left: 12px;
                    width: 37px;
                    text-align: left;
                    color: rgba(129, 132, 152, 1);
                  }
                  > td:nth-of-type(2) {
                    text-align: left;
                    width: 295px;
                  }
                  > td:nth-of-type(3) {
                    width: 152px;
                  }
                  > td:nth-of-type(4) {
                    width: 91px;
                  }
                  > td:nth-of-type(5) {
                    width: 113px;
                  }
                  > td {
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 400;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > td:last-of-type {
                    text-align: left;
                  }
                }
              }
            }
            > .shareholder-box {
              display: flex;
              gap: 8px;
              width: 100%;
              > .table-list-shareholder {
                padding: 0 20px 20px 20px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                display: flex;
                height: 420px;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                width: calc(100% - 343px);
                padding-bottom: 16px;
                .title1 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                > .header {
                  display: flex;
                  padding: 2px 4px;
                  justify-content: space-between;
                  align-items: center;
                  /* align-self: stretch; */
                  > .item {
                    text-align: left;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : 'rgba(116, 123, 139, 1)'};
                    /* > tr {
                  > th {
                    padding: 2px 4px;
                    font-weight: 500;
                  }
                  > th:last-of-type {
                    text-align: right;
                  }
                } */
                  }
                  > .item:nth-of-type(1) {
                    width: 41px;
                    text-align: left;
                  }
                  > .item:nth-of-type(2) {
                    width: 81px;
                    text-align: left;
                  }
                  > .item:nth-of-type(3) {
                    width: 231px;
                    text-align: left;
                  }
                  > .item:nth-of-type(4) {
                    width: 120px;
                    text-align: left;
                  }
                  > .item:nth-of-type(5) {
                    width: 84px;
                    text-align: left;
                  }
                  > .item:nth-of-type(6) {
                    width: 139px;
                    text-align: right;
                  }
                  > tbody::before {
                    content: '';
                    display: block;
                    height: 12px;
                  }
                }
                > .body-tb {
                  display: flex;
                  width: 100%;

                  flex-direction: column;
                  align-items: flex-start;
                  overflow-y: scroll;
                  > .item-tb {
                    display: flex;
                    padding: 6px 4px;
                    /* justify-content: space-between; */
                    align-items: center;
                    align-self: stretch;
                    /* gap: 16px; */
                    border-top: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid rgba(213, 215, 220, 1)'};
                    > td:nth-of-type(1) {
                      width: 37px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                    }
                    > td:nth-of-type(2) {
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                      width: 84px;
                    }
                    > td:nth-of-type(3) {
                      width: 227px;
                    }
                    > td:nth-of-type(4) {
                      width: 121px;
                    }
                    > td:nth-of-type(5) {
                      width: 139px;
                    }
                    > td {
                      padding: 2px 4px;
                      font-size: 13px;
                      font-weight: 400;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(255, 255, 255)'
                          : 'rgba(2, 2, 2)'};
                    }
                    > td:last-of-type {
                      text-align: right;
                    }
                  }
                }
              }
              > .chart {
                padding: 0px 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                width: 343px;
                .title2 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                .highcharts-container {
                  margin-top: 40px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }

          > .history-general {
            padding: 24px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            border-radius: 8px;
            > .general {
              > div {
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
              > .content {
                > span {
                  > div {
                    font-size: 16px !important;
                    font-weight: 400;

                    padding: 16px 0;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                }
              }
            }
          }
        }
      }
      .connect {
        display: flex;
        gap: 8px;

        .box-company-connection {
          width: calc(100% - 343px);

          > .children-company-01 {
            margin-bottom: 8px;
            height: 420px;
            padding: 0px 20px 20px 20px;
            border-radius: 6px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            > .table-no-data {
              height: 80%;
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
            > .title-company-01 {
              display: flex;
              width: 100%;
              > .company-child {
                font-size: 16px;
                font-weight: 600;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                line-height: 28px;
                padding: 14px 0;
                width: 100%;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
              }
              > .title1 {
                width: 98%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
              > .title2 {
                width: 25%;
                font-size: 24px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
                padding-bottom: 10px;
              }
            }
            > .table-list {
              display: flex;
              height: 355px;
              flex-direction: column;
              align-items: flex-start;

              flex: 1 0 0;
              width: 100%;
              padding-bottom: 16px;
              > .header {
                display: flex;

                > .item {
                  text-align: left;
                  font-size: 13px;
                  font-weight: 500;
                  line-height: 20px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(129, 132, 152, 1)'
                      : 'rgba(116, 123, 139, 1)'};
                  padding: 6px 0;
                  > tr {
                    > th {
                      padding: 2px 4px;
                      font-weight: 500;
                    }
                    > th:last-of-type {
                      text-align: right;
                    }
                  }
                }
                > .item:nth-of-type(1) {
                  padding-left: 12px;
                  width: 37px;
                }
                > .item:nth-of-type(2) {
                  width: 295px;
                }
                > .item:nth-of-type(3) {
                  width: 152px;
                }
                > .item:nth-of-type(4) {
                  width: 91px;
                }
                > .item:nth-of-type(5) {
                  width: 113px;
                }

                > tbody::before {
                  content: '';
                  display: block;
                  height: 12px;
                }
              }
              > .body-tb {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: flex-start;
                overflow-y: scroll;
                /* padding-left: 12px; */
                > .item-tb {
                  display: flex;
                  padding: 6px 0px;
                  /* justify-content: space-between; */
                  align-items: center;
                  align-self: stretch;
                  border-top: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > td:nth-of-type(1) {
                    padding-left: 12px;
                    width: 37px;
                    text-align: left;
                    color: rgba(129, 132, 152, 1);
                  }
                  > td:nth-of-type(2) {
                    text-align: left;
                    width: 295px;
                  }
                  > td:nth-of-type(3) {
                    width: 152px;
                  }
                  > td:nth-of-type(4) {
                    width: 91px;
                  }
                  > td:nth-of-type(5) {
                    width: 113px;
                  }
                  > td {
                    line-height: 20px;
                    font-size: 13px;
                    font-weight: 400;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > td:last-of-type {
                    text-align: left;
                  }
                }
              }
            }
            > .shareholder-box {
              display: flex;
              gap: 8px;
              width: 100%;
              > .table-list-shareholder {
                padding: 0 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                display: flex;
                height: 420px;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                width: 50%;
                padding-bottom: 16px;
                .title1 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                > .header {
                  display: flex;
                  padding: 2px 4px;
                  justify-content: space-between;
                  align-items: center;
                  /* align-self: stretch; */
                  > .item {
                    text-align: left;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : 'rgba(116, 123, 139, 1)'};
                    /* > tr {
                  > th {
                    padding: 2px 4px;
                    font-weight: 500;
                  }
                  > th:last-of-type {
                    text-align: right;
                  }
                } */
                  }
                  > .item:nth-of-type(1) {
                    width: 41px;
                    text-align: left;
                  }
                  > .item:nth-of-type(2) {
                    width: 81px;
                    text-align: left;
                  }
                  > .item:nth-of-type(3) {
                    width: 231px;
                    text-align: left;
                  }
                  > .item:nth-of-type(4) {
                    width: 120px;
                    text-align: left;
                  }
                  > .item:nth-of-type(5) {
                    width: 84px;
                    text-align: left;
                  }
                  > .item:nth-of-type(6) {
                    width: 139px;
                    text-align: right;
                  }
                  > tbody::before {
                    content: '';
                    display: block;
                    height: 12px;
                  }
                }
                > .body-tb {
                  display: flex;
                  width: 100%;
                  flex-direction: column;
                  align-items: flex-start;
                  overflow-y: scroll;
                  > .item-tb {
                    display: flex;
                    padding: 6px 4px;
                    /* justify-content: space-between; */
                    align-items: center;
                    align-self: stretch;
                    /* gap: 16px; */
                    border-top: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid rgba(213, 215, 220, 1)'};
                    > td:nth-of-type(1) {
                      width: 37px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                    }
                    > td:nth-of-type(2) {
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(129, 132, 152, 1)'
                          : '#747B8B'};
                      text-align: left;
                      width: 84px;
                    }
                    > td:nth-of-type(3) {
                      width: 227px;
                    }
                    > td:nth-of-type(4) {
                      width: 121px;
                    }
                    > td:nth-of-type(5) {
                      width: 139px;
                    }
                    > td {
                      padding: 2px 4px;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(255, 255, 255)'
                          : 'rgba(2, 2, 2)'};
                    }
                    > td:last-of-type {
                      text-align: right;
                    }
                  }
                }
              }
              > .chart {
                padding: 0px 24px 24px 24px;
                background-color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '#202127'
                    : 'rgba(236, 236, 239, 1)'};
                border-radius: 6px;
                width: 50%;
                .title2 {
                  width: 100%;
                  padding: 14px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(2, 2, 2)'};
                  border-bottom: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                }
                .highcharts-container {
                  margin-top: 40px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
          > .children-company-02 {
            padding: 0px 20px 20px 20px;
            border-radius: 8px;
            background: ${(props) =>
              props.screen_mode === 'dark'
                ? '#202127'
                : 'rgba(236, 236, 239, 1)'};
            height: 420px;
            overflow-y: auto;
            > .table-no-data {
              height: 80%;
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
            > div {
              font-size: 16px;
              font-weight: 600;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#202127'};
              line-height: 28px;
              padding: 14px 0;
              width: 100%;
              border-bottom: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid rgba(48, 50, 59, 1)'
                  : '1px solid rgba(213, 215, 220, 1)'};
            }
            > table {
              width: 100%;
              border-collapse: collapse;
              > thead {
                > tr {
                  > th {
                    padding: 6px 0;

                    text-align: left;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(129, 132, 152, 1)'
                        : '#202127'};
                  }
                  > th:nth-of-type(1) {
                    padding-left: 12px;
                  }
                  > th:nth-of-type(2) {
                    padding-left: 5px;
                  }
                }
              }
              > tbody {
                > tr {
                  border-top: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  > td:nth-of-type(1) {
                    color: rgba(129, 132, 152, 1);
                    padding-left: 12px;
                  }
                  > td {
                    padding: 6px;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 20px;
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > td:last-of-type {
                    text-align: right;
                  }
                }
              }
            }
          }
        }
        > .leadership {
          width: 343px;
          height: 852px;
          background: ${(props) =>
            props.screen_mode === 'dark'
              ? '#202127'
              : 'rgba(236, 236, 239, 1)'};
          padding: 0px 20px 20px 20px;
          border-radius: 6px;
          > div:first-of-type {
            font-size: 16px;
            font-weight: 600;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : '#202127'};
            line-height: 28px;
            padding: 14px 0;
            width: 100%;
            border-bottom: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)'};
          }
          .leadership-list {
            overflow-y: scroll;
            height: 770px;
            display: flex;
            flex-wrap: wrap;
            gap: 24px;

            > .ant-flex {
              width: 100%;
              margin-top: 24px;
              display: flex;
              flex-wrap: wrap; /* Đảm bảo các item có thể xuống dòng */
              gap: 24px; /* Khoảng cách giữa các item */

              > div {
                padding: 0;
                flex: 1 1 30%; /* Tự động chia theo chiều rộng, khoảng 3 item mỗi hàng */
                max-width: 213.3px; /* Đảm bảo mỗi item không lớn hơn 213.3px */

                > .leadership-children {
                  display: flex;
                  border-radius: 6px;
                  gap: 8px;
                  flex-direction: column;
                  padding: 24px;
                  border: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(48, 50, 59, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  justify-content: center;
                  align-items: center;
                  width: 100%; /* Chiếm toàn bộ chiều rộng có sẵn */

                  > div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    justify-content: center;
                    align-items: center;

                    > span:first-of-type {
                      text-align: center;
                      font-size: 13px;
                      font-weight: 600;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    }

                    > span:last-of-type {
                      font-size: 12px;
                      font-weight: 400;
                      line-height: 20px;
                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(153, 186, 255, 1)'
                          : 'rgba(0, 74, 234, 1)'};
                    }
                  }
                }
              }
            }
          }
        }
      }

      > .transaction {
        background: ${(props) =>
          props.screen_mode === 'dark' ? ' #202127' : 'rgba(236, 236, 239, 1)'};
        padding: 24px 24px 16px;
        border-radius: 8px;
        max-height: 900px;
        overflow: auto;
        > .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          > .search {
            display: flex;
            align-items: center;
            gap: 16px;
            > .time {
              display: flex;
              flex-direction: column;
              gap: 8px;
              > span {
                font-size: 14px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#202127'};
              }
              > .ant-picker {
                background: ${(props) =>
                  props.screen_mode === 'dark' ? '#202127' : '#fff'};
                border-radius: 8px;
                > .ant-picker-input {
                  > input {
                    font-size: 14px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#202127'};
                  }
                  > input::placeholder {
                    font-size: 14px;
                    font-weight: 500;

                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                  > .ant-picker-suffix {
                    color: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(255, 255, 255)'
                        : 'rgba(2, 2, 2)'};
                  }
                }
              }
            }
            > button {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5px;
              padding: 8px 12px;
              margin-top: 24px;
              background-color: rgba(53, 148, 239, 1);
            }
          }
          > .transaction-tabs {
            .ant-tabs-nav {
              > .ant-tabs-nav-wrap {
                > .ant-tabs-nav-list {
                  gap: 8px;
                  > .ant-tabs-tab {
                    /* justify-content: center; */
                    min-width: 160px;
                    min-height: 19px;
                    padding: 8px 12px;
                    margin: 0;
                    > .ant-tabs-tab-btn {
                      font-size: 15px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    }
                  }
                  > .ant-tabs-tab-active {
                    border-radius: 8px;
                    background: ${(props) =>
                      props.screen_mode === 'dark'
                        ? 'rgba(53, 148, 239, 1)'
                        : 'rgba(53, 148, 239, 1)'};
                    backdrop-filter: blur(7px);

                    > .ant-tabs-tab-btn {
                      font-size: 15px;
                      font-weight: 400;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#fff'};
                    }
                  }
                  > .ant-tabs-ink-bar {
                    display: none;
                  }
                }
              }
            }
            .ant-tabs-nav::before {
              display: none;
            }
            .ant-tabs-nav {
              margin: 0;
            }
            .ant-tabs-content-holder {
              display: none;
            }
          }
        }
        .ant-table {
          background: ${(props) =>
            props.screen_mode === 'dark' ? '#202127' : '#fff'};
          .ant-table-container {
            .ant-table-content {
              > table {
                > thead {
                  > tr {
                    > th {
                      background: ${(props) =>
                        props.screen_mode === 'dark'
                          ? '#202127'
                          : 'rgba(236, 236, 239, 1)'};
                      font-size: 14px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                      border-bottom: none;
                      padding: 8px 2px;
                    }
                    > th::before {
                      display: none;
                    }
                  }
                }
                > tbody {
                  > tr {
                    > td {
                      font-size: 14px;
                      font-weight: 500;

                      color: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'rgba(255, 255, 255)'
                          : 'rgba(2, 2, 2)'};
                      border-bottom: none;
                      padding: 2px 4px;
                    }
                    > td:nth-of-type(3) {
                    }
                    .ant-table-cell-row-hover {
                      background: none;
                    }
                    .ant-empty-description {
                      color: ${(props) =>
                        props.screen_mode === 'dark' ? '#fff' : '#202127'};
                    }
                  }
                  .ant-table-placeholder {
                    .ant-table-cell {
                      background: ${(props) =>
                        props.screen_mode === 'dark' ? '#202127' : '#fff'};
                    }
                  }
                  .odd-row {
                    background: ${(props) =>
                      props.screen_mode === 'dark' ? '#2a2e39' : '#EDEDED'};
                  }
                }

                > tbody::before {
                  content: '';
                  display: block;
                  height: 14px;
                }
              }
            }
          }
        }
        .ant-pagination {
          margin: 16px 0 0 0;
        }
        .ant-pagination-item a {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        .ant-pagination-item-active {
          border: none;
          background-color: #fff;
        }
        .ant-pagination-item-active a {
          color: #fff;
          background-color: rgba(42, 46, 57, 1);
        }
        .ant-pagination-item-link {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? '#fff !important'
              : '#202127 !important'};
        }
        .ant-pagination-item-link-icon {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? '#fff !important'
              : '#202127 !important'};
        }
        .ant-pagination-jump-next {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        .ant-pagination-jump-prev {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#202127'};
        }
        .ant-pagination-item-ellipsis {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? '#fff !important'
              : '#202127 !important'};
        }
      }

      > .wrapper-financial-chart {
        > .financial-chart-empty {
          min-height: 300px;
          background: ${(props) =>
            props.screen_mode === 'dark' ? ' #202127' : '#fff'};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > .ant-empty {
            > .ant-empty-description {
              color: ${(props) =>
                props.screen_mode === 'dark' ? ' #fff' : '#202127'};
            }
          }
        }
        > .financial-chart {
          display: flex;
          flex-direction: column;
          gap: 8px;
          > .title {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};

            font-size: 20px;
            font-weight: 500;
          }
          > .first-layout {
            display: flex;
            gap: 8px;
            height: 320px;

            > .common-chart {
              border-radius: 8px;
              padding: 0px 20px 20px 20px;
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? ' #202127'
                  : 'rgba(236, 236, 239, 1)'};
              /* flex: 33.33%; */
              flex: 1;

              > .echarts-for-react {
                height: 350px !important;
              }
              > .header-common-chart {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                > .quarter-and-year {
                  > .ant-select {
                    > .ant-select-selector {
                      cursor: pointer;
                      min-width: 98px;
                      width: 98px;
                      height: 32px;
                      padding: 0px 12px;
                      border-radius: 6px;
                      border: ${(props) =>
                        props.screen_mode === 'dark'
                          ? '1px solid rgba(74, 76, 90, 1)'
                          : '1px solid rgba(213, 215, 220, 1)'};
                      background: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'transparent'
                          : 'rgba(255, 255, 255, 1)'};
                      > .ant-select-selection-item {
                        font-size: 12px;
                        font-weight: 500;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                      }
                      &:hover {
                        border: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '1px solid #818498'
                            : '1px solid  #878D9B'};
                      }
                    }
                  }
                }
                > .label {
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                }
              }
            }
            > .common-chart:nth-of-type(3) {
              > .label {
                left: 43%;
              }
            }
          }
          > .first-layout-private {
            display: flex;
            gap: 8px;
            height: 320px;
            > .common-chart {
              border-radius: 8px;
              padding: 0px 20px 20px 20px;
              background: ${(props) =>
                props.screen_mode === 'dark'
                  ? ' #202127'
                  : 'rgba(236, 236, 239, 1)'};
              flex: 33.33%;

              > .echarts-for-react {
                height: 350px !important;
              }
              > .header-common-chart {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(48, 50, 59, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                > .quarter-and-year {
                  > .ant-select {
                    > .ant-select-selector {
                      cursor: pointer;
                      min-width: 98px;
                      width: 98px;
                      height: 32px;
                      padding: 0px 12px;
                      border-radius: 6px;
                      border: ${(props) =>
                        props.screen_mode === 'dark'
                          ? '1px solid rgba(74, 76, 90, 1)'
                          : '1px solid rgba(213, 215, 220, 1)'};
                      background: ${(props) =>
                        props.screen_mode === 'dark'
                          ? 'transparent'
                          : 'rgba(255, 255, 255, 1)'};
                      &:hover {
                        border: ${(props) =>
                          props.screen_mode === 'dark'
                            ? '1px solid #818498'
                            : '1px solid  #878D9B'};
                      }
                      > .ant-select-selection-item {
                        font-size: 12px;
                        font-weight: 500;

                        color: ${(props) =>
                          props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                      }
                    }
                  }
                }
                > .label {
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 28px;
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? ' #fff' : '#202127'};
                }
              }
            }
            > .common-chart:nth-of-type(3) {
              > .label {
                left: 43%;
              }
            }
          }
          > .first-layout:nth-of-type(2) {
            > .common-chart:first-of-type {
              > .label {
                left: 38%;
              }
            }
            > .common-chart:nth-of-type(2) {
              > .label {
                left: 35%;
              }
            }
            > .common-chart:nth-of-type(3) {
              > .label {
                left: 41%;
              }
            }
          }
        }
      }
      .volume-column {
        padding: 0 !important;
      }
    }
  }
  @media (max-width: 1280px) {
    .left-analysis {
      width: 240px;
    }
    .right-analysis {
      width: calc(100% - 268px);
    }
  }
  padding: 0px 16px;
  .highcharts-legend {
    max-height: 65px; /* Đặt chiều cao tối đa cho legend */
    overflow-y: auto; /* Cho phép cuộn khi vượt quá chiều cao */
    display: flex; /* Sử dụng flexbox để căn chỉnh các mục */
    flex-wrap: wrap; /* Cho phép các mục legend được xuống dòng khi không đủ không gian */
  }

  .highcharts-legend-item {
    box-sizing: border-box; /* Đảm bảo phần tử không bị tràn qua */
    width: 33.33%; /* Chia legend thành 3 cột */
    padding: 0 5px; /* Thêm khoảng cách giữa các mục */
  }
  .highcharts-legend-navigation {
    position: absolute;
    left: 0; // Position to the left
  }

  .highcharts-legend-item {
    padding-left: 25px; // Make space for the navigation arrows on the left
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 24px;
    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid rgba(213, 215, 220, 1)'};
  }

  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  display: flex;
  gap: 8px;

  > .content-wrapper
    > .analysis-tabs
    > .ant-tabs
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab-active
    > .ant-tabs-tab-btn {
    /* color: #42a732 !important;
    text-decoration: underline; */
  }
`;
