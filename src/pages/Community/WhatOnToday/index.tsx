import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import React from 'react';
import { WhatOnTodayStyled } from './styled';

const WhatOnToday = () => {
  return (
    <CommunityLayout>
      <WhatOnTodayStyled>Hôm nay có gì</WhatOnTodayStyled>
    </CommunityLayout>
  );
};

export default WhatOnToday;
