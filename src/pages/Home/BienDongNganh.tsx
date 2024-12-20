/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'; //module
HC_more(Highcharts);
import { Tooltip } from 'antd';

const BienDongNganh: FC = ({
  optionDienBienDongTienNganh,
  curTabRight,
  screenMode,
  setCurTabRight,
  dataListDropdown,
}: any) => {
  //get height of current screen
  const height = window.innerHeight;
  return (
    <div
      style={{
        backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
        boxSizing: 'border-box',
        borderRadius: '6px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingTop: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottom:
            screenMode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC',
          margin: '0px 24px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '44px',
            alignItems: 'center',
          }}
        >
          <div
            className={
              curTabRight === 'bienDongNganh' ? 'right-tab-active' : 'right-tab'
            }
            onClick={() => [setCurTabRight('bienDongNganh')]}
            style={{
              color:
                curTabRight === 'bienDongNganh'
                  ? screenMode === 'dark'
                    ? 'rgba(153, 186, 255, 1)'
                    : '#004AEA'
                  : screenMode === 'dark'
                    ? '#fff'
                    : '#2E3138',
              padding: '10.5px 16px',
              borderRadius: '3px',
              fontSize: '15px',
              fontFamily: 'Roboto Flex',
              lineHeight: '20px',
              fontWeight: curTabRight === 'bienDongNganh' ? '600' : '400',
              cursor: 'pointer',
            }}
          >
            Biến động ngành
          </div>
          <div
            className={
              curTabRight === 'dienBienDongTienNganh'
                ? 'right-tab-active'
                : 'right-tab'
            }
            onClick={() => [setCurTabRight('dienBienDongTienNganh')]}
            style={{
              color:
                curTabRight === 'dienBienDongTienNganh'
                  ? screenMode === 'dark'
                    ? 'rgba(153, 186, 255, 1)'
                    : '#004AEA'
                  : screenMode === 'dark'
                    ? '#fff'
                    : '#2E3138',
              padding: '10.5px 16px',
              borderRadius: '3px',
              fontSize: '15px',
              fontFamily: 'Roboto Flex',
              lineHeight: '20px',
              fontWeight:
                curTabRight === 'dienBienDongTienNganh' ? '600' : '400',
            }}
          >
            Diễn biến dòng tiền ngành
          </div>
        </div>
        {curTabRight === 'bienDongNganh' && (
          <div style={{ padding: '10.5px 0px' }}>
            <div
              className="boxRow"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                // marginTop: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor:
                      screenMode === 'dark' ? '#9D5FBB' : '#BB5F9C',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                ></div>
                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: 'Roboto Flex',
                    fontWeight: '400',
                    color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                  }}
                >
                  Mã trần
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor:
                      screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                ></div>
                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: 'Roboto Flex',
                    fontWeight: '400',
                    color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                  }}
                >
                  Mã tăng
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#D15449',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                ></div>
                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: 'Roboto Flex',
                    fontWeight: '400',
                    color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                  }}
                >
                  Mã giảm
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor:
                      screenMode === 'dark' ? '#545FC6' : '#9D5FBB',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                ></div>
                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: 'Roboto Flex',
                    fontWeight: '400',
                    color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                  }}
                >
                  Mã sàn
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {curTabRight === 'bienDongNganh' && (
        <div
          style={{
            // backgroundColor: 'pink',
            // display: 'flex',
            // flex: 1,
            // flexDirection: 'column',
            overflow: 'auto',
            // maxHeight: '100%',
            height: `${(height * 24.271) / 100}px`,
            // padding: '4px 24px 24px 24px',
          }}
        >
          {dataListDropdown?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '24px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Tooltip
                  title={
                    <div
                      style={{
                        backgroundColor:
                          screenMode === 'dark' ? '#202127' : '#f2f2f2',
                        padding: 0,
                        margin: 0,
                        scrollbarColor: 'rgba(42, 46, 57, 1) #1F232C',
                        scrollbarWidth: 'thin',
                        border: '1px solid rgb(25, 127, 191, 0.18)',
                        borderRadius: '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: ' center',
                          fontWeight: '600',
                          padding: '8px',
                          color: screenMode === 'dark' ? '#fff' : '#2E3138',
                        }}
                      >
                        {item?.title}
                      </div>
                      <div
                        style={{
                          height: '400px',
                          overflow: 'scroll',
                          scrollbarColor:
                            screenMode === 'light'
                              ? '#c8c8c8 #d5d5d5'
                              : 'rgba(42, 46,s 57, 1) #1f232c',
                          scrollbarWidth: 'thin',
                        }}
                      >
                        {item?.listSymbol?.map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              style={{
                                color: screenMode === 'dark' ? '#fff' : 'black',

                                marginBottom: '4px',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor:
                                  index % 2 === 0
                                    ? screenMode === 'dark'
                                      ? '#28292f'
                                      : '#eee'
                                    : screenMode === 'dark'
                                      ? '#33343C'
                                      : '#fbfbfb',
                              }}
                            >
                              {index + 1}. {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  }
                >
                  <div
                    style={{
                      color: screenMode === 'dark' ? '#fff' : '#2E3138',
                      width: '96px',
                      textAlign: 'right',
                      marginRight: '12px',
                      fontSize: '13px',
                      fontFamily: 'Roboto Flex',
                      fontWeight: '400',
                      lineHeight: '20px',
                    }}
                  >
                    {item?.title?.length > 12
                      ? `${item?.title.slice(0, 12)}...`
                      : item?.title}
                  </div>
                </Tooltip>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginRight: '0px',
                    borderRadius: '2px',
                  }}
                >
                  {item?.ceilingCount > 0 && (
                    <Tooltip
                      title={
                        (item?.ceilingCount / item?.totalCount) * 100 < 5
                          ? `${((item?.ceilingCount / item?.totalCount) * 100).toFixed(1)}
                    %`
                          : ''
                      }
                    >
                      <div
                        style={{
                          width: `${(550 * item?.ceilingCount) / item?.totalCount}px`,
                          height: '24px',
                          backgroundColor:
                            screenMode === 'dark' ? '#9D5FBB' : '#BB5F9C',
                          fontSize: '10px',
                          fontFamily: 'Roboto Flex',
                          color: '#fff',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: '600',
                          border:
                            screenMode === 'dark'
                              ? '1px solid #000'
                              : '1px solid #fff',
                          borderLeft: 'none',
                          borderTop:
                            index === 0
                              ? screenMode === 'dark'
                                ? '1px solid #000'
                                : '1px solid #fff'
                              : '0px',
                        }}
                      >
                        {(item?.ceilingCount / item?.totalCount) * 100 > 5
                          ? `${((item?.ceilingCount / item?.totalCount) * 100).toFixed(1)}
                      %`
                          : ''}
                      </div>
                    </Tooltip>
                  )}
                  <Tooltip
                    title={
                      (item?.upCount / item?.totalCount) * 100 < 5
                        ? `${((item?.upCount / item?.totalCount) * 100).toFixed(1)}
                    %`
                        : ''
                    }
                  >
                    <div
                      style={{
                        width: `${(550 * item?.upCount) / item?.totalCount}px`,
                        height: '24px',
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        fontSize: '10px',
                        fontFamily: 'Roboto Flex',
                        color: '#fff',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '600',
                        borderRight:
                          screenMode === 'dark'
                            ? '1px solid #000'
                            : '1px solid #fff',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #000'
                            : '1px solid #fff',
                        borderLeft: '0px',
                        borderTop:
                          index === 0
                            ? screenMode === 'dark'
                              ? '1px solid #000'
                              : '1px solid #fff'
                            : '0px',
                      }}
                    >
                      {(item?.upCount / item?.totalCount) * 100 > 5
                        ? `${((item?.upCount / item?.totalCount) * 100).toFixed(1)}
                      %`
                        : ''}
                    </div>
                  </Tooltip>

                  <Tooltip
                    title={
                      (item?.noChangeCount / item?.totalCount) * 100 < 5
                        ? `${((item?.noChangeCount / item?.totalCount) * 100).toFixed(1)}
                    %`
                        : ''
                    }
                  >
                    <div
                      style={{
                        width: `${(550 * item?.noChangeCount) / item?.totalCount}px`,
                        height: '24px',
                        backgroundColor:
                          screenMode === 'dark' ? '#D19B49' : '#E6B34C',
                        fontSize: '10px',
                        fontFamily: 'Roboto Flex',
                        color: '#fff',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '600',
                        borderRight:
                          screenMode === 'dark'
                            ? '1px solid #000'
                            : '1px solid #fff',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #000'
                            : '1px solid #fff',
                        borderLeft: '0px',
                        borderTop:
                          index === 0
                            ? screenMode === 'dark'
                              ? '1px solid #000'
                              : '1px solid #fff'
                            : '0px',
                      }}
                    >
                      {(item?.noChangeCount / item?.totalCount) * 100 > 5
                        ? `${((item?.noChangeCount / item?.totalCount) * 100).toFixed(1)}
                      %`
                        : ''}
                    </div>
                  </Tooltip>

                  <Tooltip
                    title={
                      (item?.downCount / item?.totalCount) * 100 < 5
                        ? `${((item?.downCount / item?.totalCount) * 100).toFixed(1)}
                    %`
                        : ''
                    }
                  >
                    <div
                      style={{
                        width: `${(550 * item?.downCount) / item?.totalCount}px`,
                        height: '24px',
                        backgroundColor: '#D15449',
                        fontSize: '10px',
                        fontFamily: 'Roboto Flex',
                        color: '#fff',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '600',
                        borderRight:
                          screenMode === 'dark'
                            ? '1px solid #000'
                            : '1px solid #fff',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #000'
                            : '1px solid #fff',
                        borderLeft: '0px',
                        borderTop:
                          index === 0
                            ? screenMode === 'dark'
                              ? '1px solid #000'
                              : '1px solid #fff'
                            : '0px',
                      }}
                    >
                      {(item?.downCount / item?.totalCount) * 100 > 5
                        ? `${((item?.downCount / item?.totalCount) * 100).toFixed(1)}
                      %`
                        : ''}
                    </div>
                  </Tooltip>

                  {item?.floorCount > 0 && (
                    <Tooltip
                      title={
                        (item?.floorCount / item?.totalCount) * 100 < 5
                          ? `${((item?.floorCount / item?.totalCount) * 100).toFixed(1)}
                    %`
                          : ''
                      }
                    >
                      <div
                        style={{
                          width: `${(550 * item?.floorCount) / item?.totalCount}px`,
                          height: '24px',
                          backgroundColor:
                            screenMode === 'dark' ? '#545FC6' : '#9D5FBB',
                          fontSize: '10px',
                          fontFamily: 'Roboto Flex',
                          color: '#fff',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: '600',
                          borderRight:
                            screenMode === 'dark'
                              ? '1px solid #000'
                              : '1px solid #fff',
                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #000'
                              : '1px solid #fff',
                          borderLeft: '0px',
                          borderTop:
                            index === 0
                              ? screenMode === 'dark'
                                ? '1px solid #000'
                                : '1px solid #fff'
                              : '0px',
                        }}
                      >
                        {(item?.floorCount / item?.totalCount) * 100 > 5
                          ? `${((item?.floorCount / item?.totalCount) * 100).toFixed(1)}
                      %`
                          : ''}
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {curTabRight === 'dienBienDongTienNganh' && (
        <div style={{ width: '100%', height: '200px' }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={optionDienBienDongTienNganh}
          />
        </div>
      )}
    </div>
  );
};

export default BienDongNganh;
