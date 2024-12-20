/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { StyledMessage } from './styled';
import { Button, Descriptions, Divider, Flex } from 'antd';
import CommentInput from '../PostItem/Comments/CommentInput';
import Comments from '../PostItem/Comments/Comments';
type User = {
  avatarUrl: string;
  username: string;
  joinAt: Date;
  follower: number;
};
interface MessageProps {
  userPost?: User;
  text: string;
  sign?: string;
  createdAt?: Date;
  lastEditedAt?: Date;
  id: number;
  like_count?: number;
  view_count?: number;
  comment_count?: number;
}
const Message: React.FC<MessageProps> = ({
  userPost,
  text,
  sign,
  createdAt,
  lastEditedAt,
  id,
  like_count,
  view_count,
  comment_count,
}) => {
  const [showComments, setShowComments] = useState(false);
  const toggleShow = () => {
    setShowComments(!showComments);
  };
  return (
    <StyledMessage>
      <Flex vertical gap={16}>
        <Flex justify="space-between">
          <div className="user">
            <img
              src="https://img.freepik.com/premium-psd/template-post-square-banner-instagram-fashion-beautiful-girl-modern-clean_123605-73.jpg"
              className="user-avatar"
            />
            <div className="user-info">
              <Flex gap={8}>
                <Flex vertical gap={8}>
                  <div className="label">bstok204</div>
                  <div className="label">Ngày tham gia:</div>
                  <div className="label">Lượt theo dõi:</div>
                </Flex>
                <Flex vertical gap={8}>
                  <div className="value">Thành viên</div>
                  <div className="value">23/11/2006</div>
                  <div className="value">712</div>
                </Flex>
              </Flex>
            </div>
          </div>
          <Button className="follow-button">Theo dõi</Button>
        </Flex>
        <Flex vertical gap={16} className="body">
          <div className="body-createdAt">
            <div className="label">Ngày đăng: </div>
            <div className="value">24/07/2023, 20:32</div>
          </div>
        </Flex>
        <p className="body-content">{text}</p>
        <div>Last edited by a moderator: 23/08/2023</div>
        <div className="bottom-message">
          <Flex justify="space-between" align="center">
            <div className="bottom-sign">
              Chữ ký: <span>Chuyên gia phản biện</span>
            </div>
            <Flex gap={6}>
              <Button type="link" className="bottom-count">
                651,324 lượt xem
              </Button>
              <Button type="link" className="bottom-count">
                36,000 lượt thích
              </Button>
              <Button type="link" className="bottom-count" onClick={toggleShow}>
                56 bình luận
              </Button>
            </Flex>
          </Flex>
        </div>
        <div className="actions-message">
          <Flex gap={12}>
            <Button className="action-button">
              <div className="content-button">
                <SoundIcon className="icon" />
                Loan tin
                <p></p>
              </div>
            </Button>
            <Button className="action-button">
              <div className="content-button">
                <HeartIcon className="icon" />
                Thích
                <p></p>
              </div>
            </Button>
            <Button className="action-button  danger">
              <div className="content-button">
                <DangerIcon className="icon" />
                Báo cáo
                <p></p>
              </div>
            </Button>
          </Flex>
        </div>

        {/* {showComments && <Comments post={post} />} */}
      </Flex>

      <Divider style={{ borderColor: '#3A3F42' }} />
    </StyledMessage>
  );
};

export default Message;
const items = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
];

export const SoundIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M13.6763 6.95236C14.0926 7.34056 14.4249 7.80994 14.6528 8.33155C14.8807 8.85315 14.9993 9.41591 15.0013 9.98512C15.0033 10.5543 14.8886 11.1179 14.6644 11.6411C14.4401 12.1643 14.1111 12.636 13.6975 13.0271M6.23488 12.8387L7.63091 14.5663C8.35866 15.4669 8.72253 15.9172 9.04132 15.9662C9.31729 16.0086 9.59618 15.91 9.78415 15.7036C10.0013 15.4651 10.0013 14.8862 10.0013 13.7283V6.27105C10.0013 5.11318 10.0013 4.53424 9.78415 4.29575C9.59618 4.08929 9.31729 3.9907 9.04132 4.03313C8.72253 4.08215 8.35866 4.53244 7.63091 5.43302L6.23488 7.16061C6.08787 7.34254 6.01436 7.43351 5.9234 7.49897C5.84282 7.55696 5.75252 7.60009 5.65677 7.62631C5.54869 7.65592 5.43174 7.65592 5.19783 7.65592H4.01172C3.38155 7.65592 3.06647 7.65592 2.81183 7.74004C2.31073 7.90558 1.91763 8.29867 1.75209 8.79978C1.66797 9.05441 1.66797 9.3695 1.66797 9.99967C1.66797 10.6298 1.66797 10.9449 1.75209 11.1996C1.91763 11.7007 2.31073 12.0938 2.81183 12.2593C3.06647 12.3434 3.38155 12.3434 4.01172 12.3434H5.19783C5.43174 12.3434 5.54869 12.3434 5.65677 12.373C5.75252 12.3992 5.84282 12.4424 5.9234 12.5004C6.01436 12.5658 6.08787 12.6568 6.23488 12.8387Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export const HeartIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 6.41177C8.33333 2.49974 2.5 2.9164 2.5 7.91643C2.5 12.9165 10 17.0833 10 17.0833C10 17.0833 17.5 12.9165 17.5 7.91643C17.5 2.9164 11.6667 2.49974 10 6.41177Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export const DangerIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M9.99902 7.5007V10.834M3.64811 12.6672C2.89025 13.9799 2.51143 14.6364 2.56803 15.175C2.61741 15.6448 2.86396 16.0715 3.24609 16.3492C3.68405 16.6674 4.44144 16.6674 5.95613 16.6674H14.0419C15.5566 16.6674 16.3139 16.6674 16.7518 16.3492C17.134 16.0715 17.3806 15.6448 17.43 15.175C17.4866 14.6364 17.1079 13.9799 16.35 12.6672L12.3086 5.6672C11.5507 4.35455 11.1716 3.69834 10.6769 3.47808C10.2454 3.28595 9.75236 3.28595 9.32085 3.47808C8.82634 3.69824 8.44747 4.35446 7.69024 5.66602L3.64811 12.6672ZM10.0413 13.334V13.4174L9.95752 13.4175V13.334H10.0413Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
