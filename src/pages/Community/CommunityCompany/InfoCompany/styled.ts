import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledInfoCompany = styled.div<Props>`
  padding: 12px 24px 24px 24px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#fdfdfd'};

  > .box-stock {
    display: flex;
    flex-direction: column;
    > .number-stock {
      padding: 24px 0;
      border-radius: 6px;
      > .stock-price {
        display: flex;
        gap: 16px;
        padding-bottom: 20px;
        > .stock-price-children {
          display: flex;
          align-items: center;
          > .infomation {
            justify-content: center;
            align-items: center;
            display: flex;
            > span:nth-of-type(1) {
              font-size: 36px;
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
              background: #e43637;
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
          padding: 4px 8px;
          gap: 12px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          > span {
            font-size: 13px;
            font-weight: 500;

            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : '#747B8B'};
          }
        }
      }
      > .limit-price {
        display: flex;
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
    > .financial-report {
      display: flex;
      width: 100%;
      > .vic-table {
        padding: 0 40px;
        width: calc(100% / 3);
        /* padding-right: 8px; */
        border-right: ${(prop) =>
          prop.screen_mode === 'dark'
            ? '1px solid rgba(48, 50, 59, 1)'
            : '1px solid #D5D7DC'};
        > div:first-of-type {
          font-size: 15px;
          font-weight: 600;

          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255)'
              : 'rgba(2, 2, 2)'};
          padding-bottom: 8px;
        }
        > table {
          width: 100%;
          border-collapse: collapse;
          > tbody {
            > tr {
              > td:first-of-type {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 8px 23px 8px 0px;
                list-style-type: disc;
                /* list-style: decimal; */
                font-size: 14px;
                font-weight: 500;

                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(171, 173, 186, 1)'
                    : '#747B8B'};
                line-height: 20px;
              }
              > td:last-of-type {
                padding: 8px 0;

                font-size: 13px;
                font-weight: 400;

                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 1)'
                    : '#202127'};
                line-height: 20px;
              }
            }
          }
        }
      }
      > .vic-table:nth-of-type(1) {
        padding-left: 0px;
      }
      > .vic-table:last-of-type {
        border-right: none;
      }
    }
  }
`;
