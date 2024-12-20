/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Tooltip, Menu, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { screenModeSelector } from '@/redux/screen/selector';
import { useSelector } from 'react-redux';
import { StyledMarcoTable } from './styled';

export const TableMacro = ({
  listData,
  filteredInfo,
  activeTitle,
  setFilteredInfo,
  menuTitle,
  setMenuTitle,
  screenMode,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredChild, setIsHoveredChild] = useState(false);

  const getQuarter = (dateString) => {
    const date = new Date(dateString?.split('/').reverse().join('-'));
    return Math.floor(date.getMonth() / 3) + 1;
  };

  let data = [];
  if (listData && typeof listData[0] === 'object' && listData[0] !== null) {
    data = Object.keys(listData[0])
      .filter((key) => key !== 'time')
      .map((key) => ({
        key: key,
        platform: 'iOS',
      }));
  }

  const expandedRowRender = () => {
    const columns = [
      { title: 'Time', dataIndex: 'time', key: 'time' },
      {
        title: 'GDP Current Price',
        dataIndex: 'gdp_theo_gia_hien_hanh',
        key: 'gdp_theo_gia_hien_hanh',
      },
      // add more columns as needed
    ];

    const data = listData?.map((item, index) => ({
      key: index.toString(),
      time: item.time,
      gdp_theo_gia_hien_hanh: item.gdp_theo_gia_hien_hanh,
      // add more key-value pairs as needed
    }));

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  const organizeDataByYearAndQuarter = (data) => {
    const organizedData = {}; // { year: { Q1: data, Q2: data, ... } }

    data.forEach((item) => {
      const year = item?.time?.split('/')[2];
      const quarter = `Q${getQuarter(item.time)}`;
      if (!organizedData[year]) {
        organizedData[year] = {};
      }
      if (!organizedData[year][quarter]) {
        organizedData[year][quarter] = [];
      }
      organizedData[year][quarter].push(item);
    });

    return organizedData;
  };
  const isGDP =
    filteredInfo?.name === 'GDP Danh nghĩa' ||
    filteredInfo?.name === 'GDP Thực';
  const organizedData = organizeDataByYearAndQuarter(listData);
  const [tabTable, setTabTable] = useState();

  useEffect(() => {
    if (activeTitle === 'Tổng sản phẩm quốc nội') {
      setFilteredInfo({
        name: 'GDP Danh nghĩa',
      });
      setTabTable(['GDP Danh nghĩa', 'GDP Thực']);
    } else if (activeTitle === 'Bán lẻ - Tiêu dùng') {
      setFilteredInfo({
        name: 'Tổng mức bán lẻ dịch vụ',
      });
      setTabTable(['Tổng mức bán lẻ dịch vụ', 'CPI']);
    } else if (activeTitle === 'Xuất nhập khẩu') {
      setFilteredInfo({
        name: 'Xuất nhập khẩu',
      });
      setTabTable(['Xuất nhập khẩu']);
    } else if (activeTitle === 'FDI') {
      setFilteredInfo({
        name: 'FDI',
      });
      setTabTable(['FDI']);
    } else if (activeTitle === 'Đầu tư công') {
      setFilteredInfo({
        name: 'Vốn đầu tư ngân sách Nhà Nước',
      });
      setTabTable(['Vốn đầu tư ngân sách Nhà Nước']);
    } else if (activeTitle === 'Sản xuất công nghiệp') {
      setFilteredInfo({
        name: 'PMI',
      });
      setTabTable(['PMI', 'IIP']);
    }
  }, [activeTitle]);
  const removeTabNow = tabTable?.filter((item) => item !== filteredInfo?.name);
  const textTab = removeTabNow?.map((item) => {
    return item;
  });

  const createDynamicColumns = (organizedData, listData) => {
    const columns = [
      {
        title: (
          <>
            <div
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: isHovered ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                width: '230px',
                // marginRight: '14px',
                // borderRight: '2px solid #3A3F42',
                marginLeft: '4px',
                display: 'flex',
                flexDirection: 'row',

                paddingRight: '4px',
                marginBottom: '5px',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: screenMode === 'light' ? '#2E3138' : '#fff',
                  // width: '170px',
                  // marginRight: '14px',
                  // borderRight: '2px solid #3A3F42',

                  display: 'flex',
                  flexDirection: 'row',

                  gap: '4px',
                  cursor: 'pointer',

                  borderRadius: '4px',
                  padding: '4px 4px 4px 8px',

                  width: '100%',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                  // setTypeLaiSuat('guiTaiQuay');
                  e.stopPropagation();
                  if (activeTitle === 'Đầu tư công') {
                    setMenuTitle(false);
                  } else if (activeTitle === 'Xuất nhập khẩu') {
                    setMenuTitle(false);
                  } else if (activeTitle === 'FDI') {
                    setMenuTitle(false);
                  } else {
                    setMenuTitle((prev: any) => !prev);
                  }
                }}
              >
                {filteredInfo?.name?.length > 20
                  ? filteredInfo?.name?.slice(0, 20) + '...'
                  : filteredInfo?.name}
              </div>
            </div>
            {menuTitle && tabTable.length > 0 && (
              <div
                style={{
                  position: 'relative',
                  // border: '1px solid #197fbf',
                  width: '220px',
                  backgroundColor: '#1E3446',
                  borderRadius: '4px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                  border: isHoveredChild
                    ? '1px solid #197fbf'
                    : '1px solid #1E3446',
                  zIndex: '20',
                  left: '8px',
                }}
                className="dropdownLaiSuat"
                onMouseEnter={() => setIsHoveredChild(true)}
                onMouseLeave={() => setIsHoveredChild(false)}
              >
                {filteredInfo?.name === filteredInfo?.name && (
                  <>
                    {textTab.map((item) => (
                      <div
                        style={{
                          fontWeight: '500',
                          fontSize: '13px',
                          // color:
                          //   screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                          // color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                          width: '170px',
                          marginLeft: '4px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: screenMode === 'light' ? '#2E3138' : '#fff',

                          padding: '8px 0',
                        }}
                        className="guiOnline"
                        onClick={() => {
                          setFilteredInfo({ name: item });
                          setMenuTitle(false);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </>
        ),
        fixed: 'left',

        dataIndex: 'key',
        key: 'key',
        width: 235,
        // textWrap: 'word-break',
        // ellipsis: true,
        // render: (text, record) => {
        //   // return 'aaa';
        //   return (
        //     <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        //       {time[record.key]}
        //     </div>
        //   );
        //   // return time[record.key];
        // },

        onHeaderCell: () => {
          return {
            style: {
              borderRight:
                screenMode === 'dark'
                  ? '1px solid #3a3f42'
                  : '1px solid #D5D7DC', // Thêm đường viền bên phải cho cell
              backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
            },
          };
        },
        onCell: (record, rowIndex) => {
          return {
            style: {
              borderRight:
                screenMode === 'dark'
                  ? '1px solid #3a3f42'
                  : '1px solid #D5D7DC',
              backgroundColor: 'transparent',
            },
          };
        },
        render: (text) => {
          const displayNames = {
            gdp_theo_gia_hien_hanh: 'GDP Theo giá hiện hành',
            gdp_hh_nong_nghiep_lam_nghiep_va_thuy_san:
              'GDP HH Nông nghiệp, lâm nghiệp và thủy sản',
            gdp_hh_nong_nghiep: 'GDP HH Nông nghiệp',
            gdp_hh_lam_nghiep: 'GDP HH Lâm nghiệp',
            gdp_hh_thuy_san: 'GDP HH Thủy sản',
            gdp_hh_cong_nghiep_va_xay_dung: 'GDP HH Công nghiệp và xây dựng',
            gdp_hh_cong_nghiep: 'GDP HH Công nghiệp',
            gdp_hh_khai_khoang: 'GDP HH Khai khoáng',
            gdp_hh_cong_nghiep_che_bien_che_tao:
              'GDP HH Công nghiệp chế biến, chế tạo',
            gdp_hh_san_xuat_va_phan_phoi_dien:
              'GDP HH Sản xuất và phân phối điện',
            gdp_hh_cung_cap_nuoc_va_xu_ly_nuoc_thai:
              'GDP HH Cung cấp nước và xử lý nước thải',
            gdp_hh_xay_dung: 'GDP HH Xây dựng',
            gdp_hh_dich_vu: 'GDP HH Dịch vụ',
            gdp_hh_ban_buon_ban_le_sua_chua_o_to_mo_to_xe_may:
              'GDP HH Bán buôn bán lẻ, sửa chữa ô tô, mô tô, xe máy',
            gdp_hh_van_tai_kho_bai: 'GDP HH Vận tải kho bãi',
            gdp_hh_dich_vu_luu_tru_va_an_uong:
              'GDP HH Dịch vụ lưu trú và ăn uống',
            gdp_hh_thong_tin_va_truyen_thong:
              'GDP HH Thông tin và truyền thông',
            gdp_hh_hoat_dong_tai_chinh_ngan_hang_va_bao_hiem:
              'GDP HH Hoạt động tài chính, ngân hàng và bảo hiểm',
            gdp_hh_hoat_dong_kinh_doanh_bat_dong_san:
              'GDP HH Hoạt động kinh doanh bất động sản',
            gdp_hh_hoat_dong_chuyen_mon_khoa_hoc_va_cong_nghe:
              'GDP HH Hoạt động chuyên môn, khoa học và công nghệ',
            gdp_hh_hoat_dong_hanh_chinh_va_dich_vu_ho_tro:
              'GDP HH Hoạt động hành chính và dịch vụ hỗ trợ',
            gdp_hh_hoat_dong_cua_cac_to_chuc_chinh_tri:
              'GDP HH Hoạt động của các tổ chức chính trị',
            gdp_hh_giao_duc_va_dao_tao: 'GDP HH Giáo dục đào tạo',
            gdp_hh_y_te_va_hoat_dong_cuu_tro_xa_hoi:
              'GDP HH Y tế và hoạt động cứu trợ xã hội',
            gdp_hh_nghe_thuat_vui_choi_va_giai_tri:
              'GDP HH Nghệ thuật, vui chơi và giải trí',
            gdp_hh_hoat_dong_dich_vu_khac: 'GDP HH Hoạt động dịch vụ khác',
            gdp_hh_hoat_dong_lam_thue_cac_cong_viec_trong_cac_ho_gia_dinh:
              'GDP HH Hoạt động làm thuê các công việc trong các hộ gia đình',
            gdp_hh_thue_san_pham_tru_tro_cap_san_pham:
              'GDP HH Thuế sản phẩm trừ trợ cấp sản phẩm',
            tangTruongCungKy: 'Tăng trưởng cùng kỳ',
            gdp_so_sanh: 'GDP So sánh',
            gdp_nong_nghiep_lam_nghiep_va_thuy_san:
              'GDP Nông nghiệp, lâm nghiệp và thủy sản',
            gdp_nong_nghiep: 'GDP Nông nghiệp',
            gdp_lam_nghiep: 'GDP Lâm nghiệp',
            gdp_thuy_san: 'GDP Thủy sản',
            gdp_cong_nghiep_va_xay_dung: 'GDP Công nghiệp và xây dựng',
            gdp_cong_nghiep: 'GDP Công nghiệp',
            gdp_khai_khoang: 'GDP Khai khoáng',
            gdp_san_xuat_va_phan_phoi_dien: 'GDP Sản xuất và phân phối điện',
            gdp_cong_nghiep_che_bien_che_tao:
              'GDP Công nghiệp chế biến, chế tạo',
            gdp_cung_cap_nuoc_va_xu_ly_nuoc_thai:
              'GDP Cung cấp nước và xử lý nước thải',
            gdp_xay_dung: 'GDP Xây dựng',
            gdp_dich_vu: 'GDP Dịch vụ',
            gdp_van_tai_kho_bai: 'GDP Vận tải kho bãi',
            gdp_ban_buon_ban_le_sua_chua_o_to_mo_to_xe_may:
              'GDP Bán buôn bán lẻ, sửa chữa ô tô, mô tô, xe máy',
            gdp_dich_vu_luu_tru_va_an_uong: 'GDP Dịch vụ lưu trú và ăn uống',
            gdp_thong_tin_va_truyen_thong: 'GDP Thông tin và truyền thông',
            gdp_hoat_dong_tai_chinh_ngan_hang_va_bao_hiem:
              'GDP Hoạt động tài chính, ngân hàng và bảo hiểm',
            gdp_hoat_dong_kinh_doanh_bat_dong_san:
              'GDP Hoạt động kinh doanh bất động sản',
            gdp_hoat_dong_chuyen_mon_khoa_hoc_va_cong_nghe:
              'GDP Hoạt động chuyên môn, khoa học và công nghệ',
            gdp_hoat_dong_hanh_chinh_va_dich_vu_ho_tro:
              'GDP Hoạt động hành chính và dịch vụ hỗ trợ',
            gdp_hoat_dong_cua_cac_to_chuc_chinh_tri:
              'GDP Hoạt động của các tổ chức chính trị',
            gdp_giao_duc_va_dao_tao: 'GDP Giáo dục đào tạo',
            gdp_y_te_va_hoat_dong_cuu_tro_xa_hoi:
              'GDP Y tế và hoạt động cứu trợ xã hội',
            gdp_nghe_thuat_vui_choi_va_giai_tri:
              'GDP Nghệ thuật, vui chơi và giải trí',
            gdp_hoat_dong_dich_vu_khac: 'GDP Hoạt động dịch vụ khác',
            gdp_hoat_dong_lam_thue_cac_cong_viec_trong_cac_ho_gia_dinh:
              'GDP Hoạt động làm thuê các công việc trong các hộ gia đình',
            gdp_thue_san_pham_tru_tro_cap_san_pham:
              'GDP Thuế sản phẩm trừ trợ cấp sản phẩm',
            CPI: 'CPI',
            CPI_hang_an_va_dich_vu_an_uong: 'CPI Hàng ăn và dịch vụ ăn uống',
            CPI_luong_thuc: 'CPI Lương thực',
            CPI_thuc_pham: 'CPI Thực phẩm',
            CPI_an_uong_ngoai_gia_dinh: 'CPI Ăn uống ngoài gia đình',
            CPI_do_uong_va_thuoc_la: 'CPI Đồ uống và thuốc lá',
            CPI_may_mac_mu_non_giay_dep: 'CPI May mặc, mũ nón, giầy dép',
            CPI_nha_o_va_vat_lieu_xay_dung: 'CPI Nhà ở và vật liệu xây dựng',
            CPI_thiet_bi_va_do_dung_gia_dinh:
              'CPI Thiết bị và đồ dùng gia đình',
            CPI_thuoc_va_dich_vu_y_te: 'CPI Thuốc và dịch vụ y tế',
            CPI_dich_vu_y_te: 'CPI Dịch vụ y tế',
            CPI_giao_thong: 'CPI Giao thông',
            CPI_buu_chinh_vien_thong: 'CPI Bưu chính viễn thông',
            CPI_giao_duc: 'CPI Giáo dục',
            CPI_dich_vu_giao_duc: 'CPI Dịch vụ giáo dục',
            CPI_hang_hoa_va_dich_vu_khac: 'CPI Hàng hoá và dịch vụ khác',
            CPI_van_hoa_giai_tri_va_du_lich: 'CPI Văn hoá, giải trí và du lịch',
            von_thuc_hien_fdi: 'Vốn thực hiện FDI',
            dang_ky_tang_them_fdi: 'Đăng ký tăng thêm FDI',
            gop_von_mua_co_phan_fdi: 'Góp vốn, mua cổ phần FDI',
            dang_ky_cap_moi_fdi: 'Đăng ký cấp mới FDI',
            von_dang_ky_fdi: 'Vốn đăng ký FDI',
            so_du_an_cap_moi_fdi: 'Số dự án cấp mới FDI',
            so_du_an_tang_von_fdi: 'Số dự án tăng vốn FDI',
            tong_ban_le_hh_va_dv: 'Tổng bán lẻ HH và DV',
            ban_le_dich_vu_luu_tru_an_uong: 'Bán lẻ Dịch vụ lưu trú, ăn uống',
            ban_le_hang_hoa: 'Bán lẻ Hàng hoá',
            ban_le_du_lich_lu_hanh: 'Bán lẻ Du lịch lữ hành',
            ban_le_dich_vu_khac: 'Bán lẻ Dịch vụ khác',
            von_nsnn_tong: 'Vốn NSNN Tổng',
            von_nsnn_trung_uong: 'Vốn NSNN Trung ương',
            von_nsnn_bo_y_te: 'Vốn NSNN Bộ Y tế',
            von_nsnn_bo_giao_duc_dao_tao: 'Vốn NSNN Bộ Giáo dục - Đào tạo',
            von_nsnn_bo_giao_thong_van_tai: 'Vốn NSNN Bộ Giao thông vận tải',
            // Lưu ý: Có lặp lại "Vốn NSNN Bộ Giao thông vận tải", có thể bỏ qua hoặc xử lý tùy theo yêu cầu cụ thể
            von_nsnn_bo_nn_va_ptnt: 'Vốn NSNN Bộ NN và PTNT',
            von_nsnn_bo_tai_nguyen_va_moi_truong:
              'Vốn NSNN Bộ Tài nguyên và Môi trường',
            von_nsnn_bo_xay_dung: 'Vốn NSNN Bộ Xây dựng',
            von_nsnn_bo_cong_thuong: 'Vốn NSNN Bộ Công thương',
            von_nsnn_bo_van_hoa_the_thao_va_du_lich:
              'Vốn NSNN Bộ Văn hóa, Thể thao và Du lịch',
            von_nsnn_bo_khoa_hoc_va_cong_nghe:
              'Vốn NSNN Bộ Khoa học và Công nghệ',
            von_nsnn_bo_thong_tin_va_truyen_thong:
              'Vốn NSNN Bộ Thông tin và Truyền thông',
            von_nsnn_dia_phuong: 'Vốn NSNN Địa phương',
            von_nsnn_von_ngan_sach_nn_cap_huyen:
              'Vốn NSNN Vốn ngân sách NN cấp huyện',
            von_nsnn_von_ngan_sach_nn_cap_xa:
              'Vốn NSNN Vốn ngân sách NN cấp xã',
            von_nsnn_von_ngan_sach_nn_cap_tinh:
              'Vốn NSNN Vốn ngân sách NN cấp tỉnh',
            time: 'time',
            XK_tong: 'XK Tổng',
            XK_khu_vuc_trong_nuoc: 'XK Khu vực trong nước',
            XK_khu_vuc_trong_FDI: 'XK Khu vực trong FDI',
            NK_tong: 'NK Tổng',
            NK_khu_vuc_trong_nuoc: 'NK Khu vực trong nước',
            NK_khu_vuc_trong_FDI: 'NK Khu vực trong FDI',
            thangDuThuongMai: 'Thặng dư thương mại',
            pmi: 'PMI',
            iip: 'IIP',
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
    const columnsQuarter = [
      {
        title: (
          <>
            <div
              style={{
                fontWeight: '500',
                fontSize: '14px',
                color: isHovered ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                width: '220px',
                // marginRight: '14px',
                // borderRight: '2px solid #3A3F42',
                marginLeft: '4px',
                display: 'flex',
                flexDirection: 'row',

                paddingRight: '4px',
                marginBottom: '37px',
                cursor: 'pointer',
                // border: ' 1px solid #197fbf',
                borderRadius: '4px',
                // padding: '4px',
                // backgroundColor: '#197fbf',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={(e) => {
                // setTypeLaiSuat('guiTaiQuay');
                e.stopPropagation();

                setMenuTitle((prev: any) => !prev);
              }}
            >
              <div
                style={{
                  fontWeight: '500',
                  fontSize: '14px',
                  color: screenMode === 'light' ? '#2E3138' : '#fff',
                  background: screenMode === 'dark' ? 'transparent' : '#fff',
                  // width: '170px',
                  // marginRight: '14px',
                  border: isHovered
                    ? screenMode === 'dark'
                      ? '1px solid #878D9B'
                      : '1px solid #818498'
                    : screenMode === 'dark'
                      ? '1px solid #3A3F42'
                      : '1px solid #D5D7DC',
                  marginLeft: '4px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingRight: '4px',
                  gap: '4px',
                  cursor: 'pointer',

                  borderRadius: '6px',
                  padding: '4px',

                  width: '100%',
                  textTransform: 'uppercase',
                }}
                className="typeLaiSuat"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                  // setTypeLaiSuat('guiTaiQuay');
                  e.stopPropagation();

                  setMenuTitle((prev: any) => !prev);
                }}
              >
                {filteredInfo?.name}

                <DownOutlined style={{ fontSize: '10px' }} />
              </div>
            </div>
            {menuTitle && (
              <div
                style={{
                  position: 'relative',
                  // border: '1px solid #197fbf',
                  width: '214px',
                  backgroundColor: '#1E3446',
                  borderRadius: '4px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                  top: '-36px',
                  border: isHoveredChild
                    ? '1px solid #197fbf'
                    : '1px solid #1E3446',
                  zIndex: '20',
                  left: '7px',
                }}
                className="dropdownLaiSuat"
                onMouseEnter={() => setIsHoveredChild(true)}
                onMouseLeave={() => setIsHoveredChild(false)}
              >
                {filteredInfo?.name === filteredInfo?.name && (
                  <>
                    {textTab.map((item) => (
                      <div
                        style={{
                          fontWeight: '500',
                          fontSize: '13px',
                          // color:
                          //   screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                          // color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                          width: '170px',
                          marginLeft: '4px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#fff',
                          padding: '8px 0',
                        }}
                        className="guiOnline"
                        onClick={() => {
                          setFilteredInfo({ name: item });
                          setMenuTitle(false);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </>
        ),
        fixed: 'left',
        width: 235,
        dataIndex: 'key',
        key: 'key',

        // render: (text, record) => {
        //   // return 'aaa';
        //   return (
        //     <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        //       {time[record.key]}
        //     </div>
        //   );
        //   // return time[record.key];
        // },

        onHeaderCell: () => {
          return {
            style: {
              borderRight:
                screenMode === 'dark'
                  ? isGDP
                    ? '1px solid #3a3f42'
                    : ''
                  : isGDP
                    ? '1px solid #D5D7DC'
                    : '',
              backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
            },
          };
        },
        onCell: (record, rowIndex) => {
          return {
            style: {
              // borderLeft:
              // screenMode === 'dark'
              //   ? isLastQuarter && isLastYear
              //     ? '1px solid #3a3f42 '
              //     : ''
              //   : isLastQuarter && isLastYear
              //     ? '1px solid #D5D7DC '
              //     : '',
              borderRight:
                screenMode === 'dark'
                  ? isGDP
                    ? '1px solid #3a3f42'
                    : ''
                  : isGDP
                    ? '1px solid #D5D7DC'
                    : '',
              // borderTop:
              //   screenMode === 'dark'
              //     ? isGDP
              //       ? '1px solid #3a3f42'
              //       : ''
              //     : isGDP
              //       ? '1px solid #D5D7DC'
              //       : '',
              backgroundColor: screenMode === 'dark' ? ' #202127' : ' #ECECEF',
            },
          };
        },
        render: (text) => {
          const displayNames = {
            gdp_theo_gia_hien_hanh: 'GDP Theo giá hiện hành',
            gdp_hh_nong_nghiep_lam_nghiep_va_thuy_san:
              'GDP HH Nông nghiệp, lâm nghiệp và thủy sản',
            gdp_hh_nong_nghiep: 'GDP HH Nông nghiệp',
            gdp_hh_lam_nghiep: 'GDP HH Lâm nghiệp',
            gdp_hh_thuy_san: 'GDP HH Thủy sản',
            gdp_hh_cong_nghiep_va_xay_dung: 'GDP HH Công nghiệp và xây dựng',
            gdp_hh_cong_nghiep: 'GDP HH Công nghiệp',
            gdp_hh_khai_khoang: 'GDP HH Khai khoáng',
            gdp_hh_cong_nghiep_che_bien_che_tao:
              'GDP HH Công nghiệp chế biến, chế tạo',
            gdp_hh_san_xuat_va_phan_phoi_dien:
              'GDP HH Sản xuất và phân phối điện',
            gdp_hh_cung_cap_nuoc_va_xu_ly_nuoc_thai:
              'GDP HH Cung cấp nước và xử lý nước thải',
            gdp_hh_xay_dung: 'GDP HH Xây dựng',
            gdp_hh_dich_vu: 'GDP HH Dịch vụ',
            gdp_hh_ban_buon_ban_le_sua_chua_o_to_mo_to_xe_may:
              'GDP HH Bán buôn bán lẻ, sửa chữa ô tô, mô tô, xe máy',
            gdp_hh_van_tai_kho_bai: 'GDP HH Vận tải kho bãi',
            gdp_hh_dich_vu_luu_tru_va_an_uong:
              'GDP HH Dịch vụ lưu trú và ăn uống',
            gdp_hh_thong_tin_va_truyen_thong:
              'GDP HH Thông tin và truyền thông',
            gdp_hh_hoat_dong_tai_chinh_ngan_hang_va_bao_hiem:
              'GDP HH Hoạt động tài chính, ngân hàng và bảo hiểm',
            gdp_hh_hoat_dong_kinh_doanh_bat_dong_san:
              'GDP HH Hoạt động kinh doanh bất động sản',
            gdp_hh_hoat_dong_chuyen_mon_khoa_hoc_va_cong_nghe:
              'GDP HH Hoạt động chuyên môn, khoa học và công nghệ',
            gdp_hh_hoat_dong_hanh_chinh_va_dich_vu_ho_tro:
              'GDP HH Hoạt động hành chính và dịch vụ hỗ trợ',
            gdp_hh_hoat_dong_cua_cac_to_chuc_chinh_tri:
              'GDP HH Hoạt động của các tổ chức chính trị',
            gdp_hh_giao_duc_va_dao_tao: 'GDP HH Giáo dục đào tạo',
            gdp_hh_y_te_va_hoat_dong_cuu_tro_xa_hoi:
              'GDP HH Y tế và hoạt động cứu trợ xã hội',
            gdp_hh_nghe_thuat_vui_choi_va_giai_tri:
              'GDP HH Nghệ thuật, vui chơi và giải trí',
            gdp_hh_hoat_dong_dich_vu_khac: 'GDP HH Hoạt động dịch vụ khác',
            gdp_hh_hoat_dong_lam_thue_cac_cong_viec_trong_cac_ho_gia_dinh:
              'GDP HH Hoạt động làm thuê các công việc trong các hộ gia đình',
            gdp_hh_thue_san_pham_tru_tro_cap_san_pham:
              'GDP HH Thuế sản phẩm trừ trợ cấp sản phẩm',
            tangTruongCungKy: 'Tăng trưởng cùng kỳ',
            gdp_so_sanh: 'GDP So sánh',
            gdp_nong_nghiep_lam_nghiep_va_thuy_san:
              'GDP Nông nghiệp, lâm nghiệp và thủy sản',
            gdp_nong_nghiep: 'GDP Nông nghiệp',
            gdp_lam_nghiep: 'GDP Lâm nghiệp',
            gdp_thuy_san: 'GDP Thủy sản',
            gdp_cong_nghiep_va_xay_dung: 'GDP Công nghiệp và xây dựng',
            gdp_cong_nghiep: 'GDP Công nghiệp',
            gdp_khai_khoang: 'GDP Khai khoáng',
            gdp_san_xuat_va_phan_phoi_dien: 'GDP Sản xuất và phân phối điện',
            gdp_cong_nghiep_che_bien_che_tao:
              'GDP Công nghiệp chế biến, chế tạo',
            gdp_cung_cap_nuoc_va_xu_ly_nuoc_thai:
              'GDP Cung cấp nước và xử lý nước thải',
            gdp_xay_dung: 'GDP Xây dựng',
            gdp_dich_vu: 'GDP Dịch vụ',
            gdp_van_tai_kho_bai: 'GDP Vận tải kho bãi',
            gdp_ban_buon_ban_le_sua_chua_o_to_mo_to_xe_may:
              'GDP Bán buôn bán lẻ, sửa chữa ô tô, mô tô, xe máy',
            gdp_dich_vu_luu_tru_va_an_uong: 'GDP Dịch vụ lưu trú và ăn uống',
            gdp_thong_tin_va_truyen_thong: 'GDP Thông tin và truyền thông',
            gdp_hoat_dong_tai_chinh_ngan_hang_va_bao_hiem:
              'GDP Hoạt động tài chính, ngân hàng và bảo hiểm',
            gdp_hoat_dong_kinh_doanh_bat_dong_san:
              'GDP Hoạt động kinh doanh bất động sản',
            gdp_hoat_dong_chuyen_mon_khoa_hoc_va_cong_nghe:
              'GDP Hoạt động chuyên môn, khoa học và công nghệ',
            gdp_hoat_dong_hanh_chinh_va_dich_vu_ho_tro:
              'GDP Hoạt động hành chính và dịch vụ hỗ trợ',
            gdp_hoat_dong_cua_cac_to_chuc_chinh_tri:
              'GDP Hoạt động của các tổ chức chính trị',
            gdp_giao_duc_va_dao_tao: 'GDP Giáo dục đào tạo',
            gdp_y_te_va_hoat_dong_cuu_tro_xa_hoi:
              'GDP Y tế và hoạt động cứu trợ xã hội',
            gdp_nghe_thuat_vui_choi_va_giai_tri:
              'GDP Nghệ thuật, vui chơi và giải trí',
            gdp_hoat_dong_dich_vu_khac: 'GDP Hoạt động dịch vụ khác',
            gdp_hoat_dong_lam_thue_cac_cong_viec_trong_cac_ho_gia_dinh:
              'GDP Hoạt động làm thuê các công việc trong các hộ gia đình',
            gdp_thue_san_pham_tru_tro_cap_san_pham:
              'GDP Thuế sản phẩm trừ trợ cấp sản phẩm',
            CPI: 'CPI',
            CPI_hang_an_va_dich_vu_an_uong: 'CPI Hàng ăn và dịch vụ ăn uống',
            CPI_luong_thuc: 'CPI Lương thực',
            CPI_thuc_pham: 'CPI Thực phẩm',
            CPI_an_uong_ngoai_gia_dinh: 'CPI Ăn uống ngoài gia đình',
            CPI_do_uong_va_thuoc_la: 'CPI Đồ uống và thuốc lá',
            CPI_may_mac_mu_non_giay_dep: 'CPI May mặc, mũ nón, giầy dép',
            CPI_nha_o_va_vat_lieu_xay_dung: 'CPI Nhà ở và vật liệu xây dựng',
            CPI_thiet_bi_va_do_dung_gia_dinh:
              'CPI Thiết bị và đồ dùng gia đình',
            CPI_thuoc_va_dich_vu_y_te: 'CPI Thuốc và dịch vụ y tế',
            CPI_dich_vu_y_te: 'CPI Dịch vụ y tế',
            CPI_giao_thong: 'CPI Giao thông',
            CPI_buu_chinh_vien_thong: 'CPI Bưu chính viễn thông',
            CPI_giao_duc: 'CPI Giáo dục',
            CPI_dich_vu_giao_duc: 'CPI Dịch vụ giáo dục',
            CPI_hang_hoa_va_dich_vu_khac: 'CPI Hàng hoá và dịch vụ khác',
            CPI_van_hoa_giai_tri_va_du_lich: 'CPI Văn hoá, giải trí và du lịch',
            von_thuc_hien_fdi: 'Vốn thực hiện FDI',
            dang_ky_tang_them_fdi: 'Đăng ký tăng thêm FDI',
            gop_von_mua_co_phan_fdi: 'Góp vốn, mua cổ phần FDI',
            dang_ky_cap_moi_fdi: 'Đăng ký cấp mới FDI',
            von_dang_ky_fdi: 'Vốn đăng ký FDI',
            so_du_an_cap_moi_fdi: 'Số dự án cấp mới FDI',
            so_du_an_tang_von_fdi: 'Số dự án tăng vốn FDI',
            tong_ban_le_hh_va_dv: 'Tổng bán lẻ HH và DV',
            ban_le_dich_vu_luu_tru_an_uong: 'Bán lẻ Dịch vụ lưu trú, ăn uống',
            ban_le_hang_hoa: 'Bán lẻ Hàng hoá',
            ban_le_du_lich_lu_hanh: 'Bán lẻ Du lịch lữ hành',
            ban_le_dich_vu_khac: 'Bán lẻ Dịch vụ khác',
            von_nsnn_tong: 'Vốn NSNN Tổng',
            von_nsnn_trung_uong: 'Vốn NSNN Trung ương',
            von_nsnn_bo_y_te: 'Vốn NSNN Bộ Y tế',
            von_nsnn_bo_giao_duc_dao_tao: 'Vốn NSNN Bộ Giáo dục - Đào tạo',
            von_nsnn_bo_giao_thong_van_tai: 'Vốn NSNN Bộ Giao thông vận tải',
            // Lưu ý: Có lặp lại "Vốn NSNN Bộ Giao thông vận tải", có thể bỏ qua hoặc xử lý tùy theo yêu cầu cụ thể
            von_nsnn_bo_nn_va_ptnt: 'Vốn NSNN Bộ NN và PTNT',
            von_nsnn_bo_tai_nguyen_va_moi_truong:
              'Vốn NSNN Bộ Tài nguyên và Môi trường',
            von_nsnn_bo_xay_dung: 'Vốn NSNN Bộ Xây dựng',
            von_nsnn_bo_cong_thuong: 'Vốn NSNN Bộ Công thương',
            von_nsnn_bo_van_hoa_the_thao_va_du_lich:
              'Vốn NSNN Bộ Văn hóa, Thể thao và Du lịch',
            von_nsnn_bo_khoa_hoc_va_cong_nghe:
              'Vốn NSNN Bộ Khoa học và Công nghệ',
            von_nsnn_bo_thong_tin_va_truyen_thong:
              'Vốn NSNN Bộ Thông tin và Truyền thông',
            von_nsnn_dia_phuong: 'Vốn NSNN Địa phương',
            von_nsnn_von_ngan_sach_nn_cap_huyen:
              'Vốn NSNN Vốn ngân sách NN cấp huyện',
            von_nsnn_von_ngan_sach_nn_cap_xa:
              'Vốn NSNN Vốn ngân sách NN cấp xã',
            von_nsnn_von_ngan_sach_nn_cap_tinh:
              'Vốn NSNN Vốn ngân sách NN cấp tỉnh',
            time: 'time',
            XK_tong: 'XK Tổng',
            XK_khu_vuc_trong_nuoc: 'XK Khu vực trong nước',
            XK_khu_vuc_trong_FDI: 'XK Khu vực trong FDI',
            NK_tong: 'NK Tổng',
            NK_khu_vuc_trong_nuoc: 'NK Khu vực trong nước',
            NK_khu_vuc_trong_FDI: 'NK Khu vực trong FDI',
            thangDuThuongMai: 'Thặng dư thương mại',
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
    if (!isGDP) {
      const uniqueTimes = [...new Set(listData.map((item) => item))];
      uniqueTimes.reverse().forEach((time) => {
        columns.push({
          title: time.time,
          dataIndex: time.time,
          key: time.time,
          width: 200,

          render: (text, record) => {
            // return 'aaa';
            return (
              <div>
                {time[record.key]
                  ?.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                  .replace(/,/g, '.')}{' '}
                {/* {?.toFixed(2)} */}
              </div>
            );
            // return time[record.key];
          },
          onHeaderCell: () => {
            return {
              className: 'custom-header-cell',
              style: {
                backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
                // chỉ thêm borderRight nếu đây là năm cuối cùng
              },
            };
          },
          onCell: (record, rowIndex) => {
            return {
              style: {
                backgroundColor: screenMode === 'dark' ? '#202127' : ' #ECECEF',
                color:
                  screenMode === 'dark' ? 'rgba(171, 173, 186, 1)' : '#2E3138',

                borderRight:
                  screenMode === 'dark'
                    ? '1px solid #3a3f42'
                    : '1px solid #D5D7DC',
              },
            };
          },
        });
      });
    } else {
      Object.keys(organizedData)
        .reverse()
        .forEach((year, index, array) => {
          const isLastYear = index === array.length - 1; // Kiểm tra nếu là năm cuối cùng
          const yearColumn = {
            title: year,
            children: [],
            // Đây là thay đổi quan trọng: thêm onHeaderCell vào yearColumn, không chỉ vào children
            onHeaderCell: () => {
              return {
                style: {
                  borderRight:
                    screenMode === 'dark'
                      ? isLastYear
                        ? ''
                        : '1px solid #3a3f42'
                      : isLastYear
                        ? ''
                        : '1px solid #D5D7DC',
                  backgroundColor:
                    screenMode === 'dark' ? '#202127' : '#ECECEF',
                  // chỉ thêm borderRight nếu đây là năm cuối cùng
                },
              };
            },
          };

          Object.keys(organizedData[year]).forEach(
            (quarter, quarterIndex, quarterArray) => {
              const isLastQuarter = quarterIndex === quarterArray.length - 1;
              const isLastYear = index === array.length - 1;
              yearColumn.children.push({
                title: quarter,
                dataIndex: quarter,
                className:
                  isLastQuarter && isLastYear ? 'last-quarter-column' : '',
                key: `${year}-${quarter}`,
                render: (text, record) => {
                  return organizedData[year][quarter].map((item) => {
                    return item[record.key]
                      ?.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      .replace(/,/g, '.');
                  });

                  // .join(', ');
                },
                onHeaderCell: (column) => {
                  return {
                    style: {
                      borderLeft:
                        screenMode === 'dark'
                          ? isLastQuarter && isLastYear
                            ? '1px solid #3a3f42'
                            : ''
                          : isLastQuarter && isLastYear
                            ? '1px solid #D5D7DC'
                            : '',
                      borderRight:
                        screenMode === 'dark'
                          ? isLastQuarter
                            ? '1px solid #3a3f42'
                            : ''
                          : isLastQuarter
                            ? '1px solid #D5D7DC'
                            : '',
                      backgroundColor:
                        screenMode === 'dark' ? '#202127' : '#ECECEF',
                    },
                  };
                },
                onCell: (record, rowIndex) => {
                  return {
                    style: {
                      color:
                        screenMode === 'dark'
                          ? 'rgba(171, 173, 186, 1)'
                          : '#2E3138',
                      borderLeft:
                        screenMode === 'dark'
                          ? isLastQuarter && isLastYear
                            ? '1px solid #3a3f42 '
                            : ''
                          : isLastQuarter && isLastYear
                            ? '1px solid #D5D7DC '
                            : '',
                      borderRight:
                        screenMode === 'dark'
                          ? isLastQuarter
                            ? '1px solid #3a3f42'
                            : ''
                          : isLastQuarter
                            ? '1px solid #D5D7DC'
                            : '',
                      backgroundColor:
                        screenMode === 'dark' ? '#202127' : ' #ECECEF',
                    },
                  };
                },
              });
            }
          );

          columnsQuarter.push(yearColumn);
        });
    }

    return !isGDP ? columns : columnsQuarter;
  };

  const dynamicColumns = createDynamicColumns(organizedData, listData);

  return (
    <StyledMarcoTable screen_mode={screenMode}>
      <div className="table-macrco">
        <Table
          width="100%"
          columns={dynamicColumns}
          dataSource={data}
          onChange={handleChange}
          scroll={{ x: 'max-content' }}
          sticky={true}
        />
      </div>
    </StyledMarcoTable>
  );
};
