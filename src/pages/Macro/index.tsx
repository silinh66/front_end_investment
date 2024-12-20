/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { StyledMarco } from './styled';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import iconSearch from '@assets/icons/search-marco.svg';
import axios from 'axios';
import { config } from '@/config/env';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import Item from 'antd/es/list/Item';
import HCMap from 'highcharts/modules/map';
import { TableMacro } from './TableMacro';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Tooltip, Menu, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ConvertNumberTooltipMacro } from '@/components/ConvertNumber';
import moment from 'moment';
import MapChart from './ChartVietNam';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { size } from 'lodash';
import { useLocation } from 'react-router-dom';

const { Column, ColumnGroup } = Table;

const Macro: FC = () => {
  const screenMode = useSelector(screenModeSelector);
  const [tabMenuFirst, setTabMenuFirst] = useState('GDP danh nghĩa');
  const [filteredInfo, setFilteredInfo] = useState({ name: 'GDP Danh nghĩa' });
  const [menuTitle, setMenuTitle] = useState(false);

  const [firstFinancialColumn, setFirstFinancialColumn] =
    useState<boolean>(true);
  const [secondFinancialColumn, setSecondFinancialColumn] =
    useState<boolean>(false);
  const [thirdFinancialColumn, setThirdFinancialColumn] =
    useState<boolean>(false);
  const [fourthFinancialColumn, setFourthFinancialColumn] =
    useState<boolean>(false);
  const [fifthFinancialColumn, setFifthFinancialColumn] =
    useState<boolean>(false);
  const [listItems, setListItems] = useState([]);
  const [listData, setListData] = useState([]);
  const [formattedDates, setFormattedDates] = useState([]);
  const [formattedDatesPMI, setFormattedDatesPMI] = useState([]);
  const [formattedDatesIIp, setFormattedDatesIIp] = useState([]);
  const [formattedDatesXK, setFormattedDatesXK] = useState([]);
  const [formattedDatesNK, setFormattedDatesNK] = useState([]);
  const [formattedDatesNKXK, setFormattedDatesNKXK] = useState([]);
  const [formattedDatesSurplus, setFormattedDatesSurplus] = useState([]);
  const [formattedDatesFDI, setFormattedDatesFDI] = useState([]);
  const [formattedDatesFDI2, setFormattedDatesFDI2] = useState([]);
  const [formattedDatesTotalCapital, setFormattedDatesTotalCapital] = useState(
    []
  );
  const [formattedDatesInvest, setFormattedDatesInvest] = useState([]);
  const [activeTitle, setActiveTitle] = useState('Tổng sản phẩm quốc nội');
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [listYearColumn, setListYearColumn] = useState([]);
  const [listValueColumn, setListValueColumn] = useState([]);
  const [changeSince, setChangeSince] = useState(2023);

  const [changeSince2, setChangeSince2] = useState(2023);
  const [changeSince3, setChangeSince3] = useState(2023);

  const [changeSince4, setChangeSince4] = useState(2023);

  const [listTime1, setListTime1] = useState([]);
  const [listTime2, setListTime2] = useState([]);
  const [listTime3, setListTime3] = useState([]);
  const [listTime4, setListTime4] = useState([]);

  const [openMenuSince, setOpenMenuSince] = useState(false);
  const [openMenuSince1, setOpenMenuSince1] = useState(false);
  const [openMenuSince2, setOpenMenuSince2] = useState(false);
  const [openMenuSince3, setOpenMenuSince3] = useState(false);
  const [chart, setChart] = useState();
  const [chartCpi, setChartCpi] = useState([]);
  const [chartCpi1, setChartCpi1] = useState([]);
  const [chartGDPDanhNghia, setChartGDPDanhNghia] = useState([]);
  const [chartGDPDanhNghia1, setChartGDPDanhNghia1] = useState([]);
  const [chartGDPReal1, setChartGDPReal1] = useState([]);
  const [chartGDPReal01, setChartGDPReal01] = useState([]);
  const [chartFdi, setChartFdi] = useState([]);
  const [chartFdi2, setChartFdi2] = useState([]);
  const [chartPmi, setChartPmi] = useState([]);
  const [chartIip, setChartIip] = useState([]);
  const [chartBuy, setChartBuy] = useState([]);

  const [chartBuy1, setChartBuy1] = useState([]);
  const [chartVonDauTu, setChartVonDauTu] = useState([]);
  const [chartTotalCapital, setChartTotalCapital] = useState([]);
  const [chartExport, setExport] = useState([]);
  const [chartExport2, setExport2] = useState([]);
  const [chartExport3, setExport3] = useState([]);
  const [chartExport4, setExport4] = useState([]);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem(
        'Item 1',
        'g1',
        null,
        [getItem('Option 1', '1'), getItem('Option 2', '2')],
        'group'
      ),
      getItem(
        'Item 2',
        'g2',
        null,
        [getItem('Option 3', '3'), getItem('Option 4', '4')],
        'group'
      ),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
      ]),
    ]),

    { type: 'divider' },

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),

    getItem(
      'Group',
      'grp',
      null,
      [getItem('Option 13', '13'), getItem('Option 14', '14')],
      'group'
    ),
  ];

  const [chartRefs, setChartRefs] = useState([]);
  const [prevActiveTitle, setPrevActiveTitle] = useState(null);
  // Thêm ref cho mảng các refs biểu đồ
  const addChartRef = useCallback(
    (el) => {
      if (activeTitle !== prevActiveTitle) {
        // Nếu activeTitle thay đổi, reset mảng chartRefs
        chartRefs.current = [];
        setPrevActiveTitle(activeTitle); // Lưu giá trị activeTitle hiện tại để so sánh với lần sau
      }

      if (el && !chartRefs.current.includes(el)) {
        chartRefs.current.push(el);
      }
    },
    [activeTitle, prevActiveTitle]
  );

  // Hàm cuộn legend cho biểu đồ cụ thể
  function scrollLegend(chartIndex, direction) {
    const chart = chartRefs.current[chartIndex]?.chart;
    if (!chart || !chart.legend) {
      return;
    }
    const legend = chart.legend;

    const numberOfPages = legend.pages.length; // Lấy tổng số trang từ Highcharts

    let currentPage = legend.currentPage || 1;

    // Xác định trang mới dựa trên hướng cuộn
    if (direction === 'up' && currentPage > 1) {
      currentPage--;
    } else if (direction === 'down' && currentPage < numberOfPages) {
      currentPage++;
    }

    if (legend.currentPage !== currentPage) {
      legend.currentPage = currentPage;

      // Cập nhật chú thích để hiển thị trang mới
      legend.render();

      // Highcharts v4 và v5 có thể yêu cầu bạn tự điều chỉnh thuộc tính translateY của nhóm chú thích
      // Điều này là cần thiết nếu phiên bản của Highcharts không tự động cuộn chú thích khi bạn thay đổi currentPage
      // const translateY = -legend.pages[currentPage - 1];
      // legend.group.attr({ translateY });
    }
  }
  const getLatestYear = (data) => {
    const years = data
      ?.map((d) => moment(d.time, 'DD/MM/YYYY').year())
      .filter((year) => !isNaN(year));
    return years?.length > 0 ? Math.max(...years) : 0;
  };

  // useEffect chạy khi thay đổi activeTitle
  useEffect(() => {
    if (!listData) {
      console.error('Data is not available');
      return;
    }

    if (activeTitle === 'Tổng sản phẩm quốc nội') {
      const latestYearGDP = getLatestYear(chart?.gdpDanhNghia?.gdpDanhNghia);
      setChangeSince(latestYearGDP - 2);
      setChangeSince2(latestYearGDP - 2);

      const latestYearGDPReal = getLatestYear(chart?.gdpThuc?.gdpThuc);
      setChangeSince3(latestYearGDPReal - 2);
      setChangeSince4(latestYearGDPReal - 2);
    } else if (activeTitle === 'Bán lẻ - Tiêu dùng') {
      const latestYearRetail = getLatestYear(
        chart?.tongMucBanLeDichVu?.tongMucBanLeDichVu
      );
      setChangeSince(latestYearRetail - 1);
      setChangeSince2(latestYearRetail - 1);

      const latestYearCPI = getLatestYear(chart?.cpi?.cpi);
      setChangeSince3(latestYearCPI - 1);
      setChangeSince4(latestYearCPI - 1);
    } else if (activeTitle === 'Xuất nhập khẩu') {
      const latestYearExport = getLatestYear(chart?.xuatNhapKhau?.xuatNhapKhau);
      setChangeSince(latestYearExport - 1);
      setChangeSince2(latestYearExport - 1);
      setChangeSince3(latestYearExport - 1);
      setChangeSince4(latestYearExport - 1);
    } else if (activeTitle === 'Đầu tư công') {
      const latestYearInvestment = getLatestYear(
        chart?.vonDauTuNganSachNhaNuoc?.vonDauTuNganSachNhaNuoc
      );
      setChangeSince(latestYearInvestment - 1);
      setChangeSince2(latestYearInvestment - 1);
    } else if (activeTitle === 'FDI') {
      const latestYearFDI = getLatestYear(chart?.fdi?.fdi);
      setChangeSince(latestYearFDI - 1);
      setChangeSince2(latestYearFDI - 1);
    } else if (activeTitle === 'Sản xuất công nghiệp') {
      const latestYearPMI = getLatestYear(chart?.pmi?.pmi);
      setChangeSince(latestYearPMI - 1);

      const latestYearIIP = getLatestYear(chart?.iip?.iip);
      setChangeSince2(latestYearIIP - 1);
    }
  }, [activeTitle, listData]);
  useEffect(() => {
    if (!listData) {
      console.error('Data is not available');
      return;
    }

    if (activeTitle === 'Tổng sản phẩm quốc nội') {
      // Khởi tạo biến để chứa năm cuối cùng
      let latestYear = 0;

      const processData = (data, setListTime, setChartData, changeSince) => {
        let tempLatestYear = 0; // Biến tạm để xác định năm cuối cùng trong từng lần xử lý
        const uniqueYears = new Set();
        if (data) {
          data?.forEach((d) => {
            const date = moment(d.time, 'DD/MM/YYYY');
            if (date.isValid()) {
              const year = date.year();
              if (year > tempLatestYear) tempLatestYear = year; // Cập nhật năm cuối cùng
            }
          });

          // Cập nhật latestYear nếu cần
          if (tempLatestYear > latestYear) latestYear = tempLatestYear;

          // Thêm vào uniqueYears các năm trước của năm cuối cùng trừ 3
          data?.forEach((d) => {
            const date = moment(d.time, 'DD/MM/YYYY');
            if (date.isValid()) {
              const year = date.year();
              if (year < latestYear) {
                // Điều chỉnh ở đây
                uniqueYears.add(year);
              }
            }
          });

          const filteredData = data?.filter((d) => {
            const date = moment(d.time, 'DD/MM/YYYY');
            if (!date.isValid()) return false;

            const year = date.year();
            return year >= changeSince && year <= latestYear;
          });

          setListTime(Array.from(uniqueYears));
          setChartData(filteredData);
        }
      };

      // Xử lý từng loại dữ liệu với các bộ dữ liệu và trạng thái tương ứng
      processData(
        chart?.gdpDanhNghia?.gdpDanhNghia,
        setListTime1,
        setChartGDPDanhNghia,
        changeSince
      );
      processData(
        chart?.gdpThuc?.gdpThuc,
        setListTime3,
        setChartGDPReal1,
        changeSince3
      );

      processData(
        chart?.gdpDanhNghia?.gdpDanhNghia,
        setListTime2,
        setChartGDPDanhNghia1,
        changeSince2
      );

      processData(
        chart?.gdpThuc?.gdpThuc,
        setListTime4,
        setChartGDPReal01,
        changeSince4
      );
    } else if (activeTitle === 'Bán lẻ - Tiêu dùng') {
      // Hàm để xử lý việc tìm năm cuối cùng và cập nhật dữ liệu
      const processData = (data, setListTime, setChartData, changeSince) => {
        let latestYear = 0;
        const uniqueYears = new Set();

        if (data) {
          // Tìm năm cuối cùng
          data?.forEach((d) => {
            const date = moment(d.time, 'DD/MM/YYYY');
            if (date.isValid()) {
              const year = date.year();
              if (year > latestYear) latestYear = year;
            }
          });

          // Thêm vào uniqueYears các năm nhỏ hơn latestYear - 3
          data?.forEach((d) => {
            const date = moment(d.time, 'DD/MM/YYYY');
            if (date.isValid()) {
              const year = date.year();
              if (year < latestYear) {
                uniqueYears.add(year);
              }
            }
          });

          // Lọc dữ liệu dựa trên changeSince và latestYear
          const filteredData = data?.filter((d) => {
            const date = moment(d.time, 'DD/MM/YYYY');
            if (!date.isValid()) return false;

            const year = date.year();
            return year >= changeSince && year <= latestYear;
          });
          // const filteredData = data.filter((d) => {
          //   const date = moment(d.time, 'DD/MM/YYYY');
          //   if (!date.isValid()) return false;

          //   const year = date.year();
          //   // return year === latestYear || year === latestYear - 1;
          //   return year >= changeSince && year <= latestYear;
          // });

          // Cập nhật trạng thái
          setListTime(Array.from(uniqueYears));
          setChartData(filteredData);
        }
      };

      // Xử lý dữ liệu bán lẻ và dịch vụ
      processData(
        chart?.tongMucBanLeDichVu.tongMucBanLeDichVu,
        setListTime1,
        setChartBuy,
        changeSince
      );
      processData(
        chart?.tongMucBanLeDichVu.tongMucBanLeDichVu,
        setListTime2,
        setChartBuy1,
        changeSince2
      );

      // Xử lý dữ liệu CPI
      processData(
        chart?.cpi?.cpi,
        setListTime3, // Nếu bạn muốn mở lại dòng này
        setChartCpi,
        changeSince3
      );
      processData(
        chart?.cpi?.cpi,
        setListTime4, // Đối với cpi1 tương tự
        setChartCpi1,
        changeSince4
      );
    } else if (activeTitle === 'Xuất nhập khẩu') {
      // Đầu tiên, xác định năm cuối cùng từ dữ liệu xuatNhapKhau
      const allYears = chart?.xuatNhapKhau.xuatNhapKhau
        .map((d) =>
          moment(d.time, 'DD/MM/YYYY').isValid()
            ? moment(d.time, 'DD/MM/YYYY').year()
            : null
        )
        .filter((year) => year !== null);
      const latestYear = allYears?.length > 0 ? Math.max(...allYears) : 0;
      const thresholdYear = latestYear;

      // Hàm để xử lý việc thêm các năm và cập nhật dữ liệu
      const processData = (
        data,
        setListTime,
        setChartData,
        changeSince,
        uniqueYears
      ) => {
        data?.forEach((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          if (date.isValid()) {
            const year = date.year();
            // Chỉ thêm năm nếu nó nhỏ hơn năm ngưỡng và không phụ thuộc vào changeSince
            if (year < thresholdYear) {
              uniqueYears.add(year);
            }
          }
        });

        // Lọc dữ liệu dựa trên changeSince và latestYear
        const filteredData = data?.filter((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          if (!date.isValid()) return false;

          const year = date.year();
          return year >= changeSince && year <= latestYear;
        });

        // Cập nhật trạng thái
        setListTime(Array.from(uniqueYears));
        setChartData(filteredData);
      };

      // Khởi tạo Set cho các năm duy nhất
      const uniqueYearsXK1 = new Set();
      const uniqueYearsXK2 = new Set();
      const uniqueYearsNK1 = new Set();
      const uniqueYearsNK2 = new Set();
      // Xử lý và cập nhật cho mỗi loại dữ liệu
      processData(
        chart?.xuatNhapKhau.xuatNhapKhau,
        setListTime1,
        setExport,
        changeSince,
        uniqueYearsXK1
      );
      processData(
        chart?.xuatNhapKhau.xuatNhapKhau,
        setListTime2,
        setExport2,
        changeSince2,
        uniqueYearsXK2
      );
      processData(
        chart?.xuatNhapKhau.xuatNhapKhau,
        setListTime3,
        setExport3,
        changeSince3,
        uniqueYearsNK1
      );
      processData(
        chart?.xuatNhapKhau.xuatNhapKhau,
        setListTime4,
        setExport4,
        changeSince4,
        uniqueYearsNK2
      );
    } else if (activeTitle === 'Đầu tư công') {
      // Xác định năm cuối cùng từ dữ liệu
      const allYears = chart?.vonDauTuNganSachNhaNuoc.vonDauTuNganSachNhaNuoc
        .map((d) =>
          moment(d.time, 'DD/MM/YYYY').isValid()
            ? moment(d.time, 'DD/MM/YYYY').year()
            : null
        )
        .filter((year) => year !== null);
      const latestYear = allYears?.length > 0 ? Math.max(...allYears) : 0;
      const thresholdYear = latestYear;

      // Hàm để xử lý việc thêm các năm và cập nhật dữ liệu
      const processData = (
        data,
        setListTime,
        setChartData,
        changeSince,
        uniqueYears
      ) => {
        data?.forEach((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          if (date.isValid()) {
            const year = date.year();
            // Chỉ thêm năm nếu nó nhỏ hơn năm ngưỡng và không phụ thuộc vào changeSince
            if (year < thresholdYear) {
              uniqueYears.add(year);
            }
          }
        });

        // Lọc dữ liệu dựa trên changeSince và latestYear
        const filteredData = data?.filter((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          if (!date.isValid()) return false;

          const year = date.year();
          return year >= changeSince && year <= latestYear;
        });

        // Cập nhật trạng thái
        setListTime(Array.from(uniqueYears));
        setChartData(filteredData);
      };

      // Khởi tạo Set cho các năm duy nhất
      const uniqueYearsDautu1 = new Set();
      const uniqueYearsDautu2 = new Set();

      // Xử lý và cập nhật dữ liệu đầu tư công
      processData(
        chart?.vonDauTuNganSachNhaNuoc.vonDauTuNganSachNhaNuoc,
        setListTime1,
        setChartVonDauTu,
        changeSince,
        uniqueYearsDautu1
      );

      processData(
        chart?.vonDauTuNganSachNhaNuoc.vonDauTuNganSachNhaNuoc,
        setListTime2,
        setChartTotalCapital,
        changeSince2,
        uniqueYearsDautu2
      );
    } else if (activeTitle === 'FDI') {
      // Xác định năm cuối cùng từ dữ liệu fdi
      const allYears = chart?.fdi.fdi
        .map((d) =>
          moment(d.time, 'DD/MM/YYYY').isValid()
            ? moment(d.time, 'DD/MM/YYYY').year()
            : null
        )
        .filter((year) => year !== null);
      const latestYear = allYears?.length > 0 ? Math.max(...allYears) : 0;
      const thresholdYear = latestYear;

      // Hàm để xử lý việc thêm các năm và cập nhật dữ liệu
      const processData = (
        data,
        setListTime,
        setChartData,
        changeSince,
        uniqueYears
      ) => {
        data?.forEach((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          if (date.isValid()) {
            const year = date.year();
            // Chỉ thêm năm nếu nó nhỏ hơn năm ngưỡng và không phụ thuộc vào changeSince
            if (year < thresholdYear) {
              uniqueYears.add(year);
            }
          }
        });

        // Lọc dữ liệu dựa trên changeSince và latestYear
        const filteredData = data?.filter((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          if (!date.isValid()) return false;

          const year = date.year();
          return year >= changeSince && year <= latestYear;
        });

        // Cập nhật trạng thái
        setListTime(Array.from(uniqueYears));
        setChartData(filteredData);
      };

      // Khởi tạo Set cho các năm duy nhất
      const uniqueYearsFDI = new Set();
      const uniqueYearsFDI2 = new Set();

      // Xử lý và cập nhật dữ liệu FDI
      processData(
        chart?.fdi.fdi,
        setListTime1,
        setChartFdi,
        changeSince,
        uniqueYearsFDI
      );
      processData(
        chart?.fdi.fdi,
        setListTime2,
        setChartFdi2,
        changeSince2,
        uniqueYearsFDI2
      );
    } else if (activeTitle === 'Sản xuất công nghiệp') {
      const uniqueYearsPMI = new Set();
      const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

      // Xác định năm cuối cùng từ dữ liệu
      const years = chart?.pmi.pmi
        .map((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          return date.isValid() ? date.year() : null;
        })
        .filter((year) => year !== null);

      const latestYear = years?.length > 0 ? Math.max(...years) : currentYear;
      const thresholdYear = latestYear - 1;

      // Lọc dữ liệu PMI
      const pmi = chart?.pmi.pmi.filter((d) => {
        const date = moment(d.time, 'DD/MM/YYYY');
        if (!date.isValid()) {
          return false;
        }

        const year = date.year();
        // Thêm vào uniqueYearsPMI các năm trước của latestYear - 3
        if (year < thresholdYear) {
          uniqueYearsPMI.add(year);
        }
        return year >= changeSince && year <= latestYear;
      });

      setListTime1(Array.from(uniqueYearsPMI));
      setChartPmi(pmi);

      const uniqueYearsIIP = new Set();

      // Tương tự cho IIP, bạn cần xác định lại years và latestYear nếu dữ liệu khác
      // ...code cho IIP tương tự như PMI...
      const yearsIIP = chart?.iip.iip
        .map((d) => {
          const date = moment(d.time, 'DD/MM/YYYY');
          return date.isValid() ? date.year() : null;
        })
        .filter((year) => year !== null);

      const latestYearIIP =
        years?.length > 0 ? Math.max(...years) : currentYear;
      const thresholdYearIIP = latestYearIIP - 3;

      // Lọc dữ liệu PMI
      const iip = chart?.iip.iip.filter((d) => {
        const date = moment(d.time, 'DD/MM/YYYY');
        if (!date.isValid()) {
          return false;
        }

        const year = date.year();
        // Thêm vào uniqueYearsPMI các năm trước của latestYear - 3
        if (year < thresholdYearIIP) {
          uniqueYearsIIP.add(year);
        }
        return year >= changeSince2 && year <= latestYear;
      });
      setListTime2(Array.from(uniqueYearsIIP));
      setChartIip(iip); // Giả sử bạn đã lọc và thiết lập dữ liệu cho IIP như trên
    }
  }, [
    listData,
    changeSince,
    changeSince2,
    changeSince3,
    changeSince4,
    activeTitle,
  ]);

  const manufacture1 = [
    {
      title: 'Tổng sản phẩm quốc nội',
      des: 'GDP Danh nghĩa - GDP Thực',
      icon: (
        <svg
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.6177 0.752C13.3523 0.614553 13.0371 0.612536 12.77 0.746574L0.726693 6.78906C0.411133 6.94739 0.211914 7.27022 0.211914 7.62328V22.5846C0.211914 22.9424 0.416393 23.2686 0.738343 23.4246L12.7816 29.2587C13.0423 29.385 13.3469 29.3831 13.6059 29.2536L25.2719 23.4206C25.5881 23.2625 25.7878 22.9393 25.7878 22.5858V7.62211C25.7878 7.27336 25.5934 6.95369 25.2837 6.79332L13.6177 0.752ZM2.78111 7.54839L7.09159 5.38569L17.1844 10.5036L12.9284 12.6023L2.78111 7.54839ZM1.81191 8.85314V22.1668L12.2759 27.2359V14.0647L1.81191 8.85314ZM18.978 9.61911L8.86987 4.49347L13.1837 2.32907L23.2209 7.5269L18.978 9.61911ZM13.8759 27.3297L24.1878 22.1738V8.83405L13.8759 13.919V27.3297Z"
            fill={
              activeTitle === 'Tổng sản phẩm quốc nội'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
        </svg>
      ),
    },
    {
      title: 'Bán lẻ - Tiêu dùng',
      des: 'Tổng mức bán lẻ dịch vụ - CPI',
      icon: (
        <svg
          width="29"
          height="30"
          viewBox="0 0 29 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.1999C0 0.758075 0.358172 0.399902 0.8 0.399902H4.23399C4.65485 0.399902 5.02748 0.671842 5.15583 1.07265L6.29104 4.61749H26.7908C27.9249 4.61749 28.7166 5.7412 28.3349 6.80916L25.306 15.2836C25.0728 15.9361 24.4548 16.3715 23.7619 16.3715H10.0552L10.8561 18.8725H23.7729C24.2147 18.8725 24.5729 19.2307 24.5729 19.6725C24.5729 20.1144 24.2147 20.4725 23.7729 20.4725H10.3948C9.97397 20.4725 9.60134 20.2006 9.47299 19.7998L3.77274 1.9999H0.8C0.358172 1.9999 0 1.64173 0 1.1999ZM9.54278 14.7715H23.7619C23.7787 14.7715 23.7937 14.761 23.7994 14.7451L26.8283 6.27067C26.8319 6.26046 26.8314 6.25527 26.831 6.25227C26.8303 6.24774 26.8282 6.24123 26.8233 6.23436C26.8185 6.2275 26.8131 6.22327 26.809 6.22111C26.8064 6.21967 26.8016 6.21749 26.7908 6.21749H6.80342L9.54278 14.7715ZM11.9779 24.7732C11.0869 24.7732 10.3646 25.4955 10.3646 26.3866C10.3646 27.2776 11.0869 27.9999 11.9779 27.9999C12.869 27.9999 13.5913 27.2776 13.5913 26.3866C13.5913 25.4955 12.869 24.7732 11.9779 24.7732ZM8.7646 26.3866C8.7646 24.6119 10.2033 23.1732 11.9779 23.1732C13.7526 23.1732 15.1913 24.6119 15.1913 26.3866C15.1913 28.1612 13.7526 29.5999 11.9779 29.5999C10.2033 29.5999 8.7646 28.1612 8.7646 26.3866ZM23.7002 24.7732C22.8092 24.7732 22.0869 25.4955 22.0869 26.3866C22.0869 27.2776 22.8092 27.9999 23.7002 27.9999C24.5912 27.9999 25.3136 27.2776 25.3136 26.3866C25.3136 25.4955 24.5912 24.7732 23.7002 24.7732ZM20.4869 26.3866C20.4869 24.6119 21.9256 23.1732 23.7002 23.1732C25.4749 23.1732 26.9136 24.6119 26.9136 26.3866C26.9136 28.1612 25.4749 29.5999 23.7002 29.5999C21.9256 29.5999 20.4869 28.1612 20.4869 26.3866Z"
            fill={
              activeTitle === 'Bán lẻ - Tiêu dùng'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
        </svg>
      ),
    },

    {
      title: 'Xuất nhập khẩu',
      des: 'Xuất khẩu -  Nhập khẩu',
      icon: (
        <svg
          width="28"
          height="30"
          viewBox="0 0 28 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.69871 5.56138C1.69994 5.57221 1.70185 5.58674 1.70476 5.60468C1.71548 5.67074 1.73974 5.7825 1.79395 5.92563C1.90048 6.20695 2.13047 6.63066 2.63804 7.07742C3.65923 7.97625 5.8995 9.04588 10.7475 9.04588C15.5954 9.04588 17.8357 7.97625 18.8569 7.07742C19.3645 6.63066 19.5944 6.20695 19.701 5.92563C19.7552 5.7825 19.7794 5.67074 19.7902 5.60468C19.7931 5.58638 19.7951 5.57163 19.7963 5.56073C19.7958 5.55657 19.7952 5.55184 19.7946 5.54656L21.4948 5.54517L21.4949 5.55143L21.4949 5.55655L21.4949 5.55869L21.4949 5.56073V14.2736H20.6464C21.4949 14.2736 21.4949 14.2756 21.4949 14.2756L21.4949 14.2778L21.4949 14.2824L21.4947 14.2929L21.494 14.3189C21.4933 14.3384 21.4921 14.3622 21.49 14.3901C21.4857 14.4458 21.478 14.518 21.464 14.604C21.4361 14.7762 21.383 15.0048 21.2826 15.2701C21.0798 15.8056 20.6911 16.471 19.9613 17.1134C18.5077 18.3927 15.7985 19.5013 10.7475 19.5013C5.87979 19.5013 3.18699 18.4718 1.69697 17.252V22.9696C1.69771 22.9788 1.69975 22.9996 1.70476 23.0304C1.71548 23.0965 1.73974 23.2082 1.79395 23.3514C1.90048 23.6327 2.13047 24.0564 2.63804 24.5032C3.65923 25.402 5.8995 26.4716 10.7475 26.4716C11.2161 26.4716 11.5959 26.8617 11.5959 27.3429C11.5959 27.8241 11.2161 28.2142 10.7475 28.2142C5.69645 28.2142 2.98722 27.1056 1.53367 25.8262C0.803873 25.1839 0.41517 24.5185 0.212364 23.983C0.111898 23.7177 0.0588247 23.4891 0.0308785 23.3169C0.016907 23.2308 0.00919453 23.1587 0.00497155 23.103C0.00285926 23.0751 0.00161684 23.0512 0.000902317 23.0317L0.000183245 23.0058L4.05432e-05 22.9953L9.4404e-06 22.9907L0 22.9885C0 22.9885 0 22.9865 0.848484 22.9865H0V5.56277L0.848449 5.56073L1.69871 5.56138ZM1.69697 14.2567V8.53908C3.18699 9.75889 5.87979 10.7885 10.7475 10.7885C15.6151 10.7885 18.3079 9.75889 19.798 8.53908V14.2567C19.7972 14.2659 19.7952 14.2867 19.7902 14.3176C19.7794 14.3836 19.7552 14.4954 19.701 14.6385C19.5944 14.9198 19.3645 15.3435 18.8569 15.7903C17.8357 16.6891 15.5954 17.7588 10.7475 17.7588C5.8995 17.7588 3.65923 16.6891 2.63804 15.7903C2.13047 15.3435 1.90048 14.9198 1.79395 14.6385C1.73974 14.4954 1.71548 14.3836 1.70476 14.3176C1.69975 14.2867 1.69771 14.2659 1.69697 14.2567Z"
            fill={
              activeTitle === 'Xuất nhập khẩu'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M1.70055 5.54519L0.141379 6.2868L0.000132295 5.54519L0.000183245 5.54144L0.000902317 5.51547C0.00161684 5.49597 0.00285926 5.47213 0.00497155 5.44424C0.00919453 5.38849 0.016907 5.31638 0.0308785 5.2303C0.0588247 5.05812 0.111898 4.82953 0.212364 4.56424C0.41517 4.02873 0.803873 3.36333 1.53367 2.72098C2.98722 1.44159 5.69645 0.333008 10.7475 0.333008C15.7985 0.333008 18.5077 1.44159 19.9613 2.72098C20.6911 3.36333 21.0798 4.02873 21.2826 4.56424C21.383 4.82953 21.4361 5.05812 21.464 5.2303C21.478 5.31638 21.4857 5.38849 21.49 5.44424C21.4921 5.47213 21.4933 5.49597 21.494 5.51547L21.4947 5.54144L21.4948 5.54517L19.7946 5.54656C19.7935 5.53835 19.7919 5.52747 19.7902 5.51678C19.7794 5.45072 19.7552 5.33896 19.701 5.19583C19.5944 4.91452 19.3645 4.4908 18.8569 4.04404C17.8357 3.14521 15.5954 2.07558 10.7475 2.07558C5.8995 2.07558 3.65923 3.14521 2.63804 4.04404C2.13047 4.4908 1.90048 4.91452 1.79395 5.19583C1.73974 5.33896 1.71548 5.45072 1.70476 5.51678C1.70302 5.52748 1.70164 5.53697 1.70055 5.54519Z"
            fill={
              activeTitle === 'Xuất nhập khẩu'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M21.4949 25.3099L21.4978 25.3099H25.1031L22.3091 28.179C21.9778 28.5192 21.9778 29.0709 22.3091 29.4111C22.6405 29.7514 23.1777 29.7514 23.5091 29.4111L27.7515 25.0547C28.0828 24.7144 28.0828 24.1628 27.7515 23.8225L23.5091 19.4661C23.1777 19.1258 22.6405 19.1258 22.3091 19.4661C21.9778 19.8063 21.9778 20.358 22.3091 20.6983L25.1031 23.5673H18.6667L18.664 23.5673H15.0585L17.8524 20.6983C18.1838 20.358 18.1838 19.8063 17.8524 19.4661C17.5211 19.1258 16.9839 19.1258 16.6525 19.4661L12.4101 23.8225C12.0787 24.1628 12.0787 24.7145 12.4101 25.0547L16.6525 29.4111C16.9839 29.7514 17.5211 29.7514 17.8524 29.4111C18.1838 29.0709 18.1838 28.5192 17.8524 28.179L15.0585 25.3099H21.4949Z"
            fill={
              activeTitle === 'Xuất nhập khẩu'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
        </svg>
      ),
    },
    {
      title: 'Đầu tư công',
      des: 'Vốn ngân sách nhà nước',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0198 1.09205C12.7337 0.913241 12.3714 0.910572 12.0827 1.08514L0.433312 8.12927C-0.341817 8.59798 -0.00955931 9.78962 0.896271 9.78962H2.08123V24.328H1.78391C1.28977 24.328 0.889192 24.7286 0.889192 25.2227V28.7726C0.889192 29.2667 1.28977 29.6673 1.78391 29.6673H14.8801C15.3036 29.6673 15.647 29.3239 15.647 28.9004C15.647 28.4768 15.3036 28.1335 14.8801 28.1335H2.42299V25.8618H14.0526C14.4762 25.8618 14.8195 25.5184 14.8195 25.0949C14.8195 24.9605 14.7849 24.8341 14.7242 24.7242V9.78962H17.8416V13.9083C17.8416 14.3319 18.1849 14.6752 18.6085 14.6752C19.032 14.6752 19.3754 14.3319 19.3754 13.9083V9.78962H20.8981V12.5441C20.8981 12.9676 21.2415 13.311 21.665 13.311C22.0886 13.311 22.4319 12.9676 22.4319 12.5441V9.78962H23.8165C24.7154 9.78962 25.0529 8.6126 24.2906 8.13618L13.0198 1.09205ZM3.18825 8.25582L12.5401 2.60095L21.5881 8.25582H3.18825ZM5.13783 24.328H3.61503V9.78962H5.13783V24.328ZM10.1338 24.328H6.67162V9.78962H10.1338V24.328ZM13.1904 24.328H11.6676V9.78962H13.1904V24.328Z"
            fill={
              activeTitle === 'Đầu tư công'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M21.9746 20.8132C21.9746 20.2583 22.4361 19.6699 23.2022 19.4604V22.1652C22.4361 21.9565 21.9746 21.3681 21.9746 20.8132Z"
            fill={
              activeTitle === 'Đầu tư công'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M24.4298 23.5532C25.1958 23.7619 25.6574 24.3504 25.6574 24.9052C25.6574 25.4601 25.1958 26.0485 24.4298 26.2572V23.5532Z"
            fill={
              activeTitle === 'Đầu tư công'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 22.8593C32 27.3793 28.336 31.0433 23.816 31.0433C19.2959 31.0433 15.6319 27.3793 15.6319 22.8593C15.6319 18.3392 19.2959 14.6752 23.816 14.6752C28.336 14.6752 32 18.3392 32 22.8593ZM23.816 17.3351C23.9788 17.3351 24.1349 17.3997 24.25 17.5148C24.3651 17.6299 24.4298 17.7861 24.4298 17.9489V18.2083C25.7638 18.4473 26.885 19.4498 26.885 20.8133C26.885 20.9761 26.8203 21.1322 26.7052 21.2473C26.5901 21.3624 26.434 21.4271 26.2712 21.4271C26.1084 21.4271 25.9523 21.3624 25.8371 21.2473C25.722 21.1322 25.6574 20.9761 25.6574 20.8133C25.6574 20.2584 25.1958 19.67 24.4298 19.4605V22.3003C25.7638 22.5393 26.885 23.5418 26.885 24.9053C26.885 26.2688 25.7638 27.2713 24.4298 27.5103V27.7697C24.4298 27.9325 24.3651 28.0886 24.25 28.2037C24.1349 28.3188 23.9788 28.3835 23.816 28.3835C23.6532 28.3835 23.497 28.3188 23.3819 28.2037C23.2668 28.0886 23.2022 27.9325 23.2022 27.7697V27.5103C21.8682 27.2713 20.7469 26.2688 20.7469 24.9053C20.7469 24.7425 20.8116 24.5864 20.9267 24.4713C21.0418 24.3562 21.198 24.2915 21.3608 24.2915C21.5235 24.2915 21.6797 24.3562 21.7948 24.4713C21.9099 24.5864 21.9746 24.7425 21.9746 24.9053C21.9746 25.4602 22.4361 26.0486 23.2022 26.2573V23.4183C21.8682 23.1793 20.7469 22.1767 20.7469 20.8133C20.7469 19.4498 21.8682 18.4473 23.2022 18.2083V17.9489C23.2022 17.7861 23.2668 17.6299 23.3819 17.5148C23.497 17.3997 23.6532 17.3351 23.816 17.3351Z"
            fill={
              activeTitle === 'Đầu tư công'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
        </svg>
      ),
    },
    {
      title: 'FDI',
      des: 'FDI - Vốn đầu tư trực tiếp nước ngoài',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.9254 0C6.68213 0 0 6.68213 0 14.9254C0 23.1687 6.68213 29.8508 14.9254 29.8508C15.392 29.8508 15.7703 29.4726 15.7703 29.006C15.7703 28.5394 15.392 28.1612 14.9254 28.1612C13.5313 28.1612 12.1874 27.9456 10.9255 27.5461C11.0849 27.2844 11.2325 26.9928 11.3416 26.6764C11.7317 25.5444 11.6734 24.133 10.7529 22.2919C10.4739 21.734 10.3529 21.0713 10.301 20.3231C10.2752 19.9515 10.2672 19.5755 10.2603 19.1895L10.2589 19.1099C10.2526 18.7561 10.2462 18.3896 10.2244 18.0409C10.1794 17.3207 10.0639 16.4883 9.59215 15.8376C9.06827 15.115 8.24269 14.7846 7.18109 14.7846C4.80871 14.7846 3.61261 14.3891 2.92502 14.0097C2.57766 13.8181 2.32985 13.6145 2.09222 13.4079C2.06782 13.3867 2.04213 13.364 2.01522 13.3403C1.95213 13.2848 1.88199 13.223 1.80639 13.1599C2.51403 7.85062 6.36886 3.53661 11.4337 2.15507C11.3512 2.5483 11.3138 2.96586 11.3566 3.39311C11.4795 4.62074 12.2343 5.72409 13.8435 6.52868C13.8601 6.53697 13.9504 6.58214 14.0557 6.96504C14.1056 7.14686 14.1465 7.35545 14.1956 7.6139L14.2027 7.65159C14.2481 7.89033 14.3002 8.16484 14.3694 8.44195C14.5155 9.02682 14.7557 9.70396 15.2679 10.2895C15.7931 10.8898 16.5409 11.3228 17.575 11.5297C18.7037 11.7554 19.5996 11.4532 20.3286 10.8918C20.9651 10.4016 21.4815 9.70328 21.9298 9.09709L22.0024 8.99898C22.9481 7.72255 23.755 6.72599 25.2367 6.62612C27.0661 8.89618 28.1612 11.7829 28.1612 14.9254C28.1612 15.392 28.5394 15.7703 29.006 15.7703C29.4726 15.7703 29.8508 15.392 29.8508 14.9254C29.8508 6.68213 23.1687 0 14.9254 0ZM13.0378 3.22478C12.9925 2.77161 13.1122 2.28244 13.3116 1.78706C13.8405 1.72277 14.3791 1.68967 14.9254 1.68967C18.3826 1.68967 21.5301 3.01499 23.8876 5.18529C22.3284 5.72058 21.39 6.98727 20.6569 7.97678L20.6448 7.99309C20.1331 8.68376 19.7422 9.21069 19.2976 9.55312C18.9107 9.85106 18.5036 9.99226 17.9064 9.87282C17.1805 9.72764 16.7844 9.4567 16.5396 9.17696C16.282 8.88248 16.1264 8.50359 16.0087 8.03244C15.9515 7.80345 15.9075 7.57173 15.86 7.32206L15.8555 7.29844C15.8085 7.05087 15.7559 6.77544 15.6849 6.51723C15.5486 6.02137 15.2871 5.36141 14.5991 5.01741C13.3923 4.41395 13.0912 3.75722 13.0378 3.22478ZM1.69324 15.2358C1.81229 20.4095 4.89971 24.8493 9.31882 26.9186C9.48881 26.6877 9.63527 26.4417 9.74409 26.1259C9.95243 25.5213 10.0107 24.5859 9.24156 23.0476C8.81651 22.1975 8.67343 21.2761 8.61538 20.4402C8.58619 20.0198 8.57772 19.6037 8.57086 19.2197L8.56962 19.1499C8.56317 18.7858 8.55733 18.4556 8.53799 18.1463C8.495 17.4584 8.39043 17.0587 8.22417 16.8294C8.11003 16.6719 7.87956 16.4743 7.18109 16.4743C4.62526 16.4743 3.12258 16.0485 2.10877 15.4892C1.95728 15.4056 1.81936 15.3204 1.69324 15.2358Z"
            fill={
              activeTitle === 'FDI'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M21.5418 21.3283C21.5418 20.7495 22.0233 20.1357 22.8224 19.9171V22.7387C22.0233 22.521 21.5418 21.9072 21.5418 21.3283Z"
            fill={
              activeTitle === 'FDI'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M24.103 27.0073V24.1866C24.9021 24.4043 25.3836 25.0181 25.3836 25.597C25.3836 26.1758 24.9021 26.7896 24.103 27.0073Z"
            fill={
              activeTitle === 'FDI'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.4627 32C28.1778 32 32 28.1779 32 23.4627C32 18.7476 28.1778 14.9254 23.4627 14.9254C18.7475 14.9254 14.9254 18.7476 14.9254 23.4627C14.9254 28.1779 18.7475 32 23.4627 32ZM23.9154 17.8876C23.7954 17.7675 23.6325 17.7 23.4627 17.7C23.2929 17.7 23.13 17.7675 23.0099 17.8876C22.8898 18.0077 22.8224 18.1705 22.8224 18.3403V18.611C21.4308 18.8603 20.2612 19.9061 20.2612 21.3284C20.2612 22.7507 21.4308 23.7965 22.8224 24.0458V27.0074C22.0233 26.7897 21.5418 26.1759 21.5418 25.597C21.5418 25.4272 21.4743 25.2644 21.3542 25.1443C21.2342 25.0242 21.0713 24.9567 20.9015 24.9567C20.7317 24.9567 20.5688 25.0242 20.4487 25.1443C20.3287 25.2644 20.2612 25.4272 20.2612 25.597C20.2612 27.0193 21.4308 28.0652 22.8224 28.3145V28.5851C22.8224 28.7549 22.8898 28.9178 23.0099 29.0378C23.13 29.1579 23.2929 29.2254 23.4627 29.2254C23.6325 29.2254 23.7954 29.1579 23.9154 29.0378C24.0355 28.9178 24.103 28.7549 24.103 28.5851V28.3145C25.4945 28.0652 26.6642 27.0193 26.6642 25.597C26.6642 24.1747 25.4945 23.1289 24.103 22.8796V19.9172C24.9021 20.1357 25.3836 20.7496 25.3836 21.3284C25.3836 21.4982 25.451 21.6611 25.5711 21.7812C25.6912 21.9012 25.854 21.9687 26.0239 21.9687C26.1937 21.9687 26.3565 21.9012 26.4766 21.7812C26.5967 21.6611 26.6642 21.4982 26.6642 21.3284C26.6642 19.9061 25.4945 18.8603 24.103 18.611V18.3403C24.103 18.1705 24.0355 18.0077 23.9154 17.8876Z"
            fill={
              activeTitle === 'FDI'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
        </svg>
      ),
    },
    {
      title: 'Sản xuất công nghiệp',
      des: 'PMI - IIP',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.3333 24.2667H4.66667C2.97299 24.2667 1.6 25.6397 1.6 27.3333C1.6 29.027 2.97299 30.4 4.66667 30.4H27.3333C29.027 30.4 30.4 29.027 30.4 27.3333C30.4 25.6397 29.027 24.2667 27.3333 24.2667ZM4.66667 22.6667C2.08934 22.6667 0 24.756 0 27.3333C0 29.9107 2.08934 32 4.66667 32H27.3333C29.9107 32 32 29.9107 32 27.3333C32 24.756 29.9107 22.6667 27.3333 22.6667H4.66667Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M4.99756 27.3333C4.99756 28.0697 4.40061 28.6667 3.66423 28.6667C2.92785 28.6667 2.33089 28.0697 2.33089 27.3333C2.33089 26.597 2.92785 26 3.66423 26C4.40061 26 4.99756 26.597 4.99756 27.3333Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M13.2648 27.3333C13.2648 28.0697 12.6679 28.6667 11.9315 28.6667C11.1951 28.6667 10.5981 28.0697 10.5981 27.3333C10.5981 26.597 11.1951 26 11.9315 26C12.6679 26 13.2648 26.597 13.2648 27.3333Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M21.5373 27.3333C21.5373 28.0697 20.9403 28.6667 20.2039 28.6667C19.4676 28.6667 18.8706 28.0697 18.8706 27.3333C18.8706 26.597 19.4676 26 20.2039 26C20.9403 26 21.5373 26.597 21.5373 27.3333Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            d="M29.8361 27.3333C29.8361 28.0697 29.2391 28.6667 28.5028 28.6667C27.7664 28.6667 27.1694 28.0697 27.1694 27.3333C27.1694 26.597 27.7664 26 28.5028 26C29.2391 26 29.8361 26.597 29.8361 27.3333Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.3316 7.39848C15.6369 7.39848 14.9586 7.69353 14.4495 8.2388C13.9386 8.78593 13.6429 9.53902 13.6429 10.3348C13.6429 11.1306 13.9386 11.8837 14.4495 12.4308C14.9586 12.9761 15.6369 13.2712 16.3316 13.2712C17.0263 13.2712 17.7046 12.9761 18.2137 12.4308C18.7246 11.8837 19.0203 11.1306 19.0203 10.3348C19.0203 9.53902 18.7246 8.78593 18.2137 8.2388C17.7046 7.69353 17.0263 7.39848 16.3316 7.39848ZM13.28 7.14685C14.0794 6.29073 15.1758 5.79848 16.3316 5.79848C17.4874 5.79848 18.5838 6.29073 19.3832 7.14685C20.1809 8.00113 20.6203 9.14874 20.6203 10.3348C20.6203 11.5209 20.1809 12.6685 19.3832 13.5228C18.5838 14.3789 17.4874 14.8712 16.3316 14.8712C15.1758 14.8712 14.0794 14.3789 13.28 13.5228C12.4823 12.6685 12.0429 11.5209 12.0429 10.3348C12.0429 9.14874 12.4823 8.00113 13.28 7.14685Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.8104 1.6H17.3091V0H13.7115C13.0658 0 12.496 0.422335 12.3083 1.04017L11.729 2.94622L10.0321 2.39829C9.38638 2.18978 8.68195 2.45141 8.3289 3.03087L6.02327 6.81506C5.67517 7.3864 5.75782 8.12089 6.22419 8.60057L7.59592 10.0115L6.27303 12.1502C5.99308 12.6027 5.98025 13.1715 6.23949 13.6362L8.32571 17.3761C8.66145 17.978 9.37096 18.2649 10.0307 18.0656L11.7145 17.557L12.3096 19.6111C12.4912 20.2381 13.0655 20.6696 13.7183 20.6696H17.3872V19.0696H13.8185L13.2137 16.9822C12.9865 16.198 12.1625 15.7503 11.3809 15.9864L9.67074 16.503L7.67498 12.9252L9.01138 10.7647C9.36526 10.1926 9.28457 9.45308 8.81563 8.97075L7.4434 7.55932L9.64053 3.9532L11.3664 4.51049C12.1467 4.76245 12.9819 4.32579 13.2204 3.54128L13.8104 1.6Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.7871 3.17891e-07H18.8198C19.4656 3.17891e-07 20.0353 0.422335 20.2231 1.04017L20.8024 2.94622L22.8844 2.27392C23.3043 2.13834 23.7623 2.30847 23.9919 2.68525L26.7149 7.15455C26.9413 7.52605 26.8875 8.00364 26.5843 8.31554L24.9354 10.0115L26.417 12.4066C26.599 12.7009 26.6073 13.0707 26.4388 13.3729L24.0045 17.7367C23.7862 18.128 23.3249 18.3146 22.8959 18.185L20.8169 17.557L20.2218 19.6111C20.0401 20.2381 19.4659 20.6696 18.8131 20.6696H16.4245V19.0696H18.7129L19.462 16.4839C19.6098 15.9739 20.1456 15.6828 20.6538 15.8363L22.8606 16.503L24.8564 12.9252L23.3094 10.4242C23.0793 10.0522 23.1318 9.57139 23.4367 9.25777L25.088 7.55932L22.8908 3.9532L20.6683 4.67088C20.1609 4.83471 19.6178 4.55078 19.4628 4.04067L18.721 1.6H15.7871V3.17891e-07Z"
            fill={
              activeTitle === 'Sản xuất công nghiệp'
                ? screenMode === 'dark'
                  ? '#99BAFF'
                  : '#004AEA'
                : screenMode === 'dark'
                  ? '#ABADBA'
                  : '#747B8B'
            }
          />
        </svg>
      ),
    },
  ];
  const handleBoxClick = (index) => {
    setSelectedBoxIndex(index);
  };

  const handleTitleClick = (title) => {
    // if (tabMenuFirst && activeTitle === title) {

    //   setActiveTitle(null);
    // } else {
    setMenuTitle(false);
    setChangeSince(2023);
    setChangeSince2(2023);
    setChangeSince3(2023);
    setChangeSince4(2023);
    setActiveTitle(title);
    setListTime1([]);
    setListTime2([]);
    setListTime3([]);
    setListTime4([]);
    setOpenMenuSince(false);
    setOpenMenuSince1(false);
    setOpenMenuSince2(false);
    setOpenMenuSince3(false);
    // }
  };

  useEffect(() => {
    let changeTab = '';
    switch (filteredInfo.name) {
      case 'GDP Danh nghĩa':
        changeTab = 'gdpDanhNghia';
        break;
      case 'GDP Thực':
        changeTab = 'gdpThuc';
        break;
      case 'Tổng mức bán lẻ dịch vụ':
        changeTab = 'tongMucBanLeDichVu';
        break;
      case 'CPI':
        changeTab = 'cpi';
        break;
      case 'Xuất nhập khẩu':
        changeTab = 'xuatNhapKhau';
        break;
      case 'FDI':
        changeTab = 'fdi';
        break;
      case 'Vốn đầu tư ngân sách Nhà Nước':
        changeTab = 'vonDauTuNganSachNhaNuoc';
        break;
      case 'Khối lượng sản xuất công nghiệp':
        changeTab = 'khoiLuongSanXuatCongNghiep';
        break;
      case 'PMI':
        changeTab = 'pmi';
        break;
      case 'IIP':
        changeTab = 'iip';
        break;
      default:
        break;
    }
    axios
      .get(`${config.app.VITE_APP_API_URL}/data-vi-mo`)
      .then((res) => {
        setListItems(res.data.data[changeTab]);
        setListData(res.data.data[changeTab][changeTab]);
        setChart(res.data.data);
      })
      .catch((err) => {});
  }, [filteredInfo]);

  const transformDataToSeries = (data) => {
    // Kiểm tra xem data có phải là mảng và có phần tử hay không
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Lấy tất cả các khóa ngoại trừ 'time'
    const keys = Object.keys(data[0]).filter((key) => key !== 'time');

    // Tạo series cho mỗi key
    return keys.map((key) => {
      return {
        name: key,
        data: data.map((item) => item[key]),
      };
    });
  };
  const timeQuarter = [
    "Q1'10",
    "Q2'10",
    "Q3'10",
    "Q4'10",
    "Q1'11",
    "Q2'11",
    "Q3'11",
    "Q4'11",
    "Q1'12",
    "Q2'12",
    "Q3'12",
    "Q4'12",
    "Q1'13",
    "Q2'13",
    "Q3'13",
    "Q4'13",
    "Q1'14",
    "Q2'14",
    "Q3'14",
    "Q4'14",
    "Q1'15",
    "Q2'15",
    "Q3'15",
    "Q4'15",
    "Q1'16",
    "Q2'16",
    "Q3'16",
    "Q4'16",
    "Q1'17",
    "Q2'17",
    "Q3'17",
    "Q4'17",
    "Q1'18",
    "Q2'18",
    "Q3'18",
    "Q4'18",
    "Q1'19",
    "Q2'19",
    "Q3'19",
    "Q4'19",
    "Q1'20",
    "Q2'20",
    "Q3'20",
    "Q4'20",
    "Q1'21",
    "Q2'21",
    "Q3'21",
    "Q4'21",
    "Q1'22",
    "Q2'22",
    "Q3'22",
    "Q4'22",
    "Q1'23",
    "Q2'23",
    "Q3'23",
  ];

  function formatDateToQuarter(dateString) {
    const [day, month, year] = dateString.split('/');
    const quarter = Math.floor((parseInt(month, 10) - 1) / 3) + 1;
    return `Q${quarter}'${year.slice(-2)}`;
  }
  const quarterListGDPDanhNghia = chartGDPDanhNghia?.map((item) => {
    return formatDateToQuarter(item.time);
  });

  const filteredQuarters2 = chartGDPDanhNghia1?.map((item) => {
    return formatDateToQuarter(item.time);
  });
  const filteredQuarters3 = chartGDPReal1?.map((item) => {
    return formatDateToQuarter(item.time);
  });

  const filteredQuarters4 = chartGDPReal01?.map((item) => {
    return formatDateToQuarter(item.time);
  });

  // GDP danh nghĩa ( hiện hành)
  const [GDPDN, GDPDNPERCENT] = [
    'gdp_theo_gia_hien_hanh',
    'tangTruongCungKy',
  ].map((field) => chartGDPDanhNghia?.map((asset: any) => asset[field]));

  const NOMINAL_GDP = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        color: '#fff',
      },
      borderRight:
        screenMode === 'light'
          ? '1px solid rgb(204, 204, 204)'
          : '1px solid #3a3f42',
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      y: 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ VND</b> `;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },

    xAxis: {
      categories: quarterListGDPDanhNghia,
      labels: {
        style: {
          color: screenMode === 'dark' ? '#fff' : '#2E3138',
          fontSize: 12,
        },
      },

      tickInterval: parseInt(quarterListGDPDanhNghia?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'GDP danh nghĩa',
        data: GDPDN,
        type: 'column',
        color: 'rgba(123, 139, 67, 1)',
      },

      {
        name: 'Tăng trưởng cùng kỳ',
        data: GDPDNPERCENT,
        type: 'spline',
        color: 'rgba(32, 195, 87, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        yAxis: 1, // Linked to the second yAxis which is now hidden
        tooltip: {
          valueSuffix: '', // Ensures no suffix is added in the tooltip
        },
        // ... other series options ...
      },
    ],
  };
  //GDP cơ cấu hiện hành
  const [GDPHH1, GDPHH2, GDPHH3] = [
    'gdp_hh_nong_nghiep_lam_nghiep_va_thuy_san',
    'gdp_hh_cong_nghiep_va_xay_dung',
    'gdp_hh_dich_vu',
  ].map((field) => chartGDPDanhNghia1?.map((asset: any) => asset[field]));
  const CURRENT_GDP_STRUCTURE = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      itemWidth: window.innerWidth < 1600 ? 150 : 200,
      layout: 'horizontal', // Thay đổi layout thành horizontal để legend hiển thị theo chiều ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: window.innerWidth < 1600 ? 42 : 50,
      y: 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ VND</b> `;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: filteredQuarters2,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },

      tickInterval: parseInt(filteredQuarters2?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],

    grid: {
      left: 80,
      right: 100,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: 'GDP hiện hành nông nghiệp, lâm nghiệp và thuỷ sản',
        data: GDPHH1,
        color: 'rgba(194, 112, 112, 1) ',
      },
      {
        name: 'GDP hiện hành công nghiệp và xây dựng',
        data: GDPHH2,
        color: 'rgba(124, 75, 155, 1)',
      },

      {
        name: 'GDP hiện hành dịch vụ',
        data: GDPHH3,
        color: 'rgba(75, 126, 155, 1)',
      },

      // {
      //   name: 'Doanh thu thuần (YoY)',
      //   // data:
      //   //   netReveNueChange === 'quarter'
      //   //     ? secondNetRevenueQuater
      //   //     : secondNetRevenueYear,
      //   type: 'line',
      //   yAxis: 1, // this links the series to the second yAxis
      //   // ... other series options ...
      // },
    ],
  };

  // GDP thực
  const [GDPT, GDPPercent] = ['gdp_so_sanh', 'tangTruongCungKy'].map((field) =>
    chartGDPReal1?.map((asset: any) => asset[field])
  );
  const REAL_GDP = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 50,
      maxWidth: 500,
      y: window.innerWidth < 1600 ? -5 : 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ VND</b> `;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: filteredQuarters3,

      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(filteredQuarters3?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'GDP thực',
        data: GDPT,
        type: 'column',
        color: 'rgba(89, 89, 89, 1)',
      },

      {
        name: 'Tăng trưởng cùng kỳ',
        data: GDPPercent,
        type: 'spline',
        color: 'rgba(255, 123, 123, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        yAxis: 1, // this links the series to the second yAxis
        // ... other series options ...
      },
    ],
  };
  // Cơ cấu GDP thực
  const [GDPT1, GDPT2, GDPT3] = [
    'gdp_nong_nghiep_lam_nghiep_va_thuy_san',
    'gdp_cong_nghiep_va_xay_dung',
    'gdp_dich_vu',
  ].map((field) => chartGDPReal01?.map((asset: any) => asset[field]));
  const REAL_GDP_STRUCTURE = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      itemWidth: window.innerWidth < 1600 ? 150 : 200,
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },

      maxHeight: window.innerWidth < 1600 ? 37 : 65,
      navigation: {
        enabled: true,
        style: {
          fontSize: '12px',
        },
      },
      y: 0,
      maxWidth: 500,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ VND</b> `;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: filteredQuarters4,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 10,
          fontWeight: 500,
          lineHeight: 20,
        },
      },

      tickInterval: parseInt(filteredQuarters4?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'GDP nông nghiệp, lâm nghiệp và thuỷ sản',
        data: GDPT1,
        type: 'column',
        color: 'rgba(87, 95, 207, 1)',
      },
      {
        name: 'GDP công nghiệp và xây dựng',
        data: GDPT2,
        type: 'column',
        color: 'rgba(145, 70, 81, 1)',
      },

      {
        name: 'GDP dịch vụ',
        data: GDPT3,
        type: 'column',
        color: 'rgba(153, 132, 51, 1)',
      },

      // {
      //   name: 'Doanh thu thuần (YoY)',
      //   // data:
      //   //   netReveNueChange === 'quarter'
      //   //     ? secondNetRevenueQuater
      //   //     : secondNetRevenueYear,
      //   type: 'line',
      //   yAxis: 1, // this links the series to the second yAxis
      //   // ... other series options ...
      // },
    ],
  };

  //Bán lẻ hàng hoá dịch vụ
  const [time, consumption1, consumption2] = [
    'time',
    'tong_ban_le_hh_va_dv',
    'tangTruongCungKy',
  ].map((field) => chartBuy?.map((asset: any) => asset[field]));

  const newDatesTongbanle = time.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const timeChange = moment(time, 'DD/MM/YYYY').format('DD/MM/YY');

  const CONSUMPTION = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        color: '#fff',
      },

      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 45,
      y: window.innerWidth < 1600 ? -5 : -7,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltipMacro(value)} tỷ VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesTongbanle,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesTongbanle?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 500,
      bottom: 100,
    },
    series: [
      {
        name: 'Tổng bán lẻ hàng hoá và dịch vụ',
        data: consumption1,
        color: 'rgba(66, 138, 97, 1)',
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },

      {
        name: 'Tăng trưởng cùng kỳ',
        data: consumption2,
        type: 'spline',
        color: 'rgba(199, 179, 107, 1)',

        marker: {
          enabled: false, // This will remove the dots on the line
        },
        yAxis: 1, // this links the series to the second yAxis
        // ... other series options ...
      },
    ],
  };

  // Cơ cấu bán lẻ hàng hoá dịch vụ
  const [
    retailStructureTime,
    retailStructure1,
    retailStructure2,
    retailStructure3,
    retailStructure4,
  ] = [
    'time',
    'ban_le_dich_vu_luu_tru_an_uong',
    'ban_le_hang_hoa',
    'ban_le_du_lich_lu_hanh',
    'ban_le_dich_vu_khac',
  ].map((field) => chartBuy1?.map((asset: any) => asset[field]));
  const newDatesBanle = retailStructureTime.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });
  const RETAIL_STRUCTURE = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      // zoomType: 'xy',
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },

      maxHeight: window.innerWidth < 1600 ? 37 : 65,
      navigation: {
        enabled: true,
        style: {
          fontSize: '12px',
        },
      },
      y: 10,
      maxWidth: 300,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltipMacro(value)} tỷ VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesBanle,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesBanle?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 100,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: 'Bán lẻ hàng hoá',
        data: retailStructure2,
        type: 'column',
        color: 'rgba(56, 148, 146, 1)',

        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
      {
        name: 'Bán lẻ Dịch vụ lưu trú, ăn uống',
        data: retailStructure1,
        color: 'rgba(51, 54, 153, 1)',
        // type: 'spline',
        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },

      {
        name: 'Bán lẻ Du lịch lữ hàng',
        data: retailStructure3,
        type: 'column',
        color: 'rgba(89, 89, 89, 1)',
        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
      {
        name: 'Bán lẻ Dịch vụ khác',
        data: retailStructure4,
        type: 'column',
        color: 'rgba(133, 71, 71, 1)',
        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
    ],
  };
  // Xuất khẩu
  const [exportTime, exportTime1, exportTime2, exportTime3] = [
    'time',
    'XK_tong',
    'XK_khu_vuc_trong_nuoc',
    'XK_khu_vuc_trong_FDI',
  ].map((field) => chartExport?.map((asset: any) => asset[field]));

  const newDatesExport = exportTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const EXPORT = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} triệu USD</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesExport,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesExport?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'XK Tổng',
        data: exportTime1,
        color: 'rgba(139, 170, 193, 1)',
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'XK Khu vực trong nước',
        data: exportTime2,
        type: 'column',
        color: 'rgba(166, 89, 89, 1)',
        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
      {
        name: 'XK Khu vực trong FDI',
        data: exportTime3,
        type: 'column',
        color: 'rgba(147, 159, 96, 1)',

        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
    ],
  };

  // Nhập khẩu
  const [importTime, import1, import2, import3] = [
    'time',
    'NK_tong',
    'NK_khu_vuc_trong_nuoc',
    'NK_khu_vuc_trong_FDI',
  ].map((field) => chartExport3?.map((asset: any) => asset[field]));

  const newDatesImport = exportTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const IMPORT = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} triệu USD</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: importTime,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(importTime?.length / 4),
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'NK Tổng',
        data: import1,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: 'rgba(246, 185, 59, 1)',
      },
      {
        name: 'NK Khu vực trong nước',
        data: import2,
        color: 'rgba(229, 80, 57, 1)',
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'NK Khu vực trong FDI',
        data: import3,
        color: 'rgba(64, 90, 191, 1)',
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };

  const [exTime, totalExport, totalImport] = ['time', 'XK_tong', 'NK_tong'].map(
    (field) => chartExport4?.map((asset: any) => asset[field])
  );

  const newDatesNKXK = exportTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const EXPORT_IMPORT = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} triệu USD</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: exTime,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(exTime?.length / 4),
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash',
      tickLength: 5,
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'XK Tổng',
        data: totalExport,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: 'rgba(64, 90, 191, 1)',
      },
      {
        name: 'NK Tổng',
        data: totalImport,
        type: 'spline',
        color: 'rgba(246, 185, 59, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };
  // Thặng dư
  const [excessTime, excess] = ['time', 'thangDuThuongMai'].map((field) =>
    chartExport2?.map((asset: any) => asset[field])
  );

  const newDatesSurplus = excessTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const EXCESS = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} triệu USD</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesSurplus,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesSurplus?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],

    series: [
      {
        name: 'Thặng dư thương mại',
        data: excess?.map((value) => ({
          y: value,
          color: value > 0 ? 'rgba(75, 155, 99, 1)' : 'rgba(209, 84, 73, 1)', // Blue for values above 0, red for values below
        })),
        type: 'column',
      },
    ],
  };
  //Vốn đầu tư trực tiếp FDI
  const [directFDITime, directFDI1, directFDI2] = [
    'time',
    'von_thuc_hien_fdi',
    'von_dang_ky_fdi',
  ].map((field) => chartFdi?.map((asset: any) => asset[field]));

  const newDatesFDI = directFDITime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const DIRECT_FDI = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      y: 0,

      maxHeight: 65,
      maxWidth: 500,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Triệu USD</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesFDI,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesFDI?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'Vốn thực hiện FDI',
        data: directFDI1,
        type: 'spline',
        color: 'rgba(0, 151, 230, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Vốn đăng ký FDI',
        data: directFDI2,
        type: 'spline',
        color: 'rgba(140, 122, 230, 1)',

        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };
  // Số dự án
  const [projectTime, project1, project2, project3] = [
    'time',
    'gop_von_mua_co_phan_fdi',
    'so_du_an_cap_moi_fdi',
    'so_du_an_tang_von_fdi',
  ].map((field) => chartFdi2?.map((asset: any) => asset[field]));

  const newDatesProject = projectTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const PROJECT_FDI = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      y: 0,

      maxHeight: 65,
      maxWidth: 500,
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
        if (this.series.name === 'Góp vốn, mua cổ phần FDI') {
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} triệu USD</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${value} Dự án</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesProject,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesProject?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'Góp vốn, mua cổ phần FDI',
        data: project1,
        type: 'spline',
        color: 'rgba(254, 202, 87, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Số dự án cấp mới FDI',
        data: project2,
        type: 'spline',
        color: 'rgba(171, 168, 184, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Số dự án tăng vốn FDI',
        data: project3,
        type: 'spline',
        color: 'rgba(67, 243, 255, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };
  // Đầu tư công
  const [
    governmentInvestTime,
    governmentInvest1,
    governmentInvest2,
    governmentInvest3,
    governmentInvest4,
    governmentInvest5,
    governmentInvest6,
    governmentInvest7,
    governmentInvest8,
    governmentInvest9,
    governmentInvest10,
  ] = [
    'time',
    'von_nsnn_bo_y_te',
    'von_nsnn_bo_nn_va_ptnt',
    'von_nsnn_bo_cong_thuong',
    'von_nsnn_bo_thong_tin_va_truyen_thong',
    'von_nsnn_bo_giao_duc_dao_tao',
    'von_nsnn_bo_tai_nguyen_va_moi_truong',
    'von_nsnn_bo_van_hoa_the_thao_va_du_lich',
    'von_nsnn_bo_giao_thong_van_tai',
    'von_nsnn_bo_xay_dung',
    'von_nsnn_bo_khoa_hoc_va_cong_nghe',
  ].map((field) => chartVonDauTu?.map((asset: any) => asset[field]));

  const newDatesInvert = governmentInvestTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const GOVERNMENT_INVEST = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,

      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 64,
      maxWidth: 500,
      y: 30,
      navigation: {
        enabled: true,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltipMacro(value)} tỷ VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesInvert,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesInvert?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'Vốn NSNN Bộ Y tế',
        data: governmentInvest1,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: 'rgba(0, 151, 230, 1)',
      },
      {
        name: 'Vốn NSNN Bộ NN và PTNT',
        data: governmentInvest2,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: 'rgba(140, 122, 230, 1)',
      },
      {
        name: 'Vốn NSNN Bộ Công thương',
        data: governmentInvest3,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: 'rgba(225, 177, 44, 1)',
      },
      {
        name: 'Vốn NSNN Bộ Thông tin và truyền thông',
        data: governmentInvest4,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: 'rgba(68, 189, 50, 1)',
      },
      {
        name: 'Vốn NSNN Bộ Giáo dục - Đào tạo',
        data: governmentInvest5,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: '#40739e',
      },
      {
        name: 'Vốn NSNN Bộ Tài nguyên và Môi trường',
        data: governmentInvest6,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: '#c23616',
      },
      {
        name: 'Vốn NSNN Bộ Văn hoá, Thể thao và Du lịch',
        data: governmentInvest7,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: '#dcdde1',
      },
      {
        name: 'Vốn NSNN Bộ Giao thông vận tải',
        data: governmentInvest8,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: '#718093',
      },
      {
        name: 'Vốn NSNN Bộ Xây dựng',
        data: governmentInvest9,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: '#192a56',
      },
      {
        name: 'Vốn NSNN Bộ Khoa học và Công nghệ',
        data: governmentInvest10,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        color: '#006afe',
      },
    ],
  };

  // Tổng mức đầu tư công
  const [
    totalGovernmentInvestTime,
    totalGovernmentInvest1,
    totalGovernmentInvest2,
  ] = ['time', 'von_nsnn_trung_uong', 'tangTruongCungKy'].map((field) =>
    chartTotalCapital?.map((asset: any) => asset[field])
  );

  const newDatesTotalCapital = totalGovernmentInvestTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const TOTAL_GOVERNMENT_INVEST = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
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
        if (this.series.name === 'Tăng trưởng so với cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltipMacro(value)} tỷ VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesTotalCapital,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesTotalCapital?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'Vốn đầu tư công',
        data: totalGovernmentInvest1,
        type: 'column',
        color: '#feca57',
        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
      {
        name: 'Tăng trưởng so với cùng kỳ',
        data: totalGovernmentInvest2,
        type: 'spline',
        color: '#10ac84',
        yAxis: 1,
        tooltip: {
          pointFormatter: function () {
            return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y} %</b><br/>`;
          },
        },
      },
    ],
  };

  // PMI
  const [PMITime, PMI] = ['time', 'pmi'].map((field) =>
    chartPmi?.map((asset: any) => asset[field])
  );

  const newDatesPMI = PMITime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const PMI_CHART = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      height: window.innerWidth < 1600 ? 670 : 770,

      marginTop: 24,
    },

    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      y: 10,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },
    // colors: [
    //   '#B28221',
    //   '#43F3FF',
    //   '#597BF8',
    //   '#30DF9D',
    //   '#FF36F5',
    //   '#FFD097',
    //   '#EF5E76',
    //   '#FFF92F',
    // ],
    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      x: 10,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltipMacro(value)}</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesPMI, // giả sử PMITime là một mảng chứa các ngày
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesPMI?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },

    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'PMI',
        data: PMI,
        type: 'spline',
        color: 'rgba(0, 151, 230, 1)',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };
  const [IIPTime, IIP] = ['time', 'iip'].map((field) =>
    chartIip?.map((asset: any) => asset[field])
  );

  const newDatesIIP = IIPTime?.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });

  const IIP_CHART = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      width: null,
      height: window.innerWidth < 1600 ? 670 : 770,

      marginTop: 24,
      // marginLeft: 70,
    },

    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      y: 10,
      style: {
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
        fontSize: '16px',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      x: 10,
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
        if (this.series.name === 'Tăng trưởng cùng kỳ') {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${(value * 100).toFixed(2)} %</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesIIP,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesIIP?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'IIP',
        data: IIP,
        color: 'rgba(0, 151, 230, 1)',
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };
  //Cpi
  const [CPITime, CPI] = ['time', 'CPI'].map((field) =>
    chartCpi?.map((asset: any) => asset[field])
  );
  const newDatesCPI = CPITime.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });
  const CPI_CHART = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal', // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      minHeight: 70,
      maxWidth: 500,
      y: window.innerWidth < 1600 ? -7 : 0,
      // navigation: {
      //   verticalAlign: 'left',
      // },
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

        tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;

        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesCPI,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesCPI?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
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
        name: 'CPI',
        data: CPI,
        color: '#ABABAB',
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
    ],
  };
  // Cơ cấu CPI
  const [
    structureCPITime,
    structureCPI1,
    structureCPI2,
    structureCPI3,
    structureCPI4,
    structureCPI5,
    structureCPI6,
    structureCPI7,
    structureCPI8,
    structureCPI9,
    structureCPI10,
    structureCPI11,
    structureCPI12,
  ] = [
    'time',
    'CPI_hang_an_va_dich_vu_an_uong',
    'CPI_thiet_bi_va_do_dung_gia_dinh',
    'CPI_giao_duc',
    'CPI_do_uong_va_thuoc_la',
    'CPI_thuoc_va_dich_vu_y_te',
    'CPI_van_hoa_giai_tri_va_du_lich',
    'CPI_may_mac_mu_non_giay_dep',
    'CPI_giao_thong',
    'CPI_hang_hoa_va_dich_vu_khac',
    'CPI_nha_o_va_vat_lieu_xay_dung',
    'CPI_buu_chinh_vien_thong',
    'CPI',
  ].map((field) => chartCpi1?.map((asset: any) => asset[field]));
  const newDatesCoCauCPI = structureCPITime.map((date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YY');
  });
  const STRUCTURE_CPI = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',

      style: {
        color: '#fff',
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,

      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        color: screenMode === 'dark' ? '#fff' : '#2E3138',
      },
    },

    legend: {
      align: 'left',
      verticalAlign: 'bottom',

      itemStyle: {
        color: screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',
        fontSize: window.innerWidth < 1600 ? 10 : 13,
      },
      maxHeight: window.innerWidth < 1600 ? 44 : 45,
      height: 10,
      maxWidth: 500,
      y: 20,
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

        tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;

        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories: newDatesCoCauCPI,
      labels: {
        style: {
          color: screenMode === 'dark' ? 'rgba(255, 255, 255, 1)' : '#2E3138',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 20,
        },
      },
      tickInterval: parseInt(newDatesCoCauCPI?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)',
      lineColor:
        screenMode === 'dark'
          ? 'rgba(48, 50, 59, 1)'
          : 'rgba(208, 210, 216, 1)', // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: 'gray',
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        labels: {
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)',
        gridLineDashStyle: 'ShortDash', // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === 'dark'
            ? 'rgba(48, 50, 59, 1)'
            : 'rgba(208, 210, 216, 1)', // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + '%';
          },
          style: {
            color:
              screenMode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : 'rgba(86, 91, 103, 1)',
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: 'dash',
          width: 1,
          color: 'gray',
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],

    series: [
      {
        name: 'Hàng hoá và dịch vụ ăn uống',
        data: structureCPI1,
        type: 'column',
        // marker: {
        //   enabled: false, // This will remove the dots on the line
        // },
      },
      {
        name: 'Thiết bị và đồ dùng gia đình',
        data: structureCPI2,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Giáo dục',
        data: structureCPI3,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Đồ uống và thuốc lá',
        data: structureCPI4,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Thuốc và dịch vụ y tế',
        data: structureCPI5,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Văn hoá giải trí và du lịch',
        data: structureCPI6,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'May mặc, mũ nón, giày dép',
        data: structureCPI7,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Giao thông',
        data: structureCPI8,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Hàng hoá và dịch vụ khác',
        data: structureCPI9,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Nhà ở và vật liệu xây dựng',
        data: structureCPI10,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'Bưu chính viễn thông',
        data: structureCPI11,
        type: 'column',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
      },
      {
        name: 'CPI',
        data: structureCPI12,
        type: 'spline',
        marker: {
          enabled: false, // This will remove the dots on the line
        },
        yAxis: 1,
        tooltip: {
          valueSuffix: '',
        },
      },
    ],
  };
  // Sử dụng hàm với dữ liệu listData
  const seriesData = transformDataToSeries(listData);

  const yearsSet = new Set(); // Tạo một Set để lưu trữ các năm không trùng lặp

  const yearsList = listData.flatMap((item) => {
    const dateString = item.time;

    if (dateString && /(\d{2})\/(\d{2})\/(\d{4})/.test(dateString)) {
      const isoFormattedString = dateString.split('/').reverse().join('-');
      const date = new Date(isoFormattedString);
      const year = date.getFullYear();

      if (!yearsSet.has(year)) {
        // Kiểm tra nếu năm chưa tồn tại trong Set
        yearsSet.add(year); // Thêm năm vào Set
        return year; // Trả về năm
      }
    }
    return []; // Trả về mảng rỗng nếu ngày không hợp lệ hoặc năm đã tồn tại
  });

  const getYear = (dateString) => dateString.split('/')[2];
  const getQuarter = (dateString) => {
    const month = parseInt(dateString.split('/')[1], 10);
    return Math.floor((month - 1) / 3) + 1;
  };

  const highchartsStyles = {
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
  };
  const highchartsStylesBorder = {
    width: '100%',

    borderLeft:
      screenMode === 'dark'
        ? '1px solid #3a3f42 '
        : '1px solid rgb(204, 204, 204)',
    overflow: 'hidden',
  };
  const highchartsStylesMap = {
    backgroundColor: 'transparent',

    width: '100%',
    borderTop:
      screenMode === 'dark'
        ? '1px solid #3a3f42 '
        : '1px solid rgb(204, 204, 204)',
    overflow: 'hidden',
    borderRadius: '0px 0px 8px 8px',
  };
  const highchartsStylesMap1 = {
    backgroundColor: 'transparent',

    width: '100%',
    overflow: 'hidden',
    borderRadius: '8px 8px 0px 0px',
  };
  const selectChartOptions = (menuSelection, activeTitle) => {
    switch (activeTitle) {
      case 'Bán lẻ - Tiêu dùng':
        return {
          first: CONSUMPTION,
          second: RETAIL_STRUCTURE,
          third: CPI_CHART,
          four: STRUCTURE_CPI,
        };
      case 'Xuất nhập khẩu':
        return {
          first: EXPORT,
          third: IMPORT,
          second: EXCESS,
          four: EXPORT_IMPORT,
        };
      case 'FDI':
        return {
          first: null,
          third: null,
          second: DIRECT_FDI,
          four: PROJECT_FDI,
        };
      case 'Đầu tư công':
        return {
          first: null,
          second: GOVERNMENT_INVEST,
          third: null,
          four: TOTAL_GOVERNMENT_INVEST,
        };
      // case 'CPI':
      //   return { first: CPI_CHART, second: null }; // Assuming there's no second chart for CPI
      // case 'Vốn đầu tư ngân sách Nhà Nước':
      //   return { first: GOVERNMENT_INVEST, second: TOTAL_GOVERNMENT_INVEST };
      case 'Sản xuất công nghiệp':
        return { first: PMI_CHART, second: IIP_CHART, third: null, four: null };
      default:
        if (activeTitle === 'Tổng sản phẩm quốc nội') {
          return {
            first: NOMINAL_GDP,
            second: CURRENT_GDP_STRUCTURE,
            third: REAL_GDP,
            four: REAL_GDP_STRUCTURE,
          };
        }
        return { first: null, second: null };
    }
  };
  const {
    first: firstChartOptions,
    second: secondChartOptions,
    third: thirdChartOptions,
    four: fourChartOptions,
  } = selectChartOptions(activeTitle, activeTitle);
  const [btnTab, setBtnTab] = useState('PMI');
  const handleCloseMenu = () => {
    setOpenMenuSince(false);
    setOpenMenuSince1(false);
    setOpenMenuSince2(false);
    setOpenMenuSince3(false);
  };
  useEffect(() => {}, [changeSince]);

  const location = useLocation();

  useEffect(() => {
    const tab = location.state?.tab || 'Tổng sản phẩm quốc nội';
    switch (tab) {
      case 'gdp':
        handleTitleClick('Tổng sản phẩm quốc nội');
        break;
      case 'cpi':
        handleTitleClick('Bán lẻ - Tiêu dùng');
        break;
      case 'xuat-nhap-khau':
        handleTitleClick('Xuất nhập khẩu');
        break;
      case 'dau-tu-cong':
        handleTitleClick('Đầu tư công');
        break;
      case 'fdi':
        handleTitleClick('FDI');
        break;
      case 'pmi-iip':
        handleTitleClick('Sản xuất công nghiệp');
        break;

      default:
        break;
    }
  }, [location]);

  return (
    <StyledMarco screen_mode={screenMode}>
      <div
        style={{ display: 'flex', gap: '8px', padding: '0px 16px 16px 16px' }}
        onClick={handleCloseMenu}
      >
        <div className="top-macro">
          <div className="manufacture">
            <div className="title">Chỉ số vĩ mô</div>
            <div className="list-menu">
              {manufacture1.map((item, index) => (
                <div
                  onClick={() => handleTitleClick(item.title)}
                  className={
                    activeTitle === item.title ? 'active-tab' : 'title-menu'
                  }
                >
                  <div className={'icon-tab'}>{item.icon}</div>
                  <div className="title-tab">
                    <div className="title">{item?.title}</div>
                    <div className="des">{item.des}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom-macro">
          <div className="chart-wrapper">
            {activeTitle === 'Sản xuất công nghiệp' ? (
              <div className="chart-marco-new">
                <div className="hightchart">
                  {btnTab === 'PMI' ? (
                    <div style={{ width: '100%' }}>
                      {firstChartOptions && (
                        <div style={{ width: '100%' }} className="box">
                          <div className="header-chart">
                            <div className="btn-marco">
                              <div
                                style={{
                                  // color: screenMode === 'dark' ? '#fff' : '#2E3138',

                                  padding: '6px 12px',
                                  // border: '1px solid #192228',

                                  fontSize: '15px',
                                  fontWeight: 600,
                                  color:
                                    btnTab === 'PMI'
                                      ? screenMode === 'dark'
                                        ? 'rgba(153, 186, 255, 1)'
                                        : 'rgba(0, 74, 234, 1)'
                                      : screenMode === 'dark'
                                        ? '#fff'
                                        : '#000',
                                  borderBottom:
                                    btnTab === 'PMI'
                                      ? '1px solid rgba(0, 74, 234, 1)'
                                      : '1px',
                                  marginRight: '8px',
                                }}
                                onClick={() => [setBtnTab('PMI')]}
                                className={
                                  btnTab === 'PMI'
                                    ? 'btn-tab-active'
                                    : 'btn-tab'
                                }
                              >
                                Chỉ số PMI
                              </div>
                              <div
                                style={{
                                  color:
                                    btnTab === 'IIP'
                                      ? screenMode === 'dark'
                                        ? 'rgba(153, 186, 255, 1)'
                                        : 'rgba(0, 74, 234, 1)'
                                      : screenMode === 'dark'
                                        ? '#fff'
                                        : '#000',

                                  padding: '6px 12px',

                                  fontSize: '15px',
                                  fontWeight: 600,
                                  borderBottom:
                                    btnTab === 'IIP'
                                      ? '1px solid rgba(0, 74, 234, 1)'
                                      : '1px',
                                  marginRight: '8px',
                                }}
                                onClick={() => [setBtnTab('IIP')]}
                                className={
                                  btnTab === 'IIP'
                                    ? 'btn-tab-active'
                                    : 'btn-tab'
                                }
                              >
                                Chỉ số IIP
                              </div>
                            </div>
                            <div
                              className="box-btn-since"
                              onClick={(e) => {
                                e.stopPropagation();

                                setOpenMenuSince((prev: any) => !prev);
                              }}
                            >
                              Từ: {changeSince}
                              <DownOutlined style={{ fontSize: '10px' }} />
                            </div>
                            {openMenuSince && (
                              <>
                                <div className="drop-btn-since">
                                  {listTime1.map((item) => {
                                    return (
                                      <div
                                        className="dropdown-menu"
                                        onClick={() => {
                                          setChangeSince(item);
                                          setOpenMenuSince(false);
                                        }}
                                      >
                                        <div className="guiOnline">{item}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={firstChartOptions}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ width: '100%' }}>
                      {secondChartOptions && (
                        <div style={{ width: '100%' }} className="box">
                          <div className="header-chart">
                            <div className="btn-marco">
                              <div
                                style={{
                                  // color: screenMode === 'dark' ? '#fff' : '#2E3138',

                                  padding: '6px 12px',
                                  // border: '1px solid #192228',

                                  fontSize: '15px',
                                  fontWeight: 600,
                                  color:
                                    btnTab === 'PMI'
                                      ? screenMode === 'dark'
                                        ? 'rgba(153, 186, 255, 1)'
                                        : 'rgba(0, 74, 234, 1)'
                                      : screenMode === 'dark'
                                        ? '#fff'
                                        : '#000',
                                  borderBottom:
                                    btnTab === 'PMI'
                                      ? '1px solid rgba(0, 74, 234, 1)'
                                      : '1px',
                                  marginRight: '8px',
                                }}
                                onClick={() => [setBtnTab('PMI')]}
                                className={
                                  btnTab === 'PMI'
                                    ? 'btn-tab-active'
                                    : 'btn-tab'
                                }
                              >
                                Chỉ số PMI
                              </div>
                              <div
                                style={{
                                  color:
                                    btnTab === 'IIP'
                                      ? screenMode === 'dark'
                                        ? 'rgba(153, 186, 255, 1)'
                                        : 'rgba(0, 74, 234, 1)'
                                      : screenMode === 'dark'
                                        ? '#fff'
                                        : '#000',

                                  padding: '6px 12px',

                                  fontSize: '15px',
                                  fontWeight: 600,
                                  borderBottom:
                                    btnTab === 'IIP'
                                      ? '1px solid rgba(0, 74, 234, 1)'
                                      : '1px',
                                  marginRight: '8px',
                                }}
                                onClick={() => [setBtnTab('IIP')]}
                                className={
                                  btnTab === 'IIP'
                                    ? 'btn-tab-active'
                                    : 'btn-tab'
                                }
                              >
                                Chỉ số IIP
                              </div>
                            </div>
                            <div
                              className="box-btn-since"
                              onClick={(e) => {
                                e.stopPropagation();

                                setOpenMenuSince1((prev: any) => !prev);
                              }}
                            >
                              Từ: {changeSince2}
                              <DownOutlined style={{ fontSize: '10px' }} />
                            </div>
                            {openMenuSince1 && (
                              <>
                                <div className="drop-btn-since">
                                  {listTime2.map((item) => (
                                    <div
                                      className="dropdown-menu"
                                      // onMouseEnter={() => setIsHoveredChild(true)}
                                      // onMouseLeave={() => setIsHoveredChild(false)}
                                      onClick={() => {
                                        setChangeSince2(item);
                                        setOpenMenuSince1(false);
                                      }}
                                    >
                                      <div className="guiOnline">{item}</div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={secondChartOptions}
                            theme="light"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : activeTitle === 'FDI' ? (
              <div className="map-VN">
                <div style={{ width: '52%', height: '100%' }}>
                  <MapChart
                    highchartsStylesBorder={highchartsStylesBorder}
                    activeTitle={activeTitle}
                  />
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div className="hightchart">
                    {secondChartOptions && (
                      <div style={{ width: '100%' }} className="box">
                        <div className="header-chart">
                          <div className="title-chart">Vốn FDI</div>
                          <div
                            className="box-btn-since"
                            onClick={(e) => {
                              e.stopPropagation();

                              setOpenMenuSince((prev: any) => !prev);
                            }}
                          >
                            Từ: {changeSince}
                            <DownOutlined style={{ fontSize: '10px' }} />
                          </div>
                          {openMenuSince && (
                            <>
                              <div className="drop-btn-since">
                                {listTime1.map((item) => {
                                  return (
                                    <div
                                      className="dropdown-menu"
                                      onClick={() => {
                                        setChangeSince(item);
                                        setOpenMenuSince(false);
                                      }}
                                      // onMouseEnter={() => setIsHoveredChild(true)}
                                      // onMouseLeave={() => setIsHoveredChild(false)}
                                    >
                                      <div className="guiOnline">{item}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={secondChartOptions}
                          theme="light"
                        />
                      </div>
                    )}
                  </div>
                  <div className="hightchart">
                    {fourChartOptions && (
                      <div style={{ width: '100%' }} className="box">
                        <div className="header-chart">
                          <div className="title-chart">
                            Cơ cấu vốn FDI theo dự án
                          </div>
                          <div
                            className="box-btn-since"
                            onClick={(e) => {
                              e.stopPropagation();

                              setOpenMenuSince1((prev: any) => !prev);
                            }}
                          >
                            Từ: {changeSince2}
                            <DownOutlined style={{ fontSize: '10px' }} />
                          </div>
                          {openMenuSince1 && (
                            <>
                              <div className="drop-btn-since">
                                {listTime2.map((item) => (
                                  <div
                                    className="dropdown-menu"
                                    // onMouseEnter={() => setIsHoveredChild(true)}
                                    // onMouseLeave={() => setIsHoveredChild(false)}
                                    onClick={() => {
                                      setChangeSince2(item);
                                      setOpenMenuSince1(false);
                                    }}
                                  >
                                    <div className="guiOnline">{item}</div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>{' '}
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={fourChartOptions}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeTitle === 'Đầu tư công' ? (
              <div className="map-VN">
                <div style={{ width: '52%', height: '100%' }}>
                  <MapChart
                    highchartsStylesBorder={highchartsStylesBorder}
                    activeTitle={activeTitle}
                  />
                </div>
                <div
                  style={{
                    width: '100%',

                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div className="hightchart">
                    {secondChartOptions && (
                      <div style={{ width: '100%' }} className="box">
                        <div className="header-chart">
                          <div className="title-chart">
                            Vốn đầu tư công theo bộ ngành
                          </div>
                          <div
                            className="box-btn-since"
                            onClick={(e) => {
                              e.stopPropagation();

                              setOpenMenuSince((prev: any) => !prev);
                            }}
                          >
                            Từ: {changeSince}
                            <DownOutlined style={{ fontSize: '10px' }} />
                          </div>
                          {openMenuSince && (
                            <>
                              <div className="drop-btn-since">
                                {listTime1.map((item) => {
                                  return (
                                    <div
                                      className="dropdown-menu"
                                      onClick={() => {
                                        setChangeSince(item);
                                        setOpenMenuSince(false);
                                      }}
                                      // onMouseEnter={() => setIsHoveredChild(true)}
                                      // onMouseLeave={() => setIsHoveredChild(false)}
                                    >
                                      <div className="guiOnline">{item}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                        {activeTitle === 'Đầu tư công' ? (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={secondChartOptions}
                            theme="light"
                            ref={addChartRef}
                          />
                        ) : (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={secondChartOptions}
                            theme="light"
                          />
                        )}

                        {secondChartOptions?.title.text ===
                          'Vốn đầu tư công theo bộ ngành' && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              position: 'absolute',
                              bottom: '23px',
                              right: '27px',
                            }}
                          >
                            <button
                              style={{
                                zIndex: 20,
                                background: 'transparent',
                                border: 'none',
                              }}
                              onClick={() => scrollLegend(0, 'up')}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M19.9682 15.8016L12.5454 8.20625C12.2759 7.93125 11.7244 7.93125 11.457 8.20625L4.03213 15.8016C4.01386 15.8202 4.00291 15.8423 4.00051 15.8653C3.9981 15.8883 4.00432 15.9114 4.01849 15.932C4.03266 15.9525 4.05422 15.9697 4.08078 15.9817C4.10734 15.9938 4.13786 16.0001 4.16896 16H5.74783C5.85519 16 5.95624 15.9609 6.0194 15.8969L12.0001 9.77812L17.9809 15.8969C18.044 15.9609 18.1451 16 18.2525 16H19.8313C19.9682 16 20.0482 15.8844 19.9682 15.8016Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <button
                              style={{
                                background: 'transparent',
                                border: 'none',
                              }}
                              onClick={() => scrollLegend(0, 'down')} // Tương tự như trên
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M19.8321 8H18.2531C18.1458 8 18.0447 8.03906 17.9816 8.10313L12.0004 14.2219L6.01925 8.10313C5.95609 8.03906 5.85503 8 5.74766 8H4.16869C4.03185 8 3.95184 8.11563 4.03185 8.19844L11.4551 15.7937C11.7246 16.0687 12.2762 16.0687 12.5436 15.7937L19.9668 8.19844C20.049 8.11563 19.969 8 19.8321 8Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="hightchart">
                    {fourChartOptions && (
                      <div style={{ width: '100%' }} className="box">
                        <div className="header-chart">
                          <div className="title-chart">
                            Tổng giải ngân vốn đầu tư công
                          </div>
                          <div
                            className="box-btn-since"
                            onClick={(e) => {
                              e.stopPropagation();

                              setOpenMenuSince1((prev: any) => !prev);
                            }}
                          >
                            Từ: {changeSince2}
                            <DownOutlined style={{ fontSize: '10px' }} />
                          </div>
                          {openMenuSince1 && (
                            <>
                              <div className="drop-btn-since">
                                {listTime2.map((item) => (
                                  <div
                                    className="dropdown-menu"
                                    // onMouseEnter={() => setIsHoveredChild(true)}
                                    // onMouseLeave={() => setIsHoveredChild(false)}
                                    onClick={() => {
                                      setChangeSince2(item);
                                      setOpenMenuSince1(false);
                                    }}
                                  >
                                    <div className="guiOnline">{item}</div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={fourChartOptions}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="chart-marco">
                <div className="hightchart">
                  {firstChartOptions && (
                    <div className="box">
                      <div className="header-chart">
                        <div className="title-chart">
                          {activeTitle === 'Tổng sản phẩm quốc nội'
                            ? 'GDP Danh nghĩa'
                            : activeTitle === 'Bán lẻ - Tiêu dùng'
                              ? 'Tổng bán lẻ hàng hoá và dịch vụ'
                              : activeTitle === 'Xuất nhập khẩu'
                                ? 'Xuất kim ngạch xuất khẩu'
                                : ''}
                        </div>
                        <div
                          className="box-btn-since"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuSince((prev: any) => !prev);
                          }}
                        >
                          Từ: {changeSince}
                          <DownOutlined style={{ fontSize: '10px' }} />
                        </div>
                        {openMenuSince && (
                          <>
                            <div className="drop-btn-since">
                              {listTime1.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="dropdown-menu"
                                    onClick={() => {
                                      setChangeSince(item);
                                      setOpenMenuSince(false);
                                    }}
                                    // onMouseEnter={() => setIsHoveredChild(true)}
                                    // onMouseLeave={() => setIsHoveredChild(false)}
                                  >
                                    <div className="guiOnline">{item}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={firstChartOptions}
                      />
                    </div>
                  )}

                  {secondChartOptions && (
                    <div className="box">
                      <div className="header-chart">
                        <div className="title-chart">
                          {activeTitle === 'Tổng sản phẩm quốc nội'
                            ? 'Cơ cấu GDP Danh nghĩa'
                            : activeTitle === 'Bán lẻ - Tiêu dùng'
                              ? 'Cơ cấu tổng mức bán lẻ hàng hoá và dịch vụ'
                              : activeTitle === 'Xuất nhập khẩu'
                                ? 'Thặng dư thương mại'
                                : ''}
                        </div>
                        <div
                          className="box-btn-since"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuSince1((prev: any) => !prev);
                          }}
                        >
                          Từ: {changeSince2}
                          <DownOutlined style={{ fontSize: '10px' }} />
                        </div>
                        {openMenuSince1 && (
                          <>
                            <div className="drop-btn-since">
                              {listTime2.map((item) => (
                                <div
                                  className="dropdown-menu"
                                  // onMouseEnter={() => setIsHoveredChild(true)}
                                  // onMouseLeave={() => setIsHoveredChild(false)}
                                  onClick={() => {
                                    setChangeSince2(item);
                                    setOpenMenuSince1(false);
                                  }}
                                >
                                  <div className="guiOnline">{item}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={secondChartOptions}
                        theme="light"
                      />
                    </div>
                  )}
                </div>
                <div className="hightchart">
                  {thirdChartOptions && (
                    <div className="box">
                      <div className="header-chart">
                        <div className="title-chart">
                          {activeTitle === 'Tổng sản phẩm quốc nội'
                            ? 'GDP Thực'
                            : activeTitle === 'Bán lẻ - Tiêu dùng'
                              ? 'CPI'
                              : activeTitle === 'Xuất nhập khẩu'
                                ? 'Tổng kim ngạch nhập khẩu'
                                : ''}
                        </div>
                        <div
                          className="box-btn-since"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuSince2((prev: any) => !prev);
                          }}
                        >
                          Từ: {changeSince3}
                          <DownOutlined style={{ fontSize: '10px' }} />
                        </div>
                        {openMenuSince2 && (
                          <>
                            <div className="drop-btn-since">
                              {listTime3.map((item) => (
                                <div
                                  className="dropdown-menu"
                                  // onMouseEnter={() => setIsHoveredChild(true)}
                                  // onMouseLeave={() => setIsHoveredChild(false)}
                                  onClick={() => {
                                    setChangeSince3(item);
                                    setOpenMenuSince2(false);
                                  }}
                                >
                                  <div className="guiOnline">{item}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={thirdChartOptions}
                        theme="light"
                      />
                    </div>
                  )}

                  {fourChartOptions && (
                    <div className="box">
                      <div className="header-chart">
                        <div className="title-chart">
                          {activeTitle === 'Tổng sản phẩm quốc nội'
                            ? 'Cơ cấu GDP Thực'
                            : activeTitle === 'Bán lẻ - Tiêu dùng'
                              ? 'Cơ cấu CPI'
                              : activeTitle === 'Xuất nhập khẩu'
                                ? 'Tổng kim ngạch xuất nhập khẩu'
                                : ''}
                        </div>
                        <div
                          className="box-btn-since"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuSince3((prev: any) => !prev);
                          }}
                        >
                          Từ: {changeSince4}
                          <DownOutlined style={{ fontSize: '10px' }} />
                        </div>
                        {openMenuSince3 && (
                          <>
                            <div className="drop-btn-since">
                              {listTime4.map((item) => (
                                <div
                                  className="dropdown-menu"
                                  // onMouseEnter={() => setIsHoveredChild(true)}
                                  // onMouseLeave={() => setIsHoveredChild(false)}
                                  onClick={() => {
                                    setChangeSince4(item);
                                    setOpenMenuSince3(false);
                                  }}
                                >
                                  <div className="guiOnline">{item}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {activeTitle === 'Bán lẻ - Tiêu dùng' ? (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={fourChartOptions}
                          ref={addChartRef}
                        />
                      ) : (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={fourChartOptions}
                        />
                      )}

                      {fourChartOptions?.title.text === 'Cơ cấu CPI' && (
                        <div className="btn-chart">
                          <button
                            style={{
                              zIndex: 20,
                              background: 'transparent',
                              border: 'none',
                            }}
                            onClick={() => scrollLegend(0, 'up')}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M19.9682 15.8016L12.5454 8.20625C12.2759 7.93125 11.7244 7.93125 11.457 8.20625L4.03213 15.8016C4.01386 15.8202 4.00291 15.8423 4.00051 15.8653C3.9981 15.8883 4.00432 15.9114 4.01849 15.932C4.03266 15.9525 4.05422 15.9697 4.08078 15.9817C4.10734 15.9938 4.13786 16.0001 4.16896 16H5.74783C5.85519 16 5.95624 15.9609 6.0194 15.8969L12.0001 9.77812L17.9809 15.8969C18.044 15.9609 18.1451 16 18.2525 16H19.8313C19.9682 16 20.0482 15.8844 19.9682 15.8016Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                          <button
                            style={{
                              background: 'transparent',
                              border: 'none',
                            }}
                            onClick={() => scrollLegend(0, 'down')} // Tương tự như trên
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M19.8321 8H18.2531C18.1458 8 18.0447 8.03906 17.9816 8.10313L12.0004 14.2219L6.01925 8.10313C5.95609 8.03906 5.85503 8 5.74766 8H4.16869C4.03185 8 3.95184 8.11563 4.03185 8.19844L11.4551 15.7937C11.7246 16.0687 12.2762 16.0687 12.5436 15.7937L19.9668 8.19844C20.049 8.11563 19.969 8 19.8321 8Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right-bottom">
            <TableMacro
              screenMode={screenMode}
              menuTitle={menuTitle}
              setMenuTitle={setMenuTitle}
              activeTitle={activeTitle}
              filteredInfo={filteredInfo}
              setFilteredInfo={setFilteredInfo}
              listData={listData}
            />
          </div>
        </div>
      </div>
    </StyledMarco>
  );
};

export default Macro;
