import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledFooter = styled.div<Props>`
  @media (max-width: 1920px) {
    .container-footer {
      max-width: 1280px;
    }
  }
  @media (max-width: 1600px) {
    .container-footer {
      max-width: 1140px;
    }
  }
  .wrapper-footer {
    border-top: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #30323b' : '1px solid #D5D7DC'};
    margin-top: 40px;
    .container-footer {
      margin: 0px auto;
      .footer-news {
        padding: 56px 0px;
        display: flex;
        justify-content: space-between;
        .left-box {
          display: grid;
          gap: 32px;
          .info {
            display: grid;
            gap: 24px;
            .item-info {
              display: flex;
              gap: 8px;
              font-size: 14px;
              line-height: 20px;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
            }
            .item-second {
              display: flex;
              gap: 8px;
              .item-child {
                display: grid;
                span:first-child {
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#abadba' : '#747B8B'};
                  font-size: 13px;
                  line-height: 20px;
                }
                span:last-child {
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
                  font-size: 14px;
                  line-height: 20px;
                }
              }
              .item-child:first-child {
                padding-right: 16px;
              }
              .item-child:last-child {
                padding-left: 16px;
              }
            }
          }
        }
        .right-box {
          padding: 24px;
          border-radius: 12px;
          display: grid;
          gap: 16px;
          background-color: ${(props) =>
            props.screen_mode === 'dark' ? '#191a1f' : '#ECECEF'};
          .top-box {
            display: flex;
            justify-content: space-between;
            padding-bottom: 16px;
            border-bottom: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid #30323b'
                : '1px solid #D5D7DC'};
            .text {
              display: flex;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
              font-size: 20px;
              line-height: 24px;
              display: grid;
              div {
                font-weight: 600;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#99baff' : '#004AEA'};
              }
            }
          }
          .bottom-box {
            display: flex;
            gap: 16px;
          }
        }
      }
    }
  }
`;
