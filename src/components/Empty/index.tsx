import React from 'react';
import MoonImage from '/moon_empty.png';
import { StyledEmpty } from './styled';
const Empty = () => {
  return (
    <div>
      <StyledEmpty>
        <img src={MoonImage} alt="" />
        <div className="desc">
          Hiện tại không có thông tin nào được hiển thị tại đây.
        </div>
      </StyledEmpty>
    </div>
  );
};

export default Empty;
