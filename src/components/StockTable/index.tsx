/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import { StyleStockTable } from './styled';
import api from '@/config/api';
import { formatNumber, formatNumberComma } from '../ConvertNumber';
import axios from 'axios';
import { set, sortBy } from 'lodash';
import { config } from '@/config/env';
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
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import moment from 'moment';

const StockTable = () => {
  // Hàm này kiểm tra xem một giá trị cụ thể có nên được highlight hay không
  const screenMode = useSelector(screenModeSelector);

  const [newTitle, setNewTitle] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const [dataWebSocket, setDataWebSocket] = useState([]);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1920 ? 21 : 16);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [hover, setHover] = useState();
  useEffect(() => {
    const updatePageSize = () => {
      const currentWidth = window.innerWidth;

      // Chỉ cập nhật và load lại khi đạt các ngưỡng mới
      if (
        (currentWidth >= 1920 && windowSize < 1920) ||
        (currentWidth >= 1600 &&
          currentWidth < 1920 &&
          (windowSize < 1600 || windowSize >= 1920)) ||
        (currentWidth >= 1440 &&
          currentWidth < 1600 &&
          (windowSize < 1440 || windowSize >= 1600)) ||
        (currentWidth >= 1280 &&
          currentWidth < 1440 &&
          (windowSize < 1280 || windowSize >= 1440))
      ) {
        setPageSize(currentWidth >= 1920 ? 21 : 16);
        setWindowSize(currentWidth); // Cập nhật windowSize để tránh reload liên tục
        window.location.reload();
      }
    };

    window.addEventListener('resize', updatePageSize);

    // Xóa sự kiện lắng nghe khi component bị hủy
    return () => {
      window.removeEventListener('resize', updatePageSize);
    };
  }, [windowSize]);
  // Ban đầu, highlightedCells có thể là một object trống
  const [highlightedCells, setHighlightedCells] = useState({});
  const [curHeaderTab, setCurHeaderTab] = useState(1);
  const [curMyFilter, setCurMyFilter] = useState(0);
  const [listHeaderFilter, setListHeaderFilter] = useState<any>([
    // {
    //   id: 0,
    //   currentPick: {
    //     id: 0,
    //     title: 'Danh mục của tôi',
    //     listSymbol: [],
    //   },
    //   listDropDown: [],
    //   isHover: false,
    // },
    {
      id: 1,
      currentPick: {
        id: 0,
        title: 'HOSE',
        listSymbol: LIST_HOSE,
      },
      listDropDown: [
        {
          id: 0,
          title: 'HOSE',
          listSymbol: LIST_HOSE,
        },
        {
          id: 1,
          title: 'VN30',
          listSymbol: LIST_VN30,
        },
        {
          id: 2,
          title: 'ETF',
          listSymbol: LIST_ETF,
        },
        {
          id: 3,
          title: 'Giao dịch lô lẻ',
          listSymbol: LIST_GIAO_DICH_LO_LE,
        },
        // {
        //   id: 4,
        //   title: 'Giao dịch thoả thuận',
        //   listSymbol: [],
        // },
      ],
      isHover: false,
    },
    {
      id: 2,
      currentPick: {
        id: 0,
        title: 'HNX',
        listSymbol: LIST_HNX,
      },
      listDropDown: [
        {
          id: 0,
          title: 'HNX',
          listSymbol: LIST_HNX,
        },
        {
          id: 1,
          title: 'HNX30',
          listSymbol: LIST_HNX30,
        },
        {
          id: 2,
          title: 'BOND',
          listSymbol: LIST_BOND,
        },
        // {
        //   id: 3,
        //   title: 'Giao dịch thoả thuận',
        //   listSymbol: [],
        // },
      ],
      isHover: false,
    },
    {
      id: 3,
      currentPick: {
        id: 0,
        title: 'UPCOM',
        listSymbol: LIST_UPCOM,
      },
      listDropDown: [
        {
          id: 0,
          title: 'UPCOM',
          listSymbol: LIST_UPCOM,
        },
        // {
        //   id: 1,
        //   title: 'Giao dịch thoả thuận',
        //   listSymbol: [],
        // },
      ],
      isHover: false,
    },
    {
      id: 4,
      currentPick: {
        id: 0,
        title: 'CP Ngành',
        listSymbol: LIST_DAU_KHI,
      },
      listDropDown: [
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
      ],
      isHover: false,
    },
    // {
    //   id: 5,
    //   currentPick: {
    //     id: 0,
    //     title: 'Phái sinh',
    //     listSymbol: [],
    //   },
    //   listDropDown: [
    //     {
    //       id: 0,
    //       title: 'HĐTL chỉ số VN30',
    //       listSymbol: [],
    //     },
    //     {
    //       id: 1,
    //       title: 'HĐTL TPCP',
    //       listSymbol: [],
    //     },
    //   ],
    //   isHover: false,
    // },
    // {
    //   id: 6,
    //   currentPick: {
    //     id: 0,
    //     title: 'Chứng quyền',
    //     listSymbol: [],
    //   },
    //   listDropDown: [
    //     {
    //       id: 0,
    //       title: 'Chứng quyền toàn thị trường',
    //       listSymbol: [],
    //     },
    //     {
    //       id: 1,
    //       title: 'Chứng quyền tại VND',
    //       listSymbol: [],
    //     },
    //   ],
    //   isHover: false,
    // },
  ]);
  const [iboards, setIboards] = useState([]);

  const shouldHighlight = (item, dataIndex) =>
    highlightedCells[`${item.stock}_${dataIndex}`];

  const columns = [
    {
      title: 'CK',
      dataIndex: 'stock',
      key: 'stock',
      render: (text, item) => {
        let isGreen = +item.currentPrice > +item.reference;
        let isYellow = +item.currentPrice === +item.reference;
        let isCeiling = +item.currentPrice === +item.ceiling;
        let isFloor = +item.currentPrice === +item.floor;
        return (
          <div
            style={{
              backgroundColor: shouldHighlight(item, 'stock')
                ? '#E8892B'
                : 'transparent',
              // color:
              //   screenMode === 'dark'
              //     ? shouldHighlight(item, 'stock')
              //       ? '#fff'
              //       : '#fff'
              //     : shouldHighlight(item, 'stock')
              //       ? '#333'
              //       : '#333',
              color:
                screenMode === 'dark'
                  ? shouldHighlight(item, 'change')
                    ? '#fff'
                    : isCeiling
                      ? 'rgba(198, 99, 233, 1)'
                      : isFloor
                        ? 'rgba(71, 211, 235, 1)'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                  : shouldHighlight(item, 'change')
                    ? 'rgba(46, 49, 56, 1)'
                    : isCeiling
                      ? 'rgba(125, 39, 155, 1)'
                      : isFloor
                        ? 'rgba(20, 160, 184, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: 'Trần',
      dataIndex: 'ceiling',
      className: 'custom-column',
      key: 'ceiling',
      render: (text, item) => (
        <div
          style={{
            // color: '#F23AFF',
            backgroundColor: shouldHighlight(item, 'ceiling')
              ? '#E8892B'
              : 'transparent',

            color:
              screenMode === 'dark'
                ? shouldHighlight(item, 'ceiling')
                  ? '#fff'
                  : 'rgba(198, 99, 233, 1)'
                : shouldHighlight(item, 'ceiling')
                  ? '#fff'
                  : 'rgba(125, 39, 155, 1)',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Sàn',
      dataIndex: 'floor',
      className: 'custom-column',
      key: 'floor',
      render: (text, item) => (
        <div
          style={{
            // color: '#02C9FF',
            backgroundColor: shouldHighlight(item, 'floor')
              ? '#E8892B'
              : 'transparent',

            color:
              screenMode === 'dark'
                ? shouldHighlight(item, 'floor')
                  ? '#fff'
                  : 'rgba(71, 211, 235, 1)'
                : shouldHighlight(item, 'floor')
                  ? '#fff'
                  : 'rgba(20, 160, 184, 1)',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'TC',
      dataIndex: 'reference',
      className: 'custom-column',

      key: 'reference',
      render: (text, item) => (
        <div
          style={{
            // color: '#FCFF13',
            backgroundColor: shouldHighlight(item, 'reference')
              ? '#E8892B'
              : 'transparent',

            color:
              screenMode === 'dark'
                ? shouldHighlight(item, 'reference')
                  ? '#fff'
                  : 'rgba(232, 214, 50, 1)'
                : shouldHighlight(item, 'reference')
                  ? '#fff'
                  : 'rgba(156, 112, 22, 1)',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Bên mua',
      children: [
        {
          title: 'Giá 3',
          dataIndex: 'priceBuy3',
          key: 'priceBuy3',

          render: (text, item) => {
            let isGreen = +item.priceBuy3 > +item.reference;
            let isYellow = +item.priceBuy3 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'priceBuy3')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'priceBuy3')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',
                  backgroundColor: shouldHighlight(item, 'priceBuy3')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'KL 3',
          dataIndex: 'volumeBuy3',
          key: 'volumeBuy3',
          render: (text, item) => {
            let isGreen = +item.priceBuy3 > +item.reference;
            let isYellow = +item.priceBuy3 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volumeBuy3')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volumeBuy3')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volumeBuy3')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'Giá 2',
          dataIndex: 'priceBuy2',
          key: 'priceBuy2',
          render: (text, item) => {
            let isGreen = +item.priceBuy2 > +item.reference;
            let isYellow = +item.priceBuy2 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'priceBuy2')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'priceBuy2')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'priceBuy2')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'KL 2',
          dataIndex: 'volumeBuy2',
          key: 'volumeBuy2',
          render: (text, item) => {
            let isGreen = +item.priceBuy2 > +item.reference;
            let isYellow = +item.priceBuy2 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volumeBuy2')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volumeBuy2')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volumeBuy2')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'Giá 1',
          dataIndex: 'priceBuy1',
          key: 'priceBuy1',
          render: (text, item) => {
            let isGreen = +item.priceBuy1 > +item.reference;
            let isYellow = +item.priceBuy1 === +item.reference;

            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'priceBuy1')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'priceBuy1')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'priceBuy1')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'KL 1',
          dataIndex: 'volumeBuy1',
          key: 'volumeBuy1',
          render: (text, item) => {
            let isGreen = +item.priceBuy1 > +item.reference;
            let isYellow = +item.priceBuy1 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volumeBuy1')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volumeBuy1')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volumeBuy1')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
      ],
    },
    {
      title: 'Khớp lệnh',
      className: 'custom-column',

      children: [
        {
          title: 'Giá',
          dataIndex: 'currentPrice',
          key: 'currentPrice',
          className: 'custom-column-cell',
          render: (text, item) => {
            let isGreen = +item.currentPrice > +item.reference;
            let isYellow = +item.currentPrice === +item.reference;
            let isCeiling = +item.currentPrice === +item.ceiling;
            let isFloor = +item.currentPrice === +item.floor;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'currentPrice')
                        ? '#fff'
                        : isCeiling
                          ? 'rgba(198, 99, 233, 1)'
                          : isFloor
                            ? 'rgba(71, 211, 235, 1)'
                            : isYellow
                              ? 'rgba(232, 214, 50, 1)'
                              : isGreen
                                ? 'rgba(92, 214, 128, 1)'
                                : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'currentPrice')
                        ? 'rgba(46, 49, 56, 1)'
                        : isCeiling
                          ? 'rgba(125, 39, 155, 1)'
                          : isFloor
                            ? 'rgba(20, 160, 184, 1)'
                            : isYellow
                              ? 'rgba(156, 112, 22, 1)'
                              : isGreen
                                ? 'rgba(69, 120, 58, 1)'
                                : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'currentPrice')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'Khối lượng',
          dataIndex: 'volume',
          key: 'volume',
          className: 'custom-column-cell',
          render: (text, item) => {
            let isGreen = +item.change > 0;
            let isYellow = +item.change === 0;
            let isCeiling = +item.currentPrice === +item.ceiling;
            let isFloor = +item.currentPrice === +item.floor;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volume')
                        ? '#fff'
                        : isCeiling
                          ? 'rgba(198, 99, 233, 1)'
                          : isFloor
                            ? 'rgba(71, 211, 235, 1)'
                            : isYellow
                              ? 'rgba(232, 214, 50, 1)'
                              : isGreen
                                ? 'rgba(92, 214, 128, 1)'
                                : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volume')
                        ? 'rgba(46, 49, 56, 1)'
                        : isCeiling
                          ? 'rgba(125, 39, 155, 1)'
                          : isFloor
                            ? 'rgba(20, 160, 184, 1)'
                            : isYellow
                              ? 'rgba(156, 112, 22, 1)'
                              : isGreen
                                ? 'rgba(69, 120, 58, 1)'
                                : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volume')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: '+/-',
          dataIndex: 'change',
          key: 'change',
          className: 'custom-column-cell',
          render: (text, item) => {
            let isGreen = +item.change > 0;
            let isYellow = +item.change === 0;
            let isCeiling = +item.currentPrice === +item.ceiling;
            let isFloor = +item.currentPrice === +item.floor;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'change')
                        ? '#fff'
                        : isCeiling
                          ? 'rgba(198, 99, 233, 1)'
                          : isFloor
                            ? 'rgba(71, 211, 235, 1)'
                            : isYellow
                              ? 'rgba(232, 214, 50, 1)'
                              : isGreen
                                ? 'rgba(92, 214, 128, 1)'
                                : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'change')
                        ? 'rgba(46, 49, 56, 1)'
                        : isCeiling
                          ? 'rgba(125, 39, 155, 1)'
                          : isFloor
                            ? 'rgba(20, 160, 184, 1)'
                            : isYellow
                              ? 'rgba(156, 112, 22, 1)'
                              : isGreen
                                ? 'rgba(69, 120, 58, 1)'
                                : 'rgba(163, 57, 41, 1)',
                  backgroundColor: shouldHighlight(item, 'change')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: '+/-(%)',
          dataIndex: 'changePercent',
          key: 'changePercent',
          className: 'custom-column-cell',
          render: (text, item) => {
            let isGreen = +item.change > 0;
            let isYellow = +item.change === 0;
            let isCeiling = +item.currentPrice === +item.ceiling;
            let isFloor = +item.currentPrice === +item.floor;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'changePercent')
                        ? '#fff'
                        : isCeiling
                          ? 'rgba(198, 99, 233, 1)'
                          : isFloor
                            ? 'rgba(71, 211, 235, 1)'
                            : isYellow
                              ? 'rgba(232, 214, 50, 1)'
                              : isGreen
                                ? 'rgba(92, 214, 128, 1)'
                                : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'changePercent')
                        ? 'rgba(46, 49, 56, 1)'
                        : isCeiling
                          ? 'rgba(125, 39, 155, 1)'
                          : isFloor
                            ? 'rgba(20, 160, 184, 1)'
                            : isYellow
                              ? 'rgba(156, 112, 22, 1)'
                              : isGreen
                                ? 'rgba(69, 120, 58, 1)'
                                : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'changePercent')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}%
              </div>
            );
          },
        },
      ],
    },
    {
      title: 'Bên bán',
      children: [
        {
          title: 'Giá 1',
          dataIndex: 'priceSell1',
          key: 'priceSell1',

          render: (text, item) => {
            let isGreen = +item.priceSell1 > +item.reference;
            let isYellow = +item.priceSell1 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'priceSell1')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'priceSell1')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'priceSell1')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'KL 1',
          dataIndex: 'volumeSell1',
          key: 'volumeSell1',

          render: (text, item) => {
            let isGreen = +item.priceSell1 > +item.reference;
            let isYellow = +item.priceSell1 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volumeSell1')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volumeSell1')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volumeSell1')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'Giá 2',
          dataIndex: 'priceSell2',
          key: 'priceSell2',

          render: (text, item) => {
            let isGreen = +item.priceSell2 > +item.reference;
            let isYellow = +item.priceSell2 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'priceSell2')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'priceSell2')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'priceSell2')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'KL 2',
          dataIndex: 'volumeSell2',
          key: 'volumeSell2',

          render: (text, item) => {
            let isGreen = +item.priceSell2 > +item.reference;
            let isYellow = +item.priceSell2 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volumeSell2')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volumeSell2')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volumeSell2')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'Giá 3',
          dataIndex: 'priceSell3',
          key: 'priceSell3',

          render: (text, item) => {
            let isGreen = +item.priceSell3 > +item.reference;
            let isYellow = +item.priceSell3 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'priceSell3')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'priceSell3')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'priceSell3')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
        {
          title: 'KL 3',
          dataIndex: 'volumeSell3',
          key: 'volumeSell3',

          render: (text, item) => {
            let isGreen = +item.priceSell3 > +item.reference;
            let isYellow = +item.priceSell3 === +item.reference;
            return (
              <div
                style={{
                  color:
                    screenMode === 'dark'
                      ? shouldHighlight(item, 'volumeSell3')
                        ? '#fff'
                        : isYellow
                          ? 'rgba(232, 214, 50, 1)'
                          : isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(209, 84, 73, 1)'
                      : shouldHighlight(item, 'volumeSell3')
                        ? 'rgba(46, 49, 56, 1)'
                        : isYellow
                          ? 'rgba(156, 112, 22, 1)'
                          : isGreen
                            ? 'rgba(69, 120, 58, 1)'
                            : 'rgba(163, 57, 41, 1)',

                  backgroundColor: shouldHighlight(item, 'volumeSell3')
                    ? '#E8892B'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            );
          },
        },
      ],
    },
    {
      title: 'Tổng KL',
      dataIndex: 'totalVolume',
      key: 'totalVolume',
      render: (text, item) => (
        <div
          style={{
            backgroundColor: shouldHighlight(item, 'totalVolume')
              ? '#E8892B'
              : 'transparent',
            color:
              screenMode === 'dark'
                ? shouldHighlight(item, 'totalVolume')
                  ? '#fff'
                  : '#fff'
                : shouldHighlight(item, 'totalVolume')
                  ? 'rgba(46, 49, 56, 1)'
                  : 'rgba(46, 49, 56, 1)',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Giá',
      className: 'custom-column',

      children: [
        {
          title: 'Cao',
          dataIndex: 'high',
          className: 'custom-column-cell',
          key: 'high',

          render: (text, item) => (
            <div
              style={{
                // color: '#04DF39',
                backgroundColor: shouldHighlight(item, 'high')
                  ? '#E8892B'
                  : 'transparent',
                color:
                  screenMode === 'dark'
                    ? shouldHighlight(item, 'high')
                      ? '#fff'
                      : 'rgba(92, 214, 128, 1)'
                    : shouldHighlight(item, 'high')
                      ? 'rgba(46, 49, 56, 1)'
                      : 'rgba(69, 120, 58, 1)',
              }}
            >
              {text}
            </div>
          ),
        },
        {
          title: 'Thấp',
          dataIndex: 'low',
          className: 'custom-column-cell',

          key: 'low',
          render: (text, item) => (
            <div
              style={{
                // color: '#FF0017',
                backgroundColor: shouldHighlight(item, 'low')
                  ? '#E8892B'
                  : 'transparent',
                color:
                  screenMode === 'dark'
                    ? shouldHighlight(item, 'low')
                      ? '#fff'
                      : 'rgba(209, 84, 73, 1)'
                    : shouldHighlight(item, 'low')
                      ? 'rgba(46, 49, 56, 1)'
                      : 'rgba(163, 57, 41, 1)',
              }}
            >
              {text}
            </div>
          ),
        },
      ],
    },

    {
      title: 'ĐTNN',
      children: [
        {
          title: 'NN mua',
          dataIndex: 'foreignBuy',
          key: 'foreignBuy',
          render: (text, item) => (
            <div
              style={{
                backgroundColor: shouldHighlight(item, 'foreignBuy')
                  ? '#E8892B'
                  : 'transparent',
                color:
                  screenMode === 'dark'
                    ? shouldHighlight(item, 'low')
                      ? '#fff'
                      : '#fff'
                    : shouldHighlight(item, 'low')
                      ? 'rgba(46, 49, 56, 1)'
                      : 'rgba(46, 49, 56, 1)',
              }}
            >
              {text}
            </div>
          ),
        },
        {
          title: 'NN bán',
          dataIndex: 'foreignSell',
          key: 'foreignSell',
          render: (text, item) => (
            <div
              style={{
                backgroundColor: shouldHighlight(item, 'foreignSell')
                  ? '#E8892B'
                  : 'transparent',
                color:
                  screenMode === 'dark'
                    ? shouldHighlight(item, 'foreignSell')
                      ? '#fff'
                      : '#fff'
                    : shouldHighlight(item, 'foreignSell')
                      ? 'rgba(46, 49, 56, 1)'
                      : 'rgba(46, 49, 56, 1)',
              }}
            >
              {text}
            </div>
          ),
        },
        {
          title: 'Room',
          dataIndex: 'room',
          key: 'room',
          render: (text, item) => (
            <div
              style={{
                backgroundColor: shouldHighlight(item, 'room')
                  ? '#E8892B'
                  : 'transparent',
                color:
                  screenMode === 'dark'
                    ? shouldHighlight(item, 'room')
                      ? '#fff'
                      : '#fff'
                    : shouldHighlight(item, 'room')
                      ? 'rgba(46, 49, 56, 1)'
                      : 'rgba(46, 49, 56, 1)',
              }}
            >
              {text}
            </div>
          ),
        },
      ],
    },
  ];

  // Hàm để lấy danh sách các iboard
  const fetchIboards = async () => {
    try {
      const response = await axios.get(
        `${config.app.VITE_APP_API_URL}/iboards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIboards(response.data?.boards); // Giả sử response.data là mảng các iboard
    } catch (error) {
      console.error('Failed to fetch iboards:', error);
    }
  };

  useEffect(() => {
    fetchIboards();

    axios
      .get(`${config.app.VITE_APP_API_URL}/stocks/iboard`)
      // .get(`https://api.finpath.vn/api/stocks/iboard`)
      .then((res: any) => {
        let dataBoard = res?.data;
        // let dataBoard = res?.data?.data?.stocks;
        //filter list symbol that has in curHeaderTab list symbol
        let filterDataBoard = dataBoard?.filter((item: any, index: any) => {
          return listHeaderFilter[
            curHeaderTab - 1
          ]?.currentPick?.listSymbol?.includes(item?.os?.c);
        });

        let sortedDataBoard = sortBy(filterDataBoard, [
          function (o) {
            return o?.os?.c;
          },
        ]);
        let now = moment();
        let isATO = now.isBetween(
          moment('09:00', 'HH:mm'),
          moment('09:15', 'HH:mm'),
          'minutes',
          '[)'
        );
        let isATC = now.isBetween(
          moment('14:30', 'HH:mm'),
          moment('14:45', 'HH:mm'),
          'minutes',
          '[)'
        );
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
            priceBuy1: isATO
              ? 'ATO'
              : isATC
                ? 'ATC'
                : formatNumber(item?.orderbook?.b[0]?.p) || '',
            volumeBuy1: formatNumberComma(item?.orderbook?.b[0]?.v) || '',
            currentPrice: formatNumber(item?.os?.p) || '',
            volume: formatNumberComma(item?.os?.v) || '',
            change: formatNumber(item?.os?.dc) || '',
            changePercent: item?.os?.dcp?.toFixed(2) || '',
            priceSell1: isATO
              ? 'ATO'
              : isATC
                ? 'ATC'
                : formatNumber(item?.orderbook?.a[0]?.p) || '',
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

        // Tạo một kết nối WebSocket mới
        const ws = new WebSocket('wss://iboard-pushstream.ssi.com.vn/realtime');

        // Gán WebSocket vào state để sử dụng sau này
        setWebSocket(ws);

        // Xử lý khi có tin nhắn đến
        ws.onmessage = (event) => {
          const messageData = parseMessage(event.data);
          if (messageData) updateDataWebSocket(messageData);
        };

        // Xử lý khi kết nối được mở
        ws.onopen = () => {
          // Gửi thông điệp khi kết nối mở
          const message = {
            type: 'sub',
            topic: 'stockRealtimeByListV2',
            variables: mapDataBoard.map((item) => item.stock),
            component: 'priceTableEquities',
          };
          ws.send(JSON.stringify(message));
        };

        // Xử lý khi kết nối bị đóng
        ws.onclose = () => {};

        if (mapDataBoard.length > 0) setDataWebSocket(mapDataBoard);
      })
      .catch((error: any) => {
        console.error('Error fetching account info:', error);
      });
  }, [curHeaderTab, listHeaderFilter]);

  // Modify the `columns` array to include a conditional style
  columns.forEach((col) => {
    if (col.children) {
      col.children.forEach((subCol) => {
        // Lưu lại hàm render cũ nếu có
        const oldRender = subCol.render;
        // Cập nhật hàm render mới
        subCol.render = (text, item) => {
          const changeStyle = highlightedCells[
            `${item.stock}_${subCol.dataIndex}`
          ]
            ? { backgroundColor: '#E8892B', color: '#fff' }
            : {};
          return (
            <div
              style={{
                ...changeStyle,
                transition: 'background-color 0.5s ease',
              }}
            >
              {oldRender ? oldRender(text, item) : text}
            </div>
          );
        };
      });
    } else {
      // Lưu lại hàm render cũ nếu có
      const oldRender = col.render;
      // Cập nhật hàm render mới
      col.render = (text, item) => {
        const changeStyle = highlightedCells[`${item.stock}_${col.dataIndex}`]
          ? { backgroundColor: '#E8892B', color: '#fff' }
          : {};
        return (
          <div
            style={{ ...changeStyle, transition: 'background-color 0.5s ease' }}
          >
            {oldRender ? oldRender(text, item) : text}
          </div>
        );
      };
    }
  });

  // State để quản lý danh mục đang được chỉnh sửa
  const [editIboardId, setEditIboardId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    getIboardDetail(curMyFilter);
  }, [curMyFilter]);

  // Hàm xử lý xóa danh mục
  const handleDeleteIboard = async (id) => {
    // if (!window.confirm('Are you sure you want to delete this iboard?')) {
    //   return;
    // }
    try {
      const response = await axios.delete(
        `${config.app.VITE_APP_API_URL}/iboard/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchIboards();
      // Refresh the iboard list here or update state
    } catch (error) {
      console.error('Failed to delete iboard:', error);
    }
  };
  // Hàm xử lý cập nhật danh mục
  const handleUpdateIboard = async (id) => {
    if (editTitle.trim() === '') {
      alert('Please enter a title.');
      return;
    }
    try {
      const response = await axios.put(
        `${config.app.VITE_APP_API_URL}/iboard/${id}`,
        {
          title: editTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditIboardId(null); // Exit edit mode
      fetchIboards();
      // Refresh the iboard list here or update state
    } catch (error) {
      console.error('Failed to update iboard:', error);
    }
  };

  const token = localStorage.getItem('token');

  // Hàm xử lý tạo mới danh mục
  const handleCreateIboard = async () => {
    if (newTitle.trim() === '') {
      alert('Please enter a title for the iboard.');
      return;
    }
    try {
      axios
        .post(
          `${config.app.VITE_APP_API_URL}/iboard`,
          { title: newTitle },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setNewTitle('');
          fetchIboards();
        })
        .catch((error) => {
          console.error('Error fetching account info:', error);
        });

      // Refresh the iboard list here or add to state
    } catch (error) {
      console.error('Failed to create iboard:', error);
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
    let now = moment();
    let isATO = now.isBetween(
      moment('09:00', 'HH:mm'),
      moment('09:15', 'HH:mm'),
      'minutes',
      '[)'
    );
    let isATC = now.isBetween(
      moment('14:30', 'HH:mm'),
      moment('14:45', 'HH:mm'),
      'minutes',
      '[)'
    );
    return {
      stock: stock,
      ceiling: formatNumber(parts[58]),
      floor: formatNumber(parts[59]),
      reference: formatNumber(parts[60]),
      priceBuy3: formatNumber(parts[5]),
      volumeBuy3: formatNumberComma(parts[6]),
      priceBuy2: formatNumber(parts[3]),
      volumeBuy2: formatNumberComma(parts[4]),
      priceBuy1: isATO ? 'ATO' : isATC ? 'ATC' : formatNumber(parts[1]),
      volumeBuy1: formatNumberComma(parts[2]),
      currentPrice: formatNumber(parts[41]),
      change: formatNumber(parts[51]),
      changePercent: parts[52],
      priceSell1: isATO ? 'ATO' : isATC ? 'ATC' : formatNumber(parts[21]),
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

  // useEffect(() => {
  //   // Tạo một kết nối WebSocket mới
  //   const ws = new WebSocket('wss://iboard-pushstream.ssi.com.vn/realtime');

  //   // Gán WebSocket vào state để sử dụng sau này
  //   setWebSocket(ws);

  //   // Xử lý khi có tin nhắn đến
  //   ws.onmessage = (event) => {
  //     const messageData = parseMessage(event.data);
  //     if (messageData) updateDataWebSocket(messageData);
  //   };

  //   // Xử lý khi kết nối được mở
  //   ws.onopen = () => {
  //     // Gửi thông điệp khi kết nối mở
  //     const message = {
  //       type: 'sub',
  //       topic: 'stockRealtimeByListV2',
  //       variables: dataWebSocket.map((item) => item.stock),
  //       component: 'priceTableEquities',
  //     };
  //     ws.send(JSON.stringify(message));
  //   };

  //   // Xử lý khi kết nối bị đóng
  //   ws.onclose = () => {
  //   };

  //   // Dọn dẹp trước khi component bị unmount
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    if (dataWebSocket.length === 0) return;

    const message = {
      type: 'sub',
      topic: 'stockRealtimeByListV2',
      variables: dataWebSocket.map((item) => item.stock),
      component: 'priceTableEquities',
    };
    sendMessage(JSON.stringify(message));

    // if (!!webSocket) {
    //   // Xử lý khi kết nối được mở
    //   webSocket.onopen = () => {
    //     // Gửi thông điệp khi kết nối mở
    //     const message = {
    //       type: 'sub',
    //       topic: 'stockRealtimeByListV2',
    //       variables: dataWebSocket.map((item) => item.stock),
    //       component: 'priceTableEquities',
    //     };
    //     sendMessage(JSON.stringify(message));
    //     // webSocket.send(JSON.stringify(message));
    //   };
    // }
  }, [listHeaderFilter]);

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
            }, 200);
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

  // Gửi tin nhắn đến server
  const sendMessage = (message) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(message);
    } else {
    }
  };
  const [listCompany, setListCompany] = useState<any>([]);

  const newListCompany = listCompany?.map((obj: any) => ({
    name: obj.organTypeCode,
    value: obj.comTypeCode,
  }));
  const [options, setOptions] = useState(newListCompany);
  useEffect(() => {
    api
      .get(`/list-company`)
      .then((resListCompany) => setListCompany(resListCompany?.data?.data));
  }, []);

  const getIboardDetail = async (iboardID: number) => {
    try {
      const response = await axios.get(
        `${config.app.VITE_APP_API_URL}/iboard_details/${iboardID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const listSymbolMap = response?.data?.details?.map(
        (item: any) => item?.list_symbol
      );
      axios
        .get(`${config.app.VITE_APP_API_URL}/stocks/iboard`)
        // .get(`https://api.finpath.vn/api/stocks/iboard`)
        .then((res: any) => {
          let dataBoard = res?.data;
          // let dataBoard = res?.data?.data?.stocks;
          //filter list symbol that has in curHeaderTab list symbol
          let filterDataBoard = dataBoard?.filter((item: any, index: any) => {
            return listSymbolMap?.includes(item?.os?.c);
          });

          let sortedDataBoard = sortBy(filterDataBoard, [
            function (o) {
              return o?.os?.c;
            },
          ]);

          let now = moment();
          let isATO = now.isBetween(
            moment('09:00', 'HH:mm'),
            moment('09:15', 'HH:mm'),
            'minutes',
            '[)'
          );
          let isATC = now.isBetween(
            moment('14:30', 'HH:mm'),
            moment('14:45', 'HH:mm'),
            'minutes',
            '[)'
          );
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
              priceBuy1: isATO
                ? 'ATO'
                : isATC
                  ? 'ATC'
                  : formatNumber(item?.orderbook?.b[0]?.p) || '',
              volumeBuy1: formatNumberComma(item?.orderbook?.b[0]?.v) || '',
              currentPrice: formatNumber(item?.os?.p) || '',
              volume: formatNumberComma(item?.os?.v) || '',
              change: formatNumber(item?.os?.dc) || '',
              changePercent: item?.os?.dcp?.toFixed(2) || '',
              priceSell1: isATO
                ? 'ATO'
                : isATC
                  ? 'ATC'
                  : formatNumber(item?.orderbook?.a[0]?.p) || '',
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

          // Tạo một kết nối WebSocket mới
          const ws = new WebSocket(
            'wss://iboard-pushstream.ssi.com.vn/realtime'
          );

          // Gán WebSocket vào state để sử dụng sau này
          setWebSocket(ws);

          // Xử lý khi có tin nhắn đến
          ws.onmessage = (event) => {
            const messageData = parseMessage(event.data);
            if (messageData) updateDataWebSocket(messageData);
          };

          // Xử lý khi kết nối được mở
          ws.onopen = () => {
            // Gửi thông điệp khi kết nối mở
            const message = {
              type: 'sub',
              topic: 'stockRealtimeByListV2',
              variables: mapDataBoard.map((item) => item.stock),
              component: 'priceTableEquities',
            };
            ws.send(JSON.stringify(message));
          };

          // Xử lý khi kết nối bị đóng
          ws.onclose = () => {};
          if (mapDataBoard.length > 0) setDataWebSocket(mapDataBoard);
        })
        .catch((error: any) => {
          console.error('Error fetching account info:', error);
        });
      // Set the list of symbols to the state
      // setListCompany(response.data?.list_symbol);
    } catch (error) {
      console.error('Failed to fetch iboard detail:', error);
    }
  };

  const addSymbolToMyFilter = async (symbol: any) => {
    try {
      const response = await axios.post(
        `${config.app.VITE_APP_API_URL}/iboard_detail`,
        {
          iboardID: curMyFilter,
          list_symbol: symbol,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchIboards();
      getIboardDetail(curMyFilter);
      // Refresh the iboard list here or add to state
    } catch (error) {
      console.error('Failed to add symbol to iboard:', error);
    } finally {
      setOptions(newListCompany);
    }
  };

  const filterTableSymbol = (symbol) => {
    // Thay đổi trực tiếp trong dataWebSocket
    const sortedData = [...dataWebSocket].sort((a, b) => {
      if (a.stock === symbol) return -1; // Đặt symbol lên đầu
      if (b.stock === symbol) return 1;
      return 0;
    });

    // Cập nhật lại dataWebSocket bằng dữ liệu đã sắp xếp
    setDataWebSocket(sortedData);
  };

  const handleSearch = (input) => {
    const filtered = newListCompany
      .filter(
        (company) =>
          company.value.toLowerCase().includes(input.toLowerCase()) ||
          company.name.toLowerCase().includes(input.toLowerCase())
      )
      .sort((a, b) => {
        if (a.value.toLowerCase() === input.toLowerCase()) return -1;
        if (b.value.toLowerCase() === input.toLowerCase()) return 1;
        return 0;
      });
    setOptions(filtered);
  };

  const [isHoverDanhMuc, setIsHoverDanhMuc] = useState(false);
  return (
    <StyleStockTable screen_mode={screenMode}>
      <div className="wrapper-table">
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div className="items">
            <div className="search-bar">
              <Select
                style={{ width: '250px', height: '100%' }}
                showSearch
                // defaultValue="VIC"
                onChange={(e) => {
                  addSymbolToMyFilter(e);

                  filterTableSymbol(e);
                }}
                onSearch={handleSearch}
                filterOption={false}
                placeholder="Tìm kiếm CK"
                className="custom-select-placeholder"
              >
                {options.map((company) => (
                  <Option
                    key={company.value}
                    value={company.value}
                    label={company.value}
                  >
                    {company.value} - {company.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div
              className="user"
              style={{
                color:
                  screenMode === 'dark'
                    ? '#fff'
                    : curHeaderTab === 0
                      ? '#fff'
                      : '#333',

                paddingLeft: '8px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',

                marginLeft: '8px',
                backgroundColor:
                  screenMode === 'dark'
                    ? curHeaderTab === 0
                      ? '#E38007'
                      : '#303139'
                    : curHeaderTab === 0
                      ? '#E38007'
                      : '#d2d2d2',
              }}
              onMouseEnter={() => setIsHoverDanhMuc(true)}
              onMouseLeave={() => setIsHoverDanhMuc(false)}
            >
              Danh mục của tôi
              <svg
                style={{ marginLeft: '4px' }}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  d="M112 184l144 144 144-144"
                ></path>
              </svg>
              <div className="dropdown">
                {/* Danh sách các iboard của user */}
                {iboards?.map((iboard: any) => (
                  <div
                    key={iboard.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: '40px',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderBottom:
                        screenMode === 'light'
                          ? '1px solid rgba(213, 215, 220, 1)'
                          : '1px solid rgba(48, 50, 59, 1)',
                    }}
                    onClick={() => {
                      setCurHeaderTab(0);
                      setCurMyFilter(iboard.id);
                    }}
                  >
                    {editIboardId === iboard.id ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleUpdateIboard(iboard.id)
                        }
                      />
                    ) : (
                      <span>{iboard.title}</span>
                    )}
                    <span className="box-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setEditIboardId(iboard.id);
                          setEditTitle(iboard.title);
                        }}
                      >
                        <path
                          d="M1.67967 15.6667C1.29579 15.6667 0.975508 15.5384 0.718841 15.2817C0.462174 15.0251 0.333563 14.7045 0.333008 14.3201V3.68005C0.333008 3.29616 0.461619 2.97589 0.718841 2.71922C0.976063 2.46255 1.29634 2.33394 1.67967 2.33339H8.66801L7.83468 3.16672H1.67967C1.55134 3.16672 1.43356 3.22005 1.32634 3.32672C1.21912 3.43339 1.16579 3.55116 1.16634 3.68005V14.3209C1.16634 14.4487 1.21967 14.5662 1.32634 14.6734C1.43301 14.7806 1.55051 14.8339 1.67884 14.8334H12.3205C12.4483 14.8334 12.5658 14.7801 12.673 14.6734C12.7802 14.5667 12.8336 14.4492 12.833 14.3209V8.08005L13.6663 7.24672V14.3209C13.6663 14.7042 13.538 15.0245 13.2813 15.2817C13.0247 15.5389 12.7041 15.6673 12.3197 15.6667H1.67967ZM5.33301 10.6667V8.48755L12.7863 1.03422C12.8786 0.941996 12.9752 0.878107 13.0763 0.842552C13.1775 0.806996 13.2844 0.789496 13.3972 0.790052C13.5022 0.790052 13.6044 0.80783 13.7038 0.843385C13.8033 0.878941 13.8938 0.937274 13.9755 1.01839L14.9022 1.91672C14.9911 2.00894 15.0583 2.11033 15.1038 2.22089C15.1494 2.33144 15.1725 2.44255 15.173 2.55422C15.1736 2.66589 15.1566 2.772 15.1222 2.87255C15.0888 2.97255 15.0261 3.06839 14.9338 3.16005L7.43301 10.6667H5.33301ZM6.16634 9.83339H7.07634L12.6313 4.27839L12.1763 3.82339L11.668 3.33672L6.16634 8.83839V9.83339Z"
                          fill={
                            screenMode === 'dark'
                              ? '#ABADBA'
                              : 'rgba(86, 91, 103, 1)'
                          }
                        />
                      </svg>
                      <svg
                        onClick={() => handleDeleteIboard(iboard.id)}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0675 12.1827C13.1256 12.2407 13.1717 12.3097 13.2031 12.3855C13.2345 12.4614 13.2507 12.5427 13.2507 12.6249C13.2507 12.707 13.2345 12.7883 13.2031 12.8642C13.1717 12.94 13.1256 13.009 13.0675 13.067C13.0095 13.1251 12.9405 13.1712 12.8647 13.2026C12.7888 13.234 12.7075 13.2502 12.6253 13.2502C12.5432 13.2502 12.4619 13.234 12.386 13.2026C12.3102 13.1712 12.2412 13.1251 12.1832 13.067L7.00035 7.88345L1.81753 13.067C1.70026 13.1843 1.5412 13.2502 1.37535 13.2502C1.2095 13.2502 1.05044 13.1843 0.93316 13.067C0.815885 12.9498 0.75 12.7907 0.75 12.6249C0.75 12.459 0.815885 12.2999 0.93316 12.1827L6.11675 6.99986L0.93316 1.81705C0.815885 1.69977 0.75 1.54071 0.75 1.37486C0.75 1.20901 0.815885 1.04995 0.93316 0.932672C1.05044 0.815396 1.2095 0.749512 1.37535 0.749512C1.5412 0.749512 1.70026 0.815396 1.81753 0.932672L7.00035 6.11627L12.1832 0.932672C12.3004 0.815396 12.4595 0.749512 12.6253 0.749512C12.7912 0.749512 12.9503 0.815396 13.0675 0.932672C13.1848 1.04995 13.2507 1.20901 13.2507 1.37486C13.2507 1.54071 13.1848 1.69977 13.0675 1.81705L7.88394 6.99986L13.0675 12.1827Z"
                          fill={
                            screenMode === 'dark'
                              ? '#ABADBA'
                              : 'rgba(86, 91, 103, 1)'
                          }
                        />
                      </svg>
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '16px',
                    gap: '12px',
                  }}
                >
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Tạo danh mục mới"
                    className="focus-input"
                  />
                  <div
                    onClick={handleCreateIboard}
                    style={{
                      cursor: 'pointer',
                    }}
                    className="add"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 0C8.27614 0 8.5 0.223858 8.5 0.5V7.5H15.5C15.7761 7.5 16 7.72386 16 8C16 8.27614 15.7761 8.5 15.5 8.5H8.5V15.5C8.5 15.7761 8.27614 16 8 16C7.72386 16 7.5 15.7761 7.5 15.5V8.5H0.5C0.223858 8.5 0 8.27614 0 8C0 7.72386 0.223858 7.5 0.5 7.5H7.5V0.5C7.5 0.223858 7.72386 0 8 0Z"
                        fill={
                          screenMode === 'dark'
                            ? '#E3E4E8'
                            : 'rgba(86, 91, 103, 1)'
                        }
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {listHeaderFilter.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="user"
                  style={{
                    // color:
                    //   screenMode === 'dark'
                    //     ? '#fff'
                    //     : curHeaderTab === item?.id
                    //       ? '#fff'
                    //       : '#333',

                    paddingLeft: '8px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                    marginLeft: '8px',
                    backgroundColor:
                      screenMode === 'dark'
                        ? curHeaderTab === item?.id
                          ? '#E38007'
                          : '#303139'
                        : curHeaderTab === item?.id
                          ? '#E38007'
                          : '#d2d2d2',
                  }}
                  onMouseEnter={() => setIsHoverDanhMuc(true)}
                  onMouseLeave={() => setIsHoverDanhMuc(false)}
                >
                  {item?.currentPick?.title}
                  <svg
                    style={{ marginLeft: '4px' }}
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="48"
                      d="M112 184l144 144 144-144"
                    ></path>
                  </svg>
                  <div className="dropdown">
                    {item?.listDropDown?.map((item2: any, index2: any) => {
                      return (
                        <div
                          key={index2}
                          onClick={() => {
                            let listHeaderFilterCopy = [...listHeaderFilter];
                            listHeaderFilterCopy[index].currentPick = item2;
                            setListHeaderFilter(listHeaderFilterCopy);
                            setCurHeaderTab(item?.id);
                            setCurMyFilter(null);
                          }}
                          className="item-drop"
                          style={{
                            padding: '5px',
                            marginRight: '10px',
                            marginLeft: '10px',

                            background:
                              screenMode === 'dark'
                                ? item?.currentPick?.title === item2?.title &&
                                  curHeaderTab === item?.id
                                  ? '#674A28'
                                  : 'transparent'
                                : item?.currentPick?.title === item2?.title &&
                                    curHeaderTab === item?.id
                                  ? '#f3d2aa'
                                  : 'transparent',

                            //   screenMode === 'dark' ? 'rgb(31, 35, 44)' : '#D4D4D4',
                            // color: screenMode === 'dark' ? '#fff' : '#000',
                          }}
                        >
                          {item2?.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="whiteTextTable">
          <Table
            columns={columns}
            dataSource={dataWebSocket}
            pagination={{ defaultPageSize: pageSize }}
          />
        </div>
      </div>
    </StyleStockTable>
  );
};

export default StockTable;
