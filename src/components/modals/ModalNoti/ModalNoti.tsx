/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyledModalNoti } from './styled';
import useBodyScrollLock from '@/components/UseBodyScrollLock/useBodyScrollLock';

const ModalNoti = ({
  getListNotification,
  modalStates,
  toggleModalNoti,
  listShareSignal,
  screenMode,
  getTimeDifference,
  api,
  dispatchRedux,
  fetchListSignals,
  navigate,
}) => {
  return (
    <>
      {modalStates.modalNotificationVisible && (
        <StyledModalNoti
          style={{
            position: 'absolute',
            top: '70px',
            right: '190px',
            width: '360px',
            // height: '300px',
            backgroundColor: screenMode === 'dark' ? '#202127' : 'white',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px 0px #00000033',
            padding: '8px 16px',
            zIndex: 9999,
            overflow: 'auto',
            maxHeight: '80vh',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              color: screenMode === 'dark' ? '#FFFFFF' : '#2E3138',
              paddingBottom: '8px',
              borderBottom:
                screenMode === 'dark'
                  ? '1px solid #30323B'
                  : '1px solid #D5D7DC',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            Thông báo
          </div>
          {listShareSignal?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  padding: '16px 0px',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 8C17.5 8 19 9.5 19 12C19 14.5 17.5 16 17.5 16M20.5 5C20.5 5 23 7.5 23 12C23 16.5 20.5 19 20.5 19M6.5 8C6.5 8 5 9.5 5 12C5 14.5 6.5 16 6.5 16M3.5 5C3.5 5 1 7.5 1 12C1 16.5 3.5 19 3.5 19"
                    stroke={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13Z"
                    fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                    stroke={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flexGrow: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '240px',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        color: screenMode === 'dark' ? '#fff' : '#2E3138',
                        lineHeight: '20px',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>
                        {item?.name}
                      </span>{' '}
                      chia sẻ cho bạn tín hiệu{' '}
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>
                        {item?.symbol}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                      }}
                    >
                      <div
                        className="btn-yes"
                        style={{
                          color: '#fff',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          padding: '8px',
                          minWidth: '85px',
                          height: '24px',
                          background: '#004AEA',
                          display: 'grid',
                          placeContent: 'center',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          api
                            .post(
                              '/signals/respond',
                              {
                                SharedID: item?.SharedID,
                                Status: 'ACCEPTED',
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                              }
                            )
                            .then((res) => {
                              getListNotification();
                              toggleModalNoti();
                              dispatchRedux(fetchListSignals()); // Dispatch action here
                              navigate('/loc-co-phieu', {
                                state: { activeTab: 'congCu' },
                              });
                            });
                        }}
                      >
                        Chấp nhận
                      </div>
                      <button
                        className="btn-no"
                        style={{
                          color: screenMode === 'dark' ? '#fff' : '#333',
                          borderRadius: '6px',
                          padding: '8px',
                          minWidth: '85px',
                          height: '24px',
                          border:
                            screenMode === 'dark'
                              ? '1px solid #4A4C5A'
                              : '1px solid #BFC2CA',
                          display: 'grid',
                          background: 'transparent',
                          placeContent: 'center',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          api
                            .post(
                              '/signals/respond',
                              {
                                SharedID: item?.SharedID,
                                Status: 'REJECTED',
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                              }
                            )
                            .then((res) => {
                              getListNotification();
                              toggleModalNoti();
                            });
                        }}
                      >
                        Từ chối
                      </button>
                    </div>
                    <div
                      style={{
                        color: screenMode === 'dark' ? '#ABADBA' : '#747B8B',
                        fontSize: '10px',
                      }}
                    >
                      {getTimeDifference(item?.SharedAt)} trước
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </StyledModalNoti>
      )}
      {modalStates.modalNotificationVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9998,
          }}
          onClick={toggleModalNoti}
        />
      )}
    </>
  );
};

export default ModalNoti;
