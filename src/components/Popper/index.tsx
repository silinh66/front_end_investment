import React, { useState } from 'react';
import { StyledPopperFriend } from './style';
import { screenModeSelector } from '@/redux/screen/selector';
import { useSelector } from 'react-redux';
import iconSearch from '@assets/icons/search.svg';
import searchLightMode from '@/assets/icons/search-lightmode.svg';
export const Popper = (friends) => {
  const screenMode = useSelector(screenModeSelector);

  const [sendFriends, setSendFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState('');

  const handleCheckSend = (item) => {
    setSendFriends((prev) => {
      const isExisting = prev.includes(item);
      if (isExisting) {
        return prev.filter((currentItem) => currentItem !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  const filteredFriends = friends.friends?.filter((friend) =>
    friend.name.toLowerCase().includes(searchFriends.toLowerCase())
  );
  const isItemInArray = (item) => sendFriends.includes(item);
  return (
    <StyledPopperFriend screen_mode={screenMode}>
      <div className="popper-friend">
        <div className="title">CHIA SẺ TÍN HIỆU CHO BẠN BÈ</div>
        <div className="friend">
          <div className="input-transactions">
            <img
              className="icon-search"
              src={screenMode === 'dark' ? iconSearch : searchLightMode}
              alt=""
            />
            <input
              value={searchFriends}
              className="search"
              type="text"
              placeholder="Nhập tên..."
              onChange={(e) => setSearchFriends(e.target.value)}
            />
          </div>
          <div className="list-friend">
            {filteredFriends?.map((el, index) => (
              <div
                style={{
                  backgroundColor:
                    screenMode === 'dark'
                      ? index % 2
                        ? 'rgba(42, 46, 57, 1)'
                        : 'transparent'
                      : index % 2
                        ? '#F0F3FA'
                        : 'transparent',
                }}
                className="item-friend"
              >
                <div className="avt">
                  <img className="avt" src={el.avatar} alt="" />
                </div>
                <div className="info">
                  <div className="name">{el.name}</div>
                  {el.isOnline === 1 ? (
                    <div className="on">
                      <div className="status">Đang hoạt động</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <circle cx="3" cy="3" r="3" fill="#42A732" />
                      </svg>
                    </div>
                  ) : (
                    <div className="on">
                      <div className="status">Đang offline</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <circle cx="3" cy="3" r="3" fill="red" />
                      </svg>
                    </div>
                  )}
                </div>
                {isItemInArray(el) ? (
                  <div
                    onClick={() => handleCheckSend(el)}
                    className="check-info"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.2503 2.96875H13.1581C13.0049 2.96875 12.8596 3.03906 12.7659 3.15937L6.32369 11.3203L3.23463 7.40625C3.1879 7.34692 3.12833 7.29895 3.06041 7.26593C2.99249 7.23292 2.91796 7.21572 2.84244 7.21562H1.75025C1.64557 7.21562 1.58775 7.33594 1.65182 7.41719L5.9315 12.8391C6.1315 13.0922 6.51588 13.0922 6.71744 12.8391L14.3487 3.16875C14.4128 3.08906 14.3549 2.96875 14.2503 2.96875Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={() => handleCheckSend(el)}
                    className="remove-check"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.2503 2.96875H13.1581C13.0049 2.96875 12.8596 3.03906 12.7659 3.15937L6.32369 11.3203L3.23463 7.40625C3.1879 7.34692 3.12833 7.29895 3.06041 7.26593C2.99249 7.23292 2.91796 7.21572 2.84244 7.21562H1.75025C1.64557 7.21562 1.58775 7.33594 1.65182 7.41719L5.9315 12.8391C6.1315 13.0922 6.51588 13.0922 6.71744 12.8391L14.3487 3.16875C14.4128 3.08906 14.3549 2.96875 14.2503 2.96875Z"
                        fill="transparent"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div></div>
            <button
              // disabled={err}
              // onClick={saveConfig}
              className="save-target"
            >
              <div
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Chia sẻ bộ lọc
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10.3776 3.70757V1.57782C10.3776 1.09805 10.9078 0.839639 11.268 1.10864L11.3297 1.16165L15.8268 5.58283C16.0367 5.78916 16.0558 6.12058 15.8841 6.34968L15.8269 6.41512L11.3298 10.8377C10.992 11.1699 10.4429 10.9566 10.3829 10.5039L10.3776 10.4216V8.32611L10.1199 8.34926C8.31965 8.54174 6.59416 9.37283 4.93261 10.8564C4.54318 11.2042 3.94067 10.8754 4.00472 10.3501C4.50344 6.25989 6.59039 4.00547 10.153 3.72268L10.3776 3.70757ZM3.5 2C2.11929 2 1 3.11929 1 4.5V12.5C1 13.8807 2.11929 15 3.5 15H11.5C12.8807 15 14 13.8807 14 12.5V11.5C14 11.2239 13.7761 11 13.5 11C13.2239 11 13 11.2239 13 11.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V4.5C2 3.67157 2.67157 3 3.5 3H6.5C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3.5Z"
                  fill="#FDFDFD"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </StyledPopperFriend>
  );
};
