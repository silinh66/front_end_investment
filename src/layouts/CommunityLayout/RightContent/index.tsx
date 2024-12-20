/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Collapse, Flex, Space } from 'antd';
import { CardStyles, Styles } from './styles';
import Icon1 from '@/assets/icons/community_global.svg';
import Icon2 from '@/assets/icons/community_fund.svg';
import Icon3 from '@/assets/icons/community_message.svg';
import ArrowDownIcon from '@/assets/icons/arrow_down.svg';
import { Link, useParams } from 'react-router-dom';

import WorldIndices from './RealtimeContent/WorldIndices';
import Messenger from './RealtimeContent/Messenger';
import Events from './Events';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { config } from '@/config/env';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';
import { convertDate } from '@/components/ConvertDate';
const RightContent = () => {
  const { id } = useParams();
  const [dataClosedSession, setDataClosedSession] = useState<any>([]);
  const [openStock, setOpenStock] = useState<boolean>(false);
  const [socketData, setSocketData] = useState<any>({});

  // const [activeKey, setActiveKey] = useState<string[]>([]);
  const windowSize = useWindowDimensions();
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const panelStyle: React.CSSProperties = {
    marginBottom: windowSize.width < 1600 ? 16 : 16,
    borderRadius: 8,
    overflow: 'hidden',
    border: 'none',
    // backgroundColor: '#1F232C',
    color: 'white',
  };
  useEffect(() => {
    if (openStock === false) {
      const dayClosedSession = new Date().toLocaleDateString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      const formattedDate = dayjs(dayClosedSession).format('DD/MM/YYYY');
      const encodedDate = encodeURIComponent(formattedDate);
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=1&pageSize=20&fromDate=${dayStart}&toDate=${dayEnd}`
      //   )
      //   .then((res) => {
      //     setDataClosedSession(res?.data?.data[0]);
      //   })
      //   .catch((err) => {
      //   });
      const date = new Date();
      const dateMin = moment(date).subtract(5, 'days').format('DD/MM/YYYY');
      axios
        .get(
          `${
            config.app.VITE_APP_API_URL
          }/DailyStockPrice?symbol=${id}&fromDate=${dateMin}&toDate=${convertDate(
            date
          )}`
          // `${
          //   config.app.VITE_APP_API_URL
          // }/DailyStockPrice?symbol=${company}&fromDate=${convertDateMin(
          //   date
          // )}&toDate=${convertDate(date)}`
        )
        .then((res) => {
          const dataCloseSession = res?.data?.data.pop();
          setDataClosedSession(dataCloseSession);
        })
        .catch((err) => {});
    }
  }, [id, openStock]);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      const openTime = '09:15:00';
      const closeTime = '14:30:00';
      const middleBreakTime = '11:30:00';
      const middleBreakTimeEnd = '13:00:00';
      // if (now >= openTime && now <= closeTime) {
      //   setOpenStock(true);
      // } else {
      //   setOpenStock(false);
      // }
      if (now >= openTime && now <= middleBreakTime) {
        setOpenStock(true);
      } else if (now >= middleBreakTimeEnd && now <= closeTime) {
        setOpenStock(true);
      } else {
        setOpenStock(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const ws = new WebSocket(config.socket.VITE_REACT_APP_SOCKET_IO);
    // const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'SUBSCRIBE', symbol: `${id}` }));
    };
    ws.addEventListener('message', (receivedData) => {
      const receicedData = JSON.parse(receivedData?.data);
      if (!!receicedData) setSocketData(receicedData);
    });
  }, [id]);
  const isGreen = dataClosedSession?.PriceChange >= 0;

  return (
    <Styles screen_mode={screenMode}>
      {id ? (
        <div className="chart-community">
          <div className="header">Biểu đồ</div>
          <div className="bottom">
            <div className="number-stock">
              <div className="stock-price">
                <div className="stock-price-children">
                  {openStock === true && !!socketData ? (
                    <div className="infomation">
                      <span>
                        {socketData?.LastPrice?.toLocaleString('de-DE')}
                      </span>
                      {/* <span>{socketData?.Change}</span> */}

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
                          color: isGreen
                            ? 'rgba(92, 214, 128, 1)'
                            : 'rgba(89, 43, 38, 1)',
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
                <div
                  style={{ background: openStock ? '#326742' : '#e43637' }}
                  className="market"
                >
                  {openStock === true ? (
                    <span>TT MỞ CỬA</span>
                  ) : (
                    <span>TT ĐÓNG CỬA</span>
                  )}
                </div>
              </div>
              {openStock === true ? (
                <div className="limit-price">
                  <div className="lowest-price">
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
                        fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                      />
                    </svg>
                    <span>Giá thấp nhất:</span>
                    <span>{socketData?.Low?.toLocaleString('de-DE')}</span>
                  </div>
                  <div className="highest-price">
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
                        fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                      />
                    </svg>
                    <span>Giá cao nhất:</span>
                    <span>{socketData?.High?.toLocaleString('de-DE')}</span>
                  </div>
                </div>
              ) : (
                <div className="limit-price">
                  <div className="lowest-price">
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
                        fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                      />
                    </svg>
                    <span>Giá thấp nhất:</span>
                    <span>
                      {parseFloat(
                        dataClosedSession?.LowestPrice
                      )?.toLocaleString('de-DE')}
                    </span>
                  </div>
                  <div className="highest-price">
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
                        fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                      />
                    </svg>
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
          </div>
        </div>
      ) : (
        <div className="box-rightContent">
          <div
            style={{
              color: screenMode === 'dark' ? '#fff' : '#2E3138',
              fontSize: '15px',
              fontWeight: 600,
              padding: '14px 24px',
            }}
          >
            Cộng đồng
          </div>
          <Events />
        </div>
      )}
    </Styles>
  );
};

export default RightContent;

const CustomHeaderPanel = ({
  label,
  iconUrl,
}: {
  label: string;
  iconUrl: JSX.Element;
}) => {
  return (
    <Flex gap={10} align="center">
      <span className="customHeader-icon">{iconUrl}</span>
      <p className="customHeader-text">{label}</p>
    </Flex>
  );
};
const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10.8751 12C10.8751 12.2984 10.9937 12.5845 11.2046 12.7955C11.4156 13.0065 11.7018 13.125 12.0001 13.125C12.2985 13.125 12.5846 13.0065 12.7956 12.7955C13.0066 12.5845 13.1251 12.2984 13.1251 12C13.1251 11.7016 13.0066 11.4155 12.7956 11.2045C12.5846 10.9935 12.2985 10.875 12.0001 10.875C11.7018 10.875 11.4156 10.9935 11.2046 11.2045C10.9937 11.4155 10.8751 11.7016 10.8751 12ZM15.5626 12C15.5626 12.2984 15.6812 12.5845 15.8921 12.7955C16.1031 13.0065 16.3893 13.125 16.6876 13.125C16.986 13.125 17.2721 13.0065 17.4831 12.7955C17.6941 12.5845 17.8126 12.2984 17.8126 12C17.8126 11.7016 17.6941 11.4155 17.4831 11.2045C17.2721 10.9935 16.986 10.875 16.6876 10.875C16.3893 10.875 16.1031 10.9935 15.8921 11.2045C15.6812 11.4155 15.5626 11.7016 15.5626 12ZM6.18763 12C6.18763 12.2984 6.30616 12.5845 6.51714 12.7955C6.72812 13.0065 7.01426 13.125 7.31263 13.125C7.611 13.125 7.89715 13.0065 8.10813 12.7955C8.31911 12.5845 8.43763 12.2984 8.43763 12C8.43763 11.7016 8.31911 11.4155 8.10813 11.2045C7.89715 10.9935 7.611 10.875 7.31263 10.875C7.01426 10.875 6.72812 10.9935 6.51714 11.2045C6.30616 11.4155 6.18763 11.7016 6.18763 12ZM21.6845 7.93125C21.1548 6.67266 20.3954 5.54297 19.4275 4.57266C18.4663 3.60796 17.3252 2.84114 16.0689 2.31563C14.7798 1.77422 13.4111 1.5 12.0001 1.5H11.9533C10.5329 1.50703 9.15716 1.78828 7.86341 2.34141C6.61785 2.87232 5.48747 3.64049 4.53529 4.60312C3.5767 5.57109 2.82435 6.69609 2.30404 7.95C1.76498 9.24844 1.4931 10.6289 1.50013 12.0492C1.50809 13.6769 1.89316 15.2806 2.62513 16.7344V20.2969C2.62513 20.5828 2.73872 20.857 2.94091 21.0592C3.1431 21.2614 3.41732 21.375 3.70326 21.375H7.2681C8.72192 22.107 10.3256 22.492 11.9533 22.5H12.0025C13.4064 22.5 14.7681 22.2281 16.0501 21.6961C17.3001 21.1768 18.4369 20.419 19.397 19.4648C20.365 18.5063 21.1267 17.3859 21.6587 16.1367C22.2119 14.843 22.4931 13.4672 22.5001 12.0469C22.5072 10.6195 22.2306 9.23438 21.6845 7.93125ZM18.1431 18.1969C16.5001 19.8234 14.3204 20.7188 12.0001 20.7188H11.9603C10.547 20.7117 9.1431 20.3602 7.90326 19.6992L7.70638 19.5938H4.40638V16.2938L4.30091 16.0969C3.63998 14.857 3.28841 13.4531 3.28138 12.0398C3.27201 9.70312 4.16498 7.50937 5.80326 5.85703C7.4392 4.20469 9.62591 3.29062 11.9626 3.28125H12.0025C13.1744 3.28125 14.3111 3.50859 15.3822 3.95859C16.4275 4.39687 17.365 5.02734 18.1712 5.83359C18.9751 6.6375 19.6079 7.57734 20.0462 8.62266C20.5009 9.70547 20.7283 10.8539 20.7236 12.0398C20.7095 14.3742 19.7931 16.5609 18.1431 18.1969Z"
      fill="#42A732"
    />
  </svg>
);
const IndicesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21.7031 3.84375H2.20312C1.78828 3.84375 1.45312 4.17891 1.45312 4.59375V19.5938C1.45312 20.0086 1.78828 20.3438 2.20312 20.3438H21.7031C22.118 20.3438 22.4531 20.0086 22.4531 19.5938V4.59375C22.4531 4.17891 22.118 3.84375 21.7031 3.84375ZM20.7656 18.6562H3.14062V5.53125H20.7656V18.6562ZM5.32266 16.7273C5.39531 16.8 5.51484 16.8 5.5875 16.7273L9.63047 12.6844L12.3117 15.368C12.3844 15.4406 12.5039 15.4406 12.5766 15.368L19.5375 8.40234C19.6102 8.32969 19.6102 8.21016 19.5375 8.1375L18.675 7.275C18.6398 7.24011 18.5922 7.22053 18.5426 7.22053C18.493 7.22053 18.4454 7.24011 18.4102 7.275L12.4453 13.2422L9.76406 10.5586C9.72882 10.5237 9.68123 10.5041 9.63164 10.5041C9.58205 10.5041 9.53446 10.5237 9.49922 10.5586L4.4625 15.5977C4.42761 15.6329 4.40803 15.6805 4.40803 15.7301C4.40803 15.7797 4.42761 15.8273 4.4625 15.8625L5.32266 16.7273Z"
      fill="#42A732"
    />
  </svg>
);

const NetworkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M20.025 18.7711C20.0297 18.7641 20.0367 18.757 20.0414 18.75C21.5766 16.9242 22.5 14.5711 22.5 12C22.5 9.42891 21.5766 7.07578 20.0438 5.25C20.0391 5.24297 20.032 5.23828 20.0273 5.23125C20.0016 5.20078 19.9781 5.17266 19.9523 5.14453C19.943 5.13281 19.9336 5.12344 19.9242 5.11172L19.8281 5.00156L19.8258 4.99922C19.7906 4.95938 19.7531 4.91953 19.718 4.87969L19.7156 4.87734C19.6406 4.79766 19.5656 4.71797 19.4883 4.64062L19.4859 4.63828L19.3734 4.52578L19.3664 4.51875C19.3312 4.48359 19.2961 4.45078 19.2609 4.41797C19.2492 4.40625 19.2375 4.39453 19.2234 4.38281C19.2 4.35938 19.1766 4.33828 19.1531 4.31719C19.1461 4.31016 19.1367 4.30312 19.1297 4.29375C17.2594 2.55937 14.7539 1.5 12 1.5C9.24609 1.5 6.74062 2.55937 4.86797 4.29375C4.86094 4.30078 4.85156 4.30781 4.84453 4.31719C4.82109 4.33828 4.79766 4.36172 4.77422 4.38516C4.7625 4.39688 4.75078 4.40859 4.73672 4.42031C4.70156 4.45313 4.66641 4.48828 4.63125 4.52109L4.62422 4.52812L4.51172 4.64062L4.50937 4.64297C4.43203 4.72031 4.35703 4.8 4.28203 4.87969L4.27969 4.88203C4.24219 4.92188 4.20703 4.96172 4.17188 5.00156L4.16953 5.00391C4.13672 5.03906 4.10391 5.07656 4.07344 5.11406C4.06406 5.12578 4.05469 5.13516 4.04531 5.14688C4.01953 5.175 3.99609 5.20547 3.97031 5.23359C3.96562 5.24063 3.95859 5.24531 3.95391 5.25234C2.42344 7.07578 1.5 9.42891 1.5 12C1.5 14.5711 2.42344 16.9242 3.95625 18.75C3.96094 18.757 3.96797 18.7641 3.97266 18.7711L4.04531 18.8578C4.05469 18.8695 4.06406 18.8789 4.07344 18.8906L4.16953 19.0008C4.16953 19.0031 4.17188 19.0031 4.17188 19.0055C4.20703 19.0453 4.24219 19.0852 4.27969 19.1227L4.28203 19.125C4.35703 19.2047 4.43203 19.2844 4.50703 19.3617L4.50937 19.3641C4.54687 19.4016 4.58203 19.4391 4.61953 19.4742L4.62656 19.4813C4.70391 19.5586 4.78359 19.6336 4.86328 19.7062C6.74062 21.4406 9.24609 22.5 12 22.5C14.7539 22.5 17.2594 21.4406 19.132 19.7062C19.2119 19.6331 19.29 19.558 19.3664 19.4813L19.3734 19.4742C19.4109 19.4367 19.4484 19.4016 19.4836 19.3641L19.4859 19.3617C19.5633 19.2844 19.6383 19.2047 19.7109 19.125L19.7133 19.1227C19.7484 19.0828 19.7859 19.0453 19.8211 19.0055C19.8211 19.0031 19.8234 19.0031 19.8234 19.0008C19.8562 18.9656 19.8891 18.9281 19.9195 18.8906C19.9289 18.8789 19.9383 18.8695 19.9477 18.8578C19.9742 18.8296 19.9999 18.8006 20.025 18.7711ZM20.1211 15.4289C19.7977 16.193 19.3711 16.9008 18.8508 17.543C18.2648 17.0365 17.6241 16.5971 16.9406 16.2328C17.2125 15.1336 17.3813 13.9266 17.4258 12.6562H20.7891C20.7188 13.6148 20.4937 14.5453 20.1211 15.4289ZM20.7891 11.3438H17.4258C17.3813 10.0734 17.2125 8.86641 16.9406 7.76719C17.6273 7.40156 18.2672 6.96094 18.8508 6.45703C19.9818 7.84916 20.6584 9.55485 20.7891 11.3438ZM15.4289 3.87891C16.3594 4.27266 17.2055 4.81641 17.9508 5.50078C17.5178 5.86944 17.0518 6.19739 16.5586 6.48047C16.1906 5.42578 15.7195 4.50938 15.1711 3.77578C15.2578 3.80859 15.3445 3.84375 15.4289 3.87891ZM13.3055 20.2992C13.0898 20.468 12.8742 20.5969 12.6562 20.6836V16.3359C13.5862 16.4008 14.5008 16.6079 15.368 16.95C15.1734 17.5266 14.9484 18.0586 14.6883 18.5391C14.2805 19.2984 13.8023 19.9055 13.3055 20.2992ZM14.6883 5.46094C14.9461 5.94375 15.1734 6.47578 15.368 7.05C14.5008 7.39209 13.5862 7.59918 12.6562 7.66406V3.31875C12.8719 3.40547 13.0898 3.53203 13.3055 3.70312C13.8023 4.09453 14.2805 4.70156 14.6883 5.46094ZM12.6562 15.0211V12.6562H16.1133C16.0758 13.6922 15.9469 14.6977 15.7313 15.6516L15.7242 15.6797C14.7406 15.3067 13.7063 15.0847 12.6562 15.0211ZM12.6562 11.3438V8.97891C13.7297 8.91328 14.7609 8.68594 15.7242 8.32031L15.7313 8.34844C15.9469 9.30234 16.0758 10.3055 16.1133 11.3438H12.6562ZM11.3438 12.6562V15.0211C10.2703 15.0867 9.23906 15.3141 8.27578 15.6797L8.26875 15.6516C8.05312 14.6977 7.92422 13.6945 7.88672 12.6562H11.3438ZM7.88672 11.3438C7.92422 10.3078 8.05312 9.30234 8.26875 8.34844L8.27578 8.32031C9.23906 8.68594 10.268 8.91328 11.3438 8.97891V11.3438H7.88672ZM11.3438 16.3359V20.6813C11.1281 20.5945 10.9102 20.468 10.6945 20.2969C10.1977 19.9055 9.71719 19.2961 9.30938 18.5367C9.05156 18.0539 8.82422 17.5219 8.62969 16.9477C9.50156 16.6055 10.4086 16.4016 11.3438 16.3359ZM11.3438 7.66406C10.4138 7.59918 9.49924 7.39209 8.63203 7.05C8.82656 6.47344 9.05156 5.94141 9.31172 5.46094C9.71953 4.70156 10.1977 4.09219 10.6969 3.70078C10.9125 3.53203 11.1281 3.40313 11.3461 3.31641V7.66406H11.3438ZM8.57109 3.87891C8.65781 3.84375 8.74219 3.80859 8.82891 3.77578C8.28047 4.50938 7.80937 5.42578 7.44141 6.48047C6.94922 6.19922 6.48281 5.87109 6.04922 5.50078C6.79453 4.81641 7.64063 4.27266 8.57109 3.87891ZM3.87891 8.57109C4.20234 7.80703 4.62891 7.09922 5.14922 6.45703C5.73281 6.96094 6.37266 7.40156 7.05938 7.76719C6.7875 8.86641 6.61875 10.0734 6.57422 11.3438H3.21094C3.28125 10.3852 3.50625 9.45469 3.87891 8.57109ZM3.21094 12.6562H6.57422C6.61875 13.9266 6.7875 15.1336 7.05938 16.2328C6.37589 16.5971 5.73521 17.0365 5.14922 17.543C4.01819 16.1508 3.34164 14.4451 3.21094 12.6562ZM8.57109 20.1211C7.64063 19.7273 6.79453 19.1836 6.04922 18.4992C6.48281 18.1289 6.94922 17.8031 7.44141 17.5195C7.80937 18.5742 8.28047 19.4906 8.82891 20.2242C8.74219 20.1914 8.65547 20.1562 8.57109 20.1211ZM15.4289 20.1211C15.3422 20.1562 15.2578 20.1914 15.1711 20.2242C15.7195 19.4906 16.1906 18.5742 16.5586 17.5195C17.0508 17.8008 17.5172 18.1289 17.9508 18.4992C17.2096 19.1807 16.3565 19.7294 15.4289 20.1211Z"
      fill="#42A732"
    />
  </svg>
);
