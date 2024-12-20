/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, LeftOutlined, UpOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';

import AUD from '/aud.png';
import CAD from '/cad.png';
import CHF from '/chf.png';
import CNY from '/cny.png';
import DKK from '/dkk.png';
import EUR from '/eur.png';
import FUEL from '/fuel.png';
import GBP from '/gbp.png';
import HKD from '/hkd.png';
import INR from '/inr.png';
import JPY from '/jpy.png';
import KRW from '/krw.png';
import KWD from '/kwd.png';
import MYR from '/myr.png';
import NOK from '/nok.png';
import PORK from '/pork.png';
import RUB from '/rub.png';
import SAR from '/sar.png';
import SEK from '/sek.png';
import SGD from '/sgd.png';
import THB from '/thb.png';
import USD from '/usd.png';
import arrow_up_green from '@assets/icons/arrow_up_green.png';
import arrow_down_red from '@assets/icons/arrow_down_red.png';
import hot_news from '@assets/icons/hot_news.png';
import left_arrow from '@assets/icons/left_arrow.svg';
import right_arrow from '@assets/icons/right_arrow.svg';
import historyIcon from '@assets/icons/history.png';

const LIST_NGOAI_TE = {
  USD,
  EUR,
  GBP,
  AUD,
  CAD,
  CHF,
  CNY,
  DKK,
  HKD,
  INR,
  JPY,
  KRW,
  KWD,
  MYR,
  NOK,
  RUB,
  SAR,
  SEK,
  SGD,
  THB,
};

// import { styles } from "../constants/styles";
// import diskData from "../data/disk.tree.json";

import { RightOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import { Link } from 'react-router-dom';
import { StyledHome } from './styled';
import { getNews } from '@/services/servicesApi/serviceApi';
HC_more(Highcharts); //init module

const HangHoa: FC = ({
  listHangHoa,
  screenMode,
  curTabBottom,
  LIST_NGOAI_TE,
  listTyGiaNgoaiTe,
  listNuocNgoai,
  setCurTabBottom,
  ELECTRIC,
  formatGoldPrice,
  formatNumber,
  listGiaDien,
  listGiaVang,
  STOOL,
  listGiaPhan,
  listLaiSuat,
  curTabTop,
  FISH,
  listGiaCaTra,
  RICE,
  listGiaGao,
  STEEL,
  listGiaThep,
  listGiaHeo,
  soThangGui,
  listLaiSuatOnline,
  typeLaiSuat,
  setSoThangGui,
  setIsPickSoThang,
  isPickSoThang,
  setTypeLaiSuat,
  setIsPickLaiSuat,
  isPickLaiSuat,
  listGiaXangDauHistory,
  vungXangDau,
  convertDecimalStringToNumber,
  LIST_XANG_VUNG_1,
  LIST_XANG_VUNG_2,
  LIST_MAP_GOLD_NAME,
  GOLD_ICON,
  setCurTabTop,
  listMenu,
  scrollContainerRef,
  timePeriods1,
  timePeriods2,
  timePeriods3,
  listGiaXangDau,
  scrollHorizontally,
}: any) => {
  const [news, setNews] = useState<any[]>([]);
  const [curLaiSuat, setCurLaiSuat] = useState<any[]>(listLaiSuat);

  useEffect(() => {
    getNews().then((res) => {
      setNews(res.data.data);
    });
  }, []);
  useEffect(() => {
    if (typeLaiSuat === 'guiTaiQuay') {
      setCurLaiSuat(listLaiSuat);
    } else {
      setCurLaiSuat(listLaiSuatOnline);
    }
  }, [typeLaiSuat, listLaiSuat, listLaiSuatOnline]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div
      style={{
        display: 'flex',
        // backgroundColor: screenMode === 'dark' ? '' : '#fff',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        gap: '8px',
        flex: 39.763,
      }}
    >
      <div
        style={{
          display: 'flex',
          backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
          flex: 1,
          border:
            screenMode === 'dark' ? '1px solid #202127' : '1px solid #E3E5E8',
          borderRadius: '6px',
          // padding: '0 24px',
        }}
      >
        <div
          style={{
            // marginBottom: '5px',
            // padding: '8px',
            paddingBottom: '16px',
            paddingLeft: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '8px',

              width: '100%',
              borderBottom:
                screenMode === 'dark'
                  ? '1px solid #30323B'
                  : '1px solid #D5D7DC',
            }}
          >
            <div
              ref={scrollContainerRef}
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'scroll',
                // padding: '0 24px',
                // width: '100%',
                width: `${(width * 33.64583) / 100}px`,
                marginRight: '8px',
              }}
              className="hide-scrollbar"
            >
              <div
                className={
                  curTabTop === 'laiSuat' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('laiSuat')]}
                style={{
                  color:
                    curTabTop === 'laiSuat'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'laiSuat' ? '600' : '400',
                  // marginRight: '8px',
                  cursor: 'pointer',
                }}
              >
                Lãi suất
              </div>
              <div
                className={
                  curTabTop === 'giaVang' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaVang')]}
                style={{
                  color:
                    curTabTop === 'giaVang'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaVang' ? '600' : '400',
                  // marginRight: '8px',
                  cursor: 'pointer',
                }}
              >
                Giá vàng
              </div>
              <div
                className={
                  curTabTop === 'xangDau' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('xangDau')]}
                style={{
                  color:
                    curTabTop === 'xangDau'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'xangDau' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Xăng dầu
              </div>
              <div
                className={
                  curTabTop === 'giaHeo' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaHeo')]}
                style={{
                  color:
                    curTabTop === 'giaHeo'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaHeo' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Giá heo
              </div>
              <div
                className={
                  curTabTop === 'giaThep' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaThep')]}
                style={{
                  color:
                    curTabTop === 'giaThep'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaThep' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Giá thép
              </div>
              <div
                className={
                  curTabTop === 'giaGao' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaGao')]}
                style={{
                  color:
                    curTabTop === 'giaGao'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaGao' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Giá gạo
              </div>
              <div
                className={
                  curTabTop === 'giaCaTra' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaCaTra')]}
                style={{
                  color:
                    curTabTop === 'giaCaTra'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaCaTra' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Cá tra
              </div>
              <div
                className={
                  curTabTop === 'giaPhan' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaPhan')]}
                style={{
                  color:
                    curTabTop === 'giaPhan'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaPhan' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Giá phân
              </div>
              <div
                className={
                  curTabTop === 'giaDien' ? 'top-tab-active' : 'top-tab'
                }
                onClick={() => [setCurTabTop('giaDien')]}
                style={{
                  color:
                    curTabTop === 'giaDien'
                      ? screenMode === 'dark'
                        ? 'rgba(153, 186, 255, 1)'
                        : '#004AEA'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#2E3138',
                  padding: '10.5px 16px',
                  borderRadius: '3px',
                  fontSize: '15px',
                  fontFamily: 'Roboto Flex',
                  lineHeight: '20px',
                  fontWeight: curTabTop === 'giaDien' ? '600' : '400',
                  // marginRight: '8px',
                }}
              >
                Giá điện
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                // width: '64px',
                gap: '8px',
                // marginLeft: '8px',
                paddingTop: '6.5px',
              }}
            >
              <img
                onClick={() => scrollHorizontally('left')}
                style={{ width: '28px', height: '28px', cursor: 'pointer' }}
                src={left_arrow}
                className="leftArrow"
              />
              <img
                onClick={() => scrollHorizontally('right')}
                style={{ width: '28px', height: '28px', cursor: 'pointer' }}
                src={right_arrow}
                className="rightArrow"
              />
            </div>
          </div>

          {curTabTop === 'giaVang' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Tên
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá mua
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá bán
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaVang
                  ?.filter((item: any) => {
                    const timesArray = listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)
                      ?.map((itemHistory: any) => {
                        return moment
                          .unix(itemHistory?.update_time)
                          .format('HH:mm:ss');
                      });

                    return (
                      item?.yesterday_buy !== null &&
                      item?.type_code === 'XAUUSD'
                    );
                  })
                  .map((item: any, index: number) => {
                    const isUp =
                      +item?.buy >
                      +listGiaVang
                        ?.filter((itemHistory: any) => {
                          return item?.type_code === itemHistory?.type_code;
                        })
                        ?.slice(1, 5)[1]?.buy;
                    const isUpSell =
                      +item?.sell >
                      +listGiaVang
                        ?.filter((itemHistory: any) => {
                          return item?.type_code === itemHistory?.type_code;
                        })
                        ?.slice(1, 5)[1]?.sell;

                    return (
                      <Tooltip
                        color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                        key={index}
                        placement="leftTop"
                        overlayStyle={{ maxWidth: '700px' }}
                        style={{ overflow: 'hidden' }}
                        title={
                          <div
                            id="dhtmltooltip"
                            style={{
                              left: '-800px',
                              top: '1659px',
                              bottom: '100px',
                              overflow: 'hidden',
                              backgroundColor:
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                              // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            <div
                              style={{
                                width: '500px',
                                overflow: 'hidden',
                                padding: '16px',
                                // border: '1px solid #197fbf',
                                borderRadius: '3px',
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '16px',
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  color: '#FFFFFF',
                                }}
                              >
                                Lịch sử biến động giá mua/bán{' '}
                                {LIST_MAP_GOLD_NAME[item?.type_code]}
                              </div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any) => {
                                  const timeGold = moment
                                    .unix(itemHistory?.update_time)
                                    .format('HH:mm:ss');
                                }) && (
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={{
                                    chart: {
                                      type: 'column',
                                      backgroundColor:
                                        screenMode === 'dark'
                                          ? '#25262D'
                                          : '#FDFDFD',

                                      style: {
                                        color: '#fff',
                                      },
                                      borderRadius: 8,
                                      width: 500,
                                      marginTop: 40,
                                      marginLeft: 70,
                                      marginBottom: 107,
                                      height: 308,
                                    },
                                    credits: {
                                      enabled: false, // Loại bỏ chữ "Highcharts.com"
                                    },
                                    title: {
                                      text: null,
                                      style: {
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    colors:
                                      screenMode === 'dark'
                                        ? [
                                            '#5CD680',
                                            '#D15449',
                                            '#597BF8',
                                            '#30DF9D',
                                            '#FF36F5',
                                            '#FFD097',
                                            '#EF5E76',
                                            '#FFF92F',
                                          ]
                                        : [
                                            '#45783A',
                                            '#A33929',
                                            '#597BF8',
                                            '#30DF9D',
                                            '#FF36F5',
                                            '#FFD097',
                                            '#EF5E76',
                                            '#FFF92F',
                                          ],
                                    legend: {
                                      align: 'left',
                                      verticalAlign: 'bottom',
                                      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                      itemStyle: {
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                      minHeight: 70,
                                      maxWidth: 500,
                                      y: 20,

                                      navigation: {
                                        verticalAlign: 'left',
                                      },
                                    },
                                    plotOptions: {
                                      column: {
                                        stacking: 'normal',
                                        dataLabels: {
                                          enabled: false,
                                        },
                                        borderRadius: 0,
                                        borderWidth: 0,
                                      },
                                    },
                                    tooltip: {
                                      formatter: function () {
                                        let tooltipContent = `<b>${this.x}</b><br/>`;

                                        tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                        return tooltipContent;
                                      },
                                      useHTML: true,
                                    },
                                    xAxis: {
                                      categories: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss');
                                        }),
                                      labels: {
                                        style: {
                                          fontSize: 12,
                                          fontFamily: 'Roboto Flex',
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                      tickLength: 40,
                                      lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                      lineWidth: 0,
                                      tickWidth: 0,

                                      gridLineWidth: 0,
                                      crosshair: {
                                        color: 'gray',
                                        width: 1,
                                        zIndex: 5,
                                      },
                                    },
                                    yAxis: [
                                      {
                                        crosshair: {
                                          dashStyle: 'dash',
                                          width: 1,
                                          color: 'gray',
                                          zIndex: 5,
                                        },
                                        axisLabel: {
                                          formatter: function (value: number) {
                                            if (value > 1000000000) {
                                              return value / 1000000000 + ' tỷ';
                                            }
                                            if (value < -1000000000) {
                                              return value / 1000000000 + ' tỷ';
                                            }
                                            if (value === 0) return 0;
                                          },
                                        },
                                        title: {
                                          text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                        },
                                        gridLineColor: '#323546',
                                        gridLineDashStyle: 'dot',
                                        splitLine: {
                                          lineStyle: {
                                            color:
                                              screenMode === 'dark'
                                                ? 'rgba(58, 63, 66, 0.5)'
                                                : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                            dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                          },
                                        },
                                        labels: {
                                          style: {
                                            color:
                                              screenMode === 'dark'
                                                ? '#fff'
                                                : 'black',
                                          },
                                        },
                                      },
                                      {
                                        gridLineColor: '#323546',
                                        gridLineDashStyle: 'dot',
                                        splitLine: {
                                          lineStyle: {
                                            color:
                                              screenMode === 'dark'
                                                ? 'rgba(58, 63, 66, 0.5)'
                                                : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                            dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                          },
                                        },
                                        crosshair: {
                                          dashStyle: 'dash',
                                          width: 1,
                                          color: 'gray',
                                          zIndex: 5,
                                        },
                                        opposite: true, // this will put it on the right side
                                        title: {
                                          text: null, // you can set your title here
                                          style: {
                                            color:
                                              screenMode === 'dark'
                                                ? '#fff'
                                                : 'black',
                                          },
                                        },
                                        labels: {
                                          formatter: function () {
                                            return this.value + '%';
                                          },
                                          style: {
                                            color:
                                              screenMode === 'dark'
                                                ? '#fff'
                                                : 'black',
                                          },
                                        },
                                      },
                                    ],
                                    grid: {
                                      left: 80,
                                      right: 250,
                                      top: 100,
                                      bottom: 100,
                                    },
                                    series: [
                                      {
                                        name: 'Giá mua',
                                        data: listGiaVang
                                          ?.filter((itemHistory: any) => {
                                            return (
                                              item?.type_code ===
                                              itemHistory?.type_code
                                            );
                                          })
                                          ?.slice(1, 5)
                                          ?.map((itemHistory: any) => {
                                            return itemHistory.buy_avg;
                                          }),
                                        type: 'spline',
                                        marker: {
                                          enabled: false, // This will remove the dots on the line
                                        },
                                      },
                                      {
                                        name: 'Giá bán',
                                        data: listGiaVang
                                          ?.filter((itemHistory: any) => {
                                            return (
                                              item?.type_code ===
                                              itemHistory?.type_code
                                            );
                                          })
                                          ?.slice(1, 5)
                                          ?.map((itemHistory: any) => {
                                            return itemHistory.sell;
                                          }),
                                        type: 'spline',
                                        marker: {
                                          enabled: false, // This will remove the dots on the line
                                        },
                                      },
                                    ],
                                  }}
                                />
                              )}

                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  marginTop: '8px',
                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    width: '96px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRight:
                                      screenMode === 'dark'
                                        ? '1px solid #30323B'
                                        : '1px solid #D5D7DC',
                                    paddingLeft: '12px',
                                  }}
                                >
                                  {moment
                                    .unix(
                                      listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)[0]?.update_time
                                    )
                                    .format('DD/MM/YYYY')}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                    // color:
                                    //   screenMode === 'dark'
                                    //     ? '#818498'
                                    //     : '#66676B',
                                    width: '83px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',
                                  }}
                                  className="vung1Header"
                                >
                                  Giá mua
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    width: '93px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',

                                    borderRight:
                                      screenMode === 'dark'
                                        ? '1px solid #30323B'
                                        : '1px solid #D5D7DC',
                                  }}
                                  className="vung1Header"
                                >
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#5CD680'
                                          : '#45783A',
                                    }}
                                  >
                                    Tăng
                                  </span>
                                  /
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#D15449'
                                          : '#A33929',
                                    }}
                                  >
                                    Giảm
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    // color:
                                    //   screenMode === 'dark'
                                    //     ? '#818498'
                                    //     : '#66676B',
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                    width: '83px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',
                                  }}
                                  className="vung1Header"
                                >
                                  Giá bán
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    width: '93px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',

                                    borderBottom:
                                      screenMode === 'dark'
                                        ? '1px solid #30323B'
                                        : '1px solid #D5D7DC',
                                  }}
                                  className="vung1Header"
                                >
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#5CD680'
                                          : '#45783A',
                                    }}
                                  >
                                    Tăng
                                  </span>
                                  /
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#D15449'
                                          : '#A33929',
                                    }}
                                  >
                                    Giảm
                                  </span>
                                </div>
                              </div>
                              <div>
                                {listGiaVang
                                  ?.filter((itemHistory: any) => {
                                    return (
                                      item?.type_code === itemHistory?.type_code
                                    );
                                  })
                                  ?.slice(1, 5)
                                  ?.map((itemHistory: any, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          // padding: '8px 0',
                                          // borderRadius: '4px',
                                          borderBottom:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // backgroundColor:
                                          //   index % 2 === 0
                                          //     ? screenMode === 'dark'
                                          //       ? '#25262D'
                                          //       : '#F0F3FA'
                                          //     : screenMode === 'dark'
                                          //       ? '#2A2E39'
                                          //       : '#FDFDFD',
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '700',

                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            // color: '#3594EF',
                                            width: '96px',
                                            paddingLeft: '12px',
                                            // marginRight: '0px',
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: '#DDC230',
                                              // marginLeft: '4px',
                                            }}
                                          >
                                            {moment
                                              .unix(itemHistory?.update_time)
                                              .format('HH:mm:ss')}
                                          </span>
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            color:
                                              itemHistory?.alter_buy > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '83px',
                                            paddingLeft: '12px',
                                          }}
                                        >
                                          {formatGoldPrice(itemHistory?.buy)}
                                          {itemHistory?.alter_buy > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                          {/* {itemHistory?.alter_buy > 0 ? (
                                            <UpOutlined
                                              style={{
                                                fontSize: '9px',
                                                // marginLeft: '2px',
                                              }}
                                            />
                                          ) : (
                                            <DownOutlined
                                              style={{
                                                fontSize: '9px',
                                                // marginLeft: '2px',
                                              }}
                                            />
                                          )} */}
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            color:
                                              itemHistory?.alter_buy > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '93px',
                                            paddingLeft: '12px',

                                            // borderRight:
                                            //   '1px solid rgba(207, 208, 212, 0.5)',
                                          }}
                                        >
                                          {formatNumber(itemHistory?.alter_buy)}
                                          {itemHistory?.alter_buy > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                          {/* {itemHistory?.alter_buy > 0 ? (
                                            <UpOutlined
                                              style={{
                                                fontSize: '9px',
                                                // marginLeft: '2px',
                                              }}
                                            />
                                          ) : (
                                            <DownOutlined
                                              style={{
                                                fontSize: '9px',
                                                // marginLeft: '2px',
                                              }}
                                            />
                                          )} */}
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            // marginLeft: '40px',
                                            color:
                                              itemHistory?.alter_sell > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '83px',
                                            paddingLeft: '12px',
                                          }}
                                        >
                                          {formatGoldPrice(itemHistory?.sell)}
                                          {itemHistory?.alter_sell > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',

                                            color:
                                              itemHistory?.alter_sell > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '93px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',

                                            paddingLeft: '12px',
                                          }}
                                        >
                                          0
                                          {itemHistory?.alter_sell > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                          {/* {itemHistory?.alter_sell > 0 ? (
                                            <UpOutlined
                                              style={{
                                                fontSize: '9px',
                                                // marginLeft: '2px',
                                              }}
                                            />
                                          ) : (
                                            <DownOutlined
                                              style={{
                                                fontSize: '9px',
                                                // marginLeft: '2px',
                                              }}
                                            />
                                          )} */}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>

                              <div
                                style={{
                                  fontSize: '14px',
                                  fontFamily: 'Roboto Flex',
                                  color:
                                    screenMode === 'dark'
                                      ? '#99BAFF'
                                      : '#2E3138',
                                  fontWeight: '500',
                                  borderTop: '1px solid #30323B',
                                  paddingTop: '16px',
                                  marginTop: '16px',
                                  // textAlign: 'center',
                                  // marginTop: '10px',
                                }}
                              >
                                THỐNG KÊ TRONG NGÀY{' '}
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '43px',
                                  justifyContent: 'space-around',
                                  // marginTop: '8px',
                                  borderRadius: '4px',
                                  // padding: ' 2.5px 0 ',
                                  border: '1px solid #30323B',
                                  height: '52px',
                                  alignItems: 'center',
                                  marginTop: '4px',
                                  // backgroundColor:
                                  //   screenMode === 'dark'
                                  //     ? '#2A2E39'
                                  //     : '#F0F3FA',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '140px',
                                  }}
                                >
                                  Thấp nhất:
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : '#2E3138',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto Flex',
                                    }}
                                  >
                                    {' '}
                                    {formatGoldPrice(item?.buy_min)}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '120px',
                                  }}
                                  className="vung1Header"
                                >
                                  Cao nhất:
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : '#2E3138',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto Flex',
                                    }}
                                  >
                                    {' '}
                                    {formatGoldPrice(item?.buy_max)}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '200px',
                                  }}
                                >
                                  Trung bình:
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : '#2E3138',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto Flex',
                                    }}
                                  >
                                    {' '}
                                    {formatGoldPrice(item?.buy_avg)}
                                  </span>
                                </div>
                                {/* <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '140px',
                                  }}
                                >
                                  Thấp nhất
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '120px',
                                  }}
                                  className="vung1Header"
                                >
                                  Cao nhất
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '140px',
                                  }}
                                  className="vung1Header"
                                >
                                  Trung bình
                                </div> */}
                              </div>
                              {/* <div>
                                <div
                                  key={index}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // padding: '8px 0',
                                    borderRadius: '4px',
                                    backgroundColor:
                                      index % 2 === 0
                                        ? screenMode === 'dark'
                                          ? '#25262D'
                                          : '#F0F3FA'
                                        : screenMode === 'dark'
                                          ? '#2A2E39'
                                          : '#FDFDFD',
                                  }}
                                >
                                  <div
                                    style={{
                                      fontFamily: 'Roboto Flex',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                      color: '#fff',
                                      // width: '140px',
                                      marginRight: '0px',
                                    }}
                                  >
                                    {formatGoldPrice(item?.buy_min)}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Roboto Flex',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                      color:
                                        screenMode === 'dark'
                                          ? '#FFFFFF'
                                          : '#2E3138',
                                      width: '120px',
                                    }}
                                  >
                                    {formatGoldPrice(item?.buy_max)}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Roboto Flex',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                      color: '#fff',
                                      width: '200px',
                                      marginRight: '0px',
                                    }}
                                  >
                                    {formatGoldPrice(item?.buy_avg)}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Roboto Flex',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                      color: '#fff',
                                      width: '120px',
                                      marginRight: '0px',
                                    }}
                                  >
                                    {formatGoldPrice(item?.sell_min)}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Roboto Flex',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                      color:
                                        screenMode === 'dark'
                                          ? '#FFFFFF'
                                          : '#2E3138',
                                      width: '120px',
                                    }}
                                  >
                                    {formatGoldPrice(item?.sell_max)}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Roboto Flex',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                      color:
                                        screenMode === 'dark'
                                          ? '#FFFFFF'
                                          : '#2E3138',
                                      width: '120px',
                                    }}
                                  >
                                    {formatGoldPrice(item?.sell_avg)}
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        }
                      >
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottom:
                              screenMode === 'dark'
                                ? '1px solid #30323B'
                                : '1px solid #D5D7DC',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '8px',
                              width: '332px',
                              padding: '10px 0px 10px 0px',
                            }}
                          >
                            <img
                              src={GOLD_ICON}
                              style={{
                                width: '20px',
                                height: '20px',
                                // borderRadius: '4px',
                                // marginRight: '4px',
                              }}
                            />
                            <Tooltip
                              color={
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                              }
                              title={LIST_MAP_GOLD_NAME[item?.type_code]}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '400',
                                  fontSize: '13px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#99BAFF'
                                      : '#2E3138',
                                  // width:
                                  //   item?.type_code === 'XAUUSD'
                                  //     ? '60.3%'
                                  //     : '46.3%',
                                }}
                              >
                                {LIST_MAP_GOLD_NAME[item?.type_code]?.length >
                                100
                                  ? `${LIST_MAP_GOLD_NAME[item?.type_code]?.slice(0, 100)?.toLocaleUpperCase()}...`
                                  : LIST_MAP_GOLD_NAME[
                                      item?.type_code
                                    ]?.toUpperCase()}
                              </div>
                            </Tooltip>
                          </div>

                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              color: isUp
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              width: '321px',
                              textAlign: 'center',
                              paddingLeft: '80px',
                              // width:
                              //   item?.type_code === 'XAUUSD'
                              //     ? '40.3%'
                              //     : '30.3%',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {formatGoldPrice(item?.buy)}
                            {isUp ? (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_up_green}
                              />
                            ) : (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_down_red}
                              />
                            )}
                          </div>
                          {item?.type_code !== 'XAUUSD' && (
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',

                                color: isUpSell
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                              }}
                            >
                              {formatGoldPrice(item?.sell)}
                              {isUp ? (
                                <img
                                  style={{ padding: '6px' }}
                                  src={arrow_up_green}
                                />
                              ) : (
                                <img
                                  style={{ padding: '6px' }}
                                  src={arrow_down_red}
                                />
                              )}
                            </div>
                          )}
                          <div
                            style={{
                              // marginRight: '24px'
                              width: '65px',
                              textAlign: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <img src={historyIcon} />
                          </div>
                        </div>
                      </Tooltip>
                    );
                  })}
                {listGiaVang
                  ?.filter((item: any) => {
                    return (
                      item?.yesterday_buy !== null &&
                      item?.type_code !== 'XAUUSD' &&
                      item?.type_code !== 'USDX'
                    );
                  })
                  .map((item: any, index: number) => {
                    const isUp =
                      +item?.buy >
                      +listGiaVang
                        ?.filter((itemHistory: any) => {
                          return item?.type_code === itemHistory?.type_code;
                        })
                        ?.slice(1, 5)[1]?.buy;
                    const isUpSell =
                      +item?.sell >
                      +listGiaVang
                        ?.filter((itemHistory: any) => {
                          return item?.type_code === itemHistory?.type_code;
                        })
                        ?.slice(1, 5)[1]?.sell;

                    return (
                      <Tooltip
                        color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                        key={index}
                        placement="left"
                        overlayStyle={{
                          maxWidth: '700px',
                          boxShadow: 'none', // Remove the shadow
                          border: 'none', // Remove the border
                          backgroundColor: 'transparent', // Optional: remove background color if needed
                        }}
                        style={{ overflow: 'hidden' }}
                        title={
                          <div
                            id="dhtmltooltip"
                            style={{
                              left: '-800px',
                              top: '1659px',
                              overflow: 'hidden',
                              backgroundColor:
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                              // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            <div
                              style={{
                                width: '500px',
                                overflow: 'hidden',
                                padding: '16px',
                                // border: '1px solid #197fbf',
                                borderRadius: '3px',
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '16px',
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  color: '#FFFFFF',
                                }}
                              >
                                Lịch sử biến động giá mua/bán{' '}
                                {LIST_MAP_GOLD_NAME[item?.type_code]}
                              </div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any) => {
                                  const timeGold = moment
                                    .unix(itemHistory?.update_time)
                                    .format('HH:mm:ss');
                                }) && (
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={{
                                    chart: {
                                      type: 'column',
                                      backgroundColor:
                                        screenMode === 'dark'
                                          ? '#25262D'
                                          : '#FDFDFD',

                                      style: {
                                        color: '#fff',
                                      },
                                      borderRadius: 8,
                                      width: 500,
                                      marginTop: 40,
                                      marginLeft: 70,
                                      marginBottom: 107,
                                      height: 308,
                                    },
                                    credits: {
                                      enabled: false, // Loại bỏ chữ "Highcharts.com"
                                    },
                                    title: {
                                      text: null,
                                      style: {
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    colors:
                                      screenMode === 'dark'
                                        ? [
                                            '#5CD680',
                                            '#D15449',
                                            '#597BF8',
                                            '#30DF9D',
                                            '#FF36F5',
                                            '#FFD097',
                                            '#EF5E76',
                                            '#FFF92F',
                                          ]
                                        : [
                                            '#45783A',
                                            '#A33929',
                                            '#597BF8',
                                            '#30DF9D',
                                            '#FF36F5',
                                            '#FFD097',
                                            '#EF5E76',
                                            '#FFF92F',
                                          ],
                                    legend: {
                                      align: 'left',
                                      verticalAlign: 'bottom',
                                      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                      itemStyle: {
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                      minHeight: 70,
                                      maxWidth: 500,
                                      y: 20,

                                      navigation: {
                                        verticalAlign: 'left',
                                      },
                                    },
                                    plotOptions: {
                                      column: {
                                        stacking: 'normal',
                                        dataLabels: {
                                          enabled: false,
                                        },
                                        borderRadius: 0,
                                        borderWidth: 0,
                                      },
                                    },
                                    tooltip: {
                                      formatter: function () {
                                        let tooltipContent = `<b>${this.x}</b><br/>`;

                                        tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                        return tooltipContent;
                                      },
                                      useHTML: true,
                                    },
                                    xAxis: {
                                      categories: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss');
                                        }),
                                      labels: {
                                        style: {
                                          fontSize: 12,
                                          fontFamily: 'Roboto Flex',
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                      tickLength: 40,
                                      lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                      lineWidth: 0,
                                      tickWidth: 0,

                                      gridLineWidth: 0,
                                      crosshair: {
                                        color: 'gray',
                                        width: 1,
                                        zIndex: 5,
                                      },
                                    },
                                    yAxis: [
                                      {
                                        crosshair: {
                                          dashStyle: 'dash',
                                          width: 1,
                                          color: 'gray',
                                          zIndex: 5,
                                        },
                                        axisLabel: {
                                          formatter: function (value: number) {
                                            if (value > 1000000000) {
                                              return value / 1000000000 + ' tỷ';
                                            }
                                            if (value < -1000000000) {
                                              return value / 1000000000 + ' tỷ';
                                            }
                                            if (value === 0) return 0;
                                          },
                                        },
                                        title: {
                                          text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                        },
                                        gridLineColor: '#323546',
                                        gridLineDashStyle: 'dot',
                                        splitLine: {
                                          lineStyle: {
                                            color:
                                              screenMode === 'dark'
                                                ? 'rgba(58, 63, 66, 0.5)'
                                                : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                            dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                          },
                                        },
                                        labels: {
                                          style: {
                                            color:
                                              screenMode === 'dark'
                                                ? '#fff'
                                                : 'black',
                                          },
                                        },
                                      },
                                      {
                                        gridLineColor: '#323546',
                                        gridLineDashStyle: 'dot',
                                        splitLine: {
                                          lineStyle: {
                                            color:
                                              screenMode === 'dark'
                                                ? 'rgba(58, 63, 66, 0.5)'
                                                : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                            dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                          },
                                        },
                                        crosshair: {
                                          dashStyle: 'dash',
                                          width: 1,
                                          color: 'gray',
                                          zIndex: 5,
                                        },
                                        opposite: true, // this will put it on the right side
                                        title: {
                                          text: null, // you can set your title here
                                          style: {
                                            color:
                                              screenMode === 'dark'
                                                ? '#fff'
                                                : 'black',
                                          },
                                        },
                                        labels: {
                                          formatter: function () {
                                            return this.value + '%';
                                          },
                                          style: {
                                            color:
                                              screenMode === 'dark'
                                                ? '#fff'
                                                : 'black',
                                          },
                                        },
                                      },
                                    ],
                                    grid: {
                                      left: 80,
                                      right: 250,
                                      top: 100,
                                      bottom: 100,
                                    },
                                    series: [
                                      {
                                        name: 'Giá mua',
                                        data: listGiaVang
                                          ?.filter((itemHistory: any) => {
                                            return (
                                              item?.type_code ===
                                              itemHistory?.type_code
                                            );
                                          })
                                          ?.slice(1, 5)
                                          ?.map((itemHistory: any) => {
                                            return itemHistory.buy_avg;
                                          }),
                                        type: 'spline',
                                        marker: {
                                          enabled: false, // This will remove the dots on the line
                                        },
                                      },
                                      {
                                        name: 'Giá bán',
                                        data: listGiaVang
                                          ?.filter((itemHistory: any) => {
                                            return (
                                              item?.type_code ===
                                              itemHistory?.type_code
                                            );
                                          })
                                          ?.slice(1, 5)
                                          ?.map((itemHistory: any) => {
                                            return itemHistory.sell;
                                          }),
                                        type: 'spline',
                                        marker: {
                                          enabled: false, // This will remove the dots on the line
                                        },
                                      },
                                    ],
                                  }}
                                />
                              )}

                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  marginTop: '8px',
                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    width: '96px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRight:
                                      screenMode === 'dark'
                                        ? '1px solid #30323B'
                                        : '1px solid #D5D7DC',
                                    paddingLeft: '12px',
                                  }}
                                >
                                  {moment
                                    .unix(
                                      listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)[0]?.update_time
                                    )
                                    .format('DD/MM/YYYY')}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                    // color:
                                    //   screenMode === 'dark'
                                    //     ? '#818498'
                                    //     : '#66676B',
                                    width: '83px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',
                                  }}
                                  className="vung1Header"
                                >
                                  Giá mua
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    width: '93px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',

                                    borderRight:
                                      screenMode === 'dark'
                                        ? '1px solid #30323B'
                                        : '1px solid #D5D7DC',
                                  }}
                                  className="vung1Header"
                                >
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#5CD680'
                                          : '#45783A',
                                    }}
                                  >
                                    Tăng
                                  </span>
                                  /
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#D15449'
                                          : '#A33929',
                                    }}
                                  >
                                    Giảm
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    // color:
                                    //   screenMode === 'dark'
                                    //     ? '#818498'
                                    //     : '#66676B',
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                    width: '83px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',
                                  }}
                                  className="vung1Header"
                                >
                                  Giá bán
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    width: '93px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',

                                    borderBottom:
                                      screenMode === 'dark'
                                        ? '1px solid #30323B'
                                        : '1px solid #D5D7DC',
                                  }}
                                  className="vung1Header"
                                >
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#5CD680'
                                          : '#45783A',
                                    }}
                                  >
                                    Tăng
                                  </span>
                                  /
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#D15449'
                                          : '#A33929',
                                    }}
                                  >
                                    Giảm
                                  </span>
                                </div>
                              </div>
                              <div>
                                {listGiaVang
                                  ?.filter((itemHistory: any) => {
                                    return (
                                      item?.type_code === itemHistory?.type_code
                                    );
                                  })
                                  ?.slice(1, 5)
                                  ?.map((itemHistory: any, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          // padding: '8px 0',
                                          // borderRadius: '4px',
                                          borderBottom:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // backgroundColor:
                                          //   index % 2 === 0
                                          //     ? screenMode === 'dark'
                                          //       ? '#25262D'
                                          //       : '#F0F3FA'
                                          //     : screenMode === 'dark'
                                          //       ? '#2A2E39'
                                          //       : '#FDFDFD',
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '700',

                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            // color: '#3594EF',
                                            width: '96px',
                                            paddingLeft: '12px',
                                            // marginRight: '0px',
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: '#DDC230',
                                              // marginLeft: '4px',
                                            }}
                                          >
                                            {moment
                                              .unix(itemHistory?.update_time)
                                              .format('HH:mm:ss')}
                                          </span>
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            color:
                                              itemHistory?.buy > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '83px',
                                            paddingLeft: '12px',
                                          }}
                                        >
                                          {formatGoldPrice(itemHistory?.buy)}
                                          {itemHistory?.buy > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                          {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            color:
                                              itemHistory?.alter_buy > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '93px',
                                            paddingLeft: '12px',

                                            // borderRight:
                                            //   '1px solid rgba(207, 208, 212, 0.5)',
                                          }}
                                        >
                                          {formatNumber(itemHistory?.alter_buy)}
                                          {itemHistory?.alter_buy > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                          {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            borderRight:
                                              screenMode === 'dark'
                                                ? '1px solid #30323B'
                                                : '1px solid #D5D7DC',
                                            // marginLeft: '40px',
                                            color:
                                              itemHistory?.sell > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '83px',
                                            paddingLeft: '12px',
                                          }}
                                        >
                                          {formatGoldPrice(itemHistory?.sell)}
                                          {itemHistory?.sell > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            fontFamily: 'Roboto Flex',
                                            fontWeight: '400',
                                            fontSize: '14px',

                                            color:
                                              itemHistory?.alter_sell > 0
                                                ? '#5CD680'
                                                : '#D15449',
                                            width: '93px',
                                            height: '40px',
                                            alignItems: 'center',
                                            display: 'flex',

                                            paddingLeft: '12px',
                                          }}
                                        >
                                          {formatGoldPrice(
                                            itemHistory?.alter_sell
                                          )}
                                          {itemHistory?.alter_sell > 0 ? (
                                            // <UpOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_up_green}
                                            />
                                          ) : (
                                            // <DownOutlined
                                            //   style={{
                                            //     fontSize: '9px',
                                            //     marginLeft: '2px',
                                            //   }}
                                            // />
                                            <img
                                              style={{ padding: '6px' }}
                                              src={arrow_down_red}
                                            />
                                          )}
                                          {/* {itemHistory?.alter_sell > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>

                              <div
                                style={{
                                  fontSize: '14px',
                                  fontFamily: 'Roboto Flex',
                                  color:
                                    screenMode === 'dark'
                                      ? '#99BAFF'
                                      : '#2E3138',
                                  fontWeight: '500',
                                  borderTop: '1px solid #30323B',
                                  paddingTop: '16px',
                                  marginTop: '16px',
                                  // textAlign: 'center',
                                  // marginTop: '10px',
                                }}
                              >
                                THỐNG KÊ TRONG NGÀY{' '}
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '43px',
                                  justifyContent: 'space-around',
                                  // marginTop: '8px',
                                  borderRadius: '4px',
                                  // padding: ' 2.5px 0 ',
                                  border: '1px solid #30323B',
                                  height: '52px',
                                  alignItems: 'center',
                                  marginTop: '4px',
                                  // backgroundColor:
                                  //   screenMode === 'dark'
                                  //     ? '#2A2E39'
                                  //     : '#F0F3FA',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '140px',
                                  }}
                                >
                                  Thấp nhất:
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : '#2E3138',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto Flex',
                                    }}
                                  >
                                    {' '}
                                    {formatGoldPrice(item?.buy_min)}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '120px',
                                  }}
                                  className="vung1Header"
                                >
                                  Cao nhất:
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : '#2E3138',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto Flex',
                                    }}
                                  >
                                    {' '}
                                    {formatGoldPrice(item?.buy_max)}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#818498'
                                        : '#66676B',
                                    // width: '200px',
                                  }}
                                >
                                  Trung bình:
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : '#2E3138',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto Flex',
                                    }}
                                  >
                                    {' '}
                                    {formatGoldPrice(item?.buy_avg)}
                                  </span>
                                </div>
                                {/* <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                                className="vung1Header"
                              >
                                Trung bình
                              </div> */}
                              </div>
                              {/* <div>
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // padding: '8px 0',
                                  borderRadius: '4px',
                                  backgroundColor:
                                    index % 2 === 0
                                      ? screenMode === 'dark'
                                        ? '#25262D'
                                        : '#F0F3FA'
                                      : screenMode === 'dark'
                                        ? '#2A2E39'
                                        : '#FDFDFD',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    // width: '140px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '200px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_avg)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '120px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_avg)}
                                </div>
                              </div>
                            </div> */}
                            </div>
                          </div>
                        }
                      >
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '40px',

                            borderBottom:
                              screenMode === 'dark'
                                ? '1px solid #30323B'
                                : '1px solid #D5D7DC',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '8px',
                              width: '332px',
                              padding: '10px 0px 10px 0px',
                            }}
                          >
                            <img
                              src={GOLD_ICON}
                              style={{
                                width: '20px',
                                height: '20px',
                                // borderRadius: '4px',
                                // marginRight: '4px',
                              }}
                            />
                            <Tooltip
                              color={
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                              }
                              title={LIST_MAP_GOLD_NAME[item?.type_code]}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '400',
                                  fontSize: '13px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#99BAFF'
                                      : '#2E3138',
                                  // width:
                                  //   item?.type_code === 'XAUUSD'
                                  //     ? '60.3%'
                                  //     : '46.3%',
                                  marginRight: '0px',
                                }}
                              >
                                {LIST_MAP_GOLD_NAME[item?.type_code]?.length >
                                50
                                  ? `${LIST_MAP_GOLD_NAME[item?.type_code]?.slice(0, 50)?.toLocaleUpperCase()}...`
                                  : LIST_MAP_GOLD_NAME[
                                      item?.type_code
                                    ]?.toUpperCase()}
                              </div>
                            </Tooltip>
                          </div>

                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              color: isUp
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              width: '153px',
                              gap: '8px',
                              // width:
                              //   item?.type_code === 'XAUUSD'
                              //     ? '40.3%'
                              //     : '30.3%',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {formatGoldPrice(item?.buy)}
                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUp
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUp
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>

                            {/* {isUp ? (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_up_green}
                              />
                            ) : (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_down_red}
                              />
                            )} */}
                          </div>
                          {item?.type_code !== 'XAUUSD' && (
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                width: '168px',
                                gap: '8px',
                                color: isUpSell
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              {formatGoldPrice(item?.sell)}

                              <svg
                                width="10"
                                height="11"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d={
                                    isUpSell
                                      ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                      : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                  }
                                  fill={
                                    isUpSell
                                      ? screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A'
                                      : screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929'
                                  }
                                />
                              </svg>
                              {/* {isUp ? (
                                <img
                                  style={{ paddingLeft: '6px' }}
                                  src={arrow_up_green}
                                />
                              ) : (
                                <img
                                  style={{ paddingLeft: '6px' }}
                                  src={arrow_down_red}
                                />
                              )} */}
                            </div>
                          )}
                          <div
                            style={{
                              // marginRight: '24px'
                              width: '65px',
                              textAlign: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <img src={historyIcon} />
                          </div>
                        </div>
                      </Tooltip>
                    );
                  })}
              </div>
            </>
          )}
          {curTabTop === 'xangDau' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Tên sản phẩm
                </div>
                <Tooltip
                  color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                  // overlayClassName="custom-tooltip-background"
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                  title={
                    <div
                      style={{
                        // height: '400px',
                        // overflow: 'scroll',
                        backgroundColor:
                          screenMode === 'dark' ? '#25262D' : '#FDFDFD',
                        padding: 0,
                        margin: 0,
                        scrollbarColor: 'rgba(42, 46, 57, 1) #25262D',
                        scrollbarWidth: 'thin',
                        border: '1px solid rgb(25, 127, 191, 0.18)',
                        borderRadius: '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: ' center',
                          fontWeight: '600',
                          padding: '8px',
                          color: screenMode === 'dark' ? '#fff' : 'black',
                        }}
                      >
                        VÙNG 1
                      </div>
                      <div
                        style={{
                          height: '400px',
                          overflow: 'scroll',
                          // backgroundColor: '#25262D',
                          // padding: 0,
                          // margin: 0,
                          scrollbarColor:
                            screenMode === 'light'
                              ? '#c8c8c8 #d5d5d5'
                              : 'rgba(42, 46, 57, 1) #1f232c',
                          scrollbarWidth: 'thin',
                          // border: '1px solid rgb(25, 127, 191, 0.18)',
                          // borderRadius: '20px',
                        }}
                      >
                        {LIST_XANG_VUNG_1.map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              style={{
                                color: screenMode === 'dark' ? '#fff' : 'black',

                                marginBottom: '4px',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor:
                                  index % 2 === 0
                                    ? screenMode === 'dark'
                                      ? '#25262D'
                                      : '#F0F3FA'
                                    : screenMode === 'dark'
                                      ? '#2A2E39'
                                      : '#FDFDFD',
                              }}
                            >
                              {index + 1}. {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  }
                >
                  <div
                    style={{
                      fontFamily: 'Roboto Flex',
                      fontWeight: '500',
                      fontSize: '14px',
                      width: '153px',
                      color: screenMode === 'dark' ? '#818498' : '#66676B',
                    }}
                    className="vung1Header"
                  >
                    Vùng 1
                    <DownOutlined
                      style={{ fontSize: '14px', marginLeft: '2px' }}
                    />
                  </div>
                </Tooltip>

                <Tooltip
                  color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                  title={
                    <div
                      style={{
                        // height: '400px',
                        // overflow: 'scroll',
                        backgroundColor:
                          screenMode === 'dark' ? '#25262D' : '#FDFDFD',
                        padding: 0,
                        margin: 0,
                        scrollbarColor: 'rgba(42, 46, 57, 1) #25262D',
                        scrollbarWidth: 'thin',
                        border: '1px solid rgb(25, 127, 191, 0.18)',
                        borderRadius: '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: ' center',
                          fontWeight: '600',
                          padding: '8px',
                          color: screenMode === 'dark' ? '#fff' : 'black',
                        }}
                      >
                        VÙNG 2
                      </div>
                      <div
                        style={{
                          height: '400px',
                          overflow: 'scroll',
                          // backgroundColor: '#25262D',
                          // padding: 0,
                          // margin: 0,
                          scrollbarColor:
                            screenMode === 'light'
                              ? '#c8c8c8 #d5d5d5'
                              : 'rgba(42, 46, 57, 1) #1f232c',
                          scrollbarWidth: 'thin',
                          // border: '1px solid rgb(25, 127, 191, 0.18)',
                          // borderRadius: '20px',
                        }}
                      >
                        {LIST_XANG_VUNG_2.map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              style={{
                                marginBottom: '4px',
                                padding: '4px',
                                backgroundColor:
                                  index % 2 === 0
                                    ? screenMode === 'dark'
                                      ? '#25262D'
                                      : '#F0F3FA'
                                    : screenMode === 'dark'
                                      ? '#2A2E39'
                                      : '#FDFDFD',
                                color: screenMode === 'dark' ? '#fff' : 'black',
                              }}
                            >
                              {index + 1}. {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  }
                >
                  <div
                    style={{
                      fontFamily: 'Roboto Flex',
                      fontWeight: '500',
                      fontSize: '14px',
                      width: '168px',
                      color: screenMode === 'dark' ? '#818498' : '#66676B',
                    }}
                    className="vung2Header"
                  >
                    Vùng 2
                    <DownOutlined
                      style={{ fontSize: '14px', marginLeft: '2px' }}
                    />
                  </div>
                </Tooltip>

                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaXangDau.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // padding: '8px 0',
                                        // borderRadius: '4px',
                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        // backgroundColor:
                                        //   index % 2 === 0
                                        //     ? screenMode === 'dark'
                                        //       ? '#25262D'
                                        //       : '#F0F3FA'
                                        //     : screenMode === 'dark'
                                        //       ? '#2A2E39'
                                        //       : '#FDFDFD',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // color: '#3594EF',
                                          width: '96px',
                                          paddingLeft: '12px',
                                          // marginRight: '0px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                            // marginLeft: '4px',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',

                                          // borderRight:
                                          //   '1px solid rgba(207, 208, 212, 0.5)',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // marginLeft: '40px',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_sell > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                                // textAlign: 'center',
                                // marginTop: '10px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                // marginTop: '8px',
                                borderRadius: '4px',
                                // padding: ' 2.5px 0 ',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                                // backgroundColor:
                                //   screenMode === 'dark'
                                //     ? '#2A2E39'
                                //     : '#F0F3FA',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                              {/* <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                                className="vung1Header"
                              >
                                Trung bình
                              </div> */}
                            </div>
                            {/* <div>
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // padding: '8px 0',
                                  borderRadius: '4px',
                                  backgroundColor:
                                    index % 2 === 0
                                      ? screenMode === 'dark'
                                        ? '#25262D'
                                        : '#F0F3FA'
                                      : screenMode === 'dark'
                                        ? '#2A2E39'
                                        : '#FDFDFD',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    // width: '140px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '200px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_avg)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '120px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_avg)}
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={FUEL}
                            style={{
                              width: '20px',
                              height: '20px',
                              // borderRadius: '4px',
                              // marginRight: '4px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.petroName}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                // width:
                                //   item?.type_code === 'XAUUSD'
                                //     ? '60.3%'
                                //     : '46.3%',
                                marginRight: '0px',
                              }}
                            >
                              {item?.petroName?.length > 100
                                ? `${item?.petroName?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.petroName?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',
                            // width:
                            //   item?.type_code === 'XAUUSD'
                            //     ? '40.3%'
                            //     : '30.3%',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.area1}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>

                          {/* {isUp ? (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_up_green}
                              />
                            ) : (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_down_red}
                              />
                            )} */}
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.area2}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                            {/* {isUp ? (
                                <img
                                  style={{ paddingLeft: '6px' }}
                                  src={arrow_up_green}
                                />
                              ) : (
                                <img
                                  style={{ paddingLeft: '6px' }}
                                  src={arrow_down_red}
                                />
                              )} */}
                          </div>
                        )}
                        <div
                          style={{
                            // marginRight: '24px'
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}

          {curTabTop === 'laiSuat' && (
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}
              >
                <div
                  style={{
                    backgroundColor:
                      typeLaiSuat === 'guiTaiQuay'
                        ? screenMode === 'dark'
                          ? '#22304F'
                          : '#CCDDFF'
                        : screenMode === 'dark'
                          ? '#292B32'
                          : '#DEDFE3',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    height: '28px',
                    color:
                      typeLaiSuat === 'guiTaiQuay'
                        ? screenMode === 'dark'
                          ? '#99BAFF'
                          : '#004AEA'
                        : screenMode === 'dark'
                          ? '#E3E4E8'
                          : '#565B67',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontFamily: 'Roboto Flex',
                    fontWeight: '400',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  className="laiSuatTab"
                  onClick={() => {
                    setTypeLaiSuat('guiTaiQuay');
                  }}
                >
                  Lãi suất gửi tại quầy
                </div>
                <div
                  style={{
                    backgroundColor:
                      typeLaiSuat === 'guiOnline'
                        ? screenMode === 'dark'
                          ? '#22304F'
                          : '#CCDDFF'
                        : screenMode === 'dark'
                          ? '#292B32'
                          : '#DEDFE3',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    height: '28px',
                    color:
                      typeLaiSuat === 'guiOnline'
                        ? screenMode === 'dark'
                          ? '#99BAFF'
                          : '#004AEA'
                        : screenMode === 'dark'
                          ? '#E3E4E8'
                          : '#565B67',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontFamily: 'Roboto Flex',
                    fontWeight: '400',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  className="laiSuatTab"
                  onClick={() => {
                    setTypeLaiSuat('guiOnline');
                  }}
                >
                  Lãi suất gửi tại online
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '123px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Ngân hàng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  1 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  3 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  6 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  9 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  12 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  13 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  18 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  24 tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '66px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  36 tháng
                </div>
              </div>
              <div
                style={{
                  height: `149.5px`,
                  overflowY: 'scroll',
                }}
              >
                {curLaiSuat.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          width: '96px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                borderRadius: '4px',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '124px',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={
                              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png'
                            }
                            style={{
                              width: '20px',
                              height: '12px',
                              marginRight: '6px',
                              borderRadius: '2px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.bankName}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                marginRight: '0px',
                              }}
                            >
                              {item?.bankName?.length > 100
                                ? `${item?.bankName?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.bankName?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value1Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value3Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value6Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value9Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value12Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value13Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value18Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value24Month`]} %
                        </div>
                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: screenMode === 'dark' ? '#fff' : '#25262D',
                            width: '66px',
                            gap: '8px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item[`value36Month`]} %
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
          {curTabTop === 'giaHeo' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Miền
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá bình quân
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá TB cả nước
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaHeo.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // padding: '8px 0',
                                        // borderRadius: '4px',
                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        // backgroundColor:
                                        //   index % 2 === 0
                                        //     ? screenMode === 'dark'
                                        //       ? '#25262D'
                                        //       : '#F0F3FA'
                                        //     : screenMode === 'dark'
                                        //       ? '#2A2E39'
                                        //       : '#FDFDFD',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // color: '#3594EF',
                                          width: '96px',
                                          paddingLeft: '12px',
                                          // marginRight: '0px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                            // marginLeft: '4px',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',

                                          // borderRight:
                                          //   '1px solid rgba(207, 208, 212, 0.5)',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // marginLeft: '40px',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_sell > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                                // textAlign: 'center',
                                // marginTop: '10px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                // marginTop: '8px',
                                borderRadius: '4px',
                                // padding: ' 2.5px 0 ',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                                // backgroundColor:
                                //   screenMode === 'dark'
                                //     ? '#2A2E39'
                                //     : '#F0F3FA',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                              {/* <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                                className="vung1Header"
                              >
                                Trung bình
                              </div> */}
                            </div>
                            {/* <div>
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // padding: '8px 0',
                                  borderRadius: '4px',
                                  backgroundColor:
                                    index % 2 === 0
                                      ? screenMode === 'dark'
                                        ? '#25262D'
                                        : '#F0F3FA'
                                      : screenMode === 'dark'
                                        ? '#2A2E39'
                                        : '#FDFDFD',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    // width: '140px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '200px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_avg)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '120px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_avg)}
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={PORK}
                            style={{
                              width: '20px',
                              height: '20px',
                              // borderRadius: '4px',
                              // marginRight: '4px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.bankName}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                // width:
                                //   item?.type_code === 'XAUUSD'
                                //     ? '60.3%'
                                //     : '46.3%',
                                marginRight: '0px',
                              }}
                            >
                              {item?.area?.length > 100
                                ? `${item?.area?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.area?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',
                            // width:
                            //   item?.type_code === 'XAUUSD'
                            //     ? '40.3%'
                            //     : '30.3%',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.price}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>

                          {/* {isUp ? (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_up_green}
                              />
                            ) : (
                              <img
                                style={{ padding: '6px' }}
                                src={arrow_down_red}
                              />
                            )} */}
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.priceAll}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          style={{
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
          {curTabTop === 'giaThep' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Loại thép
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaThep.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // padding: '8px 0',
                                        // borderRadius: '4px',
                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        // backgroundColor:
                                        //   index % 2 === 0
                                        //     ? screenMode === 'dark'
                                        //       ? '#25262D'
                                        //       : '#F0F3FA'
                                        //     : screenMode === 'dark'
                                        //       ? '#2A2E39'
                                        //       : '#FDFDFD',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // color: '#3594EF',
                                          width: '96px',
                                          paddingLeft: '12px',
                                          // marginRight: '0px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                            // marginLeft: '4px',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',

                                          // borderRight:
                                          //   '1px solid rgba(207, 208, 212, 0.5)',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_buy > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          // marginLeft: '40px',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          // <UpOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          // <DownOutlined
                                          //   style={{
                                          //     fontSize: '9px',
                                          //     marginLeft: '2px',
                                          //   }}
                                          // />
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                        {/* {itemHistory?.alter_sell > 0 ? (
                                          <UpOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        ) : (
                                          <DownOutlined
                                            style={{
                                              fontSize: '9px',
                                              // marginLeft: '2px',
                                            }}
                                          />
                                        )} */}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                                // textAlign: 'center',
                                // marginTop: '10px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                // marginTop: '8px',
                                borderRadius: '4px',
                                // padding: ' 2.5px 0 ',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                                // backgroundColor:
                                //   screenMode === 'dark'
                                //     ? '#2A2E39'
                                //     : '#F0F3FA',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                              {/* <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                              >
                                Thấp nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '140px',
                                }}
                                className="vung1Header"
                              >
                                Trung bình
                              </div> */}
                            </div>
                            {/* <div>
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // padding: '8px 0',
                                  borderRadius: '4px',
                                  backgroundColor:
                                    index % 2 === 0
                                      ? screenMode === 'dark'
                                        ? '#25262D'
                                        : '#F0F3FA'
                                      : screenMode === 'dark'
                                        ? '#2A2E39'
                                        : '#FDFDFD',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    // width: '140px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '200px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.buy_avg)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    width: '120px',
                                    marginRight: '0px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_min)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_max)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'Roboto Flex',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    width: '120px',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell_avg)}
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={STEEL}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.type}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',

                                marginRight: '0px',
                              }}
                            >
                              {item?.type?.length > 100
                                ? `${item?.type?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.type?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',

                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.price}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.price}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          style={{
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
          {curTabTop === 'giaGao' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Loại gạo
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaGao.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          width: '96px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                borderRadius: '4px',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={RICE}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.area}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',

                                marginRight: '0px',
                              }}
                            >
                              {item?.type?.length > 100
                                ? `${item?.type?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.type?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',

                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.price}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              //font size number,
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.price}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          style={{
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
          {curTabTop === 'giaCaTra' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Loại cá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaCaTra.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          width: '96px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                borderRadius: '4px',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={FISH}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.type}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',

                                marginRight: '0px',
                              }}
                            >
                              {item?.type?.length > 100
                                ? `${item?.type?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.type?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',

                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.price}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.price}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          style={{
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
          {curTabTop === 'giaPhan' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Loại phân
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaPhan.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          width: '96px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                borderRadius: '4px',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={STOOL}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.type}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',

                                marginRight: '0px',
                              }}
                            >
                              {item?.type?.length > 100
                                ? `${item?.type?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.type?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',

                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.price}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.price}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          style={{
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
          {curTabTop === 'giaDien' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32px',
                  alignItems: 'center',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '332px',
                    padding: '6px 0 6px 0px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Loại
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '153px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '168px',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Giá
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto Flex',
                    fontWeight: '500',
                    fontSize: '14px',
                    width: '65px',
                    textAlign: 'center',
                    color: screenMode === 'dark' ? '#818498' : '#66676B',
                  }}
                >
                  Lịch sử
                </div>
              </div>
              <div
                style={{
                  // height: '173.5px',
                  height: `${(height * 18.5185) / 100}px`,
                  overflowY: 'scroll',
                }}
              >
                {listGiaDien.map((item: any, index: number) => {
                  const isUp =
                    +item?.buy >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.buy;
                  const isUpSell =
                    +item?.sell >
                    +listGiaVang
                      ?.filter((itemHistory: any) => {
                        return item?.type_code === itemHistory?.type_code;
                      })
                      ?.slice(1, 5)[1]?.sell;

                  return (
                    <Tooltip
                      color={screenMode === 'dark' ? '#25262D' : '#FFFFFF'}
                      key={index}
                      placement="left"
                      overlayStyle={{
                        maxWidth: '700px',
                        boxShadow: 'none', // Remove the shadow
                        border: 'none', // Remove the border
                        backgroundColor: 'transparent', // Optional: remove background color if needed
                      }}
                      style={{ overflow: 'hidden' }}
                      title={
                        <div
                          id="dhtmltooltip"
                          style={{
                            left: '-800px',
                            top: '1659px',
                            overflow: 'hidden',
                            backgroundColor:
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF',
                            // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '500px',
                              overflow: 'hidden',
                              padding: '16px',
                              // border: '1px solid #197fbf',
                              borderRadius: '3px',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Roboto Flex',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#FFFFFF',
                              }}
                            >
                              Lịch sử biến động giá mua/bán{' '}
                              {LIST_MAP_GOLD_NAME[item?.type_code]}
                            </div>
                            {listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)
                              ?.map((itemHistory: any) => {
                                const timeGold = moment
                                  .unix(itemHistory?.update_time)
                                  .format('HH:mm:ss');
                              }) && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'column',
                                    backgroundColor:
                                      screenMode === 'dark'
                                        ? '#25262D'
                                        : '#FDFDFD',

                                    style: {
                                      color: '#fff',
                                    },
                                    borderRadius: 8,
                                    width: 500,
                                    marginTop: 40,
                                    marginLeft: 70,
                                    marginBottom: 107,
                                    height: 308,
                                  },
                                  credits: {
                                    enabled: false, // Loại bỏ chữ "Highcharts.com"
                                  },
                                  title: {
                                    text: null,
                                    style: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                  },
                                  colors: [
                                    '#B28221',
                                    '#43F3FF',
                                    '#597BF8',
                                    '#30DF9D',
                                    '#FF36F5',
                                    '#FFD097',
                                    '#EF5E76',
                                    '#FFF92F',
                                  ],
                                  legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
                                    itemStyle: {
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',
                                    },
                                    minHeight: 70,
                                    maxWidth: 500,
                                    y: 20,

                                    navigation: {
                                      verticalAlign: 'left',
                                    },
                                  },
                                  plotOptions: {
                                    column: {
                                      stacking: 'normal',
                                      dataLabels: {
                                        enabled: false,
                                      },
                                      borderRadius: 0,
                                      borderWidth: 0,
                                    },
                                  },
                                  tooltip: {
                                    formatter: function () {
                                      let tooltipContent = `<b>${this.x}</b><br/>`;

                                      tooltipContent += `${this.series.name}: <b>${this.y}</b>`;

                                      return tooltipContent;
                                    },
                                    useHTML: true,
                                  },
                                  xAxis: {
                                    categories: listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)
                                      ?.map((itemHistory: any) => {
                                        return moment
                                          .unix(itemHistory?.update_time)
                                          .format('HH:mm:ss');
                                      }),
                                    labels: {
                                      style: {
                                        fontSize: 12,
                                        fontFamily: 'Roboto Flex',
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',
                                      },
                                    },
                                    gridLineColor: '#323546',
                                    gridLineDashStyle: 'dot', // Hiệu ứng dấu chấm cho đường grid
                                    tickLength: 40,
                                    lineColor: '#e6d8d8', // Màu của đường kẻ axis

                                    lineWidth: 0,
                                    tickWidth: 0,

                                    gridLineWidth: 0,
                                    crosshair: {
                                      color: 'gray',
                                      width: 1,
                                      zIndex: 5,
                                    },
                                  },
                                  yAxis: [
                                    {
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      axisLabel: {
                                        formatter: function (value: number) {
                                          if (value > 1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value < -1000000000) {
                                            return value / 1000000000 + ' tỷ';
                                          }
                                          if (value === 0) return 0;
                                        },
                                      },
                                      title: {
                                        text: null, // Loại bỏ tiêu đề "Values" trên trục y
                                      },
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      labels: {
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                    {
                                      gridLineColor: '#323546',
                                      gridLineDashStyle: 'dot',
                                      splitLine: {
                                        lineStyle: {
                                          color:
                                            screenMode === 'dark'
                                              ? 'rgba(58, 63, 66, 0.5)'
                                              : 'rgba(240, 243, 250, 0.5)', // làm mờ màu của splitLine
                                          dashStyle: 'dot', // đặt dashStyle thành dấu chấm
                                        },
                                      },
                                      crosshair: {
                                        dashStyle: 'dash',
                                        width: 1,
                                        color: 'gray',
                                        zIndex: 5,
                                      },
                                      opposite: true, // this will put it on the right side
                                      title: {
                                        text: null, // you can set your title here
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                      labels: {
                                        formatter: function () {
                                          return this.value + '%';
                                        },
                                        style: {
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        },
                                      },
                                    },
                                  ],
                                  grid: {
                                    left: 80,
                                    right: 250,
                                    top: 100,
                                    bottom: 100,
                                  },
                                  series: [
                                    {
                                      name: 'Giá mua',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.buy_avg;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                    {
                                      name: 'Giá bán',
                                      data: listGiaVang
                                        ?.filter((itemHistory: any) => {
                                          return (
                                            item?.type_code ===
                                            itemHistory?.type_code
                                          );
                                        })
                                        ?.slice(1, 5)
                                        ?.map((itemHistory: any) => {
                                          return itemHistory.sell;
                                        }),
                                      type: 'spline',
                                      marker: {
                                        enabled: false, // This will remove the dots on the line
                                      },
                                    },
                                  ],
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '8px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '96px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                  paddingLeft: '12px',
                                }}
                              >
                                {moment
                                  .unix(
                                    listGiaVang
                                      ?.filter((itemHistory: any) => {
                                        return (
                                          item?.type_code ===
                                          itemHistory?.type_code
                                        );
                                      })
                                      ?.slice(1, 5)[0]?.update_time
                                  )
                                  .format('DD/MM/YYYY')}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá mua
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderRight:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#818498'
                                  //     : '#66676B',
                                  color:
                                    screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',
                                  width: '83px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                }}
                                className="vung1Header"
                              >
                                Giá bán
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  width: '93px',
                                  height: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',

                                  borderBottom:
                                    screenMode === 'dark'
                                      ? '1px solid #30323B'
                                      : '1px solid #D5D7DC',
                                }}
                                className="vung1Header"
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A',
                                  }}
                                >
                                  Tăng
                                </span>
                                /
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                >
                                  Giảm
                                </span>
                              </div>
                            </div>
                            <div>
                              {listGiaVang
                                ?.filter((itemHistory: any) => {
                                  return (
                                    item?.type_code === itemHistory?.type_code
                                  );
                                })
                                ?.slice(1, 5)
                                ?.map((itemHistory: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        borderBottom:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                        borderRight:
                                          screenMode === 'dark'
                                            ? '1px solid #30323B'
                                            : '1px solid #D5D7DC',
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '700',

                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          width: '96px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: '#DDC230',
                                          }}
                                        >
                                          {moment
                                            .unix(itemHistory?.update_time)
                                            .format('HH:mm:ss')}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.buy)}
                                        {itemHistory?.buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.alter_buy > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatNumber(itemHistory?.alter_buy)}
                                        {itemHistory?.alter_buy > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRight:
                                            screenMode === 'dark'
                                              ? '1px solid #30323B'
                                              : '1px solid #D5D7DC',
                                          color:
                                            itemHistory?.sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '83px',
                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(itemHistory?.sell)}
                                        {itemHistory?.sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: 'Roboto Flex',
                                          fontWeight: '400',
                                          fontSize: '14px',

                                          color:
                                            itemHistory?.alter_sell > 0
                                              ? '#5CD680'
                                              : '#D15449',
                                          width: '93px',
                                          height: '40px',
                                          alignItems: 'center',
                                          display: 'flex',

                                          paddingLeft: '12px',
                                        }}
                                      >
                                        {formatGoldPrice(
                                          itemHistory?.alter_sell
                                        )}
                                        {itemHistory?.alter_sell > 0 ? (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_up_green}
                                          />
                                        ) : (
                                          <img
                                            style={{ padding: '6px' }}
                                            src={arrow_down_red}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div
                              style={{
                                fontSize: '14px',
                                fontFamily: 'Roboto Flex',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',
                                fontWeight: '500',
                                borderTop: '1px solid #30323B',
                                paddingTop: '16px',
                                marginTop: '16px',
                              }}
                            >
                              THỐNG KÊ TRONG NGÀY{' '}
                              {moment
                                .unix(
                                  listGiaVang
                                    ?.filter((itemHistory: any) => {
                                      return (
                                        item?.type_code ===
                                        itemHistory?.type_code
                                      );
                                    })
                                    ?.slice(1, 5)[0]?.update_time
                                )
                                .format('DD/MM/YYYY')}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '43px',
                                justifyContent: 'space-around',
                                borderRadius: '4px',
                                border: '1px solid #30323B',
                                height: '52px',
                                alignItems: 'center',
                                marginTop: '4px',
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                }}
                              >
                                Thấp nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_min)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '120px',
                                }}
                                className="vung1Header"
                              >
                                Cao nhất:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_max)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  color:
                                    screenMode === 'dark'
                                      ? '#818498'
                                      : '#66676B',
                                  // width: '200px',
                                }}
                              >
                                Trung bình:
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#fff'
                                        : '#2E3138',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontFamily: 'Roboto Flex',
                                  }}
                                >
                                  {' '}
                                  {formatGoldPrice(item?.buy_avg)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '40px',

                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            width: '332px',
                            padding: '10px 0px 10px 0px',
                          }}
                        >
                          <img
                            src={ELECTRIC}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item?.type}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '400',
                                fontSize: '14px',
                                color:
                                  screenMode === 'dark' ? '#99BAFF' : '#2E3138',

                                marginRight: '0px',
                              }}
                            >
                              {item?.type?.length > 100
                                ? `${item?.type?.slice(0, 100)?.toLocaleUpperCase()}...`
                                : item?.type?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            fontFamily: 'Roboto Flex',
                            fontWeight: '400',
                            fontSize: '12px', //font size number
                            color: isUp
                              ? screenMode === 'dark'
                                ? '#5CD680'
                                : '#45783A'
                              : screenMode === 'dark'
                                ? '#D15449'
                                : '#A33929',
                            width: '153px',
                            gap: '8px',

                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          {item?.price}
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d={
                                isUp
                                  ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                  : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                              }
                              fill={
                                isUp
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929'
                              }
                            />
                          </svg>
                        </div>
                        {item?.type_code !== 'XAUUSD' && (
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '168px',
                              gap: '8px',
                              color: isUpSell
                                ? screenMode === 'dark'
                                  ? '#5CD680'
                                  : '#45783A'
                                : screenMode === 'dark'
                                  ? '#D15449'
                                  : '#A33929',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            {item?.price}

                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={
                                  isUpSell
                                    ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                    : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                }
                                fill={
                                  isUpSell
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          style={{
                            width: '65px',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={historyIcon} />
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          // backgroundColor: 'brown',
          flex: 1,
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            // backgroundColor: 'white',
            flex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
              // padding: '6px',
              borderRadius: '6px',
              boxSizing: 'border-box',
              height: '100%',
              // minWidth: '400px',
              // height: '282.5px',
              // marginTop: '8px',
            }}
          >
            <div
              style={
                {
                  // padding: '8px',
                }
              }
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  height: '48px',

                  // backgroundColor: 'pink',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    margin: '0 24px',
                    borderBottom: '1px solid #30323B',
                  }}
                >
                  <div
                    className={
                      curTabBottom === 'chiSoTheGioi'
                        ? 'bottom-tab-active'
                        : 'bottom-tab'
                    }
                    onClick={() => [setCurTabBottom('chiSoTheGioi')]}
                    style={{
                      color:
                        curTabBottom === 'chiSoTheGioi'
                          ? screenMode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : '#004AEA'
                          : screenMode === 'dark'
                            ? '#fff'
                            : '#2E3138',
                      padding: '16px 16px',
                      borderRadius: '3px',
                      fontSize: '15px',
                      fontFamily: 'Roboto Flex',
                      flex: 1,
                      height: '48px',
                      textAlign: 'center',
                      fontWeight:
                        curTabBottom === 'chiSoTheGioi' ? '600' : '400',
                      // marginRight: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Thế giới
                  </div>
                  <div
                    className={
                      curTabBottom === 'chiSoHangHoa'
                        ? 'bottom-tab-active'
                        : 'bottom-tab'
                    }
                    onClick={() => [setCurTabBottom('chiSoHangHoa')]}
                    style={{
                      color:
                        curTabBottom === 'chiSoHangHoa'
                          ? screenMode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : '#004AEA'
                          : screenMode === 'dark'
                            ? '#fff'
                            : '#2E3138',
                      padding: '16px 16px',
                      borderRadius: '3px',
                      fontSize: '15px',
                      fontFamily: 'Roboto Flex',
                      flex: 1,
                      height: '48px',
                      textAlign: 'center',
                      fontWeight:
                        curTabBottom === 'chiSoHangHoa' ? '600' : '400',
                      // marginRight: '8px',
                    }}
                  >
                    Hàng hoá
                  </div>
                  <div
                    className={
                      curTabBottom === 'tyGia'
                        ? 'bottom-tab-active'
                        : 'bottom-tab'
                    }
                    onClick={() => [setCurTabBottom('tyGia')]}
                    style={{
                      color:
                        curTabBottom === 'tyGia'
                          ? screenMode === 'dark'
                            ? 'rgba(153, 186, 255, 1)'
                            : '#004AEA'
                          : screenMode === 'dark'
                            ? '#fff'
                            : '#2E3138',
                      padding: '16px 16px',
                      borderRadius: '3px',
                      fontSize: '15px',
                      fontFamily: 'Roboto Flex',
                      flex: 1,
                      height: '48px',
                      textAlign: 'center',
                      fontWeight: curTabBottom === 'tyGia' ? '600' : '400',
                      // marginRight: '8px',
                    }}
                  >
                    Tỷ giá
                  </div>
                </div>
              </div>
              {curTabBottom === 'chiSoTheGioi' && (
                <div style={{ paddingLeft: '0 24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '32px',
                      alignItems: 'center',
                      // paddingRight: '24px',
                      paddingLeft: '24px',

                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #D5D7DC',
                      // backgroundColor:
                      //   screenMode === 'dark' ? '#28292f' : '#eee',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '140px',
                        padding: '6px 0px 6px 0px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Tên
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '80px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Giá trị
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '80px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Thay đổi
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                        width: '63px',
                      }}
                    >
                      %
                    </div>
                  </div>
                  <div style={{ height: '173.5px', overflowY: 'scroll' }}>
                    {listNuocNgoai.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '40px',
                            paddingLeft: '24px',

                            borderBottom:
                              screenMode === 'dark'
                                ? '1px solid #30323B'
                                : '1px solid #D5D7DC',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '8px',
                              width: '140px',
                              padding: '12px 0px 12px 0px',
                            }}
                          >
                            <img
                              src={item?.flag}
                              style={{
                                width: '22px',
                                height: '12px',
                                borderRadius: '2px',
                                marginRight: '4px',
                              }}
                            />
                            <Tooltip
                              color={
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                              }
                              title={item.name}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '700',
                                  fontSize: '14px',
                                  color: '#3594EF',
                                }}
                              >
                                {item.name?.length > 7
                                  ? `${item.name?.slice(0, 7)?.toLocaleUpperCase()}...`
                                  : item.name?.toUpperCase()}
                              </div>
                            </Tooltip>
                          </div>

                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '80px',
                              color:
                                screenMode === 'dark' ? '#FFFFFF' : '#2E3138',
                            }}
                          >
                            {item?.value}{' '}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '80px',
                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.change}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '63px',
                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.percent}
                          </div>
                          {/* <svg
                            style={{ marginRight: '4px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="16"
                            height="16"
                            viewBox="0 0 48 48"
                            fill={
                              +item?.change > 0 ? '#5CD680' : '#D15449'
                            }
                          >
                            <path d="M24,4C12.972,4,4,12.972,4,24s8.972,20,20,20s20-8.972,20-20S35.028,4,24,4z M28.561,30.561	C28.268,30.854,27.884,31,27.5,31s-0.768-0.146-1.061-0.439l-5-5C21.158,25.279,21,24.898,21,24.5v-11c0-0.829,0.671-1.5,1.5-1.5	s1.5,0.671,1.5,1.5v10.379l4.561,4.561C29.146,29.025,29.146,29.975,28.561,30.561z"></path>
                          </svg> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {curTabBottom === 'tyGia' && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '32px',
                      alignItems: 'center',
                      paddingLeft: '24px',

                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #D5D7DC',
                      // backgroundColor:
                      //   screenMode === 'dark' ? '#28292f' : '#eee',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '140px',
                        padding: '6px 0px 6px 0px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Tên
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '80px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Mua
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '80px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Bán
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                        width: '63px',
                      }}
                    >
                      CK
                    </div>
                  </div>
                  <div style={{ height: '173.5px', overflowY: 'scroll' }}>
                    {listTyGiaNgoaiTe.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '40px',
                            paddingLeft: '24px',

                            borderBottom:
                              screenMode === 'dark'
                                ? '1px solid #30323B'
                                : '1px solid #D5D7DC',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '8px',
                              width: '140px',
                              padding: '12px 0px 12px 0px',
                            }}
                          >
                            <img
                              src={LIST_NGOAI_TE[item.currencyCode]}
                              style={{
                                width: '22px',
                                height: '12px',
                                borderRadius: '2px',
                                marginRight: '4px',
                              }}
                            />
                            <Tooltip
                              color={
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                              }
                              title={item.currencyName}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '700',
                                  fontSize: '14px',
                                  color: '#3594EF',
                                }}
                              >
                                {item.currencyName?.length > 7
                                  ? `${item.currencyName?.slice(0, 7)?.toLocaleUpperCase()}...`
                                  : item.currencyName?.toUpperCase()}
                              </div>
                            </Tooltip>
                          </div>

                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '80px',
                              color:
                                screenMode === 'dark' ? '#FFFFFF' : '#2E3138',
                            }}
                          >
                            {item?.buy}{' '}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '80px',
                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.sell}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '63px',
                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.transfer}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {curTabBottom === 'chiSoHangHoa' && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '32px',
                      alignItems: 'center',
                      paddingLeft: '24px',

                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #D5D7DC',
                      // backgroundColor:
                      //   screenMode === 'dark' ? '#28292f' : '#eee',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '140px',
                        padding: '6px 0px 6px 0px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Tên
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '80px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Giá trị
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        width: '80px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                      }}
                    >
                      Thay đổi
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto Flex',
                        fontWeight: '500',
                        fontSize: '14px',
                        color: screenMode === 'dark' ? '#818498' : '#66676B',
                        width: '63px',
                      }}
                    >
                      %
                    </div>
                  </div>
                  <div style={{ height: '173.5px', overflowY: 'scroll' }}>
                    {listHangHoa.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: '24px',

                            height: '40px',
                            borderBottom:
                              screenMode === 'dark'
                                ? '1px solid #30323B'
                                : '1px solid #D5D7DC',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '8px',
                              width: '140px',
                              padding: '12px 0px 12px 0px',
                            }}
                          >
                            <img
                              src={item?.flag}
                              style={{
                                width: '22px',
                                height: '12px',
                                borderRadius: '2px',
                                marginRight: '4px',
                              }}
                            />
                            <Tooltip
                              color={
                                screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                              }
                              title={item.name}
                            >
                              <div
                                style={{
                                  fontFamily: 'Roboto Flex',
                                  fontWeight: '700',
                                  fontSize: '14px',
                                  color: '#3594EF',
                                }}
                              >
                                {item.name?.length > 7
                                  ? `${item.name?.slice(0, 7)?.toLocaleUpperCase()}...`
                                  : item.name?.toUpperCase()}
                              </div>
                            </Tooltip>
                          </div>

                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '80px',
                              color:
                                screenMode === 'dark' ? '#FFFFFF' : '#2E3138',
                            }}
                          >
                            {item?.value}{' '}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '80px',
                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.change}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '12px', //font size number
                              width: '63px',
                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.percent}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
              width: '100%',
              borderRadius: '6px',
              padding: '4px 0px 24px 24px',
            }}
          >
            <div className="hot-news">
              <div className="content">
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: screenMode === 'dark' ? '#fff' : '#2E3138',
                    height: '44px',
                    display: 'flex',
                    // alignItems: 'center',
                    paddingTop: '10px',
                    fontFamily: 'Roboto Flex',
                    borderBottom: '1px solid #30323B',
                    marginBottom: '8px',
                  }}
                  className="ds-section-headline"
                >
                  Tin tức đáng chú ý
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '200px',
                    overflowY: 'scroll',
                    paddingRight: '24px',
                  }}
                  className=" e14rcxam0"
                >
                  {news.slice(0, 9).map((item, index) => (
                    <Link
                      key={index}
                      style={{
                        color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                        fontSize: '13px',
                        fontWeight: '400',
                        lineHeight: '20px',
                        marginBottom: '12px',
                        fontFamily: 'Roboto Flex',
                      }}
                      to={`/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`}
                    >
                      <img style={{ marginRight: '8px' }} src={hot_news} />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangHoa;
