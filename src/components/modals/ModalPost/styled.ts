/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
export const StyledModalPost = styled.div<any>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    51,
    51,
    51,
    0.7
  ); /* Sử dụng rgba cho hiệu ứng nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition:
    visibility 0s,
    opacity 0.2s linear;
  z-index: 1000; /* Đảm bảo modal nằm trên các thành phần khác */
  .wrapper-modal {
    width: 610px; /* Chiều rộng cố định của modal */
    background-color: ${(props) =>
      props.screen_mode === 'light'
        ? '#fff'
        : 'rgba(32, 33, 39, 1)'}; /* Màu nền của nội dung modal */
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.3);

    padding: 0px 32px 40px 32px; /* Đệm xung quanh nội dung */
    overflow: scroll; /* Cho phép cuộn trong modal nếu nội dung quá dài */
    position: relative;
    border-radius: 6px;
    height: calc(100vh - 40px);
    .header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(48, 50, 59, 1)'
          : '1px solid #D5D7DC'};
      margin-bottom: 24px;
      .title-modal {
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
      }
      .close:hover svg path {
        cursor: pointer;
        fill: ${(props) => (props.screen_mode === 'dark' ? '#fff' : ' #333')};
      }
    }
    .body {
      .footer-post {
        display: flex;
        flex-direction: column;
        gap: 12px;
        .bottom-left {
          .bottom__count {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? '#818498'
                : 'rgba(255, 255, 255, 0.5)'};
            padding: 0 20px;
            font-size: 12px;
            @media only screen and (min-width: 1600px) {
              font-size: 14px;
            }
          }
        }
        .bottom-right {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .bottom__count {
            font-size: 13px;
            font-weight: 400;
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? '#818498'
                : 'rgba(255, 255, 255, 0.5)'};
            line-height: 20px;
            @media only screen and (min-width: 1600px) {
              font-size: 13px;
            }
          }
        }
        .button-post {
          display: flex;
          padding: 12px 0;
          border-top: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(48, 50, 59, 1)'
              : '1px solid #D5D7DC'};
          border-bottom: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(48, 50, 59, 1)'
              : '1px solid #D5D7DC'};
          gap: 32px;
          align-items: center;

          .btn {
            justify-content: center;
            width: 50%;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#ABADBA' : '#565B67'};
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            &:hover {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
            }
            &:hover svg path {
              fill: ${(props) =>
                props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
            }
          }
          .active {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
          }
        }
      }
    }
  }
  .wrapper-modal::-webkit-scrollbar {
    display: none;
  }
`;
