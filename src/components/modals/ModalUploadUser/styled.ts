/* eslint-disable @typescript-eslint/no-explicit-any */

import styled from 'styled-components';
export const StyledUpload = styled.div<any>`
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
    width: 467px; /* Chiều rộng cố định của modal */
    background-color: ${(props) =>
      props.screen_mode === 'light'
        ? '#fff'
        : 'rgba(32, 33, 39, 1)'}; /* Màu nền của nội dung modal */
    box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.3);

    padding: 0px 32px 32px 32px; /* Đệm xung quanh nội dung */
    overflow: auto; /* Cho phép cuộn trong modal nếu nội dung quá dài */
    position: relative;
    border-radius: 6px;
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
    .body-upload {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .auth-modal {
        display: flex;
        align-items: center;
        gap: 16px;

        .avt {
          .preview-image {
            border-radius: 100%;
            height: 80px;
            width: 80px;
          }
          position: relative;
          .icon-upload {
            cursor: pointer;
            position: absolute;
            left: 50px;
            bottom: 0px;
          }

          .upload {
            display: none; /* Hide the original input */
          }
          #img + .icon-upload {
            /* Optional styles to align icon as per the input */
            display: inline-block;
            vertical-align: middle;
          }
        }
        .name {
          font-size: 15px;
          font-weight: 600;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        }
      }
      .form-input {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .text {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
          font-size: 14px;
          line-height: 20px;
        }
        input {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
          height: 40px;
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(74, 76, 90, 1)'
              : '1px solid #D5D7DC'};
          outline: none;
          background-color: transparent;
          padding-right: 8px;
          padding-left: 16px;
          border-radius: 6px;
        }
        input:nth-child(1) {
          border: none;
        }
        .ant-picker .ant-picker-suffix {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        }
        .ant-picker {
          padding: 0px;
        }
        .ant-picker-outlined {
          padding-right: 10px;
          background: transparent;
          border-width: 1px;
          border-style: solid;
          border-color: ${(props) =>
            props.screen_mode === 'dark' ? 'rgba(74, 76, 90, 1)' : '#D5D7DC'};
        }
      }
      .wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        .save,
        .cancel {
          cursor: pointer;
          min-width: 104px;
          padding: 8px 20px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cancel {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(74, 76, 90, 1)'
              : '1px solid #D5D7DC'};
        }
        .disabled {
          background-color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : '#CCDDFF'};
          color: ${(props) =>
            props.screen === 'dark' ? 'rgba(87, 90, 106, 1)' : '#FFFFFF'};
        }
        .click {
          background-color: rgba(0, 74, 234, 1);
          color: #fff;
        }
      }
    }
  }
`;