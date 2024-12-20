/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import obama_budget_2012 from '@/data/obama_budget_proposal_2012.json';
import { getNews, getNewsType } from '@/services/servicesApi/serviceApi';
import { IFeaturedPost } from '@/types/postsType';
import { Flex, Tooltip } from 'antd';
import arrow_up_green from '@assets/icons/arrow_up_green.png';
import arrow_down_red from '@assets/icons/arrow_down_red.png';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoIosTrendingUp } from 'react-icons/io';
import { StyledNews } from './styled';
import { calc } from 'antd/es/theme/internal';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { config } from '@/config/env';
import { CarouselPost } from '@/components/Carousel';
import moment from 'moment';
import logo from '@assets/logo/Logo.svg';
import qr from '@assets/logo/qr.svg';
import appStore from '@assets/images/appStore.png';
import chplay from '@assets/images/chplay.png';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from '@ant-design/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {
  convertNumberToFormattedString,
  formatNumber,
  formatNumberWithCommas,
  formatToBillion,
} from '@/components/ConvertNumber';
import { Link, useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import ChildPostNews from './ChildPostNews/ChildPostNews';
import { groupBy } from 'lodash';
import { FooterNews } from './FooterNews/FooterNews';
import { HeaderNews } from './HeaderNews/HeaderNews';
import axios from 'axios';
import { convertDateToISO } from '@/components/ConvertDate';

const NewsList = () => {
  const screenMode = useSelector(screenModeSelector);

  const [showMore, setShowMore] = useState(false);
  const [news, setNews] = useState<IFeaturedPost[]>([]);
  const next = useNavigate();
  useEffect(() => {
    getNews().then((res) => {
      setNews(res.data.data);
    });
    window.scrollTo(0, 0);
  }, []);
  const [dataThanhKhoanYesterday, setDataThanhKhoanYesterday] = useState<any>(
    []
  );
  const [dataThanhKhoanToday, setDataThanhKhoanToday] = useState<any>([]);
  const [tabActive, setTabActive] = useState('');
  const [valueVNINDEX, setValueVNINDEX] = useState([]);
  const [valueHNX, setValueHNX] = useState([]);
  const [valueUPCOM, setValueUPCOM] = useState([]);
  const [listGiaVang, setListGiaVang] = useState([]);

  const [timelineData, setTimelineData] = useState<any>([]);

  const [downCount, setDownCount] = useState(null);
  const intervalRef = useRef(null);
  const [listNuocNgoai, setListNuocNgoai] = useState([
    {
      name: 'USD/VND',
      value: '24,655.0',
      high: '24,655.0',
      low: '24,655.0',
      change: '+15.0',
      percent: '+0.06%',
      time: '15:03:17',
      pid: '1062753',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'Dow Jones',
      value: '38,654.42',
      high: '38,783.62',
      low: '38,336.57',
      change: '+134.58',
      percent: '+0.35%',
      time: '02/02',
      pid: '169',
      flag: 'https://cdn1.fialda.com/web/static/media/US.d6e2427c.svg',
    },
    {
      name: 'AEX',
      value: '822.53',
      high: '827.57',
      low: '821.69',
      change: '+0.44',
      percent: '+0.05%',
      time: '02/02',
      pid: '168',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/langvi-1500px-Flag_of_the_Netherlands.svg.png',
    },

    {
      name: 'Nasdaq',
      value: '15,628.95',
      high: '15,664.21',
      low: '15,366.78',
      change: '+267.31',
      percent: '+1.74%',
      time: '02/02',
      pid: '14958',
      flag: 'https://cdn1.fialda.com/web/static/media/US.d6e2427c.svg',
    },
    {
      name: 'S&P 500',
      value: '4,958.61',
      high: '4,975.29',
      low: '4,907.99',
      change: '+52.42',
      percent: '+1.07%',
      time: '02/02',
      pid: '166',
      flag: 'https://cdn1.fialda.com/web/static/media/US.d6e2427c.svg',
    },
    {
      name: 'Hang Seng',
      value: '15,533.56	',
      high: '15,912.61',
      low: '15,435.85	',
      change: '-32.65',
      percent: '-0.21%',
      time: '02/02',
      pid: '179',
      flag: 'https://cdn1.fialda.com/web/static/media/HK.61f78ccf.svg',
    },
    {
      name: 'Nikkei 225',
      value: '36,158.02',
      high: '36,450.00',
      low: '36,090.00',
      change: '-109.71',
      percent: '-0.30%',
      time: '02/02',
      pid: '178',
      flag: 'https://cdn1.fialda.com/web/static/media/JP.2d595f3f.svg',
    },
    {
      name: 'IBEX 35',
      value: '10,062.50',
      high: '10,132.80',
      low: '10,033.70',
      change: '+48.50',
      percent: '+0.48%',
      time: '02/02',
      pid: '174',
      flag: 'https://vietkieu.com.vn/wp-content/uploads/2020/01/y-nghia-cua-la-co-tay-ban-nha-va-cac-bieu-tuong-3.jpg',
    },
    {
      name: 'SMI',
      value: '11,239.68	',
      high: '11,300.86',
      low: '11,231.49',
      change: '+25.77',
      percent: '+0.23%',
      time: '02/02',
      pid: '176',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
    },
    {
      name: 'Shanghai',
      value: '2,730.15',
      high: '2,791.68',
      low: '2,666.33',
      change: '-40.59',
      percent: '-1.46%',
      time: '02/02',
      pid: '40820',
      flag: 'https://cdn1.fialda.com/web/static/media/CN.e9b8b9a7.svg',
    },
    {
      name: 'S&P/ASX 200',
      value: '7,699.40',
      high: '7,703.60',
      low: '7,588.20',
      change: '+111.20',
      percent: '+1.47%',
      time: '02/02',
      pid: '171',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
    },
    {
      name: 'HNX30',
      value: '493.24',
      high: '493.24',
      low: '493.24',
      change: '-0.44',
      percent: '-0.09%',
      time: '02/02',
      pid: '995072',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'VN30',
      value: '1,174.76',
      high: '1,174.76',
      low: '1,174.76',
      change: '+1.41',
      percent: '+0.12%',
      time: '14:58:33',
      pid: '41064',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'VNI',
      value: '1,172.55',
      high: '1,172.55',
      low: '1,172.55',
      change: '-0.47',
      percent: '-0.04%',
      time: '02/02',
      pid: '41063',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'HNX',
      value: '230.56',
      high: '230.56',
      low: '230.56',
      change: '-0.01',
      percent: '-0.01%',
      time: '02/02',
      pid: '41062',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'VN100',
      value: '1,179.49',
      high: '1,179.49',
      low: '1,179.49',
      change: '+1.04',
      percent: '+0.09%',
      time: '02/02',
      pid: '995068',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'FTSE MIB',
      value: '	30,717.95',
      high: '30,913.07',
      low: '30,684.18',
      change: '+28.84',
      percent: '+0.09%',
      time: '19/01',
      pid: '951248',
      flag: 'https://vietkieu.com.vn/wp-content/uploads/2020/01/y-nghia-cua-la-co-tay-ban-nha-va-cac-bieu-tuong-3.jpg',
    },
    {
      name: 'DAX',
      value: '16,918.21',
      high: '17,004.55',
      low: '16,894.67',
      change: '+59.17',
      percent: '+0.35%',
      time: '02/02',
      pid: '172',
      flag: 'https://cdn1.fialda.com/web/static/media/DE.22d50712.svg',
    },
    {
      name: 'Euro Stoxx 50',
      value: '4,655.15',
      high: '4,675.75',
      low: '4,648.95',
      change: '++16.55',
      percent: '+0.36%',
      time: '02/02',
      pid: '175',
      flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBSHS8rB7zceKYAhKOPMiJ2eUZq4NwkUNJw&usqp=CAU',
    },
  ]);
  const getVNINDEX = async (symbol, from, to) => {
    try {
      const response = await axios.get(
        `${config.chart.VITE_REACT_CHART}/history`,
        {
          params: {
            symbol: symbol,
            resolution: '1D',
            from,
            to,
            countback: 2,
          },
        }
      );
      if (symbol === 'VNINDEX') {
        setValueVNINDEX(response.data.c);
      } else if (symbol === 'HNX') {
        setValueHNX(response.data.c);
      } else if (symbol === 'UPCOM') {
        setValueUPCOM(response.data.c);
      }
    } catch (error) {
      console.error('Error fetching VNINDEX:', error);
    }
  };

  useEffect(() => {
    const interval = 10000;

    const fetchData = () => {
      const to = moment().unix(); // Thời gian hiện tại (Unix timestamp in seconds)
      const from = moment().subtract(10, 'days').unix(); // 10 ngày trước (Unix timestamp in seconds)

      getVNINDEX('VNINDEX', from, to);
      getVNINDEX('HNX', from, to);
      getVNINDEX('UPCOM', from, to);
    };

    // Gọi ngay lần đầu tiên khi component được mount
    fetchData();

    // Thiết lập interval để gọi fetchData mỗi 5 giây
    intervalRef.current = setInterval(fetchData, interval);

    // Cleanup function để dọn dẹp interval khi component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  useEffect(() => {
    getThanhKhoan('hose');
    getThannhKhoanHistory('hose');
    getGiaVang();
  }, []);
  const getThannhKhoanHistory = async (type: any) => {
    // const responseThanhKhoan = await axios.get(
    //   `${config.app.VITE_APP_API_URL}/thanh_khoan_history/${type}`
    // );
    //if today is first day of week then get data from last friday
    let previousDate = '';
    const today = moment().format('e');
    if (today === '1') {
      previousDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
    }
    if (today === '5' || today === '6' || today === '0') {
      previousDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    }
    if (today === '2' || today === '3' || today === '4') {
      previousDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    }
    // const previousDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const thanhKhoanSan = type === 'hose' ? 'VNINDEX' : 'HNX';

    const responseThanhKhoan = await axios.get(
      // `https://api-finfo.vndirect.com.vn/v4/index_intraday_histories?sort=time:asc&q=code:${thanhKhoanSan}~tradingDate:${previousDate}&fields=tradingDate_Time,accumulatedVal&size=100000`
      `${config.app.VITE_APP_API_URL}/thanh_khoan_data/historical/${type}`
    );
    const dataThanhKhoan = responseThanhKhoan?.data?.data;
    // const dataThanhKhoan = [];
    setDataThanhKhoanYesterday(dataThanhKhoan);
    const listTimeLine = dataThanhKhoan?.map((item: any, index: number) => {
      return moment(item?.tradingDate_Time).format('HH:mm');
    });
    if (listTimeLine.length > 0) setTimelineData(listTimeLine);
  };
  const getThanhKhoan = async (type: any) => {
    // const responseThanhKhoan = await axios.get(
    //   `${config.app.VITE_APP_API_URL}/thanh_khoan/${type}`
    // );
    const thanhKhoanSan = type === 'hose' ? 'VNINDEX' : 'HNX';
    const responseThanhKhoan = await axios.get(
      // `https://api-finfo.vndirect.com.vn/v4/index_intraday_latest?sort=time:asc&q=code:${thanhKhoanSan}&fields=tradingDate_Time,accumulatedVal&size=100000`
      `${config.app.VITE_APP_API_URL}/thanh_khoan_data/current/${type}`
    );
    const dataThanhKhoan = responseThanhKhoan?.data?.data;
    // const dataThanhKhoan = [];
    if (dataThanhKhoan.length > 0) setDataThanhKhoanToday(dataThanhKhoan);
  };
  const chungKhoan = news.filter(
    (item) =>
      item.type === 'Chứng khoán' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const batDongSan = news.filter(
    (item) =>
      item.type === 'Bất động sản' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const taiChinh = news.filter(
    (item) =>
      item.type === 'Tài chính' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const nganHang = news.filter(
    (item) =>
      item.type === 'Ngân hàng' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const kinhTeVietNam = news.filter(
    (item) =>
      item.type === 'Kinh tế việt nam' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const macroNews = news.filter(
    (item) =>
      item.type === 'Vĩ mô' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const xaHoi = news.filter(
    (item) =>
      item.type === 'Xã hội' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const entrepreneurNews = news.filter(
    (item) =>
      item.type === 'Doanh nhân' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const khoiNghiep = news.filter(
    (item) =>
      item.type === 'Khởi nghiệp' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const kinhTeQuocTe = news.filter(
    (item) =>
      item.type === 'Kinh tế quốc tế' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );

  const nextLink = (item: any) => {
    next(
      `/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`,
      { state: { item } }
    );
  };
  const option = {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      width: null,
      height: 116,
    },

    title: {
      text: null,
    },

    xAxis: {
      allowDecimals: false,
      accessibility: {
        rangeDescription: null,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      pointFormat:
        '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>' +
        'warheads in {point.x}',
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: 'USA',
        data: [
          null,
          null,
          null,
          null,
          null,
          2,
          9,
          13,
          50,
          170,
          299,
          438,
          841,
          1169,
          1703,
          2422,
          3692,
          5543,
          7345,
          12298,
          18638,
          22229,
          25540,
          28133,
          29463,
          31139,
          31175,
          31255,
          29561,
          27552,
          26008,
          25830,
          26516,
          27835,
          28537,
          27519,
          25914,
          25542,
          24418,
          24138,
          24104,
          23208,
          22886,
          23305,
          23459,
          23368,
          23317,
          23575,
          23205,
          22217,
          21392,
          19008,
          13708,
          11511,
          10979,
          10904,
          11011,
          10903,
          10732,
          10685,
          10577,
          10526,
          10457,
          10027,
          8570,
          8360,
          7853,
          5709,
          5273,
          5113,
          5066,
          4897,
          4881,
          4804,
          4717,
          4571,
          4018,
          3822,
          3785,
          3805,
          3750,
          3708,
          3708,
          3708,
          3708,
        ],
      },
    ],
  };
  function formatGoldPrice(number: number) {
    return formatNumberWithCommas(number / 1000);
  }

  function getLevelOption() {}
  // myChart.hideLoading();
  const visualMin = -100;
  const visualMax = 100;
  const visualMinBound = -40;
  const visualMaxBound = 40;
  convertData(obama_budget_2012);
  function convertData(originList: any) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < originList.length; i++) {
      const node = originList[i];
      if (node) {
        const value = node.value;
        value[2] != null && value[2] < min && (min = value[2]);
        value[2] != null && value[2] > max && (max = value[2]);
      }
    }
    for (let i = 0; i < originList.length; i++) {
      const node = originList[i];
      if (node) {
        const value = node.value;
        // Scale value for visual effect
        if (value[2] != null && value[2] > 0) {
          value[3] = echarts.number.linearMap(
            value[2],
            [0, max],
            [visualMaxBound, visualMax],
            true
          );
        } else if (value[2] != null && value[2] < 0) {
          value[3] = echarts.number.linearMap(
            value[2],
            [min, 0],
            [visualMin, visualMinBound],
            true
          );
        } else {
          value[3] = 0;
        }
        if (!isFinite(value[3])) {
          value[3] = 0;
        }
        if (node.children) {
          convertData(node.children);
        }
      }
    }
  }

  function isValidNumber(num: any) {
    return num != null && isFinite(num);
  }

  const dataThanhKhoanTodayMap = dataThanhKhoanToday?.map(
    (item: any) => item.accumulatedVal
  );
  const dataThanhKhoanYesterdayMap = dataThanhKhoanYesterday?.map(
    (item: any) => item.accumulatedVal
  );

  const dataForChart = dataThanhKhoanToday.map((item) => {
    // Tạo đối tượng Date từ chuỗi ngày giờ
    const date = new Date(item.tradingDate_Time.replace(/-/g, '/'));

    const utcDate = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
    const adjustedForTimezone = utcDate + 0 * 3600 * 1000; // Thêm 7 giờ vào timestamp
    return [adjustedForTimezone, item.accumulatedVal];
  });

  const dataForChartYesterday = dataThanhKhoanYesterday.map((item) => {
    // Tạo đối tượng Date từ chuỗi ngày giờ
    const date = new Date(item.tradingDate_Time.replace(/-/g, '/'));

    // Chuyển ngày giờ sang UTC và điều chỉnh múi giờ +7
    const utcDate = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
    const adjustedForTimezone = utcDate + 0 * 3600 * 1000; // Thêm 7 giờ vào timestamp

    return [adjustedForTimezone, item.accumulatedVal];
  });
  // Hàm điều chỉnh timestamp về cùng một ngày chuẩn
  const adjustTimestampToSameDay = (data, baseDate) => {
    const baseTime = new Date(baseDate).getTime();
    return data.map(([timestamp, value]) => {
      const date = new Date(timestamp);
      const adjustedTime =
        baseTime +
        (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) *
          1000;
      return [adjustedTime, value];
    });
  };

  // Ngày chuẩn để điều chỉnh tất cả thời gian về
  const baseDate = '2024-06-21T16:45:00Z';

  // Điều chỉnh cả hai mảng dữ liệu
  const dataForChartAdjusted = adjustTimestampToSameDay(dataForChart, baseDate);
  const dataForChartYesterdayAdjusted = adjustTimestampToSameDay(
    dataForChartYesterday,
    baseDate
  );
  const getGiaVang = async () => {
    const responseGiaVang = await axios.get(
      `${config.app.VITE_APP_API_URL}/giaVang`
    );
    const dataGiaVang = responseGiaVang?.data?.data;
    setListGiaVang(dataGiaVang);
  };
  const normalizeData = (data, isYesterday) => {
    const today = moment();
    let addDays = 0;
    let addDayToday = 0;
    switch (today.day()) {
      case 1: // Monday
        addDays = 3;
        addDayToday = 0;
        break;
      case 0: // Sunday
        addDays = 1;
        addDayToday = 0;
        break;
      case 6: // Saturday
        addDays = 2;
        addDayToday = 1;
        break;
      default: // Tuesday, Wednesday, Thursday, Friday
        addDays = 1;
        addDayToday = 0;
    }
    return data.map((item) => ({
      ...item,
      tradingDate_Time: isYesterday
        ? moment(item.tradingDate_Time)
            ?.add(addDays, 'days')
            .format('YYYY-MM-DD HH:mm:ss')
        : moment(item.tradingDate_Time)
            ?.add(addDayToday, 'days')
            .format('YYYY-MM-DD HH:mm:ss'), // Định dạng lại thời gian
    }));
  };

  const normalizedDataToday = normalizeData(dataThanhKhoanToday, false);

  const normalizedDataYesterday = normalizeData(dataThanhKhoanYesterday, true);

  const optionThanh = {
    dataset: [
      {
        id: 'dataset_today',
        source: normalizedDataToday.map((item) => [
          convertDateToISO(item?.tradingDate_Time),
          item?.accumulatedVal,
        ]),
      },
      {
        id: 'dataset_yesterday',
        source: normalizedDataYesterday.map((item) => [
          convertDateToISO(item.tradingDate_Time),
          item.accumulatedVal,
        ]),
      },
    ],
    title: {
      text: null,
    },
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          show: false,
        },
      },
      formatter: function (params) {
        const date = params[0].value[0];
        const formattedDate = moment(date).format('DD/MM/YYYY HH:mm');
        const seriesValues = params.map((data) => {
          const value = convertNumberToFormattedString(
            parseFloat(data.value[1])
          );

          return `${data.seriesName}: <span style="font-weight:600;">${value}</span>`;
        });
        return `${formattedDate}<br/>${seriesValues.join('<br/>')}`;
      },
    },
    // legend: {
    //   data: ['Hôm nay', 'Hôm qua'],
    //   textStyle: {
    //     color: screenMode === 'dark' ? '#fff' : '#000',
    //   },
    //   visible: false,
    // },
    xAxis: {
      type: 'time',
      nameLocation: 'middle',
      nameGap: 30,
      // Hide the x-axis labels
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false, // Optional: Hide x-axis ticks
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: screenMode === 'dark' ? ' #3a3f42' : ' #ccc',
        },
      },
    },

    yAxis: {
      type: 'value',
      name: null, // Optional: Set a name if needed
      axisLine: {
        show: true, // Ensure the axis line is visible
        lineStyle: {
          color: screenMode === 'dark' ? '#30323B' : '#D0D2D8', // Dynamic color based on screen mode
        },
      },
      axisLabel: {
        color: screenMode === 'dark' ? '#ABADBA' : '#565B67', // Dynamic color based on screen mode
        fontSize: 8, // (Tùy chọn) Thay đổi kích thước font chữ
        fontWeight: '400',
        fontFamily: 'Roboto Flex',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: screenMode === 'dark' ? ' #3a3f42' : ' #ccc',
        },
      },
    },

    grid: {
      left: 50,
      right: 0,
      top: 30,
      bottom: 30,
    },
    series: [
      {
        animation: false,
        name: 'Hôm qua',
        type: 'line',
        datasetId: 'dataset_yesterday',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: screenMode === 'dark' ? '#D19B49' : '#E6B34C', // Màu của đường
        },
        areaStyle: {
          color: screenMode === 'dark' ? '#D19B49' : '#E6B34C', // Màu nền dưới đường
          opacity: 0.1,
        },
        z: 3,
      },
      {
        animation: false,
        name: 'Hôm nay',
        type: 'line',
        datasetId: 'dataset_today',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: screenMode === 'dark' ? '#4B9B63' : '#589B4B', // Màu của đường
          width: 2, // Độ dày đường
        },
        areaStyle: {
          color: screenMode === 'dark' ? '#4B9B63' : '#589B4B', // Màu nền dưới đường
          // width: '2px',
          // opacity: 0.3,
        },
        z: 3,
      },
    ],

    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  useEffect(() => {
    const ws = new WebSocket(
      'wss://streaming.forexpros.com/echo/416/os_yqv68/websocket'
    );
    ws.onopen = () => {
      // Send a message to the server indicating interest in a symbol
      const listCommodities = [
        // ...listHangHoa.map((item) => item.pid),
        ...listNuocNgoai.map((item) => item.pid),
      ];
      const message = listCommodities.map((item, index) => {
        if (index === listCommodities.length - 1)
          return `isOpenPair-${item}:%%pid-${item}:`;
        else return `isOpenPair-${item}:%%pid-${item}:%%`;
      });
      const messageStringify = message.join('');
      const dataStringify: string[] = [
        `{\"_event\":\"bulk-subscribe\",\"tzID\":110,\"message\":\"${message}\"}`,
      ];
      ws.send(dataStringify[0]);
    };
    ws.addEventListener('message', (event) => {
      if (event?.data === 'o') return;
      const parsedData = JSON.parse(event?.data.substring(1));
      const messageReceive = JSON.parse(parsedData[0]);
      const messageContent = messageReceive?.message.split('::');
      const id = messageContent[0];
      const content = messageContent[1];
      const contentParse = JSON.parse(content);
      // setListHangHoa((prev) => {
      //   let item = prev.find((item) => {
      //     return item.pid === contentParse?.pid;
      //   });
      //   if (!!item) {
      //     item.value = contentParse?.last;
      //     item.change = contentParse?.pc;
      //     item.percent = contentParse?.pcp;
      //   }
      //   return [...prev];
      // });
      setListNuocNgoai((prev) => {
        const item = prev.find((item) => {
          return item.pid === contentParse?.pid;
        });
        if (!!item) {
          item.value = contentParse?.last;
          item.change = contentParse?.pc;
          item.percent = contentParse?.pcp;
        }
        return [...prev];
      });
      //   if (contentParse?.pid === "8830") {
      //     setListHangHoa((prev) => {
      //       let item = prev.find((item) => {
      //         return item.pid === contentParse?.pid;
      //       });
      //       item.value = contentParse?.last;
      //       item.change = contentParse?.pc;
      //       item.percent = contentParse?.pcp;
      //       return [...prev];
      //     });
      //   }
    });
  }, []);

  return (
    <StyledNews screen_mode={screenMode}>
      <HeaderNews />
      <Flex
        style={{
          // flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            // maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            flex: 1,
            gap: '16px',
            // background: "#F4F4F4",
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Flex vertical gap={16}>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexDirection: 'column',
                  }}
                >
                  <div className="stock-box">
                    <div className="item-stock">
                      <div className="symbol">VnIndex</div>
                      <div className="numbers">
                        <div className="number1">
                          {valueVNINDEX[valueVNINDEX?.length - 1]?.toFixed(2)}
                        </div>
                        <div
                          style={{
                            color:
                              screenMode === 'dark'
                                ? valueVNINDEX[valueVNINDEX?.length - 1] -
                                  valueVNINDEX[valueVNINDEX?.length - 2]
                                  ? '#D15449'
                                  : '#5CD680'
                                : valueVNINDEX[valueVNINDEX?.length - 1] -
                                    valueVNINDEX[valueVNINDEX?.length - 2]
                                  ? '#A33929'
                                  : '#45783A',
                          }}
                          className="number2"
                        >
                          {(
                            valueVNINDEX[valueVNINDEX?.length - 1] -
                            valueVNINDEX[valueVNINDEX?.length - 2]
                          )?.toFixed(2)}
                          (
                          {(
                            ((valueVNINDEX[valueVNINDEX?.length - 1] -
                              valueVNINDEX[valueVNINDEX?.length - 2]) /
                              valueVNINDEX[valueVNINDEX?.length - 2]) *
                            100
                          )?.toFixed(2)}
                          )
                        </div>
                      </div>
                    </div>
                    <div className="item-stock">
                      <div className="symbol">Hnx</div>
                      <div className="numbers">
                        <div className="number1">
                          {valueHNX[valueHNX?.length - 1]?.toFixed(2)}
                        </div>
                        <div
                          style={{
                            color:
                              screenMode === 'dark'
                                ? valueHNX[valueHNX?.length - 1] -
                                  valueHNX[valueHNX?.length - 2]
                                  ? '#D15449'
                                  : '#5CD680'
                                : valueHNX[valueHNX?.length - 1] -
                                    valueHNX[valueHNX?.length - 2]
                                  ? '#A33929'
                                  : '#45783A',
                          }}
                          className="number2"
                        >
                          {(
                            valueHNX[valueHNX?.length - 1] -
                            valueHNX[valueHNX?.length - 2]
                          )?.toFixed(2)}
                          (
                          {(
                            ((valueHNX[valueHNX?.length - 1] -
                              valueHNX[valueHNX?.length - 2]) /
                              valueHNX[valueHNX?.length - 2]) *
                            100
                          )?.toFixed(2)}
                          )
                        </div>
                      </div>
                    </div>{' '}
                    <div className="item-stock">
                      <div className="symbol">UPCom</div>
                      <div className="numbers">
                        <div className="number1">
                          {valueUPCOM[valueUPCOM?.length - 1]?.toFixed(2)}
                        </div>
                        <div
                          style={{
                            color:
                              screenMode === 'dark'
                                ? valueUPCOM[valueUPCOM?.length - 1] -
                                    valueUPCOM[valueUPCOM?.length - 2] <
                                  0
                                  ? '#D15449'
                                  : '#5CD680'
                                : valueUPCOM[valueUPCOM?.length - 1] -
                                      valueUPCOM[valueUPCOM?.length - 2] <
                                    0
                                  ? '#A33929'
                                  : '#45783A',
                          }}
                          className="number2"
                        >
                          {(
                            valueUPCOM[valueUPCOM?.length - 1] -
                            valueUPCOM[valueUPCOM?.length - 2]
                          )?.toFixed(2)}
                          (
                          {(
                            ((valueUPCOM[valueUPCOM?.length - 1] -
                              valueUPCOM[valueUPCOM?.length - 2]) /
                              valueUPCOM[valueUPCOM?.length - 2]) *
                            100
                          )?.toFixed(2)}
                          )
                        </div>
                      </div>
                    </div>
                    {listNuocNgoai
                      .filter(
                        (item) =>
                          item.name === 'Dow Jones' ||
                          item.name === 'Nikkei 225'
                      )
                      .map((el, index) => (
                        <div className="item-stock">
                          <div className="symbol">{el?.name}</div>
                          <div className="numbers">
                            <div className="number1">{el?.value}</div>
                            <div
                              style={{
                                color:
                                  screenMode === 'dark'
                                    ? el?.change < 0
                                      ? '#D15449'
                                      : '#5CD680'
                                    : el.change < 0
                                      ? '#A33929'
                                      : '#45783A',
                              }}
                              className="number2"
                            >
                              {el?.change}({el?.percent})
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="chart">
                      {' '}
                      <ReactECharts
                        style={{
                          height: '150px',
                          width: '100%',
                          position: 'absolute',
                          top: '-18px',
                          left: '-10px',
                        }}
                        option={optionThanh}
                      />
                    </div>
                    <div className="hot-stock">
                      {listNuocNgoai
                        .filter((item) => item.name === 'USD/VND')
                        .map((el, index) => (
                          <div className="children">
                            <div className="left">{el?.name}</div>
                            <div
                              style={{
                                color:
                                  screenMode === 'dark'
                                    ? el?.change < 0
                                      ? '#D15449'
                                      : '#5CD680'
                                    : el.change < 0
                                      ? '#A33929'
                                      : '#45783A',
                              }}
                              className="right"
                            >
                              {el?.value}
                              <svg
                                width="10"
                                height="11"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d={
                                    el?.change > 0
                                      ? 'M4.99955 0.655029L1.07705 4.57753C0.999679 4.6549 0.938305 4.74675 0.896432 4.84784C0.854559 4.94893 0.833008 5.05728 0.833008 5.1667C0.833008 5.27611 0.854559 5.38446 0.896432 5.48555C0.938305 5.58664 0.999679 5.67849 1.07705 5.75586C1.15442 5.83323 1.24627 5.89461 1.34736 5.93648C1.44845 5.97835 1.5568 5.9999 1.66622 5.9999C1.77563 5.9999 1.88398 5.97835 1.98507 5.93648C2.08616 5.89461 2.17801 5.83323 2.25538 5.75586L4.16622 3.84503V10.1667C4.16622 10.3877 4.25401 10.5997 4.41029 10.756C4.56657 10.9122 4.77854 11 4.99955 11C5.22056 11 5.43252 10.9122 5.5888 10.756C5.74508 10.5997 5.83288 10.3877 5.83288 10.1667V3.84503L7.74371 5.75586C7.82093 5.83352 7.91273 5.89514 8.01384 5.93719C8.11495 5.97924 8.22338 6.00089 8.33288 6.00089C8.44239 6.00089 8.55082 5.97924 8.65193 5.93719C8.75304 5.89514 8.84484 5.83352 8.92205 5.75586C9.07828 5.59959 9.16604 5.38767 9.16604 5.1667C9.16604 4.94573 9.07828 4.7338 8.92205 4.57753L4.99955 0.655029Z'
                                      : 'M4.9995 11.0003L8.922 7.07777C8.99937 7.0004 9.06074 6.90855 9.10261 6.80746C9.14449 6.70637 9.16604 6.59802 9.16604 6.48861C9.16604 6.37919 9.14449 6.27084 9.10261 6.16975C9.06074 6.06866 8.99937 5.97681 8.922 5.89944C8.84463 5.82207 8.75277 5.76069 8.65169 5.71882C8.5506 5.67695 8.44225 5.6554 8.33283 5.6554C8.22341 5.6554 8.11507 5.67695 8.01398 5.71882C7.91289 5.76069 7.82103 5.82207 7.74366 5.89944L5.83283 7.81027L5.83283 1.48861C5.83283 1.26759 5.74503 1.05563 5.58875 0.89935C5.43247 0.74307 5.22051 0.655273 4.9995 0.655273C4.77848 0.655273 4.56652 0.74307 4.41024 0.899351C4.25396 1.05563 4.16616 1.26759 4.16616 1.48861L4.16616 7.81027L2.25533 5.89944C2.17812 5.82179 2.08632 5.76016 1.98521 5.71811C1.8841 5.67606 1.77567 5.65441 1.66616 5.65441C1.55666 5.65441 1.44823 5.67606 1.34712 5.71811C1.24601 5.76016 1.15421 5.82179 1.077 5.89944C0.92077 6.05571 0.833008 6.26764 0.833008 6.48861C0.833008 6.70958 0.92077 6.9215 1.077 7.07777L4.9995 11.0003Z'
                                  }
                                  fill={
                                    el?.change > 0
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
                          </div>
                        ))}

                      {listGiaVang
                        ?.filter((item: any) => {
                          return (
                            item?.yesterday_buy !== null &&
                            item?.type_code !== 'XAUUSD' &&
                            item?.type_code !== 'USDX' &&
                            item?.type_code === 'SJHN'
                          );
                        })
                        .map((item: any, index: number) => {
                          const isUp =
                            +item?.buy >
                            +listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)[1]?.buy;
                          const isUpSell =
                            +item?.sell >
                            +listGiaVang
                              ?.filter((itemHistory: any) => {
                                return (
                                  item?.type_code === itemHistory?.type_code
                                );
                              })
                              ?.slice(1, 5)[1]?.sell;

                          return (
                            <div key={index} className="children">
                              <div className="left">SJC HÀ NỘI</div>
                              {item?.type_code !== 'XAUUSD' && (
                                <div
                                  style={{
                                    color: isUpSell
                                      ? screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A'
                                      : screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                  }}
                                  className="right"
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
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="box-header-news">
                    <div className="layout-header-news">
                      {news
                        .filter(
                          (el) =>
                            !!el.description &&
                            !!el?.image &&
                            !!el.type &&
                            el?.type === 'Chứng khoán'
                        )
                        .slice(0, 1)
                        .map((item, index) => (
                          <div
                            // to={`/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`}
                            onClick={() => nextLink(item)}
                            className="big-news"
                          >
                            <div className="css-1rxr2le eis2tu50">
                              <img
                                width="100%"
                                height="418.67px"
                                style={{
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                }}
                                src={item?.image}
                              />

                              <div className="css-0 e1ik1iw00">
                                <span
                                  style={{
                                    background:
                                      item?.type === 'Chứng khoán'
                                        ? '#633D36'
                                        : item?.type === 'Bất động sản'
                                          ? '#4D6336'
                                          : item?.type === 'Tài chính'
                                            ? '#737026'
                                            : item?.type === 'Ngân hàng'
                                              ? '#2E6B55'
                                              : item?.type ===
                                                  'Kinh tế Việt Nam'
                                                ? '#364263'
                                                : item?.type === 'Vĩ mô'
                                                  ? '#2B2A6F'
                                                  : item?.type === 'Xã hội'
                                                    ? '#422E6B'
                                                    : item?.type ===
                                                        'Doanh nhân'
                                                      ? '#582A6F'
                                                      : item?.type ===
                                                          'Khởi nghiệp'
                                                        ? '#6F2A58'
                                                        : '#50494A',
                                  }}
                                  className="css-1cn46a4 e8l300f0"
                                >
                                  {' '}
                                  {item?.type}
                                </span>
                                <h3 className="css-9t3nig e7j57mt0">
                                  <Tooltip title={item?.title}>
                                    <a
                                      className="title"
                                      style={{
                                        color:
                                          screenMode === 'dark'
                                            ? '#fff'
                                            : 'black',

                                        // lineHeight: '28px',
                                      }}
                                    >
                                      {item?.title?.length > 65
                                        ? `${item?.title?.slice(0, 65)}...`
                                        : item?.title}
                                    </a>
                                  </Tooltip>
                                </h3>
                                <p className="css-hv6hrz e7x1xmz0">
                                  {item?.description?.length > 270
                                    ? `${item?.description?.slice(0, 270)}...`
                                    : item?.description}
                                </p>
                                <div className="time">{item?.date}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="second-header">
                        <div className="news-child">
                          {news
                            .filter(
                              (el) =>
                                !!el.description &&
                                !!el?.image &&
                                !!el.type &&
                                el?.type === 'Bất động sản'
                            )
                            .slice(1, 2)
                            .map((item, index) => (
                              <div className="news-first">
                                <div
                                  onClick={() => nextLink(item)}
                                  // to={`/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`}
                                >
                                  <img
                                    width="100%"
                                    height="201.33px"
                                    style={{
                                      objectFit: 'cover',
                                      borderRadius: '6px',
                                    }}
                                    src={item?.image}
                                  />
                                </div>
                                <div
                                  style={{ objectFit: 'cover' }}
                                  onClick={() => nextLink(item)}
                                  className="info"
                                >
                                  <span
                                    style={{
                                      background:
                                        item?.type === 'Chứng khoán'
                                          ? '#633D36'
                                          : item?.type === 'Bất động sản'
                                            ? '#4D6336'
                                            : item?.type === 'Tài chính'
                                              ? '#737026'
                                              : item?.type === 'Ngân hàng'
                                                ? '#2E6B55'
                                                : item?.type ===
                                                    'Kinh tế Việt Nam'
                                                  ? '#364263'
                                                  : item?.type === 'Vĩ mô'
                                                    ? '#2B2A6F'
                                                    : item?.type === 'Xã hội'
                                                      ? '#422E6B'
                                                      : item?.type ===
                                                          'Doanh nhân'
                                                        ? '#582A6F'
                                                        : item?.type ===
                                                            'Khởi nghiệp'
                                                          ? '#6F2A58'
                                                          : '#50494A',
                                    }}
                                    className="type"
                                  >
                                    {' '}
                                    {item?.type}
                                  </span>
                                  <h3 className="gioithieu">
                                    <Tooltip title={item?.title}>
                                      <a
                                        className="title"
                                        style={{
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        }}
                                      >
                                        {item?.title?.length > 68
                                          ? `${item?.title?.slice(0, 68)}...`
                                          : item?.title}
                                      </a>
                                    </Tooltip>
                                  </h3>
                                  <p className="des">
                                    {item?.description?.length > 80
                                      ? `${item?.description?.slice(0, 80)}...`
                                      : item?.description}
                                  </p>
                                  <div className="time">{item?.date}</div>
                                </div>
                              </div>
                            ))}
                          {news
                            .filter(
                              (el) =>
                                !!el.description &&
                                !!el?.image &&
                                !!el.type &&
                                el?.type === 'Kinh tế việt nam'
                            )
                            .slice(2, 3)
                            .map((item, index) => (
                              <div
                                // to={`/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`}
                                className="news-second"
                                onClick={() => nextLink(item)}
                              >
                                <div className="info">
                                  <span
                                    style={{
                                      background:
                                        item?.type === 'Chứng khoán'
                                          ? '#633D36'
                                          : item?.type === 'Bất động sản'
                                            ? '#4D6336'
                                            : item?.type === 'Tài chính'
                                              ? '#737026'
                                              : item?.type === 'Ngân hàng'
                                                ? '#2E6B55'
                                                : item?.type ===
                                                    'Kinh tế Việt Nam'
                                                  ? '#364263'
                                                  : item?.type === 'Vĩ mô'
                                                    ? '#2B2A6F'
                                                    : item?.type === 'Xã hội'
                                                      ? '#422E6B'
                                                      : item?.type ===
                                                          'Doanh nhân'
                                                        ? '#582A6F'
                                                        : item?.type ===
                                                            'Khởi nghiệp'
                                                          ? '#6F2A58'
                                                          : '#50494A',
                                      marginTop: '15px',
                                    }}
                                    className="type"
                                  >
                                    {item?.type}
                                  </span>

                                  <h3 className="gioithieu">
                                    <Tooltip title={item?.title}>
                                      <a
                                        className="title"
                                        style={{
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : 'black',
                                        }}
                                      >
                                        {item?.title?.length > 68
                                          ? `${item?.title?.slice(0, 68)}...`
                                          : item?.title}
                                      </a>
                                    </Tooltip>
                                  </h3>

                                  <p className="des">
                                    {item?.description?.length > 60
                                      ? `${item?.description?.slice(0, 60)}...`
                                      : item?.description}
                                  </p>
                                  <div className="time">{item?.date}</div>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="hot-news">
                          <div className="content">
                            <h2 className="ds-section-headline">
                              Tin tức đáng chú ý
                            </h2>
                            <div className="e14rcxam0">
                              {news
                                // .filter((el) => !el.description)
                                .slice(0, 8)
                                .map((item, index) => (
                                  <div onClick={() => nextLink(item)}>
                                    <div className="icon">
                                      {' '}
                                      <svg
                                        width="16"
                                        height="14"
                                        viewBox="0 0 16 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M0.799805 1.00078C0.799805 0.752253 1.00128 0.550781 1.2498 0.550781H11.7498C11.9983 0.550781 12.1998 0.752253 12.1998 1.00078V3.55078H14.7498C14.9983 3.55078 15.1998 3.75225 15.1998 4.00078V11.5008C15.1998 12.018 14.9944 12.5139 14.6287 12.8796C14.263 13.2453 13.767 13.4508 13.2498 13.4508H2.7498C2.23263 13.4508 1.73664 13.2453 1.37095 12.8796C1.00525 12.5139 0.799805 12.018 0.799805 11.5008V1.00078ZM11.6066 12.5508H2.7498C2.47133 12.5508 2.20426 12.4402 2.00734 12.2432C1.81043 12.0463 1.6998 11.7793 1.6998 11.5008V1.45078H11.2998V11.5008C11.2998 11.8758 11.4078 12.2397 11.6066 12.5508ZM12.1998 4.45078V11.5008C12.1998 11.7793 12.3104 12.0463 12.5073 12.2432C12.7043 12.4402 12.9713 12.5508 13.2498 12.5508C13.5283 12.5508 13.7954 12.4402 13.9923 12.2432C14.1892 12.0463 14.2998 11.7793 14.2998 11.5008V4.45078H12.1998ZM3.7998 4.00078C3.7998 3.75225 4.00128 3.55078 4.2498 3.55078H8.7498C8.99833 3.55078 9.19981 3.75225 9.19981 4.00078C9.19981 4.24931 8.99833 4.45078 8.7498 4.45078H4.2498C4.00128 4.45078 3.7998 4.24931 3.7998 4.00078ZM5.2998 7.00078C5.2998 6.75225 5.50128 6.55078 5.7498 6.55078H8.7498C8.99833 6.55078 9.19981 6.75225 9.19981 7.00078C9.19981 7.24931 8.99833 7.45078 8.7498 7.45078H5.7498C5.50128 7.45078 5.2998 7.24931 5.2998 7.00078Z"
                                          fill={
                                            screenMode === 'dark'
                                              ? '#ABADBA'
                                              : '#565B67'
                                          }
                                        />
                                      </svg>
                                    </div>

                                    <Tooltip title={item?.title}>
                                      <a
                                        className="title"
                                        style={{
                                          color:
                                            screenMode === 'dark'
                                              ? '#fff'
                                              : '#2E3138',
                                        }}
                                      >
                                        {item?.title?.length > 100
                                          ? `${item?.title?.slice(0, 100)}...`
                                          : item?.title}
                                      </a>
                                    </Tooltip>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Flex>
              <Flex style={{ width: '100%' }} vertical gap={16}>
                <div className="mobile">
                  {news
                    .filter((el) => !!el?.image)
                    .slice(3, 7)
                    .map((item: any) => (
                      <div
                        onClick={() => nextLink(item)}
                        className="item-three-header"
                      >
                        <div className="avt">
                          <a href={item?.href}>
                            <img
                              width="100%"
                              height="201.33px"
                              style={{
                                objectFit: 'cover',
                                borderRadius: '6px',
                              }}
                              src={item?.image}
                            />
                          </a>

                          {/* <p style={{ color: 'black' }}>{item?.description}</p> */}
                        </div>
                        <div>
                          <Tooltip title={item?.title}>
                            <a
                              href={item?.href}
                              className="title"
                              style={{
                                color:
                                  screenMode === 'dark' ? '#fff' : '#2E3138',
                                fontWeight: 600,
                                lineHeight: '28px',
                              }}
                            >
                              {item?.title?.length > 55
                                ? `${item?.title?.slice(0, 55)}...`
                                : item?.title}
                            </a>
                          </Tooltip>
                          <p className="des-mobile">
                            {item?.description?.length > 80
                              ? `${item?.description?.slice(0, 80)}...`
                              : item?.description}
                          </p>
                          <div className="time">{item?.date}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </Flex>
              <Flex vertical gap={16}>
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    flexDirection: 'column',
                  }}
                >
                  {chungKhoan.length > 0 && (
                    <ChildPostNews
                      // onClick={() => nextLink(item)}
                      nextLink={nextLink}
                      newsType="Chứng khoán"
                      newsData={chungKhoan}
                      screenMode={screenMode}
                    />
                  )}
                  {batDongSan.length > 0 && (
                    <ChildPostNews
                      nextLink={nextLink}
                      newsType="Bất động sản"
                      screenMode={screenMode}
                      newsData={batDongSan}
                    />
                  )}
                  {taiChinh.length > 0 && (
                    <ChildPostNews
                      newsType="Tài chính"
                      nextLink={nextLink}
                      screenMode={screenMode}
                      newsData={taiChinh}
                    />
                  )}
                  {nganHang.length > 0 && (
                    <ChildPostNews
                      newsType="Ngân hàng"
                      nextLink={nextLink}
                      screenMode={screenMode}
                      newsData={nganHang}
                    />
                  )}
                  {kinhTeVietNam.length > 0 && (
                    <ChildPostNews
                      newsType="Kinh tế việt nam"
                      nextLink={nextLink}
                      screenMode={screenMode}
                      newsData={kinhTeVietNam}
                    />
                  )}
                  {macroNews.length > 0 && (
                    <ChildPostNews
                      newsType="Vĩ mô"
                      nextLink={nextLink}
                      screenMode={screenMode}
                      newsData={macroNews}
                    />
                  )}
                  {xaHoi.length > 0 && (
                    <ChildPostNews
                      newsType="Xã hội"
                      nextLink={nextLink}
                      screenMode={screenMode}
                      newsData={xaHoi}
                    />
                  )}
                  {entrepreneurNews.length > 0 && (
                    <ChildPostNews
                      newsType="Doanh nhân"
                      nextLink={nextLink}
                      screenMode={screenMode}
                      newsData={entrepreneurNews}
                    />
                  )}

                  {khoiNghiep.length > 0 && (
                    <ChildPostNews
                      newsType="Khởi nghiệp"
                      newsData={khoiNghiep}
                      screenMode={screenMode}
                      nextLink={nextLink}
                    />
                  )}
                  {kinhTeQuocTe.length > 0 && (
                    <ChildPostNews
                      newsType="Kinh tế quốc tế"
                      newsData={kinhTeQuocTe}
                      screenMode={screenMode}
                      nextLink={nextLink}
                    />
                  )}
                </div>
              </Flex>
              <Flex style={{ width: '100%' }} vertical gap={16}>
                <div className="mobile">
                  {news
                    .filter((el) => !!el?.image)
                    .slice(8, 12)
                    .map((item: any) => (
                      <div
                        onClick={() => nextLink(item)}
                        className="item-three-header"
                      >
                        <div className="avt">
                          <a href={item?.href}>
                            <img
                              width="100%"
                              height="201.33px"
                              style={{
                                objectFit: 'cover',
                                borderRadius: '6px',
                              }}
                              src={item?.image}
                            />
                          </a>

                          {/* <p style={{ color: 'black' }}>{item?.description}</p> */}
                        </div>
                        <div>
                          <Tooltip title={item?.title}>
                            <a
                              href={item?.href}
                              className="title"
                              style={{
                                color:
                                  screenMode === 'dark' ? '#fff' : '#2E3138',
                                fontWeight: 600,
                                lineHeight: '28px',
                              }}
                            >
                              {item?.title?.length > 55
                                ? `${item?.title?.slice(0, 55)}...`
                                : item?.title}
                            </a>
                          </Tooltip>
                          <p className="des-mobile">
                            {item?.description?.length > 80
                              ? `${item?.description?.slice(0, 80)}...`
                              : item?.description}
                          </p>
                          <div className="time">{item?.date}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </Flex>
            </div>
          </div>
        </div>
      </Flex>
      <FooterNews />
    </StyledNews>
  );
};

export default NewsList;
