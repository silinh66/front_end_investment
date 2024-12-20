/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import { styled } from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledMarco = styled.div<Props>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  @media (max-width: 1920px) {
    .top-macro {
      width: 360px;
      display: flex;
      .manufacture {
        padding: 0 24px;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 6px;
        gap: 24px;
        background: ${(props) =>
          props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
        .title {
          padding: 14px 0;
          font-size: 16px;
          border-bottom: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(74, 76, 90, 1)'
              : '1px solid rgba(213, 215, 220, 1)'};
          width: 100%;
          color: ${(props) =>
            props.screen_mode === 'light' ? '#2E3138' : '#fff'};
        }
        .title-menu {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 24px;
          align-items: center;
          padding: 12px 16px;

          width: 100%;
          border-radius: 6px;
          &:hover {
            background-color: ${(props) =>
              props.screen_mode === 'light'
                ? '#CCDDFF'
                : 'rgba(48, 50, 59, 1)'};
          }
          .icon-tab {
            width: 32px;
            height: 32px;
          }

          .title-tab {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 5px;
            .title {
              font-weight: 500;
              font-size: 15px;
              color: ${(props) =>
                props.screen_mode === 'light'
                  ? '#2E3138'
                  : 'rgba(255, 255, 255, 1)'};
              border: none;
            }
            .des {
              font-weight: 400;
              font-size: 13px;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#828385' : '#747B8B'};
            }
          }
        }
        .active-tab {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 24px;
          align-items: center;

          padding: 12px 16px;
          background-color: ${(props) =>
            props.screen_mode === 'dark' ? 'rgba(34, 48, 79, 1)' : '#CCDDFF'};
          width: 100%;
          border-radius: 6px;
          .title-tab {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 5px;
            .title {
              font-weight: 500;
              font-size: 15px;
              color: ${(props) =>
                props.screen_mode === 'light'
                  ? '#004AEA'
                  : 'rgba(153, 186, 255, 1)'};
              border: none;
            }
            .des {
              font-weight: 400;
              font-size: 13px;
              color: ${(props) =>
                props.screen_mode === 'light'
                  ? '#004AEA'
                  : 'rgba(153, 186, 255, 1)'};
            }
          }
        }
      }
    }
    .bottom-macro {
      display: flex;
      flex-direction: column;
      width: 79%;
      gap: 8px;
      .chart-wrapper {
        .map-VN {
          border-radius: 8px;

          display: flex;

          gap: 8px;
          .hightchart {
            gap: 8px;
            height: 420px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .box {
              background: ${(props) =>
                props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
              padding: 0px 20px;
              color: ${(props) =>
                props.screen_mode === 'light' ? '#2E3138' : '#fff'};
              border-radius: 6px;
              .header-chart {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(74, 76, 90, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                position: relative;
                .title-chart {
                  display: flex;
                  align-items: center;
                  font-size: 15px;
                  font-weight: 600;
                }
                .drop-btn-since {
                  height: 500px;
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  right: 0;
                  z-index: 20;
                  top: 47px;
                  .dropdown-menu {
                    cursor: pointer;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    border-radius: 6px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(64, 66, 78, 1)'
                        : '1px solid #D5D7DC'};
                    z-index: 10;
                    top: 10px;
                    left: 80px;
                    padding: 6px 33px;
                    background-color: #2a2e39;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
              width: 50%;
              .box-btn-since {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 6px;
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(64, 66, 78, 1)'
                    : '1px solid #D5D7DC'};
                background-color: ${(props) =>
                  props.screen_mode === 'dark' ? 'transparent' : '#fff'};
                z-index: 10;
                top: 10px;
                left: 80px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
              }
              .btn-chart {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 23px;
                right: 27px;
              }
            }
          }
        }
        .chart-marco {
          border-radius: 8px;
          /* width: 29%; */
          display: flex;
          gap: 8px;
          flex-direction: column;
          .hightchart {
            gap: 8px;
            height: 420px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .box {
              background: ${(props) =>
                props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
              padding: 0px 24px;
              color: ${(props) =>
                props.screen_mode === 'light' ? '#2E3138' : '#fff'};
              border-radius: 6px;
              .header-chart {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(74, 76, 90, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                position: relative;
                .title-chart {
                  display: flex;
                  align-items: center;
                  font-size: 16px;
                  font-weight: 600;
                }
                .drop-btn-since {
                  height: 500px;
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  right: 0;
                  z-index: 20;
                  top: 47px;
                  .dropdown-menu {
                    cursor: pointer;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    border-radius: 6px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(64, 66, 78, 1)'
                        : '1px solid #D5D7DC'};
                    z-index: 10;
                    top: 10px;
                    left: 80px;
                    padding: 6px 33px;
                    background-color: #2a2e39;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
              width: 50%;
              .box-btn-since {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 6px;
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(64, 66, 78, 1)'
                    : '1px solid #D5D7DC'};
                background-color: ${(props) =>
                  props.screen_mode === 'dark' ? 'transparent' : '#fff'};
                z-index: 10;
                top: 10px;
                left: 80px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
              }
              .btn-chart {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 23px;
                right: 27px;
              }
            }
          }
        }

        .chart-marco-new {
          height: 852px;
          border-radius: 8px;
          background: ${(props) =>
            props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
          display: flex;
          gap: 8px;
          flex-direction: column;
          overflow-x: auto;
          .hightchart {
            gap: 8px;
            height: 320px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .box {
              background: ${(props) =>
                props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
              padding: 0px 20px;
              color: ${(props) =>
                props.screen_mode === 'light' ? '#2E3138' : '#fff'};
              border-radius: 6px;
              .header-chart {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(74, 76, 90, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                position: relative;
                .title-chart {
                  display: flex;
                  align-items: center;
                  font-size: 15px;
                  font-weight: 600;
                }
                .drop-btn-since {
                  height: 500px;
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  right: 0;
                  z-index: 20;
                  top: 47px;
                  .dropdown-menu {
                    cursor: pointer;
                    display: flex;
                    color: #fff;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    border-radius: 6px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(64, 66, 78, 1)'
                        : '1px solid #D5D7DC'};
                    z-index: 10;
                    top: 10px;
                    left: 80px;
                    padding: 6px 33px;
                    background-color: #2a2e39;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
              width: 50%;
              .box-btn-since {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 6px;
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(64, 66, 78, 1)'
                    : '1px solid #D5D7DC'};
                background-color: ${(props) =>
                  props.screen_mode === 'dark' ? 'transparent' : '#fff'};
                z-index: 10;
                top: 10px;
                left: 80px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
              }
              .btn-chart {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 23px;
                right: 27px;
              }
            }
          }
        }
      }
      .right-bottom::-webkit-scrollbar {
        display: block; /* Override global setting */
      }

      .right-bottom {
        /* display: flex; */
        overflow: auto;
        width: 100%;
        height: 315px;
        padding: 20px 24px 12px 0px;
        align-items: flex-start;
        border-radius: 8px;
        background: ${(props) =>
          props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
        z-index: 2;
      }
    }
  }
  @media (max-width: 1600px) {
    .top-macro {
      display: flex;
      width: 343px;
      .manufacture {
        padding: 0 20px 24px 20px;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 6px;
        gap: 24px;
        background: ${(props) =>
          props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
        .title {
          font-size: 15px;
          padding: 10px 0;
          border-bottom: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(74, 76, 90, 1)'
              : '1px solid rgba(213, 215, 220, 1)'};
          width: 100%;
          color: ${(props) =>
            props.screen_mode === 'light' ? '#2E3138' : '#fff'};
        }
        .title-menu {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 20px;
          align-items: center;
          padding: 12px 16px;

          width: 100%;
          border-radius: 6px;
          &:hover {
            background-color: ${(props) =>
              props.screen_mode === 'light'
                ? '#CCDDFF'
                : 'rgba(48, 50, 59, 1)'};
          }
          .icon-tab {
            width: 32px;
            height: 32px;
          }

          .title-tab {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 4px;
            .title {
              font-weight: 500;
              font-size: 15px;
              color: ${(props) =>
                props.screen_mode === 'light'
                  ? '#2E3138'
                  : 'rgba(255, 255, 255, 1)'};
              border: none;
            }
            .des {
              font-weight: 400;
              font-size: 13px;
              color: #828385;
            }
          }
        }
        .active-tab {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 20px;
          align-items: center;

          padding: 12px 16px;
          background-color: ${(props) =>
            props.screen_mode === 'dark' ? 'rgba(34, 48, 79, 1)' : '#CCDDFF'};
          width: 100%;
          border-radius: 6px;
          .title-tab {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 4px;
            .title {
              font-weight: 500;
              font-size: 15px;
              color: ${(props) =>
                props.screen_mode === 'light'
                  ? '#004AEA'
                  : 'rgba(153, 186, 255, 1)'};
              border: none;
            }
            .des {
              font-weight: 400;
              font-size: 13px;
              color: ${(props) =>
                props.screen_mode === 'light'
                  ? '#004AEA'
                  : 'rgba(153, 186, 255, 1)'};
            }
          }
        }
      }
    }
    .bottom-macro {
      display: flex;
      flex-direction: column;
      width: 79%;
      gap: 8px;
      .chart-wrapper {
        .map-VN {
          border-radius: 8px;

          display: flex;

          gap: 8px;
          .hightchart {
            gap: 8px;
            height: 320px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .box {
              background: ${(props) =>
                props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
              padding: 0px 20px;
              color: ${(props) =>
                props.screen_mode === 'light' ? '#2E3138' : '#fff'};
              border-radius: 6px;

              .header-chart {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(74, 76, 90, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                position: relative;
                .title-chart {
                  display: flex;
                  align-items: center;
                  font-size: 15px;
                  font-weight: 600;
                }
                .drop-btn-since {
                  height: 500px;
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  right: 0;
                  z-index: 20;
                  top: 47px;
                  .dropdown-menu {
                    cursor: pointer;
                    display: flex;
                    color: #fff;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    border-radius: 6px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(64, 66, 78, 1)'
                        : '1px solid #D5D7DC'};
                    z-index: 10;
                    top: 10px;
                    left: 80px;
                    padding: 6px 33px;
                    background-color: #2a2e39;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
              width: 50%;
              .box-btn-since {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 6px;
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(64, 66, 78, 1)'
                    : '1px solid #D5D7DC'};
                background-color: ${(props) =>
                  props.screen_mode === 'dark' ? 'transparent' : '#fff'};
                z-index: 10;
                top: 10px;
                left: 80px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
              }
              .btn-chart {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 23px;
                right: 27px;
              }
            }
          }
        }
        .chart-marco {
          border-radius: 8px;
          /* width: 29%; */
          display: flex;
          gap: 8px;
          flex-direction: column;
          .hightchart {
            gap: 8px;
            height: 320px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .box {
              background: ${(props) =>
                props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
              padding: 0px 20px;
              color: ${(props) =>
                props.screen_mode === 'light' ? '#2E3138' : '#fff'};
              border-radius: 6px;
              .header-chart {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(74, 76, 90, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                position: relative;
                .title-chart {
                  display: flex;
                  align-items: center;
                  font-size: 15px;
                  font-weight: 600;
                }
                .drop-btn-since {
                  height: 500px;
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  right: 0;
                  z-index: 20;
                  top: 47px;
                  .dropdown-menu {
                    cursor: pointer;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    border-radius: 6px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(64, 66, 78, 1)'
                        : '1px solid #D5D7DC'};
                    z-index: 10;
                    top: 10px;
                    left: 80px;
                    padding: 6px 33px;
                    background-color: #2a2e39;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
              width: 50%;
              .box-btn-since {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 6px;
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(64, 66, 78, 1)'
                    : '1px solid #D5D7DC'};
                background-color: ${(props) =>
                  props.screen_mode === 'dark' ? 'transparent' : '#fff'};
                z-index: 10;
                top: 10px;
                left: 80px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
              }
              .btn-chart {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 23px;
                right: 27px;
              }
            }
          }
        }

        .chart-marco-new {
          height: 741px;
          border-radius: 8px;
          background: ${(props) =>
            props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
          display: flex;
          gap: 8px;
          flex-direction: column;
          overflow-x: auto;
          .hightchart {
            gap: 8px;
            height: 320px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .box {
              background: ${(props) =>
                props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
              padding: 0px 20px;
              color: ${(props) =>
                props.screen_mode === 'light' ? '#2E3138' : '#fff'};
              border-radius: 6px;
              .header-chart {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(74, 76, 90, 1)'
                    : '1px solid rgba(213, 215, 220, 1)'};
                position: relative;
                .title-chart {
                  display: flex;
                  align-items: center;
                  font-size: 15px;
                  font-weight: 600;
                }
                .drop-btn-since {
                  height: 500px;
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  right: 0;
                  z-index: 20;
                  top: 47px;
                  .dropdown-menu {
                    cursor: pointer;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    border-radius: 6px;
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid rgba(64, 66, 78, 1)'
                        : '1px solid #D5D7DC'};
                    z-index: 10;
                    top: 10px;
                    left: 80px;
                    padding: 6px 33px;
                    background-color: #2a2e39;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
              width: 50%;
              .box-btn-since {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 6px;
                border: ${(props) =>
                  props.screen_mode === 'dark'
                    ? '1px solid rgba(64, 66, 78, 1)'
                    : '1px solid #D5D7DC'};
                background-color: ${(props) =>
                  props.screen_mode === 'dark' ? 'transparent' : '#fff'};
                z-index: 10;
                top: 10px;
                left: 80px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: 400;
              }
              .btn-chart {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 23px;
                right: 27px;
              }
            }
          }
        }
      }
      .right-bottom::-webkit-scrollbar {
        display: block; /* Override global setting */
      }

      .right-bottom {
        /* display: flex; */
        overflow: auto;
        width: 100%;
        height: 315px;
        padding: 20px 24px 12px 0px;
        align-items: flex-start;
        border-radius: 8px;
        background: ${(props) =>
          props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
        z-index: 2;
      }
    }
  }
  @media (max-width: 1280px) {
    .top-macro {
      width: 305px;
    }
  }
  .highcharts-legend {
    display: flex !important; /* Đảm bảo legend hiển thị dưới dạng flex */
    flex-wrap: nowrap; /* Ngăn các mục legend xuống dòng */
    max-width: 100%; /* Đặt giới hạn chiều rộng của legend */
    overflow-x: auto; /* Bật cuộn ngang khi các mục legend tràn ra ngoài */
    white-space: nowrap; /* Đảm bảo tất cả mục nằm trên cùng một dòng */
  }
  .highcharts-legend-nav-active,
  .highcharts-legend-nav-inactive,
  .highcharts-legend-navigation .highcharts-button {
    transform: translateX(90%) translateY(-25px);
  }
  .highcharts-legend-item {
    margin-right: 10px; /* Khoảng cách giữa các mục legend */
  }

  .highcharts-legend-navigation {
    display: none !important; /* Ẩn các nút điều hướng mặc định của Highcharts */
  }

  .box-btn-since {
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
  }
  .box-btn-since:hover {
    border: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid #818498 !important'
        : '1px solid  #878D9B !important'};

    cursor: pointer;
    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#000'};
  }
  .highcharts-legend-item {
    flex-wrap: wrap;
  }

  .highcharts-xaxis-labels text {
    transform: translate(0, 0) rotate(0);
  }
  .dropdown-menu {
    cursor: pointer;
    z-index: 30;
  }
  .dropdown-menu:hover {
    border: 1px solid #197fbf !important;
  }

  .btn-marco {
    /* width: 200px; */
    display: flex;
    margin-left: 16px;
    margin-top: 16px;
    /* .btn-tab:hover {
      background-color: rgb(25, 127, 191, 0.18);
      border: 1px solid #197fbf;
      cursor: pointer;
    } */
    .btn-tab {
      cursor: pointer;
      /* width: 50px; */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-tab-active {
      cursor: pointer;
    }
    /* .btn-tab-active:hover {
      background-color: #197fbf;
      border: 1px solid #197fbf;
      cursor: pointer;
    } */
  }

  .input-friend {
    display: flex;
    padding: 8px;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    background: #2a2e39;
    position: relative;
  }
  .icon-search-friend {
    position: absolute;
    top: 7px;
    left: 5px;
    width: 16px;
    height: 16px;
  }
  .search-friend {
    background-color: transparent;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    padding-left: 19px;
    outline: none;
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
  }
  .search-friend::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .icon-search {
    position: absolute;
    top: 8px;
    left: 5px;
  }
  .list-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
  }
  .tab-menu {
    cursor: pointer;
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    margin-left: 15px;
    margin-bottom: 3px;
    /* width: 100%; */
    /* background: #42a732; */
  }
  .highcharts-legend-navigation {
    color: white;
    background: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    font-weight: bold;
    border-radius: 5px;
    padding: 2px 5px;
    fill: #42a732;
  }

  .label {
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .icon-label {
    display: flex;
    padding: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10000000px;
    background: #42a732;
  }

  .left-bottom {
    display: flex;
    /* padding: 12px 24px; */
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    /* border-radius: 8px; */
    background: ${(props) =>
      props.screen_mode === 'light' ? '#FDFDFD' : '#202127'};
    width: 333px;
    min-height: 243px;

    border-right: 1px solid #3a3f42;
  }
  .btn-box {
    display: flex;
    /* padding: 5px 0px; */
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .btn-macro {
    display: flex;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: #42a732;
    margin: 1px;
  }
  .title-bottom {
    display: flex;
    width: 113px;
    height: 20px;
    flex-direction: column;
    justify-content: center;
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .data-row {
    width: 285px;
    min-height: 243px;
  }
  .list-bottom {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 285px;
    /* overflow-x: auto; */
    height: 243px;
    ::-webkit-scrollbar {
      display: block; /* Safari and Chrome */
    }
    min-height: 243px;
  }

  .item {
    display: flex;
    height: 20px;
    padding: 0px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background: #2a2e39;
    width: 285px;
    min-height: 20px;
    /* background-color: index % 2 ? 'transparent' : '#2A2E39'; */
    /* overflow: hidden; */
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: '285px';
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .ant-table-wrapper
    .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr:not(:last-child)
    > th {
    padding: 0;
    /* border-left: 1px solid rgba(58, 63, 66, 1);
    border-bottom: 1px solid rgba(58, 63, 66, 1); */
  }
  .ant-table-thead > tr > th {
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    background-color: rgba(31, 35, 44, 1);
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};

    padding: 6px;
  }

  :where(.css-dev-only-do-not-override-nllxry).ant-table-wrapper
    .ant-table-cell,
  :where(.css-dev-only-do-not-override-nllxry).ant-table-wrapper
    .ant-table-thead
    > tr
    > th {
    padding: 5px;
  }
  .ant-table-tbody > tr > td {
    background-color: rgba(42, 46, 57, 1);
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
  }

  .ant-table-tbody > tr:nth-child(2n) > td {
    background-color: rgba(31, 35, 44, 1);
  }

  .ant-table-tbody > tr > td {
    height: 5px;
    padding: 4px;
  }
  .ant-table {
    /* font-size: 9px; */
    font-weight: 500;
  }
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr:not(:last-child)
    > th {
    border: none;
  }
  .ant-table-wrapper
    .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th {
    border-inline-end: 1px solid rgba(58, 63, 66, 1);
  }
  .ant-table-wrapper
    .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td {
    border-inline-end: 1px solid rgba(58, 63, 66, 1);
  }

  .ant-table-wrapper .ant-table-tbody > tr > td {
    border: none;
  }
  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:first-child {
    border: none;
  }

  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:first-child {
    border-start-start-radius: unset;
    padding-left: 0;
  }
  /* .ant-table-tbody > tr:hover > td {
    color: ${(props) =>
    props.screen_mode === 'light'
      ? 'rgba(8, 8, 8, 1) !important'
      : '#fff !important'};
    background-color: #42a732 !important;
  } */
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > th,
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > td,
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder {
    background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(31, 35, 44, 1) !important'
        : '#ECECEF !important'};
  }

  .ant-table-wrapper .ant-table.ant-table-bordered > .ant-table-container {
    border-inline-start: none;
    border-top: none;
  }

  .box-table {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    /* border-radius: 4px; */
    /* border: 1px solid #42a732; */
    min-width: 252.5px;
    border-right: 1px solid #3a3f42;
    border-end-end-radius: none;
    border-end-start-radius: none;
    min-height: 283px;
  }
  .header-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px 4px 0px 0px;
    /* border-top: 1px solid #42a732;
    border-right: 1px solid #42a732;
    border-left: 1px solid #42a732; */
    /* background: rgba(30, 72, 23, 0.5); */
    width: 100%;
    height: 20px;
    color: rgba(53, 148, 239, 1);
  }
  .selected {
    border: 1px solid #42a732;
    background-color: rgba(30, 72, 23, 0.5);
    border-radius: 4px;
  }
  .year-table {
    display: flex;
    height: 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-bottom: 1px solid #3a3f42;
  }
  .quarter-table {
    display: flex;
    height: 20px;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .chil-quarter {
    display: flex;
    width: 48px;
    padding: 0px 4px;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    color: rgba(53, 148, 239, 1);
  }
  .item-data {
    position: relative;
    display: flex;
    /* flex-direction: column; */
    width: 48px;
    padding: 0px 4px;
    align-items: center;
    height: 200px;
    overflow: scroll;
    color: rgba(53, 148, 239, 1);
  }
  .el-table {
    position: absolute;
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .quarters-row {
    /* background: rgba(30, 72, 23, 0.5); */
  }
  .quarters-row,
  .data-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .chil-quarter,
  .quarter-data {
    flex: 1;
    text-align: center; /* hoặc bất kỳ cách sắp xếp nào bạn muốn */
  }
  .number-data {
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  /* row data */
  /* .ant-table-tbody > tr > td {
    height: 5px;
    padding: 4px;
  } */
  /* row tags */
  /* .my-tag {
    font-size: 12px;
  } */
  /* .ant-table-thead > tr > th {
    height: 5px;
    padding: 4px;
  } */
`;
