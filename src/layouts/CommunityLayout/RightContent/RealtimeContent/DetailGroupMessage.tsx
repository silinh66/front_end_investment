/* eslint-disable @typescript-eslint/no-unused-vars */
import { Socket, io } from 'socket.io-client';
import { getListMessages } from '@/services/servicesApi/serviceApi';
import { Avatar, Badge, Button, Flex, Input, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { StyledBoxChat, StyledDetailGroupMessage } from './styled';
import {
  SmileOutlined,
  SwapLeftOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getTimeBetween, sortMessagesByCreatedAt } from '@/utils/helper';
import useChatScroll from '@/hooks/useChatScroll';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { IGroup, IMessage } from './Messenger';
import MemberSetting from '../MemberSetting/MemberSetting';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { config } from '@/config/env';
import moment from 'moment';

const DetailGroupMessage = ({
  data,
  back,
}: {
  data: IGroup;
  back: () => void;
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const { user } = useAppSelector((state: RootState) => state.app);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isReload, setReload] = useState(false);
  const [isView, setView] = useState({
    setting: false,
    addMember: false,
    viewMember: false,
    bodyChat: true,
  });
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const ref = useChatScroll(messages);
  const socketRef = useRef<typeof io>();
  useEffect(() => {
    getListMessages(data.id, 'group').then((res) => {
      setMessages(res.data.messages);
    });
  }, [isReload, data]);
  useEffect(() => {
    const socket = io(
      `${config.socket.VITE_REACT_CHART}?userId=${user?.userID}`
    );

    socketRef.current = socket;
    socket.on('newMessage', () => {
      refreshMessages();
    });
    socket.on('newGroupMessage', () => {
      refreshMessages();
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== null) {
      const msg = {
        sender_id: user?.userID,
        // receiver_id: data.id,
        content: inputValue,
        group_id: data?.id,
      };
      socketRef.current.emit('sendMessage', JSON.stringify(msg));
      setReload((prev) => !prev);
      setInputValue('');
    }
  };
  const refreshMessages = () => {
    setReload((prev) => !prev);
  };
  const openChatBodyView = () => {
    setView(() => ({
      setting: false,
      addMember: false,
      viewMember: false,
      bodyChat: true,
    }));
    setShowDropdown(false);
  };
  const openAddMemberView = () => {
    setView(() => ({
      setting: false,
      addMember: true,
      viewMember: false,
      bodyChat: false,
    }));
    setShowDropdown(false);
  };
  const openViewMemberView = () => {
    setView(() => ({
      setting: false,
      addMember: false,
      viewMember: true,
      bodyChat: false,
    }));
    setShowDropdown(false);
  };
  const now = moment(); // Thời gian hiện tại
  const messageTime = (date) => {
    const convert = moment(date);
    return now.diff(convert, 'hours') < 24
      ? convert.format('HH:mm') // Nếu dưới 24 giờ
      : convert.format('HH:mm DD/MM/YYYY');
  };
  const Head = () => (
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
        <div
          onClick={isView.bodyChat ? back : openChatBodyView}
          className="back"
        >
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
        <Flex align="center" gap={6}>
          <Avatar.Group maxCount={4}>
            {data.members.map((member) => {
              return (
                <Tooltip
                  title={member.name}
                  placement="top"
                  key={member.userID}
                >
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                    src={member.avatar}
                    size={24}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </Flex>
      </Flex>
      <Flex gap={12} align="center">
        <Flex vertical align="end">
          <Flex gap={8}>
            <Badge color="green" />
            <h4 className="user-name">{data.name}</h4>
          </Flex>
          <p className="user-currentActive">
            lần xem gần nhất {getTimeBetween(data.last_message_time)}
          </p>
        </Flex>
        <div className="menu">
          <ThreeDotsIcon
            className="icon"
            onClick={() => setShowDropdown((prev) => !prev)}
          />

          <div className={`dropdown ${isShowDropdown ? 'active' : ''}`}>
            <div className="dropdown-item" onClick={openAddMemberView}>
              <AddUserIcon className="add-icon" />
              Thêm thành viên
            </div>
            <div className="dropdown-item" onClick={openViewMemberView}>
              <ViewUserIcon />
              Xem thành viên
            </div>
            <div className="dropdown-item">
              <LeaveIcon />
              Rời khởi nhóm
            </div>
          </div>
        </div>
      </Flex>
    </Flex>
  );
  return (
    <StyledDetailGroupMessage screen_mode={screenMode}>
      <Head />
      {isView.setting && <MemberSetting dataGroup={data} />}
      {isView.addMember && <>Add Member</>}
      {isView.viewMember && <>View Member</>}
      {isView.bodyChat && (
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
                        padding: '8px',
                        background: `${
                          message.sender_id === user?.userID
                            ? '#003AB2'
                            : '#30323B'
                        }`,
                        color: `${
                          message.sender_id === user?.userID ? 'white' : 'black'
                        }`,
                        borderRadius: '100px',
                      }}
                    >
                      <Tooltip title={messageTime(message.created_at!)}>
                        {message.content}
                      </Tooltip>
                    </div>
                  </Flex>
                );
              })}
            <form onSubmit={handleSendMessage}>
              <div className="chat-input">
                <Input
                  placeholder="Viết gì đó ..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                  className="send-btn input-btn"
                  // onClick={handleSendMessage}
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
      )}
    </StyledDetailGroupMessage>
  );
};
export default DetailGroupMessage;

const ThreeDotsIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};
const AddUserIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        d="M20.9079 18.0943H19.0329V16.2193C19.0329 16.1162 18.9485 16.0318 18.8454 16.0318H17.7204C17.6172 16.0318 17.5329 16.1162 17.5329 16.2193V18.0943H15.6579C15.5547 18.0943 15.4704 18.1787 15.4704 18.2818V19.4068C15.4704 19.5099 15.5547 19.5943 15.6579 19.5943H17.5329V21.4693C17.5329 21.5724 17.6172 21.6568 17.7204 21.6568H18.8454C18.9485 21.6568 19.0329 21.5724 19.0329 21.4693V19.5943H20.9079C21.011 19.5943 21.0954 19.5099 21.0954 19.4068V18.2818C21.0954 18.1787 21.011 18.0943 20.9079 18.0943ZM8.75553 11.6818C8.73443 11.4779 8.72271 11.2716 8.72271 11.0631C8.72271 10.6904 8.75787 10.3271 8.8235 9.97321C8.8399 9.88883 8.79537 9.80211 8.71803 9.76696C8.39928 9.62399 8.10631 9.42711 7.85318 9.17868C7.55492 8.88947 7.32021 8.54127 7.16404 8.15629C7.00787 7.77131 6.93366 7.358 6.94615 6.94274C6.96725 6.19039 7.26959 5.47555 7.79693 4.93649C8.37584 4.34352 9.15396 4.02008 9.98131 4.02946C10.729 4.03649 11.4508 4.32477 11.9969 4.83571C12.1821 5.00914 12.3415 5.20133 12.4751 5.40758C12.5219 5.48024 12.6133 5.51071 12.693 5.48258C13.1055 5.33961 13.5415 5.23883 13.9891 5.19196C14.1204 5.17789 14.1954 5.03727 14.1368 4.92008C13.3751 3.41305 11.8188 2.37242 10.0188 2.3443C7.42193 2.30446 5.25631 4.43493 5.25631 7.0318C5.25631 8.50367 5.93365 9.81617 6.99537 10.6763C6.25006 11.0209 5.56334 11.4966 4.96803 12.092C3.68365 13.374 2.95709 15.0662 2.91021 16.8732C2.90959 16.8982 2.91398 16.9231 2.92312 16.9464C2.93226 16.9697 2.94597 16.9909 2.96345 17.0088C2.98092 17.0267 3.0018 17.041 3.02486 17.0507C3.04792 17.0604 3.07269 17.0654 3.09772 17.0654H4.41256C4.51334 17.0654 4.59771 16.9857 4.60006 16.8849C4.64459 15.5255 5.19537 14.2529 6.16334 13.2873C6.8524 12.5982 7.69615 12.1201 8.61725 11.8881C8.70631 11.8623 8.76725 11.7755 8.75553 11.6818ZM19.3141 11.0631C19.3141 8.49899 17.254 6.41539 14.6993 6.37555C12.1024 6.33571 9.93912 8.46618 9.93912 11.0631C9.93912 12.5349 10.6188 13.8474 11.6782 14.7076C10.9252 15.0566 10.2396 15.5359 9.65318 16.1232C8.36881 17.4052 7.64225 19.0974 7.59537 20.9021C7.59475 20.9271 7.59913 20.952 7.60828 20.9753C7.61742 20.9986 7.63113 21.0198 7.6486 21.0377C7.66608 21.0556 7.68696 21.0699 7.71002 21.0796C7.73308 21.0893 7.75785 21.0943 7.78287 21.0943H9.09537C9.19615 21.0943 9.28053 21.0146 9.28287 20.9138C9.3274 19.5545 9.87818 18.2818 10.8462 17.3162C11.8563 16.306 13.1969 15.7505 14.6266 15.7505C17.2141 15.7505 19.3141 13.6529 19.3141 11.0631ZM16.7477 13.1841C16.1805 13.7513 15.4282 14.0631 14.6266 14.0631C13.8251 14.0631 13.0727 13.7513 12.5055 13.1841C12.2225 12.9026 11.9989 12.5671 11.8479 12.1975C11.6969 11.8279 11.6217 11.4318 11.6266 11.0326C11.6337 10.2638 11.9407 9.52086 12.4774 8.97008C13.0399 8.39352 13.7922 8.07242 14.5962 8.06305C15.3907 8.05602 16.1618 8.36539 16.729 8.92086C17.3102 9.49039 17.629 10.2521 17.629 11.0631C17.6266 11.8646 17.3149 12.617 16.7477 13.1841Z"
        fill="rgba(255,255,255,0.5)"
      />
    </svg>
  );
};
const ViewUserIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.41016 22C3.41016 18.13 7.26018 15 12.0002 15"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22L21 21"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const LeaveIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        d="M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
