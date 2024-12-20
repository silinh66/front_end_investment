/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { StyledModalFilter } from './styled';
import { Tooltip } from 'antd';
import checkIcon from '@assets/icons/check.svg';
import searchTargetDark from '@assets/icons/search-lightmode.svg';
import deleteFil from '@assets/icons/delete_icon.svg';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import useBodyScrollLock from '@/components/UseBodyScrollLock/useBodyScrollLock';

export const ModalFilter = ({
  handleMyFilter,
  setValueSearch,
  setPickerBasic,
  setPickerTechnique,
  setPickerFluctuation,
  setPickerMyFilter,
  setSelectedChild,
  setSelectedValue,
  setIsModalVisible,
  isModalVisible,
  screenMode,
  selectedChild,
  listSearch,
  listTieuChiPicked,
  setListTieuChiPicked,
  setListOpenTieuChi,
  listOpenTieuChi,
  searchTarget,
  valueSearch,
  selectedValue,
  setListSearch,
  listMyFilter,
  setPickerPopular,
}: any) => {
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const NhomThongDung: FC<any> = ({
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
    handleMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);

    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          { label: 'Giá trị giao dịch ròng của NĐTNN', isMultiple: true },
          {
            label: 'Biên độ giá High - Low theo số phiên (%)',
            isMultiple: true,
          },
          { label: 'P/E (TTM)', isMultiple: false },
          { label: 'EPS (TTM)', isMultiple: false },
          { label: 'Vốn hoá', isMultiple: false },
          { label: 'Cổ tức bằng tiền (năm gần nhất)', isMultiple: false },

          {
            label: 'Tỷ suất cổ tức năm gần nhất',
            isMultiple: false,
          },
          { label: 'KLTB 3 tháng', isMultiple: false },
          { label: 'RS1m (1 tháng)', isMultiple: false },
          { label: 'RS3m (3 tháng)', isMultiple: false },
          { label: 'RS6m (6 tháng)', isMultiple: false },
          { label: 'RS52w (52 tuần)', isMultiple: false },
          { label: 'Khối lượng', isMultiple: false },
          { label: 'Giá trị giao dịch', isMultiple: false },
          { label: 'Khối lượng Trung bình theo số phiên', isMultiple: true },
          {
            label: 'Giá trị giao dịch Trung bình theo phiên',
            isMultiple: true,
          },
        ],
        // label: 'THEO ĐƯỜNG TB ĐƠN GIẢN (MA)',
      },
    ]);

    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Giá trị giao dịch ròng của NĐTNN':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-9.0T', '9.0T'],
              rightIndexList: [-9000000000000, 9000000000000],
              interval: 0,
              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
              intervalList: [],
              responseKey: 'ForeignBuySellValue',
            };
            break;

          case 'Biên độ giá High - Low theo số phiên (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'BienDoGiaHighLow',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;

          case 'P/E (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              // change: [0, 1210000],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],

              responseKey: 'PE',
            };
            break;
          case 'EPS (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-29.7K', '20K'],
              rightIndexList: [-29710, 20000],
              interval: 0,
              intervalList: [],

              responseKey: 'Eps_TTM',
            };
            break;
          case 'Vốn hoá':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '615.4T'],
              rightIndexList: [0, 615410000000000],
              interval: 0,
              responseKey: 'MarketCap',
              intervalList: [],
            };
            break;
          case 'Cổ tức bằng tiền (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10K'],
              rightIndexList: [0, 10000],
              interval: [],
              intervalList: [],
              responseKey: 'CashDividend_LastYear',
            };
            break;

          case 'Tỷ suất cổ tức năm gần nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.5K'],
              rightIndexList: [0, 1500],
              interval: 0,
              intervalList: [],
              responseKey: 'DividendYield_LastYear',
            };
            break;
          case 'KLTB 3 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '47.02M'],
              rightIndexList: [0, 47020000],
              interval: 0,
              intervalList: [],
              responseKey: 'AvgVol3M',
            };
            break;
          case 'RS1m (1 tháng)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS1M',
            };
            break;
          case 'RS3m (3 tháng)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS3M',
            };
            break;
          case 'RS6m (6 tháng)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS6M',
            };
            break;
          case 'RS52w (52 tuần)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS52W',
            };
            break;
          case 'Khối lượng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '47.38M'],
              rightIndexList: [0, 47380000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealVol',
            };
            break;
          case 'Giá trị giao dịch':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1T'],
              rightIndexList: [0, 1000000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealValue',
            };
            break;
          case 'Khối lượng Trung bình theo số phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0B'],
              rightIndexList: [0, 100000000],
              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalVolumeAvg',
            };
            break;
          case 'Giá trị giao dịch Trung bình theo phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0T'],
              rightIndexList: [0, 100000000000],
              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealValueAvg',
            };
            break;

          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);

    return (
      <div style={{ width: '100%' }}>
        {listTieuChi?.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const numberOfPicked = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            item.dropdown
              .map((item: any) => item.label)
              .includes(itemPicked.label)
          ).length;
          setPickerPopular(numberOfPicked);

          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',
                // ...styles.button,
                marginBottom: 4,
              }}
            >
              <div
                style={{ display: !isOpen ? 'block' : 'none' }}
                // in={isOpen}
              >
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#E0EAFF'
                          : isHover[1] && isHover[0] === item.label
                            ? screenMode === 'dark'
                              ? '#292B32'
                              : '#F1F2F3'
                            : 'transparent',
                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,
                            color:
                              screenMode === 'light'
                                ? '#2E3138'
                                : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const NhomTangTruong: FC<any> = ({
    listSearch,
    handleMyFilter,
    listSaveMyFilter,
    setListSaveMyFilter,
    setListSearch,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
    listMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);
    // const [previousListLength, setPreviousListLength] = useState<any>(
    //   listTieuChiPicked.length
    // );
    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          {
            label:
              'Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)',
            isMultiple: true,
          },
          {
            label:
              'EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)',
            isMultiple: true,
          },
          {
            label: 'Tăng trưởng doanh thu Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Quý gần nhì (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu 4 Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Năm gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Bình quân 3 năm (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng lợi nhuận Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng lợi nhuận Quý gần nhì (%)',
            isMultiple: false,
          },
          { label: 'Tăng trưởng LN 4 Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng LN Năm gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng LN Bình quân 3 năm (%)', isMultiple: false },
          {
            label: 'Tăng trưởng LN Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
          { label: 'Tăng trưởng EPS Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS Quý gần nhì (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS 4 Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS Năm gần nhất (%)', isMultiple: false },
          {
            label: 'Tăng trưởng EPS Bình quân 3 năm (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng EPS Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
        ],
        // label: 'THEO ĐƯỜNG TB ĐƠN GIẢN (MA)',
      },
    ]);
    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };
    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Tăng trưởng doanh thu Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng doanh thu Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng doanh thu 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_TTM',
            };
            break;
          case 'Tăng trưởng doanh thu Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRY',
            };
            break;
          case 'Tăng trưởng doanh thu Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_TTM_Avg_3Y',
            };
            break;
          case 'Tăng trưởng lợi nhuận Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng lợi nhuận Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng LN 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_TTM',
            };
            break;
          case 'Tăng trưởng LN Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRY',
            };
            break;
          case 'Tăng trưởng LN Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng LN Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_TTM_Avg_3Y',
            };
            break;
          case 'Tăng trưởng EPS Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng EPS Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng EPS 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_TTM',
            };
            break;
          case 'Tăng trưởng EPS Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRY',
            };
            break;
          case 'Tăng trưởng EPS Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng EPS Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_TTM_Avg_3Y',
            };
            break;

          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    // useEffect(() => {
    //   if (
    //     listTieuChiPicked.length > previousListLength &&
    //     listTieuChiPicked.length > 6
    //   ) {
    //     scrollToBottom();
    //   }
    //   setPreviousListLength(listTieuChiPicked.length);
    // }, [listTieuChiPicked]);

    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);
    return (
      <div style={{ width: '100%' }}>
        {listTieuChi.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const numberOfPicked = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            item.dropdown
              .map((item: any) => item.label)
              .includes(itemPicked.label)
          ).length;

          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',

                marginBottom: 4,
              }}
            >
              <div style={{ display: !isOpen ? 'block' : 'none' }}>
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#E0EAFF'
                          : 'transparent',
                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,
                            color:
                              screenMode === 'light'
                                ? '#2E3138'
                                : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const NhomTySuatTaiChinh: FC<any> = ({
    listSearch,
    listSaveMyFilter,
    handleMyFilter,
    setListSaveMyFilter,
    setListSearch,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
    listMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);
    // const [previousListLength, setPreviousListLength] = useState<any>(
    //   listTieuChiPicked.length
    // );
    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          {
            label: 'EPS (TTM)',
            isMultiple: false,
          },
          {
            label: 'P/E (TTM)',
            isMultiple: false,
          },
          {
            label: 'P/S (TTM)',
            isMultiple: false,
          },
          { label: 'P/B (MRQ)', isMultiple: false },
          {
            label: 'ROE (%)',
            isMultiple: false,
          },
          {
            label: 'ROA (%)',
            isMultiple: false,
          },
          {
            label: 'ROIC (quý)',
            isMultiple: false,
          },
          {
            label: 'Vòng quay tổng tài sản (TTM)',
            isMultiple: false,
          },
          {
            label: 'Vòng quay hàng tồn kho (TTM)',
            isMultiple: false,
          },
          {
            label: 'Vòng quay các khoản phải thu (TTM)',
            isMultiple: false,
          },
        ],
        label: 'CHỈ SỐ TÀI CHÍNH',
      },
    ]);
    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };
    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'EPS (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-29.7K', '20K'],
              rightIndexList: [-29710, 20000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'P/E (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'PE',
            };
            break;
          case 'P/S (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'PS',
            };
            break;
          case 'P/B (MRQ)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10'],
              rightIndexList: [0, 10],
              interval: 0,
              intervalList: [],
              responseKey: 'PB',
            };
            break;
          case 'Vòng quay tổng tài sản (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1'],
              rightIndexList: [0, 1],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_AssetTurnover',
            };
            break;
          case 'Vòng quay hàng tồn kho (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_InventoryTurnover',
            };
            break;
          case 'Vòng quay các khoản phải thu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ReceivableTurnover',
            };
            break;
          case 'ROE (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '500'],
              rightIndexList: [-100, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ROE',
            };
            break;
          case 'ROIC (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROA (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '500'],
              rightIndexList: [-100, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ROA',
            };
            break;

          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    // useEffect(() => {
    //   if (
    //     listTieuChiPicked.length > previousListLength &&
    //     listTieuChiPicked.length > 6
    //   ) {
    //     scrollToBottom();
    //   }
    //   setPreviousListLength(listTieuChiPicked.length);
    // }, [listTieuChiPicked]);

    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);

    return (
      <div style={{ width: '100%' }}>
        {listTieuChi.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const numberOfPicked = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            item.dropdown
              .map((item: any) => item.label)
              .includes(itemPicked.label)
          ).length;
          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',

                // ...styles.button,
                marginBottom: 4,
              }}
            >
              <div style={{ display: !isOpen ? 'block' : 'none' }}>
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#E0EAFF'
                          : 'transparent',
                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,
                            // color:
                            //   isHover[1] && isHover[0] === item.label
                            //     ? screenMode === 'light'
                            //       ? '#004AEA'
                            //       : 'rgba(153, 186, 255, 1)'
                            //     : screenMode === 'light'
                            //       ? '#2E3138'
                            //       : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const BienDongGia: FC<any> = ({
    listSearch,
    handleMyFilter,
    listSaveMyFilter,
    setListSaveMyFilter,
    setListSearch,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
    listMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);

    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);
    // const [previousListLength, setPreviousListLength] = useState<any>(
    //   listTieuChiPicked.length
    // );
    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          { label: 'Giá cuối', isMultiple: false },
          { label: 'Cao nhất 52 tuần', isMultiple: false },
          { label: 'Thấp nhất 52 tuần', isMultiple: false },
          { label: 'Thay đổi trong 52 tuần', isMultiple: false },
          { label: '% thay đổi 1 tháng', isMultiple: false },
          { label: '% Thay đổi từ đầu năm', isMultiple: false },
          { label: '% Thay đổi từ đáy 52 tuần', isMultiple: false },
          { label: '% Thay đổi từ đỉnh 52 tuần', isMultiple: false },
          {
            label: '% thay đổi giá đóng cửa theo số phiên',
            isMultiple: true,
          },
          { label: 'Biến động trong ngày (%)', isMultiple: false },

          { label: 'Khối lượng', isMultiple: false },
          { label: 'Giá trị giao dịch', isMultiple: false },
          { label: 'Khối lượng Trung bình theo số phiên', isMultiple: true },
          {
            label: 'Giá trị giao dịch Trung bình theo phiên',
            isMultiple: true,
          },
          { label: 'Beta', isMultiple: false },
        ],
        label: 'Mặc định',
      },
      {
        dropdown: [
          { label: 'Vượt đỉnh 1 tuần', isMultiple: false },
          { label: 'Vượt đỉnh 4 tuần', isMultiple: false },
          { label: 'Vượt đỉnh 12 tuần', isMultiple: false },
          { label: 'Vượt đỉnh 52 tuần', isMultiple: false },
          { label: 'Thủng đáy 1 tuần', isMultiple: false },
          { label: 'Thủng đáy 4 tuần', isMultiple: false },
          { label: 'Thủng đáy 12 tuần', isMultiple: false },
          { label: 'Thủng đáy 52 tuần', isMultiple: false },
          { label: 'Số phiên tăng giá liên tục', isMultiple: true },
          { label: 'Số phiên giảm giá liên tục', isMultiple: true },
        ],
        label: 'Biến động giá',
      },
      {
        dropdown: [
          { label: 'Số phiên KL tăng liên tiếp', isMultiple: true },
          { label: 'Số phiên KL giảm liên tiếp', isMultiple: true },
          { label: 'Khối lượng khớp lệnh đang cao nhất', isMultiple: true },
          { label: 'Khối lượng khớp lệnh đang thấp nhất', isMultiple: true },
        ],
        label: 'Biến động khối lượng',
      },
      {
        dropdown: [
          {
            label:
              'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 5 ngày liền trước',
            isMultiple: false,
          },
          {
            label:
              'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 10 ngày liền trước',
            isMultiple: false,
          },
          {
            label:
              'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 20 ngày liền trước',
            isMultiple: false,
          },
          {
            label:
              'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 60 ngày liền trước',
            isMultiple: false,
          },
          {
            label: 'KL tăng so với cùng thời điểm của phiên liền trước',
            isMultiple: false,
          },
          {
            label: 'KL trong phiên đạt bằng Khối lượng phiên giao dịch trước',
            isMultiple: false,
          },
        ],
        label: 'Khối lượng tăng cao',
      },
    ]);
    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };
    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );

        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Giá cuối':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '964'],
              rightIndexList: [0, 964],
              interval: 0,
              intervalList: [],
              responseKey: 'LastPrice',
            };
            break;
          case 'Cao nhất 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '2.03K'],
              rightIndexList: [0, 2030],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjHigh52W',
            };
            break;
          case 'Thấp nhất 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '312'],
              rightIndexList: [0, 312],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjLow52W',
            };
            break;
          case 'Thay đổi trong 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-30', '258'],
              rightIndexList: [-30, 258],
              interval: 0,
              intervalList: [],
              responseKey: 'Change52W',
            };
            break;
          case '% thay đổi 1 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '200'],
              rightIndexList: [-100, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'ChangePercent1M',
            };
            break;
          case '% Thay đổi từ đầu năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '1.2K'],
              rightIndexList: [-100, 1200],
              interval: 0,
              intervalList: [],
              responseKey: 'ChangePercentYTD',
            };
            break;
          case '% Thay đổi từ đáy 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '1.4K'],
              rightIndexList: [-100, 1400],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjLow52W_PercentChange',
            };
            break;
          case '% Thay đổi từ đỉnh 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100'],
              rightIndexList: [-100, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjHigh52W_PercentChange',
            };
            break;
          case '% thay đổi giá đóng cửa theo số phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100.0K'],
              rightIndexList: [-100, 100000],
              interval: 0,
              intervalList: [],
              responseKey: 'ChangePercent_5',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;
          case 'Biến động trong ngày (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100'],
              rightIndexList: [-100, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'PriceChangePercent',
            };
            break;

          case 'Khối lượng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '47.38M'],
              rightIndexList: [0, 47380000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealVol',
            };
            break;
          case 'Giá trị giao dịch':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0M'],
              rightIndexList: [0, 1000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealValue',
            };
            break;
          case 'Khối lượng Trung bình theo số phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1B'],
              rightIndexList: [0, 1000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalVolumeAvg',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;
          case 'Giá trị giao dịch Trung bình theo phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0B'],
              rightIndexList: [0, 1000000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealValueAvg',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;
          case 'Beta':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1', '4'],
              rightIndexList: [-1, 4],
              interval: 0,
              intervalList: [],
              responseKey: 'Beta',
            };
            break;
          case 'Vượt đỉnh 1 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top1W',
            };
            break;
          case 'Vượt đỉnh 4 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất 4 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top4W',
            };
            break;
          case 'Vượt đỉnh 12 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất 12 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top12W',
            };
            break;
          case 'Vượt đỉnh 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất 52 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top52W',
            };
            break;
          case 'Thủng đáy 1 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom1W',
            };
            break;
          case 'Thủng đáy 4 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất 4 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom4W',
            };
            break;
          case 'Thủng đáy 12 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất 12 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom12W',
            };
            break;
          case 'Thủng đáy 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất 52 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom52W',
            };
            break;
          case 'Số phiên tăng giá liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá ((H+L)/2)',
                'Giá ((O + H + L + C)/4)',
              ],
              compare: 0,
              compareList: ['slider', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Số phiên giảm giá liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá ((H+L)/2)',
                'Giá ((O + H + L + C)/4)',
              ],
              compare: 0,
              compareList: ['slider', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Số phiên KL tăng liên tiếp':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
            };
            break;
          case 'Số phiên KL giảm liên tiếp':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
            };
            break;
          case 'Khối lượng khớp lệnh đang cao nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Khối lượng khớp lệnh đang thấp nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 5 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 10 ngày liền trước',

              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol5D',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 10 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 10 ngày liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol10D',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 20 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 20 ngày liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol20D',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 60 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 60 ngày liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol60D',
            };
            break;
          case 'KL tăng so với cùng thời điểm của phiên liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'KL cùng thời điểm phiên liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationVolT1',
            };
            break;
          case 'Biến động giá 1 ngày':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-39.96', '19.17'],
              rightIndexList: [-39.96, 19.17],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 1 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-40.40', '71.71'],
              rightIndexList: [-40.4, 71.71],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 1 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-67.82', '175.27'],
              rightIndexList: [-67.82, 175.27],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 3 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-83.72', '179.44'],
              rightIndexList: [-83.72, 179.44],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 6 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-83.72', '453.33'],
              rightIndexList: [-83.72, 453.33],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-97.67', '931.69'],
              rightIndexList: [-97.67, 931.69],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá từ đầu năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-96.57', '751.03'],
              rightIndexList: [-96.57, 751.03],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Khối lượng GD':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '31.7K'],
              rightIndexList: [0.0, 31693.15],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 5 phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '36.2K'],
              rightIndexList: [0.0, 36197.74],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 10 phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '37.4K'],
              rightIndexList: [0.0, 37414.85],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 20 phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '39.6K'],
              rightIndexList: [0.0, 39696.18],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 3 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '36.6K'],
              rightIndexList: [0.0, 31693.15],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case '% Free Float':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '100'],
              rightIndexList: [0.0, 100],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '887.146K'],
              rightIndexList: [0.0, 887146.25],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 5D':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '954.623K'],
              rightIndexList: [0.0, 954, 623.37],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 10D':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '822.005K'],
              rightIndexList: [0.0, 822005.57],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 20D':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '754.577K'],
              rightIndexList: [0.0, 754, 577.71],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 3M':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '854.179K'],
              rightIndexList: [0.0, 854179.06],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'P/B (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '181.97'],
              rightIndexList: [0.0, 181.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá - Dòng Tiền (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-14.964K', '6.963K'],
              rightIndexList: [-14964.69, 6963.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá - Dòng Tiền Tự Do (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-12.505K', '5.244K'],
              rightIndexList: [-12505.46, 5244.38],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá - T.sản hữu hình (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '181.97'],
              rightIndexList: [0.0, 181.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Doanh thu (tỉ đồng) (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '284.084K'],
              rightIndexList: [0.0, 284084.36],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;

          case 'LN ròng (tỉ đồng) (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-6.405K', '41.227K'],
              rightIndexList: [-6405.41, 41227.58],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Doanh thu (tỉ đồng) (năm trước)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '304.188K'],
              rightIndexList: [0.0, 304188.09],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'LN ròng (tỉ đồng) (năm trước)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-10.452K', '29.892K'],
              rightIndexList: [-10452.64, 29892.29],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Doanh thu (quý gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-45.54', '72.439K'],
              rightIndexList: [-45.54, 72439.14],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Lợi nhuận thuần (quý gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.277K', '10.694K'],
              rightIndexList: [-2277.22, 10694.76],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng D.thu (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100.00', '4.943K'],
              rightIndexList: [-100, 4943.78],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng LN gộp (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.355K', '20.925K'],
              rightIndexList: [-2355.9, 20925.27],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng LN ròng (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-52.594K', '9.831K'],
              rightIndexList: [-52594.95, 9831.39],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng K.doanh 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-93.74', '1.843K'],
              rightIndexList: [-93.74, 1843.21],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng LN ròng 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-97.52', '1.606K'],
              rightIndexList: [-97.52, 1606.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng vốn CSH 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-47.17', '613.18'],
              rightIndexList: [-47.17, 613.18],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng EPS (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100.00', '12.314K'],
              rightIndexList: [-100, 12314.09],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tăng trưởng doanh thu quý gần nhất (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-112.92', '4.943K'],
              rightIndexList: [-112.92, 4943.78],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-52.594K', '9.831K'],
              rightIndexList: [-52594.95, 9831.39],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROE (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-5.970K', '154.17'],
              rightIndexList: [-5970.7, 154.17],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROA (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.003K', '147.89'],
              rightIndexList: [-2003.02, 147.89],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN gộp (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.159K', '69.412K'],
              rightIndexList: [-1159.36, 69412.29],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN gộp (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.322K', '155.54'],
              rightIndexList: [-1322.46, 155.54],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN gộp (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.504K', '100'],
              rightIndexList: [-1504.26, 100],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN ròng (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.686K', '98.398K'],
              rightIndexList: [-2686.07, 98398.95],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN ròng (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-14.981K', '47.060K'],
              rightIndexList: [-14981.11, 47060.11],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN ròng (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-60.640K', '32.309K'],
              rightIndexList: [-60640.5, 32309.32],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên EBIT (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.269K', '93.763K'],
              rightIndexList: [-2269.26, 93763.2],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên EBIT (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-17.08 K', '1.03 K'],
              rightIndexList: [-17087.17, 1033.56],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;

          case 'Nợ phải trả/ Tổng tài sản (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '28.82'],
              rightIndexList: [0, 28.82],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Nợ phải trả/ Vốn chủ sở hữu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-58.64', '53.05'],
              rightIndexList: [-58.64, 53.05],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Nợ dài hạn/ Vốn chủ sở hữu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-57.55', '7.01'],
              rightIndexList: [-57.55, 7.01],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Nợ phải trả/ Vốn chủ sở hữu (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-58.64', '53.05'],
              rightIndexList: [-58.64, 53.05],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ suất thanh toán hiện hành (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '218.01'],
              rightIndexList: [0, 218.01],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ suất thanh toán nhanh (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '218.01'],
              rightIndexList: [0, 218.01],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ suất thanh toán tiền mặt (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '122.68'],
              rightIndexList: [0, 122.68],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Khả năng chi trả lãi vay (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-310.570K', '72.619K'],
              rightIndexList: [-310570.3, 72619.96],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ lệ tổ chức sở hữu':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['5.00', '112.16'],
              rightIndexList: [5, 112.16],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Sở hữu nước ngoài':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.0', '99.14'],
              rightIndexList: [0, 99.14],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Room nước ngoài':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '1.49M'],
              rightIndexList: [0.0, 1495448.34],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Cổ Tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '18K'],
              rightIndexList: [0.0, 18000],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ Suất Cổ Tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '751.20'],
              rightIndexList: [0.0, 751.2],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ Suất Cổ Tức T.Bình 3 Năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '1.833K'],
              rightIndexList: [0.0, 1833.33],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ Lệ Chi Trả Cổ Tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.261K', '1K'],
              rightIndexList: [-1261.75, 1000.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'RSI':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-0', '99.90'],
              rightIndexList: [0, 99.9],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ADX':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100.00'],
              rightIndexList: [0, 100.0],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'CCI':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-666.67', '666.67'],
              rightIndexList: [-666.67, 666.67],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROC':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-40.00', '165.67'],
              rightIndexList: [-40.0, 165.67],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'STOCH':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100.00'],
              rightIndexList: [0, 100.0],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Williams':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100.00', '0.00'],
              rightIndexList: [-100.0, 0],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'MFI':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '99.98'],
              rightIndexList: [0.0, 99.98],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    // useEffect(() => {
    //   if (
    //     listTieuChiPicked.length > previousListLength &&
    //     listTieuChiPicked.length > 6
    //   ) {
    //     scrollToBottom();
    //   }
    //   setPreviousListLength(listTieuChiPicked.length);
    // }, [listTieuChiPicked]);
    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);

    return (
      <div style={{ width: '100%' }}>
        {listTieuChi.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const numberOfPicked1 = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            item.dropdown
              .map((item: any) => item.label)
              .includes(itemPicked.label)
          ).length;
          const totalPicked = listTieuChi.reduce((total, item) => {
            const numberOfPicked1 = [
              ...new Map(
                listTieuChiPicked.map((tieuChi) => [tieuChi.label, tieuChi])
              ).values(),
            ].filter((itemPicked) =>
              item.dropdown
                .map((dropdownItem) => dropdownItem.label)
                .includes(itemPicked.label)
            ).length;

            return total + numberOfPicked1;
          }, 0);
          setPickerFluctuation(totalPicked);
          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',

                // ...styles.button,
                marginBottom: 6,
              }}
            >
              <div
                onMouseEnter={() => {
                  setIsHoverChiTieu([item.label, true]);
                }}
                onMouseLeave={() => {
                  setIsHoverChiTieu([item.label, false]);
                }}
                className="option"
                style={{
                  display: 'flex',
                  padding: '16px 12px',
                  // height: '30px',
                  alignItems: 'center',
                  borderRadius: '4px',
                  justifyContent: 'space-between',
                  color:
                    (isHoverChiTieu[1] && isHoverChiTieu[0] === item.label) ||
                    numberOfPicked1 > 0
                      ? screenMode === 'light'
                        ? '#004AEA'
                        : 'rgba(153, 186, 255, 1)'
                      : screenMode === 'light'
                        ? '#B1B5BE'
                        : 'rgba(255, 255, 255)',
                  background:
                    screenMode === 'dark' ? 'rgba(41, 43, 50, 1)' : '#F9FAFA',
                }}
                onClick={() => handleClick(item.label)}
              >
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    lineHeight: '20px',

                    height: '20px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      marginLeft: 8,
                      color:
                        (isHoverChiTieu[1] &&
                          isHoverChiTieu[0] === item.label) ||
                        numberOfPicked1 > 0
                          ? screenMode === 'light'
                            ? '#004AEA'
                            : 'rgba(153, 186, 255, 1)'
                          : screenMode === 'light'
                            ? '#B1B5BE'
                            : 'rgba(255, 255, 255)',
                    }}
                  >
                    ({numberOfPicked1}/{item.dropdown.length})
                  </span>
                </div>
                {isOpen ? (
                  <CaretUpOutlined
                    className={'iconoutlineddirectionalcare120'}
                  />
                ) : (
                  <CaretDownOutlined
                    className={'iconoutlineddirectionalcare120'}
                  />
                )}
              </div>
              <div
                style={{
                  display: isOpen ? 'block' : 'none',
                  margin: '9px 0px',
                }}
              >
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#E0EAFF'
                          : isHover[1] && isHover[0] === item.label
                            ? screenMode === 'dark'
                              ? '#292B32'
                              : '#F1F2F3'
                            : 'transparent',
                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,
                            // color:
                            //   isHover[1] && isHover[0] === item.label
                            //     ? screenMode === 'light'
                            //       ? '#004AEA'
                            //       : 'rgba(153, 186, 255, 1)'
                            //     : screenMode === 'light'
                            //       ? '#2E3138'
                            //       : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const NhomCoBan: FC<any> = ({
    listSearch,
    listSaveMyFilter,
    handleMyFilter,
    setListSaveMyFilter,
    setListSearch,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);
    // const [previousListLength, setPreviousListLength] = useState<any>(
    //   listTieuChiPicked.length
    // );
    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          { label: 'Vốn hoá', isMultiple: false },
          { label: 'Doanh thu (TTM)', isMultiple: false },
          { label: 'Doanh thu (năm gần nhất)', isMultiple: false },
          { label: 'Lợi nhuận sau thuế (TTM)', isMultiple: false },
          { label: 'Lợi nhuận sau thuế (năm gần nhất)', isMultiple: false },
          { label: 'Biên lợi nhuận gộp (TTM - %)', isMultiple: false },
          { label: 'Biên lợi nhuận gộp (5 năm - %)', isMultiple: false },
          { label: 'Biên lợi hoạt động (TTM - %)', isMultiple: false },
          { label: 'Biên lợi hoạt động (5 năm - %)', isMultiple: false },
          { label: 'Biên lợi trước thuế (TTM - %)', isMultiple: false },
          {
            label: 'Biên lợi trước thuế (5 năm - %)',
            isMultiple: false,
          },
          { label: 'Tỷ lệ thanh toán nhanh (MRQ)', isMultiple: false },
          {
            label: 'Tổng nợ/Vốn CSH (Total Debt to Equity)',
            isMultiple: false,
          },
          { label: 'Dòng tiền từ hoạt động kinh doanh', isMultiple: true },
          { label: 'Dòng tiền từ hoạt động đầu tư', isMultiple: true },
          { label: 'Dòng tiền từ hoạt động tài chính', isMultiple: true },
          { label: 'Dòng tiền tổng hợp', isMultiple: true },
          { label: 'Dòng tiền tự do', isMultiple: true },
          { label: 'Dòng tiền từ HĐKD/DT thuần', isMultiple: true },
        ],
        label: 'Thông số cơ bản',
      },
      {
        dropdown: [
          {
            label:
              'Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)',
            isMultiple: true,
          },
          {
            label:
              'EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)',
            isMultiple: true,
          },
          {
            label: 'Tăng trưởng doanh thu Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Quý gần nhì (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu 4 Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Năm gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Bình quân 3 năm (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng lợi nhuận Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng lợi nhuận Quý gần nhì (%)',
            isMultiple: false,
          },
          { label: 'Tăng trưởng LN 4 Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng LN Năm gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng LN Bình quân 3 năm (%)', isMultiple: false },
          {
            label: 'Tăng trưởng LN Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
          { label: 'Tăng trưởng EPS Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS Quý gần nhì (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS 4 Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS Năm gần nhất (%)', isMultiple: false },
          {
            label: 'Tăng trưởng EPS Bình quân 3 năm (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng EPS Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
        ],
        label: 'Chỉ số tài chính',
      },
      {
        dropdown: [
          {
            label:
              'Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)',
            isMultiple: true,
          },
          {
            label:
              'EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)',
            isMultiple: true,
          },
          {
            label: 'Tăng trưởng doanh thu Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Quý gần nhì (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu 4 Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Năm gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Bình quân 3 năm (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng lợi nhuận Quý gần nhất (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng lợi nhuận Quý gần nhì (%)',
            isMultiple: false,
          },
          { label: 'Tăng trưởng LN 4 Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng LN Năm gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng LN Bình quân 3 năm (%)', isMultiple: false },
          {
            label: 'Tăng trưởng LN Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
          { label: 'Tăng trưởng EPS Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS Quý gần nhì (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS 4 Quý gần nhất (%)', isMultiple: false },
          { label: 'Tăng trưởng EPS Năm gần nhất (%)', isMultiple: false },
          {
            label: 'Tăng trưởng EPS Bình quân 3 năm (%)',
            isMultiple: false,
          },
          {
            label: 'Tăng trưởng EPS Bình quân 3 năm (% - TTM)',
            isMultiple: false,
          },
        ],
        label: 'Nhóm tăng trưởng',
      },
      {
        dropdown: [
          {
            label: 'Cổ tức (bằng tiền) năm gần nhất',
            isMultiple: false,
          },
          {
            label: 'Cổ tức đều đặn trên 3 năm',
            isMultiple: false,
          },
          { label: 'Cổ tức bằng tiền (năm gần nhất)', isMultiple: false },
          {
            label: 'Tỷ suất cổ tức',
            isMultiple: false,
          },
          {
            label: 'Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)',
            isMultiple: false,
          },
          // {
          //   label: 'Thu nhập từ cổ tức bình quân 3 năm (%)',
          //   isMultiple: false,
          // },
          // { label: 'Tăng trưởng cổ tức (%)', isMultiple: false },
          { label: 'Thu nhập từ cổ tực dự kiến (%)', isMultiple: false },
          { label: 'Tỷ lệ chi trả cổ tức (%)', isMultiple: false },
        ],
        label: 'Nhóm cổ tức',
      },
    ]);
    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };

    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Vốn hoá':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '615.4T'],
              rightIndexList: [0, 615410000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'MarketCap',
            };
            break;

          case 'Doanh thu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.2T', '615.4T'],
              rightIndexList: [-1200000000000, 615410000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_TTM',
            };
            break;
          case 'Lợi nhuận sau thuế (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-4.5T', '53.6T'],
              rightIndexList: [-4480000000000, 53600000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_TTM',
            };
            break;
          case 'Doanh thu (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.1T', '395.28T'],
              rightIndexList: [-1080000000000, 395280000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_MRY',
            };
            break;
          case 'Lợi nhuận sau thuế (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-7.3T', '38.9T'],
              rightIndexList: [-7320000000000, 38860000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_MRY',
            };
            break;
          case 'Biên lợi nhuận gộp (TTM - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.1K', '90.3K'],
              rightIndexList: [-1100, 90300],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_GrossMargin_TTM',
            };
            break;
          case 'Biên lợi nhuận gộp (5 năm - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-300', '900'],
              rightIndexList: [-300, 900],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_GrossMargin_Avg_5Y',
            };
            break;
          case 'Biên lợi nhuận hoạt động (TTM - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-160.9K', '76.5K'],
              rightIndexList: [-160900, 76500],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_OperatingMargin',
            };
            break;
          case 'Biên lợi nhuận hoạt động (5 năm - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-35.1K', '15.2k'],
              rightIndexList: [-35100, 15200],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_OperatingMargin_Avg_5Y',
            };
            break;
          case 'Biên lợi nhuận trước thuế (TTM - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-160.7K', '128.0K'],
              rightIndexList: [-160700, 128000],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_PretaxMargin_TTM',
            };
            break;
          case 'Biên lợi nhuận trước thuế (5 năm - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-3.5K', '13.2K'],
              rightIndexList: [-3500, 13200],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_PretaxMargin_Avg_5Y',
            };
            break;
          case 'Tỷ lệ thanh toán nhanh (MRQ)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-7', '379'],
              rightIndexList: [-7, 379],
              interval: 0,
              intervalList: [],
              responseKey: 'FS_QuickRatio',
            };
            break;
          case 'Tổng nợ/Vốn CSH (Total Debt to Equity)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-49', '116'],
              rightIndexList: [-49, 116],
              interval: 0,
              intervalList: [],
              responseKey: 'FS_DebtOnEquityRatio',
            };
            break;
          case 'Dòng tiền từ hoạt động kinh doanh':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_Operating_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền từ hoạt động đầu tư':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_TTM',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền từ hoạt động tài chính':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_Financing_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền tổng hợp':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_Total_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền tự do':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_FreeCashFlow_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền từ HĐKD/DT thuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_OperatingNetSalePercent_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Cổ tức (bằng tiền) năm gần nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],

              boolean: 0,
              booleanList: ['có', 'không'],
            };
            break;
          case 'Cổ tức đều đặn trên 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],

              boolean: 0,
              booleanList: ['có', 'không'],
            };
            break;
          case 'Cổ tức bằng tiền (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10K'],
              rightIndexList: [0, 10000],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividend_LastYear',
            };
            break;
          case 'Tỷ suất cổ tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'DividendYield_LastYear',
            };
            break;
          case 'Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendYield_LastYear_CurrentPrice',
            };
            break;
          // case 'Thu nhập từ cổ tức bình quân 3 năm (%)':
          //   newTieuChiPicked = {
          //     label: state.label,
          //     leftIndexValue: 0,
          //     leftIndexList: [],
          //     compare: 0,
          //     compareList: ['range'],
          //     rightIndexValue: ['0', '3.8K'],
          //     rightIndexList: [0, 3800],
          //     interval: 0,
          //     intervalList: [],
          //     responseKey: 'DividendYield_Avg_3Y',
          //   };
          //   break;

          case 'Thu nhập từ cổ tực dự kiến (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendYield_ThisYearPlan_CurrentPrice',
            };
            break;
          case 'Tỷ lệ chi trả cổ tức (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendRatio_LastYear',
            };
            break;
          case 'EPS (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-29.7K', '20K'],
              rightIndexList: [-29710, 20000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'P/E (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'PE',
            };
            break;
          case 'P/S (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'PS',
            };
            break;
          case 'P/B (MRQ)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10'],
              rightIndexList: [0, 10],
              interval: 0,
              intervalList: [],
              responseKey: 'PB',
            };
            break;
          case 'Vòng quay tổng tài sản (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1'],
              rightIndexList: [0, 1],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_AssetTurnover',
            };
            break;
          case 'Vòng quay hàng tồn kho (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_InventoryTurnover',
            };
            break;
          case 'Vòng quay các khoản phải thu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ReceivableTurnover',
            };
            break;
          case 'ROE (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '500'],
              rightIndexList: [-100, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ROE',
            };
            break;
          case 'ROIC (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROA (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '500'],
              rightIndexList: [-100, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ROA',
            };
            break;
          case 'Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Tăng trưởng doanh thu Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng doanh thu Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng doanh thu 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_TTM',
            };
            break;
          case 'Tăng trưởng doanh thu Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRY',
            };
            break;
          case 'Tăng trưởng doanh thu Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_TTM_Avg_3Y',
            };
            break;
          case 'Tăng trưởng lợi nhuận Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng lợi nhuận Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng LN 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_TTM',
            };
            break;
          case 'Tăng trưởng LN Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRY',
            };
            break;
          case 'Tăng trưởng LN Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng LN Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_TTM_Avg_3Y',
            };
            break;
          case 'Tăng trưởng EPS Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng EPS Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng EPS 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_TTM',
            };
            break;
          case 'Tăng trưởng EPS Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRY',
            };
            break;
          case 'Tăng trưởng EPS Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng EPS Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_TTM_Avg_3Y',
            };
            break;

          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);

    return (
      <div style={{ width: '100%' }}>
        {listTieuChi.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const dropdownLabels = item.dropdown.map((item: any) => item.label);
          const numberOfPicked = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            dropdownLabels.includes(itemPicked.label)
          ).length;
          const totalPicked = listTieuChi.reduce((total, item) => {
            const numberOfPicked = [
              ...new Map(
                listTieuChiPicked.map((tieuChi) => [tieuChi.label, tieuChi])
              ).values(),
            ].filter((itemPicked) =>
              item.dropdown
                .map((dropdownItem) => dropdownItem.label)
                .includes(itemPicked.label)
            ).length;

            return total + numberOfPicked;
          }, 0);

          setPickerBasic(totalPicked);

          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',

                // ...styles.button,
                marginBottom: 6,
              }}
            >
              <div
                onMouseEnter={() => {
                  setIsHoverChiTieu([item.label, true]);
                }}
                onMouseLeave={() => {
                  setIsHoverChiTieu([item.label, false]);
                }}
                style={{
                  display: 'flex',
                  padding: '16px 12px',
                  // height: '30px',
                  alignItems: 'center',
                  borderRadius: '4px',
                  justifyContent: 'space-between',
                  color:
                    (isHoverChiTieu[1] && isHoverChiTieu[0] === item.label) ||
                    numberOfPicked > 0
                      ? screenMode === 'light'
                        ? '#004AEA'
                        : 'rgba(153, 186, 255, 1)'
                      : screenMode === 'light'
                        ? '#B1B5BE'
                        : 'rgba(255, 255, 255)',
                  background:
                    screenMode === 'dark' ? 'rgba(41, 43, 50, 1)' : '#F9FAFA',
                }}
                onClick={() => handleClick(item.label)}
              >
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    lineHeight: '20px',

                    height: '20px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      marginLeft: 8,
                      color:
                        (isHoverChiTieu[1] &&
                          isHoverChiTieu[0] === item.label) ||
                        numberOfPicked > 0
                          ? screenMode === 'light'
                            ? '#004AEA'
                            : 'rgba(153, 186, 255, 1)'
                          : screenMode === 'light'
                            ? '#B1B5BE'
                            : 'rgba(255, 255, 255)',
                    }}
                  >
                    ({numberOfPicked}/{item.dropdown.length})
                  </span>
                </div>
                {isOpen ? (
                  <CaretUpOutlined
                    className={'iconoutlineddirectionalcare120'}
                  />
                ) : (
                  <CaretDownOutlined
                    className={'iconoutlineddirectionalcare120'}
                  />
                )}
              </div>
              <div
                style={{
                  display: isOpen ? 'block' : 'none',
                  margin: '9px 0px',
                }}
              >
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#E0EAFF'
                          : isHover[1] && isHover[0] === item.label
                            ? screenMode === 'dark'
                              ? '#292B32'
                              : '#F1F2F3'
                            : 'transparent',
                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,
                            // color:
                            //   isHover[1] && isHover[0] === item.label
                            //     ? screenMode === 'light'
                            //       ? '#004AEA'
                            //       : 'rgba(153, 186, 255, 1)'
                            //     : screenMode === 'light'
                            //       ? '#2E3138'
                            //       : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const NhomCoTuc: FC<any> = ({
    listSearch,
    listSaveMyFilter,
    setListSaveMyFilter,
    setListSearch,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,
    setListOpenTieuChi,
    listOpenTieuChi,
    listMyFilter,
    handleMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);

    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          {
            label: 'Cổ tức (bằng tiền) năm gần nhất',
            isMultiple: false,
          },
          {
            label: 'Cổ tức đều đặn trên 3 năm',
            isMultiple: false,
          },
          { label: 'Cổ tức bằng tiền (năm gần nhất)', isMultiple: false },
          {
            label: 'Tỷ suất cổ tức',
            isMultiple: false,
          },
          {
            label: 'Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)',
            isMultiple: false,
          },
          // {
          //   label: 'Thu nhập từ cổ tức bình quân 3 năm (%)',
          //   isMultiple: false,
          // },
          // { label: 'Tăng trưởng cổ tức (%)', isMultiple: false },
          { label: 'Thu nhập từ cổ tực dự kiến (%)', isMultiple: false },
          { label: 'Tỷ lệ chi trả cổ tức (%)', isMultiple: false },
        ],
        // label: 'THEO ĐƯỜNG TB ĐƠN GIẢN (MA)',
      },
    ]);
    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };
    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Cổ tức (bằng tiền) năm gần nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],

              boolean: 0,
              booleanList: ['có', 'không'],
            };
            break;
          case 'Cổ tức đều đặn trên 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],

              boolean: 0,
              booleanList: ['có', 'không'],
            };
            break;
          case 'Cổ tức bằng tiền (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10K'],
              rightIndexList: [0, 10000],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividend_LastYear',
            };
            break;
          case 'Tỷ suất cổ tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'DividendYield_LastYear',
            };
            break;
          case 'Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendYield_LastYear_CurrentPrice',
            };
            break;
          // case 'Thu nhập từ cổ tức bình quân 3 năm (%)':
          //   newTieuChiPicked = {
          //     label: state.label,
          //     leftIndexValue: 0,
          //     leftIndexList: [],
          //     compare: 0,
          //     compareList: ['range'],
          //     rightIndexValue: ['0', '3.8K'],
          //     rightIndexList: [0, 3800],
          //     interval: 0,
          //     intervalList: [],
          //     responseKey: 'DividendYield_Avg_3Y',
          //   };
          //   break;

          case 'Thu nhập từ cổ tực dự kiến (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendYield_ThisYearPlan_CurrentPrice',
            };
            break;
          case 'Tỷ lệ chi trả cổ tức (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendRatio_LastYear',
            };
            break;

          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    // useEffect(() => {
    //   if (
    //     listTieuChiPicked.length > previousListLength &&
    //     listTieuChiPicked.length > 6
    //   ) {
    //     scrollToBottom();
    //   }
    //   setPreviousListLength(listTieuChiPicked.length);
    // }, [listTieuChiPicked]);
    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);
    return (
      <div style={{ width: '100%' }}>
        {listTieuChi.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const numberOfPicked = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            item.dropdown
              .map((item: any) => item.label)
              .includes(itemPicked.label)
          ).length;
          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',

                // ...styles.button,
                marginBottom: 4,
              }}
            >
              <div style={{ display: !isOpen ? 'block' : 'none' }}>
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#F1F2F3'
                          : 'transparent',
                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,
                            // color:
                            //   isHover[1] && isHover[0] === item.label
                            //     ? screenMode === 'light'
                            //       ? '#004AEA'
                            //       : 'rgba(153, 186, 255, 1)'
                            //     : screenMode === 'light'
                            //       ? '#2E3138'
                            //       : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const NhomChiBaoKyThuat: FC<any> = ({
    listSearch,
    listSaveMyFilter,
    setListSaveMyFilter,
    setListSearch,
    handleMyFilter,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
    listMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);
    // const [previousListLength, setPreviousListLength] = useState<any>(
    //   listTieuChiPicked.length
    // );
    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: [
          { label: 'Giá so với đường TB - MA', isMultiple: true },
          { label: 'So sánh 2 đường TB - MA', isMultiple: true },
          { label: 'Giao cắt 2 đường TB - MA', isMultiple: true },
          { label: 'Giá cắt đường TB - MA', isMultiple: true },
        ],
        label: 'Theo đường tb đơn giản (MA)',
      },
      {
        dropdown: [
          { label: 'Giá so với đường TB - EMA', isMultiple: true },
          { label: 'Giá cắt đường TB - EMA', isMultiple: true },

          { label: 'Giao cắt 2 đường TB - EMA', isMultiple: true },
        ],
        label: 'Theo đường tb hàm mũ (EMA)',
      },
      {
        dropdown: [
          { label: 'Giá so với Tenkan(9)', isMultiple: true },
          { label: 'Giá so với Kijun(26)', isMultiple: true },
          { label: 'Giá so với Cloud(52)', isMultiple: true },
          { label: 'Giá giao cắt với Tenkan(9)', isMultiple: true },
          { label: 'Giá giao cắt với Kijun(26)', isMultiple: true },
          { label: 'Giá giao cắt với Cloud(52)', isMultiple: true },
          { label: 'Giao cắt thành phần Tenkan và Kijun', isMultiple: true },
        ],
        label: 'Ichimoku',
      },
      {
        dropdown: [
          { label: 'MACD so với Signal', isMultiple: false },
          { label: 'MACD cắt với Signal', isMultiple: true },
          { label: 'Trạng thái giá trị của MACD', isMultiple: true },
          { label: 'Histogram tăng liên tục', isMultiple: true },
          { label: 'Histogram giảm liên tục', isMultiple: true },
        ],
        label: 'MACD (9,12,26)',
      },
      {
        dropdown: [
          { label: 'Giá trị RSI14', isMultiple: false },
          { label: 'RSI14 so với các vùng giá trị', isMultiple: false },
          { label: 'RSI14 và vùng Quá mua/Quá bán', isMultiple: true },
        ],
        label: 'RSI14',
      },
      {
        dropdown: [
          { label: 'Giá tăng vượt Biên trên', isMultiple: false },
          { label: 'Giá giảm qua Biên trên', isMultiple: false },
          { label: 'Giá giảm thủng Biên dưới', isMultiple: false },
          { label: 'Giá tăng qua Biên dưới', isMultiple: false },
          {
            label: 'Giá duy trì vượt ngoài Biên trên Bollinger',
            isMultiple: true,
          },
          {
            label: 'Giá duy trì ngoài Biên dưới Bollinger',
            isMultiple: true,
          },
        ],
        label: 'Bollinger band (20,2)',
      },
      {
        dropdown: [
          { label: 'Giá trị MFI(20)', isMultiple: false },
          { label: 'MFI(20) và vùng Quá mua/Quá bán', isMultiple: true },
        ],
        label: 'Chỉ báo MFI(20)',
      },
      {
        dropdown: [
          { label: 'Stochastic và vùng Quá mua/Quá bán', isMultiple: true },
          { label: 'Stochastic giao cắt nhau', isMultiple: true },
        ],
        label: 'Chỉ báo Stochastic (13,5,5)',
      },
      {
        dropdown: [
          { label: 'Giá trị MCDX (Banker)', isMultiple: false },
          { label: 'Giá trị MCDX (Hot money)', isMultiple: false },
          { label: 'Biến động MCDX', isMultiple: true },
        ],
        label: 'Chỉ báo MCDX',
      },
      {
        dropdown: [
          { label: 'Giá trị ADX(14)', isMultiple: false },
          { label: 'Giá trị -DI(14)', isMultiple: false },
          { label: 'Giá trị +DI(14)', isMultiple: false },
          { label: 'Giao cắt nhóm ADX', isMultiple: true },
          { label: 'ADX và ngưỡng giá trị', isMultiple: true },
        ],
        label: 'Chỉ báo ADX(14)',
      },
      {
        dropdown: [
          { label: 'Giá so với PSar', isMultiple: false },
          { label: 'Khoảng cách giá và PSar', isMultiple: false },
          { label: 'PSar đảo chiều', isMultiple: false },
        ],
        label: 'Chỉ báo Parabolic SAR - PSAR',
      },
    ]);
    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };

    const handleDelete = (state: any) => {
      //remove state from listTieuChiPicked
      const newListTieuChiPicked = listTieuChiPicked.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listTieuChiPicked
          .map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listTieuChiPicked.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Giá so với đường TB - EMA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá cắt đường TB - EMA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'Giao cắt 2 đường TB - EMA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với đường TB - MA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'Giao cắt 2 đường TB - MA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá cắt đường TB - MA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với Tenkan(9)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['Tenkan(9)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với Kijun(26)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['Kijun(26)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với Cloud(52)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['Cloud(52)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá giao cắt với Tenkan(9)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Tenkan(9)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá giao cắt với Kijun(26)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Kijun(26)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá giao cắt với Cloud(52)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Cloud(52)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giao cắt thành phần Tenkan và Kijun':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tenkan', 'Kijun'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: ['Tenkan', 'Kijun'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'MACD cắt với Signal':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['MACD'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Signal'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Trạng thái giá trị của MACD':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['MACD(12,26)', 'MACDSignal(12,26,9)'],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [
                'có giá trị dương (>=0)',
                'có giá trị âm (<0)',
                'vượt giá trị 0',
                'thủng giá trị 0',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Histogram tăng liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 30],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Histogram giảm liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 30],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị RSI14':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'RSI14_Daily',
            };
            break;
          case 'RSI14 so với các vùng giá trị':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['RSI14'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['70', '60', '40', '30'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'RSI14 và vùng Quá mua/Quá bán':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['RSI14'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Vùng quá mua', 'Vùng quá bán'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá tăng vượt Biên trên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá giảm qua Biên trên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá giảm thủng Biên dưới':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá tăng qua Biên dưới':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá duy trì vượt ngoài Biên trên Bollinger':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 10],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá duy trì ngoài Biên dưới Bollinger':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 10],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị MFI(20)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'MFI_Daily',
            };
            break;
          case 'MFI(20) và vùng Quá mua/Quá bán':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['MFI(20)'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Vùng quá mua', 'Vùng quá bán'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Stochastic và vùng Quá mua/Quá bán':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['%K(13,5)', '%D(13,5,5)'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Vùng quá mua', 'Vùng quá bán'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Stochastic giao cắt nhau':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['StochSlowK'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['StochSlowD'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị MCDX (Banker)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'MCDXBanker_Daily',
            };
            break;
          case 'Giá trị MCDX (Hot money)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'MCDXHotMoney_Daily',
            };
            break;
          case 'Biến động MCDX':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Banker', 'Hot money'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: [
                '20',
                '25',
                '30',
                '40',
                '50',
                '60',
                '70',
                '75',
                '80',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị ADX(14)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'ADX_Daily',
            };
            break;
          case 'Giá trị -DI(14)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'DIN14_Daily',
            };
            break;
          case 'Giá trị +DI(14)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'DIP14_Daily',
            };
            break;
          case 'Giao cắt nhóm ADX':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['+DI', '-DI', 'ADX'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: ['+DI', '-DI', 'ADX'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'ADX và ngưỡng giá trị':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['ADX', '+DI', '-DI'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                '20',
                '25',
                '30',
                '35',
                '40',
                '45',
                '50',
                '55',
                '60',
                '65',
                '70',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với PSar':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['PSar'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Khoảng cách giá và PSar':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100'],
              rightIndexList: [-100, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'CloseVsPSARMUTATION_Daily',
            };
            break;
          case 'PSar đảo chiều':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Đảo chiều tăng', 'Đảo chiều giảm'],
              rightIndexValue: 1,
              rightIndexList: ['PSar'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);

    return (
      <div style={{ width: '100%' }}>
        {listTieuChi.map((item: any, index: any) => {
          const isOpen = listOpenTieuChi.includes(item.label);
          const numberOfPicked = [
            ...new Map(
              listTieuChiPicked.map((tieuChi: any) => [tieuChi.label, tieuChi])
            ).values(),
          ].filter((itemPicked: any) =>
            item.dropdown
              .map((item: any) => item.label)
              .includes(itemPicked.label)
          ).length;
          const totalPicked = listTieuChi.reduce((total, item) => {
            const numberOfPicked = [
              ...new Map(
                listTieuChiPicked.map((tieuChi) => [tieuChi.label, tieuChi])
              ).values(),
            ].filter((itemPicked) =>
              item.dropdown
                .map((dropdownItem) => dropdownItem.label)
                .includes(itemPicked.label)
            ).length;

            return total + numberOfPicked;
          }, 0);

          setPickerTechnique(totalPicked);

          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',

                // ...styles.button,
                marginBottom: 6,
              }}
            >
              <div
                onMouseEnter={() => {
                  setIsHoverChiTieu([item.label, true]);
                }}
                onMouseLeave={() => {
                  setIsHoverChiTieu([item.label, false]);
                }}
                style={{
                  display: 'flex',
                  padding: '16px 12px',
                  // height: '30px',
                  alignItems: 'center',
                  borderRadius: '4px',
                  justifyContent: 'space-between',
                  color:
                    (isHoverChiTieu[1] && isHoverChiTieu[0] === item.label) ||
                    numberOfPicked > 0
                      ? screenMode === 'light'
                        ? '#004AEA'
                        : 'rgba(153, 186, 255, 1)'
                      : screenMode === 'light'
                        ? '#B1B5BE'
                        : 'rgba(255, 255, 255)',
                  background:
                    screenMode === 'dark' ? 'rgba(41, 43, 50, 1)' : '#F9FAFA',
                }}
                onClick={() => handleClick(item.label)}
              >
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    lineHeight: '20px',

                    height: '20px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      marginLeft: 8,
                      color:
                        (isHoverChiTieu[1] &&
                          isHoverChiTieu[0] === item.label) ||
                        numberOfPicked > 0
                          ? screenMode === 'light'
                            ? '#004AEA'
                            : 'rgba(153, 186, 255, 1)'
                          : screenMode === 'light'
                            ? '#B1B5BE'
                            : 'rgba(255, 255, 255)',
                    }}
                  >
                    ({numberOfPicked}/{item.dropdown.length})
                  </span>
                </div>
                {isOpen ? (
                  <CaretUpOutlined
                    className={'iconoutlineddirectionalcare120'}
                  />
                ) : (
                  <CaretDownOutlined
                    className={'iconoutlineddirectionalcare120'}
                  />
                )}
              </div>
              <div
                style={{
                  display: isOpen ? 'block' : 'none',
                  margin: '9px 0px',
                }}
              >
                {item.dropdown.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        backgroundColor: listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label)
                          ? screenMode === 'dark'
                            ? 'rgba(34, 48, 79, 1)'
                            : '#E0EAFF'
                          : isHover[1] && isHover[0] === item.label
                            ? screenMode === 'dark'
                              ? '#292B32'
                              : '#F1F2F3'
                            : 'transparent',

                        // backgroundColor: '#1b1e2b',
                        justifyContent: 'space-between',
                        padding: '12px 16px',

                        alignItems: 'center',

                        borderTop:
                          screenMode === 'dark'
                            ? '1px solid rgba(48, 50, 59, 1)'
                            : '1px solid rgba(213, 215, 220, 1)',
                      }}
                      onMouseEnter={() => {
                        setIsHover([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHover([item.label, false]);
                      }}
                      onClick={() => handlePick(item)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMyFilter(item);
                          }}
                        >
                          {listMyFilter?.some(
                            (el: any) => el.label === item.label
                          ) ? (
                            <Tooltip
                              placement="top"
                              title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                                  fill="#E8D632"
                                />
                              </svg>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              placement="top"
                              title={'Thêm Vào Bộ Lọc Của Tôi'}
                              arrow={true}
                              color="#3594EF"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                                  fill={
                                    screenMode === 'dark'
                                      ? '#ABADBA'
                                      : '#747B8B'
                                  }
                                />
                              </svg>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="item-drop"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 8,

                            color:
                              screenMode === 'light'
                                ? '#2E3138'
                                : 'rgba(255, 255, 255)',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: '20px',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.isMultiple && (
                          <div
                            style={{
                              color: '#42a732',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
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
                                d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                                fill={
                                  listTieuChiPicked
                                    .map((item: any) => item?.label || null)
                                    .includes(item.label)
                                    ? '#42a732'
                                    : isHover[1] && isHover[0] === item.label
                                      ? '#42a732'
                                      : screenMode === 'light'
                                        ? '#2E3138'
                                        : 'rgba(255, 255, 255)'
                                }
                              />
                            </svg>
                          </div>
                        )}
                        {listTieuChiPicked
                          .map((item: any) => item?.label || null)
                          .includes(item.label) ? (
                          <div
                            onMouseEnter={() => {
                              setIsHoverDelete([item.label, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverDelete([item.label, false]);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            style={{
                              fontSize: '14px',
                              fontWeight: '400',
                              zIndex: 1000,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                fill="#004AEA"
                              />
                              <path
                                d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                              stroke={
                                screenMode === 'dark' ? '#40424E' : '#D5D7DC'
                              }
                              stroke-width="2"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const MyFilter: FC<any> = ({
    listSearch,
    listSaveMyFilter,
    setListSaveMyFilter,
    setListSearch,
    valueSearch,
    listTieuChiPicked,
    setListTieuChiPicked,

    setListOpenTieuChi,
    listOpenTieuChi,
    // listSaveMyFilter,
    listMyFilter,
    handleMyFilter,
  }) => {
    const [isHover, setIsHover] = useState<any>([]);
    const [isHoverDelete, setIsHoverDelete] = useState<any>([]);
    const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>([]);

    const [listTieuChi, setListTieuChi] = useState([
      {
        dropdown: listMyFilter,
        // label: 'THEO ĐƯỜNG TB ĐƠN GIẢN (MA)',
      },
    ]);

    const handleClick = (state: any) => {
      if (listOpenTieuChi.includes(state)) {
        //remove state from listOpenTieuChi
        const newListOpenTieuChi = listOpenTieuChi.filter(
          (item: any) => item !== state
        );
        setListOpenTieuChi(newListOpenTieuChi);
      } else {
        const newListOpenTieuChi = [...listOpenTieuChi, state];
        setListOpenTieuChi(newListOpenTieuChi);
      }
    };
    const handleDelete = (state: any) => {
      //remove state from listSaveMyFilter
      const newListTieuChiPicked = listMyFilter?.filter(
        (item: any) => item.label !== state.label
      );
      setListTieuChiPicked(newListTieuChiPicked);
    };

    const handlePick = (state: any) => {
      if (
        listSaveMyFilter
          ?.map((item: any) => item?.label || null)
          .includes(state.label) &&
        state.isMultiple === false
      ) {
        const newListTieuChiPicked = listSaveMyFilter?.filter(
          (item: any) => item.label !== state.label
        );
        setListTieuChiPicked(newListTieuChiPicked);
      } else {
        let newTieuChiPicked;
        switch (state.label) {
          case 'Giá trị giao dịch ròng của NĐTNN':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-9.0T', '9.0T'],
              rightIndexList: [-9000000000000, 9000000000000],
              interval: 0,
              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
              intervalList: [],
              responseKey: 'ForeignBuySellValue',
            };
            break;

          case 'Biên độ giá High - Low theo số phiên (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'BienDoGiaHighLow',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;

          case 'EPS (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-29.7K', '20K'],
              rightIndexList: [-29710, 20000],
              interval: 0,
              intervalList: [],

              responseKey: 'Eps_TTM',
            };
            break;
          case 'Vốn hoá':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '615.4T'],
              rightIndexList: [0, 615410000000000],
              interval: 0,
              responseKey: 'MarketCap',
              intervalList: [],
            };
            break;

          case 'Tỷ suất cổ tức năm gần nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.5K'],
              rightIndexList: [0, 1500],
              interval: 0,
              intervalList: [],
              responseKey: 'DividendYield_LastYear',
            };
            break;
          case 'KLTB 3 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '47.02M'],
              rightIndexList: [0, 47020000],
              interval: 0,
              intervalList: [],
              responseKey: 'AvgVol3M',
            };
            break;
          case 'RS1m (1 tháng)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS1M',
            };
            break;
          case 'RS3m (3 tháng)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS3M',
            };
            break;
          case 'RS6m (6 tháng)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS6M',
            };
            break;
          case 'RS52w (52 tuần)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['1', '99'],
              rightIndexList: [1, 99],
              interval: 0,
              intervalList: [],
              responseKey: 'RS52W',
            };
            break;
          case 'Khối lượng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '47.38M'],
              rightIndexList: [0, 47380000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealVol',
            };
            break;

          case 'Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Tăng trưởng doanh thu Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng doanh thu Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng doanh thu 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_TTM',
            };
            break;
          case 'Tăng trưởng doanh thu Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_MRY',
            };
            break;
          case 'Tăng trưởng doanh thu Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_Growth_TTM_Avg_3Y',
            };
            break;
          case 'Tăng trưởng lợi nhuận Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng lợi nhuận Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng LN 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_TTM',
            };
            break;
          case 'Tăng trưởng LN Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_MRY',
            };
            break;
          case 'Tăng trưởng LN Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng LN Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_Growth_TTM_Avg_3Y',
            };
            break;
          case 'Tăng trưởng EPS Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRQ',
            };
            break;
          case 'Tăng trưởng EPS Quý gần nhì (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRQ_2',
            };
            break;
          case 'Tăng trưởng EPS 4 Quý gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_TTM',
            };
            break;
          case 'Tăng trưởng EPS Năm gần nhất (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_MRY',
            };
            break;
          case 'Tăng trưởng EPS Bình quân 3 năm (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_Avg_3Y',
            };
            break;
          case 'Tăng trưởng EPS Bình quân 3 năm (% - TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_Growth_TTM_Avg_3Y',
            };
            break;

          case 'P/E (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '200'],
              rightIndexList: [0, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'PE',
            };
            break;
          case 'P/S (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'PS',
            };
            break;
          case 'P/B (MRQ)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10'],
              rightIndexList: [0, 10],
              interval: 0,
              intervalList: [],
              responseKey: 'PB',
            };
            break;
          case 'Vòng quay tổng tài sản (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1'],
              rightIndexList: [0, 1],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_AssetTurnover',
            };
            break;
          case 'Vòng quay hàng tồn kho (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_InventoryTurnover',
            };
            break;
          case 'Vòng quay các khoản phải thu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ReceivableTurnover',
            };
            break;
          case 'ROE (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '500'],
              rightIndexList: [-100, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ROE',
            };
            break;
          case 'ROIC (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '500'],
              rightIndexList: [0, 500],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROA (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '500'],
              rightIndexList: [-100, 500],
              interval: 0,
              intervalList: [],
              responseKey: 'ME_ROA',
            };
            break;

          case 'Giá cuối':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '964'],
              rightIndexList: [0, 964],
              interval: 0,
              intervalList: [],
              responseKey: 'LastPrice',
            };
            break;
          case 'Cao nhất 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '2.03K'],
              rightIndexList: [0, 2030],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjHigh52W',
            };
            break;
          case 'Thấp nhất 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '312'],
              rightIndexList: [0, 312],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjLow52W',
            };
            break;
          case 'Thay đổi trong 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-30', '258'],
              rightIndexList: [-30, 258],
              interval: 0,
              intervalList: [],
              responseKey: 'Change52W',
            };
            break;
          case '% thay đổi 1 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '200'],
              rightIndexList: [-100, 200],
              interval: 0,
              intervalList: [],
              responseKey: 'ChangePercent1M',
            };
            break;
          case '% Thay đổi từ đầu năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '1.2K'],
              rightIndexList: [-100, 1200],
              interval: 0,
              intervalList: [],
              responseKey: 'ChangePercentYTD',
            };
            break;
          case '% Thay đổi từ đáy 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '1.4K'],
              rightIndexList: [-100, 1400],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjLow52W_PercentChange',
            };
            break;
          case '% Thay đổi từ đỉnh 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100'],
              rightIndexList: [-100, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'AdjHigh52W_PercentChange',
            };
            break;
          case '% thay đổi giá đóng cửa theo số phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100.0K'],
              rightIndexList: [-100, 100000],
              interval: 0,
              intervalList: [],
              responseKey: 'ChangePercent_5',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;
          case 'Biến động trong ngày (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100'],
              rightIndexList: [-100, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'PriceChangePercent',
            };
            break;

          case 'Giá trị giao dịch':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0M'],
              rightIndexList: [0, 1000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealValue',
            };
            break;
          case 'Khối lượng Trung bình theo số phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1B'],
              rightIndexList: [0, 1000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalVolumeAvg',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;
          case 'Giá trị giao dịch Trung bình theo phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1.0B'],
              rightIndexList: [0, 1000000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'TotalDealValueAvg',

              session: 0,
              sessionList: [
                '05 phiên',
                '10 phiên',
                '20 phiên',
                '60 phiên',
                '120 phiên',
              ],
              sessionListNumber: [5, 10, 20, 60, 120],
            };
            break;
          case 'Beta':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1', '4'],
              rightIndexList: [-1, 4],
              interval: 0,
              intervalList: [],
              responseKey: 'Beta',
            };
            break;
          case 'Vượt đỉnh 1 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top1W',
            };
            break;
          case 'Vượt đỉnh 4 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất 4 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top4W',
            };
            break;
          case 'Vượt đỉnh 12 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất 12 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top12W',
            };
            break;
          case 'Vượt đỉnh 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá cao nhất 52 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Top52W',
            };
            break;
          case 'Thủng đáy 1 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom1W',
            };
            break;
          case 'Thủng đáy 4 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất 4 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom4W',
            };
            break;
          case 'Thủng đáy 12 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất 12 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom12W',
            };
            break;
          case 'Thủng đáy 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá (Average)',
                'Average (H,L,C)',
              ],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['Giá thấp nhất 52 tuần liền trước'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Bottom52W',
            };
            break;
          case 'Số phiên tăng giá liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá ((H+L)/2)',
                'Giá ((O + H + L + C)/4)',
              ],
              compare: 0,
              compareList: ['slider', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Số phiên giảm giá liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'Giá (Close)',
                'Giá (Low)',
                'Giá ((H+L)/2)',
                'Giá ((O + H + L + C)/4)',
              ],
              compare: 0,
              compareList: ['slider', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Số phiên KL tăng liên tiếp':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
            };
            break;
          case 'Số phiên KL giảm liên tiếp':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
            };
            break;
          case 'Khối lượng khớp lệnh đang cao nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Khối lượng khớp lệnh đang thấp nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['nen', 2, 100],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 5 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 10 ngày liền trước',

              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol5D',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 10 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 10 ngày liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol10D',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 20 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 20 ngày liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol20D',
            };
            break;
          case 'Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 60 ngày liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'TBKL cùng thời điểm 60 ngày liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationAvgVol60D',
            };
            break;
          case 'KL tăng so với cùng thời điểm của phiên liền trước':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tổng KL từ đầu phiên tới thời điểm lọc'],
              percent: 0,
              percentList: [
                '70%',
                '80%',
                '90%',
                '100%',
                '110%',
                '120%',
                '130%',
                '200%',
              ],
              textPercent: 'KL cùng thời điểm phiên liền trước',
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],
              responseKey: 'MutationVolT1',
            };
            break;
          case 'Biến động giá 1 ngày':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-39.96', '19.17'],
              rightIndexList: [-39.96, 19.17],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 1 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-40.40', '71.71'],
              rightIndexList: [-40.4, 71.71],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 1 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-67.82', '175.27'],
              rightIndexList: [-67.82, 175.27],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 3 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-83.72', '179.44'],
              rightIndexList: [-83.72, 179.44],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 6 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-83.72', '453.33'],
              rightIndexList: [-83.72, 453.33],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá 52 tuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-97.67', '931.69'],
              rightIndexList: [-97.67, 931.69],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biến động giá từ đầu năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-96.57', '751.03'],
              rightIndexList: [-96.57, 751.03],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Khối lượng GD':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '31.7K'],
              rightIndexList: [0.0, 31693.15],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 5 phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '36.2K'],
              rightIndexList: [0.0, 36197.74],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 10 phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '37.4K'],
              rightIndexList: [0.0, 37414.85],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 20 phiên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '39.6K'],
              rightIndexList: [0.0, 39696.18],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Kl T.bình 3 tháng':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '36.6K'],
              rightIndexList: [0.0, 31693.15],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case '% Free Float':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '100'],
              rightIndexList: [0.0, 100],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '887.146K'],
              rightIndexList: [0.0, 887146.25],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 5D':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '954.623K'],
              rightIndexList: [0.0, 954, 623.37],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 10D':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '822.005K'],
              rightIndexList: [0.0, 822005.57],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 20D':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '754.577K'],
              rightIndexList: [0.0, 754, 577.71],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá trị GD T.bình 3M':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '854.179K'],
              rightIndexList: [0.0, 854179.06],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'P/B (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '181.97'],
              rightIndexList: [0.0, 181.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá - Dòng Tiền (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-14.964K', '6.963K'],
              rightIndexList: [-14964.69, 6963.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá - Dòng Tiền Tự Do (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-12.505K', '5.244K'],
              rightIndexList: [-12505.46, 5244.38],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Giá - T.sản hữu hình (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '181.97'],
              rightIndexList: [0.0, 181.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Doanh thu (tỉ đồng) (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '284.084K'],
              rightIndexList: [0.0, 284084.36],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;

          case 'LN ròng (tỉ đồng) (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-6.405K', '41.227K'],
              rightIndexList: [-6405.41, 41227.58],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Doanh thu (tỉ đồng) (năm trước)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '304.188K'],
              rightIndexList: [0.0, 304188.09],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'LN ròng (tỉ đồng) (năm trước)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-10.452K', '29.892K'],
              rightIndexList: [-10452.64, 29892.29],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Doanh thu (quý gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-45.54', '72.439K'],
              rightIndexList: [-45.54, 72439.14],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Lợi nhuận thuần (quý gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.277K', '10.694K'],
              rightIndexList: [-2277.22, 10694.76],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng D.thu (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100.00', '4.943K'],
              rightIndexList: [-100, 4943.78],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng LN gộp (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.355K', '20.925K'],
              rightIndexList: [-2355.9, 20925.27],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng LN ròng (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-52.594K', '9.831K'],
              rightIndexList: [-52594.95, 9831.39],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng K.doanh 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-93.74', '1.843K'],
              rightIndexList: [-93.74, 1843.21],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng LN ròng 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-97.52', '1.606K'],
              rightIndexList: [-97.52, 1606.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng vốn CSH 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-47.17', '613.18'],
              rightIndexList: [-47.17, 613.18],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'T.trưởng EPS (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100.00', '12.314K'],
              rightIndexList: [-100, 12314.09],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tăng trưởng doanh thu quý gần nhất (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-112.92', '4.943K'],
              rightIndexList: [-112.92, 4943.78],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-52.594K', '9.831K'],
              rightIndexList: [-52594.95, 9831.39],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROE (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-5.970K', '154.17'],
              rightIndexList: [-5970.7, 154.17],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROA (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.003K', '147.89'],
              rightIndexList: [-2003.02, 147.89],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN gộp (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.159K', '69.412K'],
              rightIndexList: [-1159.36, 69412.29],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN gộp (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.322K', '155.54'],
              rightIndexList: [-1322.46, 155.54],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN gộp (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.504K', '100'],
              rightIndexList: [-1504.26, 100],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN ròng (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.686K', '98.398K'],
              rightIndexList: [-2686.07, 98398.95],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN ròng (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-14.981K', '47.060K'],
              rightIndexList: [-14981.11, 47060.11],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên LN ròng (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-60.640K', '32.309K'],
              rightIndexList: [-60640.5, 32309.32],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên EBIT (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-2.269K', '93.763K'],
              rightIndexList: [-2269.26, 93763.2],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Biên EBIT (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-17.08 K', '1.03 K'],
              rightIndexList: [-17087.17, 1033.56],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;

          case 'Nợ phải trả/ Tổng tài sản (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '28.82'],
              rightIndexList: [0, 28.82],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Nợ phải trả/ Vốn chủ sở hữu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-58.64', '53.05'],
              rightIndexList: [-58.64, 53.05],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Nợ dài hạn/ Vốn chủ sở hữu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-57.55', '7.01'],
              rightIndexList: [-57.55, 7.01],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Nợ phải trả/ Vốn chủ sở hữu (quý)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-58.64', '53.05'],
              rightIndexList: [-58.64, 53.05],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ suất thanh toán hiện hành (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '218.01'],
              rightIndexList: [0, 218.01],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ suất thanh toán nhanh (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '218.01'],
              rightIndexList: [0, 218.01],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ suất thanh toán tiền mặt (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '122.68'],
              rightIndexList: [0, 122.68],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Khả năng chi trả lãi vay (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-310.570K', '72.619K'],
              rightIndexList: [-310570.3, 72619.96],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ lệ tổ chức sở hữu':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['5.00', '112.16'],
              rightIndexList: [5, 112.16],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Sở hữu nước ngoài':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.0', '99.14'],
              rightIndexList: [0, 99.14],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Room nước ngoài':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '1.49M'],
              rightIndexList: [0.0, 1495448.34],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Cổ Tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '18K'],
              rightIndexList: [0.0, 18000],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ Suất Cổ Tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '751.20'],
              rightIndexList: [0.0, 751.2],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ Suất Cổ Tức T.Bình 3 Năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '1.833K'],
              rightIndexList: [0.0, 1833.33],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Tỉ Lệ Chi Trả Cổ Tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.261K', '1K'],
              rightIndexList: [-1261.75, 1000.97],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'RSI':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-0', '99.90'],
              rightIndexList: [0, 99.9],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ADX':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100.00'],
              rightIndexList: [0, 100.0],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'CCI':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-666.67', '666.67'],
              rightIndexList: [-666.67, 666.67],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'ROC':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-40.00', '165.67'],
              rightIndexList: [-40.0, 165.67],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'STOCH':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100.00'],
              rightIndexList: [0, 100.0],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Williams':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100.00', '0.00'],
              rightIndexList: [-100.0, 0],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'MFI':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              percent: 0,
              percentList: [],
              textPercent: '',
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0.00', '99.98'],
              rightIndexList: [0.0, 99.98],
              interval: 0,
              intervalList: [],

              finNew: true,
            };
            break;
          case 'Cổ tức (bằng tiền) năm gần nhất':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],

              boolean: 0,
              booleanList: ['có', 'không'],
            };
            break;
          case 'Cổ tức đều đặn trên 3 năm':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: [],

              boolean: 0,
              booleanList: ['có', 'không'],
            };
            break;
          case 'Cổ tức bằng tiền (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '10K'],
              rightIndexList: [0, 10000],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividend_LastYear',
            };
            break;
          case 'Tỷ suất cổ tức':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'DividendYield_LastYear',
            };
            break;
          case 'Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendYield_LastYear_CurrentPrice',
            };
            break;
          // case 'Thu nhập từ cổ tức bình quân 3 năm (%)':
          //   newTieuChiPicked = {
          //     label: state.label,
          //     leftIndexValue: 0,
          //     leftIndexList: [],
          //     compare: 0,
          //     compareList: ['range'],
          //     rightIndexValue: ['0', '3.8K'],
          //     rightIndexList: [0, 3800],
          //     interval: 0,
          //     intervalList: [],
          //     responseKey: 'DividendYield_Avg_3Y',
          //   };
          //   break;

          case 'Thu nhập từ cổ tực dự kiến (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '1K'],
              rightIndexList: [0, 1000],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendYield_ThisYearPlan_CurrentPrice',
            };
            break;
          case 'Tỷ lệ chi trả cổ tức (%)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: [],
              responseKey: 'CashDividendRatio_LastYear',
            };
            break;
          case 'Giá so với đường TB - EMA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá cắt đường TB - EMA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'Giao cắt 2 đường TB - EMA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với đường TB - MA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'Giao cắt 2 đường TB - MA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá cắt đường TB - MA':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: [
                'MA(5)',
                'MA(10)',
                'MA(15)',
                'MA(20)',
                'MA(50)',
                'MA(100)',
                'MA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với Tenkan(9)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['Tenkan(9)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với Kijun(26)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['Kijun(26)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với Cloud(52)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['Cloud(52)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá giao cắt với Tenkan(9)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Tenkan(9)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá giao cắt với Kijun(26)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Kijun(26)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá giao cắt với Cloud(52)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Cloud(52)'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giao cắt thành phần Tenkan và Kijun':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Tenkan', 'Kijun'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: ['Tenkan', 'Kijun'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'MACD cắt với Signal':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['MACD'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Signal'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Trạng thái giá trị của MACD':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['MACD(12,26)', 'MACDSignal(12,26,9)'],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [
                'có giá trị dương (>=0)',
                'có giá trị âm (<0)',
                'vượt giá trị 0',
                'thủng giá trị 0',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Histogram tăng liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 30],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Histogram giảm liên tục':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 30],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị RSI14':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'RSI14_Daily',
            };
            break;
          case 'RSI14 so với các vùng giá trị':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['RSI14'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['70', '60', '40', '30'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'RSI14 và vùng Quá mua/Quá bán':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['RSI14'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Vùng quá mua', 'Vùng quá bán'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá tăng vượt Biên trên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá giảm qua Biên trên':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá giảm thủng Biên dưới':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá tăng qua Biên dưới':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: [],
              interval: 0,
              intervalList: ['Nến 1 ngày', 'Nến 1 tuần'],
            };
            break;
          case 'Giá duy trì vượt ngoài Biên trên Bollinger':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 10],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá duy trì ngoài Biên dưới Bollinger':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['slider', 2, 10],
              rightIndexValue: 2,
              rightIndexList: [],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị MFI(20)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'MFI_Daily',
            };
            break;
          case 'MFI(20) và vùng Quá mua/Quá bán':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['MFI(20)'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Vùng quá mua', 'Vùng quá bán'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Stochastic và vùng Quá mua/Quá bán':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['%K(13,5)', '%D(13,5,5)'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['Vùng quá mua', 'Vùng quá bán'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Stochastic giao cắt nhau':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['StochSlowK'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: ['StochSlowD'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị MCDX (Banker)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'MCDXBanker_Daily',
            };
            break;
          case 'Giá trị MCDX (Hot money)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'MCDXHotMoney_Daily',
            };
            break;
          case 'Biến động MCDX':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Banker', 'Hot money'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 0,
              rightIndexList: [
                '20',
                '25',
                '30',
                '40',
                '50',
                '60',
                '70',
                '75',
                '80',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá trị ADX(14)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'ADX_Daily',
            };
            break;
          case 'Giá trị -DI(14)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'DIN14_Daily',
            };
            break;
          case 'Giá trị +DI(14)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['0', '100'],
              rightIndexList: [0, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'DIP14_Daily',
            };
            break;
          case 'Giao cắt nhóm ADX':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['+DI', '-DI', 'ADX'],
              compare: 0,
              compareList: ['Cắt lên trên', 'Cắt xuống dưới'],
              rightIndexValue: 1,
              rightIndexList: ['+DI', '-DI', 'ADX'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'ADX và ngưỡng giá trị':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['ADX', '+DI', '-DI'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                '20',
                '25',
                '30',
                '35',
                '40',
                '45',
                '50',
                '55',
                '60',
                '65',
                '70',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Giá so với PSar':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: ['PSar'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
          case 'Khoảng cách giá và PSar':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-100', '100'],
              rightIndexList: [-100, 100],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'CloseVsPSARMUTATION_Daily',
            };
            break;
          case 'PSar đảo chiều':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: ['Đảo chiều tăng', 'Đảo chiều giảm'],
              rightIndexValue: 1,
              rightIndexList: ['PSar'],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;

          case 'Doanh thu (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.2T', '615.4T'],
              rightIndexList: [-1200000000000, 615410000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_TTM',
            };
            break;
          case 'Lợi nhuận sau thuế (TTM)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-4.5T', '53.6T'],
              rightIndexList: [-4480000000000, 53600000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_TTM',
            };
            break;
          case 'Doanh thu (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.1T', '395.28T'],
              rightIndexList: [-1080000000000, 395280000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'NetSale_MRY',
            };
            break;
          case 'Lợi nhuận sau thuế (năm gần nhất)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-7.3T', '38.9T'],
              rightIndexList: [-7320000000000, 38860000000000],
              interval: 0,
              intervalList: [],
              responseKey: 'Profit_MRY',
            };
            break;
          case 'Biên lợi nhuận gộp (TTM - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-1.1K', '90.3K'],
              rightIndexList: [-1100, 90300],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_GrossMargin_TTM',
            };
            break;
          case 'Biên lợi nhuận gộp (5 năm - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-300', '900'],
              rightIndexList: [-300, 900],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_GrossMargin_Avg_5Y',
            };
            break;
          case 'Biên lợi nhuận hoạt động (TTM - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-160.9K', '76.5K'],
              rightIndexList: [-160900, 76500],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_OperatingMargin',
            };
            break;
          case 'Biên lợi nhuận hoạt động (5 năm - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-35.1K', '15.2k'],
              rightIndexList: [-35100, 15200],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_OperatingMargin_Avg_5Y',
            };
            break;
          case 'Biên lợi nhuận trước thuế (TTM - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-160.7K', '128.0K'],
              rightIndexList: [-160700, 128000],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_PretaxMargin_TTM',
            };
            break;
          case 'Biên lợi nhuận trước thuế (5 năm - %)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-3.5K', '13.2K'],
              rightIndexList: [-3500, 13200],
              interval: 0,
              intervalList: [],
              responseKey: 'MG_PretaxMargin_Avg_5Y',
            };
            break;
          case 'Tỷ lệ thanh toán nhanh (MRQ)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-7', '379'],
              rightIndexList: [-7, 379],
              interval: 0,
              intervalList: [],
              responseKey: 'FS_QuickRatio',
            };
            break;
          case 'Tổng nợ/Vốn CSH (Total Debt to Equity)':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: ['range'],
              rightIndexValue: ['-49', '116'],
              rightIndexList: [-49, 116],
              interval: 0,
              intervalList: [],
              responseKey: 'FS_DebtOnEquityRatio',
            };
            break;
          case 'Dòng tiền từ hoạt động kinh doanh':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_Operating_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền từ hoạt động đầu tư':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'Eps_TTM',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền từ hoạt động tài chính':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_Financing_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền tổng hợp':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_Total_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền tự do':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_FreeCashFlow_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;
          case 'Dòng tiền từ HĐKD/DT thuần':
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: [],
              compare: 0,
              compareList: [],
              rightIndexValue: 0,
              rightIndexList: ['có giá trị dương', 'có giá trị âm'],
              interval: 0,
              intervalList: [],
              responseKey: 'CF_OperatingNetSalePercent_MRQ_FH',

              month: 0,
              listMonth: [
                'Quý gần nhất',
                'Quý gần nhì',
                '4 Quý gần nhất',
                'Năm gần nhất',
              ],
            };
            break;

          default:
            newTieuChiPicked = {
              label: state.label,
              leftIndexValue: 0,
              leftIndexList: ['Giá'],
              compare: 0,
              compareList: [
                '≥ lớn hơn hoặc bằng',
                '= bằng',

                '≤ nhỏ hơn hoặc bằng',
              ],
              rightIndexValue: 0,
              rightIndexList: [
                'EMA(5)',
                'EMA(10)',
                'EMA(15)',
                'EMA(20)',
                'EMA(50)',
                'EMA(100)',
                'EMA(200)',
              ],
              interval: 0,
              intervalList: ['1 ngày', '1 tuần'],
              responseKey: 'Eps_TTM',
            };
            break;
        }
        const newListTieuChiPicked = [...listTieuChiPicked, newTieuChiPicked];
        setListTieuChiPicked(newListTieuChiPicked);
      }
    };

    // useEffect(() => {
    //   if (
    //     listSaveMyFilter?.length > previousListLength &&
    //     listSaveMyFilter?.length > 6
    //   ) {
    //     scrollToBottom();
    //   }
    //   setPreviousListLength(listSaveMyFilter.length);
    // }, [listSaveMyFilter]);

    useEffect(() => {
      if (valueSearch.trim() === '') {
        setListTieuChi(listTieuChi);
      } else {
        const filteredTieuChi = listTieuChi
          .map((tieuChi) => ({
            ...tieuChi,
            dropdown: tieuChi.dropdown.filter((item) =>
              item.label.toLowerCase().includes(valueSearch.toLowerCase())
            ),
          }))
          .filter((tieuChi) => tieuChi.dropdown.length > 0);

        setListTieuChi(filteredTieuChi);
      }
    }, [valueSearch, listTieuChi]);

    return (
      <div style={{ width: '100%' }}>
        {listTieuChi[0]?.dropdown?.map((item: any, index: any) => {
          // const numberOfPicked1 = [
          //   ...new Map(
          //     listTieuChi[0]?.dropdown?.map((tieuChi: any) => [
          //       tieuChi.label,
          //       tieuChi,
          //     ])
          //   ).values(),
          // ].filter((itemPicked: any) =>
          //   item?.map((item: any) => item.label).includes(itemPicked.label)
          // ).length;

          return (
            <div
              key={index}
              style={{
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'block' }}>
                <div
                  style={{
                    display: 'flex',
                    padding: '12px 16px',

                    alignItems: 'center',
                    backgroundColor: listTieuChiPicked
                      .map((item: any) => item?.label || null)
                      .includes(item.label)
                      ? screenMode === 'dark'
                        ? 'rgba(34, 48, 79, 1)'
                        : '#E0EAFF'
                      : isHover[1] && isHover[0] === item.label
                        ? screenMode === 'dark'
                          ? '#292B32'
                          : '#F1F2F3'
                        : 'transparent',
                    justifyContent: 'space-between',
                    position: 'relative',
                    borderTop:
                      screenMode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid rgba(213, 215, 220, 1)',
                  }}
                  onMouseEnter={() => {
                    setIsHover([item.label, true]);
                  }}
                  onMouseLeave={() => {
                    setIsHover([item.label, false]);
                  }}
                  onClick={() => handlePick(item)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMyFilter(item);
                      }}
                    >
                      {listMyFilter?.some(
                        (el: any) => el.label === item.label
                      ) ? (
                        <Tooltip
                          placement="top"
                          title={'Xoá Khỏi Bộ Lọc Của Tôi'}
                          arrow={true}
                          color="#3594EF"
                        >
                          <svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10Z"
                              fill="#E8D632"
                            />
                          </svg>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          title={'Thêm Vào Bộ Lọc Của Tôi'}
                          arrow={true}
                          color="#3594EF"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99968 2.74977e-10C10.195 -6.45689e-06 10.3724 0.113711 10.454 0.29117L13.0567 5.95322L19.2255 6.6878C19.419 6.71085 19.5815 6.8442 19.6418 7.02949C19.7021 7.21478 19.6493 7.41824 19.5065 7.55079L14.9446 11.7843L16.1556 17.902C16.1935 18.0935 16.1166 18.2894 15.9586 18.404C15.8006 18.5185 15.5904 18.5306 15.4202 18.435L9.99973 15.3901L4.5792 18.4359C4.40907 18.5315 4.19886 18.5194 4.04085 18.4049C3.88284 18.2903 3.80589 18.0943 3.84378 17.9029L5.05482 11.7851L0.492835 7.54985C0.35004 7.41728 0.297263 7.21383 0.357609 7.02856C0.417955 6.8433 0.580429 6.70996 0.77391 6.68692L6.94357 5.95233L9.54538 0.2912C9.62694 0.113735 9.80437 6.45744e-06 9.99968 2.74977e-10ZM9.99973 1.69723L7.7352 6.6245C7.66252 6.78265 7.51283 6.89162 7.34 6.9122L1.96509 7.55216L5.93967 11.2421C6.06676 11.3601 6.12364 11.5355 6.08996 11.7056L5.0355 17.0324L9.75476 14.3807C9.90685 14.2952 10.0925 14.2952 10.2446 14.3807L14.9639 17.0317L13.9094 11.7048C13.8757 11.5346 13.9326 11.3592 14.0598 11.2412L18.034 7.55299L12.6603 6.91307C12.4874 6.8925 12.3378 6.78354 12.2651 6.62541L9.99973 1.69723Z"
                              fill={
                                screenMode === 'dark' ? '#ABADBA' : '#747B8B'
                              }
                            />
                          </svg>
                        </Tooltip>
                      )}
                    </div>
                    <div
                      className="item-drop"
                      style={{
                        // color: listTieuChiPicked
                        //   .map((item: any) => item?.label || null)
                        //   .includes(item.label)
                        //   ? '#42a732'
                        //   : isHover[1] && isHover[0] === item.label
                        //     ? '#42a732'
                        //     : screenMode === 'light'
                        //       ? '#2E3138'
                        //       : 'rgba(255, 255, 255)',

                        fontSize: '13px',
                        fontWeight: '400',
                        height: '20px',
                        // width: '307px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                  {listTieuChiPicked
                    .map((item: any) => item?.label || null)
                    .includes(item.label) ? (
                    <div
                      onMouseEnter={() => {
                        setIsHoverDelete([item.label, true]);
                      }}
                      onMouseLeave={() => {
                        setIsHoverDelete([item.label, false]);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      style={{
                        color:
                          isHover[1] && isHover[0] === item.label
                            ? isHoverDelete[1] &&
                              isHoverDelete[0] === item.label
                              ? '#42a732'
                              : screenMode === 'light'
                                ? '#2E3138'
                                : 'rgba(255, 255, 255, 0.5)'
                            : '#42a732',
                        fontSize: '14px',
                        fontWeight: '400',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {isHover[1] && isHover[0] === item.label ? (
                        <img
                          className={'iconoutlinedsuggestedcheck41'}
                          alt=""
                          src={deleteFil}
                        />
                      ) : (
                        <img
                          className={'iconoutlinedsuggestedcheck40'}
                          alt=""
                          src={checkIcon}
                        />
                      )}
                    </div>
                  ) : item.isMultiple ? (
                    <div
                      style={{
                        color: '#42a732',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
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
                          d="M8.00065 1.33301L14.6673 5.31138L8.00065 9.28975L1.33398 5.31138L8.00065 1.33301ZM3.85567 5.31138L8.00065 7.78492L12.1456 5.31138L8.00065 2.83784L3.85567 5.31138Z"
                          fill={
                            listTieuChiPicked
                              .map((item: any) => item?.label || null)
                              .includes(item.label)
                              ? '#42a732'
                              : isHover[1] && isHover[0] === item.label
                                ? '#42a732'
                                : screenMode === 'light'
                                  ? '#2E3138'
                                  : 'rgba(255, 255, 255)'
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.37233 7.11448L8.00065 10.4732L13.629 7.11448L14.2965 8.22097L8.00065 11.978L1.70482 8.22097L2.37233 7.11448Z"
                          fill={
                            listTieuChiPicked
                              .map((item: any) => item?.label || null)
                              .includes(item.label)
                              ? '#42a732'
                              : isHover[1] && isHover[0] === item.label
                                ? '#42a732'
                                : screenMode === 'light'
                                  ? '#2E3138'
                                  : 'rgba(255, 255, 255)'
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.37233 9.80278L8.00065 13.1615L13.629 9.80278L14.2965 10.9093L8.00065 14.6663L1.70482 10.9093L2.37233 9.80278Z"
                          fill={
                            listTieuChiPicked
                              .map((item: any) => item?.label || null)
                              .includes(item.label)
                              ? '#42a732'
                              : isHover[1] && isHover[0] === item.label
                                ? '#42a732'
                                : screenMode === 'light'
                                  ? '#2E3138'
                                  : 'rgba(255, 255, 255)'
                          }
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <StyledModalFilter
      screen_mode={screenMode}
      show={isModalVisible}
      onClick={closeModal}
    >
      <div className={'frameParent849'} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <div className="title-modal">
            {selectedValue === 'nhomThongDung'
              ? 'Lọc phổ biến'
              : selectedValue === 'coban'
                ? 'Lọc cơ bản'
                : selectedValue === 'bienDongGia'
                  ? 'Lọc biến động'
                  : selectedValue === 'nhomChiBaoKyThuat'
                    ? 'Lọc kỹ thuật'
                    : 'Bộ lọc của tôi'}
          </div>
          <div
            className="close"
            style={{ cursor: 'pointer' }}
            onClick={closeModal}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.281 14.2198C15.3507 14.2895 15.406 14.3722 15.4437 14.4632C15.4814 14.5543 15.5008 14.6519 15.5008 14.7504C15.5008 14.849 15.4814 14.9465 15.4437 15.0376C15.406 15.1286 15.3507 15.2114 15.281 15.281C15.2114 15.3507 15.1286 15.406 15.0376 15.4437C14.9465 15.4814 14.849 15.5008 14.7504 15.5008C14.6519 15.5008 14.5543 15.4814 14.4632 15.4437C14.3722 15.406 14.2895 15.3507 14.2198 15.281L8.00042 9.06073L1.78104 15.281C1.64031 15.4218 1.44944 15.5008 1.25042 15.5008C1.05139 15.5008 0.860523 15.4218 0.719792 15.281C0.579062 15.1403 0.5 14.9494 0.5 14.7504C0.5 14.5514 0.579062 14.3605 0.719792 14.2198L6.9401 8.00042L0.719792 1.78104C0.579062 1.64031 0.5 1.44944 0.5 1.25042C0.5 1.05139 0.579062 0.860523 0.719792 0.719792C0.860523 0.579062 1.05139 0.5 1.25042 0.5C1.44944 0.5 1.64031 0.579062 1.78104 0.719792L8.00042 6.9401L14.2198 0.719792C14.3605 0.579062 14.5514 0.5 14.7504 0.5C14.9494 0.5 15.1403 0.579062 15.281 0.719792C15.4218 0.860523 15.5008 1.05139 15.5008 1.25042C15.5008 1.44944 15.4218 1.64031 15.281 1.78104L9.06073 8.00042L15.281 14.2198Z"
                fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            background: screenMode === 'dark' ? '#33343C' : '#fff',
          }}
          className={'frameParent850'}
        >
          <div className={'wrapper8'}>
            {/* <div className="trang-ch15">Nhập tiêu chí...</div> */}
            <input
              value={valueSearch}
              style={{
                border: 'none',
                width: '100%',
                outline: 'none',
                backgroundColor: screenMode === 'dark' ? 'transparent' : '#fff',
                boxShadow: 'none',
                fontSize: '14px',
                color: screenMode === 'dark' ? '#fff' : 'rgba(46, 49, 56, 1)',
                paddingLeft: '5px',
              }}
              className={'searchInput'}
              placeholder="Tìm kiếm tiêu chí..."
              onChange={(e) => setValueSearch(e.target.value)}
            />
          </div>
          <img
            className={'vuesaxlinearsearch'}
            alt=""
            src={screenMode === 'dark' ? searchTarget : searchTargetDark}
          />
        </div>
        <div className="noti">Vui lòng lựa chọn tiêu chí mà bạn muốn lọc</div>
        <div
          style={{
            height: '240px',
            msOverflowStyle: 'none',
            // scrollbarWidth: 'none',
            overflowY: 'scroll',
            width: '100%',
            paddingRight: '5px',
          }}
          className={'frameParent851'}
        >
          {selectedValue === 'nhomThongDung' && (
            <NhomThongDung
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )}
          {selectedValue === 'coban' && (
            <NhomCoBan
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )}
          {/* {selectedChild === 'nhomTangTruong' && (
            <NhomTangTruong
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )}
          {selectedChild === 'nhomTiSuatTaiChinh' && (
            <NhomTySuatTaiChinh
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )} */}
          {selectedValue === 'bienDongGia' && (
            <BienDongGia
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )}

          {selectedValue === 'nhomChiBaoKyThuat' && (
            <NhomChiBaoKyThuat
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )}
          {/* {selectedChild === 'nhomCoTuc' && (
            <NhomCoTuc
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )} */}
          {selectedValue === 'bolocCuaToi' && (
            <MyFilter
              handleMyFilter={handleMyFilter}
              listMyFilter={listMyFilter}
              valueSearch={valueSearch}
              setListSearch={setListSearch}
              listSearch={listSearch}
              listOpenTieuChi={listOpenTieuChi}
              setListOpenTieuChi={setListOpenTieuChi}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
            />
          )}
        </div>
      </div>
    </StyledModalFilter>
  );
};
