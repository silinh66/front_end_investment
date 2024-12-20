/* eslint-disable @typescript-eslint/no-unused-vars */
import { Socket, io } from 'socket.io-client';
import { getListMessages } from '@/services/servicesApi/serviceApi';
import { Avatar, Button, Flex, Input, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { StyledBoxChat, StyledDetailDirectMessage } from './styled';
import {
  SmileOutlined,
  SwapLeftOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  formatDate,
  getTimeBetween,
  sortMessagesByCreatedAt,
} from '@/utils/helper';
import useChatScroll from '@/hooks/useChatScroll';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { IDirect, IMessage } from './Messenger';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { config } from '@/config/env';
import icons from '@/constants/icons';
import moment from 'moment';

const DetailDirectMessage = ({
  data,
  back,
  setOpenMessenger,
}: {
  data: IDirect;
  back: () => void;
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const { user } = useAppSelector((state: RootState) => state.app);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef('');
  const socketRef = useRef();
  const [isReload, setReload] = useState(false);
  const ref = useChatScroll(messages);
  useEffect(() => {
    getListMessages(data.userID).then((res) => {
      setMessages(res.data.messages);
    });
  }, [isReload, data]);
  useEffect(() => {
    const socket = io(
      `${config.socket.VITE_REACT_CHAT}?userId=${user?.userID}`
    );
    socketRef.current = socket;
    socket.on('newMessage', () => {
      refreshMessages();
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);
  const handleSendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inputValue) {
      const msg = {
        sender_id: user?.userID,
        receiver_id: data.userID,
        content: inputValue,
        // group_id: data?.userID,
      };
      socketRef.current.emit('sendMessage', JSON.stringify(msg));
      refreshMessages();
    }
  };
  const refreshMessages = () => {
    setReload((prev) => !prev);
    setInputValue('');
  };
  const now = moment(); // Thời gian hiện tại
  const messageTime = (date) => {
    const convert = moment(date);
    return now.diff(convert, 'hours') < 24
      ? convert.format('HH:mm') // Nếu dưới 24 giờ
      : convert.format('HH:mm DD/MM/YYYY');
  }; // Thời gian tin nhắn

  return (
    <StyledDetailDirectMessage screen_mode={screenMode}>
      <Flex vertical>
        <Flex
          justify="space-between"
          align="center"
          style={{
            height: '52px',
            padding: '0px 16px',
            borderBottom:
              screenMode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC',
          }}
        >
          <Flex gap={8}>
            <div onClick={back} className="back">
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99941 19.3079L0.691406 9.9999L9.99941 0.691895L11.0634 1.75589L2.81841 9.9999L11.0624 18.2439L9.99941 19.3079Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </svg>
            </div>
            <Flex align="center" gap={10}>
              <img
                style={{ borderRadius: '100%', height: '28px', width: '28px' }}
                src={data.avatar}
              />
              <h4 className="user-name">{data.name}</h4>
            </Flex>
          </Flex>
          <div onClick={() => setOpenMessenger(false)} className="close">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.281 14.2193C15.3507 14.289 15.406 14.3717 15.4437 14.4628C15.4814 14.5538 15.5008 14.6514 15.5008 14.7499C15.5008 14.8485 15.4814 14.9461 15.4437 15.0371C15.406 15.1281 15.3507 15.2109 15.281 15.2806C15.2114 15.3502 15.1286 15.4055 15.0376 15.4432C14.9465 15.4809 14.849 15.5003 14.7504 15.5003C14.6519 15.5003 14.5543 15.4809 14.4632 15.4432C14.3722 15.4055 14.2895 15.3502 14.2198 15.2806L8.00042 9.06024L1.78104 15.2806C1.64031 15.4213 1.44944 15.5003 1.25042 15.5003C1.05139 15.5003 0.860523 15.4213 0.719792 15.2806C0.579062 15.1398 0.5 14.949 0.5 14.7499C0.5 14.5509 0.579062 14.36 0.719792 14.2193L6.9401 7.99993L0.719792 1.78055C0.579062 1.63982 0.5 1.44895 0.5 1.24993C0.5 1.05091 0.579062 0.860034 0.719792 0.719304C0.860523 0.578573 1.05139 0.499512 1.25042 0.499512C1.44944 0.499512 1.64031 0.578573 1.78104 0.719304L8.00042 6.93962L14.2198 0.719304C14.3605 0.578573 14.5514 0.499512 14.7504 0.499512C14.9494 0.499512 15.1403 0.578573 15.281 0.719304C15.4218 0.860034 15.5008 1.05091 15.5008 1.24993C15.5008 1.44895 15.4218 1.63982 15.281 1.78055L9.06073 7.99993L15.281 14.2193Z"
                fill="white"
                fill-opacity="0.8"
              />
            </svg>
          </div>
        </Flex>
        <StyledBoxChat screen_mode={screenMode}>
          <div
            style={{
              display: 'flex',
              marginTop: '16px',
              paddingRight: '18px',
              paddingLeft: '16px',
              // marginBottom: '40px',
              height: '480px',
              overflowY: 'scroll',
              flexDirection: 'column',
              gap: 12,
            }}
            ref={ref}
          >
            {messages &&
              messages.length > 0 &&
              sortMessagesByCreatedAt(messages).map((message) => {
                return (
                  <Flex
                    gap={10}
                    justify={
                      message.sender_id === user?.userID ? 'right' : 'left'
                    }
                    style={{
                      flexDirection: `${
                        message.sender_id === user?.userID
                          ? 'row-reverse'
                          : 'row'
                      }`,
                    }}
                  >
                    {message.sender_id === user?.userID ? (
                      <></>
                    ) : (
                      <img
                        style={{
                          borderRadius: '100%',
                          height: '28px',
                          width: '28px',
                        }}
                        src={message.avatar || icons.HEADER_AVATAR_ICON}
                      />
                    )}

                    <div
                      style={{
                        padding: '8px 16px',
                        background: `${
                          message.sender_id === user?.userID
                            ? '#003AB2'
                            : '#30323B'
                        }`,
                        color: `${screenMode === 'dark' ? 'white' : 'black'}`,
                        borderRadius: '100px',

                        position: 'relative',
                      }}
                    >
                      <Tooltip title={messageTime(message.created_at!)}>
                        {message.content}
                      </Tooltip>
                      {/* <span
                        className="created-time"
                        style={{
                          color: `${
                            message.sender_id === user?.userID
                              ? 'white'
                              : '#666668'
                          }`,
                        }}
                      >
                        {formatDate(message.created_at!)}
                      </span> */}
                    </div>
                  </Flex>
                );
              })}
            <form onSubmit={handleSendMessage}>
              <div className="chat-input">
                <Input
                  placeholder="Aa"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  // value={inputValue}
                  // onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                  className="send-btn input-btn"
                  onClick={() => handleSendMessage()}
                  icon={
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5762 9.00714C18.5758 8.86162 18.5338 8.71918 18.4553 8.5966C18.3767 8.47401 18.2648 8.37636 18.1327 8.31513L1.9154 0.739384C1.77393 0.675655 1.61648 0.656448 1.46395 0.684314C1.31142 0.712181 1.17103 0.785801 1.06143 0.895398C0.951836 1.005 0.878215 1.14538 0.850349 1.29791C0.822483 1.45044 0.841689 1.6079 0.905418 1.74936L3.69794 8.24694L10.5613 8.24029L10.5622 9.76428L3.67724 9.76011L0.898001 16.2597C0.837579 16.4003 0.82078 16.5558 0.849778 16.7061C0.878775 16.8565 0.952234 16.9947 1.06064 17.1029C1.17216 17.2099 1.31345 17.2807 1.4659 17.3059C1.61834 17.331 1.77478 17.3094 1.91459 17.2439L18.1227 9.6878C18.2551 9.62909 18.368 9.53393 18.4483 9.41341C18.5286 9.2929 18.573 9.152 18.5762 9.00714Z"
                        fill="#99BAFF"
                      />
                    </svg>
                  }
                ></Button>
              </div>
            </form>
          </div>
        </StyledBoxChat>
      </Flex>
    </StyledDetailDirectMessage>
  );
};
export default DetailDirectMessage;
