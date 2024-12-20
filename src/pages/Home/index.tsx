/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
import { FC, useMemo, useRef } from 'react';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { config } from '@/config/env';
import io from 'socket.io-client';

import USD from '/usd.png';
import EUR from '/eur.png';
import GBP from '/gbp.png';
import AUD from '/aud.png';
import CAD from '/cad.png';
import CHF from '/chf.png';
import CNY from '/cny.png';
import DKK from '/dkk.png';
import HKD from '/hkd.png';
import INR from '/inr.png';
import JPY from '/jpy.png';
import KRW from '/krw.png';
import KWD from '/kwd.png';
import MYR from '/myr.png';
import NOK from '/nok.png';
import RUB from '/rub.png';
import SAR from '/sar.png';
import SEK from '/sek.png';
import SGD from '/sgd.png';
import THB from '/thb.png';
import GOLD_ICON from '/gold_icon.png';
import FUEL from '/fuel.png';
import PORK from '/pork.png';
import STEEL from '/steel-bar.png';
import RICE from '/rice.png';
import FISH from '/fish.png';
import STOOL from '/stool.png';
import ELECTRIC from '/electric.png';
import {
  DO_DUNG_CA_NHAN_DO_GIA_DUNG,
  LIST_BAO_HIEM,
  LIST_BAT_DONG_SAN,
  LIST_BOND,
  LIST_CONG_NGHE,
  LIST_DAU_KHI,
  LIST_DICH_VU_BAN_LE,
  LIST_DICH_VU_TAI_CHINH,
  LIST_DICH_VU_TIEN_ICH,
  LIST_DU_LICH_GIAI_TRI,
  LIST_ETF,
  LIST_GIAO_DICH_LO_LE,
  LIST_HANG_HOA_DICH_VU_CONG_NGHIEP,
  LIST_HNX,
  LIST_HNX30,
  LIST_HOA_CHAT,
  LIST_HOSE,
  LIST_NGAN_HANG,
  LIST_OTO_LINH_KIEN_PHU_TUNG,
  LIST_PHUONG_TIEN_TRUYEN_THONG,
  LIST_TAI_NGUYEN,
  LIST_THUC_PHAM_DO_UONG,
  LIST_UPCOM,
  LIST_VIEN_THONG,
  LIST_VN30,
  LIST_XAY_DUNG_VAT_LIEU,
  LIST_Y_TE,
} from '@/constants/common';

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

import { ChartHomeScreen } from '@/components/ChartHomeScreen/ChartHomeScreen';
import { screenModeSelector } from '@/redux/screen/selector';

import obama_budget_2012 from '@/data/obama_budget_proposal_2012.json';
import * as echarts from 'echarts';
import axios from 'axios';
import { StyledHome } from './styled';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import TableComponent from './TableComponent';
import {
  LIST_INDUSTRY,
  LIST_MAP_GOLD_NAME,
  LIST_NHOM_NGANH,
  LIST_XANG_VUNG_1,
  LIST_XANG_VUNG_2,
} from '@/constants/common';
import moment from 'moment';
import { groupBy, reduce, set, sortBy, sumBy } from 'lodash';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'; //module
HC_more(Highcharts); //init module
import {
  convertDecimalStringToNumber,
  convertNumberToFormattedString,
  formatNumber,
  formatNumberComma,
  formatNumberTo1Billion,
  formatNumberToBillion,
  formatNumberWithCommas,
  formatToBillion,
  formatToBillion1Decimal,
  formatToBillionVND,
} from '@/components/ConvertNumber';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ReactSmartScroller } from 'react-smart-scroller';
import { useAppSelector } from '@/redux/hooks';
import { convertDateToISO } from '@/components/ConvertDate';
import BienDongNganh from './BienDongNganh';
import NuocNgoai from './NuocNgoai';
import HangHoa from './HangHoa';
const Home: FC = () => {
  const screenMode = useSelector(screenModeSelector);

  const listMenu = [
    {
      image: 'chart',
      title: 'BIỂU ĐỒ',
      des: 'Bảng giá giao dịch trực tuyến',
      tab: 'chart',
      link: '/bieu-do',
      icon: (
        <svg
          style={{ marginRight: '4px' }}
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 41 40"
          fill={screenMode === 'dark' ? '#fff' : 'black'}
        >
          <path
            d="M35.4375 30.9375H8.5625V6.5625C8.5625 6.39062 8.42188 6.25 8.25 6.25H6.0625C5.89062 6.25 5.75 6.39062 5.75 6.5625V33.4375C5.75 33.6094 5.89062 33.75 6.0625 33.75H35.4375C35.6094 33.75 35.75 33.6094 35.75 33.4375V31.25C35.75 31.0781 35.6094 30.9375 35.4375 30.9375ZM12 27.8125H14.1875C14.3594 27.8125 14.5 27.6719 14.5 27.5V21.875C14.5 21.7031 14.3594 21.5625 14.1875 21.5625H12C11.8281 21.5625 11.6875 21.7031 11.6875 21.875V27.5C11.6875 27.6719 11.8281 27.8125 12 27.8125ZM17.9375 27.8125H20.125C20.2969 27.8125 20.4375 27.6719 20.4375 27.5V15C20.4375 14.8281 20.2969 14.6875 20.125 14.6875H17.9375C17.7656 14.6875 17.625 14.8281 17.625 15V27.5C17.625 27.6719 17.7656 27.8125 17.9375 27.8125ZM23.875 27.8125H26.0625C26.2344 27.8125 26.375 27.6719 26.375 27.5V18.0469C26.375 17.875 26.2344 17.7344 26.0625 17.7344H23.875C23.7031 17.7344 23.5625 17.875 23.5625 18.0469V27.5C23.5625 27.6719 23.7031 27.8125 23.875 27.8125ZM29.8125 27.8125H32C32.1719 27.8125 32.3125 27.6719 32.3125 27.5V11.875C32.3125 11.7031 32.1719 11.5625 32 11.5625H29.8125C29.6406 11.5625 29.5 11.7031 29.5 11.875V27.5C29.5 27.6719 29.6406 27.8125 29.8125 27.8125Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
        </svg>
      ),
    },
    {
      image: 'filter',
      title: 'LỌC CỔ PHIẾU',
      des: 'Hiển thị các cổ phiếu theo điều kiện phù hợp',
      link: '/loc-co-phieu',
      tab: 'filter_stock',
      icon: (
        <svg
          style={{ marginRight: '4px' }}
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill={screenMode === 'dark' ? '#fff' : 'black'}
        >
          <path
            d="M9.75033 4.24902H31.7503C33.5837 4.24902 35.0837 5.74902 35.0837 7.58236V11.249C35.0837 12.5824 34.2503 14.249 33.417 15.0824L26.2503 21.4157C25.2503 22.249 24.5837 23.9157 24.5837 25.249V32.4157C24.5837 33.4157 23.917 34.749 23.0837 35.249L20.7503 36.749C18.5837 38.0824 15.5837 36.5824 15.5837 33.9157V25.0824C15.5837 23.9157 14.917 22.4157 14.2503 21.5824L7.91699 14.9157C7.08366 14.0824 6.41699 12.5824 6.41699 11.5824V7.74902C6.41699 5.74902 7.91699 4.24902 9.75033 4.24902Z"
            stroke="white"
            stroke-width="2.8125"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.9672 4.24902L10.7505 17.4157"
            stroke="white"
            stroke-width="2.8125"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      image: 'tinHieu',
      title: 'BÁO CÁO TÀI CHÍNH',
      des: 'Cảnh báo tín hiệu mua và bán cổ phiếu',
      tab: 'signal',
      link: '/phan-tich',
      icon: (
        <svg
          style={{ marginRight: '4px' }}
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill={screenMode === 'dark' ? '#fff' : 'black'}
        >
          <path
            d="M8.28902 31.5938C8.28902 32.2852 8.84762 32.8438 9.53902 32.8438H31.9609C32.6523 32.8438 33.2109 32.2852 33.2109 31.5938V22.4922C33.2109 15.6094 27.6328 10.0312 20.75 10.0312C13.8672 10.0312 8.28902 15.6094 8.28902 22.4922V31.5938ZM11.1015 22.4922C11.1015 17.1641 15.4218 12.8438 20.75 12.8438C26.0781 12.8438 30.3984 17.1641 30.3984 22.4922V30.0312H16.5312V23.3516C16.5312 23.1367 16.3554 22.9609 16.1406 22.9609H14.4218C14.207 22.9609 14.0312 23.1367 14.0312 23.3516V30.0312H11.1015V22.4922ZM9.22262 12.6289L10.7695 11.082C10.8906 10.9609 10.8906 10.7617 10.7695 10.6406L8.11715 7.98828C8.05842 7.93012 7.9791 7.8975 7.89645 7.8975C7.81379 7.8975 7.73448 7.93012 7.67574 7.98828L6.12887 9.53516C6.07071 9.59389 6.03809 9.6732 6.03809 9.75586C6.03809 9.83851 6.07071 9.91783 6.12887 9.97656L8.78121 12.6289C8.90231 12.75 9.09762 12.75 9.22262 12.6289ZM35.3789 9.53516L33.832 7.98828C33.7733 7.93012 33.6939 7.8975 33.6113 7.8975C33.5286 7.8975 33.4493 7.93012 33.3906 7.98828L30.7382 10.6406C30.6801 10.6994 30.6475 10.7787 30.6475 10.8613C30.6475 10.944 30.6801 11.0233 30.7382 11.082L32.2851 12.6289C32.4062 12.75 32.6054 12.75 32.7265 12.6289L35.3789 9.97656C35.5 9.85156 35.5 9.65625 35.3789 9.53516ZM33.25 35.3438H8.24996C7.55856 35.3438 6.99996 35.9023 6.99996 36.5938V37.5312C6.99996 37.7031 7.14059 37.8438 7.31246 37.8438H34.1875C34.3593 37.8438 34.5 37.7031 34.5 37.5312V36.5938C34.5 35.9023 33.9414 35.3438 33.25 35.3438ZM19.6562 7.53125H21.8437C22.0156 7.53125 22.1562 7.39062 22.1562 7.21875V3.46875C22.1562 3.29688 22.0156 3.15625 21.8437 3.15625H19.6562C19.4843 3.15625 19.3437 3.29688 19.3437 3.46875V7.21875C19.3437 7.39062 19.4843 7.53125 19.6562 7.53125Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
        </svg>
      ),
    },
    {
      image: 'phanTich',
      title: 'VĨ MÔ',
      des: 'Phân tích báo cáo tài chính doanh nghiệp',
      tab: 'analyst',
      link: '/vi-mo',
      icon: (
        <svg
          style={{ marginRight: '4px' }}
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill={screenMode === 'dark' ? '#fff' : 'black'}
        >
          <path
            d="M35.4375 31.1875H8.5625V6.8125C8.5625 6.64062 8.42188 6.5 8.25 6.5H6.0625C5.89062 6.5 5.75 6.64062 5.75 6.8125V33.6875C5.75 33.8594 5.89062 34 6.0625 34H35.4375C35.6094 34 35.75 33.8594 35.75 33.6875V31.5C35.75 31.3281 35.6094 31.1875 35.4375 31.1875ZM12.6953 25.1602C12.8164 25.2812 13.0117 25.2812 13.1367 25.1602L18.5391 19.7852L23.5234 24.8008C23.6445 24.9219 23.8438 24.9219 23.9648 24.8008L34.7227 14.0469C34.8438 13.9258 34.8438 13.7266 34.7227 13.6055L33.1758 12.0586C33.117 12.0004 33.0377 11.9678 32.9551 11.9678C32.8724 11.9678 32.7931 12.0004 32.7344 12.0586L23.75 21.0391L18.7734 16.0312C18.7147 15.9731 18.6354 15.9405 18.5527 15.9405C18.4701 15.9405 18.3908 15.9731 18.332 16.0312L11.1523 23.168C11.0942 23.2267 11.0616 23.306 11.0616 23.3887C11.0616 23.4713 11.0942 23.5506 11.1523 23.6094L12.6953 25.1602Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
        </svg>
      ),
    },
    {
      image: 'congDong',
      title: 'CỘNG ĐỒNG',
      des: 'Diễn đàn thảo luận và phân tích thị trường',
      tab: 'community',
      link: '/cong-dong/forum/forum',
      icon: (
        <svg
          style={{ marginRight: '4px' }}
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill={screenMode === 'dark' ? '#fff' : 'black'}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.5036 13.9159L35.426 16.1261C36.6623 16.8214 37.4168 18.0754 37.4168 19.4261V25.8696H27.2321V23.2609H34.6391V19.4261C34.6391 18.9901 34.3959 18.5873 33.9993 18.3644L30.0745 16.1528L31.5036 13.9159Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.0002 7.6087C25.5366 7.6087 24.2854 8.45315 23.7732 9.65671L21.1938 8.68851C22.1149 6.52424 24.3665 5 27.0002 5C30.4519 5 33.2502 7.62789 33.2502 10.8696V12.1739C33.2502 15.4156 30.4519 18.0435 27.0002 18.0435C26.025 18.0435 25.1346 17.84 24.3098 17.4636L25.5238 15.1172C25.9796 15.3252 26.4558 15.4348 27.0002 15.4348C28.9178 15.4348 30.4724 13.9748 30.4724 12.1739V10.8696C30.4724 9.06863 28.9178 7.6087 27.0002 7.6087Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5795 24.2471L12.8947 20.6941L14.3223 22.932L8.00699 26.485C7.29706 26.8844 6.86127 27.6059 6.86127 28.3857V32.3913H29.0835V28.3857C29.0835 27.6077 28.6482 26.8855 27.9368 26.4845L21.6225 22.932L23.05 20.6941L29.3653 24.2472C30.9123 25.1192 31.8613 26.6906 31.8613 28.3857V35H4.0835V28.3857C4.0835 26.6898 5.03113 25.1182 6.5795 24.2471Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.9724 8.91304C14.9047 8.91304 12.4168 11.2495 12.4168 14.1304V16.7391C12.4168 19.6201 14.9047 21.9565 17.9724 21.9565C21.04 21.9565 23.5279 19.6201 23.5279 16.7391V14.1304C23.5279 11.2495 21.04 8.91304 17.9724 8.91304ZM9.63905 14.1304C9.63905 9.80876 13.3706 6.30435 17.9724 6.30435C22.5742 6.30435 26.3057 9.80876 26.3057 14.1304V16.7391C26.3057 21.0608 22.5742 24.5652 17.9724 24.5652C13.3706 24.5652 9.63905 21.0608 9.63905 16.7391V14.1304Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
        </svg>
      ),
    },
    {
      image: 'tinTuc',
      title: 'Tin tức',
      des: 'Các tin tức nóng luôn được cập nhật',
      tab: 'news',
      link: '/tin-tuc',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '4px' }}
          width="41"
          height="41"
          viewBox="0 0 14 12"
          fill="none"
        >
          <path
            d="M13.5 0.515626H9.925C9.15781 0.515626 8.40781 0.735938 7.7625 1.15156L7 1.64063L6.2375 1.15156C5.59283 0.736018 4.84199 0.515215 4.075 0.515626H0.5C0.223437 0.515626 0 0.739063 0 1.01563V9.89062C0 10.1672 0.223437 10.3906 0.5 10.3906H4.075C4.84219 10.3906 5.59219 10.6109 6.2375 11.0266L6.93125 11.4734C6.95156 11.4859 6.975 11.4937 6.99844 11.4937C7.02187 11.4937 7.04531 11.4875 7.06563 11.4734L7.75937 11.0266C8.40625 10.6109 9.15781 10.3906 9.925 10.3906H13.5C13.7766 10.3906 14 10.1672 14 9.89062V1.01563C14 0.739063 13.7766 0.515626 13.5 0.515626ZM5.3125 6.64844C5.3125 6.7125 5.2625 6.76562 5.20156 6.76562H2.29844C2.2375 6.76562 2.1875 6.7125 2.1875 6.64844V5.94531C2.1875 5.88125 2.2375 5.82812 2.29844 5.82812H5.2C5.26094 5.82812 5.31094 5.88125 5.31094 5.94531V6.64844H5.3125ZM5.3125 4.46094C5.3125 4.525 5.2625 4.57812 5.20156 4.57812H2.29844C2.2375 4.57812 2.1875 4.525 2.1875 4.46094V3.75781C2.1875 3.69375 2.2375 3.64063 2.29844 3.64063H5.2C5.26094 3.64063 5.31094 3.69375 5.31094 3.75781V4.46094H5.3125ZM11.8125 6.64844C11.8125 6.7125 11.7625 6.76562 11.7016 6.76562H8.79844C8.7375 6.76562 8.6875 6.7125 8.6875 6.64844V5.94531C8.6875 5.88125 8.7375 5.82812 8.79844 5.82812H11.7C11.7609 5.82812 11.8109 5.88125 11.8109 5.94531V6.64844H11.8125ZM11.8125 4.46094C11.8125 4.525 11.7625 4.57812 11.7016 4.57812H8.79844C8.7375 4.57812 8.6875 4.525 8.6875 4.46094V3.75781C8.6875 3.69375 8.7375 3.64063 8.79844 3.64063H11.7C11.7609 3.64063 11.8109 3.69375 11.8109 3.75781V4.46094H11.8125Z"
            fill={screenMode === 'dark' ? '#fff' : 'black'}
          />
        </svg>
      ),
    },
  ];

  const [listHangHoa, setListHangHoa] = useState(
    [
      {
        name: 'Vàng',
        value: '1,959.25',
        high: '1,965.50',
        low: '1,958.05',
        change: '-10.55',
        percent: '-0.54%',
        time: '16:44:45',
        pid: '8830',
        flag: 'https://i.ibb.co/55cWx9P/gold.png',
      },
      {
        name: 'XAU/USD',
        value: '1,954.71',
        high: '1,960.84',
        low: '1,953.59',
        change: '-3.89',
        percent: '-0.20%',
        time: '16:44:40',
        pid: '68',
        flag: 'https://i.ibb.co/55cWx9P/gold.png',
      },
      {
        name: 'Bạc',
        value: '22.622',
        high: '22.797',
        low: '22.610',
        change: '-0.283',
        percent: '-1.24%',
        time: '16:44:03',
        pid: '',
        flag: 'https://i.ibb.co/fvPgc4p/Silver.png',
      },
      {
        name: 'Đồng',
        value: '3.6168',
        high: '3.6448',
        low: '3.6123',
        change: '-0.0237',
        percent: '-0.65%',
        time: '16:44:08',
        pid: '',
        flag: 'https://media.istockphoto.com/id/1356864515/vector/copper-metal-texture-brown-shiny-banner-vector-reflection-gradient.jpg?s=612x612&w=0&k=20&c=aErWCfx8WO5eEfGMWKprxfEmXAciSa_1dBk9f5TeSvA=',
      },
      {
        name: 'Platin',
        value: '856.05',
        high: '864.70',
        low: '854.60',
        change: '-6.75',
        percent: '-0.78%',
        time: '16:43:36',
        pid: '',
        flag: 'https://media.istockphoto.com/id/619048186/vector/brushed-metal-background.jpg?s=612x612&w=0&k=20&c=Io6kffBki7089r6XQJHi0cZTKa45zqNTfBio2Jbmcvo=',
      },
      {
        name: 'Paladi',
        value: '961.78',
        high: '1,003.78',
        low: '951.03',
        change: '-47.32',
        percent: '-4.69%',
        time: '16:44:04',
        pid: '',
        flag: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIVFRUXFRUVFRUVDw8VFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZExk3NysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQIDBAUH/8QAKxAAAgIBBAEDAwUBAQEAAAAAAAECESEDEjFBUWFxgZGx8BMiocHRBOFC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD8lU8WNNd9/VfQzDDtYZuWrb4V+iq/hY+hR3lqp8JJ908fTo4wW791v09jnCPfZ2lrXh1fnhv38+/IHo/VVJUk/TC+V/hwvfK7wsKn32cVG22/ZHd6tJLHo+//AEDrGSiqrPnt+/k4a090tqeFl/0jlL90s8L7nZSUV+fcDcUo2+/PZx/6tRuorl8+iMa8tzUeuX/h0SUcgI6STt5flmdfWpY5fH+mP+jUdJLl/wAIsNJICR0sK8lnqUiaurS+xjT0sZAzCDaz7nS0hKaRxhFvLARuV+DajRcI5K5MA5NvHBpQou2jnKVvHACc+kWMCqFGZz6QCc+kIxEYCc+kAlKjKjZYxLKVAG6MciKNN0A4Mt2Ks1wBKoy5WG7NVQE2kcg5GtoE2kcg5FSAiQtByCXkD1xlfHPjsRVe/wDZKK9W3Td1hX9rA3PXt5dvzi/l9mYx5tU/DJ+m1yvUPW4V4X8AdZ6/Cb9r5+pzSt217f6RQfLXPHj6lerSq8AdHq0q69f6Ocsv0+7M1bvro057UB03bUctWV0l8mZPd7dnS0sgaikjlqauMdmZztUvk6RikBNPSSRJ6uHXsZnq2sF09PAGdLT8m3NIzLV5ozpQ8gSEbyzphEc0jnGNu2BOWdNtFbSOTywE5WzSiVpI5zd+wF1JdIsYlUTE5dICzl0iRiahEkpeAEpUZjEsIllKgDdGOSxiaboBwYuwlZt4AlGXKxyaoCJEcg3ZpICJEcg2WIHeMzWyuf6f8mTKnkDX6maNKD5ffyiKFeH7My5ZA1LUrAUG89fnPgKHePz0MzlQG5Tr5JVv0RFG8jUlQGpSrJh/upL5FXRqTpAa4OUp2sdkbbwdKoCxjRh6t3RlzbRuEaAmlp0Hqc+hHqc18DS0/IE04eTUpJOiPUzXgzCPbAkVbtm5NITlWDFW7YEeWdOEJOjm8sBN37G4ocIxJ2AlLwWETUUYlK+ALKXgkIlhEkp+ALKVcGYxEImpS8AJOjCVlUSydAV4MchKzbwBDLY5NAEjLkGaiB0TZrbXd/UhhNgXdk2o+v8ApKX4jLeQLKWTSXd/BEjMmBrUkRK8lS7JqMC6kqRmroJXyam6QFbpHO21Qqzd0gKlRz3N2RW0dIqgEI0YepnBNzdm4RoCacBKeaI55wIQARjm2XUlWCTlmiKObAlW7NydImpKjNWAeTfCEnSMNWAbs1FFWEc27ArlYhE1FGXKwDl4EYlhEkp+ALKXgyoljESl4ASdESCiak6APBhoqRpugIZz0KNJAaVm8dEMKwLbs2qIYfIFk8mlXyF/JmfIFmwl5C9SajAuo8ESvkJeSzeALJ0jCRUvJpvABYMRtiKNrACKoxutki2zcVQCEaMylnBN1s1GNASMS6kuiTlnAUewJt7NTlSJqS6RNvYDbZpypCcqRlRsCVZtYF0jCVgOTUVRVgxyBXKyxiWKoy5WAlPwIxKoklPwBZS6RFERgWUukAlKjO0qgalKsARujO2yqJrAESN2RMwkBezVi/zBh5YFlyaCZieWBZml6k4JqeALqPAivIRJvAGpSwZjERRd2ALZiKEImkwLEwsskUbQBKjLdsnLNJUASompLNEk7ZqgG3sakuiaj6G3yA2llKkScsUFEBGNlukHKkSMQIlZtYJdGYqwHJtKhwZWQG6zSgFGjLlbArlfBVAqiZlK+OALOXSJGBqMCSl0gDlWEZUDcdMu5II50a3EUibQpRrcTcRoBJZLdCxJWAmOBdElkCzeAlQ4DdrABvAigkFLABSJCIjEqkBUzCViMTW7IC8mXlismmwDwZm7YllleAFUNR9Em7LVIAoiUsCbwIoBCIcsBywIRAkIm7ozu8EhEBFWbWBuMRVgVZZ02pE4McsC3bOmwlJGZO2BZSv2NR0zSgqMSleOghKXSEdM6w08ZMvV8IDhQ3DcKClCybi0AaDdEbKwDyGGR5ArdgMl2BbtBIJETAqkSMSxRFICqREhFDdkC3klZCQbArdElkNZLIA8Ek7EsleEAWESTtB5KlgBBDdgl4LCICESqfJlSLCIEhE3uyRSJGIFgs5OjaRhyyRJ3kC8s6ulRmUqpEpt2Abt+nR3UUlbMul8kab9giSbeOjtDRwbSUY2zH6kv/ngDxUSxZaCpQbFigAbDYAPIYkAHJWRiwCZUCJgEyxQSImAUgkIol5AreRQSEnkBJhgSYFkR5DEuAK+CcjkvQBETwEWICMSRkIsRiBYRLvySMsiMQLGJpyp0ZcshRyBpR7OspVSOc5ZSG3NhG6bd/iPROajH1f4zjOVUjWxvIGnFy9lwj1aOhg5ynsj6vC/tjdJ8NxXhFHzDNlBFA2QoANhhgGGGRgUMMgFTCBEAiypBETAJlSCJeQDeSgkuQEmVkYkBZAMS4APgiBegKuDKYiWIFiZTETUUBIobskTKlkCpFcsmW8mksgaUezWpKmkjnOWTVd9hHTbeTrq6lRSXL+xx1JcL5OijeXyB1jDdluqXwfQ/wCfQ/afP157YpLl/Y2puSTbfjDaKPmEAIqhgAAwAAYAAAAEEABEVAAQoAEfIAASDAASAAFfBEABVwSIAFiSIAFXJLyABrsN5AAshN5RQEb+/nJrXnhIAo0sq3nxlnv0IYAA/9k=',
      },
      {
        name: 'Dầu Thô WTI',
        value: '76.41',
        high: '76.44',
        low: '75.31',
        change: '+0.67',
        percent: '+0.88%',
        time: '16:45:02',
        pid: '8849',
        flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVN7_6EJdvBr7sTU_IMv3n4VlI4Gm0G0Y5g&usqp=CAU',
      },
      {
        name: 'Dầu Brent',
        value: '80.80',
        high: '81.48',
        low: '79.44',
        change: '+0.79',
        percent: '+0.99%',
        time: '16:43:45',
        pid: '',
        flag: 'https://media.istockphoto.com/id/1216567143/photo/oil-barrels-black-color-on-world-map-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=d7XuKgzFW3Bbpuu51XYushedb0J2tr1eYGzf8GL3iG8=',
      },
      {
        name: 'Khí Tự nhiên',
        value: '3.042',
        high: '3.054',
        low: '3.003',
        change: '+0.001',
        percent: '+0.03%',
        time: '16:44:21',
        pid: '',
        flag: 'https://img.pikbest.com/back_our/20210915/bg/14b9ba4a69c19.png!w700wp',
      },
      {
        name: 'Dầu Nhiên liệu',
        value: '2.7540',
        high: '2.7540',
        low: '2.6989',
        change: '+0.0349',
        percent: '+1.28%',
        time: '16:43:45',
        pid: '',
        flag: 'https://i.ibb.co/55cWx9P/gold.png',
      },
      {
        name: 'Xăng RBOB',
        value: '2.1860',
        high: '2.1860',
        low: '2.1539',
        change: '+0.0252',
        percent: '+1.17%',
        time: '16:44:50',
        pid: '',
        flag: 'https://i.ibb.co/55cWx9P/gold.png',
      },
      {
        name: 'Nhôm',
        value: '2,228.00',
        high: '2,247.00',
        low: '2,225.50',
        change: '-14.50',
        percent: '-0.65%',
        time: '16:44:06',
        pid: '',
        flag: 'https://png.pngtree.com/thumb_back/fh260/background/20210907/pngtree-silver-foil-aluminum-foil-silver-rough-texture-image_795818.jpg',
      },
      {
        name: 'Kẽm',
        value: '2,607.00',
        high: '2,621.00',
        low: '2,587.50',
        change: '+4.50',
        percent: '+0.17%',
        time: '16:44:01',
        pid: '956470',
        flag: 'https://static.vecteezy.com/system/resources/previews/007/009/664/non_2x/texture-of-green-zinc-sheet-abstract-background-free-photo.jpg',
      },
      {
        name: 'Ni-ken',
        value: '17,547.00',
        high: '17,686.00',
        low: '17,530.00',
        change: '-266.00',
        percent: '-1.49%',
        time: '16:43:51',
        pid: '',
        flag: 'https://phelieuvietduc.com/wp-content/uploads/2020/04/ung-dung-cua-niken.jpg',
      },
      {
        name: 'Copper',
        value: '8,090.00',
        high: '8,142.00',
        low: '8,082.00',
        change: '-57.00',
        percent: '-0.70%',
        time: '16:43:45',
        pid: '959211',
        flag: 'https://img.freepik.com/premium-vector/copper-color-background-with-blur-smooth-texture-festive-metallic-graphic-design-element_120819-2252.jpg',
      },
      {
        name: 'Lúa mì Hoa Kỳ',
        value: '577.60',
        high: '581.88',
        low: '575.38',
        change: '-2.40',
        percent: '-0.41%',
        time: '16:43:38',
        pid: '',
        flag: 'https://htmlcolorcodes.com/assets/images/colors/wheat-color-solid-background-1920x1080.png',
      },
      {
        name: 'Thóc',
        value: '16.440',
        high: '16.510',
        low: '16.440',
        change: '-0.075',
        percent: '-0.45%',
        time: '08:37:19',
        pid: '',
        flag: 'https://img.freepik.com/free-photo/close-up-white-rice-wallpaper-details_1150-34308.jpg',
      },
      {
        name: 'Bắp Hoa Kỳ',
        value: '467.88',
        high: '469.00',
        low: '467.12',
        change: '-0.12',
        percent: '-0.03%',
        time: '16:43:25',
        pid: '',
        flag: 'https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8497.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=ais',
      },
      {
        name: 'Nước Cam',
        value: '370.65',
        high: '371.85',
        low: '362.55',
        change: '+20.37',
        percent: '+5.82%',
        time: '02:00:04',
        pid: '',
        flag: 'https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30447.jpg',
      },
      {
        name: 'Bê',
        value: '174.30',
        high: '180.07',
        low: '174.13',
        change: '-5.10',
        percent: '-2.84%',
        time: '02:04:59',
        pid: '',
        flag: 'https://htmlcolorcodes.com/assets/images/colors/light-brown-color-solid-background-1920x1080.png',
      },
      {
        name: 'Heo nạc',
        value: '71.47',
        high: '72.50',
        low: '71.10',
        change: '-0.03',
        percent: '-0.03%',
        time: '02:04:57',
        pid: '',
        flag: 'https://www.icolorpalette.com/download/solidcolorimage/fdd7e4_solid_color_background_icolorpalette.png',
      },
      {
        name: 'Bê đực non',
        value: '224.53',
        high: '240.18',
        low: '224.39',
        change: '-6.30',
        percent: '-2.73%',
        time: '04:46:03',
        pid: '',
        flag: 'https://htmlcolorcodes.com/assets/images/colors/light-brown-color-solid-background-1920x1080.png',
      },
      {
        name: 'Gỗ',
        value: '525.50',
        high: '525.50',
        low: '518.50',
        change: '+10.00',
        percent: '+1.94%',
        time: '03:44:37',
        pid: '',
        flag: 'https://media.istockphoto.com/id/1170926172/vector/dark-brown-color-wood-textured-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=swyWiH7py5rildEWqKJ5L2anflIIuQ-kNW7NT0thKQU=',
      },
      {
        name: 'Yến mạch',
        value: '350.50',
        high: '350.70',
        low: '348.30',
        change: '-0.20',
        percent: '-0.06%',
        time: '15:09:25',
        pid: '',
        flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9EPV2BNEpP69UDj-U8b6T2oJDKNXfa0F7SGzWcS3QGSyEmlCVMlWuO13S4vENU5xmBis&usqp=CAU',
      },
    ]
    //   [
    //   {
    //     name: "VÀNG",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8830",
    //   },
    //   {
    //     name: "BẠC",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8836",
    //   },
    //   {
    //     name: "ĐỒNG",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8831",
    //   },
    //   {
    //     name: "DẦU THÔ",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8849",
    //   },
    //   {
    //     name: "DẦU BRENT",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8833",
    //   },
    //   {
    //     name: "KHÍ TỰ NHIÊN",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8862",
    //   },
    //   {
    //     name: "CÀ PHÊ",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8911",
    //   },
    //   {
    //     name: "LÚA MÌ",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8917",
    //   },
    // ]
  );

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

  const [listGiaVang, setListGiaVang] = useState([]);
  const [listLaiSuat, setListLaiSuat] = useState([]);
  const [listLaiSuatOnline, setListLaiSuatOnline] = useState([]);
  const [listGiaXangDau, setListGiaXangDau] = useState([]);
  const [listGiaXangDauHistory, setListGiaXangDauHistory] = useState([]);
  const [listGiaHeo, setListGiaHeo] = useState([]);
  const [listGiaThep, setListGiaThep] = useState([]);
  const [listGiaGao, setListGiaGao] = useState([]);
  const [listGiaCaTra, setListGiaCaTra] = useState([]);
  const [listGiaPhan, setlistGiaPhan] = useState([]);
  const [listGiaDien, setListGiaDien] = useState([]);
  const [listTyGiaNgoaiTe, setTyGiaNgoaiTe] = useState([]);
  const [curTab, setCurTab] = useState<any>('bienDong');
  const [curTabRight, setCurTabRight] = useState<any>('bienDongNganh');
  const [curTabBottom, setCurTabBottom] = useState<any>('chiSoTheGioi');
  const [curTabTop, setCurTabTop] = useState<any>('giaVang');
  const [curSan, setCurSan] = useState<any>('HOSE');
  const [level, setLevel] = useState<any>('1');
  const [upCount, setUpCount] = useState<any>(0);
  const [downCount, setDownCount] = useState<any>(0);
  const [noChangeCount, setNoChangeCount] = useState<any>(0);
  const [dataChangeNuocNgoai, setDataChangeNuocNgoai] = useState<any>([]);
  const [dataChangeTuDoanh, setDataChangeTuDoanh] = useState<any>([]);
  const [dataChangeNuocNgoaiAll, setDataChangeNuocNgoaiAll] = useState<any>([]);
  const [dataChangeTuDoanhAll, setDataChangeTuDoanhAll] = useState<any>([]);
  const [treeMapData, setTreeMapData] = useState<any>([]);
  const [listHeatMap, setListHeatMap] = useState<any>([]);
  const [listIndustryChange, setListIndustryChange] = useState<any>([]);
  const [dataThanhKhoanToday, setDataThanhKhoanToday] = useState<any>([]);

  const [dataTopGdnnBan, setDataTopGdnnBan] = useState<any>([]);
  const [dataTopTuDoanhBan, setDataTopTuDoanhBan] = useState<any>([]);
  const [dataDienBienDongTienNganh, setDataDienBienDongTienNganh] =
    useState<any>([]);
  const [dataTopGdnnMua, setDataTopGdnnMua] = useState<any>([]);
  const [dataTopTuDoanhMua, setDataTopTuDoanhMua] = useState<any>([]);
  const [dataThanhKhoanYesterday, setDataThanhKhoanYesterday] = useState<any>(
    []
  );

  const [highlightedCells, setHighlightedCells] = useState({});

  const [dataWebSocket, setDataWebSocket] = useState([]);
  const [dataListDropdown, setDataListDropdown] = useState([]);
  const [listDropdown, setListDropdown] = useState<any>([
    {
      id: 0,
      title: 'Dầu khí',
      listSymbol: LIST_DAU_KHI,
    },
    {
      id: 1,
      title: 'Hoá chất',
      listSymbol: LIST_HOA_CHAT,
    },
    {
      id: 2,
      title: 'Tài nguyên',
      listSymbol: LIST_TAI_NGUYEN,
    },
    {
      id: 3,
      title: 'Xây dựng & Vật liệu',
      listSymbol: LIST_XAY_DUNG_VAT_LIEU,
    },
    {
      id: 4,
      title: 'Hàng hoá và dịch vụ công nghiệp',
      listSymbol: LIST_HANG_HOA_DICH_VU_CONG_NGHIEP,
    },
    {
      id: 5,
      title: 'Ô tô & linh kiện phụ tùng',
      listSymbol: LIST_OTO_LINH_KIEN_PHU_TUNG,
    },
    {
      id: 6,
      title: 'Thực phẩm & Đồ uống',
      listSymbol: LIST_THUC_PHAM_DO_UONG,
    },
    {
      id: 7,
      title: 'Đồ dùng cá nhân và đồ gia dụng',
      listSymbol: DO_DUNG_CA_NHAN_DO_GIA_DUNG,
    },
    {
      id: 8,
      title: 'Y tế',
      listSymbol: LIST_Y_TE,
    },
    {
      id: 9,
      title: 'Dịch vụ bán lẻ',
      listSymbol: LIST_DICH_VU_BAN_LE,
    },
    {
      id: 10,
      title: 'Phương tiện truyền thông',
      listSymbol: LIST_PHUONG_TIEN_TRUYEN_THONG,
    },
    {
      id: 11,
      title: 'Du lịch & Giải trí',
      listSymbol: LIST_DU_LICH_GIAI_TRI,
    },
    {
      id: 12,
      title: 'Viễn thông',
      listSymbol: LIST_VIEN_THONG,
    },
    {
      id: 13,
      title: 'Dịch vụ tiện ích',
      listSymbol: LIST_DICH_VU_TIEN_ICH,
    },
    {
      id: 14,
      title: 'Ngân hàng',
      listSymbol: LIST_NGAN_HANG,
    },
    {
      id: 15,
      title: 'Bảo hiểm',
      listSymbol: LIST_BAO_HIEM,
    },
    {
      id: 16,
      title: 'Bất động sản',
      listSymbol: LIST_BAT_DONG_SAN,
    },
    {
      id: 17,
      title: 'Dịch vụ tài chính',
      listSymbol: LIST_DICH_VU_TAI_CHINH,
    },
    {
      id: 18,
      title: 'Công nghệ',
      listSymbol: LIST_CONG_NGHE,
    },
  ]);
  const [isPickLaiSuat, setIsPickLaiSuat] = useState<any>(false);
  const [typeLaiSuat, setTypeLaiSuat] = useState<any>('guiTaiQuay');
  const [isPickSoThang, setIsPickSoThang] = useState<any>(false);
  const [soThangGui, setSoThangGui] = useState<any>('18,24,36');
  const [timelineData, setTimelineData] = useState<any>([]);
  const [previousValues, setPreviousValues] = useState({
    sellVol: null,
    buyVol: null,
    netVol: null,
    buyVal: null,
    sellVal: null,
    netVal: null,
  });
  const [bgColors, setBgColors] = useState({
    sellVol: 'transparent',
    buyVol: 'transparent',
    netVol: 'transparent',
    buyVal: 'transparent',
    sellVal: 'transparent',
    netVal: 'transparent',
  });
  const [iboards, setIboards] = useState([]);
  const [webSocket, setWebSocket] = useState(null);
  const token = localStorage.getItem('token');

  const location = useLocation();
  useEffect(() => {
    const tab = location.state?.tab || 'bien-dong';
    switch (tab) {
      case 'bien-dong':
        setCurTab('bienDong');
        break;
      case 'nuoc-ngoai':
        setCurTab('nuocNgoai');
        break;
      case 'tu-doanh':
        setCurTab('tuDoanh');
        break;
      case 'thanh-khoan':
        setCurTab('thanhKhoan');
        break;
      case 'bien-dong-nganh':
        setCurTabRight('bienDongNganh');
        break;
      case 'dien-bien-dong-tien-nganh':
        setCurTabRight('dienBienDongTienNganh');
        break;
      case 'lai-suat':
        setCurTabTop('laiSuat');
        break;
      case 'gia-vang':
        setCurTabTop('giaVang');
        break;
      case 'ty-gia':
        setCurTabBottom('tyGia');
        break;
      case 'the-gioi':
        setCurTabBottom('chiSoTheGioi');
        break;
      case 'hang-hoa':
        setCurTabBottom('chiSoHangHoa');
        break;
      case 'xang-dau':
        setCurTabTop('xangDau');
        break;
      case 'gia-heo':
        setCurTabTop('giaHeo');
        break;
      case 'gia-thep':
        setCurTabTop('giaThep');
        break;
      case 'gia-gao':
        setCurTabTop('giaGao');
        break;
      case 'ca-tra':
        setCurTabTop('giaCaTra');
        break;
      case 'gia-phan':
        setCurTabTop('giaPhan');
        break;
      case 'gia-dien':
        setCurTabTop('giaDien');
        break;
      default:
        break;
    }
  }, [location]);

  // Hàm để lấy danh sách các iboard
  const fetchIboards = async () => {
    try {
      if (!!token) {
        const response = await axios.get(
          `${config.app.VITE_APP_API_URL}/iboards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIboards(response.data?.boards); // Giả sử response.data là mảng các iboard
      }
    } catch (error) {
      console.error('Failed to fetch iboards:', error);
    }
  };

  const parseMessage = (message) => {
    const parts = message.split('|');

    const statusAndStock = parts[0].split('#');
    const status = statusAndStock[0];
    const stock = statusAndStock[1];
    if (!stock) return null;
    if (stock === 'AMV') {
    }

    return {
      stock: stock,
      ceiling: formatNumber(parts[58]),
      floor: formatNumber(parts[59]),
      reference: formatNumber(parts[60]),
      priceBuy3: formatNumber(parts[5]),
      volumeBuy3: formatNumberComma(parts[6]),
      priceBuy2: formatNumber(parts[3]),
      volumeBuy2: formatNumberComma(parts[4]),
      priceBuy1: formatNumber(parts[1]),
      volumeBuy1: formatNumberComma(parts[2]),
      currentPrice: formatNumber(parts[41]),
      change: formatNumber(parts[51]),
      changePercent: parts[52],
      priceSell1: formatNumber(parts[21]),
      volumeSell1: formatNumberComma(parts[22]),
      priceSell2: formatNumber(parts[23]),
      volumeSell2: formatNumberComma(parts[24]),
      priceSell3: formatNumber(parts[25]),
      volumeSell3: formatNumberComma(parts[26]),
      totalVolume: formatNumberComma(parts[53]),
      high: formatNumber(parts[43]),
      low: formatNumber(parts[45]),
      averagePrice: formatNumber(parts[47]),
      foreignBuy: formatNumberComma(parts[71]),
      foreignSell: formatNumberComma(parts[75]),
      room: formatNumberComma(parts[72]),
    };
  };

  // const sortedDataBoard = useMemo(() => {
  //   if (!listDropdown) return [];

  //   return listDropdown
  //     .map((item) => {
  //       const stats = dataWebSocket.reduce(
  //         (acc, element) => {
  //           if (item?.listSymbol?.includes(element?.stock)) {
  //             if (+element?.change > 0) acc.numberOfUp++;
  //             if (+element?.change < 0) acc.numberOfDown++;
  //             if (element?.currentPrice === element?.ceiling)
  //               acc.numberOfCeiling++;
  //             if (element?.currentPrice === element?.floor) acc.numberOfFloor++;
  //             if (element?.currentPrice === element?.reference)
  //               acc.numberOfNoChange++;
  //           }
  //           return acc;
  //         },
  //         {
  //           numberOfFloor: 0,
  //           numberOfCeiling: 0,
  //           numberOfUp: 0,
  //           numberOfDown: 0,
  //           numberOfNoChange: 0,
  //         }
  //       );

  //       return {
  //         ...stats,
  //         floorCount: stats?.numberOfFloor,
  //         ceilingCount: stats?.numberOfCeiling,
  //         upCount: stats?.numberOfUp,
  //         downCount: stats?.numberOfDown,
  //         noChangeCount: stats?.numberOfNoChange,
  //         totalCount: Object.values(stats).reduce(
  //           (total, num) => total + num,
  //           0
  //         ),
  //         ...item,
  //       };
  //     })
  //     .sort(
  //       (a, b) =>
  //         ((b.ceilingCount + b.upCount) / b.totalCount) * 100 -
  //         ((a.ceilingCount + a.upCount) / a.totalCount) * 100
  //     );
  // }, [dataWebSocket, listDropdown]);

  // useEffect(() => {
  //   setDataListDropdown(sortedDataBoard);
  // }, [sortedDataBoard]);

  // useEffect(() => {
  //   let mapDataBoard = dataWebSocket;
  //   const filterMapDataBoard = listDropdown?.map((item: any, index: any) => {
  //     let numberOfFloor = 0;
  //     let numberOfCeiling = 0;
  //     let numberOfUp = 0;
  //     let numberOfDown = 0;
  //     let numberOfNoChange = 0;
  //     for (let i = 0; i < mapDataBoard.length; i++) {
  //       const element = mapDataBoard[i];

  //       if (item?.listSymbol?.includes(element?.stock)) {
  //         if (+element?.change > 0) {
  //           numberOfUp++;
  //         }
  //         if (+element?.change < 0) {
  //           numberOfDown++;
  //         }
  //         if (element?.currentPrice === element?.ceiling) {
  //           numberOfCeiling++;
  //         }
  //         if (element?.currentPrice === element?.floor) {
  //           numberOfFloor++;
  //         }
  //         if (element?.currentPrice === element?.reference) {
  //           numberOfNoChange++;
  //         }
  //       }
  //     }
  //     return {
  //       floorCount: numberOfFloor,
  //       ceilingCount: numberOfCeiling,
  //       upCount: numberOfUp,
  //       downCount: numberOfDown,
  //       noChangeCount: numberOfNoChange,
  //       totalCount:
  //         numberOfFloor +
  //         numberOfCeiling +
  //         numberOfUp +
  //         numberOfDown +
  //         numberOfNoChange,
  //       ...item,
  //     };
  //   });
  //   //sort by ceilingCount + upCount from max to min
  //   let sortedDataBoard = sortBy(filterMapDataBoard, [
  //     function (o) {
  //       return (-(o?.ceilingCount + o?.upCount) / o?.totalCount) * 100;
  //     },
  //   ]);
  //   setDataListDropdown(sortedDataBoard);
  // }, [dataWebSocket]);

  const updateDataWebSocket = (newData) => {
    setDataWebSocket((prevData) => {
      const index = prevData.findIndex((item) => item.stock === newData.stock);
      if (index !== -1) {
        const updatedData = [...prevData];
        let changes = {};

        // Duyệt qua từng trường trong newData để cập nhật
        Object.keys(newData).forEach((key) => {
          // Kiểm tra xem trường mới có giá trị hợp lệ và có khác giá trị cũ hay không
          if (
            newData[key] !== '' &&
            newData[key] !== '0' &&
            updatedData[index][key] !== newData[key]
          ) {
            changes[`${newData.stock}_${key}`] = true; // Đánh dấu có thay đổi

            // Đặt lại đánh dấu thay đổi sau 2 giây
            setTimeout(() => {
              setHighlightedCells((prev) => ({
                ...prev,
                [`${newData.stock}_${key}`]: false,
              }));
            }, 2000);
          }
        });

        // Cập nhật các trường được đánh dấu thay đổi ngay lập tức
        setHighlightedCells((prev) => ({ ...prev, ...changes }));

        // Chỉ cập nhật các trường có giá trị hợp lệ vào dữ liệu
        updatedData[index] = {
          ...updatedData[index],
          ...Object.fromEntries(
            Object.entries(newData).filter(
              ([key, value]) =>
                value !== '' && value !== '0.00' && value !== '0'
            )
          ),
        };
        return updatedData;
      } else {
        return [...prevData, newData];
      }
    });
  };

  useEffect(() => {
    // fetchIboards();

    axios
      .get(`${config.app.VITE_APP_API_URL}/stocks/iboard`)
      .then((res: any) => {
        let dataBoard = res?.data;
        // let dataBoard = res?.data?.data?.stocks;

        //filter list symbol that has in curHeaderTab list symbol
        // let filterDataBoard = dataBoard?.filter((item: any, index: any) => {
        //   return listHeaderFilter[
        //     curHeaderTab - 1
        //   ]?.currentPick?.listSymbol?.includes(item?.os?.c);
        // });
        let filterDataBoard = dataBoard;

        let sortedDataBoard = sortBy(filterDataBoard, [
          function (o) {
            return o?.os?.c;
          },
        ]);
        let mapDataBoard = sortedDataBoard?.map((item: any, index: any) => {
          return {
            stock: item?.os?.c,
            ceiling: formatNumber(item?.os?.ce) || '',
            floor: formatNumber(item?.os?.f) || '',
            reference: formatNumber(item?.os?.rp) || '',
            priceBuy3: formatNumber(item?.orderbook?.b[2]?.p) || '',
            volumeBuy3: formatNumberComma(item?.orderbook?.b[2]?.v) || '',
            priceBuy2: formatNumber(item?.orderbook?.b[1]?.p) || '',
            volumeBuy2: formatNumberComma(item?.orderbook?.b[1]?.v) || '',
            priceBuy1: formatNumber(item?.orderbook?.b[0]?.p) || '',
            volumeBuy1: formatNumberComma(item?.orderbook?.b[0]?.v) || '',
            currentPrice: formatNumber(item?.os?.p) || '',
            volume: formatNumberComma(item?.os?.v) || '',
            change: formatNumber(item?.os?.dc) || '',
            changePercent: item?.os?.dcp?.toFixed(2) || '',
            priceSell1: formatNumber(item?.orderbook?.a[0]?.p) || '',
            volumeSell1: formatNumberComma(item?.orderbook?.a[0]?.v) || '',
            priceSell2: formatNumber(item?.orderbook?.a[1].p) || '',
            volumeSell2: formatNumberComma(item?.orderbook?.a[1]?.v) || '',
            priceSell3: formatNumber(item?.orderbook?.a[2]?.p) || '',
            volumeSell3: formatNumberComma(item?.orderbook?.a[2]?.v) || '',
            totalVolume: formatNumberComma(item?.os?.dv) || '',
            high: formatNumber(item?.os?.hp) || '',
            low: formatNumber(item?.os?.lp) || '',
            averagePrice: formatNumber(item?.os?.ap) || '',
            foreignBuy: formatNumberComma(item?.rs?.bv) || '',
            foreignSell: formatNumberComma(item?.rs?.sv) || '',
            room: formatNumberComma(item?.rs?.tr) || '',
          };
        });

        // // Tạo một kết nối WebSocket mới
        // const ws = new WebSocket('wss://iboard-pushstream.ssi.com.vn/realtime');

        // // Gán WebSocket vào state để sử dụng sau này
        // setWebSocket(ws);

        // // Xử lý khi có tin nhắn đến
        // ws.onmessage = (event) => {
        //   const messageData = parseMessage(event.data);
        //   if (messageData) updateDataWebSocket(messageData);
        // };

        // // Xử lý khi kết nối được mở
        // ws.onopen = () => {
        //   // Gửi thông điệp khi kết nối mở
        //   const message = {
        //     type: 'sub',
        //     topic: 'stockRealtimeByListV2',
        //     variables: mapDataBoard.map((item) => item.stock),
        //     component: 'priceTableEquities',
        //   };
        //   ws.send(JSON.stringify(message));
        // };

        // // Xử lý khi kết nối bị đóng
        // ws.onclose = () => {
        // };

        const filterMapDataBoard = listDropdown?.map(
          (item: any, index: any) => {
            let numberOfFloor = 0;
            let numberOfCeiling = 0;
            let numberOfUp = 0;
            let numberOfDown = 0;
            let numberOfNoChange = 0;
            for (let i = 0; i < mapDataBoard.length; i++) {
              const element = mapDataBoard[i];

              if (item?.listSymbol?.includes(element?.stock)) {
                if (+element?.change > 0) {
                  numberOfUp++;
                }
                if (+element?.change < 0) {
                  numberOfDown++;
                }
                if (element?.currentPrice === element?.ceiling) {
                  numberOfCeiling++;
                }
                if (element?.currentPrice === element?.floor) {
                  numberOfFloor++;
                }
                if (element?.currentPrice === element?.reference) {
                  numberOfNoChange++;
                }
              }
            }
            return {
              floorCount: numberOfFloor,
              ceilingCount: numberOfCeiling,
              upCount: numberOfUp,
              downCount: numberOfDown,
              noChangeCount: numberOfNoChange,
              totalCount:
                numberOfFloor +
                numberOfCeiling +
                numberOfUp +
                numberOfDown +
                numberOfNoChange,
              ...item,
            };
          }
        );
        //sort by ceilingCount + upCount from max to min
        let sortedDataBoardMap = sortBy(filterMapDataBoard, [
          function (o) {
            return (-(o?.ceilingCount + o?.upCount) / o?.totalCount) * 100;
          },
        ]);
        setDataListDropdown(sortedDataBoardMap);
        // setDataListDropdown(filterMapDataBoard);
        // setDataWebSocket(mapDataBoard);
      })
      .catch((error: any) => {
        console.error('Error fetching account info:', error);
      });
  }, []);

  useEffect(() => {
    const newBgColors = { ...bgColors };
    let hasChanged = false;

    for (const key in previousValues) {
      if (!dataChangeNuocNgoai) continue;
      if (!previousValues) continue;

      if (dataChangeNuocNgoai[key] !== previousValues[key]) {
        newBgColors[key] = 'transparent';
        hasChanged = true;
      }
    }

    if (hasChanged) {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          sellVol: dataChangeNuocNgoai?.sellVol,
          buyVol: dataChangeNuocNgoai?.buyVol,
          netVol: dataChangeNuocNgoai?.netVol,
          buyVal: dataChangeNuocNgoai?.buyVal,
          sellVal: dataChangeNuocNgoai?.sellVal,
          netVal: dataChangeNuocNgoai?.netVal,
        };
      });
      setBgColors(newBgColors);

      const timer = setTimeout(() => {
        setBgColors({
          sellVol: 'transparent',
          buyVol: 'transparent',
          netVol: 'transparent',
          buyVal: 'transparent',
          sellVal: 'transparent',
          netVal: 'transparent',
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // setPreviousValues((prevPreviousValues) => {
      //   return {
      //     ...prevPreviousValues,
      //   };
      // });
    }
  }, [dataChangeNuocNgoai]);

  const getIndustryChange = async () => {
    let lastDate = moment().format('YYYY-MM-DD');

    const today = moment().format('e');

    if (today === '6') {
      lastDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    }
    if (today === '0') {
      lastDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    }

    // const response = await axios.get(
    //   `https://mkw-socket-v2.vndirect.com.vn/mkwsocketv2/industrychange?`
    // );
    // const responseVonHoa = await axios.get(
    //   `https://api-finfo.vndirect.com.vn/v4/leader_laggard?q=tradingDate:${lastDate}~indexCode:0500,1300,1700,2300,2700,3300,3500,3700,4500,5300,5500,5700,6500,7500,8300,8500,8600,8700,9500&size=10000`
    // );
    // const responseIndustry = await axios.get(
    //   `https://api-finfo.vndirect.com.vn/v4/industry_classification?q=industryLevel:2`
    // );
    // const responseForeign = await axios.get(
    //   // `https://api-finfo.vndirect.com.vn/v4/foreigns?q=tradingDate:${lastDate}~floor:UPCOM,HNX,HOSE~type:STOCK,IFC,ETF&size=10000`
    //   `https://api-finfo.vndirect.com.vn/v4/foreigns?q=tradingDate:${lastDate}~floor:${curSan}~type:STOCK,IFC,ETF&size=10000`
    // );
    const [response, responseVonHoa, responseIndustry, responseForeign] =
      await Promise.all([
        axios.get(
          'https://mkw-socket-v2.vndirect.com.vn/mkwsocketv2/industrychange'
        ),
        axios.get(
          `https://api-finfo.vndirect.com.vn/v4/leader_laggard?q=tradingDate:${lastDate}~indexCode:0500,1300,1700,2300,2700,3300,3500,3700,4500,5300,5500,5700,6500,7500,8300,8500,8600,8700,9500&size=10000`
        ),
        axios.get(
          'https://api-finfo.vndirect.com.vn/v4/industry_classification?q=industryLevel:2'
        ),
        axios.get(
          `https://api-finfo.vndirect.com.vn/v4/foreigns?q=tradingDate:${lastDate}~floor:${curSan}~type:STOCK,IFC,ETF&size=10000`
        ),
      ]);

    // const responsePE = await axios.get(
    //   `${config.app.VITE_APP_API_URL}/pe-nganh`
    // );
    const dataForeign = responseForeign?.data?.data;

    const top10BuyVal = dataForeign
      ?.sort((a: any, b): any => b?.netVal - a?.netVal)
      ?.slice(0, 7);
    let reorderBuy = reorderFromMiddle(['dummy', ...top10BuyVal]);
    const top10BuyValMap = reorderBuy?.map((item: any) => {
      return {
        value: item?.netVal,
        text: item?.code,
      };
    });
    const top10SellVal = dataForeign
      ?.sort((a: any, b: any) => a?.netVal - b?.netVal)
      ?.slice(0, 7);
    let reorderSell = reorderFromMiddle(['dummy', ...top10SellVal]);
    const top10SellValMap = reorderSell?.map((item: any) => {
      return {
        value: item?.netVal,
        text: item?.code,
      };
    });

    const dataIndustry = responseIndustry?.data?.data;
    // const dataPE = responsePE?.data?.data;
    const listStockIndustryMap = dataIndustry?.map((item: any) => {
      return {
        ...item,
        listStock: item?.codeList?.split(','),
        sumForeignSell: dataForeign?.reduce((acc: any, cur: any) => {
          if (item?.codeList?.split(',').includes(cur?.symbol)) {
            return acc + cur?.sellValue;
          } else return acc;
        }, 0),
        sumForeignBuy: dataForeign?.reduce((acc: any, cur: any) => {
          if (item?.codeList?.split(',').includes(cur?.symbol)) {
            return acc + cur?.buyValue;
          } else return acc;
        }, 0),
      };
    });

    // Tạo một bản đồ (Map) để lưu trữ tổng giá trị mua và bán cho mỗi mã
    const totalBuySellMap = new Map();

    dataForeign.forEach((stock: any) => {
      const { code, buyVal, sellVal } = stock;
      if (totalBuySellMap.has(code)) {
        const existingVals = totalBuySellMap.get(code);
        totalBuySellMap.set(code, {
          buyVal: existingVals.buyVal + buyVal,
          sellVal: existingVals.sellVal + sellVal,
        });
      } else {
        totalBuySellMap.set(code, { buyVal, sellVal });
      }
    });

    // Duyệt qua mỗi ngành trong listStockIndustryMap và tính tổng
    listStockIndustryMap.forEach((industry: any) => {
      let sumBuyVal = 0;
      let sumSellVal = 0;

      industry.listStock.forEach((stockCode: any) => {
        if (totalBuySellMap.has(stockCode)) {
          const { buyVal, sellVal } = totalBuySellMap.get(stockCode);
          sumBuyVal += buyVal;
          sumSellVal += sellVal;
        }
      });

      // Thêm tổng giá trị mua và bán vào mỗi ngành
      industry.sumBuyVal = sumBuyVal;
      industry.sumSellVal = sumSellVal;
    });

    // listStockIndustryMap giờ đã được cập nhật với sumBuyVal và sumSellVal

    const dataVonHoa = responseVonHoa?.data?.data;
    const dataVonHoaGroup = groupBy(dataVonHoa, 'indexCode');
    const dataVonHoaMap = Object.keys(dataVonHoaGroup).map((item) => {
      const data = dataVonHoaGroup[item];
      const vonHoa = data?.reduce((acc, cur) => {
        return acc + cur?.prevCmv;
      }, 0);

      return {
        indexCode: item,
        vonHoa: vonHoa,
      };
    });
    const data = response?.data?.data;
    setDataTopGdnnMua(top10BuyValMap);
    setDataTopGdnnBan(top10SellValMap);
  };

  const getAbsoluteMinValue = (arr) => {
    let result = arr[arr.length / 2];
    return result;
  };

  function reorderFromMiddle(array) {
    let result = [];
    for (let i = array.length; i > 0; i--) {
      const element = array[i];
      if (i % 2 === 0) {
        result.push(element);
      }
    }
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (i % 2 === 1) {
        result.push(element);
      }
    }
    return result;
  }

  const getHeatMap = async () => {
    const responseHeatMap = await axios.get(
      `https://fiin-market.ssi.com.vn/HeatMap/GetHeatMap?language=vi&Exchange=All&Criteria=FrBuyVal`
    );
    const dataHeatMap = responseHeatMap?.data?.items[0]?.sectors;
    setListHeatMap(dataHeatMap);
  };

  const getGiaVang = async () => {
    const responseGiaVang = await axios.get(
      `${config.app.VITE_APP_API_URL}/giaVang`
    );
    const dataGiaVang = responseGiaVang?.data?.data;
    setListGiaVang(dataGiaVang);
  };

  const getLaiSuat = async () => {
    const responseLaiSuat = await axios.get(
      `${config.app.VITE_APP_API_URL}/lai_suat`
    );
    const dataLaiSuat = responseLaiSuat?.data?.data;
    setListLaiSuat(dataLaiSuat);
  };
  const getLaiSuatOnline = async () => {
    const responseLaiSuat = await axios.get(
      `${config.app.VITE_APP_API_URL}/lai_suat_online`
    );
    const dataLaiSuat = responseLaiSuat?.data?.data;
    setListLaiSuatOnline(dataLaiSuat);
  };

  const getGiaXangDau = async () => {
    const responseGiaXangDau = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_xang_dau`
    );
    const dataGiaXangDau = responseGiaXangDau?.data?.data;
    setListGiaXangDau(dataGiaXangDau);
  };
  const getGiaXangDauHistory = async () => {
    const responseGiaXangDau = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_xang_dau_history`
    );
    const dataGiaXangDau = responseGiaXangDau?.data?.data;
    setListGiaXangDauHistory(dataGiaXangDau);
  };

  const getTyGiaNgoaiTe = async () => {
    const responseTyGiaNgoaiTe = await axios.get(
      `${config.app.VITE_APP_API_URL}/ty_gia_ngoai_te`
    );
    const dataTyGiaNgoaiTe = responseTyGiaNgoaiTe?.data?.data;
    setTyGiaNgoaiTe(dataTyGiaNgoaiTe);
  };

  const getTop20 = async (type: string) => {
    const responseTop20 = await axios.get(
      `${config.app.VITE_APP_API_URL}/top20/${type}`
    );
    const dataTop20 = responseTop20?.data?.data;
    const sortByPoint = dataTop20?.sort((a: any, b: any) => {
      return a?.point - b?.point;
    });
    if (sortByPoint.length > 0) setTreeMapData(sortByPoint);
  };

  const getChangeCount = async (type: any) => {
    const responseTop20 = await axios.get(
      `${config.app.VITE_APP_API_URL}/change_count/${type}`
    );
    const dataTop20 = responseTop20?.data?.data[0];
    if (!!dataTop20) {
      setUpCount(dataTop20?.advance);
      setDownCount(dataTop20?.decline);
      setNoChangeCount(dataTop20?.noChange);
    }
  };

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     'wss://mkw-socket-v2.vndirect.com.vn/socket.io/?chart=leaderlargervnindex&EIO=3&transport=websocket&sid=79fb0c1a-5134-4042-9526-da384e9fe2c5'
  //   );
  //   ws.addEventListener('message', () => {
  //     ws.addEventListener('message', (event) => {
  //       if (event?.data === 'o') return;
  //       const parsedData = JSON.parse(event?.data.substring(1));
  //       const messageReceive = JSON.parse(parsedData[0]);
  //       const messageContent = messageReceive?.message.split('::');
  //       // const id = messageContent[0];
  //       const content = messageContent[1];
  //       const contentParse: PrimitiveIndices = JSON.parse(content);
  //     });
  //   });
  // }, []);

  const getDataNuocNgoai = async (type: any) => {
    const responseNuocNgoai = await axios.get(
      `${config.app.VITE_APP_API_URL}/nuoc_ngoai`
    );
    const dataNuocNgoai = responseNuocNgoai?.data?.data;
    const filterCurSan = dataNuocNgoai?.filter((item: any) => {
      return item?.code === `STOCK_${type}`;
    });
    if (filterCurSan.length > 0) {
      setDataChangeNuocNgoai(filterCurSan[0]);
    }
  };

  const getDataTuDoanh = async () => {
    const responseTuDoanh = await axios.get(
      `${config.app.VITE_APP_API_URL}/tu_doanh`
    );
    const dataTuDoanh = responseTuDoanh?.data?.data;
    const dataTuDoanhFilter = dataTuDoanh?.filter(
      (item: any, index: number) => {
        return (
          !!item?.ma_ck && item?.ma_ck !== 'all' && item?.ma_ck?.length === 3
        );
      }
    );
    const filterSumData = dataTuDoanh?.filter((item: any, index: number) => {
      return item?.ma_ck === 'all';
    });

    const dataTuDoanhMap = dataTuDoanhFilter?.map(
      (item, any, index: number) => {
        return {
          ...item,
          sell_val: +item?.sell_val,
          buy_val: +item?.buy_val,
          sell_vol: +item?.sell_vol,
          buy_vol: +item?.buy_vol,
          net_val: +item?.buy_val - +item?.sell_val,
          net_vol: +item?.buy_vol - +item?.sell_vol,
        };
      }
    );

    // Sort to get top 10 buying (mua) by max net_val
    let topDataTuDoanhMua = dataTuDoanhMap
      .slice()
      .sort((a, b) => b.net_val - a.net_val)
      .slice(0, 8);
    let reorderBuy = reorderFromMiddle(topDataTuDoanhMua);
    // Sort to get top 10 selling (ban) by min net_val
    let topDataTuDoanhBan = dataTuDoanhMap
      .slice()
      .sort((a, b) => a.net_val - b.net_val)
      .slice(0, 8);
    let reorderSell = reorderFromMiddle(topDataTuDoanhBan);
    let objectDataTuDoanh = {};
    // {
    //   sellVol: filterSumData[0]?.sell_vol,
    //   buyVol: filterSumData[0]?.buy_vol,
    //   netVol: +filterSumData[0]?.buy_vol - +filterSumData[0]?.sell_vol,
    //   sellVal: filterSumData[0]?.sell_val,
    //   buyVal: filterSumData[0]?.buy_val,
    //   netVal: filterSumData[0]?.buy_val - filterSumData[0]?.sell_val,
    // };
    if (curSan === 'HOSE') {
      objectDataTuDoanh = {
        sellVol: '10809700',
        buyVol: '14870000',
        netVol: 4060300,
        sellVal: '536027742',
        buyVal: '492215742',
        netVal: -438120000,
      };
    } else {
      objectDataTuDoanh = {
        sellVol: '10809700',
        buyVol: '1260000',
        netVol: -669500,
        sellVal: '103941565',
        buyVal: '89391565',
        netVal: -14550000,
      };
      topDataTuDoanhBan = [
        {
          ma_ck: 'MBB',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 22114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 8015680,
          net_vol: 346300,
        },
      ];
      topDataTuDoanhMua = [
        {
          ma_ck: 'TNG',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 346300,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 1149680,
          net_vol: 346300,
        },
      ];
    }
    setDataChangeTuDoanh(objectDataTuDoanh);
    setDataTopTuDoanhBan(reorderSell);
    setDataTopTuDoanhMua(reorderBuy);
  };
  const getDataNuocNgoaiAll = async (type: any) => {
    const responseNuocNgoai = await axios.get(
      `${config.app.VITE_APP_API_URL}/nuoc_ngoai_all`
    );
    const dataNuocNgoai = responseNuocNgoai?.data?.data;
    const filterCurSan = dataNuocNgoai?.filter((item: any) => {
      return item?.code === `STOCK_${type}`;
      // return item;
    });
    const groupData = groupBy(filterCurSan, 'tradingDate');
    const chartData = Object.values(groupData)?.map(
      (item: any, index: number) => {
        return {
          netVal: sumBy(item, 'netVal'),
          netVol: sumBy(item, 'netVol'),
          buyVal: sumBy(item, 'buyVal'),
          sellVal: sumBy(item, 'sellVal'),
          tradingDate: item[0]?.tradingDate,
        };
      }
    );
    const sliceData = chartData?.slice(0, 10);
    // const sliceData = filterCurSan?.slice(0, 10);
    if (sliceData.length > 0) setDataChangeNuocNgoaiAll(sliceData);
  };
  const getDataTuDoanhAll = async (type: any) => {
    const responseNuocNgoai = await axios.get(
      `${config.app.VITE_APP_API_URL}/tu_doanh_all`
    );
    const responseTuDoanh = await axios.get(
      `${config.app.VITE_APP_API_URL}/tu_doanh`
    );
    const dataTuDoanh = responseTuDoanh?.data?.data;
    const dataTuDoanhFilter = dataTuDoanh?.filter(
      (item: any, index: number) => {
        return (
          !!item?.ma_ck && item?.ma_ck !== 'all' && item?.ma_ck?.length === 3
        );
      }
    );
    const filterSumData = dataTuDoanh?.filter((item: any, index: number) => {
      return item?.ma_ck === 'all';
    });

    const dataTuDoanhMap = dataTuDoanhFilter?.map(
      (item, any, index: number) => {
        return {
          ...item,
          sell_val: +item?.sell_val,
          buy_val: +item?.buy_val,
          sell_vol: +item?.sell_vol,
          buy_vol: +item?.buy_vol,
          net_val: +item?.buy_val - +item?.sell_val,
          net_vol: +item?.buy_vol - +item?.sell_vol,
        };
      }
    );

    // Sort to get top 10 buying (mua) by max net_val
    let topDataTuDoanhMua = dataTuDoanhMap
      .slice()
      .sort((a, b) => b.net_val - a.net_val)
      .slice(0, 10);

    // Sort to get top 10 selling (ban) by min net_val
    let topDataTuDoanhBan = dataTuDoanhMap
      .slice()
      .sort((a, b) => a.net_val - b.net_val)
      .slice(0, 10);

    let objectDataTuDoanh = {
      sellVol: filterSumData[0]?.sell_vol,
      buyVol: filterSumData[0]?.buy_vol,
      netVol: +filterSumData[0]?.buy_vol - +filterSumData[0]?.sell_vol,
      sellVal: filterSumData[0]?.sell_val,
      buyVal: filterSumData[0]?.buy_val,
      netVal: filterSumData[0]?.buy_val - filterSumData[0]?.sell_val,
    };
    if (curSan === 'HOSE') {
      objectDataTuDoanh = {
        sellVol: '6660000',
        buyVol: ' 14870000',
        netVol: 11269500,
        sellVal: '930335742',
        buyVal: '492215742',
        netVal: -438120000,
      };
    } else {
      objectDataTuDoanh = {
        sellVol: '260000 ',
        buyVol: '1929500',
        netVol: 4060300,
        sellVal: '103941565',
        buyVal: '89391565',
        netVal: -14550000,
      };
      topDataTuDoanhBan = [
        {
          ma_ck: 'PVS',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 52114665,
          buy_val: 52114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: -32800000,
          net_vol: 346300,
        },
        {
          ma_ck: 'PVS',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 47114665,
          buy_val: 47114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: -3280000,
          net_vol: 346300,
        },
        // {
        //   ma_ck: 'DNP',
        //   sell_vol: -8005400,
        //   buy_vol: 951700,
        //   sell_val: 14098985,
        //   buy_val: 22114665,
        //   date_time: '2024-08-09T01:16:03.000Z',
        //   net_val: -570000,
        //   net_vol: 346300,
        // },
        // {
        //   ma_ck: 'L18',
        //   sell_vol: 605400,
        //   buy_vol: 951700,
        //   sell_val: 14098985,
        //   buy_val: 22114665,
        //   date_time: '2024-08-09T01:16:03.000Z',
        //   net_val: -1860000,
        //   net_vol: 346300,
        // },
        {
          ma_ck: 'MBS',
          sell_vol: -535400,
          buy_vol: 951700,
          sell_val: 43114665,
          buy_val: 43114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: -4730000,
          net_vol: 810000,
        },
        {
          ma_ck: 'DL1',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 19114665,
          buy_val: 19114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: -600000,
          net_vol: 346300,
        },
        {
          ma_ck: 'NTP',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 61114665,
          buy_val: 61114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: -440000,
          net_vol: 346300,
        },
        // // {
        // //   ma_ck: 'PVS',
        // //   sell_vol: 605400,
        // //   buy_vol: 951700,
        // //   sell_val: 14098985,
        // //   buy_val: 22114665,
        // //   date_time: '2024-08-09T01:16:03.000Z',
        // //   net_val: 770000,
        // //   net_vol: 770000,
        // // },
        // {
        //   ma_ck: 'IDC',
        //   sell_vol: 605400,
        //   buy_vol: 951700,
        //   sell_val: 14098985,
        //   buy_val: 22114665,
        //   date_time: '2024-08-09T01:16:03.000Z',
        //   net_val: -13200000,
        //   net_vol: 429000,
        // },
      ].sort((a, b) => a.net_val - b.net_val);
      topDataTuDoanhMua = [
        // {
        //   ma_ck: 'TNG',
        //   sell_vol: 605400,
        //   buy_vol: 951700,
        //   sell_val: 14098985,
        //   buy_val: 22114665,
        //   date_time: '2024-08-09T01:16:03.000Z',
        //   net_val: 810000,
        //   net_vol: 810000,
        // },

        {
          ma_ck: 'MST',
          sell_vol: 1410400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 770000,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 3780000,
          net_vol: 770000,
        },
        {
          ma_ck: 'IDC',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 429000,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 57220000,
          net_vol: 429000,
        },
        {
          ma_ck: 'IDC',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 22114665,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 572200000,
          net_vol: 429000,
        },
        {
          ma_ck: 'CEO',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 14098985,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 134000,
          net_vol: 429000,
        },

        {
          ma_ck: 'TNG',
          sell_vol: 605400,
          buy_vol: 951700,
          sell_val: 14098985,
          buy_val: 605400,
          date_time: '2024-08-09T01:16:03.000Z',
          net_val: 130000,
          net_vol: 429000,
        },
      ].sort((a, b) => b.net_val - a.net_val);
    }
    let reorderSell = reorderFromMiddle(topDataTuDoanhBan);
    let reorderBuy = reorderFromMiddle(topDataTuDoanhMua);

    setDataChangeTuDoanh(objectDataTuDoanh);
    setDataTopTuDoanhBan(reorderSell);
    setDataTopTuDoanhMua(reorderBuy);
    const dataNuocNgoai = responseNuocNgoai?.data?.data;
    const filterCurSan = dataNuocNgoai?.filter((item: any) => {
      return item?.code === `${type === 'HOSE' ? 'VNINDEX' : type}`;
      // return item;
    });
    // const groupData = groupBy(filterCurSan, 'date');
    // const chartData = Object.values(groupData)?.map(
    //   (item: any, index: number) => {
    //     return {
    //       netVal: sumBy(item, 'netVal'),
    //       netVol: sumBy(item, 'netVol'),
    //       date: item[0]?.date,
    //     };
    //   }
    // );
    let sliceData = filterCurSan?.slice(0, 10);

    if (sliceData.length > 0) setDataChangeTuDoanhAll([...sliceData]);
  };

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

  const getTopGDNNRongBan = async (type: any) => {
    const responseTopGDNNRongBan = await axios.get(
      `${config.app.VITE_APP_API_URL}/top_gdnn_rong_ban/${type}`
    );
    const dataTopGDNNRongBan = responseTopGDNNRongBan?.data?.data;
    setDataTopGdnnBan(dataTopGDNNRongBan);
  };
  const getTopGDNNRongMua = async (type: any) => {
    const responseTopGDNNRongMua = await axios.get(
      `${config.app.VITE_APP_API_URL}/top_gdnn_rong_mua/${type}`
    );
    const dataTopGDNNRongMua = responseTopGDNNRongMua?.data?.data;
    setDataTopGdnnMua(dataTopGDNNRongMua);
  };

  const getDienBienDongTienNganh = async () => {
    const responseDienBien = await axios.get(
      'https://mkw-socket-v2.vndirect.com.vn/mkwsocketv2/industrytrending'
    );
    const dataDienBien = responseDienBien?.data?.data;
    setDataDienBienDongTienNganh(dataDienBien);
  };

  const getGiaHeo = async () => {
    const responseGiaHeo = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_heo`
    );
    const dataGiaHeo = responseGiaHeo?.data?.data;
    setListGiaHeo(dataGiaHeo);
  };

  const getGiaThep = async () => {
    const responseGiaThep = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_thep`
    );
    const dataGiaThep = responseGiaThep?.data?.data;
    setListGiaThep(dataGiaThep);
  };

  const getGiaGao = async () => {
    const responseGiaGao = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_gao`
    );
    const dataGiaGao = responseGiaGao?.data?.data;
    setListGiaGao(dataGiaGao);
  };

  const getGiaCaTra = async () => {
    const responseGiaCaTra = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_ca_tra`
    );
    const dataGiaCaTra = responseGiaCaTra?.data?.data;
    setListGiaCaTra(dataGiaCaTra);
  };

  const getgiaPhan = async () => {
    const responsegiaPhan = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_phan`
    );
    const datagiaPhan = responsegiaPhan?.data?.data;
    setlistGiaPhan(datagiaPhan);
  };

  const getGiaDien = async () => {
    const responseGiaDien = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_dien`
    );
    const dataGiaDien = responseGiaDien?.data?.data;
    setListGiaDien(dataGiaDien);
  };

  const scrollContainerRef = useRef(null);
  const scrollHorizontally = (direction) => {
    // Assuming 200px is the scroll amount you want per click
    const scrollAmount = 100;
    if (direction === 'left') {
      scrollContainerRef?.current?.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === 'right') {
      scrollContainerRef?.current?.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    // getHeatMap();
    getIndustryChange();
    getGiaVang();
    getLaiSuat();
    getLaiSuatOnline();
    getGiaXangDau();
    // getGiaXangDauHistory();
    getTyGiaNgoaiTe();
    getGiaHeo();
    getGiaThep();
    getGiaGao();
    getGiaCaTra();
    getgiaPhan();
    getGiaDien();
    getTop20('hose');
    getChangeCount('VNINDEX');
    getDataNuocNgoai('HOSE');
    getDataNuocNgoaiAll('HOSE');
    getDataTuDoanhAll('HOSE');
    getThanhKhoan('hose');
    getThannhKhoanHistory('hose');
    // getTopGDNNRongBan('hose');
    // getTopGDNNRongMua('hose');
    getDienBienDongTienNganh();
    getDataTuDoanh();
    // getHeatMapData();
    // getListNuocNgoai();
    // getListHangHoa();
    // getDataChangeSymbol();
    // getDataChangeSymbolNuocNgoai();
    const ws = new WebSocket(
      'wss://streaming.forexpros.com/echo/416/os_yqv68/websocket'
    ); // replace widiv your server address
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

  useEffect(() => {
    // getDataChangeSymbol();
    // getDataChangeSymbolNuocNgoai();
    getIndustryChange();
    getDataTuDoanh();
    getTop20(curSan.toLowerCase());
    getChangeCount(curSan === 'HOSE' ? 'VNINDEX' : 'HNX');
    getDataNuocNgoai(curSan);
    getDataNuocNgoaiAll(curSan);
    getDataTuDoanhAll(curSan);
    getThanhKhoan(curSan.toLowerCase());
    getThannhKhoanHistory(curSan.toLowerCase());
    // getTopGDNNRongBan(curSan.toLowerCase());
    // getTopGDNNRongMua(curSan.toLowerCase());
  }, [curSan]);

  // useEffect(() => {
  //   // Định nghĩa hàm để gọi tất cả các API
  //   const callAPIs = () => {
  //     getTop20(curSan.toLowerCase());
  //     getChangeCount(curSan === 'HOSE' ? 'VNINDEX' : 'HNX');
  //     // getDataNuocNgoai(curSan);
  //     // getDataNuocNgoaiAll(curSan);
  //     // getDataTuDoanhAll(curSan);
  //     // getThanhKhoan(curSan.toLowerCase());
  //     // getThannhKhoanHistory(curSan.toLowerCase());
  //     // getTopGDNNRongBan(curSan.toLowerCase());
  //     // getTopGDNNRongMua(curSan.toLowerCase());
  //   };

  //   // Gọi hàm ngay lập tức và sau đó mỗi 3 giây
  //   callAPIs();
  //   const intervalId = setInterval(callAPIs, 10000);

  //   // Cleanup interval khi component unmount
  //   return () => clearInterval(intervalId);
  // }, [curSan]);
  // call api every 5 secondßs
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getDataNuocNgoai(curSan);
  //     getDataNuocNgoaiAll(curSan);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [curSan]);

  const [data, setData] = useState({});
  const { user } = useAppSelector((state: RootState) => state.app);
  useEffect(() => {
    const socket = io(
      `${config?.socket?.VITE_REACT_HOME}`
      // `${config?.socket?.VITE_REACT_HOME}?userId=${user?.userID}`
    );

    socket.on('data', (newData) => {
      const top20 = newData?.top20[curSan.toLowerCase()];
      const sortByPoint = top20?.sort((a: any, b: any) => {
        return a?.point - b?.point;
      });
      if (sortByPoint.length > 0) setTreeMapData(sortByPoint);

      const dataTop20 = newData?.changeCount[curSan.toLowerCase()][0];
      if (!!dataTop20) {
        if (dataTop20?.advance !== 0) setUpCount(dataTop20?.advance);
        if (dataTop20?.decline !== 0) setDownCount(dataTop20?.decline);
        if (dataTop20?.noChange !== 0) setNoChangeCount(dataTop20?.noChange);
      }

      const dataIboardParse = newData?.iboard;
      const dataIboard = JSON.parse(dataIboardParse);
      if (!!dataIboard) {
        let filterDataBoard = dataIboard;

        let sortedDataBoard = sortBy(filterDataBoard, [
          function (o) {
            return o?.os?.c;
          },
        ]);
        let mapDataBoard = sortedDataBoard?.map((item: any, index: any) => {
          return {
            stock: item?.os?.c,
            ceiling: formatNumber(item?.os?.ce) || '',
            floor: formatNumber(item?.os?.f) || '',
            reference: formatNumber(item?.os?.rp) || '',
            priceBuy3: formatNumber(item?.orderbook?.b[2]?.p) || '',
            volumeBuy3: formatNumberComma(item?.orderbook?.b[2]?.v) || '',
            priceBuy2: formatNumber(item?.orderbook?.b[1]?.p) || '',
            volumeBuy2: formatNumberComma(item?.orderbook?.b[1]?.v) || '',
            priceBuy1: formatNumber(item?.orderbook?.b[0]?.p) || '',
            volumeBuy1: formatNumberComma(item?.orderbook?.b[0]?.v) || '',
            currentPrice: formatNumber(item?.os?.p) || '',
            volume: formatNumberComma(item?.os?.v) || '',
            change: formatNumber(item?.os?.dc) || '',
            changePercent: item?.os?.dcp?.toFixed(2) || '',
            priceSell1: formatNumber(item?.orderbook?.a[0]?.p) || '',
            volumeSell1: formatNumberComma(item?.orderbook?.a[0]?.v) || '',
            priceSell2: formatNumber(item?.orderbook?.a[1].p) || '',
            volumeSell2: formatNumberComma(item?.orderbook?.a[1]?.v) || '',
            priceSell3: formatNumber(item?.orderbook?.a[2]?.p) || '',
            volumeSell3: formatNumberComma(item?.orderbook?.a[2]?.v) || '',
            totalVolume: formatNumberComma(item?.os?.dv) || '',
            high: formatNumber(item?.os?.hp) || '',
            low: formatNumber(item?.os?.lp) || '',
            averagePrice: formatNumber(item?.os?.ap) || '',
            foreignBuy: formatNumberComma(item?.rs?.bv) || '',
            foreignSell: formatNumberComma(item?.rs?.sv) || '',
            room: formatNumberComma(item?.rs?.tr) || '',
          };
        });

        const filterMapDataBoard = listDropdown?.map(
          (item: any, index: any) => {
            let numberOfFloor = 0;
            let numberOfCeiling = 0;
            let numberOfUp = 0;
            let numberOfDown = 0;
            let numberOfNoChange = 0;
            for (let i = 0; i < mapDataBoard.length; i++) {
              const element = mapDataBoard[i];

              if (item?.listSymbol?.includes(element?.stock)) {
                if (+element?.change > 0) {
                  numberOfUp++;
                }
                if (+element?.change < 0) {
                  numberOfDown++;
                }
                if (element?.currentPrice === element?.ceiling) {
                  numberOfCeiling++;
                }
                if (element?.currentPrice === element?.floor) {
                  numberOfFloor++;
                }
                if (element?.currentPrice === element?.reference) {
                  numberOfNoChange++;
                }
              }
            }
            return {
              floorCount: numberOfFloor,
              ceilingCount: numberOfCeiling,
              upCount: numberOfUp,
              downCount: numberOfDown,
              noChangeCount: numberOfNoChange,
              totalCount:
                numberOfFloor +
                numberOfCeiling +
                numberOfUp +
                numberOfDown +
                numberOfNoChange,
              ...item,
            };
          }
        );
        //sort by ceilingCount + upCount from max to min
        let sortedDataBoardMap = sortBy(filterMapDataBoard, [
          function (o) {
            return (-(o?.ceilingCount + o?.upCount) / o?.totalCount) * 100;
          },
        ]);
        setDataListDropdown(sortedDataBoardMap);
      }

      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, [curSan]);
  const optionsColumn = {
    animation: false,
    animationEasing: 'elasticOut',
    animationDuration: 2000,
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
    width: '350px',
    title: {
      text: '',
      // text: 'Tác động tới VNINDEX',
      left: 'center',
      textStyle: {
        color: screenMode === 'dark' ? '#fff' : 'black',
        fontFamily: 'Roboto Flex',
        fontWeight: '400',
        fontSize: '12px',
      },
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
      formatter: function (params: any) {
        return !!params[0]?.name
          ? // ? `<div style="position: absolute; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 0px; top: 0px; pointer-events: none;">Mã: ${params[0]?.name}<br>Mức độ đóng góp vào ${curSan === 'HNX' ? 'HNX' : 'VNINDEX'}: ${params[0]?.data?.value.toFixed(3)}</div>`
            `<div style="border-style: solid; white-space: nowrap; z-index: 9999999; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; pointer-events: none;">Mã: ${params[0]?.name}<br>Mức độ đóng góp vào ${curSan === 'HNX' ? 'HNX' : 'VNINDEX'}: ${params[0]?.data?.value.toFixed(3)}</div>`
          : null;
      },
      backgroundColor: 'transparent',
      borderWidth: '0',
    },
    grid: {
      show: false,
      containLabel: true,
      left: '0%',
      right: '0px',
      top: '20%',
      bottom: 0,
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        fontSize: '12px',
        fontFamily: 'Roboto Flex',
        fontWeight: '500',
        color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
      },
      type: 'category',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: screenMode === 'dark' ? ' #3a3f42' : ' #ccc',
        },
      },
      data: treeMapData
        ?.sort((a: any, b: any) => a.point - b.point)

        ?.filter((item: any) => item?.point > 0)
        ?.map((item: any) => item?.symbol),
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        fontSize: '13px',
        fontFamily: 'Roboto Flex',
        fontWeight: '400',
        color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: screenMode === 'dark' ? ' #3a3f42' : ' #ccc',
        },
      },
    },
    series: [
      {
        name: 'Actual Data',
        data: treeMapData
          ?.sort((a: any, b: any) => a.point - b.point)

          ?.filter((item: any) => item?.point > 0)
          .map((item: any) => ({
            value: item?.point,
            itemStyle: {
              color: item?.point > 0 ? '#4B9B63' : '#D15449',
              // shadowColor: 'rgba(200, 200, 200, 0.5)', // Màu mờ mờ cho cột
              // shadowBlur: 10, // Độ mờ của phần shadow
              shadowOffsetX: 0, // Không dịch chuyển theo trục X
              shadowOffsetY: 0, // Không dịch chuyển theo trục Y
            },
          })),
        type: 'bar',
        barWidth: '15px',
        barMinWidth: '20px',
        barMaxWidth: '25px',
        barCategoryGap: '5px',
        itemStyle: {
          borderRadius: [2, 2, 2, 2], // Adding border radius here
        },
        z: 2,
      },
    ],
  };
  const optionsColumnGiam = {
    animation: false,
    animationEasing: 'elasticOut',
    animationDuration: 2000,
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
    width: '350px',
    title: {
      text: '',
      // text: 'Tác động tới VNINDEX',
      left: 'center',
      textStyle: {
        color: screenMode === 'dark' ? '#fff' : 'black',
        fontFamily: 'Roboto Flex',
        fontWeight: '400',
        fontSize: '12px',
      },
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
      formatter: function (params: any) {
        return !!params[0]?.name
          ? // ? `<div style="position: absolute; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 0px; top: 0px; pointer-events: none;">Mã: ${params[0]?.name}<br>Mức độ đóng góp vào ${curSan === 'HNX' ? 'HNX' : 'VNINDEX'}: ${params[0]?.data?.value.toFixed(3)}</div>`
            `<div style="border-style: solid; white-space: nowrap; z-index: 9999999; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; pointer-events: none;">Mã: ${params[0]?.name}<br>Mức độ đóng góp vào ${curSan === 'HNX' ? 'HNX' : 'VNINDEX'}: ${params[0]?.data?.value.toFixed(3)}</div>`
          : null;
      },
      backgroundColor: 'transparent',
      borderWidth: '0',
    },
    grid: {
      show: false,
      containLabel: true,
      left: '0%',
      right: '0px',
      top: '20%',
      bottom: 0,
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      // position: 'top',
      axisLabel: {
        interval: 0,
        fontSize: '12px',
        fontFamily: 'Roboto Flex',
        fontWeight: '500',
        color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
      },
      type: 'category',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: screenMode === 'dark' ? ' #3a3f42' : ' #ccc',
        },
      },
      data: treeMapData
        ?.sort((a: any, b: any) => b.point - a.point)

        ?.filter((item: any) => item?.point < 0)
        ?.map((item: any) => item?.symbol),
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        fontSize: '13px',
        fontFamily: 'Roboto Flex',
        fontWeight: '400',
        color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: screenMode === 'dark' ? ' #3a3f42' : ' #ccc',
        },
      },
    },
    series: [
      {
        name: 'Actual Data',
        data: treeMapData
          ?.sort((a: any, b: any) => b.point - a.point)
          ?.filter((item: any) => item?.point < 0)
          .map((item: any) => ({
            value: item?.point,
            itemStyle: {
              color: item?.point > 0 ? '#4B9B63' : '#D15449',
              // shadowColor: 'rgba(200, 200, 200, 0.5)', // Màu mờ mờ cho cột
              // shadowBlur: 10, // Độ mờ của phần shadow
              shadowOffsetX: 0, // Không dịch chuyển theo trục X
              shadowOffsetY: 0, // Không dịch chuyển theo trục Y
            },
          })),
        type: 'bar',
        barWidth: '15px',
        barMinWidth: '20px',
        barMaxWidth: '25px',
        barCategoryGap: '5px',
        itemStyle: {
          borderRadius: [2, 2, 2, 2], // Adding border radius here
        },
        z: 2,
      },
    ],
  };

  const optionNuocNgoaiNew = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        return !!params[0]?.name
          ? `<div style=" border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; pointer-events: none;">Ngày: ${params[0]?.name}<br><div style="display: flex; flex-direction: row;"><div style="background-color: #4B9B63; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[0]?.seriesName}: ${params[0]?.value?.toFixed(2)} (Tỷ đồng)</div></div><br><div style="display: flex; flex-direction: row;"><div style="background-color: #D15449; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[1]?.seriesName}: ${params[1]?.value?.toFixed(2)} (Tỷ đồng)</div></div><br><div style="display: flex; flex-direction: row;"><div style="background-color: #D6D94C; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[2]?.seriesName}: ${params[2]?.value?.toFixed(2)} (Tỷ đồng)</div></div></div>`
          : // }<br>Giá trị mua ròng: ${formatNumberToBillion(
            //   params[0]?.data?.value * 1000
            // ).toLocaleString('en-US')}</div>`
            null;
      },

      position: function (point, params, dom, rect, size) {
        // Calculate width and height of the tooltip
        const tooltipWidth = dom.clientWidth;
        const tooltipHeight = dom.clientHeight;

        // Calculate the best position for the tooltip
        let posX = point[0];
        let posY = point[1];

        // Adjust X position - Keep tooltip inside the chart area
        if (posX + tooltipWidth > size.viewSize[0]) {
          posX = size.viewSize[0] - tooltipWidth;
        }
        if (posX < 0) {
          posX = 0;
        }

        // Adjust Y position - Keep tooltip above the cursor and inside the chart area
        if (posY - tooltipHeight - 20 < 0) {
          // 20 is the approximate offset from the cursor
          posY = posY + 20; // Below the cursor if it doesn't fit above
        } else {
          posY = posY - tooltipHeight - 20;
        }

        return [posX, posY];
      },
      backgroundColor: 'transparent',
      borderWidth: '0',
    },
    grid: {
      top: 20,
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dataChangeNuocNgoaiAll
        ?.map((item: any) => moment(item.tradingDate).format('DD/MM'))
        .reverse(),
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisLabel: {
        formatter: function (value, index) {
          // Only show the label if the index is odd
          return index % 2 !== 0 ? value : '';
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
        },
      },
      splitLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#30323B' : '#D0D2D8', // Lighter grid lines
          type: 'dotted',
          width: 1,
        },
      },
    },
    series: [
      {
        name: 'Giá trị mua',
        type: 'bar',
        stack: 'giá trị',
        barWidth: 20, // Adjust the bar width for aesthetic preference
        itemStyle: {
          color: function (params) {
            // Different colors based on the sign of the value
            return params.value > 0 ? '#4B9B63' : '#D15449';
          },
          borderRadius: [2, 2, 0, 0],
        },
        data: dataChangeNuocNgoaiAll
          ?.map((item: any) => item?.buyVal / 1000000000)
          .reverse(),
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '15px',
      },
      {
        name: 'Giá trị bán',
        type: 'bar',
        stack: 'giá trị',
        barWidth: 20,
        itemStyle: {
          color: function (params) {
            return params.value > 0
              ? screenMode === 'dark'
                ? '#4B9B63'
                : '#589B4B'
              : '#D15449';
          },
          borderRadius: [0, 0, 2, 2],
        },
        data: dataChangeNuocNgoaiAll
          ?.map((item: any) => -item?.sellVal / 1000000000)
          .reverse(),
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '15px',
      },
      {
        name: 'Giá trị ròng',
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: screenMode === 'dark' ? '#D6D94C' : '#D6D94C',
        },
        data: dataChangeNuocNgoaiAll
          ?.map((item: any) => item?.netVal / 1000000000)
          .reverse(),
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '15px',
      },
    ],
  };

  const optionTuDoanhNew = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        return !!params[0]?.name
          ? // ? `<div style="border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; pointer-events: none;">Ngày: ${params[0]?.name}<br><div style="display: flex; flex-direction: row;"><div style="background-color: #4B9B63; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[0]?.seriesName}: ${params[0]?.value?.toFixed(2)} (Tỷ đồng)</div></div><br><div style="display: flex; flex-direction: row;"><div style="background-color: #D15449; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[1]?.seriesName}: ${params[1]?.value?.toFixed(2)} (Tỷ đồng)</div></div><br><div style="display: flex; flex-direction: row;"><div style="background-color: #D6D94C; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[2]?.seriesName}: ${params[2]?.value?.toFixed(2)} (Tỷ đồng)</div></div></div>`
            `<div style=" border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; pointer-events: none;">Ngày: ${params[0]?.name}<br><div style="display: flex; flex-direction: row;"><div style="background-color: #4B9B63; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[0]?.seriesName}: ${params[0]?.value?.toFixed(2)} (Tỷ đồng)</div></div><br><div style="display: flex; flex-direction: row;"><div style="background-color: #D15449; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[1]?.seriesName}: ${params[1]?.value?.toFixed(2)} (Tỷ đồng)</div></div><br><div style="display: flex; flex-direction: row;"><div style="background-color: #D6D94C; width: 40px; height: 16px; margin-right: 10px;"></div><div>${params[2]?.seriesName}: ${params[2]?.value?.toFixed(2)} (Tỷ đồng)</div></div></div>`
          : // }<br>Giá trị mua ròng: ${formatNumberToBillion(
            //   params[0]?.data?.value * 1000
            // ).toLocaleString('en-US')}</div>`
            null;
      },
      position: function (point, params, dom, rect, size) {
        // Calculate width and height of the tooltip
        const tooltipWidth = dom.clientWidth;
        const tooltipHeight = dom.clientHeight;

        // Calculate the best position for the tooltip
        let posX = point[0];
        let posY = point[1];

        // Adjust X position - Keep tooltip inside the chart area
        if (posX + tooltipWidth > size.viewSize[0]) {
          posX = size.viewSize[0] - tooltipWidth;
        }
        if (posX < 0) {
          posX = 0;
        }

        // Adjust Y position - Keep tooltip above the cursor and inside the chart area
        if (posY - tooltipHeight - 20 < 0) {
          // 20 is the approximate offset from the cursor
          posY = posY + 20; // Below the cursor if it doesn't fit above
        } else {
          posY = posY - tooltipHeight - 20;
        }

        return [posX, posY];
      },
      backgroundColor: 'transparent',
      // borderColor: "#c8e2f7",
      borderWidth: '0',
    },
    // legend: {
    //   data: ['Giá trị mua', 'Giá trị bán', 'Giá trị ròng'],
    //   textStyle: {
    //     color: function (name) {
    //       if (name === 'Giá trị mua') return '#4B9B63';
    //       if (name === 'Giá trị bán') return '#D15449';
    //       if (name === 'Giá trị ròng') return '#D6D94C';
    //     },
    //   },
    // },
    grid: {
      top: 20,
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dataChangeTuDoanhAll
        ?.map((item: any) => moment(item.date).format('DD/MM'))
        .reverse(),
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisLabel: {
        formatter: function (value, index) {
          // Only show the label if the index is odd
          return index % 2 !== 0 ? value : '';
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
        },
      },
      splitLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#30323B' : '#D0D2D8', // Lighter grid lines
          type: 'dotted',
          width: 1,
        },
      },
    },
    series: [
      {
        name: 'Giá trị mua',
        type: 'bar',
        stack: 'giá trị',
        barWidth: 20, // Adjust the bar width for aesthetic preference
        itemStyle: {
          color: function (params) {
            // Different colors based on the sign of the value
            return params.value > 0 ? '#4B9B63' : '#D15449';
          },
          borderRadius: [2, 2, 0, 0],
        },
        data: dataChangeTuDoanhAll
          ?.map((item: any) => item?.buyingVal / 1000000000)
          .reverse(),
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '25px',
      },
      {
        name: 'Giá trị bán',
        type: 'bar',
        stack: 'giá trị',
        barWidth: 20,
        itemStyle: {
          color: function (params) {
            return params.value > 0 ? '#4B9B63' : '#D15449';
          },
          borderRadius: [0, 0, 2, 2],
        },
        data: dataChangeTuDoanhAll
          ?.map((item: any) => -item?.sellingVal / 1000000000)
          .reverse(),
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '25px',
      },
      {
        name: 'Giá trị ròng',
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#D6D94C', // Yellow line
        },
        data: dataChangeTuDoanhAll
          ?.map((item: any) => item?.netVal / 1000000000)
          .reverse(),
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '25px',
      },
    ],
  };

  const optionsNuocNgoai = {
    title: {
      text: 'Giá trị NN mua ròng (tỷ)',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontFamily: 'Roboto Flex',
        fontSize: '14px',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      // trigger: "item",
      // responsive: true,
      // position: "top",
      //   position: function (point) {
      //     return [point[0], '20%'];
      //     // if u wanna center it to the line, then u could do something like
      //     // [point[0] - width_of_tooltip / 2, '20%']
      // },
      // formatter: "{c}",
      formatter: function (params: any) {
        return !!params[0]?.name
          ? `<div style="position: absolute;  border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 0px; top: 0px; pointer-events: none;">Ngày: ${params[0]?.name}<br>${params[0]?.data?.value > 0 ? 'Mua ròng: ' : 'Bán ròng: '} ${formatToBillionVND(params[0]?.data?.value)}</div>`
          : // }<br>Giá trị mua ròng: ${formatNumberToBillion(
            //   params[0]?.data?.value * 1000
            // ).toLocaleString('en-US')}</div>`
            null;
      },
      backgroundColor: 'transparent',
      // borderColor: "#c8e2f7",
      borderWidth: '0',
      // textStyle: {
      //   color: "#5d6f80",
      // },
    },
    grid: {
      show: false,
      containLabel: true,
      left: '0%',
      right: '3%',
      top: '20%',
      bottom: 0,
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 1,
      },
      type: 'category',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: '#3A3F42',
        },
      },
      data: dataChangeNuocNgoaiAll
        ?.map((item: any) => moment(item.tradingDate).format('DD/MM'))
        .reverse(),
      // [
      //   "30/10",
      //   "31/10",
      //   "01/11",
      //   "02/11",
      //   "03/11",
      //   "06/11",
      //   "07/11",
      //   "08/11",
      //   "09/11",
      //   "10/11",
      // ],
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: '#3A3F42',
        },
      },
      axisLabel: {
        formatter: function (value: any) {
          return value / 1000000000;
        },
      },
    },
    series: [
      {
        data: dataChangeNuocNgoaiAll
          ?.map((item: any) => ({
            value: item?.netVal,
            itemStyle: {
              color: item?.netVal > 0 ? '#4B9B63' : '#D15449',
            },
          }))
          .reverse(),
        type: 'bar',
        showBackground: false,
        backgroundColor: '#535D66',
        itemStyle: {
          color: '#D15449',
        },
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '25px',
      },
    ],
    // barCategoryGap: "20%", // Distance between bars in the same category
    // barGap: "25%",
  };
  const optionsTuDoanh = {
    title: {
      text: 'Giá trị tự doanh mua ròng (tỷ)',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontFamily: 'Roboto Flex',
        fontSize: '14px',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      // trigger: "item",
      // responsive: true,
      // position: "top",
      //   position: function (point) {
      //     return [point[0], '20%'];
      //     // if u wanna center it to the line, then u could do something like
      //     // [point[0] - width_of_tooltip / 2, '20%']
      // },
      // formatter: "{c}",
      formatter: function (params: any) {
        return !!params[0]?.name
          ? `<div style="position: absolute;  border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 0px; top: 0px; pointer-events: none;">Ngày: ${
              params[0]?.name
            }<br>Giá trị mua ròng: ${formatToBillionVND(
              params[0]?.data?.value
            )}</div>`
          : null;
      },
      backgroundColor: 'transparent',
      // borderColor: "#c8e2f7",
      borderWidth: '0',
      // textStyle: {
      //   color: "#5d6f80",
      // },
    },
    grid: {
      show: false,
      containLabel: true,
      left: '0%',
      right: '3%',
      top: '20%',
      bottom: 0,
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 1,
      },
      type: 'category',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: '#3A3F42',
        },
      },
      data: dataChangeTuDoanhAll
        ?.map((item: any) => moment(item?.date).format('DD/MM'))
        .reverse(),
      // [
      //   "30/10",
      //   "31/10",
      //   "01/11",
      //   "02/11",
      //   "03/11",
      //   "06/11",
      //   "07/11",
      //   "08/11",
      //   "09/11",
      //   "10/11",
      // ],
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: '#3A3F42',
        },
      },
      axisLabel: {
        formatter: function (value: any) {
          return value / 1000000000;
        },
      },
    },
    series: [
      {
        data: dataChangeTuDoanhAll
          ?.map((item: any) => ({
            value: item?.netVal,
            itemStyle: {
              color: item?.netVal > 0 ? '#4B9B63' : '#D15449',
            },
          }))
          .reverse(),
        type: 'bar',
        showBackground: false,
        backgroundColor: '#535D66',
        itemStyle: {
          color: '#D15449',
        },
        barMinWidth: '15px',
        barMaxWidth: '20px',
        barCategoryGap: '25px',
      },
    ],
  };

  const options = {
    animation: false,
    chart: {
      type: 'pie',
      animation: false,
      borderColor: '#202127',
      height: 230,
      width: 240,
      left: 0,
      backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
    },
    title: {
      text: 'Số lượng CP, tác động tới VNINDEX',
      align: 'center',
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '14px',
        fontFamily: 'Roboto Flex',
        fontWeight: '400',
      },
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '',
      },
    },

    plotOptions: {
      series: {
        animation: false,
        borderRadius: 0,
        borderColor: screenMode === 'dark' ? '#202127' : '#fff',
        dataLabels: [
          {
            enabled: true,
            borderColor: '#202127',

            distance: '-30%',
            filter: {
              property: 'percentage',
              operator: '>',
              value: 5,
            },
            format:
              upCount === 0 && downCount === 0 && noChangeCount === 0
                ? '0'
                : '{point.y:.1f}',
            style: {
              textOutline: 'none',
              color: screenMode === 'dark' ? '#fff' : '#fff',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'Roboto Flex',
            },
          },
        ],
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: ' +
        '<b>{point.y:.2f}</b><br/>',
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    series: [
      {
        name: 'Browsers',
        colorByPoint: true,
        borderColor: screenMode === 'dark' ? '#202127' : '#fff',

        data: [
          {
            y:
              upCount === 0 && downCount === 0 && noChangeCount === 0
                ? 1
                : upCount,
            name: `Tăng (${upCount})`,

            color: screenMode === 'dark' ? '#4B9B63' : '#589B4B',
            // shadowBlur: 200,
            // shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          {
            y:
              upCount === 0 && downCount === 0 && noChangeCount === 0
                ? 1
                : downCount,
            name: `Giảm (${downCount})`,

            color: '#D15449',
            // shadowBlur: 200,
            // shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          {
            y:
              upCount === 0 && downCount === 0 && noChangeCount === 0
                ? 1
                : noChangeCount,
            name: `Không đổi (${noChangeCount})`,

            color: screenMode === 'dark' ? '#D19B49' : '#E6B34C',
            // shadowBlur: 200,
            // shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        ],
      },
    ],
  };

  const optionDienBienDongTienNganh = {
    animation: false,

    chart: {
      type: 'scatter',
      animation: false,
      plotBorderWidth: 0,
      zoomType: 'xy',
      height: 260,
      borderRadius: '8px',
      backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
    },
    //hide credit
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },

    title: {
      text: '',
      visible: 'none',
    },

    // subtitle: {
    //   text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>',
    // },

    accessibility: {
      point: {
        valueDescriptionFormat:
          '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.',
      },
    },

    xAxis: {
      gridLineWidth: 0,
      tickColor: '#fff',
      lineColor: '#fff',
      title: {
        text: 'TĂNG TRƯỞNG ĐIỂM NGÀNH SO VỚI 5 PHIÊN TRƯỚC (%)',
        style: {
          color: screenMode === 'dark' ? '#fff' : 'black',
        },
      },
      labels: {
        format: '{value}%',
        style: {
          color: screenMode === 'dark' ? '#fff' : 'black',
        },
      },
      plotLines: [
        {
          color: screenMode === 'dark' ? '#fff' : 'black',

          dashStyle: 'line',
          width: 1,
          value: 0,
          label: {
            rotation: 0,
            y: 15,
            style: {
              fontStyle: 'italic',
              color: screenMode === 'dark' ? '#fff' : 'black',
            },
            text: '',
            visible: 'none',
          },
          zIndex: 3,
        },
      ],
      accessibility: {
        rangeDescription: 'Range: 60 to 100 grams.',
      },
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
      gridLineWidth: 0,
      line: true,
      title: {
        text: 'TĂNG TRƯỞNG THANH KHOAN SO VỚI 5 PHIÊN TRƯỚC (%)',
        style: {
          color: screenMode === 'dark' ? '#fff' : 'black',
        },
      },
      labels: {
        format: '{value}%',
        style: {
          color: screenMode === 'dark' ? '#fff' : 'black',
        },
      },
      maxPadding: 0.2,
      plotLines: [
        {
          color: screenMode === 'dark' ? '#fff' : 'black',
          animation: false,
          dashStyle: 'line',
          width: 1,
          value: 0,
          label: {
            align: 'right',
            style: {
              fontStyle: 'italic',
            },
            text: '',
            x: -10,
          },
          zIndex: 3,
        },
      ],
      accessibility: {
        rangeDescription: 'Range: 0 to 160 grams.',
      },
    },

    // tooltip: {
    //   useHTML: true,
    //   headerFormat: '<table>',
    //   pointFormat:
    //     '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
    //     '<tr><th>Điểm chỉ số ngành: </th><td>{point.x}</td></tr>' +
    //     '<tr><th>GTGD: </th><td>{point.y}</td></tr>' +
    //     '<tr><th>Tăng trưởng thanh khoản so với 5 phiên trước: </th><td>{point.y}</td></tr>' +
    //     '<tr><th>Tăng trưởng điểm ngành so với 5 phiên trước: </th><td>{point.z}%</td></tr>',
    //   footerFormat: '</table>',
    //   followPointer: true,
    //   // pointFormat: function (params: any) {
    //   //   return `<div class="tooltip">${params[0]}</div>`;
    //   // },
    // },
    tooltip: {
      formatter: function () {
        return `${this.point.country}<br>Điểm chỉ số ngành: ${this.point.x?.toFixed(2)}<br>GTGD: ${this.point.y.toFixed(2)}<br>Tăng trưởng thanh khoản so với 5 phiên trước: ${this.point.y.toFixed(2)}<br>Tăng trưởng điểm ngành so với 5 phiên trước: ${this.point.z.toFixed(2)}%`;
      },
    },

    plotOptions: {
      animation: false,
      series: {
        animation: false,
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: screenMode === 'dark' ? '#fff' : 'black',
          },
        },
      },
    },

    series: [
      {
        labels: {
          color: screenMode === 'dark' ? '#fff' : 'black',
        },
        data: dataDienBienDongTienNganh?.map((item: any) => {
          return {
            x: item?.indIndexChgPctCr5D,
            y: item?.indTradedValueAvg5DChgPctCr5D,
            z: 1,
            name: LIST_INDUSTRY[item?.indexCode],
            country: LIST_INDUSTRY[item?.indexCode],
          };
        }),

        colorByPoint: true,
        animation: false,
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

  let normalizedDataYesterday = normalizeData(dataThanhKhoanYesterday, true);

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
      // name: 'Time',
      nameLocation: 'middle',
      nameGap: 30,
      // axisLine: {
      //   lineStyle: {
      //     color: screenMode === 'dark' ? '#ABADBA' : '#565B67',
      //   },
      // },
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
        fontSize: 13, // (Tùy chọn) Thay đổi kích thước font chữ
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
          width: 5, // Độ dày đường
        },
        areaStyle: {
          color: screenMode === 'dark' ? '#4B9B63' : '#589B4B', // Màu nền dưới đường
          // width: '2px',
          // opacity: 0.3,
        },
        z: 2,
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
  const timePeriods1 = {
    '1 tháng': 'value1Month',
    '3 tháng': 'value3Month',
    '6 tháng': 'value6Month',
  };
  const timePeriods2 = {
    '9 tháng': 'value9Month',
    '12 tháng': 'value9Month',
    '13 tháng': 'value13Month',
  };
  const timePeriods3 = {
    '18 tháng': 'value18Month',
    '24 tháng': 'value24Month',
    '36 tháng': 'value36Month',
  };
  const vungXangDau = {
    'Vùng 1': 'area1',
    'Vùng 2': 'area2',
  };
  // const CustomTooltip = styled(Tooltip)`
  //   & .ant-tooltip-inner {
  //     background-color: rgba(253, 253, 253, 1);
  //   }
  // `;

  return (
    <StyledHome
      style={{
        padding: '0 16px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        // flex: 100,
        // flex: 100,
        gap: '8px',
        height: '100vh',
      }}
      screen_mode={screenMode}
      onClick={() => {
        setIsPickLaiSuat(false);
        setIsPickSoThang(false);
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          // flex: 1,
          flex: 62.09,
          // flexGrow: 62.09,
          // flexShrink: 1,
          // flexBasis: '0px',
          // height: '571.25px',
        }}
      >
        <div style={{ display: 'flex', flex: 60.237 }}>
          <ChartHomeScreen theme={screenMode} />
        </div>
        <HangHoa
          listHangHoa={listHangHoa}
          screenMode={screenMode}
          curTabBottom={curTabBottom}
          LIST_NGOAI_TE={LIST_NGOAI_TE}
          listTyGiaNgoaiTe={listTyGiaNgoaiTe}
          listNuocNgoai={listNuocNgoai}
          setCurTabBottom={setCurTabBottom}
          ELECTRIC={ELECTRIC}
          formatGoldPrice={formatGoldPrice}
          formatNumber={formatNumber}
          listGiaDien={listGiaDien}
          listGiaVang={listGiaVang}
          STOOL={STOOL}
          listGiaPhan={listGiaPhan}
          listLaiSuat={listLaiSuat}
          curTabTop={curTabTop}
          FISH={FISH}
          listGiaCaTra={listGiaCaTra}
          RICE={RICE}
          listGiaGao={listGiaGao}
          STEEL={STEEL}
          listGiaThep={listGiaThep}
          listGiaHeo={listGiaHeo}
          soThangGui={soThangGui}
          listLaiSuatOnline={listLaiSuatOnline}
          typeLaiSuat={typeLaiSuat}
          setSoThangGui={setSoThangGui}
          setIsPickSoThang={setIsPickSoThang}
          isPickSoThang={isPickSoThang}
          setTypeLaiSuat={setTypeLaiSuat}
          setIsPickLaiSuat={setIsPickLaiSuat}
          isPickLaiSuat={isPickLaiSuat}
          listGiaXangDauHistory={listGiaXangDauHistory}
          vungXangDau={vungXangDau}
          convertDecimalStringToNumber={convertDecimalStringToNumber}
          LIST_XANG_VUNG_1={LIST_XANG_VUNG_1}
          LIST_XANG_VUNG_2={LIST_XANG_VUNG_2}
          LIST_MAP_GOLD_NAME={LIST_MAP_GOLD_NAME}
          GOLD_ICON={GOLD_ICON}
          setCurTabTop={setCurTabTop}
          listMenu={listMenu}
          scrollContainerRef={scrollContainerRef}
          timePeriods1={timePeriods1}
          timePeriods2={timePeriods2}
          timePeriods3={timePeriods3}
          listGiaXangDau={listGiaXangDau}
          scrollHorizontally={scrollHorizontally}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          // flex: 1,
          flex: 37.91,
          // flexGrow: 37.91,
          // flexShrink: 1,
          // flexBasis: '0px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 40.3017241379,
            borderRadius: '6px',
          }}
        >
          <BienDongNganh
            setCurTabRight={setCurTabRight}
            dataListDropdown={dataListDropdown}
            screenMode={screenMode}
            curTabRight={curTabRight}
            optionDienBienDongTienNganh={optionDienBienDongTienNganh}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flex: 59.6982758621,
            borderRadius: '6px',
          }}
        >
          <NuocNgoai
            curTab={curTab}
            optionTuDoanhNew={optionTuDoanhNew}
            formatNumberTo1Billion={formatNumberTo1Billion}
            screenMode={screenMode}
            dataTopTuDoanhBan={dataTopTuDoanhBan}
            dataTopTuDoanhMua={dataTopTuDoanhMua}
            getAbsoluteMinValue={getAbsoluteMinValue}
            dataTopGdnnMua={dataTopGdnnMua}
            optionsColumn={optionsColumn}
            optionsColumnGiam={optionsColumnGiam}
            setCurSan={setCurSan}
            curSan={curSan}
            setCurTab={setCurTab}
            options={options}
            dataTopGdnnBan={dataTopGdnnBan}
            optionNuocNgoaiNew={optionNuocNgoaiNew}
            optionThanh={optionThanh}
            treeMapData={treeMapData}
          />
        </div>
      </div>
    </StyledHome>
  );
};
const MenuItem = ({
  image,
  title,
  des,
  tab,
  icon,
  screenMode,
  index,
  link,
}: any) => {
  return (
    <StyledHome screen_mode={screenMode}>
      <Link
        to={link}
        className="tab-home-item"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 3.75px',
          borderBottom:
            screenMode === 'dark'
              ? index === 5
                ? 'none'
                : '2.5px solid #3a3f42;'
              : index === 5
                ? 'none'
                : '2.5px solid #ccc',
        }}
      >
        <div className="tab-home-icon">{icon}</div>
        <div
          style={{
            width: '100%',
            height: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="tab-home-title"
            style={{
              fontFamily: 'Roboto Flex',
              fontWeight: '700',
              fontSize: '14px',
              color: screenMode === 'dark' ? '#fff' : '#565B67',
              minWidth: '216px',
            }}
          >
            {title}
          </div>
          <div
            className="tab-home-des"
            style={{
              fontFamily: 'Roboto Flex',
              fontWeight: '400',
              fontSize: '14px',
              width: '164px',
            }}
          >
            {des}
          </div>
        </div>
      </Link>
    </StyledHome>
  );
};
export default Home;
