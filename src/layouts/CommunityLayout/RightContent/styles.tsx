import { Card } from 'antd';
import styled from 'styled-components';

export const Styles = styled.div<{ screen_mode: string }>`
  @media (max-width: 1920px) {
    .chart-community,
    .box-rightContent {
      width: 455px;
    }
  }
  @media (max-width: 1600px) {
    .chart-community,
    .box-rightContent {
      width: 343px;
    }
  }
  @media (max-width: 1280px) {
    .chart-community,
    .box-rightContent {
      width: 305px;
    }
  }
  .box-rightContent {
    border-radius: 6px;
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
  }
  .chart-community {
    padding: 0px 24px 16px 24px;
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
    border-radius: 6px;
    .header {
      font-size: 15px;
      line-height: 28px;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      padding: 14px 0px;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #30323B'
          : '1px solid #D5D7DC'};
    }
    .bottom {
      > .number-stock {
        padding: 12px 16px 16px 16px;
        border-radius: 6px;
        display: flex;
        gap: 8px;
        flex-direction: column;
        > .stock-price {
          display: flex;
          gap: 16px;
          align-items: center;
          > .stock-price-children {
            display: flex;
            align-items: center;
            > .infomation {
              justify-content: center;
              align-items: center;
              display: flex;
              gap: 4px;
              > span:nth-of-type(1) {
                font-size: 20px;
                font-weight: 600;

                color: #e43637;
                padding-right: 18px;
              }
              > span:nth-of-type(2) {
                font-size: 24px;
                font-weight: 500;

                color: #e43637;
                padding-right: 12px;
              }
              > span:nth-of-type(3) {
                padding: 8px 12px;
                border-radius: 100px;
                /* background: #e43637; */
                backdrop-filter: blur(7px);
                font-size: 14px;
                font-weight: 400;
                color: #fff;
                /* margin-right: 16px; */
              }
            }
          }
          > .market {
            display: flex;
            align-items: center;
            padding: 0px 8px;
            gap: 12px;
            border-radius: 100px;
            height: 20px;
            height: 2;
            /* border: 1px solid rgba(255, 255, 255, 0.2); */
            > span {
              font-size: 13px;
              font-weight: 400;

              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#000'};
            }
          }
        }
        > .limit-price {
          display: flex;
          align-items: center;
          gap: 20px;
          > .lowest-price {
            display: flex;
            gap: 4px;
            align-items: center;
            > span:first-of-type {
              font-size: 14px;
              font-weight: 500;

              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : '#747B8B'};
            }
            > span:last-of-type {
              font-size: 14px;
              font-weight: 500;

              color: rgba(209, 84, 73, 1);
            }
          }
          > .highest-price {
            gap: 4px;
            display: flex;
            align-items: center;
            > span:first-of-type {
              font-size: 14px;
              font-weight: 500;

              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(171, 173, 186, 1)'
                  : '#747B8B'};
            }
            > span:last-of-type {
              font-size: 14px;
              font-weight: 500;

              color: rgba(92, 214, 128, 1);
            }
          }
          > .hour {
            > .ant-select {
              cursor: pointer;
              width: 78px;
              height: 35px;
              > .ant-select-selector {
                padding: 8px 12px;
                background: ${(props) =>
                  props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
                border-radius: 8px;
                > .ant-select-selection-item {
                  font-size: 16px;
                  font-weight: 500;

                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#202127'};
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const CardStyles = styled(Card)`
  background-color: #1f232c;
  border: none;
  outline: none;
  padding: 16px;
  color: white;
  .card-avatar {
    width: 76px;
    height: 76px;
    border-radius: 8px;
  }
  .card-name {
    font-weight: 500;
    line-height: 1rem;
  }
  .card-text {
    font-weight: 400;
    line-height: 1rem;
  }
`;
export const CardCustomStyles = styled(Card)`
  background-color: #1f232c;
  border: none;
  outline: none;
  color: white;
  .ant-card-body {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
  }
  .postCard-avatar {
    width: 30%;
    /* aspect-ratio: 1/1; */
    border-radius: 8px;
    object-fit: cover;
  }
  .postCard-title {
    font-weight: 500;
    display: inline-block;
    width: 180px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
  .postCard-para {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: rgba(255, 255, 255, 0.5);
  }
  .postCard-otherInfo {
    display: flex;
    justify-content: start;
    gap: 16px;
    .text {
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;
export const PanelStyles = styled.div``;
