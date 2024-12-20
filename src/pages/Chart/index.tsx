/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Socket, io } from 'socket.io-client';
import online from '@assets/icons/ellipse.svg';
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Switch,
  Table,
  Typography,
  notification,
  Modal,
  Button,
} from 'antd';
import searchLightMode from '@/assets/icons/search-lightmode.svg';
import Success from '@/components/Notification/Success';
import reload from '@assets/icons/Reload.svg';
import iconSearch from '@assets/icons/search.svg';
import iconSearchDark from '@assets/icons/search-lightmode.svg';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import axios from 'axios';
import { config } from '@/config/env';
import { flatMap, groupBy, last, set, sum, sumBy } from 'lodash';
import { FixedSizeList as List } from 'react-window';
import ReactECharts from 'echarts-for-react';
import { TVChartContainer } from '@components/Chart/Chart';
import chart from '@assets/icons/chart.svg';
import chartLight from '@assets/icons/chart_light.svg';
import clearIconChart from '@assets/icons/clear_icon_chart.svg';
import addIconChart from '@assets/icons/add_icon_chart.svg';
import fullScreen from '@assets/icons/full_screen.svg';
import warning from '@assets/icons/warning.svg';
import iconUp from '@assets/icons/icon_up.svg';
import iconDown from '@assets/icons/icon_down.svg';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import plus from '@assets/icons/plus.svg';
import minus from '@assets/icons/minus.svg';
import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { StyledChart } from './styled';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { convertDate, convertDateMin } from '@/components/ConvertDate';
import { CheckboxProps } from 'antd/lib';
import {
  formatNumber,
  formatNumberToBillion,
  formatNumberWithCommas,
} from '@/components/ConvertNumber';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { getListConversations } from '@/services/servicesApi/serviceApi';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useLocation } from 'react-router-dom';
import StockTable from '@/components/StockTable';
const Chart: FC<any> = () => {
  const screenMode = useSelector(screenModeSelector);
  const [api, contextHolder] = notification.useNotification();
  const code = useSelector((state) => state.search.code);
  const [isTablePriceTab, setIsTablePriceTab] = useState(false);

  const onChangeTablePriceTab = () => {
    setIsTablePriceTab(!isTablePriceTab);
  };

  const [listTabs, setListTabs] = useState([
    {
      symbol: 'SSI',
      resolution: '1D',
      isPicked: true,
      isHover: false,
    },
    {
      symbol: 'ABC',
      resolution: '2D',
      isPicked: false,
      isHover: false,
    },
    {
      symbol: 'VNM',
      resolution: '1D',
      isPicked: false,
      isHover: false,
    },
  ]);

  const [curTab, setCurTab] = useState(listTabs[0]);

  const [trendingLine, setTrendingLine] = useState([]);
  const [commonIndicator, setCommonIndicator] = useState([]);

  const [checkBox, setCheckBox] = useState(false);
  const [listMatch, setListMatch] = useState<any>([]);
  const [activeTab, setActiveTab] = useState('thongTin');
  const [tableTarget, setTableTarget] = useState<any>(false);
  let [symbolInfo, setSymbolInfo] = useState({});
  let [lastOrder, setLastOrder] = useState({});
  const { user } = useAppSelector((state: RootState) => state.app);

  let [symbolTongHopInfo, setSymbolTongHopInfo] = useState({});
  let [listMatchOrder, setListMatchOrder] = useState([]);
  let [totalBuyVol, setTotalBuyVol] = useState(0);
  const [accountInfo, setAccountInfo] = useState<any>([]);
  const [balance, setBalance] = useState<any>();
  const [category, setListCategory] = useState<any>([]);
  let [totalSellVol, setTotalSellVol] = useState(0);
  let [totalVol, setTotalVol] = useState(0);
  const [previousValues, setPreviousValues] = useState({
    BidVol1: null,
    AskVol1: null,
    BidVol2: null,
    AskVol2: null,
    BidVol3: null,
    AskVol3: null,
    LastPrice: null,
    Change: null,
    RatioChange: null,
    Symbol: null,
    TotalVol: null,
    TotalBuyVol: null,
    TotalSellVol: null,
    // ... add more as needed
  });
  const [date, setDate] = useState<any>(new Date());
  let [isFloor, setIsFloor] = useState(false);
  let [isCeiling, setIsCeiling] = useState(false);
  const [bgColors, setBgColors] = useState({
    BidVol1: 'transparent',
    AskVol1: 'transparent',
    BidVol2: 'transparent',
    AskVol2: 'transparent',
    BidVol3: 'transparent',
    AskVol3: 'transparent',
    BidVol4: 'transparent',
    AskVol4: 'transparent',
    BidVol5: 'transparent',
    AskVol5: 'transparent',
    BidVol6: 'transparent',
    AskVol6: 'transparent',
    LastPrice: 'transparent',
    Change: 'transparent',
    RatioChange: 'transparent',
    TotalVol: 'transparent',
    TotalBuyVol: 'transparent',
    TotalSellVol: 'transparent',
    // ... add more as needed
  });
  let [curSection, setCurSection] = useState('chiTiet');

  const location = useLocation();
  const activeTabProps = location?.state?.activeTab || {}; // Defaulting to an empty object if state is undefined

  useEffect(() => {
    if (activeTabProps) {
      // setActiveTab('congCu');
    }
  }, [activeTabProps]);

  useEffect(() => {
    let newBgColors = { ...bgColors };
    let hasChanged = false;

    for (let key in previousValues) {
      if (!lastOrder) continue;
      if (!previousValues) continue;
      if (
        lastOrder[key] !== previousValues[key] &&
        lastOrder?.symbol === previousValues?.Symbol
      ) {
        newBgColors[key] = '#d3a43f';
        hasChanged = true;
      }
      if (key === 'TotalBuyVol' && lastOrder?.type === 'B') {
        newBgColors[key] = '#d3a43f';
      }
      if (key === 'TotalSellVol' && lastOrder?.type === 'S') {
        newBgColors[key] = '#d3a43f';
      }
    }

    if (hasChanged) {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          BidVol1: lastOrder?.BidVol1,
          AskVol1: lastOrder?.AskVol1,
          BidVol2: lastOrder?.BidVol2,
          AskVol2: lastOrder?.AskVol2,
          BidVol3: lastOrder?.BidVol3,
          AskVol3: lastOrder?.AskVol3,
          BidVol4: lastOrder?.BidVol4,
          AskVol4: lastOrder?.AskVol4,
          BidVol5: lastOrder?.BidVol5,
          AskVol5: lastOrder?.AskVol5,
          BidVol6: lastOrder?.BidVol6,
          AskVol6: lastOrder?.AskVol6,
          LastPrice: lastOrder?.LastPrice,
          Change: lastOrder?.Change,
          RatioChange: lastOrder?.RatioChange,
          Symbol: lastOrder?.symbol,
          TotalVol: lastOrder?.TotalVol,
          TotalBuyVol: lastOrder?.TotalBuyVol,
          TotalSellVol: lastOrder?.TotalSellVol,

          // ... add more as needed
        };
      });
      setBgColors(newBgColors);

      const timer = setTimeout(() => {
        setBgColors({
          BidVol1: 'transparent',
          AskVol1: 'transparent',
          BidVol2: 'transparent',
          AskVol2: 'transparent',
          BidVol3: 'transparent',
          AskVol3: 'transparent',
          LastPrice: 'transparent',
          Change: 'transparent',
          RatioChange: 'transparent',
          // ... add more as needed
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          Symbol: lastOrder?.symbol,
        };
      });
    }
  }, [lastOrder]);
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   axios
  //     .get(`${config.app.VITE_APP_API_URL}/getAccountInfo`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAccountInfo(res.data);
  //       setBalance(res.data.balance);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching account info:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   getPortfolio();
  // }, []);

  const getPortfolio = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/getPortfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListCategory(res.data.holdings);
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };
  useEffect(() => {
    if (curTab?.symbol !== 'VNINDEX') {
      axios
        .get(
          `${config.app.VITE_APP_API_URL}/symbol_info?query=${curTab.symbol}`
        )
        .then((res) => {
          setSymbolInfo(res?.data[0]);
        });
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL}/mua_ban_chu_dong?symbol=${curTab.symbol}`
      //   )
      //   .then((res) => {
      //     let removeZeroPrice = res?.data?.data?.filter((item) => {
      //       return item?.LastPrice !== 0;
      //     });
      //     // setListMatchOrder(removeZeroPrice);
      //     // setLastOrder(res?.data?.data[0]);
      //   });

      axios
        .get(
          `${config.app.VITE_APP_API_URL}/mua_ban_chu_dong_short?symbol=${curTab.symbol}`
        )
        .then((res) => {
          // let removeZeroPrice = res?.data?.data?.filter((item) => {
          //   return item?.LastPrice !== 0;
          // });
          // let totalVol = sumBy(res?.data?.data, 'LastVol');
          let totalVol = res?.data?.data[0]?.TotalVol;
          let totalBuyVol = res?.data?.data[0]?.TotalBuyVol;
          let totalSellVol = res?.data?.data[0]?.TotalSellVol;

          // let totalBuyVol = sumBy(
          //   res?.data?.data?.filter((item: any, index: number) => {
          //     return item?.type === 'B';
          //   }),
          //   'LastVol'
          // );
          // let totalSellVol =
          setListMatchOrder(res?.data?.data);
          setTotalBuyVol(totalBuyVol);
          setTotalSellVol(totalSellVol);
          setTotalVol(totalVol);
          setLastOrder(res?.data?.data[0]);
          setPreviousValues((prevPreviousValues) => {
            return {
              ...prevPreviousValues,
              TotalBuyVol: totalBuyVol,
              TotalSellVol: totalSellVol,
            };
          });
        });

      axios
        .get(
          `${config.app.VITE_APP_API_URL}/DailyStockPrice?symbol=${
            curTab.symbol
          }&fromDate=${convertDateMin(date)}&toDate=${convertDate(date)}`
        )
        .then((res) => {
          let info = res?.data?.data?.pop();

          let totalBuyVol = info?.stockBUVol;
          let totalSellVol = info?.stockSDVol;
          let lastOrderNew = {
            symbol: info?.Symbol,
            Ceiling: info?.CeilingPrice,
            Floor: info?.FloorPrice,
            RefPrice: info?.RefPrice,
            AvgPrice: info?.AveragePrice,
            PriorVal: '',
            LastPrice: info?.ClosePrice,
            LastVol: info?.TotalTradedVol,
            TotalVal: info?.TotalMatchVal,
            TotalVol: info?.TotalMatchVol,
            BidPrice1: '',
            BidPrice2: '',
            BidPrice3: '',
            BidVol1: '',
            BidVol2: '',
            BidVol3: '',
            AskPrice1: '',
            AskPrice2: '',
            AskPrice3: '',
            AskVol1: '',
            AskVol2: '',
            AskVol3: '',
            MarketId: '',
            Exchange: '',
            Change: info?.PriceChange,
            RatioChange: info?.PerPriceChange,
            type: 'B',
            highest: info?.HighestPrice,
            lowest: info?.LowestPrice,
            openPrice: info?.OpenPrice,
            ThiGiaVon: '',
            GiaTri: info?.TotalTradedValue,
            KhoiLuong: info?.TotalTradedVol,
            SoLuongCPLH: '',
            KhoiLuongMuaNuocNgoai: info?.ForeignBuyVolTotal,
            KhoiLuongBanNuocNgoai: info?.ForeignSellVolTotal,

            GiaTrungBinh: info?.AveragePrice,
          };
          // setLastOrder(lastOrderNew);
          setSymbolTongHopInfo(lastOrderNew);
          // setTotalBuyVol(totalBuyVol);
          // setTotalSellVol(totalSellVol);
          setPreviousValues((prevPreviousValues) => {
            return {
              ...prevPreviousValues,
              TotalBuyVol: totalBuyVol,
              TotalSellVol: totalSellVol,
            };
          });
        })
        .catch((err) => {});
    } else {
      setSymbolInfo({
        symbol: 'VNINDEX',
        full_name: 'VNINDEX',
        description: 'VNINDEX',
        exchange: '',
        type: 'index',
        exchange_logo: 'https://s3-symbol-logo.tradingview.com/country/US.svg',
      });
      let lastOrderNew = {
        symbol: 'VNINDEX',
        Ceiling: '',
        Floor: '',
        RefPrice: '',
        AvgPrice: '',
        PriorVal: '',
        LastPrice: '',
        LastVol: '',
        TotalVal: '',
        TotalVol: '',
        BidPrice1: '',
        BidPrice2: '',
        BidPrice3: '',
        BidVol1: '',
        BidVol2: '',
        BidVol3: '',
        AskPrice1: '',
        AskPrice2: '',
        AskPrice3: '',
        AskVol1: '',
        AskVol2: '',
        AskVol3: '',
        MarketId: '',
        Exchange: '',
        Change: '',
        RatioChange: '',
        type: '',
        highest: '',
        lowest: '',
        openPrice: '',
        ThiGiaVon: '',
        GiaTri: '',
        KhoiLuong: '',
        SoLuongCPLH: '',
        KhoiLuongMuaNuocNgoai: '',
        KhoiLuongBanNuocNgoai: '',
        GiaTriMuaNuocNgoai: '',
        GiaTriBanNuocNgoai: '',
        GiaTrungBinh: '',
      };
      setListMatchOrder([]);
      setLastOrder(lastOrderNew);
      setSymbolTongHopInfo(lastOrderNew);
      setTotalBuyVol('');
      setTotalSellVol('');
    }
  }, [curTab?.symbol]);
  if (lastOrder?.Floor === lastOrder?.LastPrice) {
    isFloor = true;
  } else {
    isFloor = false;
  }

  if (lastOrder?.Ceiling === lastOrder?.LastPrice) {
    isCeiling = true;
  } else {
    isCeiling = false;
  }

  const openNotification = (chartInfo: any) => {
    api.info({
      message: `Thông báo chia sẻ biểu đồ`,
      description: `${chartInfo[1]?.name} đã chia sẻ 1 biểu đồ cho bạn !!!`,
      placement: 'topRight',
      duration: 5,
    });
  };

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:8080'); // replace widiv your server address
    const ws = new WebSocket(config.socket.VITE_REACT_APP_SOCKET_IO);

    ws.onopen = () => {
      // Send a message to the server indicating interest in a symbol
      ws.send(
        JSON.stringify({ type: 'SUBSCRIBE', symbol: symbolInfo?.symbol })
      );
    };
    ws.addEventListener('message', (event) => {
      const parsedData = JSON.parse(event.data);
      if (!parsedData?.isDuplicate) {
        setListMatchOrder((prevListMatchOrder) => {
          return [parsedData, ...prevListMatchOrder];
        });
        setTotalVol(parsedData?.TotalVol);
      }

      setLastOrder(parsedData);
      if (parsedData?.type === 'B') {
        setTotalBuyVol((prevTotalBuyVol) => {
          return prevTotalBuyVol + parsedData?.LastVol;
        });
      } else if (parsedData?.type === 'S') {
        setTotalSellVol((prevTotalSellVol) => {
          return prevTotalSellVol + parsedData?.LastVol;
        });
      }
    });

    return () => {
      ws.close();
    };
  }, [symbolInfo]);
  let groupByLastPrice = groupBy(listMatchOrder, 'LastPrice');
  let groupByLastPriceMap = Object.values(groupByLastPrice).map((item) => {
    return sumBy(item, 'LastVol');
  });
  let groupByLastPriceDetailMap = Object.values(groupByLastPrice).map(
    (item, index) => {
      let price = Object.keys(groupByLastPrice)[index];
      return {
        total: sumBy(item, 'LastVol'),
        totalBuy: sumBy(
          item.filter((item: any, index: number) => {
            return item?.type === 'B';
          }),
          'LastVol'
        ),
        totalSell: sumBy(
          item.filter((item: any, index: number) => {
            return item?.type === 'S';
          }),
          'LastVol'
        ),
        totalATC:
          price ==
          item.find((item: any, index: number) => {
            return item?.Time.includes('14:45');
          })?.LastPrice
            ? item.find((item: any, index: number) => {
                return item?.Time.includes('14:45');
              })?.LastVol
            : 0,
        totalATO:
          price == listMatchOrder[listMatchOrder.length - 1]?.LastPrice
            ? listMatchOrder[listMatchOrder.length - 1]?.LastVol
            : 0,
        price,
      };
    }
  );

  groupByLastPriceMap = groupByLastPriceMap;

  let yAxisData = groupByLastPrice
    ? Object.keys(groupByLastPrice).map((item) => formatNumber(item))
    : [];
  while (yAxisData.length < 30) {
    yAxisData.push('');
  }

  let yAxisDataMap = yAxisData.reverse();
  // let yAxisDataMap = groupByLastPrice
  //   ? [...yAxisData, "", "", "", "", "", ""].reverse()
  //   : [];
  let seriesDataBuy = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalBuy;
    // return {
    //   // value: item / 1000,

    //   value: groupByLastPriceDetailMap[index]?.totalBuy,
    //   itemStyle: {
    //     borderRadius: [4, 4, 4, 4],
    //     // color:
    //     //   +price === +lastOrder.RefPrice
    //     //     ? '#CCAA00'
    //     //     : price > lastOrder.RefPrice
    //     //       ? '#42A732'
    //     //       : '#E43637',
    //   },
    // };
  });
  while (seriesDataBuy.length < 30) {
    seriesDataBuy.push({
      value: 0,
    });
  }

  let seriesDataSell = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalSell;
  });
  while (seriesDataSell.length < 30) {
    seriesDataSell.push({
      value: 0,
    });
  }
  let seriesDataATC = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalATC;
  });
  while (seriesDataATC.length < 30) {
    seriesDataATC.push({
      value: 0,
    });
  }
  let seriesDataATO = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalATO;
  });
  while (seriesDataATO.length < 30) {
    seriesDataATO.push({
      value: 0,
    });
  }

  // let seriesDataMap = seriesData.reverse();
  let seriesDataMapBuy = seriesDataBuy.reverse();
  let seriesDataMapSell = seriesDataSell.reverse();
  let seriesDataMapATC = seriesDataATC.reverse();
  let seriesDataMapATO = seriesDataATO.reverse();

  let series = [
    {
      data: seriesDataMapBuy,
      type: 'bar',
      stack: 'a',
      emphasis: { label: { color: 'red' }, scale: true },
      itemStyle: {
        color: 'rgba(75, 155, 99, 1)',
        type: 'buy',
        borderRight: '1px solid #0025fa',
      },
      barMinWidth: '20px',
      barCategoryGap: '20px',
    },
    {
      data: seriesDataMapSell,
      type: 'bar',
      stack: 'a',
      emphasis: { label: { color: 'red' }, scale: true },
      itemStyle: {
        color: '#d15449',
        type: 'sell',
        borderRight: '1px solid #0025fa',
      },
      barMinWidth: '20px',
      barCategoryGap: '20px',
    },
    {
      data: seriesDataMapATO,
      type: 'bar',
      stack: 'a',
      emphasis: { label: { color: 'red' }, scale: true },
      itemStyle: {
        color: '#CCAA00',
        type: 'ATO',
        borderRight: '1px solid #0025fa',
      },
      barMinWidth: '20px',
      barCategoryGap: '20px',
    },
    {
      data: seriesDataMapATC,
      type: 'bar',
      stack: 'a',
      emphasis: { label: { color: '#149397' }, scale: false },
      itemStyle: {
        color: '#CCAA01',
        type: 'ATC',
        borderRight: '1px solid #0025fa',
      },
      barMinWidth: '20px',
      barCategoryGap: '20px',
    },
  ];

  const stackInfo = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack;
      if (!stackName) {
        continue;
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: [],
        };
      }
      const info = stackInfo[stackName];
      const data = series[j].data[i];
      if (data && data !== '-') {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i]?.stack];

    for (let j = 0; j < series[i].data.length; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i;
      const topBorder = isEnd ? 2 : 0;
      const bottomBorder = 0;
      data[j] = {
        value: data[j],
        itemStyle: {
          shadowColor: 'rgba(255, 0, 0, 0.3)',
          borderRadius: [bottomBorder, topBorder, topBorder, bottomBorder],
        },
      };
    }
  }

  const options = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },

      formatter: function (params: any) {
        let type = '';
        switch (params?.color) {
          case 'rgba(75, 155, 99, 1)':
            type = 'Mua chủ động';
            break;
          case '#d15449':
            type = 'Bán chủ động';
            break;
          case '#CCAA00':
            type = 'ATO';
            break;
          default:
            type = 'ATC';
        }
        return `<div style="position: absolute;  border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 0px; top: 0px; pointer-events: none;"><span style="font-weight: bold">${type}</span>: ${formatNumber(params?.data?.value)} </div>`;
      },
      backgroundColor: 'transparent',
      borderWidth: '0',
    },
    grid: {
      containLabel: true,
      left: '1%',
      right: '7%',
      top: '2%',
      bottom: 0,
    },
    xAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: function (value, index) {
          // Format number with 'k' for thousands, 'M' for millions, etc.
          let formattedValue = formatNumber(value);

          if (value >= 1000) {
            // Convert to 'k' for thousands
            formattedValue = (value / 1000).toFixed(0) + 'K';
          }

          // Only display labels with an even index
          return index % 2 === 0 ? formattedValue : '';
        },
        align: 'center',
        fontSize: '10px',
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : 'black',
      },
      position: 'top',
      axisLine: {
        show: true,
        lineStyle: {
          color:
            screenMode === 'dark'
              ? 'rgba(48, 50, 59, 1)'
              : 'rgba(208, 210, 216, 1)',
        },
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color:
            screenMode === 'dark'
              ? 'rgba(48, 50, 59, 1)'
              : 'rgba(208, 210, 216, 1)',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: yAxisDataMap,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color:
            screenMode === 'dark'
              ? 'rgba(48, 50, 59, 1)'
              : 'rgba(208, 210, 216, 1)',
        },
      },
      axisLabel: {
        fontSize: '10px',

        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : 'black',
      },
    },
    series: series,
    // barCategoryGap: "20%", // Distance between bars in the same category
  };

  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
    },
  };
  const xAxisData = ['24/07', '26/07', '28/07', '01/08', '03/08'];
  const data4 = [-200, 100, 150, -50, 10];
  const dataWithColors = data4.map((value) => {
    return {
      value: value,
      itemStyle: {
        color: value > 0 ? 'rgba(66, 167, 50, 1)' : 'rgba(228, 54, 55, 1)',
        borderRadius: value > 0 ? [2, 2, 0, 0] : [0, 0, 2, 2],
      },
    };
  });

  const optionInformation = {
    legend: {
      data: [],
      left: '10%',
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color:
            screenMode === 'dark'
              ? 'rgba(48, 50, 59, 1)'
              : 'rgba(208, 210, 216, 1)',
        },
      },
      // splitLine: {
      //   show: true,
      //   lineStyle: {
      //     type: 'dashed', // Change to dashed lines
      //     color: screenMode === 'dark' ? 'rgba(48, 50, 59, 1)' : '#e7e7e7', // Color of the dashed lines
      //   },
      // },
      axisLabel: {
        fontSize: '12px',
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : 'black',
      },
      data: xAxisData,
      name: '',
      // axisLine: {
      //   onZero: true,
      //   lineStyle: {
      //     color: 'rgba(48, 50, 59, 1)',
      //   },
      // },

      splitArea: {
        show: false,
      },
    },
    yAxis: {
      axisLabel: {
        fontSize: '12px',
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : 'black',
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed', // Change to dashed lines
          color:
            screenMode === 'dark'
              ? 'rgba(48, 50, 59, 1)'
              : 'rgba(208, 210, 216, 1)', // Color of the dashed lines
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color:
            screenMode === 'dark'
              ? 'rgba(48, 50, 59, 1)'
              : 'rgba(208, 210, 216, 1)',
        },
      },
    },
    grid: {
      bottom: 100,
    },
    series: [
      {
        name: 'bar4',
        type: 'bar',
        stack: 'two',
        // Here we use the dataWithColors array
        data: dataWithColors,
      },
    ],
  };

  const onChangeTrendingLine = (trendingLine: any) => {
    setListMatch((prevListMatch: any) => {
      const listMatchNew = [];
      for (let i = 0; i < trendingLine?.length; i++) {
        const element = trendingLine[i];
        const listItemOld = prevListMatch.filter((item2: any) => {
          return item2.id === element.id;
        });

        for (let j = 0; j < listItemOld?.length; j++) {
          const itemOld = listItemOld[j];
          listMatchNew.push({
            ...itemOld,
            ...element,
          });
        }
      }
      return listMatchNew;
    });
    setTrendingLine((prevTrendingLine) => {
      const prevTrendingLineMap = trendingLine?.map((item: any) => {
        const itemOld: any = prevTrendingLine.find((item2: any) => {
          return item2.id === item.id;
        });
        if (itemOld) {
          return {
            ...itemOld,
            ...item,
          };
        } else {
          return item;
        }
      });
      return prevTrendingLineMap;
    });
  };
  const onChangeIndicator = (indicator: any) => {
    setCommonIndicator(indicator);
  };
  const onChangePosition = (position: any) => {
    if (position?.length > 0) {
      setTrendingLine((prevTrendingLine: any) => {
        const listMatchNew: any = [];
        for (let i = 0; i < prevTrendingLine?.length; i++) {
          const element = prevTrendingLine[i];
          if (element?.position !== position[i]?.position) {
            listMatchNew.push({
              ...element,
              position: position[i]?.position,
              curPrice: position[i]?.curPrice,
              time: position[i]?.time,
              message: position[i]?.message,
            });
          }
        }
        setListMatch((prevListMatch: any) => {
          return [...prevListMatch, ...listMatchNew];
        });
        return prevTrendingLine.map((item: any, index: any) => {
          return {
            ...item,
            position: position[index]?.position,
            curPrice: position[index]?.curPrice,
            time: position[index]?.time,
            // message: 'Đường kháng cự/hỗ trợ',
          };
        });
      });
    }
  };
  const onChangeSymbol = (symbolInfo: any) => {
    const symbolName = symbolInfo?.name;
    // setTrendingLine([]);
    // setListMatch([]);
    setListTabs((prevListTabs) => {
      return prevListTabs.map((item) => {
        return {
          ...item,
          symbol: item?.isPicked ? symbolName : item.symbol,
        };
      });
    });
    setCurTab((prevCurTab) => {
      return {
        ...prevCurTab,
        symbol: symbolName,
      };
    });
  };
  useEffect(() => {
    if (!!code) {
      const newListTabs = listTabs?.map((item: any, index: any) => {
        return index === 0
          ? {
              symbol: code ? code.toUpperCase() : 'SSI',
              resolution: '1D',
              isPicked: true,
              isHover: false,
            }
          : {
              ...item,
              isPicked: false,
              isHover: false,
            };
      });

      setListTabs(newListTabs);

      // setCurTab((prevCurTab) => {
      //   return {
      //     ...prevCurTab,
      //     symbol: code ? code.toUpperCase() : 'SSI',
      //   };
      // });
      // setCurTab(newListTabs[0]);
    }
  }, [code]);

  const onChangeResolution = (resolution: any) => {
    setListTabs((prevListTabs) => {
      return prevListTabs.map((item) => {
        return {
          ...item,
          resolution: item?.isPicked ? resolution : item.resolution,
        };
      });
    });
    setCurTab((prevCurTab) => {
      return {
        ...prevCurTab,
        resolution: resolution,
      };
    });
  };

  const onChangeTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isPicked: index === id ? true : false,
      };
    });
    setListTabs(newListTabs);
    setCurTab(newListTabs[id]);
  };

  const onRemoveTab = (id: any) => {
    if (listTabs?.length === 1) {
      alert('Cần ít nhất 1 biểu đồ');
      return;
    }
    let newListTabs = listTabs.filter((item, index) => index !== id);
    //if removeTab is curTab => set new curTab
    if (listTabs[id].isPicked) {
      newListTabs = newListTabs.map((item, index) => {
        return {
          ...item,
          isPicked: index === newListTabs?.length - 1 ? true : false,
        };
      });
    }
    setListTabs(newListTabs);
    setCurTab(newListTabs[newListTabs?.length - 1]);
  };

  const addNewTab = () => {
    if (listTabs?.length >= 8) {
      alert('Nâng cấp vip để mở thêm tab');
      return;
    }
    let newListTabs = [
      ...listTabs,
      {
        symbol: 'SSI',
        resolution: '1D',
        isPicked: false,
        isHover: false,
      },
    ];
    //set new tab is picked
    newListTabs = newListTabs.map((item, index) => {
      return {
        ...item,
        isPicked: index === newListTabs?.length - 1 ? true : false,
      };
    });
    setListTabs(newListTabs);
    setCurTab(newListTabs[newListTabs?.length - 1]);
  };

  const onHoverTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isHover: index === id ? true : false,
      };
    });
    setListTabs(newListTabs);
  };

  const onMouseLeaveTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isHover: false,
      };
    });
    setListTabs(newListTabs);
  };
  const handleChange = (value: string) => {};
  const onChange = (checked: boolean) => {};

  return (
    <StyledChart screen_mode={screenMode}>
      {contextHolder}

      <div
        style={{
          display: 'flex',
          gap: '8px',
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: 1,
          }}
        >
          <div style={{ height: '100%' }}>
            <ChartTopBar
              screenMode={screenMode}
              listTabs={listTabs}
              onChangeTab={onChangeTab}
              addNewTab={addNewTab}
              onRemoveTab={onRemoveTab}
              onHoverTab={onHoverTab}
              onMouseLeaveTab={onMouseLeaveTab}
            />
            <TVChartContainer
              screenMode={screenMode}
              theme={screenMode}
              activeTab={activeTab}
              onChangeSymbol={onChangeSymbol}
              onChangeResolution={onChangeResolution}
              listTabs={listTabs}
              onChangeIndicator={onChangeIndicator}
              curTab={curTab}
              onChangeTrendingLine={onChangeTrendingLine}
              trendingLineMessage={trendingLine}
              onChangePosition={onChangePosition}
            />
          </div>
        </div>

        <div className="root-right-chart">
          <CongCuChiBao
            screenMode={screenMode}
            contextHolder={contextHolder}
            api={api}
            token={token}
            optionInformation={optionInformation}
            symbolInfo={symbolInfo}
            bgColors={bgColors}
            lastOrder={lastOrder}
            isFloor={isFloor}
            isCeiling={isCeiling}
            listMatchOrder={listMatchOrder}
            totalBuyVol={totalBuyVol}
            totalSellVol={totalSellVol}
            totalVol={totalVol}
            options={options}
            curTab={curTab}
            setCurTab={setCurTab}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            trendingLine={trendingLine}
            listMatch={listMatch}
            symbolTongHopInfo={symbolTongHopInfo}
            accountInfo={accountInfo}
            setAccountInfo={setAccountInfo}
            setBalance={setBalance}
            balance={balance}
            user={user}
            setTrendingLine={setTrendingLine}
            getPortfolio={getPortfolio}
          />
        </div>
      </div>
    </StyledChart>
  );
};

const CongCu: FC<any> = ({
  token,
  trendingLine,
  listMatch,
  screenMode,
  curTab,
  lastOrder,
  setCurTab,
  user,
  setTrendingLine,
}) => {
  const [listFriend, setListFriend] = useState([]);
  const [openListFriend, setOpenListFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [sendFriends, setSendFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listFriendAdd, setListFriendAdd] = useState([]);
  const [inputSearchFriend, setInputSearchFriend] = useState('');
  const [listSignal, setListSignal] = useState([]);

  const [priceUp, setPriceUp] = useState(0);
  const [priceDown, setPriceDown] = useState(0);
  const [sharingSignal, setSharingSignal] = useState<any>(null);

  useEffect(() => {
    getListSignals();
  }, []);

  const filteredFriends = friends?.filter((friend: any) =>
    friend.name.toLowerCase().includes(searchFriends.toLowerCase())
  );

  useEffect(() => {
    getListConversations().then((res) => {
      if (res && res.status === 200) {
        const groups = res.data.conversations.groups.map((item, index) => {
          return {
            ...item,
            avatar: item.image_url,
          };
        });
        setFriends([...res.data.conversations.direct, ...groups]);
      } else {
      }
    });
  }, [isModalOpen]);

  const onDeleteSignal = (signalId: any) => {
    axios
      .delete(`${config.app.VITE_APP_API_URL}/signals/delete/${signalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getListSignals();
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };

  const handleCheckSend = (item: any) => {
    setSendFriends((prev: any) => {
      const isExisting = prev.includes(item);
      if (isExisting) {
        return prev.filter((currentItem: any) => currentItem !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  const isItemInArray = (item: any) => sendFriends.includes(item);

  const handleOk = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/signals/share`,
        {
          SignalID: sharingSignal?.SignalID,
          receiverIDs: sendFriends?.map((item: any) => item.userID),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });

    setIsModalOpen(false);
    setSendFriends([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSendFriends([]);
  };

  useEffect(() => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/getFriends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListFriend(res?.data?.friends);
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  }, []);
  // useEffect(() => {
  //   if (inputSearchFriend.trim() === '') {
  //     setFilteredFriends(listFriend);
  //   } else {
  //     const results = listFriend.filter((friend) =>
  //       friend.name.toLowerCase().includes(inputSearchFriend.toLowerCase())
  //     );
  //     setFilteredFriends(results);
  //   }
  // }, [inputSearchFriend, listFriend]);
  const handleOpenListFriend = () => {
    setOpenListFriend(!openListFriend);
  };
  const handleAddFriend = (item) => {
    const itemExists = listFriendAdd.find(
      (friend) => friend.userId === item.userId
    );

    if (!itemExists) {
      setListFriendAdd([...listFriendAdd, item]);
    }
  };
  const handleDeleteFriendAdd = (userId) => {
    const filteredList = listFriendAdd.filter(
      (friend) => friend.userId !== userId
    );

    setListFriendAdd(filteredList);
  };

  const signalAction = useSelector((state: any) => {
    return state?.chart?.someState;
  }); // Sử dụng state nếu action thay đổi state

  useEffect(() => {
    getListSignals();
    // Bạn có thể cần một điều kiện ở đây để chắc chắn rằng getListSignals được gọi đúng lúc
  }, [signalAction]);

  const getListSignals = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/signals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListSignal(res?.data?.signals);
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };

  const listIdFriendAdd = listFriendAdd.map((item) => item.userId);
  const submitShare = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/signals/share`,
        {
          SignalID: 1,
          receiverIDs: listIdFriendAdd,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // setBalance(res.data.balance);
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };

  const showModal = (item: any) => {
    setSharingSignal(item);
    setIsModalOpen(true);
  };

  const onSaveSignal = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/signals/add`,
        {
          ownerId: user?.userID,
          symbol: curTab?.symbol,
          signalName: `Tín hiệu ${curTab?.symbol}`,
          signalInfo: {
            layout: 's',
            charts: [
              {
                panes: [
                  {
                    sources: [
                      {
                        type: 'MainSeries',
                        id: '_seriesId',
                        zorder: 0,
                        haStyle: {
                          studyId: 'BarSetHeikenAshi@tv-basicstudies-60',
                        },
                        renkoStyle: { studyId: 'BarSetRenko@tv-prostudies-64' },
                        pbStyle: {
                          studyId: 'BarSetPriceBreak@tv-prostudies-34',
                        },
                        kagiStyle: { studyId: 'BarSetKagi@tv-prostudies-34' },
                        pnfStyle: { studyId: 'BarSetPnF@tv-prostudies-34' },
                        rangeStyle: {
                          studyId: 'BarSetRange@tv-basicstudies-72',
                        },
                        formattingDeps: {
                          format: 'price',
                          pricescale: 100,
                          minmov: 1,
                        },
                        state: {
                          style: 1,
                          esdShowDividends: true,
                          esdShowSplits: true,
                          esdShowEarnings: true,
                          esdShowBreaks: false,
                          esdFlagSize: 2,
                          showContinuousContractSwitches: true,
                          showContinuousContractSwitchesBreaks: false,
                          showFuturesContractExpiration: true,
                          showLastNews: true,
                          showCountdown: false,
                          bidAsk: {
                            visible: false,
                            lineStyle: 1,
                            lineWidth: 1,
                            bidLineColor: '#2962FF',
                            askLineColor: '#F7525F',
                          },
                          prePostMarket: {
                            visible: true,
                            lineStyle: 1,
                            lineWidth: 1,
                            preMarketColor: '#FB8C00',
                            postMarketColor: '#2962FF',
                          },
                          highLowAvgPrice: {
                            highLowPriceLinesVisible: false,
                            highLowPriceLabelsVisible: false,
                            averageClosePriceLineVisible: false,
                            averageClosePriceLabelVisible: false,
                            highLowPriceLinesColor: '',
                            highLowPriceLinesWidth: 1,
                            averagePriceLineColor: '',
                            averagePriceLineWidth: 1,
                          },
                          visible: true,
                          showPriceLine: true,
                          priceLineWidth: 1,
                          priceLineColor: '',
                          baseLineColor: '#5d606b',
                          showPrevClosePriceLine: false,
                          prevClosePriceLineWidth: 1,
                          prevClosePriceLineColor: '#555555',
                          minTick: 'default',
                          dividendsAdjustment: {},
                          backAdjustment: false,
                          settlementAsClose: true,
                          sessionId: 'regular',
                          sessVis: false,
                          statusViewStyle: {
                            fontSize: 16,
                            showExchange: true,
                            showInterval: true,
                            symbolTextSource: 'description',
                          },
                          candleStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            drawWick: true,
                            drawBorder: true,
                            borderColor: '#378658',
                            borderUpColor: '#089981',
                            borderDownColor: '#F23645',
                            wickColor: '#B5B5B8',
                            wickUpColor: '#089981',
                            wickDownColor: '#F23645',
                            barColorsOnPrevClose: false,
                            drawBody: true,
                          },
                          hollowCandleStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            drawWick: true,
                            drawBorder: true,
                            borderColor: '#378658',
                            borderUpColor: '#089981',
                            borderDownColor: '#F23645',
                            wickColor: '#B5B5B8',
                            wickUpColor: '#089981',
                            wickDownColor: '#F23645',
                            drawBody: true,
                          },
                          haStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            drawWick: true,
                            drawBorder: true,
                            borderColor: '#378658',
                            borderUpColor: '#089981',
                            borderDownColor: '#F23645',
                            wickColor: '#B5B5B8',
                            wickUpColor: '#089981',
                            wickDownColor: '#F23645',
                            showRealLastPrice: false,
                            barColorsOnPrevClose: false,
                            inputs: {},
                            inputInfo: {},
                            drawBody: true,
                          },
                          barStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            barColorsOnPrevClose: false,
                            dontDrawOpen: false,
                            thinBars: true,
                          },
                          hiloStyle: {
                            color: '#2962FF',
                            showBorders: true,
                            borderColor: '#2962FF',
                            showLabels: true,
                            labelColor: '#2962FF',
                            drawBody: true,
                          },
                          columnStyle: {
                            upColor: 'rgba(8, 153, 129, 0.5)',
                            downColor: 'rgba(242, 54, 69, 0.5)',
                            barColorsOnPrevClose: true,
                            priceSource: 'close',
                          },
                          lineStyle: {
                            color: '#2962FF',
                            linestyle: 0,
                            linewidth: 2,
                            priceSource: 'close',
                          },
                          lineWithMarkersStyle: {
                            color: '#2962FF',
                            linestyle: 0,
                            linewidth: 2,
                            priceSource: 'close',
                          },
                          steplineStyle: {
                            color: '#2962FF',
                            linestyle: 0,
                            linewidth: 2,
                            priceSource: 'close',
                          },
                          areaStyle: {
                            color1: 'rgba(41, 98, 255, 0.28)',
                            color2: '#2962FF',
                            linecolor: '#2962FF',
                            linestyle: 0,
                            linewidth: 2,
                            priceSource: 'close',
                            transparency: 100,
                          },
                          hlcAreaStyle: {
                            highLineColor: '#089981',
                            highLineStyle: 0,
                            highLineWidth: 2,
                            lowLineColor: '#F23645',
                            lowLineStyle: 0,
                            lowLineWidth: 2,
                            closeLineColor: '#868993',
                            closeLineStyle: 0,
                            closeLineWidth: 2,
                            highCloseFillColor: 'rgba(8, 153, 129, 0.2)',
                            closeLowFillColor: 'rgba(242, 54, 69, 0.2)',
                          },
                          renkoStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            borderUpColor: '#089981',
                            borderDownColor: '#F23645',
                            upColorProjection: '#336854',
                            downColorProjection: '#7f323f',
                            borderUpColorProjection: '#336854',
                            borderDownColorProjection: '#7f323f',
                            wickUpColor: '#089981',
                            wickDownColor: '#F23645',
                            inputs: {
                              source: 'close',
                              sources: 'Close',
                              boxSize: 3,
                              style: 'ATR',
                              atrLength: 14,
                              wicks: true,
                            },
                            inputInfo: {
                              source: { name: 'Source' },
                              sources: { name: 'Source' },
                              boxSize: { name: 'Box size' },
                              style: { name: 'Style' },
                              atrLength: { name: 'ATR length' },
                              wicks: { name: 'Wicks' },
                            },
                          },
                          pbStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            borderUpColor: '#089981',
                            borderDownColor: '#F23645',
                            upColorProjection: '#336854',
                            downColorProjection: '#7f323f',
                            borderUpColorProjection: '#336854',
                            borderDownColorProjection: '#7f323f',
                            inputs: { source: 'close', lb: 3 },
                            inputInfo: {
                              source: { name: 'Source' },
                              lb: { name: 'Number of line' },
                            },
                          },
                          kagiStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            upColorProjection: '#336854',
                            downColorProjection: '#7f323f',
                            inputs: {
                              source: 'close',
                              style: 'ATR',
                              atrLength: 14,
                              reversalAmount: 1,
                            },
                            inputInfo: {
                              source: { name: 'Source' },
                              style: { name: 'Style' },
                              atrLength: { name: 'ATR length' },
                              reversalAmount: { name: 'Reversal amount' },
                            },
                          },
                          pnfStyle: {
                            upColor: '#089981',
                            downColor: '#F23645',
                            upColorProjection: '#336854',
                            downColorProjection: '#7f323f',
                            inputs: {
                              sources: 'Close',
                              reversalAmount: 3,
                              boxSize: 1,
                              style: 'ATR',
                              atrLength: 14,
                              oneStepBackBuilding: false,
                            },
                            inputInfo: {
                              sources: { name: 'Source' },
                              boxSize: { name: 'Box size' },
                              reversalAmount: { name: 'Reversal amount' },
                              style: { name: 'Style' },
                              atrLength: { name: 'ATR length' },
                              oneStepBackBuilding: {
                                name: 'One step back building',
                              },
                            },
                          },
                          baselineStyle: {
                            baselineColor: '#758696',
                            topFillColor1: 'rgba(8, 153, 129, 0.28)',
                            topFillColor2: 'rgba(8, 153, 129, 0.05)',
                            bottomFillColor1: 'rgba(242, 54, 69, 0.05)',
                            bottomFillColor2: 'rgba(242, 54, 69, 0.28)',
                            topLineColor: '#089981',
                            bottomLineColor: '#F23645',
                            topLineWidth: 2,
                            bottomLineWidth: 2,
                            priceSource: 'close',
                            transparency: 50,
                            baseLevelPercentage: 50,
                          },
                          rangeStyle: {
                            barStyle: 0,
                            upColor: '#089981',
                            downColor: '#F23645',
                            upColorProjection: '#336854',
                            downColorProjection: '#7f323f',
                            thinBars: true,
                            candlesUpColor: '#089981',
                            candlesDownColor: '#F23645',
                            candlesBorderUpColor: '#089981',
                            candlesBorderDownColor: '#F23645',
                            candlesWickUpColor: '#089981',
                            candlesWickDownColor: '#F23645',
                            inputs: { range: 10, phantomBars: false },
                            inputInfo: {
                              range: { name: 'Range' },
                              phantomBars: { name: 'Phantom bars' },
                            },
                          },
                          symbol: 'AAM',
                          shortName: 'AAM',
                          timeframe: '',
                          onWidget: false,
                          interval: 'D',
                          unitId: null,
                          currencyId: null,
                          priceAxisProperties: {
                            autoScale: true,
                            autoScaleDisabled: false,
                            lockScale: false,
                            percentage: false,
                            percentageDisabled: false,
                            log: false,
                            logDisabled: false,
                            alignLabels: true,
                            isInverted: false,
                            indexedTo100: false,
                          },
                        },
                      },
                      {
                        type: 'study_Volume',
                        id: 'WXtkIP',
                        state: {
                          styles: {
                            vol: {
                              display: 15,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 5,
                              trackPrice: false,
                              transparency: 50,
                              color: '#000080',
                              title: 'vol',
                            },
                            vol_ma: {
                              display: 0,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 0,
                              trackPrice: false,
                              transparency: 0,
                              color: '#2196f3',
                              title: 'vol_ma',
                            },
                            smoothedMA: {
                              display: 0,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 0,
                              trackPrice: false,
                              transparency: 0,
                              color: '#2196f3',
                              title: 'smoothedMA',
                            },
                          },
                          palettes: {
                            volumePalette: {
                              colors: {
                                '0': { color: '#F7525F', width: 1, style: 0 },
                                '1': { color: '#22AB94', width: 1, style: 0 },
                              },
                            },
                          },
                          inputs: {
                            showMA: false,
                            length: 20,
                            col_prev_close: false,
                            symbol: '',
                            smoothingLine: 'SMA',
                            smoothingLength: 9,
                          },
                          precision: 'default',
                          bands: {},
                          graphics: {},
                          ohlcPlots: {},
                          filledAreasStyle: {},
                          filledAreas: {},
                          visible: true,
                          showLegendValues: true,
                          showLabelsOnPriceScale: true,
                          parentSources: {},
                          intervalsVisibilities: {
                            ticks: true,
                            seconds: true,
                            secondsFrom: 1,
                            secondsTo: 59,
                            minutes: true,
                            minutesFrom: 1,
                            minutesTo: 59,
                            hours: true,
                            hoursFrom: 1,
                            hoursTo: 24,
                            days: true,
                            daysFrom: 1,
                            daysTo: 366,
                            weeks: true,
                            weeksFrom: 1,
                            weeksTo: 52,
                            months: true,
                            monthsFrom: 1,
                            monthsTo: 12,
                            ranges: true,
                          },
                        },
                        zorder: -10000,
                        ownFirstValue: null,
                        metaInfo: {
                          palettes: {
                            volumePalette: {
                              colors: {
                                '0': { name: 'Falling' },
                                '1': { name: 'Growing' },
                              },
                            },
                          },
                          inputs: [
                            {
                              id: 'symbol',
                              name: 'Other Symbol',
                              defval: '',
                              type: 'symbol',
                              optional: true,
                              isHidden: false,
                              display: 15,
                            },
                            {
                              id: 'showMA',
                              name: 'show MA',
                              defval: false,
                              type: 'bool',
                              isHidden: true,
                              display: 0,
                            },
                            {
                              id: 'length',
                              name: 'MA Length',
                              defval: 20,
                              type: 'integer',
                              min: 1,
                              max: 2000,
                              display: 15,
                            },
                            {
                              defval: false,
                              id: 'col_prev_close',
                              name: 'Color based on previous close',
                              type: 'bool',
                              display: 0,
                            },
                            {
                              id: 'smoothingLine',
                              name: 'Smoothing Line',
                              defval: 'SMA',
                              type: 'text',
                              options: ['SMA', 'EMA', 'WMA'],
                              display: 15,
                            },
                            {
                              id: 'smoothingLength',
                              name: 'Smoothing Length',
                              defval: 9,
                              type: 'integer',
                              min: 1,
                              max: 10000,
                              display: 15,
                            },
                          ],
                          plots: [
                            { id: 'vol', type: 'line' },
                            {
                              id: 'volumePalette',
                              palette: 'volumePalette',
                              target: 'vol',
                              type: 'colorer',
                            },
                            { id: 'vol_ma', type: 'line' },
                            { id: 'smoothedMA', type: 'line' },
                          ],
                          graphics: {},
                          defaults: {
                            styles: {
                              vol: {
                                display: 15,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 5,
                                trackPrice: false,
                                transparency: 50,
                                color: '#000080',
                              },
                              vol_ma: {
                                display: 0,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 0,
                                trackPrice: false,
                                transparency: 0,
                                color: '#2196F3',
                              },
                              smoothedMA: {
                                display: 0,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 0,
                                trackPrice: false,
                                transparency: 0,
                                color: '#2196F3',
                              },
                            },
                            palettes: {
                              volumePalette: {
                                colors: {
                                  '0': { color: '#F7525F', width: 1, style: 0 },
                                  '1': { color: '#22AB94', width: 1, style: 0 },
                                },
                              },
                            },
                            inputs: {
                              showMA: false,
                              length: 20,
                              col_prev_close: false,
                              symbol: '',
                              smoothingLine: 'SMA',
                              smoothingLength: 9,
                            },
                          },
                          _metainfoVersion: 53,
                          isTVScript: false,
                          isTVScriptStub: false,
                          is_hidden_study: false,
                          styles: {
                            vol: { title: 'Volume', histogramBase: 0 },
                            vol_ma: { title: 'Volume MA', histogramBase: 0 },
                            smoothedMA: {
                              title: 'Smoothed MA',
                              histogramBase: 0,
                            },
                          },
                          description: 'Volume',
                          shortDescription: 'Volume',
                          is_price_study: false,
                          id: 'Volume@tv-basicstudies-1',
                          format: { type: 'volume' },
                          description_localized: 'Khối lượng',
                          shortId: 'Volume',
                          packageId: 'tv-basicstudies',
                          version: '1',
                          fullId: 'Volume@tv-basicstudies-1',
                          productId: 'tv-basicstudies',
                          _serverMetaInfoVersion: 52,
                        },
                      },
                      {
                        type: 'LineToolTrendLine',
                        id: 'gEX1gJ',
                        state: {
                          linecolor: '#2962FF',
                          linewidth: 2,
                          linestyle: 0,
                          extendLeft: false,
                          extendRight: false,
                          leftEnd: 0,
                          rightEnd: 0,
                          showLabel: false,
                          horzLabelsAlign: 'center',
                          vertLabelsAlign: 'bottom',
                          textcolor: '#2962FF',
                          fontsize: 14,
                          bold: false,
                          italic: false,
                          alwaysShowStats: false,
                          showMiddlePoint: false,
                          showPriceLabels: false,
                          showPriceRange: false,
                          showPercentPriceRange: false,
                          showPipsPriceRange: false,
                          showBarsRange: false,
                          showDateTimeRange: false,
                          showDistance: false,
                          showAngle: false,
                          statsPosition: 2,
                          symbolStateVersion: 2,
                          zOrderVersion: 2,
                          visible: true,
                          frozen: false,
                          symbol: 'HOSE:AAM',
                          currencyId: null,
                          unitId: null,
                          intervalsVisibilities: {
                            ticks: true,
                            seconds: true,
                            secondsFrom: 1,
                            secondsTo: 59,
                            minutes: true,
                            minutesFrom: 1,
                            minutesTo: 59,
                            hours: true,
                            hoursFrom: 1,
                            hoursTo: 24,
                            days: true,
                            daysFrom: 1,
                            daysTo: 366,
                            weeks: true,
                            weeksFrom: 1,
                            weeksTo: 52,
                            months: true,
                            monthsFrom: 1,
                            monthsTo: 12,
                            ranges: true,
                          },
                          title: '',
                          text: '',
                          interval: 'D',
                        },
                        points: [
                          {
                            time_t: 1704992400,
                            offset: 0,
                            price: 9.745337737055188,
                          },
                          {
                            time_t: 1705597200,
                            offset: 6,
                            price: 9.361787769017685,
                          },
                        ],
                        zorder: -15000,
                        ownerSource: '_seriesId',
                        isSelectionEnabled: true,
                        userEditEnabled: true,
                        linkKey: 'N4F1ESJqTpZf',
                      },
                      {
                        type: 'Study',
                        id: 'dhrkmN',
                        state: {
                          styles: {
                            plot_0: {
                              display: 15,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 0,
                              trackPrice: false,
                              transparency: 0,
                              color: '#2196f3',
                              title: 'plot_0',
                            },
                            smoothedMA: {
                              display: 0,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 0,
                              trackPrice: false,
                              transparency: 0,
                              color: '#0496ff',
                              title: 'smoothedMA',
                            },
                          },
                          inputs: {
                            symbol: '',
                            length: 9,
                            source: 'close',
                            offset: 0,
                            smoothingLine: 'SMA',
                            smoothingLength: 9,
                          },
                          precision: 'default',
                          bands: {},
                          graphics: {},
                          ohlcPlots: {},
                          palettes: {},
                          filledAreasStyle: {},
                          filledAreas: {},
                          visible: true,
                          showLegendValues: true,
                          showLabelsOnPriceScale: true,
                          parentSources: {},
                          intervalsVisibilities: {
                            ticks: true,
                            seconds: true,
                            secondsFrom: 1,
                            secondsTo: 59,
                            minutes: true,
                            minutesFrom: 1,
                            minutesTo: 59,
                            hours: true,
                            hoursFrom: 1,
                            hoursTo: 24,
                            days: true,
                            daysFrom: 1,
                            daysTo: 366,
                            weeks: true,
                            weeksFrom: 1,
                            weeksTo: 52,
                            months: true,
                            monthsFrom: 1,
                            monthsTo: 12,
                            ranges: true,
                          },
                        },
                        zorder: -20000,
                        ownFirstValue: null,
                        metaInfo: {
                          palettes: {},
                          inputs: [
                            {
                              id: 'symbol',
                              name: 'Other Symbol',
                              defval: '',
                              type: 'symbol',
                              optional: true,
                              isHidden: false,
                              display: 15,
                            },
                            {
                              id: 'length',
                              name: 'Length',
                              defval: 9,
                              type: 'integer',
                              min: 1,
                              max: 10000,
                              display: 15,
                            },
                            {
                              id: 'source',
                              name: 'Source',
                              defval: 'close',
                              type: 'source',
                              options: [
                                'open',
                                'high',
                                'low',
                                'close',
                                'hl2',
                                'hlc3',
                                'ohlc4',
                              ],
                              display: 15,
                            },
                            {
                              id: 'offset',
                              name: 'Offset',
                              defval: 0,
                              type: 'integer',
                              min: -10000,
                              max: 10000,
                              display: 15,
                            },
                            {
                              id: 'smoothingLine',
                              name: 'Smoothing Line',
                              defval: 'SMA',
                              type: 'text',
                              options: ['SMA', 'EMA', 'WMA'],
                              display: 15,
                            },
                            {
                              id: 'smoothingLength',
                              name: 'Smoothing Length',
                              defval: 9,
                              type: 'integer',
                              min: 1,
                              max: 10000,
                              display: 15,
                            },
                          ],
                          plots: [
                            { id: 'plot_0', type: 'line' },
                            { id: 'smoothedMA', type: 'line' },
                          ],
                          graphics: {},
                          defaults: {
                            styles: {
                              plot_0: {
                                display: 15,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 0,
                                trackPrice: false,
                                transparency: 0,
                                color: '#2196F3',
                              },
                              smoothedMA: {
                                display: 0,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 0,
                                trackPrice: false,
                                transparency: 0,
                              },
                            },
                            inputs: {
                              symbol: '',
                              length: 9,
                              source: 'close',
                              offset: 0,
                              smoothingLine: 'SMA',
                              smoothingLength: 9,
                            },
                          },
                          _metainfoVersion: 53,
                          isTVScript: false,
                          isTVScriptStub: false,
                          is_hidden_study: false,
                          styles: {
                            plot_0: {
                              title: 'Plot',
                              histogramBase: 0,
                              joinPoints: false,
                            },
                            smoothedMA: {
                              title: 'Smoothed MA',
                              histogramBase: 0,
                              joinPoints: false,
                            },
                          },
                          description: 'Moving Average',
                          shortDescription: 'MA',
                          is_price_study: true,
                          id: 'Moving Average@tv-basicstudies-1',
                          scriptIdPart: '',
                          name: 'Moving Average',
                          format: { type: 'inherit' },
                          symbolSource: {
                            type: 'symbolInputSymbolSource',
                            inputId: 'symbol',
                          },
                          description_localized: 'Moving Average',
                          shortId: 'Moving Average',
                          packageId: 'tv-basicstudies',
                          version: '1',
                          fullId: 'Moving Average@tv-basicstudies-1',
                          productId: 'tv-basicstudies',
                          _serverMetaInfoVersion: 52,
                        },
                      },
                      {
                        type: 'Study',
                        id: 'e51GVm',
                        state: {
                          styles: {
                            plot_0: {
                              display: 15,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 0,
                              trackPrice: false,
                              transparency: 0,
                              color: '#2157f3',
                              title: 'plot_0',
                            },
                            smoothedMA: {
                              display: 0,
                              linestyle: 0,
                              linewidth: 1,
                              plottype: 0,
                              trackPrice: false,
                              transparency: 0,
                              color: '#044bff',
                              title: 'smoothedMA',
                            },
                          },
                          inputs: {
                            symbol: '',
                            length: 9,
                            source: 'close',
                            offset: 0,
                            smoothingLine: 'SMA',
                            smoothingLength: 9,
                          },
                          precision: 'default',
                          bands: {},
                          graphics: {},
                          ohlcPlots: {},
                          palettes: {},
                          filledAreasStyle: {},
                          filledAreas: {},
                          visible: true,
                          showLegendValues: true,
                          showLabelsOnPriceScale: true,
                          parentSources: {},
                          intervalsVisibilities: {
                            ticks: true,
                            seconds: true,
                            secondsFrom: 1,
                            secondsTo: 59,
                            minutes: true,
                            minutesFrom: 1,
                            minutesTo: 59,
                            hours: true,
                            hoursFrom: 1,
                            hoursTo: 24,
                            days: true,
                            daysFrom: 1,
                            daysTo: 366,
                            weeks: true,
                            weeksFrom: 1,
                            weeksTo: 52,
                            months: true,
                            monthsFrom: 1,
                            monthsTo: 12,
                            ranges: true,
                          },
                        },
                        zorder: -30000,
                        ownFirstValue: null,
                        metaInfo: {
                          palettes: {},
                          inputs: [
                            {
                              id: 'symbol',
                              name: 'Other Symbol',
                              defval: '',
                              type: 'symbol',
                              optional: true,
                              isHidden: false,
                              display: 15,
                            },
                            {
                              id: 'length',
                              name: 'Length',
                              defval: 9,
                              type: 'integer',
                              min: 1,
                              max: 10000,
                              display: 15,
                            },
                            {
                              id: 'source',
                              name: 'Source',
                              defval: 'close',
                              type: 'source',
                              options: [
                                'open',
                                'high',
                                'low',
                                'close',
                                'hl2',
                                'hlc3',
                                'ohlc4',
                              ],
                              display: 15,
                            },
                            {
                              id: 'offset',
                              name: 'Offset',
                              defval: 0,
                              type: 'integer',
                              min: -10000,
                              max: 10000,
                              display: 15,
                            },
                            {
                              id: 'smoothingLine',
                              name: 'Smoothing Line',
                              defval: 'SMA',
                              type: 'text',
                              options: ['SMA', 'EMA', 'WMA'],
                              display: 15,
                            },
                            {
                              id: 'smoothingLength',
                              name: 'Smoothing Length',
                              defval: 9,
                              type: 'integer',
                              min: 1,
                              max: 10000,
                              display: 15,
                            },
                          ],
                          plots: [
                            { id: 'plot_0', type: 'line' },
                            { id: 'smoothedMA', type: 'line' },
                          ],
                          graphics: {},
                          defaults: {
                            styles: {
                              plot_0: {
                                display: 15,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 0,
                                trackPrice: false,
                                transparency: 0,
                                color: '#2196F3',
                              },
                              smoothedMA: {
                                display: 0,
                                linestyle: 0,
                                linewidth: 1,
                                plottype: 0,
                                trackPrice: false,
                                transparency: 0,
                              },
                            },
                            inputs: {
                              symbol: '',
                              length: 9,
                              source: 'close',
                              offset: 0,
                              smoothingLine: 'SMA',
                              smoothingLength: 9,
                            },
                          },
                          _metainfoVersion: 53,
                          isTVScript: false,
                          isTVScriptStub: false,
                          is_hidden_study: false,
                          styles: {
                            plot_0: {
                              title: 'Plot',
                              histogramBase: 0,
                              joinPoints: false,
                            },
                            smoothedMA: {
                              title: 'Smoothed MA',
                              histogramBase: 0,
                              joinPoints: false,
                            },
                          },
                          description: 'Moving Average',
                          shortDescription: 'MA',
                          is_price_study: true,
                          id: 'Moving Average@tv-basicstudies-1',
                          scriptIdPart: '',
                          name: 'Moving Average',
                          format: { type: 'inherit' },
                          symbolSource: {
                            type: 'symbolInputSymbolSource',
                            inputId: 'symbol',
                          },
                          description_localized: 'Moving Average',
                          shortId: 'Moving Average',
                          packageId: 'tv-basicstudies',
                          version: '1',
                          fullId: 'Moving Average@tv-basicstudies-1',
                          productId: 'tv-basicstudies',
                          _serverMetaInfoVersion: 52,
                        },
                      },
                      {
                        type: 'LineToolTrendLine',
                        id: 'UVENCN',
                        state: {
                          linecolor: '#2962FF',
                          linewidth: 2,
                          linestyle: 0,
                          extendLeft: false,
                          extendRight: false,
                          leftEnd: 0,
                          rightEnd: 0,
                          showLabel: false,
                          horzLabelsAlign: 'center',
                          vertLabelsAlign: 'bottom',
                          textcolor: '#2962FF',
                          fontsize: 14,
                          bold: false,
                          italic: false,
                          alwaysShowStats: false,
                          showMiddlePoint: false,
                          showPriceLabels: false,
                          showPriceRange: false,
                          showPercentPriceRange: false,
                          showPipsPriceRange: false,
                          showBarsRange: false,
                          showDateTimeRange: false,
                          showDistance: false,
                          showAngle: false,
                          statsPosition: 2,
                          symbolStateVersion: 2,
                          zOrderVersion: 2,
                          visible: true,
                          frozen: false,
                          symbol: 'HOSE:AAM',
                          currencyId: null,
                          unitId: null,
                          intervalsVisibilities: {
                            ticks: true,
                            seconds: true,
                            secondsFrom: 1,
                            secondsTo: 59,
                            minutes: true,
                            minutesFrom: 1,
                            minutesTo: 59,
                            hours: true,
                            hoursFrom: 1,
                            hoursTo: 24,
                            days: true,
                            daysFrom: 1,
                            daysTo: 366,
                            weeks: true,
                            weeksFrom: 1,
                            weeksTo: 52,
                            months: true,
                            monthsFrom: 1,
                            monthsTo: 12,
                            ranges: true,
                          },
                          title: '',
                          text: '',
                          interval: 'D',
                        },
                        points: [
                          {
                            time_t: 1705597200,
                            offset: 4,
                            price: 9.591917749840187,
                          },
                          {
                            time_t: 1705597200,
                            offset: 3,
                            price: 9.037901129341572,
                          },
                        ],
                        zorder: -12500,
                        ownerSource: '_seriesId',
                        isSelectionEnabled: true,
                        userEditEnabled: true,
                        linkKey: '4C2w9S6GyTj7',
                      },
                    ],
                    mainSourceId: '_seriesId',
                    stretchFactor: 2000,
                    leftAxisesState: [],
                    rightAxisesState: [
                      {
                        state: {
                          id: 'aWsSaRY0jeKf',
                          m_priceRange: null,
                          m_isAutoScale: true,
                          m_isPercentage: false,
                          m_isIndexedTo100: false,
                          m_isLog: false,
                          m_isLockScale: false,
                          m_isInverted: false,
                          m_topMargin: 0.1,
                          m_bottomMargin: 0.08,
                          alignLabels: true,
                          logFormula: { logicalOffset: 4, coordOffset: 0.0001 },
                        },
                        sources: [
                          '_seriesId',
                          'gEX1gJ',
                          'dhrkmN',
                          'e51GVm',
                          'UVENCN',
                        ],
                      },
                    ],
                    overlayPriceScales: {
                      WXtkIP: {
                        id: 'ViLyMy3TOWLq',
                        m_priceRange: null,
                        m_isAutoScale: true,
                        m_isPercentage: false,
                        m_isIndexedTo100: false,
                        m_isLog: false,
                        m_isLockScale: false,
                        m_isInverted: false,
                        m_topMargin: 0.1,
                        m_bottomMargin: 0.08,
                        alignLabels: true,
                        logFormula: { logicalOffset: 4, coordOffset: 0.0001 },
                      },
                    },
                    priceScaleRatio: null,
                  },
                ],
                timeScale: {
                  m_barSpacing: 39.81818181818182,
                  m_rightOffset: 10,
                  rightOffsetPercentage: 5,
                  usePercentageRightOffset: false,
                },
                chartProperties: {
                  paneProperties: {
                    backgroundType: 'gradient',
                    background: '#131722',
                    backgroundGradientStartColor: '#181C27',
                    backgroundGradientEndColor: '#131722',
                    gridLinesMode: 'both',
                    vertGridProperties: { color: 'rgba(240, 243, 250, 0.06)' },
                    horzGridProperties: { color: 'rgba(240, 243, 250, 0.06)' },
                    crossHairProperties: {
                      color: '#9598A1',
                      style: 2,
                      transparency: 0,
                      width: 1,
                    },
                    topMargin: 10,
                    bottomMargin: 8,
                    axisProperties: {
                      autoScale: true,
                      autoScaleDisabled: false,
                      lockScale: false,
                      percentage: false,
                      percentageDisabled: false,
                      indexedTo100: false,
                      log: false,
                      logDisabled: false,
                      alignLabels: true,
                      isInverted: false,
                    },
                    legendProperties: {
                      showStudyArguments: true,
                      showStudyTitles: true,
                      showStudyValues: true,
                      showSeriesTitle: true,
                      showSeriesOHLC: true,
                      showLegend: true,
                      showBarChange: true,
                      showVolume: false,
                      showBackground: true,
                      showPriceSource: true,
                      backgroundTransparency: 50,
                      showLogo: true,
                    },
                    separatorColor: '#2A2E39',
                  },
                  scalesProperties: {
                    backgroundColor: '#ffffff',
                    lineColor: 'rgba(240, 243, 250, 0)',
                    textColor: '#B2B5BE',
                    fontSize: 12,
                    scaleSeriesOnly: false,
                    showSeriesLastValue: true,
                    seriesLastValueMode: 1,
                    showSeriesPrevCloseValue: false,
                    showStudyLastValue: true,
                    showSymbolLabels: false,
                    showStudyPlotLabels: false,
                    showBidAskLabels: false,
                    showPrePostMarketPriceLabel: true,
                    showFundamentalNameLabel: false,
                    showFundamentalLastValue: true,
                    barSpacing: 6,
                    axisHighlightColor: 'rgba(41, 98, 255, 0.25)',
                    axisLineToolLabelBackgroundColorCommon: '#2962FF',
                    axisLineToolLabelBackgroundColorActive: '#143EB3',
                    showPriceScaleCrosshairLabel: true,
                    showTimeScaleCrosshairLabel: true,
                    crosshairLabelBgColorLight: '#131722',
                    crosshairLabelBgColorDark: '#363A45',
                  },
                  chartEventsSourceProperties: {
                    visible: true,
                    futureOnly: true,
                    breaks: {
                      color: '#555555',
                      visible: false,
                      style: 2,
                      width: 1,
                    },
                  },
                  tradingProperties: {
                    showPositions: true,
                    positionPL: { visibility: true, display: 0 },
                    bracketsPL: { visibility: true, display: 0 },
                    showOrders: true,
                    showExecutions: true,
                    showExecutionsLabels: false,
                    showReverse: true,
                    horizontalAlignment: 2,
                    extendLeft: true,
                    lineLength: 5,
                    lineWidth: 1,
                    lineStyle: 0,
                  },
                  priceScaleSelectionStrategyName: 'auto',
                },
                sessions: {
                  properties: {
                    graphics: {
                      backgrounds: {
                        outOfSession: {
                          color: '#2962FF',
                          transparency: 92,
                          visible: false,
                        },
                        preMarket: {
                          color: '#FF9800',
                          transparency: 92,
                          visible: false,
                        },
                        postMarket: {
                          color: '#2962FF',
                          transparency: 92,
                          visible: false,
                        },
                      },
                      vertlines: {
                        sessBreaks: {
                          color: '#4985e7',
                          style: 2,
                          visible: false,
                          width: 1,
                        },
                      },
                    },
                  },
                },
                version: 3,
                timezone: 'Asia/Ho_Chi_Minh',
                shouldBeSavedEvenIfHidden: true,
                linkingGroup: null,
                lineToolsGroups: { groups: [] },
                chartId: '1',
              },
            ],
            symbolLock: 0,
            intervalLock: 0,
            trackTimeLock: 0,
            dateRangeLock: 0,
            crosshairLock: 1,
            layoutsSizes: { s: [{ percent: 1 }] },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getListSignals();
      })
      .catch((error) => {
        console.error('Error saving signal:', error);
      });
  };

  const onChooseSignal = (item: any) => {
    setCurTab({
      symbol: item?.symbol,
      resolution: '1D',
      isPicked: true,
      isHover: false,
      ...item,
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messageUp, setMessageUp] = useState(['Giá nằm trên đường']);
  const [messageDown, setMessageDown] = useState('Giá nằm dưới đường');

  const [listMessage, setListMessage] = useState([]);
  const [bottomTab, setBottomTab] = useState('banBe');

  return (
    <div
      className="indicator-tool"
      style={{
        backgroundColor: screenMode === 'dark' ? '#202127' : '#f2f2f2',

        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        // height: '565px',
        height: '84vh',
        // overflowY: 'scroll',
      }}
    >
      <div style={{ borderBottom: '1px solid #3a3f42', padding: '16px' }}>
        <div
          style={{
            color: screenMode === 'dark' ? '#fff' : '#000',

            width: '324px',
            minHeight: '100px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Tooltip title="Cài đặt thông báo báo về điện thoại khi giá cắt qua đường trendline">
                <div
                  style={{
                    color: screenMode === 'dark' ? '#FFF' : 'black',
                    fontSize: '16px',
                    fontWeight: 900,
                    height: '23px',
                    marginTop: '8px',
                  }}
                >
                  CÀI ĐẶT ĐƯỜNG TRENDLINE
                </div>
              </Tooltip>
            </div>
            <div>
              <div style={{ height: '250px', overflow: 'scroll' }}>
                {trendingLine &&
                  trendingLine?.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          // width: '268px',
                          // justifyContent: "space-between",
                          height: '76px',
                          alignItems: 'center',
                          marginBottom: '12px',
                        }}
                      >
                        <div style={{ width: '12.77%' }}>
                          <div
                            style={{
                              width: '24px',
                              height: '76px',
                              borderRadius: '8px',
                              // backgroundColor: replaceAlpha(item?.state.linecolor),
                              backgroundColor: `${item?.state.linecolor}`,
                              // color: item?.state.linecolor,
                              color: '#42A732',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            width: '228px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <div style={{ width: '100%', height: '24px' }}>
                            <div
                              style={{
                                borderBottom: `2px solid ${item?.state.linecolor}`,
                                height: '12px',
                                width: '100%',
                              }}
                            ></div>
                          </div>

                          <div
                            style={{
                              marginTop: '4px',
                              fontSize: '14px',
                              fontWeight: '400',
                              height: '48px',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '300px',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(42, 46, 57, 1)',
                              color: 'rgba(255, 255, 255, 1)',
                            }}
                          >
                            {
                              item?.position === undefined ? (
                                <span
                                  style={{
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontStyle: 'italic',
                                  }}
                                >
                                  Loading...
                                </span>
                              ) : (
                                <span
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '8px',
                                    alignItems: 'center',
                                  }}
                                >
                                  Giá nằm {item?.position ? 'trên' : 'dưới'}{' '}
                                  đường
                                  <input
                                    value={item?.message}
                                    placeholder="Đặt tên đường..."
                                    style={{
                                      fontSize: '14px',
                                      // height: '32px',
                                      width: '120px',
                                      borderRadius: '8px',
                                      padding: '4px',
                                      backgroundColor:
                                        screenMode === 'dark'
                                          ? '#1F232C'
                                          : '#F0F3FA',
                                      border:
                                        screenMode === 'dark'
                                          ? 'rgba(42, 46, 57, 0.2)'
                                          : '#F0F3FA',
                                      color:
                                        screenMode === 'dark'
                                          ? '#fff'
                                          : 'black',

                                      fontWeight: 400,
                                    }}
                                    onChange={(e) => {
                                      const newTrendingLine = [...trendingLine];
                                      newTrendingLine[index].message =
                                        e.target.value;
                                      setTrendingLine(newTrendingLine);
                                    }}
                                  />
                                </span>
                              )
                              // : item?.position ? (
                              //   <input
                              //     value={messageUp}
                              //     onChange={(e) => {
                              //       setMessageUp(e.target.value);
                              //     }}
                              //   />
                              // ) : (
                              //   <input
                              //     value={messageDown}
                              //     onChange={(e) => {
                              //       setMessageDown(e.target.value);
                              //     }}
                              //   />
                              // )
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="setting-indicator-chart">
          <Tooltip title="Cài đặt thông báo báo về điện thoại khi giá vượt qua mốc">
            <div
              className="title"
              style={{
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              CÀI ĐẶT GIÁ
              <span
                style={{
                  color:
                    lastOrder?.LastPrice > lastOrder?.RefPrice
                      ? '#42A732'
                      : 'rgb(228, 54, 55)',
                  marginLeft: '4px',
                }}
              >
                {curTab?.symbol} -{' '}
                {formatNumber(lastOrder?.LastPrice || lastOrder?.RefPrice)}
              </span>
            </div>
            {/* <div className="box-first">
              <div className="text">GIÁ</div>
              <div className="number">
                {formatNumber(lastOrder?.LastPrice || lastOrder?.RefPrice)}
              </div>
            </div> */}
          </Tooltip>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                padding: '8px',
                marginBottom: '8px',
                alignItems: 'center',
                // backgroundColor: "#1b1e2b",
                justifyContent: 'space-between',
                borderRadius: '8px',
                background: false
                  ? 'var(--button-color-button-secondary-color-button-primary, #3594EF)'
                  : ' var(--button-color-button-secondary-color-button-primary_none, rgba(53, 148, 239, 0.20))',
                // position: 'relative',
              }}
              // onClick={() => {
              //   setIsOpen(!isOpen);
              // }}
            >
              <div
                // onMouseEnter={() => {
                //   setIsHoverChiTieu([item.label, true]);
                // }}
                // onMouseLeave={() => {
                //   setIsHoverChiTieu([item.label, false]);
                // }}
                style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color:
                    screenMode === 'dark' ? 'rgba(255, 255, 255)' : 'black',
                  // isHoverChiTieu[1] && isHoverChiTieu[0] === item.label
                  //   ? '#fff'
                  //   : screenMode === 'light'
                  //     ? 'rgba(8, 8, 8, 1)'
                  //     : 'rgba(255, 255, 255)',
                  height: '20px',
                  width: '244px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Nhận thông báo khi giá vượt lên{' '}
                {/* <span
                  style={{
                    // padding: '6px',
                    width: '30px',
                    height: '20px',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#42A732',
                    border: '1px solid #42A732',
                    borderRadius: '4px',
                    marginLeft: '4px',
                  }}
                >
                  {priceUp ? priceUp : '...'}
                </span> */}
                {/* {formatNumber(lastOrder?.LastPrice || lastOrder?.RefPrice)} */}
              </div>
              {/* {isOpen ? (
                <CaretUpOutlined className={'iconoutlineddirectionalcare120'} />
              ) : (
                <CaretDownOutlined
                  className={'iconoutlineddirectionalcare120'}
                />
              )} */}
              <input
                value={priceUp}
                onChange={(e: any) => {
                  setPriceUp(e.target.value);
                }}
                style={{
                  width: '70px',
                  marginLeft: '10px',
                  backgroundColor:
                    screenMode === 'dark' ? 'rgb(31, 35, 44)' : '#D4D4D4',
                  color: screenMode === 'dark' ? '#fff' : '#000',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                padding: '8px',
                marginBottom: '8px',
                alignItems: 'center',
                // backgroundColor: "#1b1e2b",
                justifyContent: 'space-between',
                borderRadius: '8px',
                background: false
                  ? 'var(--button-color-button-secondary-color-button-primary, #3594EF)'
                  : ' var(--button-color-button-secondary-color-button-primary_none, rgba(53, 148, 239, 0.20))',
                // position: 'relative',
              }}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <div
                // onMouseEnter={() => {
                //   setIsHoverChiTieu([item.label, true]);
                // }}
                // onMouseLeave={() => {
                //   setIsHoverChiTieu([item.label, false]);
                // }}
                style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color:
                    screenMode === 'dark' ? 'rgba(255, 255, 255)' : 'black',

                  // isHoverChiTieu[1] && isHoverChiTieu[0] === item.label
                  //   ? '#fff'
                  //   : screenMode === 'light'
                  //     ? 'rgba(8, 8, 8, 1)'
                  //     : 'rgba(255, 255, 255)',
                  height: '20px',
                  width: '200px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Nhận thông báo khi giá vượt xuống
                {/* {formatNumber(lastOrder?.LastPrice || lastOrder?.RefPrice)} */}
              </div>
              {/* {!isOpen ? (
                <CaretUpOutlined className={'iconoutlineddirectionalcare120'} />
              ) : (
                <CaretDownOutlined
                  className={'iconoutlineddirectionalcare120'}
                />
              )} */}
              <input
                value={priceDown}
                onChange={(e: any) => {
                  setPriceDown(e.target.value);
                }}
                style={{
                  width: '70px',
                  marginLeft: '10px',
                  background:
                    screenMode === 'dark' ? 'rgb(31, 35, 44)' : '#D4D4D4',
                  color: screenMode === 'dark' ? '#fff' : '#000',
                }}
              />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            if (
              trendingLine?.length === 0 &&
              priceUp === 0 &&
              priceDown === 0
            ) {
              notification.error({
                message: 'Vui lòng cài đặt tín hiệu',
                description:
                  'Kẻ đường trendline và cài đặt giá thông báo cho tín hiệu',
                duration: 2,
                placement: 'bottomRight',
              });
            } else {
              onSaveSignal();
            }
          }}
          style={{ cursor: 'pointer' }}
          className="button-indicator-chart"
        >
          LƯU TÍN HIỆU CỔ PHIẾU {curTab?.symbol}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'left',
            paddingBottom: '8px',
          }}
        >
          <div style={{ width: '255px' }}>
            <div
              style={{
                fontFamily: 'roboto',
                fontWeight: '700',
                fontSize: '16px',
                color: screenMode === 'dark' ? '#fff' : 'black',
                marginBottom: '4px',
              }}
            >
              DANH SÁCH TÍN HIỆU ĐÃ LƯU
            </div>
          </div>
        </div>

        {listSignal.map((item: any, index: number) => {
          return (
            <Tooltip
              title={
                item?.OwnerID === user?.userID
                  ? null
                  : 'Tín hiệu được chia sẻ không thể chỉnh sửa'
              }
            >
              <div
                style={{
                  display: 'flex',
                  paddingRight: '8px',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'stretch',
                }}
                onClick={() => {
                  onChooseSignal(item);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    padding: '0 8px',
                    alignItems: 'center',
                    gap: '8px',
                    alignSelf: 'stretch',
                    borderRadius: '8px',
                    border:
                      curTab?.SignalID === item?.SignalID
                        ? '1px solid #3594EF'
                        : 'none',
                    background:
                      curTab?.SignalID === item?.SignalID
                        ? 'rgba(53, 148, 239, 0.20)'
                        : 'none',
                    height: '48px',
                  }}
                >
                  <div
                    style={{
                      borderRadius: '50%',
                      backgroundColor:
                        item?.OwnerID === user?.userID
                          ? '#3594EF'
                          : 'rgb(66, 167, 50, 0.5)',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px',
                      alignItems: 'center',
                      gap: '24px',
                      flex: '1 0 0',
                      borderRadius: '8px',
                      background:
                        item?.OwnerID === user?.userID
                          ? '#3594EF'
                          : 'rgb(66, 167, 50, 0.5)',
                      color: screenMode === 'dark' ? '#fff' : '#000',

                      fontSize: '14px',
                      fontWeight: 500,
                      height: '32px',
                      width: '189px',
                    }}
                  >
                    {item?.OwnerID === user?.userID
                      ? item?.SignalName
                      : `Chia sẻ bởi ${item?.name}`}
                  </div>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      padding: '4px 8px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      background:
                        item?.OwnerID === user?.userID
                          ? '#3594EF'
                          : 'rgb(66, 167, 50, 0.5)',
                      height: '22px',
                      width: '56px',
                      color: '#FFF',

                      fontSize: '12px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      showModal(item);
                    }}
                  >
                    Chia sẻ
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    onClick={() => {
                      onDeleteSignal(item?.SignalID);
                    }}
                  >
                    <path
                      d="M16.5 16.5L11 11M11 11L5.5 5.5M11 11L16.5 5.5M11 11L5.5 16.5"
                      stroke="#3594EF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Tooltip>
          );
        })}

        {/* <div
          style={{
            display: 'flex',
            paddingRight: '8px',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '0 8px',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'stretch',
              borderRadius: '8px',
              border: '1px solid #3594EF',
              background: 'rgba(53, 148, 239, 0.20)',
              height: '48px',
            }}
          >
            <div
              style={{
                borderRadius: '50%',
                backgroundColor: '#3594EF',
                width: '24px',
                height: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              1
            </div>
            <div
              style={{
                display: 'flex',
                padding: '8px',
                alignItems: 'center',
                gap: '24px',
                flex: '1 0 0',
                borderRadius: '8px',
                background: '#3594EF',
                              color: screenMode === 'dark' ? '#fff' : '#000',

                fontSize: '14px',
                fontWeight: 500,
                height: '32px',
                width: '189px',
              }}
            >
              Tín hiệu SSI
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                padding: '4px 8px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '4px',
                background: '#3594EF',
                height: '22px',
                width: '56px',
                color: '#FFF',
                
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              Chia sẻ
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5 16.5L11 11M11 11L5.5 5.5M11 11L16.5 5.5M11 11L5.5 16.5"
                stroke="#3594EF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div> */}
      </div>

      <div className="end-box-chart">
        <div className="tab-end-box">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setBottomTab('banBe');
            }}
            className={bottomTab === 'banBe' ? 'tab-second' : 'tab-first'}
          >
            B.BÈ ĐƯỢC CHIA SẺ TH
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setBottomTab('dienThoai');
            }}
            className={bottomTab === 'dienThoai' ? 'tab-second' : 'tab-first'}
            // className="tab-second"
          >
            NỘI DUNG THÔNG BÁO ĐT
          </div>
        </div>
        <div className="table-end">
          <div style={{ paddingTop: '8px' }}>
            <div className="header-noti">
              <div className="text-first">Thời gian</div>
              <div className="text-second">Nội dung</div>
              <div className="text-third">Giá trị</div>
            </div>
            <div
              className={listMatch.length > 5 && 'noti'}
              style={{
                // height: '360px',
                // overflowY: 'scroll',
                paddingBottom: '10px',
              }}
            >
              {listMatch.map((item, index) => {
                let indexMatch = trendingLine.findIndex((item2) => {
                  return item2.id === item.id;
                });
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      margin: '0px',
                      padding: '4px',
                      backgroundColor:
                        index % 2 === 0 ? '#2A2E39' : 'transparent',
                    }}
                  >
                    <div
                      style={{
                        width: '21.77%',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: 'rgb(255, 255, 255, 0.5)',
                      }}
                    >
                      {item?.time}
                    </div>
                    <div
                      style={{
                        width: '65.62%',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: 'rgb(255, 255, 255, 0.5)',
                        marginLeft: '29px',
                      }}
                    >
                      {item?.position
                        ? `Giá đang nằm trên đường ${item?.message ? item?.message : index + 1}`
                        : `Giá đang nằm dưới đường ${item?.message ? item?.message : index + 1}`}
                    </div>
                    <div
                      style={{
                        width: '17.61%',
                        textAlign: 'right',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: item?.position ? '#42A732' : '#E43637',
                        marginRight: '7px',
                      }}
                    >
                      {item?.curPrice}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'flex-end',
            gap: '12px',
            flex: '1 0 auto',
            alignSelf: 'stretch',
            borderRadius: '8px',
            background: '#1F232C',
            backdropFilter: 'blur(7px)',
          }}
        >
          <div
            style={{
              color: '#FFF',

              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}
          >
            CHIA SẺ TÍN HIỆU CHO BẠN BÈ
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              // alignItems: 'flex-end',
              gap: '8px',
              alignSelf: 'stretch',
            }}
          >
            <div
              style={{
                borderRadius: '8px',
                background: '#2A2E39',
                display: 'flex',
                padding: '4px 8px',
                // justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}
            >
              <img
                className="icon-search"
                src={screenMode === 'dark' ? iconSearch : searchLightMode}
                alt=""
              />
              <input
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px',
                  paddingLeft: '5px',
                  outline: 'none',
                  color: screenMode === 'dark' ? '#fff' : 'rgba(8, 8, 8, 0.5)',
                }}
                value={searchFriends}
                type="text"
                placeholder="Nhập tên..."
                onChange={(e) => setSearchFriends(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '4px',
                flex: '1 0 0',
              }}
              className="list-friend"
            >
              {filteredFriends?.map((el, index) => (
                <div
                  style={{
                    backgroundColor:
                      screenMode === 'dark'
                        ? index % 2
                          ? 'rgba(42, 46, 57, 1)'
                          : 'transparent'
                        : index % 2
                          ? '#F0F3FA'
                          : 'transparent',
                    display: 'flex',
                    padding: '4px 8px',
                    alignItems: 'center',
                    gap: '8px',
                    alignSelf: 'stretch',
                    height: '42px',
                  }}
                  // className="item-friend"
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                    }}
                  >
                    <img
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                      }}
                      src={el.avatar}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '4px',
                      width: '565px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        color:
                          screenMode === 'dark' ? '#fff' : 'rgba(8, 8, 8, 1)',
                      }}
                    >
                      {el.name}
                    </div>
                    {el.isOnline === 1 ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <div
                          style={{
                            color:
                              screenMode === 'light'
                                ? 'rgba(8, 8, 8, 0.50)'
                                : '#fff',

                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '14px',
                          }}
                        >
                          Đang hoạt động
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                        >
                          <circle cx="3" cy="3" r="3" fill="#42A732" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <div
                          style={{
                            color:
                              screenMode === 'light'
                                ? 'rgba(8, 8, 8, 0.50)'
                                : '#fff',

                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '14px',
                          }}
                        >
                          Đang offline
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                        >
                          <circle cx="3" cy="3" r="3" fill="red" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {isItemInArray(el) ? (
                    <div
                      onClick={() => handleCheckSend(el)}
                      style={{
                        display: 'flex',
                        padding: '4px',
                        alignItems: 'flex-start',
                        gap: '10px',
                        borderRadius: '4px',
                        background: '#42A732',
                        border: '1px solid #42A732',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M14.2503 2.96875H13.1581C13.0049 2.96875 12.8596 3.03906 12.7659 3.15937L6.32369 11.3203L3.23463 7.40625C3.1879 7.34692 3.12833 7.29895 3.06041 7.26593C2.99249 7.23292 2.91796 7.21572 2.84244 7.21562H1.75025C1.64557 7.21562 1.58775 7.33594 1.65182 7.41719L5.9315 12.8391C6.1315 13.0922 6.51588 13.0922 6.71744 12.8391L14.3487 3.16875C14.4128 3.08906 14.3549 2.96875 14.2503 2.96875Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleCheckSend(el)}
                      style={{
                        display: 'flex',
                        padding: '4px',
                        alignItems: 'flex-start',
                        gap: '10px',
                        borderRadius: '4px',

                        border:
                          screenMode === 'dark'
                            ? '1px solid #3A3F42'
                            : '1px solid rgba(207, 208, 212, 0.50)',
                        background:
                          screenMode === 'dark' ? '#1F232C' : '#FDFDFD',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M14.2503 2.96875H13.1581C13.0049 2.96875 12.8596 3.03906 12.7659 3.15937L6.32369 11.3203L3.23463 7.40625C3.1879 7.34692 3.12833 7.29895 3.06041 7.26593C2.99249 7.23292 2.91796 7.21572 2.84244 7.21562H1.75025C1.64557 7.21562 1.58775 7.33594 1.65182 7.41719L5.9315 12.8391C6.1315 13.0922 6.51588 13.0922 6.71744 12.8391L14.3487 3.16875C14.4128 3.08906 14.3549 2.96875 14.2503 2.96875Z"
                          fill="transparent"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Detail: FC<any> = ({
  curTab,
  lastOrder,
  isFloor,
  isCeiling,
  listMatchOrder,
  totalBuyVol,
  totalSellVol,
  totalVol,
  bgColors,
  options,
  symbolInfo,
  screenMode,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="frame-parent264">
      <div className="frame-parent266">
        <div className="s-lnh-wrapper">
          <div className="s-lnh">Khớp lệnh</div>
        </div>
        <div className="t-mua-parent">
          <div className="t-mua">Giá mua</div>
          <div className="t-bn">Giá bán</div>
        </div>
        <div className="frame-parent267">
          <div className="parent-wrapper">
            <div className="parent-first">
              <div
                style={{
                  backgroundColor: bgColors?.BidVol1,
                }}
                className="text1"
              >
                {formatNumberWithCommas(lastOrder?.BidVol1)}
              </div>
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : lastOrder?.BidPrice1 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.BidPrice1 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                      : isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : lastOrder?.BidPrice1 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.BidPrice1 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                }}
                className="text2"
              >
                {lastOrder?.TradingSession === 'ATC' ||
                (lastOrder?.TradingSession === 'ATO' && !lastOrder?.BidPrice1)
                  ? lastOrder?.TradingSession
                  : formatNumber(lastOrder?.BidPrice1)}
              </div>
            </div>
            <div className="parent-second">
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : lastOrder?.AskPrice1 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.AskPrice1 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                      : isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : lastOrder?.AskPrice1 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.AskPrice1 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                }}
                className="text1"
              >
                {lastOrder?.TradingSession === 'ATC' ||
                (lastOrder?.TradingSession === 'ATO' && !lastOrder?.AskPrice1)
                  ? lastOrder?.TradingSession
                  : formatNumber(lastOrder?.AskPrice1)}
              </div>

              <div
                style={{
                  backgroundColor: bgColors?.AskVol1,
                }}
                className="text2 lastCol"
              >
                {formatNumberWithCommas(lastOrder?.AskVol1)}
              </div>
            </div>
          </div>
          <div className="parent-wrapper">
            <div className="parent-first">
              <div
                style={{
                  backgroundColor: bgColors?.BidVol2,
                }}
                className="text1"
              >
                {formatNumberWithCommas(lastOrder?.BidVol2)}
              </div>

              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? lastOrder?.BidPrice2 > lastOrder?.RefPrice
                        ? 'rgba(92, 214, 128, 1)'
                        : lastOrder?.BidPrice2 < lastOrder?.RefPrice
                          ? 'rgba(209, 84, 73, 1)'
                          : '#CCAA00'
                      : lastOrder?.BidPrice2 > lastOrder?.RefPrice
                        ? '#45783A'
                        : lastOrder?.BidPrice2 < lastOrder?.RefPrice
                          ? '#A33929'
                          : '#CCAA00',
                }}
                className="text2"
              >
                {formatNumber(lastOrder?.BidPrice2)}
              </div>
            </div>
            <div className="parent-second">
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? lastOrder?.AskPrice2 > lastOrder?.RefPrice
                        ? 'rgba(92, 214, 128, 1)'
                        : lastOrder?.AskPrice2 < lastOrder?.RefPrice
                          ? 'rgba(209, 84, 73, 1)'
                          : '#CCAA00'
                      : lastOrder?.AskPrice2 > lastOrder?.RefPrice
                        ? '#45783A'
                        : lastOrder?.AskPrice2 < lastOrder?.RefPrice
                          ? '#A33929'
                          : '#CCAA00',
                }}
                className="text1"
              >
                {/* {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.AskPrice2)
                      ? lastOrder?.TradingSession
                      : formatNumber(lastOrder?.AskPrice2)} */}
                {formatNumber(lastOrder?.AskPrice2)}
              </div>

              <div
                style={{
                  backgroundColor: bgColors?.AskVol2,
                }}
                className="text2 lastCol"
              >
                {formatNumberWithCommas(lastOrder?.AskVol2)}
              </div>
            </div>
          </div>
          <div className="parent-wrapper">
            <div className="parent-first">
              <div
                style={{
                  backgroundColor: bgColors?.BidVol3,
                }}
                className="text1"
              >
                {formatNumberWithCommas(lastOrder?.BidVol3)}
              </div>

              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? lastOrder?.BidPrice3 > lastOrder?.RefPrice
                        ? 'rgba(92, 214, 128, 1)'
                        : lastOrder?.BidPrice3 < lastOrder?.RefPrice
                          ? 'rgba(209, 84, 73, 1)'
                          : '#CCAA00'
                      : lastOrder?.BidPrice3 > lastOrder?.RefPrice
                        ? '#45783A'
                        : lastOrder?.BidPrice3 < lastOrder?.RefPrice
                          ? '#A33929'
                          : '#CCAA00',
                }}
                className="text2"
              >
                {formatNumber(lastOrder?.BidPrice3)}
              </div>
            </div>
            <div className="parent-second">
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? lastOrder?.AskPrice3 > lastOrder?.RefPrice
                        ? 'rgba(92, 214, 128, 1)'
                        : lastOrder?.AskPrice3 < lastOrder?.RefPrice
                          ? 'rgba(209, 84, 73, 1)'
                          : '#CCAA00'
                      : lastOrder?.AskPrice3 > lastOrder?.RefPrice
                        ? '#45783A'
                        : lastOrder?.AskPrice3 < lastOrder?.RefPrice
                          ? '#A33929'
                          : '#CCAA00',
                }}
                className="text1"
              >
                {formatNumber(lastOrder?.AskPrice3)}
              </div>

              <div
                style={{
                  backgroundColor: bgColors?.AskVol3,
                }}
                className="text2 lastCol"
              >
                {formatNumberWithCommas(lastOrder?.AskVol3)}
              </div>
            </div>
          </div>

          {showMore && (
            <div style={{ width: '100%' }}>
              <div className="parent-wrapper">
                <div className="parent-first">
                  <div
                    style={{
                      backgroundColor: bgColors?.BidVol4,
                    }}
                    className="text1"
                  >
                    {lastOrder?.BidVol4 == null
                      ? '-'
                      : formatNumberWithCommas(lastOrder?.BidVol4)}
                  </div>

                  <div
                    style={{
                      color:
                        screenMode === 'dark'
                          ? lastOrder?.BidPrice4 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.BidPrice4 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                          : lastOrder?.BidPrice4 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.BidPrice4 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                    }}
                    className="text2"
                  >
                    {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.BidPrice4)
                      ? lastOrder?.TradingSession
                      : lastOrder?.BidPrice4 == null
                        ? '-'
                        : formatNumber(lastOrder?.BidPrice4)}
                  </div>
                </div>
                <div className="parent-second">
                  <div
                    style={{
                      color:
                        screenMode === 'dark'
                          ? lastOrder?.AskPrice4 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.AskPrice4 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                          : lastOrder?.AskPrice4 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.AskPrice4 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                    }}
                    className="text1"
                  >
                    {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.AskPrice4)
                      ? lastOrder?.TradingSession
                      : lastOrder?.AskPrice4 == null
                        ? '-'
                        : formatNumber(lastOrder?.AskPrice4)}
                  </div>

                  <div
                    style={{
                      backgroundColor: bgColors?.AskVol4,
                    }}
                    className="text2 lastCol"
                  >
                    {lastOrder?.AskVol4 == null
                      ? '-'
                      : formatNumberWithCommas(lastOrder?.AskVol4)}
                  </div>
                </div>
              </div>
              <div className="parent-wrapper">
                <div className="parent-first">
                  <div
                    style={{
                      backgroundColor: bgColors?.BidVol5,
                    }}
                    className="text1"
                  >
                    {lastOrder?.BidVol5 == null
                      ? '-'
                      : formatNumberWithCommas(lastOrder?.BidVol5)}
                  </div>

                  <div
                    style={{
                      color:
                        screenMode === 'dark'
                          ? lastOrder?.BidPrice5 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.BidPrice5 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                          : lastOrder?.BidPrice5 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.BidPrice5 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                    }}
                    className="text2"
                  >
                    {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.BidPrice5)
                      ? lastOrder?.TradingSession
                      : lastOrder?.BidPrice5 == null
                        ? '-'
                        : formatNumber(lastOrder?.BidPrice5)}
                  </div>
                </div>
                <div className="parent-second">
                  <div
                    style={{
                      color:
                        screenMode === 'dark'
                          ? lastOrder?.BidPrice5 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.BidPrice5 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                          : lastOrder?.BidPrice5 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.BidPrice5 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                    }}
                    className="text1"
                  >
                    {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.AskPrice5)
                      ? lastOrder?.TradingSession
                      : lastOrder?.AskPrice5 == null
                        ? '-'
                        : formatNumber(lastOrder?.AskPrice5)}
                  </div>

                  <div
                    style={{
                      backgroundColor: bgColors?.AskVol5,
                    }}
                    className="text2 lastCol"
                  >
                    {lastOrder?.AskVol5 == null
                      ? '-'
                      : formatNumberWithCommas(lastOrder?.AskVol5)}
                  </div>
                </div>
              </div>
              <div className="parent-wrapper">
                <div className="parent-first">
                  <div
                    style={{
                      backgroundColor: bgColors?.BidVol6,
                    }}
                    className="text1"
                  >
                    {lastOrder?.BidVol6 == null
                      ? '-'
                      : formatNumberWithCommas(lastOrder?.BidVol6)}
                  </div>

                  <div
                    style={{
                      color:
                        screenMode === 'dark'
                          ? lastOrder?.BidPrice6 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.BidPrice6 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                          : lastOrder?.BidPrice6 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.BidPrice6 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                    }}
                    className="text"
                  >
                    {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.BidPrice6)
                      ? lastOrder?.TradingSession
                      : lastOrder?.BidPrice6 == null
                        ? '-'
                        : formatNumber(lastOrder?.BidPrice6)}
                  </div>
                </div>
                <div className="parent-second">
                  <div
                    style={{
                      color:
                        screenMode === 'dark'
                          ? lastOrder?.BidPrice6 > lastOrder?.RefPrice
                            ? 'rgba(92, 214, 128, 1)'
                            : lastOrder?.BidPrice6 < lastOrder?.RefPrice
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                          : lastOrder?.BidPrice6 > lastOrder?.RefPrice
                            ? '#45783A'
                            : lastOrder?.BidPrice6 < lastOrder?.RefPrice
                              ? '#A33929'
                              : '#CCAA00',
                    }}
                    className="text1"
                  >
                    {lastOrder?.TradingSession === 'ATC' ||
                    (lastOrder?.TradingSession === 'ATO' &&
                      !lastOrder?.AskPrice6)
                      ? lastOrder?.TradingSession
                      : lastOrder?.AskPrice6 == null
                        ? '-'
                        : formatNumber(lastOrder?.AskPrice6)}
                  </div>

                  <div
                    style={{
                      backgroundColor: bgColors?.AskVol6,
                    }}
                    className="text2 lastCol"
                  >
                    {lastOrder?.AskVol6 == null
                      ? '-'
                      : formatNumberWithCommas(lastOrder?.AskVol6)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div onClick={() => setShowMore(!showMore)} className="show-more">
          <div className="text-show">{showMore ? 'Thu gọn' : 'Xem thêm'}</div>
          {showMore ? (
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528921 0.528758C0.78927 0.268409 1.21138 0.268409 1.47173 0.528758L5.00033 4.05735L8.52892 0.528758C8.78927 0.268409 9.21138 0.268409 9.47173 0.528758C9.73208 0.789108 9.73208 1.21122 9.47173 1.47157L5.47173 5.47157C5.21138 5.73192 4.78927 5.73192 4.52892 5.47157L0.528921 1.47157C0.268571 1.21122 0.268571 0.789108 0.528921 0.528758Z"
                fill={screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'}
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528921 0.528758C0.78927 0.268409 1.21138 0.268409 1.47173 0.528758L5.00033 4.05735L8.52892 0.528758C8.78927 0.268409 9.21138 0.268409 9.47173 0.528758C9.73208 0.789108 9.73208 1.21122 9.47173 1.47157L5.47173 5.47157C5.21138 5.73192 4.78927 5.73192 4.52892 5.47157L0.528921 1.47157C0.268571 1.21122 0.268571 0.789108 0.528921 0.528758Z"
                fill={screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'}
              />
            </svg>
          )}
        </div>
      </div>
      <div className="box-chart-match">
        <div className="chart-match-first">
          {/* <div className="tng-kl-khp-parent"> */}
          <div className="text-box-match">KL Mua chủ động</div>
          <div
            className="text-match"
            style={{
              display: 'flex',

              fontWeight: '400',
              color: screenMode === 'dark' ? '#fff' : '#2E3138',
              backgroundColor: bgColors?.TotalBuyVol,
            }}
          >
            {formatNumberWithCommas(totalBuyVol || 0)}
          </div>
        </div>
        <div className="chart-match-second">
          <div className="text-box-match">Tổng KL khớp</div>
          <div
            className="text-match"
            style={{
              backgroundColor: bgColors?.TotalVol,

              fontWeight: '400',
              color: screenMode === 'dark' ? '#fff' : 'black',
            }}
          >
            {formatNumberWithCommas(totalVol || 0)}
          </div>
        </div>

        <div className="chart-match-thirt">
          <div className="text-box-match">KL Bán chủ động</div>
          <div
            className="text-match"
            style={{
              fontWeight: '400',
              display: 'flex',
              color:
                screenMode === 'dark'
                  ? '#fff'
                  : bgColors?.TotalSellVol !== 'transparent'
                    ? 'black'
                    : 'rgba(209, 84, 73, 1)',

              backgroundColor: bgColors?.TotalSellVol,
            }}
          >
            {formatNumberWithCommas(totalSellVol || 0)}
          </div>
        </div>
      </div>
      <div className="khp-parent">
        <div className="khp">Khớp</div>
        <div className="gi">Giá</div>
        <div className="div376">+/-</div>
        <div className="kl">KL</div>
        {/* <div  className="div376_new">
          +/-(%)
        </div> */}
        <div className="mb lastCol">M/B</div>
      </div>
      <List
        style={{
          padding: '0 8px 10px 8px',
          borderBottom:
            screenMode === 'dark'
              ? '1px solid rgba(48, 50, 59, 1)'
              : '1px solid #D5D7DC',
        }}
        height={200}
        itemCount={listMatchOrder?.length}
        itemSize={35}
        // className="frame-parent279"
        // style={{ paddingBottom: '10px' }}
        // height={200}
        width={'100%'} // Responsive full width
        // itemCount={listMatchOrder.length}
        // itemSize={35}
        // className="frame-parent279"
      >
        {({ index, style }) => {
          const item = listMatchOrder[index];
          const change =
            Math.round(
              (listMatchOrder[index]?.LastPrice - +lastOrder?.RefPrice / 1000) *
                100
            ) / 100;
          return (
            <div
              key={index}
              className="tng-kl-khp-parent"
              style={{
                ...style,
              }}
            >
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? 'rgba(255, 255, 255, 0.50)'
                      : 'rgba(116, 123, 139, 1)',
                }}
                className="div377"
              >
                {item?.Time}
              </div>
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : item?.Change > 0
                            ? 'rgba(92, 214, 128, 1)'
                            : item?.Change < 0
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                      : isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : item?.Change > 0
                            ? 'rgba(79, 120, 58, 1)'
                            : item?.Change < 0
                              ? 'rgba(163, 57, 41, 1)'
                              : '#CCAA00',
                }}
                className="div378"
              >
                {formatNumber(item?.LastPrice)}
                {/* {item?.LastPrice} */}
              </div>
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : item?.Change > 0
                            ? 'rgba(92, 214, 128, 1)'
                            : item?.Change < 0
                              ? 'rgba(209, 84, 73, 1)'
                              : '#CCAA00'
                      : isFloor
                        ? '#3CC8C8'
                        : isCeiling
                          ? '#C068EE'
                          : item?.Change > 0
                            ? 'rgba(79, 120, 58, 1)'
                            : item?.Change < 0
                              ? 'rgba(163, 57, 41, 1)'
                              : '#CCAA00',
                }}
                className="div378"
              >
                {formatNumber(item?.Change)}
                {/* {change} */}
              </div>
              <div
                className="div380"
                style={{
                  textAlign: 'right',
                  alignItems: 'flex-end',
                  display: 'flex',
                  // justifyContent: 'flex-end',
                }}
              >
                {formatNumberWithCommas(item?.LastVol)}
              </div>
              {/* <div
                style={{
                  color: isFloor
                    ? '#3CC8C8'
                    : isCeiling
                      ? '#C068EE'
                      : item?.Change > 0
                        ? 'rgba(92, 214, 128, 1)'
                        : item?.Change < 0
                          ? 'rgba(209, 84, 73, 1)'
                          : '#CCAA00',
                }}
                className="div378_new"
              >
                {item?.RatioChange}
              </div> */}
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? item?.type === 'S'
                        ? 'rgba(209, 84, 73, 1)'
                        : item?.type === 'B'
                          ? 'rgba(92, 214, 128, 1)'
                          : ''
                      : item?.type === 'S'
                        ? 'rgba(163, 57, 41, 1)'
                        : item?.type === 'B'
                          ? 'rgba(79, 120, 58, 1)'
                          : '',
                  justifyContent: 'flex-start',
                }}
                className="b16 lastCol"
              >
                {item?.type === 'S' ? 'B' : item?.type === 'B' ? 'M' : ''}
              </div>
            </div>
          );
        }}
      </List>

      <div
        style={{
          marginTop: '24px',
          width: '100%',
          paddingBottom: '20px',
        }}
      >
        <div className="s-lnh-wrapper">
          <div
            style={{ fontSize: '18px', fontWeight: 600, lineHeight: '20px' }}
            className="s-lnh"
          >
            Mức giá
          </div>
        </div>
        <ReactECharts
          option={options}
          style={{
            height: '1059px',
            width: '100%',
          }}
          // notMerge={true}
          // lazyUpdate={true}
          // theme={'theme_name'}
          // onChartReady={this.onChartReadyCallback}
          // onEvents={EventsDict}
          // opts={}
        />
      </div>
    </div>
  );
};
const TongHop: FC<any> = ({
  lastOrder,
  symbolTongHopInfo,
  symbolInfo,
  screenMode,
}) => {
  return (
    <div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Tham chiếu
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: '#CCAA00',
            }}
          >
            {formatNumber(symbolTongHopInfo?.RefPrice)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Mở cửa
          </div>
          <div
            style={{
              lineHeight: '20px',
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              color:
                symbolTongHopInfo?.openPrice === symbolTongHopInfo?.RefPrice
                  ? '#CCAA00'
                  : symbolTongHopInfo?.openPrice > symbolTongHopInfo?.RefPrice
                    ? '#42A732'
                    : '#E43637',
            }}
          >
            {formatNumber(symbolTongHopInfo?.openPrice)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Thấp - Cao
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: '#CCAA00',
            }}
          >
            <span style={{ color: '#E43637', marginRight: '4px' }}>
              {formatNumber(symbolTongHopInfo?.lowest)}
            </span>{' '}
            -{' '}
            <span style={{ color: '#42A732', marginLeft: '4px' }}>
              {formatNumber(symbolTongHopInfo?.highest)}
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Khối lượng
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: '#CCAA00',
            }}
          >
            {formatNumberWithCommas(symbolTongHopInfo?.KhoiLuong)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Giá trị
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            {formatNumberToBillion(symbolTongHopInfo?.GiaTri)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Giá trung bình
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            {formatNumber(symbolTongHopInfo?.GiaTrungBinh)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Beta
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            ???
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Thị giá vốn
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            {formatNumberToBillion(symbolTongHopInfo?.ThiGiaVon)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            Số lượng CPLH
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            {formatNumberWithCommas(symbolTongHopInfo?.SoLuongCPLH)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            P/E
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            {formatNumberWithCommas(
              Math.round(symbolTongHopInfo?.pe * 100) / 100
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              color:
                screenMode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : 'rgba(102, 103, 107, 1)',
            }}
          >
            EPS
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '20px',
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
          >
            {formatNumberWithCommas(Math.round(+symbolTongHopInfo?.eps))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ThongKe: FC<any> = ({
  symbolTongHopInfo,
  optionInformation,
  lastOrder,
  symbolInfo,

  curTab,
  bgColors,

  isFloor,
  isCeiling,
  listMatchOrder,
  totalBuyVol,
  totalSellVol,
  totalVol,
  options,
  screenMode,
}) => {
  const [tabStatistical, setTabStatistical] = useState('chitiet');

  const location = useLocation();

  useEffect(() => {
    const tab = location.state?.tab || 'chitiet';
    switch (tab) {
      case 'chi-tiet':
        setTabStatistical('chitiet');
        break;
      case 'thong-ke':
        setTabStatistical('thongke');
        break;

      default:
        break;
    }
  }, [location]);

  function formatString(input: any) {
    const specialWords = ['ctcp', curTab?.symbol?.toLowerCase()];

    return input
      ?.split(' ')
      ?.map((word: any) => {
        // Kiểm tra nếu từ là một trong những từ đặc biệt, viết hoa toàn bộ
        if (specialWords.includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        // Ngược lại, viết hoa chữ cái đầu và viết thường các chữ cái còn lại
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  return (
    <div
      style={{
        backgroundColor:
          screenMode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)',
        paddingBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        gap: '24px',
        height: '100%',
      }}
    >
      <div className="tab-transaction">
        <button
          onClick={() => setTabStatistical('chitiet')}
          className={
            tabStatistical === 'chitiet'
              ? 'btn-transaction1'
              : 'btn-transaction'
          }
          style={
            tabStatistical === 'chitiet'
              ? {
                  fontWeight: 600,
                  // backgroundColor: '#3594EF',
                  color:
                    screenMode === 'dark'
                      ? 'rgba(153, 186, 255, 1)'
                      : 'rgba(0, 74, 234, 1)',
                  backgroundColor: 'transparent',
                  borderBottom: '3px solid rgba(0, 74, 234, 1)',
                  borderRadius: 0,
                }
              : {
                  fontWeight: 400,
                  color: screenMode === 'dark' ? '#fff' : '#080808',
                }
          }
        >
          Chi tiết
        </button>
        <button
          onClick={() => setTabStatistical('thongke')}
          style={
            tabStatistical === 'thongke'
              ? {
                  fontWeight: 600,
                  // backgroundColor: '#3594EF',
                  color:
                    screenMode === 'dark'
                      ? 'rgba(153, 186, 255, 1)'
                      : 'rgba(0, 74, 234, 1)',
                  backgroundColor: 'transparent',
                  borderBottom: '3px solid rgba(0, 74, 234, 1)',
                  borderRadius: 0,
                }
              : {
                  fontWeight: 400,
                  color: screenMode === 'dark' ? '#fff' : '#080808',
                }
          }
          className={
            tabStatistical === 'thongke'
              ? 'btn-transaction1'
              : 'btn-transaction'
          }
        >
          Thống kê
        </button>
      </div>
      <div className="wrapper-scroll">
        <div className="box-header-pagechart">
          <div className="header">
            <Tooltip title={symbolInfo?.description}>
              <div className="name-company">
                {symbolInfo?.description?.length > 50
                  ? `${formatString(symbolInfo?.description).slice(0, 50)}...`
                  : formatString(symbolInfo?.description)}
              </div>
            </Tooltip>

            <div
              style={{
                fontWeight: 500,
                fontSize: '14px',

                color:
                  +lastOrder?.Change > 0
                    ? 'rgba(92, 214, 128, 1)'
                    : +lastOrder?.Change < 0
                      ? 'rgba(209, 84, 73, 1)'
                      : '#CCAA00',
                lineHeight: '20px',
              }}
            >
              {lastOrder?.symbol}:{lastOrder?.Exchange}
            </div>
          </div>
          <div className="price-stock-chart">
            <div className="text">Giá cổ phiếu:</div>
            <div className="box-number">
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? +lastOrder?.Change > 0
                        ? 'rgba(92, 214, 128, 1)'
                        : +lastOrder?.Change < 0
                          ? 'rgba(209, 84, 73, 1)'
                          : '#CCAA00'
                      : +lastOrder?.Change > 0
                        ? 'rgba(92, 214, 128, 1)'
                        : +lastOrder?.Change < 0
                          ? 'rgba(163, 57, 41, 1)'
                          : '#CCAA00',
                }}
                className="number"
              >
                {' '}
                {formatNumber(lastOrder?.LastPrice || lastOrder?.RefPrice)}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  background:
                    +lastOrder?.Change > 0
                      ? 'rgba(92, 214, 128, 1)'
                      : +lastOrder?.Change < 0
                        ? 'rgba(163, 57, 41, 1)'
                        : '#CCAA00',
                  color: 'rgba(255, 255, 255, 1)',
                  fontWeight: 400,
                  padding: '4px 8px',

                  borderRadius: '100px',
                }}
              >
                {lastOrder?.Change > 0 ? (
                  <span>
                    +
                    {lastOrder?.Change
                      ? (lastOrder?.Change / 1000).toFixed(2)
                      : 0}
                  </span>
                ) : (
                  <span>
                    {lastOrder?.Change
                      ? (lastOrder?.Change / 1000).toFixed(2)
                      : 0}
                  </span>
                )}
                /
                {!lastOrder?.RatioChange ? (
                  '0.00%'
                ) : lastOrder?.RatioChange > 0 ? (
                  <span>
                    +
                    {Math.round(
                      (+lastOrder?.Change / +lastOrder?.RefPrice) * 10000
                    ) / 100}
                    %
                  </span>
                ) : (
                  <span>
                    {Math.round(
                      (+lastOrder?.Change / +lastOrder?.RefPrice) * 10000
                    ) / 100}
                    %
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {tabStatistical === 'chitiet' ? (
          <Detail
            symbolInfo={symbolInfo}
            curTab={curTab}
            bgColors={bgColors}
            lastOrder={lastOrder}
            isFloor={isFloor}
            isCeiling={isCeiling}
            listMatchOrder={listMatchOrder}
            totalBuyVol={totalBuyVol}
            totalSellVol={totalSellVol}
            totalVol={totalVol}
            options={options}
            screenMode={screenMode}
          />
        ) : (
          <>
            <TongHop
              screenMode={screenMode}
              symbolTongHopInfo={symbolTongHopInfo}
              lastOrder={lastOrder}
              symbolInfo={symbolInfo}
            />
            <div
              style={{ textAlign: 'left', padding: '0 4px', marginTop: '24px' }}
            >
              <div
                style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  color: screenMode === 'dark' ? '#fff' : '#000',
                }}
              >
                Giao dịch NĐTNN
              </div>
              <div className="wrapper-buy">
                <div className="box-buy">
                  <div className="content">
                    <div className="text">KL Mua</div>
                    <div className="number">-</div>
                  </div>
                  <div className="content">
                    <div className="text">KL Bán</div>
                    <div className="number">-</div>
                  </div>
                  <div className="content">
                    <div className="text">KL Mua - Bán</div>
                    <div className="number">-</div>
                  </div>
                </div>
                <div className="box-buy">
                  <div className="content">
                    <div className="text">GT Mua</div>
                    <div className="number">-</div>
                  </div>
                  <div className="content">
                    <div className="text">GT Bán</div>
                    <div className="number">-</div>
                  </div>
                  <div className="content">
                    <div className="text">GT Mua - Bán</div>
                    <div className="number">-</div>
                  </div>
                </div>
              </div>
              <ReactECharts option={optionInformation} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const VirtualTransactions: FC<any> = ({
  lastOrder,
  options,
  symbolInfo,
  accountInfo,
  setAccountInfo,
  balance,
  setBalance,
  token,
  screenMode,
  getPortfolio,
}) => {
  const [tabTransation, setTabTransation] = useState<any>('ckcoso');
  const [mass, setMass] = useState<number>(0);
  const [textErrMass, setTextErrMass] = useState('');
  const [checkErrMass, setCheckErrMass] = useState<any>(false);
  const [price, setPrice] = useState<number>();
  const [textErrPrice, setTextPrice] = useState<any>('');
  const [checkErrPrice, setCheckErrPrice] = useState<any>(false);
  const [disablePrice, setDisablePrice] = useState(false);
  const [disableAuto, setDisableAuto] = useState(false);
  useEffect(() => {
    setPrice(+lastOrder?.Ceiling / 1000);
  }, []);
  useEffect(() => {
    const checkMassCondition = () => {
      const massNumber = parseFloat(mass);
      if (isNaN(massNumber) || massNumber.length === 0 || massNumber === 0) {
        setTextErrMass('Khối lượng không hợp lệ!');
        setCheckErrMass(true);
      } else if (massNumber % 100 !== 0) {
        setTextErrMass(
          'Giao dịch giả lập chưa hỗ trợ đặt lệnh lô lẻ. Quý khách vui lòng nhập khối lượng là bội số của 100'
        );
        setCheckErrMass(true);
      } else {
        setCheckErrMass(false);
      }
    };

    if (mass !== '') {
      checkMassCondition();
    }
  }, [mass]);
  useEffect(() => {
    const checkPriceCondition = () => {
      const priceNumber = +parseFloat(price);
      if (isNaN(priceNumber) || priceNumber.length === 0 || priceNumber === 0) {
        setTextPrice('Khối lượng không hợp lệ!');
        setCheckErrPrice(true);
      } else if (price < lastOrder?.Floor / 1000) {
        setTextPrice('Giá phải lớn hơn hoặc bằng giá sàn');
        setCheckErrPrice(true);
      } else if (price > lastOrder?.Ceiling / 1000) {
        setTextPrice('Giá phải nhỏ hơn hoặc bằng giá sàn');
        setCheckErrPrice(true);
      } else {
        setCheckErrPrice(false);
      }
    };
    if (price !== '') {
      checkPriceCondition();
    }
  }, [price]);

  const onChangeSwitch = (checked: boolean) => {
    setDisableAuto(checked);
  };
  const handleChangeMassPlus = (e) => {
    setMass((prev) => prev + 100);
  };
  const handleChangeMassMinus = () => {
    const massNumber = parseFloat(mass);

    if (massNumber >= 100) {
      setMass((prev) => prev - 100);
    }
  };
  const handleChangePricePlus = (e) => {
    setPrice((prev) => {
      const numericPrev = parseFloat(prev);
      if (!isNaN(numericPrev)) {
        return (numericPrev + 0.1).toFixed(1);
      }
      return prev;
    });
  };

  const handleChangePriceMinus = () => {
    setPrice((prev) => {
      const numericPrev = parseFloat(prev);
      if (!isNaN(numericPrev) && numericPrev >= 0.1) {
        return (numericPrev - 0.1).toFixed(1);
      }
      return prev;
    });
  };

  const handleBuyCoso = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/placeOrder`,
        {
          stockSymbol: lastOrder.symbol,
          transactionType: 'buy',
          quantity: mass,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBalance(res.data.balance);
        api.info({
          message: `Mua thành công`,
        });
        getPortfolio();
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };
  const handleSellCoso = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/placeOrder`,
        {
          stockSymbol: lastOrder.symbol,
          transactionType: 'sell',
          quantity: mass,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBalance(res.data.balance);
        getPortfolio();
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };

  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );

  return (
    <div
      style={{
        paddingRight: '3px',
        backgroundColor:
          screenMode === 'dark' ? '#202127' : 'rgba(236, 236, 239, 1)',
        height: '733px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <div className="main-container">
        <div className="tab-transaction">
          <button
            onClick={() => setTabTransation('ckcoso')}
            style={
              tabTransation === 'ckcoso'
                ? {
                    fontWeight: 600,
                    backgroundColor: '#3594EF',
                  }
                : {
                    fontWeight: 400,
                    backgroundColor: 'rgba(53, 148, 239, 0.20)',
                  }
            }
            className={
              tabTransation === 'ckcoso'
                ? 'btn-transaction1'
                : 'btn-transaction'
            }
          >
            CK CƠ SỞ
          </button>

          <button
            onClick={() => setTabTransation('ckphaisinh')}
            className={
              tabTransation === 'ckphaisinh'
                ? 'btn-transaction1'
                : 'btn-transaction'
            }
            style={
              tabTransation === 'ckphaisinh'
                ? {
                    fontWeight: 700,
                    backgroundColor: '#3594EF',
                  }
                : {
                    fontWeight: 400,
                    backgroundColor: 'rgba(53, 148, 239, 0.20)',
                  }
            }
          >
            CK PHÁI SINH
          </button>
        </div>
        <div className="input-transactions">
          <img
            className="icon-search"
            src={screenMode === 'dark' ? iconSearch : iconSearchDark}
            alt=""
          />
          <input
            className="search"
            type="text"
            placeholder="Nhập tên cổ phiếu..."
          />
        </div>
        <div className="header">
          <div className="name-company">{symbolInfo?.description}</div>
          <div
            style={{
              fontWeight: 500,
              fontSize: '18px',
            }}
          >
            {formatNumber(lastOrder?.LastPrice || lastOrder?.RefPrice)}
          </div>
        </div>
        <div className="header">
          <div className="id-company">
            {lastOrder?.symbol}:{lastOrder?.Exchange}
          </div>
          <div
            style={{
              fontSize: '16px',
              color: 'rgba(66, 167, 50, 1)',
              fontWeight: 700,
            }}
          >
            {lastOrder?.Change > 0 ? (
              <span>+{lastOrder?.Change}</span>
            ) : (
              <span>-{lastOrder?.Change}</span>
            )}
            /
            {lastOrder?.RatioChange > 0 ? (
              <span>+{lastOrder?.RatioChange}</span>
            ) : (
              <span>-{lastOrder?.RatioChange}</span>
            )}
          </div>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.5" cy="4.5" r="4" fill="#CCAA00" />
          </svg>

          <div
            style={{
              fontSize: '18px',
              marginLeft: '6.5px',
              color: screenMode === 'dark' ? '#fff' : 'black',
            }}
          >
            Lệnh trước giờ
          </div>
        </div>
        <div
          style={{
            textAlign: 'left',

            width: '339px',
            height: '43px',
            borderWidth: '0 0 1px 0',
            padding: '12px 0',
            gap: '10px',
            marginTop: '12px',
            fontWeight: 700,
            fontSize: '16px',
            color: screenMode === 'dark' ? '#fff' : 'black',
          }}
        >
          ĐẶT LỆNH
        </div>
        <div className="order-form">
          <div className="form-group">
            <label
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
            >
              Tài khoản đặt lệnh
            </label>
            <select
              style={{
                height: '32px',
                width: '199px',
                borderRadius: '8px',
                padding: '8px',
                backgroundColor:
                  screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                border:
                  screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
            >
              <option
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: screenMode === 'dark' ? '#fff' : 'black',
                }}
                value={user?.phone_number}
                // value="233718-SC01"
              >
                {/* {accountInfo?.accountName} */}
                {user?.phone_number}
              </option>
            </select>
          </div>
          <div className="form-group">
            <label
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
            >
              Sức mua
            </label>
            <div
              style={{
                fontWeight: 400,
                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
              className="buy-power"
            >
              {/* Dynamic content */}
              {balance}
            </div>
          </div>

          <div className="form-group">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <label
                style={{
                  marginRight: '3px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: screenMode === 'dark' ? '#fff' : 'black',
                }}
              >
                Giá tự động{' '}
              </label>
              <Tooltip
                title={
                  <div
                    style={{
                      display: 'grid',
                    }}
                  >
                    <span style={{ fontSize: '11px' }}>
                      Giá mua = Giá Dư bán tốt nhất + Biên trượt
                    </span>
                    <span style={{ fontSize: '11px' }}>
                      Giá bán = Giá Dư bán tốt nhất + Biên trượt
                    </span>
                  </div>
                }
              >
                <svg
                  stroke="currentColor"
                  fill={screenMode === 'dark' ? 'currentColor' : 'black'}
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  class="cursor-pointer outline-none"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                  </g>
                </svg>
              </Tooltip>
            </div>

            <div
              style={{
                width: '199px',
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Switch onChange={onChangeSwitch} />
            </div>
          </div>

          <div className="form-group">
            <label
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
            >
              Khối lượng
            </label>
            <div className="up-down">
              <input
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                style={{
                  fontSize: '14px',
                  height: '32px',
                  width: '199px',
                  borderRadius: '8px',
                  padding: '8px',
                  backgroundColor:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  border:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  color: screenMode === 'dark' ? '#fff' : 'black',

                  fontWeight: 400,
                }}
              />
              <div className="list-plus">
                <img
                  onClick={handleChangeMassPlus}
                  style={{ marginRight: '4px', cursor: 'pointer' }}
                  src={plus}
                  alt=""
                />
                <img
                  onClick={handleChangeMassMinus}
                  style={{ cursor: 'pointer' }}
                  src={minus}
                  alt=""
                />
              </div>
            </div>
          </div>
          {checkErrMass && (
            <div className="form-group">
              <label></label>
              <div
                style={{
                  textAlign: 'left',
                  width: '199px',
                  fontSize: '.625rem',
                  color: screenMode === 'dark' ? '#fff' : '#000',

                  fontWeight: 400,
                }}
              >
                {textErrMass}
              </div>
            </div>
          )}

          <div className="form-group">
            <label
              style={{
                fontSize: '14px',
                fontWeight: 500,

                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
            >
              Giá (x1000)
            </label>
            <div className="up-down">
              <input
                disabled={disableAuto}
                value={
                  price &&
                  !isNaN(price) &&
                  (parseFloat(price) % 1 !== 0
                    ? parseFloat(price).toFixed(1)
                    : price)
                }
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  fontSize: '14px',
                  height: '32px',
                  fontWeight: 400,
                  width: '199px',
                  borderRadius: '8px',
                  padding: '8px',
                  backgroundColor:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  border:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',

                  color: screenMode === 'dark' ? '#fff' : 'black',
                }}
              />
              <div className="list-plus">
                <img
                  onClick={disableAuto ? undefined : handleChangePricePlus}
                  style={{ marginRight: '4px' }}
                  src={plus}
                  alt=""
                />
                <img
                  onClick={disableAuto ? undefined : handleChangePriceMinus}
                  src={minus}
                  alt=""
                />
              </div>
            </div>
          </div>
          {checkErrPrice && (
            <div className="form-group">
              <label></label>
              <div
                style={{
                  textAlign: 'left',
                  width: '199px',
                  fontSize: '.625rem',
                  color: screenMode === 'dark' ? '#fff' : 'black',

                  fontWeight: 400,
                }}
              >
                {textErrPrice}
              </div>
            </div>
          )}
          <div className="form-group">
            <label></label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '32px',
                width: '200px',
                borderRadius: '8px',
                // padding: '8px',
                gap: '8px',
                color: screenMode === 'dark' ? '#fff' : 'black',
              }}
            >
              <button
                style={{
                  width: '61px',

                  height: '32px',
                  backgroundColor:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  border:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',

                  cursor: 'pointer',
                  color: screenMode === 'dark' ? '#fff' : 'black',

                  borderRadius: '4px',
                  gap: '4px',
                }}
              >
                MP <img style={{ marginLeft: '4px' }} src={warning} alt="" />
              </button>
              <button
                style={{
                  width: '61px',

                  height: '32px',
                  cursor: 'pointer',
                  backgroundColor:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  border:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  color: screenMode === 'dark' ? '#fff' : 'black',
                  borderRadius: '4px',
                }}
              >
                ATO <img style={{ marginLeft: '4px' }} src={warning} alt="" />
              </button>
              <button
                style={{
                  width: '61px',
                  cursor: 'pointer',
                  height: '32px',
                  backgroundColor:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  border:
                    screenMode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA',
                  color: screenMode === 'dark' ? '#fff' : 'black',
                  borderRadius: '4px',
                }}
              >
                ATC{' '}
                <img
                  style={{ marginLeft: '4px', marginTop: '3px' }}
                  src={warning}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div
            style={{
              fontSize: '14px',
              color: screenMode === 'dark' ? '#fff' : 'black',
            }}
            className="form-group"
          >
            Tổng giá trị dự kiến
          </div>
          <div className="form-actions">
            <button
              disabled={checkErrMass || checkErrPrice}
              onClick={handleBuyCoso}
              className="buy-button"
            >
              Mua
            </button>
            <button
              disabled={checkErrMass || checkErrPrice}
              onClick={handleSellCoso}
              className="sell-button"
            >
              Bán
            </button>
          </div>
        </div>
        <div
          style={{ width: '100%', paddingBottom: '20px', paddingTop: '12px' }}
        >
          <div style={{ margin: '4px' }} className="s-lnh-wrapper">
            <div className="s-lnh">MỨC GIÁ</div>
          </div>
          <ReactECharts
            option={options}
            style={{
              height: '1059px',
              width: '100%',
            }}
            // notMerge={true}
            // lazyUpdate={true}
            // theme={'theme_name'}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={}
          />
        </div>
      </div>
    </div>
  );
};
const CongCuChiBao: FC<any> = ({
  activeTab,
  curTab,
  setCurTab,
  setActiveTab,
  trendingLine,
  api,
  contextHolder,
  listMatch,
  options,
  bgColors,
  lastOrder,
  isFloor,
  isCeiling,
  listMatchOrder,
  totalBuyVol,
  totalSellVol,
  totalVol,
  symbolInfo,
  symbolTongHopInfo,
  optionInformation,
  accountInfo,
  setBalance,
  balance,
  token,
  screenMode,
  user,
  setTrendingLine,
  getPortfolio,
}) => {
  const [sendFriends, setSendFriends] = useState([]);
  const toggleTab = (item) => {
    if (activeTab === item) {
      setActiveTab(null); // Nếu 'congCu' đang active, set nó về null để "tắt" tab
    } else {
      setActiveTab(item); // Nếu 'congCu' không active, set nó thành 'congCu' để "bật" tab
    }
  };
  const isItemInArray = (item) => sendFriends.includes(item);
  const handleCheckSend = (item) => {
    setSendFriends((prev) => {
      const isExisting = prev.includes(item);
      if (isExisting) {
        return prev.filter((currentItem) => currentItem !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className="frame-parent256">
      {activeTab === 'thongTin' && (
        <ThongKe
          screenMode={screenMode}
          symbolInfo={symbolInfo}
          lastOrder={lastOrder}
          optionInformation={optionInformation}
          symbolTongHopInfo={symbolTongHopInfo}
          curTab={curTab}
          bgColors={bgColors}
          isFloor={isFloor}
          isCeiling={isCeiling}
          listMatchOrder={listMatchOrder}
          totalBuyVol={totalBuyVol}
          totalSellVol={totalSellVol}
          totalVol={totalVol}
          options={options}
        />
      )}

      {activeTab === 'chiTiet' && (
        <Detail
          screenMode={screenMode}
          symbolInfo={symbolInfo}
          curTab={curTab}
          bgColors={bgColors}
          lastOrder={lastOrder}
          isFloor={isFloor}
          isCeiling={isCeiling}
          listMatchOrder={listMatchOrder}
          totalBuyVol={totalBuyVol}
          totalSellVol={totalSellVol}
          options={options}
        />
      )}

      {activeTab === 'giaoDichAo' && (
        <VirtualTransactions
          screenMode={screenMode}
          contextHolder={contextHolder}
          api={api}
          balance={balance}
          setBalance={setBalance}
          token={token}
          accountInfo={accountInfo}
          symbolInfo={symbolInfo}
          lastOrder={lastOrder}
          options={options}
          getPortfolio={getPortfolio}
        />
      )}
    </div>
  );
};

const ChartTopBar: FC<any> = ({
  listTabs,
  onChangeTab,
  addNewTab,
  onRemoveTab,
  onHoverTab,
  onMouseLeaveTab,
  screenMode,
}) => {
  return (
    <div className="frame-parent216">
      <div className="frame-parent217">
        <div className="frame-parent218">
          {listTabs?.map((item: any, index: any) => {
            return (
              <div
                onMouseOver={() => {
                  onHoverTab(index);
                }}
                onMouseLeave={() => {
                  onMouseLeaveTab(index);
                }}
                key={index}
                className={
                  item?.isPicked
                    ? 'vuesaxlinearchart-container'
                    : 'vuesaxlinearchart-parent'
                }
                onClick={() => {
                  onChangeTab(index);
                }}
              >
                <div className="rectangle-parent">
                  {item?.isPicked ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 22H21"
                        stroke={screenMode === 'dark' ? '#fff' : '#333'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z"
                        stroke={screenMode === 'dark' ? '#fff' : '#333'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.8002 5.19043H11.2002C10.6502 5.19043 10.2002 5.64043 10.2002 6.19043V18.0004C10.2002 18.5504 10.6502 19.0004 11.2002 19.0004H12.8002C13.3502 19.0004 13.8002 18.5504 13.8002 18.0004V6.19043C13.8002 5.64043 13.3502 5.19043 12.8002 5.19043Z"
                        stroke={screenMode === 'dark' ? '#fff' : '#333'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
                        stroke={screenMode === 'dark' ? '#fff' : '#333'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 22H21"
                        stroke={screenMode === 'dark' ? '#abb3bf' : '#a3a09b'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z"
                        stroke={screenMode === 'dark' ? '#abb3bf' : '#a3a09b'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.8002 5.19043H11.2002C10.6502 5.19043 10.2002 5.64043 10.2002 6.19043V18.0004C10.2002 18.5504 10.6502 19.0004 11.2002 19.0004H12.8002C13.3502 19.0004 13.8002 18.5504 13.8002 18.0004V6.19043C13.8002 5.64043 13.3502 5.19043 12.8002 5.19043Z"
                        stroke={screenMode === 'dark' ? '#abb3bf' : '#a3a09b'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
                        stroke={screenMode === 'dark' ? '#abb3bf' : '#a3a09b'}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <div className="volume">
                  {item?.symbol} ({item?.resolution})
                </div>
                <div
                  style={{
                    visibility:
                      item?.isPicked || item?.isHover ? 'visible' : 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTab(index);
                  }}
                  className="edit-path"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.15411 7L13.9578 0.281288C14.0551 0.169632 13.9733 0 13.8229 0H12.0586C11.9547 0 11.8552 0.045092 11.7867 0.122393L7 5.66442L2.21332 0.122393C2.147 0.045092 2.0475 0 1.94138 0H0.177052C0.0267085 0 -0.0550963 0.169632 0.0421849 0.281288L5.84589 7L0.0421849 13.7187C0.020393 13.7436 0.00641268 13.774 0.00190318 13.8064C-0.00260632 13.8388 0.00254441 13.8717 0.0167444 13.9014C0.0309444 13.931 0.0535972 13.956 0.0820128 13.9735C0.110428 13.991 0.143414 14.0002 0.177052 14H1.94138C2.04529 14 2.14479 13.9549 2.21332 13.8776L7 8.33558L11.7867 13.8776C11.853 13.9549 11.9525 14 12.0586 14H13.8229C13.9733 14 14.0551 13.8304 13.9578 13.7187L8.15411 7Z"
                      fill={screenMode === 'dark' ? '#fff' : '#333'}
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <div className="iconoutlinedsuggestedplus-parent">
          <div
            className="edit-path"
            onClick={() => {
              addNewTab();
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.29688 0.5625H9.70312C9.82812 0.5625 9.89062 0.625 9.89062 0.75V17.25C9.89062 17.375 9.82812 17.4375 9.70312 17.4375H8.29688C8.17188 17.4375 8.10938 17.375 8.10938 17.25V0.75C8.10938 0.625 8.17188 0.5625 8.29688 0.5625Z"
                fill={screenMode === 'dark' ? '#fff' : '#a3a09b'}
              />
              <path
                d="M1.125 8.10938H16.875C17 8.10938 17.0625 8.17188 17.0625 8.29688V9.70312C17.0625 9.82812 17 9.89062 16.875 9.89062H1.125C1 9.89062 0.9375 9.82812 0.9375 9.70312V8.29688C0.9375 8.17188 1 8.10938 1.125 8.10938Z"
                fill={screenMode === 'dark' ? '#fff' : '#a3a09b'}
              />
            </svg>
          </div>

          <div className="edit-path">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.79682 2.53901L4.82573 1.5101C4.85051 1.4852 4.86781 1.45384 4.87565 1.41959C4.88349 1.38534 4.88157 1.34957 4.87009 1.31636C4.85861 1.28315 4.83805 1.25383 4.81073 1.23173C4.78341 1.20963 4.75045 1.19564 4.71557 1.19135L0.960884 0.748384C0.841353 0.734322 0.738228 0.835103 0.75229 0.956978L1.19526 4.71167C1.21401 4.86635 1.40385 4.93198 1.51401 4.82182L2.53823 3.7976L5.67182 6.92885C5.74448 7.00151 5.86401 7.00151 5.93667 6.92885L6.93042 5.93745C7.00307 5.86479 7.00307 5.74526 6.93042 5.6726L3.79682 2.53901ZM12.0632 6.92885C12.1359 7.00151 12.2554 7.00151 12.3281 6.92885L15.4617 3.7976L16.4859 4.82182C16.5108 4.84661 16.5422 4.8639 16.5764 4.87174C16.6107 4.87959 16.6464 4.87766 16.6796 4.86618C16.7128 4.85471 16.7422 4.83414 16.7643 4.80682C16.7864 4.77951 16.8003 4.74654 16.8046 4.71167L17.2476 0.959322C17.2617 0.83979 17.1609 0.736666 17.039 0.750728L13.2843 1.1937C13.1296 1.21245 13.064 1.40229 13.1742 1.51245L14.2031 2.54135L11.0695 5.67026C11.0346 5.7055 11.015 5.75309 11.015 5.80268C11.015 5.85227 11.0346 5.89986 11.0695 5.9351L12.0632 6.92885ZM16.8046 13.2851C16.7859 13.1304 16.596 13.0648 16.4859 13.1749L15.4617 14.1992L12.3281 11.0679C12.2928 11.033 12.2452 11.0134 12.1956 11.0134C12.1461 11.0134 12.0985 11.033 12.0632 11.0679L11.0695 12.0593C11.0346 12.0946 11.015 12.1422 11.015 12.1917C11.015 12.2413 11.0346 12.2889 11.0695 12.3242L14.2031 15.4578L13.1742 16.4867C13.1494 16.5116 13.1321 16.5429 13.1242 16.5772C13.1164 16.6114 13.1183 16.6472 13.1298 16.6804C13.1413 16.7136 13.1618 16.7429 13.1892 16.765C13.2165 16.7871 13.2494 16.8011 13.2843 16.8054L17.039 17.2484C17.1585 17.2624 17.2617 17.1617 17.2476 17.0398L16.8046 13.2851ZM5.93667 11.0679C5.90142 11.033 5.85384 11.0134 5.80424 11.0134C5.75465 11.0134 5.70706 11.033 5.67182 11.0679L2.53823 14.1992L1.51401 13.1749C1.4891 13.1502 1.45774 13.1329 1.42349 13.125C1.38924 13.1172 1.35348 13.1191 1.32027 13.1306C1.28706 13.1421 1.25774 13.1626 1.23564 13.1899C1.21354 13.2173 1.19955 13.2502 1.19526 13.2851L0.75229 17.0374C0.738228 17.157 0.839009 17.2601 0.960884 17.246L4.71557 16.8031C4.87026 16.7843 4.93588 16.5945 4.82573 16.4843L3.79682 15.4578L6.93042 12.3265C7.00307 12.2539 7.00307 12.1343 6.93042 12.0617L5.93667 11.0679Z"
                fill={screenMode === 'dark' ? '#fff' : '#a3a09b'}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chart;
