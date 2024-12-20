/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyledInfoCompany } from './styled';
import { config } from '@/config/env';
import { convertDate } from '@/components/ConvertDate';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import api from '@/config/api';
import dayjs from 'dayjs';
import axios from 'axios';
import { formatToBillion } from '@/components/ConvertNumber';
import icon_el from '@assets/icons/icon-elli.svg';

export const InfoCompany = ({ company }) => {
  const [socketData, setSocketData] = useState<any>({});

  const [dataClosedSession, setDataClosedSession] = useState<any>([]);
  const [openStock, setOpenStock] = useState<boolean>(false);
  const screenMode = useSelector(screenModeSelector);
  const [businessPlan, setBusinessPlan] = useState<any>();
  const [generalIndex, setGeneralIndex] = useState<any>([]);

  useEffect(() => {
    Promise.all([
      // TIN TỨC VÀ SỰ KIỆN
      api.get(`/news?symbol=${company}`),
      // BÁO CÁO
      api.get(`/reports?symbol=${company}`),
      // CÔNG TY CON
      api.get(`/leadership?symbol=${company}&language=vn&page=1&pageSize=100`),
      // BAN LÃNH ĐẠO
      api.get(`/sub-companies?symbol=${company}&language=vn`),
      // CHỈ SỐ CHUNG CÔNG TY
      api.get(`/company-statistic?symbol=${company}&language=vn`),
      // KẾ HOẠCH KINH DOANH
      api.get(`/financial_analysis?symbol=${company}`),
      // THÔNG TIN CƠ BẢN VỀ CÔNG TY
      api.get(`/company-info?symbol=${company}`),
      // DANH SÁCH TẤT CẢ CÁC CÔNG TY
      api.get(`/list-company`),
      // BIỂU ĐỒ TÀI CHÍNH
      api.get(`/report-chart?symbol=${company}`),
      // CƠ CẤU CỔ ĐÔNG
      api.get(`/co-dong?symbol=${company}`),

      // API MÀN TÀI CHÍNH
      // axios.get(
      //   `https://fiin-fundamental.ssi.com.vn/FinancialAnalysis/GetFinancialRatioV2?language=vi&Type=Company&OrganCode=${company}&${resultArray.join(
      //     '&'
      //   )}`
      // ),
      api.get(`/financial-ratio?symbol=${company}&type=quater`),
      api.get(`/financial-ratio?symbol=${company}&type=year`),
      // axios.get(
      //   `https://fiin-fundamental.ssi.com.vn/FinancialAnalysis/GetFinancialRatioV2?language=vi&Type=Company&OrganCode=${company}&${resultArraySince.join(
      //     '&'
      //   )}`
      // ),
      api.get(`/bao_cao_phan_tich?symbol=${company}`),
    ])
      .then(
        ([
          resNewsData,
          resDownloadReport,
          resLeadership,
          resSubCompany,
          resGeneralIndex,
          resBusinessPlan,
          resCompanyData,
          resListCompany,
          resFinancialChart,
          resShareholderStructure,
          resFinancialTable,
          resSinceTable,
          resAnalysisReport,
        ]) => {
          setGeneralIndex(resGeneralIndex?.data?.data);
          setBusinessPlan(resBusinessPlan?.data?.data[0]);

          setNewsData(resNewsData?.data?.data);
          setDownloadReport(resDownloadReport?.data?.data);
          setLeadership(resLeadership?.data?.data);
          setAllCompanySub(resSubCompany?.data?.data);

          setChartNew(resFinancialTable?.data.items);
          setcompanyData(resCompanyData?.data?.data[0]);
          setChartSinceNew(resSinceTable.data.items);
          setListCompany(resListCompany?.data?.data);
          setFinancialChart(resFinancialChart?.data?.data?.quarter);
          setFinancialChartYear(resFinancialChart?.data?.data?.year);
          setCheckDataResponse(resFinancialChart?.data?.data?.superSector);
          setFinancialTable(resFinancialTable?.data?.items);
          setShareholderStructure(resShareholderStructure?.data.listCoDong);
          setIsExpanded(false);
          setListAnalysisReport(resAnalysisReport?.data?.data);
        }
      )
      .catch((error) => {})
      .finally(() => {
        // // Chỉ số chung công ty
        // axios
        //   .get(
        //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=${current}&pageSize=${pageSize}&fromDate=${dayStart}&toDate=${dayEnd}`
        //   )
        //   .then((res) => {
        //     setDataStatistic(res?.data?.data);
        //     setCurrent(res?.data?.paging?.page);
        //     setPageSize(res?.data?.paging?.pageSize);
        //     setTotal(res?.data?.paging?.total);
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching data: ', error);
        //   });
      });
  }, [company]);
  const newArray_02 = [
    'ryd21',
    'ryd25',
    'ryd26',
    'ryd14',
    'ryq14',
    'ryq12',
  ].map((key) => {
    const value = businessPlan && businessPlan[key];
    if (isNaN(value)) {
      return value;
    } else {
      let result = Number(Number(value)?.toFixed(2)).toLocaleString();
      if (['ryq14', 'ryq12'].includes(key)) {
        result += '%';
      }
      return result;
    }
  });
  const newArray_01 = [
    'symbol',
    'marketCap',
    'sharesOutstanding',
    'totalRevenue',
    'profit',
    'asset',
  ].map((key) => {
    const value = generalIndex && generalIndex[key];

    if (['marketCap', 'totalRevenue', 'profit', 'asset'].includes(key)) {
      return isNaN(value) ? value : formatToBillion(value);
    }
    return isNaN(value)
      ? value
      : parseInt(String(value)).toLocaleString('de-DE');
  });

  const newArray_03 = ['rev', 'ryq27', 'ryq29', 'ryq25', 'ryq71'].map((key) => {
    const value = businessPlan && businessPlan[key];
    if (isNaN(value)) {
      return value;
    } else {
      if (['rev'].includes(key)) {
        return isNaN(value) ? value : formatToBillion(value);
      }
      let result = Number(Number(value)?.toFixed(2)).toLocaleString();
      if (['ryq27', 'ryq29', 'ryq25'].includes(key)) {
        result += '%';
      }

      return result;
    }
  });
  const FIRST_TABLE = [
    {
      label: 'Mã CP',
    },
    {
      label: 'Vốn hoá',
    },
    {
      label: 'Số lượng cổ phiếu lưu hành',
    },
    {
      label: 'Tổng doanh thu',
    },
    {
      label: 'Lợi nhuận',
    },
    {
      label: 'Tài sản',
    },
  ].map((item, index) => ({
    ...item,
    value: newArray_01[index],
  }));

  const SECOND_TABLE = [
    {
      label: 'P/E (TTM)',
    },
    {
      label: 'P/B (TTM)',
    },
    {
      label: 'P/S (TTM)',
    },
    {
      label: 'EPS (TTM)',
    },
    {
      label: 'ROA (%)',
    },
    {
      label: 'ROE (%)',
    },
  ].map((item, index) => ({
    ...item,
    value: newArray_02[index],
  }));

  const THIRD_TABLE = [
    {
      label: 'Doanh thu',
    },
    {
      label: 'Biên EBIT (%)',
    },
    {
      label: 'Lợi nhuận ròng (%)',
    },
    {
      label: 'Lợi nhuận gộp (%)',
    },
    {
      label: 'Đòn bẩy tài chính',
    },
  ].map((item, index) => ({
    ...item,
    value: newArray_03[index],
  }));
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      const openTime = '09:15:00';
      const closeTime = '14:30:00';
      const middleBreakTime = '11:30:00';
      const middleBreakTimeEnd = '13:00:00';
      // if (now >= openTime && now <= closeTime) {
      //   setOpenStock(true);
      // } else {
      //   setOpenStock(false);
      // }
      if (now >= openTime && now <= middleBreakTime) {
        setOpenStock(true);
      } else if (now >= middleBreakTimeEnd && now <= closeTime) {
        setOpenStock(true);
      } else {
        setOpenStock(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (openStock === false) {
      const dayClosedSession = new Date().toLocaleDateString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      const formattedDate = dayjs(dayClosedSession).format('DD/MM/YYYY');
      const encodedDate = encodeURIComponent(formattedDate);
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=1&pageSize=20&fromDate=${dayStart}&toDate=${dayEnd}`
      //   )
      //   .then((res) => {
      //     setDataClosedSession(res?.data?.data[0]);
      //   })
      //   .catch((err) => {
      //   });
      const date = new Date();
      const dateMin = moment(date).subtract(5, 'days').format('DD/MM/YYYY');
      axios
        .get(
          `${
            config.app.VITE_APP_API_URL
          }/DailyStockPrice?symbol=${company}&fromDate=${dateMin}&toDate=${convertDate(
            date
          )}`
          // `${
          //   config.app.VITE_APP_API_URL
          // }/DailyStockPrice?symbol=${company}&fromDate=${convertDateMin(
          //   date
          // )}&toDate=${convertDate(date)}`
        )
        .then((res) => {
          const dataCloseSession = res?.data?.data.pop();
          setDataClosedSession(dataCloseSession);
        })
        .catch((err) => {});
    }
  }, [company, openStock]);
  useEffect(() => {
    const ws = new WebSocket(config.socket.VITE_REACT_APP_SOCKET_IO);
    // const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'SUBSCRIBE', symbol: `${company}` }));
    };
    ws.addEventListener('message', (receivedData) => {
      const receicedData = JSON.parse(receivedData?.data);
      if (!!receicedData) setSocketData(receicedData);
    });
  }, [company]);
  const isGreen = dataClosedSession?.PriceChange >= 0;

  return (
    <StyledInfoCompany screen_mode={screenMode}>
      <div className="box-stock">
        <div className="number-stock">
          <div className="stock-price">
            <div className="stock-price-children">
              {openStock === true && !!socketData ? (
                <div className="infomation">
                  <span>{socketData?.LastPrice?.toLocaleString('de-DE')}</span>
                  {/* <span>{socketData?.Change}</span> */}
                  <span></span>
                  <span>
                    {socketData?.Change}/{socketData?.RatioChange}%
                  </span>
                </div>
              ) : (
                <div className="infomation">
                  <span
                    style={{
                      color: isGreen
                        ? 'rgba(92, 214, 128, 1)'
                        : 'rgba(209, 84, 73, 1)',
                      padding: 0,
                    }}
                  >
                    {parseFloat(dataClosedSession?.ClosePrice)?.toLocaleString(
                      'de-DE'
                    )}
                  </span>
                  {/* <span style={{ color: isGreen ? '#42A732' : '#E43637' }}>
                      {dataClosedSession?.PriceChange}
                    </span> */}
                  <span></span>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: isGreen
                        ? 'rgba(92, 214, 128, 1)'
                        : 'rgba(89, 43, 38, 1)',
                      marginRight: '0px',
                    }}
                  >
                    {dataClosedSession?.PriceChange}/{isGreen && '+'}
                    {parseFloat(
                      dataClosedSession?.PerPriceChange
                    ).toLocaleString('de-DE')}
                    %
                  </span>
                </div>
              )}
            </div>
            <div className="market">
              {openStock === true ? (
                <span>TT MỞ CỬA</span>
              ) : (
                <span>TT ĐÓNG CỬA</span>
              )}
            </div>
          </div>
          {openStock === true ? (
            <div className="limit-price">
              <div className="lowest-price">
                <span>Giá thấp nhất:</span>
                <span>{socketData?.Low?.toLocaleString('de-DE')}</span>
              </div>
              <div className="highest-price">
                <span>Giá cao nhất:</span>
                <span>{socketData?.High?.toLocaleString('de-DE')}</span>
              </div>
            </div>
          ) : (
            <div className="limit-price">
              <div className="lowest-price">
                <span>Giá thấp nhất:</span>
                <span>
                  {parseFloat(dataClosedSession?.LowestPrice)?.toLocaleString(
                    'de-DE'
                  )}
                </span>
              </div>
              <div className="highest-price">
                <span>Giá cao nhất:</span>
                <span>
                  {parseFloat(dataClosedSession?.HighestPrice)?.toLocaleString(
                    'de-DE'
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="financial-report">
          <div className="vic-table">
            <div
              style={{
                marginLeft: '4px',
              }}
            >
              Tổng quan
            </div>
            <table>
              <tbody>
                {FIRST_TABLE.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <svg
                          width="4"
                          height="4"
                          viewBox="0 0 4 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="2"
                            cy="2"
                            r="2"
                            fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                          />
                        </svg>{' '}
                        {item.label}
                      </td>
                      <td>{item?.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="vic-table">
            <div
              style={{
                marginLeft: '4px',
              }}
            >
              Tài chính
            </div>
            <table>
              <tbody>
                {SECOND_TABLE.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {' '}
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                        />
                      </svg>
                      {item.label}
                    </td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="vic-table">
            <div
              style={{
                marginLeft: '4px',
              }}
            >
              KQ Kinh doanh 2023
            </div>
            <table>
              <tbody>
                {THIRD_TABLE.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {' '}
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                        />
                      </svg>
                      {item.label}
                    </td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StyledInfoCompany>
  );
};
