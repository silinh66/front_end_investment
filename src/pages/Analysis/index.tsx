/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  Empty,
  Flex,
  Row,
  Select,
  Tabs,
  TabsProps,
  Tooltip,
} from 'antd';
import { StyledAnalysis } from './styled';

import icons from 'src/constants/icons';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import moment from 'moment/moment';

import {
  ANALYSIS_REPORT,
  DATA_TABS_CHART_GENERAL,
  CHILDREN_COMPANY_COLUMN,
  CHILDREN_SHAREHOLDER_COLUMN,
  TRANSACTION_TABS,
  ASSOCIATED_COMPANY_COLUMN,
} from '@/constants/common';
import { DatePicker } from 'antd';
import CustomChart from '@/components/CustomChart';
import useAnalysis, { Props, ReceivedProps } from './hook';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { formatToBillion } from '@/components/ConvertNumber';
import { DownOutlined } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;

const AnalysisLayout: FC<Props> = ({
  screenMode,
  shareholderStructure,
  changeProfitMargin,
  changeKetQuaKinhDoanh3,
  chiPhiDuPhong,
  shortFinancialAssetChange,
  newsData,
  downloadReport,
  cashFlowChange,
  leadership,
  newSubCompany,
  debtRatioChange,
  FIRST_TABLE,
  DATA_SHORT_FINANCIAL_ASSET_CHART,
  handleSelectShortFinancialAssets,
  profitAfterTaxChangeEnterprise,
  SECOND_TABLE,
  listAnalysisReport,
  THIRD_TABLE,
  companyData,
  VALUATIONPB,
  DATA_INSURANCE_CHART,
  handleSelectInsurance,
  valuationChange,
  VALUATIONEV,
  DATA_RISK_PROVISION_COSTS_BANK_CHART,
  DATA_PROFIT_AFTER_TAX_ENTERPRISE_CHART,
  handleSelectProfitAfterTaxEnterprise,
  newAssociatedCompany,
  profitInsurance,
  valuationPBChange,
  changeValuationEV,
  capitalChange,
  capitalFinancialChange,
  capitalBankChange,
  capitalInsuranceChange,
  profitAfterTaxBankChange,
  changeKetQuaKinhDoanh2,
  profitAfterTaxChange,
  dataStatistic_01,
  dataStatistic_02,
  assetChange,
  financialAssetChange,
  bankAssetChange,
  insuranceAssetChange,
  dataStatistic_03,
  netReveNueChange,
  changeKetQuaKinhDoanh1,
  incomeChange,
  current,
  pageSize,
  total,
  company,
  COMPANY_DATA,
  LISTING_INFORMATION,
  newListCompany,
  textToShow,
  isExpanded,
  DATA_ASSET_CHART,
  DATA_CAPITAL_CHART,
  DATA_CASH_FLOW_CHART,
  DATA_NET_REVENUE_CHART,
  DATA_SSI_CHART,
  DATA_PROFIT_BEFORE_TAX_CHART,
  DATA_PROFIT_AFTER_TAX_CHART,
  DATA_CAPITAL_INSURANCE_CHART,
  DATA_INCOME_CHART,
  handleSelectIncome,
  valueTab,
  transaction,
  openStock,
  socketData,
  dataClosedSession,
  DATA_FINANCIAL_TABLE,
  formatDataFinancialTable,
  organizedData,
  sortFinancial,
  firstFinancialColumn,
  secondFinancialColumn,
  thirdFinancialColumn,
  fourthFinancialColumn,
  fifthFinancialColumn,
  companyAsset,
  checkDataResponse,
  DATA_INSURANCE_ASSET_CHART,
  PROFIT_MARGIN,
  EQUITY_DEBT,
  handleSelectKetQuaKinhDoanh3,
  CHI_PHI_HOAT_DONG_SSI_CHART,
  VALUATION,
  DATA_BANK_ASSET_CHART,
  DATA_FINANCIAL_ASSET_CHART,
  DATA_CAPITAL_BANK_CHART,
  DATA_CAPITAL_FINANCIAL_CHART,
  setSecondFinancialColumn,
  setFifthFinancialColumn,
  handleSelectRatioChange,
  setFourthFinancialColumn,
  setThirdFinancialColumn,
  setSortFinancial,
  handleSelectvaluationPBChange,
  handleChangeSelectValuationEVChange,
  setFirstFinancialColumn,
  handleDateStart,
  handleDateEnd,
  handleTableChange,
  handleSearchStatistic,
  handleSelectCompany,
  setIsExpanded,
  handleSelectAssetChange,
  handleChangeSelectMarginChange,
  handleSelectCapitalChange,
  handleSelectCashFlowChange,

  handleSelectNetRevenue,
  handleSelectKetQuaKinhDoanh1,
  handleSelectKetQuaKinhDoanh2,
  KET_QUA_KINH_DOANH_SSI_CHART,
  handleSelectProfitBeforeTax,
  handleSelectProfitAfterTax,
  handleAnalysisChange,
  handleSelectValuationChange,
  handleChangeTransaction,
  handleInsuranceAssetChange,
  handleBankAssetChange,
  handleFinancialAssetChange,
  handleCapitalInsuranceChange,
  handleCapitalBankChange,
  handleCapitalFinancialChange,
  DATA_PROFIT_AFTER_TAX_BANK_CHART,
  handleSelectProfitAfterBankTax,
  handleSelectChiPhiDuPhong,
}) => {
  function extractYear(filename) {
    // Biểu thức chính quy để tìm 4 chữ số liên tiếp
    const regex = /\b\d{4}\b/;
    // Tìm kiếm và trả về kết quả
    const match = filename.match(regex);
    return match ? match[0] : null;
  }
  const chartRef = useRef(null);

  // Hàm để kiểm tra và cập nhật layout của legend
  const checkLegendLayout = () => {
    if (chartRef.current && chartRef.current.chart) {
      const isSmallScreen = window.innerWidth > 1600;
      chartRef.current.chart.update({
        legend: {
          layout: isSmallScreen ? 'horizontal' : 'vertical',
          align: isSmallScreen ? 'right' : 'center',
          verticalAlign: isSmallScreen ? 'middle' : 'bottom',
          maxHeight: !isSmallScreen && 65,
          maxWidth: !isSmallScreen && 500,
          x: isSmallScreen ? -25 : 0,
        },
      });
    }
  };
  const downloadReportMap = downloadReport?.map((item, index) => {
    return {
      ...item,
      // title: item?.title?.slice(17),
      yearReport: extractYear(item?.title?.slice(17)),
    };
  });
  const oneDayDataChart = [
    64.01, 14.08, 44.6, 54.3, 94.4, 34.5, 64.01, 14.08, 44.6, 54.3, 94.4, 34.5,
    64.01, 14.08, 44.6, 54.3, 94.4, 34.5, 64.01, 14.08, 44.6, 54.3, 94.4, 34.5,
    64.01, 14.08, 44.6, 54.3, 94.4, 34.5, 64.01, 14.08, 44.6, 54.3, 94.4,
  ];

  // Hàm cuộn legend cho biểu đồ cụ thể

  const oneWeekDataChart = [61.01, 59.08, 72.21, 41.23, 64.4, 54.5];
  const oneMonthDataChart = [14.01, 54.08, 64.6, 84.3, 24.4, 44.5];
  const sixMonthDataChatr = [61.01, 59.08, 72.21, 41.23, 64.4, 54.5];
  const oneYearDataChart = [64.01, 64.08, 65.6, 66.3, 64.4, 67.5];

  const [companyDataChartGeneral, setCompanyDataChartGeneral] =
    useState(oneDayDataChart);
  const [worldDataChartGeneral, setWorldDataChartGeneral] =
    useState(oneDayDataChart);

  const companyMinNumberChart = Math.floor(
    Math.min(...companyDataChartGeneral)
  );
  const companyMaxNumberChart = Math.ceil(Math.max(...companyDataChartGeneral));
  const companyNumberRange = companyMaxNumberChart - companyMinNumberChart;
  const companyInterval = 10;
  const companySplitNumber = Math.ceil(companyNumberRange / companyInterval);

  const worldMinNumberChart = Math.floor(Math.min(...worldDataChartGeneral));
  const worldMaxNumberChart = Math.ceil(Math.max(...worldDataChartGeneral));
  const worldNumberRange = worldMaxNumberChart - worldMinNumberChart;
  const worldInterval = 10;
  const worldSplitNumber = Math.ceil(worldNumberRange / worldInterval);

  const handlecompanyDataChartGeneral = useCallback(
    (typeTab: string) => {
      const dataChartMap: { [key: string]: number[] } = {
        one_day: oneDayDataChart,
        one_week: oneWeekDataChart,
        one_month: oneMonthDataChart,
        six_month: sixMonthDataChatr,
        one_year: oneYearDataChart,
      };
      return setCompanyDataChartGeneral(dataChartMap[typeTab]);
    },
    [
      oneDayDataChart,
      oneMonthDataChart,
      oneWeekDataChart,
      oneYearDataChart,
      sixMonthDataChatr,
    ]
  );

  const handleWorldDataChartGeneral = useCallback(
    (typeTab: string) => {
      const dataChartMap: { [key: string]: number[] } = {
        one_day: oneDayDataChart,
        one_week: oneWeekDataChart,
        one_month: oneMonthDataChart,
        six_month: sixMonthDataChatr,
        one_year: oneYearDataChart,
      };
      return setWorldDataChartGeneral(dataChartMap[typeTab]);
    },
    [
      oneDayDataChart,
      oneMonthDataChart,
      oneWeekDataChart,
      oneYearDataChart,
      sixMonthDataChatr,
    ]
  );

  const company_data_chart = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: [
        '09:00',
        '09:10',
        '09:20',
        '09:30',
        '09:40',
        '09:50',
        '10:00',
        '10:10',
        '10:20',
        '10:30',
        '10:40',
        '10:50',
        '11:00',
        '11:10',
        '11:20',
        '11:30',
        '11:40',
        '11:50',
        '13:00',
        '13:10',
        '13:20',
        '13:30',
        '13:40',
        '13:50',
        '14:00',
        '14:10',
        '14:20',
        '14:30',
        '14:40',
        '14:50',
        '15:00',
      ],
      axisLabel: {
        formatter: function (value: string) {
          if (
            ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].includes(
              value
            )
          ) {
            return value;
          } else {
            return '';
          }
        },
        color:
          screenMode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(2, 2, 2, 0.50)',
      },
      axisTick: false,
      axisLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#3A3F42' : '#FFFFFF',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: companySplitNumber,
      interval: companyInterval,
      min: companyMinNumberChart,
      max: companyMaxNumberChart,
      axisLabel: {
        formatter: function (value: number) {
          return value.toFixed(2);
        },
      },
      splitLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#3A3F42' : '#FFFFFF',
        },
      },
    },
    series: [
      {
        data: companyDataChartGeneral.map((num: number) =>
          Number(num.toFixed(2))
        ),
        type: 'line',
        showSymbol: false,
        lineStyle: {
          color: '#42A732',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(66, 167, 50, 0.60)' },
            { offset: 1, color: 'rgba(30, 72, 23, 0.00)' },
          ]),
        },
      },
    ],
  };

  const world_data_chart = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: [
        '09:00',
        '09:10',
        '09:20',
        '09:30',
        '09:40',
        '09:50',
        '10:00',
        '10:10',
        '10:20',
        '10:30',
        '10:40',
        '10:50',
        '11:00',
        '11:10',
        '11:20',
        '11:30',
        '11:40',
        '11:50',
        '13:00',
        '13:10',
        '13:20',
        '13:30',
        '13:40',
        '13:50',
        '14:00',
        '14:10',
        '14:20',
        '14:30',
        '14:40',
        '14:50',
        '15:00',
      ],
      axisLabel: {
        formatter: function (value: string) {
          if (
            ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].includes(
              value
            )
          ) {
            return value;
          } else {
            return '';
          }
        },
        color:
          screenMode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(2, 2, 2, 0.50)',
      },
      axisTick: false,
      axisLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#3A3F42' : '#FFFFFF',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: worldSplitNumber,
      interval: worldInterval,
      min: worldMinNumberChart,
      max: worldMaxNumberChart,
      axisLabel: {
        formatter: function (value: number) {
          return value.toFixed(2);
        },
      },
      splitLine: {
        lineStyle: {
          color: screenMode === 'dark' ? '#3A3F42' : '#FFFFFF',
        },
      },
    },
    series: [
      {
        data: worldDataChartGeneral.map((num: number) =>
          Number(num.toFixed(2))
        ),
        type: 'line',
        showSymbol: false,
        lineStyle: {
          color: '#42A732',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(66, 167, 50, 0.60)' },
            { offset: 1, color: 'rgba(30, 72, 23, 0.00)' },
          ]),
        },
      },
    ],
  };
  const dataChartCoDong = shareholderStructure.slice(0, 6);
  let totalOwnership = 0;
  const convert = dataChartCoDong.map((item) => {
    const total = item.ownership * 100;
    totalOwnership += total;

    return {
      name: item.name,
      y: item.ownership * 100,
    };
  });
  if (totalOwnership < 100) {
    convert.push({
      name: 'Khác',
      y: 100 - totalOwnership,
    });
  }
  const config = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      width: null,
      height: 254,
      marginTop: 10,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
      align: 'center',
      verticalAlign: 'middle',
      floating: true,
      y: -50,
      style: {
        color: screenMode === 'dark' ? '#fff' : 'black',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      formatter: function () {
        return (
          '<span style="color:' +
          this.point.color +
          '">\u25CF</span> <b> ' +
          this.point.name +
          '</b><br/>' +
          'Tỷ lệ: <b>' +
          this.point.y.toFixed(2) +
          '%</b><br/>'
        );
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'horizontal',
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : 'black',
        fontWeight: 'normal',
        fontSize: 13,
      },
      x: -25,
    },
    series: [
      {
        innerSize: '60%',
        zMin: 0,
        name: 'countries',
        data: convert,
        colors: [
          'rgba(75, 155, 99, 1)',
          'rgba(209, 84, 73, 1)',
          'rgba(209, 155, 73, 1)',
          'rgba(64, 129, 150, 1)',
          'rgba(148, 78, 177, 1)',
          'rgba(44, 62, 80, 1)',
          'rgba(99, 103, 105, 1)',
        ],
      },
    ],
  };
  useEffect(() => {
    // Gọi hàm kiểm tra lần đầu
    checkLegendLayout();

    // Thêm sự kiện lắng nghe thay đổi kích thước màn hình
    window.addEventListener('resize', checkLegendLayout);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', checkLegendLayout);
    };
  }, [screenMode, convert]);
  const renderContentCompany = (key: string) => {
    let isGreen = dataClosedSession?.PriceChange >= 0;
    switch (key) {
      default:
        return (
          <div className="general-stock">
            <div className="stock-price">
              <div className="stock-price-children">
                {openStock === true && !!socketData ? (
                  <div className="infomation">
                    <span
                      style={{
                        color: isGreen ? '#42A732' : '#E43637',
                      }}
                    >
                      {socketData?.LastPrice?.toLocaleString('de-DE')}
                    </span>
                    {/* <span>{socketData?.Change}</span> */}
                    <span></span>
                    <span
                      style={{
                        color: isGreen ? '#42A732' : '#E43637',
                      }}
                    >
                      {socketData?.Change}/{socketData?.RatioChange}%
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      color: isGreen ? '#42A732' : '#E43637',
                    }}
                    className="infomation"
                  >
                    <span
                      style={{
                        color: isGreen ? '#42A732' : '#E43637',
                        padding: 0,
                      }}
                    >
                      {parseFloat(
                        dataClosedSession?.ClosePrice
                      )?.toLocaleString('de-DE')}
                    </span>
                    {/* <span style={{ color: isGreen ? '#42A732' : '#E43637' }}>
                      {dataClosedSession?.PriceChange}
                    </span> */}
                    <span></span>
                    <span
                      style={{
                        padding: '4px 9px',
                        backgroundColor: isGreen ? '#42A732' : '#E43637',
                        marginRight: '10px',
                        color: isGreen ? '#42A732' : '#E43637',
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
                <div className="market">
                  {screenMode && openStock === true && (
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#42A732',
                      }}
                    ></span>
                  )}
                  {screenMode === 'dark' && openStock === false && (
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#fff',
                      }}
                    ></span>
                  )}
                  {screenMode === 'light' && openStock === false && (
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: 'rgba(2, 2, 2, 0.50)',
                      }}
                    ></span>
                  )}
                  {openStock === true ? (
                    <span>TT mở cửa</span>
                  ) : (
                    <span>TT đóng cửa</span>
                  )}
                </div>
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
                    {parseFloat(
                      dataClosedSession?.HighestPrice
                    )?.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>
            )}

            <div className="financial-report">
              <div className="vic-table">
                <div
                  style={{
                    marginLeft: '4px',
                  }}
                >
                  TỔNG QUAN
                </div>
                <table>
                  <tbody>
                    {FIRST_TABLE.map((item, i) => {
                      return (
                        <tr
                          key={i}
                          style={
                            screenMode === 'dark'
                              ? i % 2 === 0
                                ? { backgroundColor: '#33343C !important' }
                                : {}
                              : i % 2 === 0
                                ? { backgroundColor: '#FFFFFF' }
                                : {}
                          }
                        >
                          <td>{item.label}</td>
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
                  TÀI CHÍNH
                </div>
                <table>
                  <tbody>
                    {SECOND_TABLE.map((item, i) => (
                      <tr
                        key={i}
                        style={
                          screenMode === 'dark'
                            ? i % 2 === 0
                              ? {
                                  backgroundColor: '#33343C',
                                }
                              : {}
                            : i % 2 === 0
                              ? {
                                  backgroundColor: '#FFFFFF',
                                }
                              : {}
                        }
                      >
                        <td>{item.label}</td>
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
                  KQ KINH DOANH 2023
                </div>
                <table>
                  <tbody>
                    {THIRD_TABLE.map((item, i) => (
                      <tr
                        key={i}
                        style={
                          screenMode === 'dark'
                            ? i % 2 === 0
                              ? { backgroundColor: '#33343C' }
                              : {}
                            : i % 2 === 0
                              ? { backgroundColor: '#FFFFFF' }
                              : {}
                        }
                      >
                        <td>{item.label}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };
  let isGreen = dataClosedSession?.PriceChange >= 0;
  const renderContent = (key: string) => {
    switch (key) {
      default:
        return <></>;
    }
  };

  const items = [
    {
      key: 'general',
      label: (
        <div style={{ display: 'flex', gap: '12px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: '50%',
            }}
          >
            {valueTab === 'general' ? (
              <svg
                width="20"
                height="23"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.6846 0.700195C2.81357 0.700195 1.97822 1.05749 1.36231 1.69349C0.746405 2.32948 0.400391 3.19207 0.400391 4.0915V18.9089C0.400391 19.8083 0.746405 20.6709 1.36231 21.3069C1.97822 21.9429 2.81357 22.3002 3.6846 22.3002H18.8425C19.0435 22.3002 19.2363 22.2177 19.3784 22.071C19.5205 21.9242 19.6004 21.7251 19.6004 21.5176C19.6004 21.31 19.5205 21.111 19.3784 20.9642C19.2363 20.8174 19.0435 20.735 18.8425 20.735H3.6846C3.25937 20.735 2.84837 20.5767 2.52693 20.2893C2.20549 20.0018 1.99512 19.6044 1.93437 19.1698H18.8425C19.0435 19.1698 19.2363 19.0873 19.3784 18.9405C19.5205 18.7938 19.6004 18.5947 19.6004 18.3872V4.0915C19.6004 3.19207 19.2544 2.32948 18.6385 1.69349C18.0226 1.05749 17.1872 0.700195 16.3162 0.700195H3.6846ZM18.0846 17.6045H1.91618V4.0915C1.91618 3.0835 2.70843 2.26541 3.6846 2.26541H16.3162C17.2923 2.26541 18.0846 3.0835 18.0846 4.0915V17.6045ZM5.20039 4.35237C4.50313 4.35237 3.93723 4.93672 3.93723 5.65672V6.54367C3.93723 7.26367 4.50313 7.84802 5.20039 7.84802H14.8004C15.4977 7.84802 16.0635 7.26367 16.0635 6.54367V5.65672C16.0635 4.93672 15.4977 4.35237 14.8004 4.35237H5.20039Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="23"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.6846 0.700195C2.81357 0.700195 1.97822 1.05749 1.36231 1.69349C0.746405 2.32948 0.400391 3.19207 0.400391 4.0915V18.9089C0.400391 19.8083 0.746405 20.6709 1.36231 21.3069C1.97822 21.9429 2.81357 22.3002 3.6846 22.3002H18.8425C19.0435 22.3002 19.2363 22.2177 19.3784 22.071C19.5205 21.9242 19.6004 21.7251 19.6004 21.5176C19.6004 21.31 19.5205 21.111 19.3784 20.9642C19.2363 20.8174 19.0435 20.735 18.8425 20.735H3.6846C3.25937 20.735 2.84837 20.5767 2.52693 20.2893C2.20549 20.0018 1.99512 19.6044 1.93437 19.1698H18.8425C19.0435 19.1698 19.2363 19.0873 19.3784 18.9405C19.5205 18.7938 19.6004 18.5947 19.6004 18.3872V4.0915C19.6004 3.19207 19.2544 2.32948 18.6385 1.69349C18.0226 1.05749 17.1872 0.700195 16.3162 0.700195H3.6846ZM18.0846 17.6045H1.91618V4.0915C1.91618 3.0835 2.70843 2.26541 3.6846 2.26541H16.3162C17.2923 2.26541 18.0846 3.0835 18.0846 4.0915V17.6045ZM5.20039 4.35237C4.50313 4.35237 3.93723 4.93672 3.93723 5.65672V6.54367C3.93723 7.26367 4.50313 7.84802 5.20039 7.84802H14.8004C15.4977 7.84802 16.0635 7.26367 16.0635 6.54367V5.65672C16.0635 4.93672 15.4977 4.35237 14.8004 4.35237H5.20039Z"
                  fill="rgba(129, 132, 152, 1)"
                />
              </svg>
            )}
          </span>
          <span>Tổng quan</span>
        </div>
      ),
      children: renderContent('general'),
    },
    {
      key: 'profile',
      label: (
        <div style={{ display: 'flex', gap: '12px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {valueTab === 'profile' ? (
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.1391 10.8435C11.778 10.9987 11.3909 11.0786 11 11.0786C10.2106 11.0786 9.45345 10.7531 8.89523 10.1738C8.61883 9.88691 8.39957 9.54635 8.24999 9.17154C8.1004 8.79673 8.02341 8.395 8.02341 7.98931C8.02341 7.16997 8.33701 6.3842 8.89523 5.80484C9.45345 5.22548 10.2106 4.9 11 4.9C11.7894 4.9 12.5465 5.22548 13.1048 5.80484C13.663 6.3842 13.9766 7.16997 13.9766 7.98931C13.9766 8.395 13.8996 8.79673 13.75 9.17154C13.6004 9.54635 13.3812 9.88691 13.1048 10.1738C12.8284 10.4606 12.5002 10.6882 12.1391 10.8435ZM12.2629 9.29999C12.5978 8.95238 12.786 8.48091 12.786 7.98931C12.786 7.49771 12.5978 7.02624 12.2629 6.67863C11.9279 6.33101 11.4737 6.13572 11 6.13572C10.5263 6.13572 10.0721 6.33101 9.73714 6.67863C9.40221 7.02624 9.21404 7.49771 9.21404 7.98931C9.21404 8.48091 9.40221 8.95238 9.73714 9.29999C10.0721 9.64761 10.5263 9.8429 11 9.8429C11.4737 9.8429 11.9279 9.64761 12.2629 9.29999Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 11.5C22 17.5751 17.0751 22.5 11 22.5C4.92487 22.5 0 17.5751 0 11.5C0 5.42487 4.92487 0.5 11 0.5C17.0751 0.5 22 5.42487 22 11.5ZM18.4301 17.4736C16.6827 19.6443 14.0036 21.0333 11 21.0333C7.9963 21.0333 5.31706 19.6442 3.56965 17.4733C3.85563 16.7477 4.32744 16.1137 4.93734 15.6423C5.65707 15.0859 6.53064 14.7855 7.42809 14.7858H14.5719C15.4695 14.7856 16.3432 15.0861 17.0629 15.6428C17.6726 16.1143 18.1442 16.7482 18.4301 17.4736ZM19.2166 16.3374C18.8539 15.6831 18.3643 15.1084 17.7742 14.6519C16.8489 13.9363 15.7258 13.5499 14.5719 13.5501H7.42809C6.27419 13.5499 5.15107 13.9363 4.22582 14.6519C3.63589 15.1082 3.14601 15.6827 2.78295 16.3367C1.94653 14.9187 1.46667 13.2654 1.46667 11.5C1.46667 6.23489 5.73489 1.96667 11 1.96667C16.2651 1.96667 20.5333 6.23489 20.5333 11.5C20.5333 13.2657 20.0533 14.9193 19.2166 16.3374Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.1391 10.8435C11.778 10.9987 11.3909 11.0786 11 11.0786C10.2106 11.0786 9.45345 10.7531 8.89523 10.1738C8.61883 9.88691 8.39957 9.54635 8.24999 9.17154C8.1004 8.79673 8.02341 8.395 8.02341 7.98931C8.02341 7.16997 8.33701 6.3842 8.89523 5.80484C9.45345 5.22548 10.2106 4.9 11 4.9C11.7894 4.9 12.5465 5.22548 13.1048 5.80484C13.663 6.3842 13.9766 7.16997 13.9766 7.98931C13.9766 8.395 13.8996 8.79673 13.75 9.17154C13.6004 9.54635 13.3812 9.88691 13.1048 10.1738C12.8284 10.4606 12.5002 10.6882 12.1391 10.8435ZM12.2629 9.29999C12.5978 8.95238 12.786 8.48091 12.786 7.98931C12.786 7.49771 12.5978 7.02624 12.2629 6.67863C11.9279 6.33101 11.4737 6.13572 11 6.13572C10.5263 6.13572 10.0721 6.33101 9.73714 6.67863C9.40221 7.02624 9.21404 7.49771 9.21404 7.98931C9.21404 8.48091 9.40221 8.95238 9.73714 9.29999C10.0721 9.64761 10.5263 9.8429 11 9.8429C11.4737 9.8429 11.9279 9.64761 12.2629 9.29999Z"
                  fill="rgba(129, 132, 152, 1)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 11.5C22 17.5751 17.0751 22.5 11 22.5C4.92487 22.5 0 17.5751 0 11.5C0 5.42487 4.92487 0.5 11 0.5C17.0751 0.5 22 5.42487 22 11.5ZM18.4301 17.4736C16.6827 19.6443 14.0036 21.0333 11 21.0333C7.9963 21.0333 5.31706 19.6442 3.56965 17.4733C3.85563 16.7477 4.32744 16.1137 4.93734 15.6423C5.65707 15.0859 6.53064 14.7855 7.42809 14.7858H14.5719C15.4695 14.7856 16.3432 15.0861 17.0629 15.6428C17.6726 16.1143 18.1442 16.7482 18.4301 17.4736ZM19.2166 16.3374C18.8539 15.6831 18.3643 15.1084 17.7742 14.6519C16.8489 13.9363 15.7258 13.5499 14.5719 13.5501H7.42809C6.27419 13.5499 5.15107 13.9363 4.22582 14.6519C3.63589 15.1082 3.14601 15.6827 2.78295 16.3367C1.94653 14.9187 1.46667 13.2654 1.46667 11.5C1.46667 6.23489 5.73489 1.96667 11 1.96667C16.2651 1.96667 20.5333 6.23489 20.5333 11.5C20.5333 13.2657 20.0533 14.9193 19.2166 16.3374Z"
                  fill="rgba(129, 132, 152, 1)"
                />
              </svg>
            )}
          </span>
          <span>Hồ sơ</span>
        </div>
      ),
      children: renderContent('profile'),
    },
    {
      key: 'financial',
      label: (
        <div style={{ display: 'flex', gap: '12px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {valueTab === 'financial' ? (
              <svg
                width="14"
                height="23"
                viewBox="0 0 14 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.4 10.9H7.6V4.1H8.6C9.50174 4.1 10.3665 4.45821 11.0042 5.09584C11.6418 5.73346 12 6.59826 12 7.5C12 7.65913 12.0632 7.81174 12.1757 7.92426C12.2883 8.03679 12.4409 8.1 12.6 8.1C12.7591 8.1 12.9117 8.03679 13.0243 7.92426C13.1368 7.81174 13.2 7.65913 13.2 7.5C13.1984 6.28049 12.7133 5.11139 11.8509 4.24906C10.9886 3.38674 9.81951 2.90159 8.6 2.9H7.6V1.1C7.6 0.94087 7.53679 0.788258 7.42426 0.675736C7.31174 0.563214 7.15913 0.5 7 0.5C6.84087 0.5 6.68826 0.563214 6.57574 0.675736C6.46321 0.788258 6.4 0.94087 6.4 1.1V2.9H5.4C4.18 2.9 3.00998 3.38464 2.14731 4.24731C1.28464 5.10998 0.8 6.28 0.8 7.5C0.8 8.72 1.28464 9.89002 2.14731 10.7527C3.00998 11.6154 4.18 12.1 5.4 12.1H6.4V18.9H4.6C3.69826 18.9 2.83346 18.5418 2.19584 17.9042C1.55821 17.2665 1.2 16.4017 1.2 15.5C1.2 15.3409 1.13679 15.1883 1.02426 15.0757C0.911742 14.9632 0.75913 14.9 0.6 14.9C0.44087 14.9 0.288258 14.9632 0.175736 15.0757C0.063214 15.1883 0 15.3409 0 15.5C0.00158756 16.7195 0.486739 17.8886 1.34906 18.7509C2.21139 19.6133 3.38049 20.0984 4.6 20.1H6.4V21.9C6.4 22.0591 6.46321 22.2117 6.57574 22.3243C6.68826 22.4368 6.84087 22.5 7 22.5C7.15913 22.5 7.31174 22.4368 7.42426 22.3243C7.53679 22.2117 7.6 22.0591 7.6 21.9V20.1H9.4C10.62 20.1 11.79 19.6154 12.6527 18.7527C13.5154 17.89 14 16.72 14 15.5C14 14.28 13.5154 13.11 12.6527 12.2473C11.79 11.3846 10.62 10.9 9.4 10.9ZM5.4 10.9C4.49826 10.9 3.63346 10.5418 2.99584 9.90416C2.35821 9.26654 2 8.40174 2 7.5C2 6.59826 2.35821 5.73346 2.99584 5.09584C3.63346 4.45821 4.49826 4.1 5.4 4.1H6.4V10.9H5.4ZM9.4 18.9H7.6V12.1H9.4C10.3017 12.1 11.1665 12.4582 11.8042 13.0958C12.4418 13.7335 12.8 14.5983 12.8 15.5C12.8 16.4017 12.4418 17.2665 11.8042 17.9042C11.1665 18.5418 10.3017 18.9 9.4 18.9Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="23"
                viewBox="0 0 14 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.4 10.9H7.6V4.1H8.6C9.50174 4.1 10.3665 4.45821 11.0042 5.09584C11.6418 5.73346 12 6.59826 12 7.5C12 7.65913 12.0632 7.81174 12.1757 7.92426C12.2883 8.03679 12.4409 8.1 12.6 8.1C12.7591 8.1 12.9117 8.03679 13.0243 7.92426C13.1368 7.81174 13.2 7.65913 13.2 7.5C13.1984 6.28049 12.7133 5.11139 11.8509 4.24906C10.9886 3.38674 9.81951 2.90159 8.6 2.9H7.6V1.1C7.6 0.94087 7.53679 0.788258 7.42426 0.675736C7.31174 0.563214 7.15913 0.5 7 0.5C6.84087 0.5 6.68826 0.563214 6.57574 0.675736C6.46321 0.788258 6.4 0.94087 6.4 1.1V2.9H5.4C4.18 2.9 3.00998 3.38464 2.14731 4.24731C1.28464 5.10998 0.8 6.28 0.8 7.5C0.8 8.72 1.28464 9.89002 2.14731 10.7527C3.00998 11.6154 4.18 12.1 5.4 12.1H6.4V18.9H4.6C3.69826 18.9 2.83346 18.5418 2.19584 17.9042C1.55821 17.2665 1.2 16.4017 1.2 15.5C1.2 15.3409 1.13679 15.1883 1.02426 15.0757C0.911742 14.9632 0.75913 14.9 0.6 14.9C0.44087 14.9 0.288258 14.9632 0.175736 15.0757C0.063214 15.1883 0 15.3409 0 15.5C0.00158756 16.7195 0.486739 17.8886 1.34906 18.7509C2.21139 19.6133 3.38049 20.0984 4.6 20.1H6.4V21.9C6.4 22.0591 6.46321 22.2117 6.57574 22.3243C6.68826 22.4368 6.84087 22.5 7 22.5C7.15913 22.5 7.31174 22.4368 7.42426 22.3243C7.53679 22.2117 7.6 22.0591 7.6 21.9V20.1H9.4C10.62 20.1 11.79 19.6154 12.6527 18.7527C13.5154 17.89 14 16.72 14 15.5C14 14.28 13.5154 13.11 12.6527 12.2473C11.79 11.3846 10.62 10.9 9.4 10.9ZM5.4 10.9C4.49826 10.9 3.63346 10.5418 2.99584 9.90416C2.35821 9.26654 2 8.40174 2 7.5C2 6.59826 2.35821 5.73346 2.99584 5.09584C3.63346 4.45821 4.49826 4.1 5.4 4.1H6.4V10.9H5.4ZM9.4 18.9H7.6V12.1H9.4C10.3017 12.1 11.1665 12.4582 11.8042 13.0958C12.4418 13.7335 12.8 14.5983 12.8 15.5C12.8 16.4017 12.4418 17.2665 11.8042 17.9042C11.1665 18.5418 10.3017 18.9 9.4 18.9Z"
                  fill="#818498"
                />
              </svg>
            )}
          </span>
          <span>Tài chính</span>
        </div>
      ),
      children: renderContent('financial'),
    },
    {
      key: 'transaction',
      label: (
        <div style={{ display: 'flex', gap: '12px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {valueTab === 'transaction' ? (
              <svg
                width="21"
                height="23"
                viewBox="0 0 21 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.27403 4.42128C1.27495 4.4294 1.27638 4.4403 1.27857 4.45376C1.28661 4.5033 1.30481 4.58712 1.34546 4.69447C1.42536 4.90546 1.59785 5.22324 1.97853 5.55831C2.74442 6.23243 4.42462 7.03466 8.0606 7.03466C11.6966 7.03466 13.3768 6.23243 14.1427 5.55831C14.5233 5.22324 14.6958 4.90546 14.7757 4.69447C14.8164 4.58712 14.8346 4.5033 14.8426 4.45376C14.8449 4.44003 14.8463 4.42896 14.8472 4.42079C14.8469 4.41767 14.8464 4.41412 14.8459 4.41016L16.1211 4.40912L16.1212 4.41381L16.1212 4.41765L16.1212 4.41926L16.1212 4.42079V10.9554H15.4848C16.1212 10.9554 16.1212 10.957 16.1212 10.957L16.1212 10.9586L16.1212 10.962L16.1211 10.9699L16.1205 10.9894C16.12 11.004 16.119 11.0219 16.1175 11.0428C16.1143 11.0846 16.1085 11.1387 16.098 11.2033C16.0771 11.3324 16.0373 11.5038 15.9619 11.7028C15.8098 12.1044 15.5183 12.6035 14.9709 13.0853C13.8808 14.0448 11.8489 14.8762 8.0606 14.8762C4.40984 14.8762 2.39024 14.1041 1.27273 13.1892V17.4774C1.27328 17.4843 1.27481 17.4999 1.27857 17.5231C1.28661 17.5726 1.30481 17.6564 1.34546 17.7638C1.42536 17.9748 1.59785 18.2926 1.97853 18.6276C2.74442 19.3017 4.42462 20.104 8.0606 20.104C8.41205 20.104 8.69696 20.3965 8.69696 20.7574C8.69696 21.1183 8.41205 21.4109 8.0606 21.4109C4.27234 21.4109 2.24042 20.5795 1.15025 19.6199C0.602905 19.1382 0.311377 18.6391 0.159273 18.2375C0.0839238 18.0385 0.0441186 17.8671 0.0231588 17.7379C0.0126803 17.6734 0.0068959 17.6193 0.00372866 17.5775C0.00214445 17.5566 0.00121263 17.5387 0.000676738 17.5241L0.000137434 17.5046L3.04074e-05 17.4967L7.0803e-06 17.4932L0 17.4916C0 17.4916 0 17.4901 0.636363 17.4901H0V4.42232L0.636337 4.42079L1.27403 4.42128ZM1.27273 10.9428V6.65455C2.39024 7.56941 4.40984 8.34159 8.0606 8.34159C11.7114 8.34159 13.731 7.56941 14.8485 6.65455V10.9428C14.8479 10.9497 14.8464 10.9653 14.8426 10.9884C14.8346 11.038 14.8164 11.1218 14.7757 11.2291C14.6958 11.4401 14.5233 11.7579 14.1427 12.093C13.3768 12.7671 11.6966 13.5693 8.0606 13.5693C4.42462 13.5693 2.74442 12.7671 1.97853 12.093C1.59785 11.7579 1.42536 11.4401 1.34546 11.2291C1.30481 11.1218 1.28661 11.038 1.27857 10.9884C1.27481 10.9653 1.27328 10.9497 1.27273 10.9428Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
                <path
                  d="M1.27541 4.40913L0.106035 4.96535L9.92213e-05 4.40914L0.000137434 4.40633L0.000676738 4.38685C0.00121263 4.37222 0.00214445 4.35434 0.00372866 4.33343C0.0068959 4.29161 0.0126803 4.23753 0.0231588 4.17297C0.0441186 4.04383 0.0839238 3.87239 0.159273 3.67343C0.311377 3.27179 0.602905 2.77275 1.15025 2.29098C2.24042 1.33144 4.27234 0.5 8.0606 0.5C11.8489 0.5 13.8808 1.33144 14.9709 2.29098C15.5183 2.77275 15.8098 3.27179 15.9619 3.67343C16.0373 3.87239 16.0771 4.04383 16.098 4.17297C16.1085 4.23753 16.1143 4.29161 16.1175 4.33343C16.119 4.35434 16.12 4.37222 16.1205 4.38685L16.1211 4.40633L16.1211 4.40912L14.8459 4.41016C14.8451 4.40401 14.8439 4.39585 14.8426 4.38783C14.8346 4.33828 14.8164 4.25447 14.7757 4.14712C14.6958 3.93613 14.5233 3.61834 14.1427 3.28328C13.3768 2.60915 11.6966 1.80693 8.0606 1.80693C4.42462 1.80693 2.74442 2.60915 1.97853 3.28328C1.59785 3.61834 1.42536 3.93613 1.34546 4.14712C1.30481 4.25447 1.28661 4.33828 1.27857 4.38783C1.27727 4.39586 1.27623 4.40297 1.27541 4.40913Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
                <path
                  d="M16.1212 19.2327L16.1233 19.2327H18.8273L16.7318 21.3845C16.4833 21.6397 16.4833 22.0534 16.7318 22.3086C16.9804 22.5638 17.3833 22.5638 17.6318 22.3086L20.8136 19.0413C21.0621 18.7861 21.0621 18.3723 20.8136 18.1171L17.6318 14.8498C17.3833 14.5946 16.9804 14.5946 16.7318 14.8498C16.4833 15.105 16.4833 15.5188 16.7318 15.7739L18.8273 17.9257H14L13.998 17.9257H11.2939L13.3893 15.7739C13.6378 15.5188 13.6378 15.105 13.3893 14.8498C13.1408 14.5946 12.7379 14.5946 12.4894 14.8498L9.30756 18.1171C9.05905 18.3723 9.05905 18.7861 9.30756 19.0413L12.4894 22.3086C12.7379 22.5638 13.1408 22.5638 13.3893 22.3086C13.6378 22.0534 13.6378 21.6397 13.3893 21.3845L11.2939 19.2327H16.1212Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
              </svg>
            ) : (
              <svg
                width="21"
                height="23"
                viewBox="0 0 21 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.27403 4.42128C1.27495 4.4294 1.27638 4.4403 1.27857 4.45376C1.28661 4.5033 1.30481 4.58712 1.34546 4.69447C1.42536 4.90546 1.59785 5.22324 1.97853 5.55831C2.74442 6.23243 4.42462 7.03466 8.0606 7.03466C11.6966 7.03466 13.3768 6.23243 14.1427 5.55831C14.5233 5.22324 14.6958 4.90546 14.7757 4.69447C14.8164 4.58712 14.8346 4.5033 14.8426 4.45376C14.8449 4.44003 14.8463 4.42896 14.8472 4.42079C14.8469 4.41767 14.8464 4.41412 14.8459 4.41016L16.1211 4.40912L16.1212 4.41381L16.1212 4.41765L16.1212 4.41926L16.1212 4.42079V10.9554H15.4848C16.1212 10.9554 16.1212 10.957 16.1212 10.957L16.1212 10.9586L16.1212 10.962L16.1211 10.9699L16.1205 10.9894C16.12 11.004 16.119 11.0219 16.1175 11.0428C16.1143 11.0846 16.1085 11.1387 16.098 11.2033C16.0771 11.3324 16.0373 11.5038 15.9619 11.7028C15.8098 12.1044 15.5183 12.6035 14.9709 13.0853C13.8808 14.0448 11.8489 14.8762 8.0606 14.8762C4.40984 14.8762 2.39024 14.1041 1.27273 13.1892V17.4774C1.27328 17.4843 1.27481 17.4999 1.27857 17.5231C1.28661 17.5726 1.30481 17.6564 1.34546 17.7638C1.42536 17.9748 1.59785 18.2926 1.97853 18.6276C2.74442 19.3017 4.42462 20.104 8.0606 20.104C8.41205 20.104 8.69696 20.3965 8.69696 20.7574C8.69696 21.1183 8.41205 21.4109 8.0606 21.4109C4.27234 21.4109 2.24042 20.5795 1.15025 19.6199C0.602905 19.1382 0.311377 18.6391 0.159273 18.2375C0.0839238 18.0385 0.0441186 17.8671 0.0231588 17.7379C0.0126803 17.6734 0.0068959 17.6193 0.00372866 17.5775C0.00214445 17.5566 0.00121263 17.5387 0.000676738 17.5241L0.000137434 17.5046L3.04074e-05 17.4967L7.0803e-06 17.4932L0 17.4916C0 17.4916 0 17.4901 0.636363 17.4901H0V4.42232L0.636337 4.42079L1.27403 4.42128ZM1.27273 10.9428V6.65455C2.39024 7.56941 4.40984 8.34159 8.0606 8.34159C11.7114 8.34159 13.731 7.56941 14.8485 6.65455V10.9428C14.8479 10.9497 14.8464 10.9653 14.8426 10.9884C14.8346 11.038 14.8164 11.1218 14.7757 11.2291C14.6958 11.4401 14.5233 11.7579 14.1427 12.093C13.3768 12.7671 11.6966 13.5693 8.0606 13.5693C4.42462 13.5693 2.74442 12.7671 1.97853 12.093C1.59785 11.7579 1.42536 11.4401 1.34546 11.2291C1.30481 11.1218 1.28661 11.038 1.27857 10.9884C1.27481 10.9653 1.27328 10.9497 1.27273 10.9428Z"
                  fill="#818498"
                />
                <path
                  d="M1.27541 4.40913L0.106035 4.96535L9.92213e-05 4.40914L0.000137434 4.40633L0.000676738 4.38685C0.00121263 4.37222 0.00214445 4.35434 0.00372866 4.33343C0.0068959 4.29161 0.0126803 4.23753 0.0231588 4.17297C0.0441186 4.04383 0.0839238 3.87239 0.159273 3.67343C0.311377 3.27179 0.602905 2.77275 1.15025 2.29098C2.24042 1.33144 4.27234 0.5 8.0606 0.5C11.8489 0.5 13.8808 1.33144 14.9709 2.29098C15.5183 2.77275 15.8098 3.27179 15.9619 3.67343C16.0373 3.87239 16.0771 4.04383 16.098 4.17297C16.1085 4.23753 16.1143 4.29161 16.1175 4.33343C16.119 4.35434 16.12 4.37222 16.1205 4.38685L16.1211 4.40633L16.1211 4.40912L14.8459 4.41016C14.8451 4.40401 14.8439 4.39585 14.8426 4.38783C14.8346 4.33828 14.8164 4.25447 14.7757 4.14712C14.6958 3.93613 14.5233 3.61834 14.1427 3.28328C13.3768 2.60915 11.6966 1.80693 8.0606 1.80693C4.42462 1.80693 2.74442 2.60915 1.97853 3.28328C1.59785 3.61834 1.42536 3.93613 1.34546 4.14712C1.30481 4.25447 1.28661 4.33828 1.27857 4.38783C1.27727 4.39586 1.27623 4.40297 1.27541 4.40913Z"
                  fill="#818498"
                />
                <path
                  d="M16.1212 19.2327L16.1233 19.2327H18.8273L16.7318 21.3845C16.4833 21.6397 16.4833 22.0534 16.7318 22.3086C16.9804 22.5638 17.3833 22.5638 17.6318 22.3086L20.8136 19.0413C21.0621 18.7861 21.0621 18.3723 20.8136 18.1171L17.6318 14.8498C17.3833 14.5946 16.9804 14.5946 16.7318 14.8498C16.4833 15.105 16.4833 15.5188 16.7318 15.7739L18.8273 17.9257H14L13.998 17.9257H11.2939L13.3893 15.7739C13.6378 15.5188 13.6378 15.105 13.3893 14.8498C13.1408 14.5946 12.7379 14.5946 12.4894 14.8498L9.30756 18.1171C9.05905 18.3723 9.05905 18.7861 9.30756 19.0413L12.4894 22.3086C12.7379 22.5638 13.1408 22.5638 13.3893 22.3086C13.6378 22.0534 13.6378 21.6397 13.3893 21.3845L11.2939 19.2327H16.1212Z"
                  fill="#818498"
                />
              </svg>
            )}
          </span>
          <span>Thống kê giao dịch</span>
        </div>
      ),
      children: renderContent('transaction'),
    },
    {
      key: 'financial-chart',
      label: (
        <div style={{ display: 'flex', gap: '12px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {valueTab === 'financial-chart' ? (
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.10005 10.5437V6.15159C5.10005 5.88974 5.19156 5.66631 5.37459 5.4813C5.55685 5.29628 5.77866 5.20377 6.04002 5.20377C6.30138 5.20377 6.52319 5.29628 6.70544 5.4813C6.88847 5.66631 6.97999 5.88974 6.97999 6.15159V10.5437C6.97999 10.8056 6.88847 11.029 6.70544 11.214C6.52241 11.399 6.30061 11.4915 6.04002 11.4915C5.77943 11.4915 5.55762 11.399 5.37459 11.214C5.19156 11.029 5.10005 10.8056 5.10005 10.5437ZM10.157 12.0854V1.45016C10.157 1.18675 10.2482 0.962538 10.4304 0.777523C10.6135 0.592508 10.8353 0.5 11.0959 0.5C11.3572 0.5 11.579 0.592508 11.7613 0.777523C11.9443 0.962538 12.0358 1.18675 12.0358 1.45016V12.0854C12.0358 12.4021 11.9397 12.6397 11.7473 12.798C11.5542 12.9564 11.3382 13.0356 11.0993 13.0356C10.8605 13.0356 10.6433 12.9564 10.4479 12.798C10.2524 12.6397 10.1555 12.4021 10.157 12.0854ZM0 14.6043V10.8577C0 10.5943 0.0911278 10.3701 0.273383 10.1851C0.456414 10.0001 0.67861 9.90755 0.939972 9.90755C1.20133 9.90755 1.42314 10.0001 1.6054 10.1851C1.78765 10.3701 1.87878 10.5943 1.87878 10.8577V14.6054C1.87878 14.9222 1.78261 15.1593 1.59027 15.3169C1.39794 15.4753 1.18195 15.5544 0.942299 15.5544C0.703428 15.5544 0.486273 15.4753 0.290833 15.3169C0.0969443 15.1593 0 14.9222 0 14.6054M1.26222 21.5C1.0024 21.5 0.822863 21.3804 0.723592 21.1413C0.624321 20.903 0.669303 20.6878 0.858539 20.4957L5.40484 15.9013C5.57314 15.7304 5.7806 15.6352 6.02722 15.6156C6.27385 15.596 6.49294 15.6716 6.6845 15.8425L10.157 18.8588L18.013 10.9165H15.9283C15.7631 10.9165 15.6251 10.8601 15.5142 10.7472C15.4033 10.6343 15.3474 10.4943 15.3467 10.3274C15.3459 10.1604 15.4017 10.0208 15.5142 9.90872C15.6266 9.79662 15.7647 9.74057 15.9283 9.74057H19.06C19.3268 9.74057 19.5502 9.8315 19.7301 10.0134C19.91 10.1953 20 10.421 20 10.6907V13.8564C20 14.0234 19.9442 14.1629 19.8325 14.275C19.7208 14.3871 19.5824 14.4436 19.4172 14.4443C19.252 14.4451 19.1139 14.3887 19.003 14.275C18.8921 14.1613 18.8367 14.0218 18.8367 13.8564V11.7491L10.805 19.8678C10.6367 20.0379 10.4293 20.1328 10.1826 20.1524C9.93602 20.172 9.71692 20.0963 9.52536 19.9254L6.05282 16.9091L1.68218 21.3283C1.63254 21.3754 1.57011 21.4157 1.49488 21.4494C1.41965 21.4831 1.3421 21.5 1.26222 21.5Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.10005 10.5437V6.15159C5.10005 5.88974 5.19156 5.66631 5.37459 5.4813C5.55685 5.29628 5.77866 5.20377 6.04002 5.20377C6.30138 5.20377 6.52319 5.29628 6.70544 5.4813C6.88847 5.66631 6.97999 5.88974 6.97999 6.15159V10.5437C6.97999 10.8056 6.88847 11.029 6.70544 11.214C6.52241 11.399 6.30061 11.4915 6.04002 11.4915C5.77943 11.4915 5.55762 11.399 5.37459 11.214C5.19156 11.029 5.10005 10.8056 5.10005 10.5437ZM10.157 12.0854V1.45016C10.157 1.18675 10.2482 0.962538 10.4304 0.777523C10.6135 0.592508 10.8353 0.5 11.0959 0.5C11.3572 0.5 11.579 0.592508 11.7613 0.777523C11.9443 0.962538 12.0358 1.18675 12.0358 1.45016V12.0854C12.0358 12.4021 11.9397 12.6397 11.7473 12.798C11.5542 12.9564 11.3382 13.0356 11.0993 13.0356C10.8605 13.0356 10.6433 12.9564 10.4479 12.798C10.2524 12.6397 10.1555 12.4021 10.157 12.0854ZM0 14.6043V10.8577C0 10.5943 0.0911278 10.3701 0.273383 10.1851C0.456414 10.0001 0.67861 9.90755 0.939972 9.90755C1.20133 9.90755 1.42314 10.0001 1.6054 10.1851C1.78765 10.3701 1.87878 10.5943 1.87878 10.8577V14.6054C1.87878 14.9222 1.78261 15.1593 1.59027 15.3169C1.39794 15.4753 1.18195 15.5544 0.942299 15.5544C0.703428 15.5544 0.486273 15.4753 0.290833 15.3169C0.0969443 15.1593 0 14.9222 0 14.6054M1.26222 21.5C1.0024 21.5 0.822863 21.3804 0.723592 21.1413C0.624321 20.903 0.669303 20.6878 0.858539 20.4957L5.40484 15.9013C5.57314 15.7304 5.7806 15.6352 6.02722 15.6156C6.27385 15.596 6.49294 15.6716 6.6845 15.8425L10.157 18.8588L18.013 10.9165H15.9283C15.7631 10.9165 15.6251 10.8601 15.5142 10.7472C15.4033 10.6343 15.3474 10.4943 15.3467 10.3274C15.3459 10.1604 15.4017 10.0208 15.5142 9.90872C15.6266 9.79662 15.7647 9.74057 15.9283 9.74057H19.06C19.3268 9.74057 19.5502 9.8315 19.7301 10.0134C19.91 10.1953 20 10.421 20 10.6907V13.8564C20 14.0234 19.9442 14.1629 19.8325 14.275C19.7208 14.3871 19.5824 14.4436 19.4172 14.4443C19.252 14.4451 19.1139 14.3887 19.003 14.275C18.8921 14.1613 18.8367 14.0218 18.8367 13.8564V11.7491L10.805 19.8678C10.6367 20.0379 10.4293 20.1328 10.1826 20.1524C9.93602 20.172 9.71692 20.0963 9.52536 19.9254L6.05282 16.9091L1.68218 21.3283C1.63254 21.3754 1.57011 21.4157 1.49488 21.4494C1.41965 21.4831 1.3421 21.5 1.26222 21.5Z"
                  fill="#818498"
                />
              </svg>
            )}
          </span>
          <span>Biểu đồ tài chính</span>
        </div>
      ),
      children: renderContent('financial-chart'),
    },
  ];

  const renderAnalysis = (key: string) => {
    switch (key) {
      case '1':
        return (
          <div className="analysis-report">
            {listAnalysisReport?.map((item, i) => (
              <a
                target="_blank"
                href={item?.attachedLink}
                className="analysis-report-children"
                key={i}
              >
                <div className="icon-child">
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.375 11.5H7.625V14H6.375V11.5ZM9.5 10.25H10.75V14H9.5V10.25ZM3.25 7.75H4.5V14H3.25V7.75Z"
                      fill={
                        screenMode === 'dark'
                          ? '#ABADBA'
                          : 'rgba(116, 123, 139, 1)'
                      }
                    />
                    <path
                      d="M12.625 2.125H10.75V1.5C10.75 1.16848 10.6183 0.850537 10.3839 0.616116C10.1495 0.381696 9.83152 0.25 9.5 0.25H4.5C4.16848 0.25 3.85054 0.381696 3.61612 0.616116C3.3817 0.850537 3.25 1.16848 3.25 1.5V2.125H1.375C1.04348 2.125 0.725537 2.2567 0.491116 2.49112C0.256696 2.72554 0.125 3.04348 0.125 3.375V16.5C0.125 16.8315 0.256696 17.1495 0.491116 17.3839C0.725537 17.6183 1.04348 17.75 1.375 17.75H12.625C12.9565 17.75 13.2745 17.6183 13.5089 17.3839C13.7433 17.1495 13.875 16.8315 13.875 16.5V3.375C13.875 3.04348 13.7433 2.72554 13.5089 2.49112C13.2745 2.2567 12.9565 2.125 12.625 2.125ZM4.5 1.5H9.5V4H4.5V1.5ZM12.625 16.5H1.375V3.375H3.25V5.25H10.75V3.375H12.625V16.5Z"
                      fill={
                        screenMode === 'dark'
                          ? '#ABADBA'
                          : 'rgba(116, 123, 139, 1)'
                      }
                    />
                  </svg>
                </div>

                <div className="item-child">
                  <div className="title">{item.title}</div>
                  <div className="post-time">
                    <div>
                      <span style={{ color: 'rgba(153, 186, 255, 1)' }}>
                        {item.source}
                      </span>
                    </div>
                    <div className="time">
                      <span>
                        {moment().format('DD/MM/YYYY', item.issueDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
      case '2':
        return (
          <div className="download-report">
            <div className="column-report">
              <span>#</span>
              <span>Năm cập nhật</span>
              <span>Tài liệu</span>
              <span></span>
            </div>
            {downloadReportMap
              ?.sort((a, b) => {
                return +b?.yearReport - +a?.yearReport;
              })
              ?.map((item, i) => (
                <div className="row-record" key={i}>
                  <span>{i + 1}</span>
                  <span>{item?.yearReport}</span>
                  <span>
                    {item?.title?.length > 33
                      ? `${item?.title.slice(0, 33)}...`
                      : item?.title}
                  </span>
                  {item.sourceUrl === '' ? (
                    <span></span>
                  ) : (
                    <span>
                      <a href={item.sourceUrl} target="_blank">
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.50033 13.2587L4.28723 9.04675L5.13009 8.18961L7.90509 10.9646V0.666992H9.09556V10.9646L11.8694 8.1908L12.7134 9.04675L8.50033 13.2587ZM2.0908 17.3337C1.54239 17.3337 1.08485 17.1503 0.718183 16.7837C0.351516 16.417 0.167786 15.9591 0.166992 15.4099V12.5253H1.35747V15.4099C1.35747 15.5932 1.43366 15.7614 1.58604 15.9146C1.73842 16.0678 1.90628 16.144 2.08961 16.1432H14.911C15.0936 16.1432 15.2614 16.067 15.4146 15.9146C15.5678 15.7622 15.644 15.594 15.6432 15.4099V12.5253H16.8337V15.4099C16.8337 15.9583 16.6503 16.4158 16.2837 16.7825C15.917 17.1491 15.4591 17.3329 14.9099 17.3337H2.0908Z"
                            fill={
                              screenMode === 'dark'
                                ? '#99BAFF'
                                : 'rgba(0, 74, 234, 1)'
                            }
                          />
                        </svg>
                      </a>
                    </span>
                  )}
                </div>
              ))}
          </div>
        );
    }
  };

  const analysis_tabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Báo cáo phân tích',
      children: renderAnalysis('1'),
    },
    // {
    //   key: '2',
    //   label: 'DOWNLOAD BC',
    //   children: renderAnalysis('2'),
    // },
  ];
  const analysis_tabs2: TabsProps['items'] = [
    // {
    //   key: '1',
    //   label: 'BÁO CÁO PHÂN TÍCH',
    //   children: renderAnalysis('1'),
    // },
    {
      key: '2',
      label: 'Download BC',
      children: renderAnalysis('2'),
    },
  ];
  const columns_01: ColumnsType<any> = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NGÀY',
      key: 'day',
      dataIndex: 'tradingDate',
      render: (text) => {
        return <span style={{ color: '#3594EF' }}>{text}</span>;
      },
    },
    {
      title: 'THAY ĐỔI',
      key: 'change',
      dataIndex: 'priceChange',
      render: (text, record, index) => {
        const color = text > 0 ? '#42A732' : '#E43637';
        return (
          <span style={{ color }}>
            {text / 1000}/{(record?.perPriceChange * 100).toFixed(2)}%
          </span>
        );
      },
    },
    {
      title: 'MỞ CỬA',
      key: 'openPrice',
      dataIndex: 'openPrice',
      align: 'center',
    },
    {
      title: 'CAO NHẤT',
      key: 'highestPrice',
      dataIndex: 'highestPrice',
      align: 'center',
    },
    {
      title: 'THẤP NHẤT',
      key: 'lowestPrice',
      dataIndex: 'lowestPrice',
      align: 'center',
    },
    {
      title: 'ĐÓNG CỬA',
      key: 'closePrice',
      dataIndex: 'closePrice',
      align: 'center',
    },
    {
      title: 'TRUNG BÌNH',
      key: 'averagePrice',
      dataIndex: 'averagePrice',
      align: 'center',
    },
    {
      title: 'ĐÓNG CỬA ĐC',
      key: 'closePriceAdjusted',
      dataIndex: 'closePriceAdjusted',
      align: 'center',
    },
    {
      title: 'KL GDTT',
      key: 'totalDealVol',
      dataIndex: 'totalDealVol',
      align: 'center',
    },
    {
      title: 'GIÁ TRỊ GDTT',
      key: 'totalDealVal',
      dataIndex: 'totalDealVal',
      align: 'center',
    },
    {
      title: 'KL GDKL',
      key: 'totalMatchVol',
      dataIndex: 'totalMatchVol',
      align: 'center',
    },
    {
      title: 'GIÁ TRỊ GDKL',
      key: 'totalMatchVal',
      dataIndex: 'totalMatchVal',
      align: 'center',
    },
  ];

  const columns_02: ColumnsType<any> = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NGÀY',
      key: 'day',
      dataIndex: 'tradingDate',
      render: (text: string) => {
        return <span style={{ color: '#3594EF' }}>{text}</span>;
      },
    },
    {
      title: 'ROOM NG',
      key: 'foreignCurrentRoom',
      dataIndex: 'foreignCurrentRoom',
    },
    {
      title: 'KHỐI LƯỢNG',
      className: 'volume-column',
      children: [
        {
          title: 'MUA',
          key: 'foreignBuyVolTotal',
          dataIndex: 'foreignBuyVolTotal',
          align: 'center',
        },
        {
          title: 'BÁN',
          key: 'foreignSellVolTotal',
          dataIndex: 'foreignSellVolTotal',
          align: 'center',
        },
        {
          title: 'MUA-BÁN',
          key: 'differentValTotal',
          dataIndex: 'differentValTotal',
          align: 'center',
          render: (text: string) => {
            const value = parseFloat(text.replace(/\./g, ''));
            let color;
            if (value < 0) {
              color = '#E43637';
            } else if (value > 0) {
              color = '#42A732';
            } else {
              color = '#CCAA00';
            }
            return <span style={{ color }}>{text}</span>;
          },
        },
      ],
    },
    {
      title: 'GIÁ TRỊ (TRIỆU)',
      children: [
        {
          title: 'MUA',
          key: 'foreignBuyValTotal',
          dataIndex: 'foreignBuyValTotal',
          align: 'center',
        },
        {
          title: 'BÁN',
          key: 'foreignSellValTotal',
          dataIndex: 'foreignSellValTotal',
          align: 'center',
        },
        {
          title: 'MUA-BÁN',
          key: 'differentValTotal',
          dataIndex: 'differentValTotal',
          align: 'center',
          render: (text: string) => {
            const value = parseFloat(text.replace(/\./g, ''));
            let color;
            if (value < 0) {
              color = '#E43637';
              return <span style={{ color }}>{text}</span>;
            } else if (value > 0) {
              color = '#42A732';
              return <span style={{ color }}>+{text}</span>;
            } else {
              color = '#CCAA00';
              return <span style={{ color }}>{text}</span>;
            }
          },
        },
      ],
    },
  ];

  const columns_03: ColumnsType<any> = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NGÀY',
      key: 'day',
      dataIndex: 'tradingDate',
      render: (text: string) => {
        return <span style={{ color: '#3594EF' }}>{text}</span>;
      },
    },
    {
      title: 'MUA',
      children: [
        {
          title: 'SỐ LƯỢNG',
          key: 'totalBuyTrade',
          dataIndex: 'totalBuyTrade',
          align: 'center',
        },
        {
          title: 'KHỐI LƯỢNG',
          key: 'totalBuyTradeVol',
          dataIndex: 'totalBuyTradeVol',
          align: 'center',
        },
      ],
    },
    {
      title: 'BÁN',
      children: [
        {
          title: 'SỐ LƯỢNG',
          key: 'totalSellTrade',
          dataIndex: 'totalSellTrade',
          align: 'center',
        },
        {
          title: 'KHỐI LƯỢNG',
          key: 'totalSellTradeVol',
          dataIndex: 'totalSellTradeVol',
          align: 'center',
        },
      ],
    },
    {
      title: 'KHỚP',
      children: [
        {
          title: 'GIÁ TRỊ',
          key: 'netBuySellVal',
          dataIndex: 'netBuySellVal',
          align: 'center',
        },
        {
          title: 'KHỐI LƯỢNG',
          key: 'netBuySellVol',
          dataIndex: 'netBuySellVol',
          align: 'center',
        },
      ],
    },
  ];

  function decodeHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find and remove all div elements with the specific style
    const divs = doc.querySelectorAll(
      'div[style="font-family: Arial; font-size: 10pt;"]'
    );
    divs.forEach((div) => {
      div.removeAttribute('style');
    });

    // Return the cleaned HTML content
    return doc.body.innerHTML;
  }
  const curTime = moment().format('DD/MM/YYYY');
  const [options, setOptions] = useState(newListCompany);

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
  const [isHovered, setIsHovered] = useState(false);

  const createDynamicColumns = (organizedData, formatDataFinancialTable) => {
    const columnsQuarter = [
      {
        title: (
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: isHovered ? 'rgba(46, 49, 56, 1)' : '#fff',
              width: '230px',
              // marginRight: '14px',
              // borderRight: '2px solid #3A3F42',
              marginLeft: '12px',
              display: 'flex',
              flexDirection: 'row',
              border: isHovered
                ? screenMode === 'dark'
                  ? '1px solid #878D9B'
                  : '1px solid #818498'
                : screenMode === 'dark'
                  ? '1px solid #3A3F42'
                  : '1px solid #D5D7DC',
              padding: '4px 12px',
              marginBottom: '53px',
              borderRadius: '6px',
            }}
            onClick={() => setSortFinancial(!sortFinancial)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: screenMode === 'light' ? 'rgba(46, 49, 56, 1)' : '#fff',
                // width: '170px',
                // marginRight: '14px',
                // borderRight: '2px solid #3A3F42',

                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4px',
                cursor: 'pointer',

                borderRadius: '4px',
                padding: '4px 4px 4px 8px',

                width: '100%',
              }}
            >
              {sortFinancial ? (
                <span>Sắp xếp giảm dần</span>
              ) : (
                <span>Sắp xếp tăng dần</span>
              )}
              {screenMode === 'dark' ? (
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
                    d="M0.528921 0.52827C0.78927 0.26792 1.21138 0.26792 1.47173 0.52827L5.00033 4.05687L8.52892 0.52827C8.78927 0.26792 9.21138 0.26792 9.47173 0.52827C9.73208 0.788619 9.73208 1.21073 9.47173 1.47108L5.47173 5.47108C5.21138 5.73143 4.78927 5.73143 4.52892 5.47108L0.528921 1.47108C0.268571 1.21073 0.268571 0.788619 0.528921 0.52827Z"
                    fill="#fff"
                  ></path>
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
                    d="M0.528921 0.52827C0.78927 0.26792 1.21138 0.26792 1.47173 0.52827L5.00033 4.05687L8.52892 0.52827C8.78927 0.26792 9.21138 0.26792 9.47173 0.52827C9.73208 0.788619 9.73208 1.21073 9.47173 1.47108L5.47173 5.47108C5.21138 5.73143 4.78927 5.73143 4.52892 5.47108L0.528921 1.47108C0.268571 1.21073 0.268571 0.788619 0.528921 0.52827Z"
                    fill="rgba(116, 123, 139, 1)"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        ),
        fixed: 'left',
        width: 300,
        dataIndex: 'key',
        key: 'key',
        onHeaderCell: () => {
          return {
            style: {
              borderRight:
                screenMode === 'dark' ? '1px solid #33343C' : '1px solid #ccc',
              backgroundColor: 'transparent',
            },
          };
        },
        onCell: (record, rowIndex) => {
          return {
            style: {
              borderRight:
                screenMode === 'dark' ? '1px solid #33343C' : '1px solid #ccc',
              backgroundColor: 'transparent',
            },
          };
        },
        render: (text) => {
          const displayNames = {
            EV_EBITDA: 'EV/EBITDA',
            Von_hoa: 'Vốn hoá (Nghìn tỷ)',
            So_cp: 'Số CP lưu hành (Triệu CP)',
            Doanh_thu: 'Doanh thu (Nghìn tỷ)',
            Tang_truong_doanh_thu: 'Tăng trưởng doanh thu (%)',
            Loi_nhuan_sau_thue: 'Lợi nhuận sau thuế (Nghìn tỷ)',
            Tang_truong_doanh_thu_percent: 'Tăng trưởng doanh thu (%)',
            Bien_EDIT_percent: 'Biên EBIT (%)',
            ROE: 'ROE (%)',
            ROIC: 'ROIC (%)',
            Bien_loi_nhuan_rong_percent: 'Biên lợi nhuận ròng (%)',
            Bien_loi_nhuan_gop_percent: 'Biên lợi nhuận gộp (%)',
            Chi_so_thanh_toan_hien_tai: 'Chỉ số thanh toán hiện tại',
            Chi_so_thanh_toan_tien_mat: 'Chỉ số thanh toán tiền mặt',
            Chi_so_thanh_toan_nhanh: 'Chỉ số thanh toán nhanh',
            Kha_nang_chi_tra_lai_vay: 'Khả năng chi trả lãi vay (%)',
            Vong_quay_tai_san: 'Vòng quay tài sản',
            Vong_quay_tai_san_CD: 'Vòng quay TSCĐ',
            So_ngay_thu_tien_binh_quan: 'Số ngày thu tiền bình quân',
            So_ngay_ton_kho_binh_quan: 'Số ngày tồn kho bình quân',

            So_ngay_thanh_toan_binh_quan: 'Số ngày thanh toán bình quân',
            Chu_ky_tien: 'Chu kỳ tiền',
            No_VCSH: 'Nợ/VCSH',
            Vay_NH_DH_VCSH: '(Vay NH+DH)/VCSH',
            Don_bay_tai_chinh: 'Đòn bẩy tài chính',
          };

          return text.length > 25 ? (
            <Tooltip title={displayNames[text] || text}>
              <span>{(displayNames[text] || text).slice(0, 25) + '...'}</span>
            </Tooltip>
          ) : (
            <span>{displayNames[text] || text}</span>
          );
        },
      },
    ];

    let years = Object.keys(organizedData);
    if (sortFinancial) {
      years.reverse();
    }

    years.forEach((year, index, array) => {
      const isLastYear = index === array.length - 1;
      let quarters = Object.keys(organizedData[year]);
      if (sortFinancial) {
        quarters.reverse();
      }

      const yearColumn = {
        title: year,
        children: [],
        onHeaderCell: () => {
          return {
            style: {
              borderRight:
                screenMode === 'dark'
                  ? '1px solid #33343C '
                  : '1px solid #ccc ',
              borderBottom:
                screenMode === 'dark'
                  ? '1px solid #33343C '
                  : '1px solid #ccc ',
              color: screenMode === 'dark' ? '#fff' : 'rgb(32, 33, 39)',
              backgroundColor: 'transparent',
              fontWeight: 500,
            },
          };
        },
      };

      quarters.forEach((quarter, quarterIndex, quarterArray) => {
        const isLastQuarter = quarterIndex === quarterArray.length - 1;

        // Kiểm tra nếu quý có dữ liệu hoặc không có dữ liệu (ẩn cột nếu không có data)
        const hasData = organizedData[year][quarter].some((item) =>
          Object.values(item).some((value) => value !== null && value !== '')
        );

        if (hasData) {
          yearColumn.children.push({
            title: quarter,
            dataIndex: quarter,
            key: `${year}-${quarter}`,
            className: isLastQuarter && isLastYear ? 'last-quarter-column' : '',
            render: (text, record) => {
              return organizedData[year][quarter]
                .map((item) => item[record?.key])
                .join(', ');
            },
            onHeaderCell: (column) => {
              return {
                style: {
                  borderLeft:
                    isLastQuarter && isLastYear ? '1px solid #33343C ' : '',
                  borderRight: isLastQuarter
                    ? screenMode === 'dark'
                      ? '1px solid #33343C '
                      : '1px solid #ccc '
                    : '',
                  backgroundColor: 'transparent',
                  color: screenMode === 'dark' ? '#fff' : 'rgb(32, 33, 39)',
                },
              };
            },
            onCell: (record, rowIndex) => {
              return {
                style: {
                  borderLeft:
                    isLastQuarter && isLastYear ? '1px solid #33343C ' : '',
                  borderRight:
                    screenMode === 'dark'
                      ? isLastQuarter
                        ? '1px solid #33343C '
                        : ''
                      : isLastQuarter
                        ? '1px solid #ccc '
                        : '',
                  backgroundColor: 'transparent',
                },
              };
            },
          });
        }
      });

      columnsQuarter.push(yearColumn);
    });

    return columnsQuarter;
  };

  let data = [];
  if (
    formatDataFinancialTable &&
    typeof formatDataFinancialTable[0] === 'object' &&
    formatDataFinancialTable[0] !== null
  ) {
    data = Object.keys(formatDataFinancialTable[0])
      .filter((key) => key !== 'time')
      .map((key) => ({
        key: key,
        platform: 'iOS',
      }));
  }

  const dynamicColumns = createDynamicColumns(
    organizedData,
    formatDataFinancialTable
  );
  return (
    <StyledAnalysis screen_mode={screenMode}>
      <div className="left-analysis">
        <div className="company-infomation">
          <div className="company-list">
            <Select
              style={{ width: '100%' }}
              showSearch
              defaultValue="VIC"
              onChange={handleSelectCompany}
              onSearch={handleSearch}
              filterOption={false}
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
          <div className="company">
            {/* <img src={icons.LOGO_COMPANY} alt="COMPANY_LOGO" /> */}
            <img
              // style={{
              //   backgroundColor:
              //     screenMode === 'dark' ? 'rgba(48, 50, 59, 1)' : '#ECECEF',
              // }}
              src={`https://cdn02.wigroup.vn/logo_company/${company}.jpeg`}
              alt="COMPANY_LOGO"
            />
            <div className="company-code">
              <span>{companyData?.symbol}</span>
              <span style={{ minWidth: '100px' }}>{companyData?.exchange}</span>
            </div>
          </div>
          <div className="company-name">{companyData?.companyName}</div>
          <div className="business-areas">
            <div>{companyData?.industryName}</div>
            <div>{companyData?.superSector}</div>
          </div>
          <div className="cash-flow">
            <div className="cash-flow-details">
              <span style={{ minWidth: '100px' }}>Tên công ty:</span>
              <Tooltip title={companyData?.companyName}>
                <span>
                  {companyData?.companyName?.length > 42
                    ? `${companyData?.companyName.slice(0, 42)}...`
                    : companyData?.companyName}
                </span>
              </Tooltip>
            </div>
            <div className="cash-flow-details">
              <span>Vốn điều lệ:</span>
              <span>
                {/* {parseFloat(companyData?.charterCapital).toLocaleString(
                  'de-DE'
                )} */}
                {formatToBillion(companyData?.charterCapital)}
              </span>
            </div>
          </div>
          <div className="company-description">
            <span
              dangerouslySetInnerHTML={{ __html: decodeHtml(textToShow) }}
            />

            <span onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Thu gọn' : 'Xem thêm'}
              {'     '}
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
                  d="M0.528921 0.52827C0.78927 0.26792 1.21138 0.26792 1.47173 0.52827L5.00033 4.05687L8.52892 0.52827C8.78927 0.26792 9.21138 0.26792 9.47173 0.52827C9.73208 0.788619 9.73208 1.21073 9.47173 1.47108L5.47173 5.47108C5.21138 5.73143 4.78927 5.73143 4.52892 5.47108L0.528921 1.47108C0.268571 1.21073 0.268571 0.788619 0.528921 0.52827Z"
                  fill={
                    screenMode === 'dark' ? '#99BAFF' : 'rgba(0, 74, 234, 1)'
                  }
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="right-analysis">
        <div className="company-financial">
          <div className="content-wrapper">
            <div
              style={{
                padding:
                  valueTab === 'financial-chart'
                    ? '4px 24px 0px 24px'
                    : '4px 24px 24px 24px',
              }}
              className="general-stock"
            >
              <Tabs
                // defaultActiveKey="1"
                activeKey={valueTab}
                items={items}
                onChange={handleAnalysisChange}
                className={
                  valueTab === 'financial-chart' ? 'tab-chart' : 'normal'
                }
              />
              {valueTab === 'general' && (
                <div className="box-stock">
                  <div className="number-stock">
                    <div className="stock-price">
                      <div className="stock-price-children">
                        {openStock === true && !!socketData ? (
                          <div className="infomation">
                            <span>
                              {socketData?.LastPrice?.toLocaleString('de-DE')}
                            </span>
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
                              {parseFloat(
                                dataClosedSession?.ClosePrice
                              )?.toLocaleString('de-DE')}
                            </span>
                            {/* <span style={{ color: isGreen ? '#42A732' : '#E43637' }}>
                      {dataClosedSession?.PriceChange}
                    </span> */}
                            <span></span>
                            <span
                              style={{
                                padding: '4px 8px',
                                backgroundColor:
                                  screenMode === 'dark'
                                    ? isGreen
                                      ? 'rgba(92, 214, 128, 1)'
                                      : 'rgba(89, 43, 38, 1)'
                                    : isGreen
                                      ? 'rgba(92, 214, 128, 1)'
                                      : '#F0DDDB ',
                                color: isGreen
                                  ? '#fff'
                                  : 'rgba(209, 84, 73, 1)',
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
                          <span>TT mở cửa</span>
                        ) : (
                          <span>TT đóng cửa</span>
                        )}
                      </div>
                    </div>
                    {openStock === true ? (
                      <div className="limit-price">
                        <div className="lowest-price">
                          <span>Giá thấp nhất:</span>
                          <span>
                            {socketData?.Low?.toLocaleString('de-DE')}
                          </span>
                        </div>
                        <div className="highest-price">
                          <span>Giá cao nhất:</span>
                          <span>
                            {socketData?.High?.toLocaleString('de-DE')}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="limit-price">
                        <div className="lowest-price">
                          <span>Giá thấp nhất:</span>
                          <span>
                            {parseFloat(
                              dataClosedSession?.LowestPrice
                            )?.toLocaleString('de-DE')}
                          </span>
                        </div>
                        <div className="highest-price">
                          <span>Giá cao nhất:</span>
                          <span>
                            {parseFloat(
                              dataClosedSession?.HighestPrice
                            )?.toLocaleString('de-DE')}
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
                                      fill={
                                        screenMode === 'dark'
                                          ? '#ABADBA'
                                          : 'rgba(116, 123, 139, 1)'
                                      }
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
                                    fill={
                                      screenMode === 'dark'
                                        ? '#ABADBA'
                                        : 'rgba(116, 123, 139, 1)'
                                    }
                                  />
                                </svg>{' '}
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
                                    fill={
                                      screenMode === 'dark'
                                        ? '#ABADBA'
                                        : 'rgba(116, 123, 139, 1)'
                                    }
                                  />
                                </svg>{' '}
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
              )}
              {valueTab === 'profile' && (
                <div className="company-introduce">
                  <div className="wrapper-information">
                    <div className="vic-table">
                      <div>Thông tin cơ bản</div>
                      <div className="box-info">
                        <div className="left">
                          <table>
                            <tbody>
                              {COMPANY_DATA.slice(0, 3).map((item, i) => (
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
                                        fill={
                                          screenMode === 'dark'
                                            ? '#ABADBA'
                                            : 'rgba(116, 123, 139, 1)'
                                        }
                                      />
                                    </svg>{' '}
                                    {item.label}:
                                  </td>
                                  <td>{item.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="right">
                          <table>
                            <tbody>
                              {COMPANY_DATA.slice(3).map((item, i) => (
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
                                        fill={
                                          screenMode === 'dark'
                                            ? '#ABADBA'
                                            : 'rgba(116, 123, 139, 1)'
                                        }
                                      />
                                    </svg>{' '}
                                    {item.label}:
                                  </td>
                                  <td>{item.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="vic-table">
                      <div>Thông tin niêm yết</div>
                      <div className="box-info">
                        <div className="left">
                          <table>
                            <tbody>
                              {LISTING_INFORMATION.slice(0, 3).map(
                                (item, i) => (
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
                                          fill={
                                            screenMode === 'dark'
                                              ? '#ABADBA'
                                              : 'rgba(116, 123, 139, 1)'
                                          }
                                        />
                                      </svg>{' '}
                                      {item.label}:
                                    </td>
                                    <td>{item.value}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className="right">
                          <table>
                            <tbody>
                              {LISTING_INFORMATION.slice(3).map((item, i) => (
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
                                        fill={
                                          screenMode === 'dark'
                                            ? '#ABADBA'
                                            : 'rgba(116, 123, 139, 1)'
                                        }
                                      />
                                    </svg>{' '}
                                    {item.label}:
                                  </td>
                                  <td>{item.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {valueTab === 'financial' && (
                <div className="wrapper-financial">
                  {DATA_FINANCIAL_TABLE[10]?.secondColumn === 'NaN' ? (
                    <div className="table-no-data">
                      <Empty />
                    </div>
                  ) : (
                    <div className="financial">
                      <div className="table">
                        <Table
                          width="100%"
                          columns={dynamicColumns}
                          dataSource={data}
                          pagination={{
                            defaultPageSize: 30,

                            // total: totalFin,
                          }}
                          // onChange={handleChange}
                          scroll={{ x: 'max-content' }}
                          sticky={true}
                        />
                      </div>
                      <div className="note">
                        <span>*Lưu ý:</span>
                        <span>
                          Tăng trưởng được tính dựa trên các dữ liệu thu thập
                          cùng kỳ của các năm trước đó và các dữ liệu ngành dựa
                          theo chuẩn phân ngành cấp 3 ICB.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {valueTab === 'general' && (
              <div className="box-content-general">
                <div className="analysis-tabs">
                  <div className="title-analysis">Báo cáo phân tích</div>
                  <div className="analysis-report">
                    {listAnalysisReport?.map((item, i) => (
                      <a
                        target="_blank"
                        href={item?.attachedLink}
                        className="analysis-report-children"
                        key={i}
                      >
                        <div className="icon-child">
                          <svg
                            width="14"
                            height="18"
                            viewBox="0 0 14 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.375 11.5H7.625V14H6.375V11.5ZM9.5 10.25H10.75V14H9.5V10.25ZM3.25 7.75H4.5V14H3.25V7.75Z"
                              fill={
                                screenMode === 'dark'
                                  ? '#ABADBA'
                                  : 'rgba(116, 123, 139, 1)'
                              }
                            />
                            <path
                              d="M12.625 2.125H10.75V1.5C10.75 1.16848 10.6183 0.850537 10.3839 0.616116C10.1495 0.381696 9.83152 0.25 9.5 0.25H4.5C4.16848 0.25 3.85054 0.381696 3.61612 0.616116C3.3817 0.850537 3.25 1.16848 3.25 1.5V2.125H1.375C1.04348 2.125 0.725537 2.2567 0.491116 2.49112C0.256696 2.72554 0.125 3.04348 0.125 3.375V16.5C0.125 16.8315 0.256696 17.1495 0.491116 17.3839C0.725537 17.6183 1.04348 17.75 1.375 17.75H12.625C12.9565 17.75 13.2745 17.6183 13.5089 17.3839C13.7433 17.1495 13.875 16.8315 13.875 16.5V3.375C13.875 3.04348 13.7433 2.72554 13.5089 2.49112C13.2745 2.2567 12.9565 2.125 12.625 2.125ZM4.5 1.5H9.5V4H4.5V1.5ZM12.625 16.5H1.375V3.375H3.25V5.25H10.75V3.375H12.625V16.5Z"
                              fill={
                                screenMode === 'dark'
                                  ? '#ABADBA'
                                  : 'rgba(116, 123, 139, 1)'
                              }
                            />
                          </svg>
                        </div>

                        <div className="item-child">
                          <div className="title">{item.title}</div>
                          <div className="post-time">
                            <div>
                              <span
                                style={{
                                  color:
                                    screenMode === 'dark'
                                      ? 'rgba(153, 186, 255, 1)'
                                      : 'rgba(0, 74, 234, 1)',
                                }}
                              >
                                {item.source}
                              </span>
                            </div>
                            <div className="time">
                              <span>
                                {moment().format('DD/MM/YYYY', item.issueDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="news">
                  <div className="title">Tin tức sự kiện</div>
                  <div className="boxlist-news">
                    {newsData.map((item, i) => {
                      let [date, time] = item.createDate.split(' ');
                      return (
                        <a
                          href={item.newsSourceLink}
                          target="_blank"
                          className="posts"
                          key={i}
                        >
                          {/* <img src={icons.BIG_LOGO_COMPANY_ICON} alt="LOGO_COMPANY" /> */}
                          <img
                            style={{
                              // height: '100px',
                              // width: '100px',
                              // minWidth: '100px',
                              width: '100px',
                              objectFit: 'contain',
                              backgroundColor:
                                screenMode === 'dark' ? '#202127' : '#ECECEF',
                            }}
                            src={`https://cdn02.wigroup.vn/logo_company/${company}.jpeg`}
                            alt="COMPANY_LOGO"
                          />
                          <div className="post" style={{ width: '411px' }}>
                            <a href={item.newsSourceLink} target="_blank">
                              <div className="post-title">
                                {item.title?.length > 40
                                  ? `${item.title.slice(0, 40)}...`
                                  : item.title}
                              </div>
                            </a>
                            <div className="content">
                              {item.shortContent?.length > 112
                                ? `${item.shortContent.slice(0, 112)}...`
                                : item.shortContent}
                            </div>
                            {/* <div className="content">{item.shortContent}</div> */}
                            <div className="post-time">
                              <div>{item.sourceCode}</div>
                              <div className="time">{date}</div>
                              {/* <div className="time">
                          <img
                            src={icons.BLUE_CLOCK_ICON}
                            alt="BLUE_CLOCK_ICON"
                          />
                          <span>{time}</span>
                        </div> */}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="analysis-tabs">
                  <div className="title-analysis">Download BC</div>

                  <div className="download-report">
                    <div className="column-report">
                      <span>#</span>
                      <span>Năm</span>
                      <span>Tài liệu</span>
                      <span></span>
                    </div>
                    {downloadReportMap
                      ?.sort((a, b) => {
                        return +b?.yearReport - +a?.yearReport;
                      })
                      ?.map((item, i) => (
                        <div className="row-record" key={i}>
                          <span>{i + 1}</span>
                          <span>{item?.yearReport}</span>
                          <span>
                            <Tooltip
                              title={item?.title?.slice(
                                20,
                                item?.title?.length - 4
                              )}
                            >
                              {item?.title?.slice(20, item?.title?.length - 4)
                                .length > 40
                                ? `${item?.title?.slice(20, item?.title?.length - 4).slice(0, 40)}...`
                                : item?.title?.slice(
                                    20,
                                    item?.title?.length - 4
                                  )}
                            </Tooltip>
                          </span>
                          {item.sourceUrl === '' ? (
                            <span></span>
                          ) : (
                            <span>
                              <a href={item.sourceUrl} target="_blank">
                                <svg
                                  width="17"
                                  height="18"
                                  viewBox="0 0 17 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.50033 13.2587L4.28723 9.04675L5.13009 8.18961L7.90509 10.9646V0.666992H9.09556V10.9646L11.8694 8.1908L12.7134 9.04675L8.50033 13.2587ZM2.0908 17.3337C1.54239 17.3337 1.08485 17.1503 0.718183 16.7837C0.351516 16.417 0.167786 15.9591 0.166992 15.4099V12.5253H1.35747V15.4099C1.35747 15.5932 1.43366 15.7614 1.58604 15.9146C1.73842 16.0678 1.90628 16.144 2.08961 16.1432H14.911C15.0936 16.1432 15.2614 16.067 15.4146 15.9146C15.5678 15.7622 15.644 15.594 15.6432 15.4099V12.5253H16.8337V15.4099C16.8337 15.9583 16.6503 16.4158 16.2837 16.7825C15.917 17.1491 15.4591 17.3329 14.9099 17.3337H2.0908Z"
                                    fill={
                                      screenMode === 'dark'
                                        ? '#99BAFF'
                                        : 'rgba(0, 74, 234, 1)'
                                    }
                                  />
                                </svg>
                              </a>
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {valueTab === 'profile' && (
          <div className="wrapper-profile">
            <div className="profile">
              <div className="children-company-01">
                {shareholderStructure?.length === 0 ? (
                  <div className="table-no-data">
                    <Empty />
                  </div>
                ) : (
                  <div className="shareholder-box">
                    <div className="table-list-shareholder">
                      <div className="title1">Cổ đông</div>

                      <div className="header">
                        {CHILDREN_SHAREHOLDER_COLUMN.map(
                          (item: any, i: number) => (
                            <div className="item" key={i}>
                              {item.column}
                            </div>
                          )
                        )}
                      </div>
                      <div className="body-tb">
                        {shareholderStructure.map((item: any, i: number) => (
                          <div className="item-tb" key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {item?.isIndividual ? 'Cá nhân' : 'Tổ chức'}
                            </td>
                            <td>
                              <Tooltip title={item?.name}>
                                {item?.name.length > 25
                                  ? `${item?.name.slice(0, 25)}...`
                                  : item?.name}
                              </Tooltip>
                            </td>
                            <td>{item?.shares}</td>
                            <td>{(item?.ownership * 100)?.toFixed(2)}%</td>
                            <td>
                              {moment(item?.updatedDate).format('DD/MM/YYYY')}
                            </td>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="chart">
                      <div className="title2">Cơ cấu cổ đông</div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={config}
                        ref={chartRef}
                      />{' '}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {valueTab === 'profile' && (
          <div className="connect">
            <div className="box-company-connection">
              <div className="children-company-01">
                <div className="title-company-01">
                  <div className="company-child">Công ty con</div>
                </div>
                {newSubCompany?.length === 0 ? (
                  <div className="table-no-data">
                    <Empty />
                  </div>
                ) : (
                  <div className="table-list">
                    <div className="header">
                      {CHILDREN_COMPANY_COLUMN.map((item: any, i: number) => (
                        <div className="item" key={i}>
                          {item.column}
                        </div>
                      ))}
                    </div>
                    <div className="body-tb">
                      {newSubCompany.map((item: any, i: number) => (
                        <div className="item-tb" key={i}>
                          <td>{i + 1}</td>
                          <Tooltip title={item?.childCompanyName}>
                            <td>
                              {item.childCompanyName.length > 30
                                ? `${item.childCompanyName.slice(0, 30)}...`
                                : item.childCompanyName}
                              {/* {item.childCompanyName} */}
                            </td>
                          </Tooltip>
                          <td>{item.charterCapital}</td>
                          <td>
                            {Math.floor(parseFloat(item.percentage) * 100)}%
                          </td>
                          <td>
                            {Math.floor(parseFloat(item.percentage) * 100)}%
                          </td>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="children-company-02">
                <div>CÔNG TY LIÊN KẾT</div>
                {newAssociatedCompany?.length === 0 ? (
                  <div className="table-no-data">
                    <Empty />
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        {ASSOCIATED_COMPANY_COLUMN.map(
                          (item: any, i: number) => (
                            <th key={i}>{item.column}</th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {newAssociatedCompany.map((item: any, i: number) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.childSymbol}</td>
                          <td>{item.childCompanyName}</td>
                          <td>{item.charterCapital}</td>
                          <td>
                            {Math.floor(parseFloat(item.percentage) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="leadership">
              <div>Ban lãnh đạo</div>
              <div className="leadership-list">
                <Flex wrap gap="small" justify="start">
                  {leadership.map((item, i) => (
                    <div key={i}>
                      <div className="leadership-children">
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.6667 0.333984C7.46167 0.333984 0 7.79565 0 17.0007C0 26.2057 7.46167 33.6673 16.6667 33.6673C25.8717 33.6673 33.3333 26.2057 33.3333 17.0007C33.3333 7.79565 25.8717 0.333984 16.6667 0.333984ZM10.8333 12.834C10.8333 12.0679 10.9842 11.3094 11.2774 10.6017C11.5705 9.89393 12.0002 9.25087 12.5419 8.70919C13.0836 8.16752 13.7266 7.73784 14.4343 7.44469C15.1421 7.15153 15.9006 7.00065 16.6667 7.00065C17.4327 7.00065 18.1913 7.15153 18.899 7.44469C19.6067 7.73784 20.2498 8.16752 20.7915 8.70919C21.3331 9.25087 21.7628 9.89393 22.056 10.6017C22.3491 11.3094 22.5 12.0679 22.5 12.834C22.5 14.3811 21.8854 15.8648 20.7915 16.9588C19.6975 18.0527 18.2138 18.6673 16.6667 18.6673C15.1196 18.6673 13.6358 18.0527 12.5419 16.9588C11.4479 15.8648 10.8333 14.3811 10.8333 12.834ZM27.0967 25.3073C25.8486 26.8762 24.2625 28.1431 22.4565 29.0135C20.6506 29.8839 18.6714 30.3352 16.6667 30.334C14.6619 30.3352 12.6827 29.8839 10.8768 29.0135C9.07082 28.1431 7.48468 26.8762 6.23667 25.3073C8.93833 23.369 12.625 22.0007 16.6667 22.0007C20.7083 22.0007 24.395 23.369 27.0967 25.3073Z"
                            fill={
                              screenMode === 'dark'
                                ? '#575A6A'
                                : 'rgba(177, 181, 190, 1)'
                            }
                          />
                        </svg>
                        <div>
                          <span>{item.fullName}</span>
                          <span>
                            <Tooltip title={item?.positionName}>
                              {item.positionName.length > 10
                                ? `${item.positionName.slice(0, 10)}...`
                                : item.positionName}
                            </Tooltip>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Flex>
              </div>
            </div>
          </div>
        )}

        {valueTab === 'transaction' && (
          <div className="transaction">
            <div className="transaction-header">
              <div className="search">
                <div className="time">
                  <span>Từ ngày</span>
                  <DatePicker
                    className="date-picker"
                    placeholder="Nhập ngày..."
                    onChange={handleDateStart}
                    allowClear
                  />
                </div>
                <div className="time">
                  <span>Đến ngày</span>
                  <DatePicker
                    className="date-picker"
                    placeholder="Nhập ngày..."
                    onChange={handleDateEnd}
                  />
                </div>
                <Button type="primary" onClick={handleSearchStatistic}>
                  Tìm kiếm
                  <img src={icons.SEARCH_WHITE_ICON} alt="SEARCH_WHITE_ICON" />
                </Button>
              </div>
              <div className="transaction-tabs">
                <Tabs
                  items={TRANSACTION_TABS}
                  onChange={handleChangeTransaction}
                />
              </div>
            </div>

            {transaction === 'past_price' && (
              <div className="past_price">
                <Table
                  rowKey={(record) => record.tradingDate + record.priceChange}
                  columns={columns_01}
                  dataSource={dataStatistic_01}
                  pagination={{
                    position: ['bottomCenter'],
                    current: current,
                    pageSize: pageSize,
                    total: total,
                  }}
                  onChange={handleTableChange}
                  rowClassName={(record, index) =>
                    index % 2 !== 0 ? '' : 'odd-row'
                  }
                />
              </div>
            )}

            {transaction === 'government' && (
              <div className="past_price">
                <Table
                  rowKey={(record) =>
                    record.tradingDate + record.foreignBuyVolTotal
                  }
                  columns={columns_02}
                  dataSource={dataStatistic_02}
                  pagination={{
                    position: ['bottomCenter'],
                    current: current,
                    pageSize: pageSize,
                    total: total,
                  }}
                  onChange={handleTableChange}
                  rowClassName={(record, index) =>
                    index % 2 !== 0 ? '' : 'odd-row'
                  }
                />
              </div>
            )}

            {transaction === 'supply' && (
              <div className="past_price">
                <Table
                  rowKey={(record) => record.tradingDate + record.totalBuyTrade}
                  columns={columns_03}
                  dataSource={dataStatistic_03}
                  pagination={{
                    position: ['bottomCenter'],
                    current: current,
                    pageSize: pageSize,
                    total: total,
                  }}
                  onChange={handleTableChange}
                  rowClassName={(record, index) =>
                    index % 2 !== 0 ? '' : 'odd-row'
                  }
                />
              </div>
            )}
          </div>
        )}

        {valueTab === 'financial-chart' && (
          <div className="wrapper-financial-chart">
            {companyAsset?.length === 0 ? (
              <div className="financial-chart-empty">
                <Empty />
              </div>
            ) : (
              <div className="financial-chart">
                <div className="first-layout">
                  <CustomChart
                    option={
                      checkDataResponse === 'Bảo hiểm'
                        ? DATA_PROFIT_AFTER_TAX_ENTERPRISE_CHART
                        : checkDataResponse === 'Ngân hàng'
                          ? DATA_INCOME_CHART
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? DATA_SSI_CHART
                            : DATA_NET_REVENUE_CHART
                    }
                    label={
                      checkDataResponse === 'Bảo hiểm'
                        ? 'Lợi nhuận sau thuế của doanh nghiệp'
                        : checkDataResponse === 'Dịch vụ tài chính'
                          ? 'Cơ cấu doanh thu'
                          : checkDataResponse === 'Ngân hàng'
                            ? 'Thu nhập lãi và các khoản phải thu tương tự'
                            : 'Doanh thu thuần'
                    }
                    value={
                      checkDataResponse === 'Bảo hiểm'
                        ? profitAfterTaxChangeEnterprise
                        : checkDataResponse === 'Ngân hàng'
                          ? incomeChange
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? changeKetQuaKinhDoanh1
                            : netReveNueChange
                    }
                    screenMode={screenMode}
                    handleSelectChange={
                      checkDataResponse === 'Bảo hiểm'
                        ? handleSelectProfitAfterTaxEnterprise
                        : checkDataResponse === 'Ngân hàng'
                          ? handleSelectIncome
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? handleSelectKetQuaKinhDoanh1
                            : handleSelectNetRevenue
                    }
                  />
                  <CustomChart
                    option={
                      checkDataResponse === 'Bảo hiểm'
                        ? DATA_INSURANCE_CHART
                        : checkDataResponse === 'Ngân hàng'
                          ? DATA_PROFIT_AFTER_TAX_BANK_CHART
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? KET_QUA_KINH_DOANH_SSI_CHART
                            : DATA_PROFIT_AFTER_TAX_CHART
                    }
                    label={
                      checkDataResponse === 'Bảo hiểm'
                        ? 'Doanh thu phí bảo hiểm'
                        : checkDataResponse === 'Dịch vụ tài chính'
                          ? 'Cơ cấu doanh thu'
                          : 'Lợi nhuận sau thuế'
                    }
                    screenMode={screenMode}
                    value={
                      checkDataResponse === 'Bảo hiểm'
                        ? profitInsurance
                        : checkDataResponse === 'Ngân hàng'
                          ? profitAfterTaxBankChange
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? changeKetQuaKinhDoanh2
                            : profitAfterTaxChange
                    }
                    handleSelectChange={
                      checkDataResponse === 'Bảo hiểm'
                        ? handleSelectInsurance
                        : checkDataResponse === 'Ngân hàng'
                          ? handleSelectProfitAfterBankTax
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? handleSelectKetQuaKinhDoanh2
                            : handleSelectProfitAfterTax
                    }
                  />

                  <CustomChart
                    option={
                      checkDataResponse === 'Bảo hiểm'
                        ? DATA_SHORT_FINANCIAL_ASSET_CHART
                        : checkDataResponse === 'Ngân hàng'
                          ? DATA_RISK_PROVISION_COSTS_BANK_CHART
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? CHI_PHI_HOAT_DONG_SSI_CHART
                            : PROFIT_MARGIN
                    }
                    value={
                      checkDataResponse === 'Bảo hiểm'
                        ? shortFinancialAssetChange
                        : checkDataResponse === 'Ngân hàng'
                          ? chiPhiDuPhong
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? changeKetQuaKinhDoanh3
                            : changeProfitMargin
                    }
                    label={
                      checkDataResponse === 'Bảo hiểm'
                        ? 'Đầu tư tài chính'
                        : checkDataResponse === 'Dịch vụ tài chính'
                          ? 'Chi phí hoạt động'
                          : checkDataResponse === 'Ngân hàng'
                            ? 'Chi phí dự phòng rủi ro tín dụng'
                            : 'Biên lãi'
                    }
                    screenMode={screenMode}
                    handleSelectChange={
                      checkDataResponse === 'Bảo hiểm'
                        ? handleSelectShortFinancialAssets
                        : checkDataResponse === 'Ngân hàng'
                          ? handleSelectChiPhiDuPhong
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? handleSelectKetQuaKinhDoanh3
                            : handleChangeSelectMarginChange
                    }
                  />
                  {/* <HighchartsReact
                  highcharts={Highcharts}
                  options={DATA_ASSET_CHART}
                /> */}
                </div>

                <div className="first-layout-private">
                  <CustomChart
                    option={DATA_CASH_FLOW_CHART}
                    label="Lưu chuyển tiền tệ"
                    value={cashFlowChange}
                    screenMode={screenMode}
                    handleSelectChange={handleSelectCashFlowChange}
                  />
                </div>

                <div className="first-layout">
                  <CustomChart
                    option={
                      checkDataResponse === 'Bảo hiểm'
                        ? DATA_INSURANCE_ASSET_CHART
                        : checkDataResponse === 'Ngân hàng'
                          ? DATA_BANK_ASSET_CHART
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? DATA_FINANCIAL_ASSET_CHART
                            : DATA_ASSET_CHART
                    }
                    value={
                      checkDataResponse === 'Bảo hiểm'
                        ? insuranceAssetChange
                        : checkDataResponse === 'Ngân hàng'
                          ? bankAssetChange
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? financialAssetChange
                            : assetChange
                    }
                    label={
                      checkDataResponse === 'Bảo hiểm'
                        ? 'Cơ cấu tài sản'
                        : 'Tài sản'
                    }
                    screenMode={screenMode}
                    handleSelectChange={
                      checkDataResponse === 'Bảo hiểm'
                        ? handleInsuranceAssetChange
                        : checkDataResponse === 'Ngân hàng'
                          ? handleBankAssetChange
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? handleFinancialAssetChange
                            : handleSelectAssetChange
                    }
                  />

                  <CustomChart
                    option={
                      checkDataResponse === 'Bảo hiểm'
                        ? DATA_CAPITAL_INSURANCE_CHART
                        : checkDataResponse === 'Ngân hàng'
                          ? DATA_CAPITAL_BANK_CHART
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? DATA_CAPITAL_FINANCIAL_CHART
                            : DATA_CAPITAL_CHART
                    }
                    value={
                      checkDataResponse === 'Bảo hiểm'
                        ? capitalInsuranceChange
                        : checkDataResponse === 'Ngân hàng'
                          ? capitalBankChange
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? capitalFinancialChange
                            : capitalChange
                    }
                    label="Nguồn vốn"
                    screenMode={screenMode}
                    handleSelectChange={
                      checkDataResponse === 'Bảo hiểm'
                        ? handleCapitalInsuranceChange
                        : checkDataResponse === 'Ngân hàng'
                          ? handleCapitalBankChange
                          : checkDataResponse === 'Dịch vụ tài chính'
                            ? handleCapitalFinancialChange
                            : handleSelectCapitalChange
                    }
                  />
                  {checkDataResponse === 'Ngân hàng' ? null : (
                    <CustomChart
                      option={EQUITY_DEBT}
                      value={debtRatioChange}
                      label="Hệ số nợ"
                      screenMode={screenMode}
                      handleSelectChange={handleSelectRatioChange}
                    />
                  )}

                  {/* <CustomChart
                  option={DATA_CASH_FLOW_CHART}
                  // label="LƯU CHUYỂN TIỀN TỆ"
                  screenMode={screenMode}
                  handleSelectChange={handleSelectCashFlowChange}
                />
                <CustomChart
                  option={DATA_PROFIT_BEFORE_TAX_CHART}
                  // label="CƠ CẤU LỢI NHUẬN TRƯỚC THUẾ"
                  screenMode={screenMode}
                  handleSelectChange={handleSelectProfitBeforeTax}
                /> */}
                </div>

                <div className="first-layout">
                  <CustomChart
                    option={VALUATION}
                    value={valuationChange}
                    label="Định giá P/E"
                    screenMode={screenMode}
                    handleSelectChange={handleSelectValuationChange}
                  />
                  <CustomChart
                    option={VALUATIONPB}
                    value={valuationPBChange}
                    label="Định giá P/B"
                    screenMode={screenMode}
                    handleSelectChange={handleSelectvaluationPBChange}
                  />
                  {checkDataResponse === 'Ngân hàng' ? null : (
                    <CustomChart
                      option={VALUATIONEV}
                      value={changeValuationEV}
                      label="Định giá EV/EBITDA"
                      screenMode={screenMode}
                      handleSelectChange={handleChangeSelectValuationEVChange}
                    />
                  )}

                  {/* <CustomChart
                  option={VALUATIONPB}
                  // label="NGUỒN VỐN"
                  screenMode={screenMode}
                  handleSelectChange={
                    checkDataResponse === 'Bảo hiểm'
                      ? handleCapitalInsuranceChange
                      : checkDataResponse === 'Ngân hàng'
                        ? handleCapitalBankChange
                        : checkDataResponse === 'Dịch vụ tài chính'
                          ? handleCapitalFinancialChange
                          : handleSelectCapitalChange
                  }
                />

                // <CustomChart
                //   option={EV_EBITDA}
                //   // label="LƯU CHUYỂN TIỀN TỆ"
                //   screenMode={screenMode}
                //   handleSelectChange={handleSelectCashFlowChange}
                // /> */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </StyledAnalysis>
  );
};

const Analysis: FC<ReceivedProps> = (props) => (
  <AnalysisLayout {...useAnalysis(props)} />
);

export default Analysis;
