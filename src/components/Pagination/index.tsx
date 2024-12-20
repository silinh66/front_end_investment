import { Pagination } from 'antd';
import React from 'react';
import { StyledPaginator } from './styled';
import type { PaginationProps } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
const itemRender: PaginationProps['itemRender'] = (
  _,
  type,
  originalElement
) => {
  if (type === 'jump-prev') {
    return (
      <>
        <CaretLeftOutlined className="jump-prev-icon" />
      </>
    );
  }
  if (type === 'jump-next') {
    return (
      <>
        <CaretRightOutlined className="jump-next-icon" />
      </>
    );
  }
  if (type === 'prev') {
    return (
      <>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.08958 0.410093C7.41502 0.73553 7.41502 1.26317 7.08958 1.5886L2.67884 5.99935L7.08958 10.4101C7.41502 10.7355 7.41502 11.2632 7.08958 11.5886C6.76414 11.914 6.23651 11.914 5.91107 11.5886L0.91107 6.5886C0.585633 6.26317 0.585633 5.73553 0.91107 5.41009L5.91107 0.410093C6.23651 0.0846563 6.76414 0.0846565 7.08958 0.410093Z"
            fill="#575A6A"
          />
        </svg>
      </>
    );
  }
  if (type === 'next') {
    return (
      <>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.91107 11.5886C0.585633 11.2632 0.585633 10.7355 0.91107 10.4101L5.32181 5.99935L0.91107 1.5886C0.585633 1.26317 0.585633 0.73553 0.91107 0.410094C1.23651 0.0846563 1.76414 0.0846562 2.08958 0.410094L7.08958 5.41009C7.41502 5.73553 7.41502 6.26317 7.08958 6.5886L2.08958 11.5886C1.76414 11.914 1.23651 11.914 0.91107 11.5886Z"
            fill="#E3E4E8"
          />
        </svg>
      </>
    );
  }
  return originalElement;
};
const Paginator = ({ itemPerPage, data, currentPage, setCurrentPage }) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);

  return (
    <StyledPaginator screen_mode={screenMode}>
      <Pagination
        showSizeChanger={false}
        current={currentPage}
        total={data?.length}
        // pageSize={10}
        pageSize={itemPerPage}
        itemRender={itemRender}
        onChange={(value) => setCurrentPage(value)}
        //    locale={{ items_per_page: '/ trang' }}
      />
    </StyledPaginator>
  );
};

export default Paginator;
