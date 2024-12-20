/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import CommentInput from '../CommentInput';
import { Button, Flex, Skeleton } from 'antd';
import { Comment } from '@/types/postsType';
import { formatDate } from '@/utils/helper';

const CommentItemSkeleton: React.FC = ({}) => {
  return (
    <div>
      <Skeleton />
    </div>
  );
};

export default CommentItemSkeleton;
