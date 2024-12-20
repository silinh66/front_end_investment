/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import ReactECharts from 'echarts-for-react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'; //module
import today_icon from '@assets/icons/today_icon.svg';
import { sumBy } from 'lodash';
import { formatToMillion } from '@/components/ConvertNumber';
HC_more(Highcharts);
const NuocNgoai: FC = ({
  curTab,
  optionTuDoanhNew,
  formatNumberTo1Billion,
  screenMode,
  dataTopTuDoanhBan,
  dataTopTuDoanhMua,
  getAbsoluteMinValue,
  dataTopGdnnMua,
  optionsColumn,
  setCurSan,
  curSan,
  setCurTab,
  options,
  dataTopGdnnBan,
  optionNuocNgoaiNew,
  optionThanh,
  treeMapData,
  optionsColumnGiam,
}: any) => {
  const height = window.innerHeight;

  return (
    <div
      style={{
        width: '100%',
        // height: '304px',
        backgroundColor: screenMode === 'dark' ? '#202127' : '#ECECEF',
        padding: '4px 24px 24px 24px',
        boxSizing: 'border-box',
        borderRadius: '6px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottom:
            screenMode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className={curTab === 'bienDong' ? 'left-tab-active' : 'left-tab'}
            onClick={() => [setCurTab('bienDong')]}
            style={{
              color:
                curTab === 'bienDong'
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
              fontWeight: curTab === 'bienDong' ? '600' : '400',
            }}
          >
            Biến động
          </div>
          <div
            className={curTab === 'nuocNgoai' ? 'left-tab-active' : 'left-tab'}
            onClick={() => [setCurTab('nuocNgoai')]}
            style={{
              color:
                curTab === 'nuocNgoai'
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
              fontWeight: curTab === 'nuocNgoai' ? '600' : '400',
              // marginRight: '8px',
            }}
          >
            Nước ngoài
          </div>
          <div
            className={curTab === 'tuDoanh' ? 'left-tab-active' : 'left-tab'}
            onClick={() => [setCurTab('tuDoanh')]}
            style={{
              color:
                curTab === 'tuDoanh'
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
              fontWeight: curTab === 'tuDoanh' ? '600' : '400',
              // marginRight: '8px',
            }}
          >
            Tự doanh
          </div>
          <div
            className={curTab === 'thanhKhoan' ? 'left-tab-active' : 'left-tab'}
            onClick={() => [setCurTab('thanhKhoan')]}
            style={{
              color:
                curTab === 'thanhKhoan'
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
              fontWeight: curTab === 'thanhKhoan' ? '600' : '400',
              // marginRight: '8px',
            }}
          >
            Thanh khoản
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {curTab === 'bienDong' && (
            <div style={{ marginRight: '24px', padding: '10.5px 0px' }}>
              <div
                className="boxRow"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
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
                    Tăng
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
                    Giảm
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
                        screenMode === 'dark' ? '#D19B49' : '#E6B34C',
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
                    Không đổi
                  </div>
                </div>
              </div>
            </div>
          )}
          {curTab === 'nuocNgoai' && (
            <div style={{ marginRight: '24px', padding: '10.5px 0px' }}>
              <div
                className="boxRow"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
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
                    Tăng
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
                    Giảm
                  </div>
                </div>
                {/* <div
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
                        screenMode === 'dark' ? '#D19B49' : '#E6B34C',
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
                    Không đổi
                  </div>
                </div> */}
              </div>
            </div>
          )}
          {curTab === 'tuDoanh' && (
            <div style={{ marginRight: '24px', padding: '10.5px 0px' }}>
              <div
                className="boxRow"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
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
                    Tăng
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
                    Giảm
                  </div>
                </div>
                {/* <div
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
                        screenMode === 'dark' ? '#D19B49' : '#E6B34C',
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
                    Không đổi
                  </div>
                </div> */}
              </div>
            </div>
          )}
          {curTab === 'thanhKhoan' && (
            <div style={{ marginRight: '24px', padding: '10.5px 0px' }}>
              <div
                className="boxRow"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                  }}
                >
                  {/* <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  ></div> */}
                  <svg
                    width="24"
                    height="11"
                    viewBox="0 0 24 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 6.5H0V4.5H8V6.5Z"
                      fill={screenMode === 'dark' ? '#4B9B63' : '#589B4B'}
                    />
                    <circle
                      cx="12"
                      cy="5.5"
                      r="4"
                      fill={screenMode === 'dark' ? '#202127' : '#ECECEF'}
                      stroke={screenMode === 'dark' ? '#4B9B63' : '#589B4B'}
                      stroke-width="2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 6.5H16V4.5H24V6.5Z"
                      fill={screenMode === 'dark' ? '#4B9B63' : '#589B4B'}
                    />
                  </svg>

                  <div
                    style={{
                      fontSize: '13px',
                      fontFamily: 'Roboto Flex',
                      fontWeight: '400',
                      marginLeft: '4px',
                      color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                    }}
                  >
                    Hôm nay
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
                  {/* <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#D15449',
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  ></div> */}
                  <svg
                    width="24"
                    height="11"
                    viewBox="0 0 24 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 6.5H0V4.5H8V6.5Z"
                      fill={screenMode === 'dark' ? '#D19B49' : '#E6B34C'}
                    />
                    <circle
                      cx="12"
                      cy="5.5"
                      r="4"
                      fill={screenMode === 'dark' ? '#202127' : '#ECECEF'}
                      stroke={screenMode === 'dark' ? '#D19B49' : '#E6B34C'}
                      stroke-width="2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 6.5H16V4.5H24V6.5Z"
                      fill={screenMode === 'dark' ? '#D19B49' : '#E6B34C'}
                    />
                  </svg>

                  <div
                    style={{
                      fontSize: '13px',
                      fontFamily: 'Roboto Flex',
                      fontWeight: '400',
                      marginLeft: '4px',
                      color: screenMode === 'dark' ? '#ABADBA' : '#2E3138',
                    }}
                  >
                    Hôm qua
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '28px',
              border:
                screenMode === 'dark'
                  ? '1px solid #40424E'
                  : '1px solid #D5D7DC',
              borderRadius: '6px',
            }}
          >
            <div
              className={curSan === 'HOSE' ? 'left-san-active' : 'left-san'}
              onClick={() => [setCurSan('HOSE')]}
              style={{
                color:
                  curSan === 'HOSE'
                    ? '#fff'
                    : screenMode === 'dark'
                      ? '#fff'
                      : '#747B8B',
                padding: '4px 12px',
                fontSize: '13px',
                fontFamily: 'Roboto Flex',
                lineHeight: '20px',
                fontWeight: curSan === 'HOSE' ? '600' : '400',
                borderRadius: '6px',
              }}
            >
              HOSE
            </div>
            <div
              className={curSan === 'HNX' ? 'left-san-active' : 'left-san'}
              onClick={() => [setCurSan('HNX')]}
              style={{
                color:
                  curSan === 'HNX'
                    ? '#fff'
                    : screenMode === 'dark'
                      ? '#fff'
                      : '#747B8B',
                padding: '4px 12px',
                borderRadius: '6px',
                borderColor: screenMode === 'dark' ? '#4A4C5A' : '#D5D7DC',
                fontSize: '13px',
                fontFamily: 'Roboto Flex',
                lineHeight: '20px',
                fontWeight: curSan === 'HNX' ? '600' : '400',
              }}
            >
              HNX
            </div>
          </div>
        </div>
      </div>

      {curTab === 'bienDong' && (
        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: '12px',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              height: '200px',
              paddingTop: '16px',
              width: '250px',
            }}
          >
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div
            style={{
              paddingTop: '16px',
              width: '373px',
            }}
          >
            <ReactECharts
              option={optionsColumn}
              style={{
                height: '250px',
                width: '100%',
              }}
            />

            {/* <div
              style={{
                backgroundColor: 'pink',
                width: '94%',
                height: '20px',
                marginTop: '10px',
                marginLeft: '40px',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(66, 167, 50, 1)',
                  width: '94%',
                  height: '20px',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '4px 0px 0px 4px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                +
                {sumBy(
                  treeMapData?.filter((item) => item?.point > 0),
                  'point'
                )?.toFixed(2)}
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(228, 54, 55, 1)',
                  width: '94%',
                  height: '20px',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '0px 4px 4px 0px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                {sumBy(
                  treeMapData?.filter((item) => item?.point < 0),
                  'point'
                )?.toFixed(2)}
              </div>
            </div> */}
          </div>
          <div
            style={{
              paddingTop: '16px',
              width: '373px',
            }}
          >
            <ReactECharts
              option={optionsColumnGiam}
              style={{
                height: '250px',
                width: '100%',
              }}
            />
          </div>
        </div>
      )}
      {curTab === 'nuocNgoai' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              gap: '24px',
              flexDirection: 'row',
            }}
          >
            {/* <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    marginTop: '12px',
                  }}
                >
                  {dataTopGdnnMua
                    ?.slice(1, 8)
                    ?.map((item: any, index: number) => {
                      let maxValue =
                        -getAbsoluteMinValue(dataTopGdnnBan)?.value >
                        getAbsoluteMinValue(dataTopGdnnMua)?.value
                          ? -getAbsoluteMinValue(dataTopGdnnBan)?.value
                          : getAbsoluteMinValue(dataTopGdnnMua)?.value;

                      return (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px',
                            marginBottom: '12px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '12px',
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              width: '50px',
                              color: screenMode === 'dark' ? '#ffff' : 'black',
                            }}
                          >
                            {formatNumberTo1Billion(item?.value)}
                          </div>
                          <div
                            style={{
                              width: `${120 * (+item?.value / maxValue)}px`,
                              backgroundColor: 'rgb(66, 167, 50)',
                              height: '12px',
                            }}
                          ></div>
                          <div
                            style={{
                              fontSize: '12px',
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              color: screenMode === 'dark' ? '#ffff' : 'black',
                              width: '30px',
                            }}
                          >
                            {item?.text?.length > 3
                              ? `${item?.text?.slice(0, 3)?.toLocaleUpperCase()}...`
                              : item?.text?.toUpperCase()}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    textAlign: 'right',
                    marginRight: '4px',
                  }}
                >
                  <div
                    style={{
                      color: screenMode === 'dark' ? '#ffff' : 'black',
                      fontSize: '12px',
                      fontFamily: 'Roboto Flex',
                      textAlign: 'right',
                      paddingRight: '4px',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    Top mua ròng{' '}
                  </div>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'rgb(66, 167, 50)',
                      borderRadius: '50%',
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: '12px',
                  }}
                >
                  {dataTopGdnnBan
                    ?.slice(1, 8)
                    ?.map((item: any, index: number) => {
                      let maxValue =
                        -getAbsoluteMinValue(dataTopGdnnBan)?.value >
                        getAbsoluteMinValue(dataTopGdnnMua)?.value
                          ? -getAbsoluteMinValue(dataTopGdnnBan)?.value
                          : getAbsoluteMinValue(dataTopGdnnMua)?.value;
                      return (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px',
                            marginBottom: '12px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '12px',
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              color: screenMode === 'dark' ? '#ffff' : 'black',
                              width: '30px',
                            }}
                          >
                            {item?.text?.length > 3
                              ? `${item?.text?.slice(0, 3)?.toLocaleUpperCase()}...`
                              : item?.text?.toUpperCase()}
                          </div>
                          <div
                            style={{
                              width: `${120 * (item?.value / -maxValue)}px`,
                              backgroundColor: 'rgb(228, 54, 55)',
                              height: '12px',
                            }}
                          ></div>

                          <div
                            style={{
                              fontSize: '12px',
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              width: '50px',
                              color: screenMode === 'dark' ? '#ffff' : 'black',
                            }}
                          >
                            {formatNumberTo1Billion(item?.value)}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    marginLeft: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'rgb(228, 54, 55)',
                      borderRadius: '50%',
                      marginRight: '4px',
                    }}
                  ></div>
                  <div
                    style={{
                      color: screenMode === 'dark' ? '#ffff' : 'black',
                      fontSize: '12px',
                      fontFamily: 'Roboto Flex',
                      textAlign: 'left',
                      paddingRight: '4px',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {' '}
                    Top bán ròng
                  </div>
                </div>
              </div>
            </div> */}
            <div
              style={{
                width: '100%',
                // marginTop: '24px',
                display: 'flex',
                flexDirection: 'row',
                marginRight: '18px',
                marginTop: '24px',
              }}
            >
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1px',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor:
                      screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  {dataTopGdnnMua[4]?.text}
                  <br />
                  <span style={{ fontSize: 13, fontWeight: '500' }}>
                    {formatNumberTo1Billion(dataTopGdnnMua[4]?.value)}
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor:
                      screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      // height: '162px',
                      height: `${(524 * dataTopGdnnMua[3]?.value) / (dataTopGdnnMua[3]?.value + dataTopGdnnMua[5]?.value)}px`,
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnMua[3]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnMua[3]?.value)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: `${524 - (524 * dataTopGdnnMua[3]?.value) / (dataTopGdnnMua[3]?.value + dataTopGdnnMua[5]?.value)}px`,
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnMua[5]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnMua[5]?.value)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor:
                      screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: `${(524 * dataTopGdnnMua[2]?.value) / (dataTopGdnnMua[2]?.value + dataTopGdnnMua[6]?.value)}px`,
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnMua[2]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnMua[2]?.value)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: `${524 - (524 * dataTopGdnnMua[2]?.value) / (dataTopGdnnMua[2]?.value + dataTopGdnnMua[6]?.value)}px`,
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnMua[6]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnMua[6]?.value)}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor:
                      screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: `${(524 * dataTopGdnnMua[1]?.value) / (dataTopGdnnMua[1]?.value + dataTopGdnnMua[7]?.value)}px`,
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnMua[1]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnMua[1]?.value)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: `${524 - (524 * dataTopGdnnMua[1]?.value) / (dataTopGdnnMua[1]?.value + dataTopGdnnMua[7]?.value)}px`,
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnMua[7]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnMua[7]?.value)}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1px',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor: '#D15449',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                    borderLeft:
                      screenMode === 'dark'
                        ? '1px solid #30323B'
                        : '1px solid #fff',
                  }}
                >
                  <div
                    style={{
                      height: `${(524 * dataTopGdnnBan[1]?.value) / (dataTopGdnnBan[1]?.value + dataTopGdnnBan[7]?.value)}px`,
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnBan[1]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnBan[1]?.value)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: `${524 - (524 * dataTopGdnnBan[1]?.value) / (dataTopGdnnBan[1]?.value + dataTopGdnnBan[7]?.value)}px`,
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnBan[7]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnBan[7]?.value)}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor: '#D15449',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: `${(524 * dataTopGdnnBan[2]?.value) / (dataTopGdnnBan[2]?.value + dataTopGdnnBan[6]?.value)}px`,
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnBan[2]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnBan[2]?.value)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: `${524 - (524 * dataTopGdnnBan[2]?.value) / (dataTopGdnnBan[2]?.value + dataTopGdnnBan[6]?.value)}px`,
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnBan[6]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnBan[6]?.value)}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor: '#D15449',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: `${(524 * dataTopGdnnBan[3]?.value) / (dataTopGdnnBan[3]?.value + dataTopGdnnBan[5]?.value)}px`,
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      borderBottom:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnBan[3]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnBan[3]?.value)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: `${524 - (524 * dataTopGdnnBan[3]?.value) / (dataTopGdnnBan[3]?.value + dataTopGdnnBan[5]?.value)}px`,
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopGdnnBan[5]?.text}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatNumberTo1Billion(dataTopGdnnBan[5]?.value)}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '238px',
                    backgroundColor: '#D15449',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Roboto Flex',
                    flexDirection: 'column',
                  }}
                >
                  {dataTopGdnnBan[4]?.text}
                  <br />
                  <span style={{ fontSize: 13, fontWeight: '500' }}>
                    {formatNumberTo1Billion(dataTopGdnnBan[4]?.value)}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, paddingTop: '0px' }}>
              <ReactECharts
                option={optionNuocNgoaiNew}
                style={{
                  height: '252px',
                  width: '445px',
                  marginRight: '0px',
                  marginTop: '12px',
                }}
              />
            </div>
          </div>
        </div>
      )}
      {curTab === 'tuDoanh' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              gap: '24px',
              flexDirection: 'row',
            }}
          >
            {dataTopTuDoanhMua[4]?.ma_ck ? (
              <div
                style={{
                  width: '100%',
                  // marginTop: '24px',
                  display: 'flex',
                  flexDirection: 'row',
                  marginRight: '18px',
                  marginTop: '24px',
                }}
              >
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopTuDoanhMua[4]?.ma_ck}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatToMillion(dataTopTuDoanhMua[4]?.buy_val)}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        // height: '162px',
                        height: `${(524 * dataTopTuDoanhMua[3]?.buy_val) / (dataTopTuDoanhMua[3]?.buy_val + dataTopTuDoanhMua[5]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[3]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[3]?.buy_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhMua[3]?.buy_val) / (dataTopTuDoanhMua[3]?.buy_val + dataTopTuDoanhMua[5]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[5]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[5]?.buy_val)}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhMua[2]?.buy_val) / (dataTopTuDoanhMua[2]?.buy_val + dataTopTuDoanhMua[6]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[2]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[2]?.buy_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhMua[2]?.buy_val) / (dataTopTuDoanhMua[2]?.buy_val + dataTopTuDoanhMua[6]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[6]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[6]?.buy_val)}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhMua[1]?.buy_val) / (dataTopTuDoanhMua[1]?.buy_val + dataTopTuDoanhMua[7]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[1]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[1]?.buy_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhMua[1]?.buy_val) / (dataTopTuDoanhMua[1]?.buy_val + dataTopTuDoanhMua[7]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[7]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[7]?.buy_val)}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                      borderLeft:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhBan[3]?.sell_val) / (dataTopTuDoanhBan[3]?.sell_val + dataTopTuDoanhBan[5]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[3]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[3]?.sell_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhBan[3]?.sell_val) / (dataTopTuDoanhBan[3]?.sell_val + dataTopTuDoanhBan[5]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[5]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[5]?.sell_val)}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhBan[2]?.sell_val) / (dataTopTuDoanhBan[2]?.sell_val + dataTopTuDoanhBan[6]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[2]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[2]?.sell_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhBan[2]?.sell_val) / (dataTopTuDoanhBan[2]?.sell_val + dataTopTuDoanhBan[6]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[6]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[6]?.sell_val)}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhBan[1]?.sell_val) / (dataTopTuDoanhBan[1]?.sell_val + dataTopTuDoanhBan[7]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[1]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[1]?.sell_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhBan[1]?.sell_val) / (dataTopTuDoanhBan[1]?.sell_val + dataTopTuDoanhBan[7]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[7]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[7]?.sell_val)}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopTuDoanhBan[4]?.ma_ck}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatToMillion(dataTopTuDoanhBan[4]?.sell_val)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  // marginTop: '24px',
                  display: 'flex',
                  flexDirection: 'row',
                  marginRight: '18px',
                  marginTop: '24px',
                }}
              >
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopTuDoanhMua[3]?.ma_ck}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatToMillion(dataTopTuDoanhMua[3]?.buy_val)}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        // height: '162px',
                        height: `${(524 * dataTopTuDoanhMua[2]?.buy_val) / (dataTopTuDoanhMua[2]?.buy_val + dataTopTuDoanhMua[1]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[2]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[2]?.buy_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhMua[2]?.buy_val) / (dataTopTuDoanhMua[2]?.buy_val + dataTopTuDoanhMua[1]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[1]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[1]?.buy_val)}
                      </span>
                    </div>
                  </div>

                  {/* <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhMua[2]?.buy_val) / (dataTopTuDoanhMua[2]?.buy_val + dataTopTuDoanhMua[6]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[2]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[2]?.buy_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhMua[2]?.buy_val) / (dataTopTuDoanhMua[2]?.buy_val + dataTopTuDoanhMua[6]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[6]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[6]?.buy_val)}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor:
                        screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhMua[1]?.buy_val) / (dataTopTuDoanhMua[1]?.buy_val + dataTopTuDoanhMua[7]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[1]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[1]?.buy_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhMua[1]?.buy_val) / (dataTopTuDoanhMua[1]?.buy_val + dataTopTuDoanhMua[7]?.buy_val)}px`,
                        backgroundColor:
                          screenMode === 'dark' ? '#4B9B63' : '#589B4B',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhMua[7]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhMua[7]?.buy_val)}
                      </span>
                    </div>
                  </div> */}
                </div>
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                      borderLeft:
                        screenMode === 'dark'
                          ? '1px solid #30323B'
                          : '1px solid #fff',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhBan[3]?.sell_val) / (dataTopTuDoanhBan[3]?.sell_val + dataTopTuDoanhBan[2]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[3]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[3]?.sell_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhBan[3]?.sell_val) / (dataTopTuDoanhBan[3]?.sell_val + dataTopTuDoanhBan[2]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[5]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[2]?.sell_val)}
                      </span>
                    </div>
                  </div>

                  {/* <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhBan[2]?.sell_val) / (dataTopTuDoanhBan[2]?.sell_val + dataTopTuDoanhBan[6]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[2]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[2]?.sell_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhBan[2]?.sell_val) / (dataTopTuDoanhBan[2]?.sell_val + dataTopTuDoanhBan[6]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[6]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[6]?.sell_val)}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: `${(524 * dataTopTuDoanhBan[1]?.sell_val) / (dataTopTuDoanhBan[1]?.sell_val + dataTopTuDoanhBan[7]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        borderBottom:
                          screenMode === 'dark'
                            ? '1px solid #30323B'
                            : '1px solid #fff',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[1]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[1]?.sell_val)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: `${524 - (524 * dataTopTuDoanhBan[1]?.sell_val) / (dataTopTuDoanhBan[1]?.sell_val + dataTopTuDoanhBan[7]?.sell_val)}px`,
                        backgroundColor: '#D15449',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto Flex',
                        flexDirection: 'column',
                      }}
                    >
                      {dataTopTuDoanhBan[7]?.ma_ck}
                      <br />
                      <span style={{ fontSize: 13, fontWeight: '500' }}>
                        {formatToMillion(dataTopTuDoanhBan[7]?.sell_val)}
                      </span>
                    </div>
                  </div> */}
                  <div
                    style={{
                      flex: 1,
                      height: '238px',
                      backgroundColor: '#D15449',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto Flex',
                      flexDirection: 'column',
                    }}
                  >
                    {dataTopTuDoanhBan[1]?.ma_ck}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: '500' }}>
                      {formatToMillion(dataTopTuDoanhBan[1]?.sell_val)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div style={{ flex: 1, paddingTop: '0px' }}>
              <ReactECharts
                option={optionTuDoanhNew}
                style={{
                  height: '252px',
                  width: '445px',
                  marginRight: '0px',
                  marginTop: '12px',
                }}
              />
            </div>
          </div>
        </div>
      )}
      {curTab === 'thanhKhoan' && (
        <div
          style={{
            marginTop: '0px',
            marginLeft: '0px',
            height: '265px',
            width: '1020px',
          }}
        >
          <ReactECharts
            style={{ height: '280px', width: '100%' }}
            option={optionThanh}
          />
        </div>
      )}
    </div>
  );
};

export default NuocNgoai;
