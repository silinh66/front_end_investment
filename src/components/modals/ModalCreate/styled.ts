/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
export const StyledCreate = styled.div<any>`
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

    .body {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .head-author {
        display: flex;
        gap: 10px;
        align-items: center;
        .head-author__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .name {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(0, 0, 0, 0.5)'};
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
        }
      }
      .first {
        .no-resize-textarea {
          background-color: transparent;
          padding: 0px 16px;
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(74, 76, 90, 1) !important'
              : '1px solid #D5D7DC !important'};
          border-radius: 6px;
          height: 50px;
          font-size: 14px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(129, 132, 152, 1)'
              : '#878D9B'};
        }
        .no-resize-textarea::placeholder {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(129, 132, 152, 1)'
              : '#878D9B'};
          font-size: 14px;
        }
      }
      .second {
        .quill {
          background-color: transparent;
          padding: 0px 16px;
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(74, 76, 90, 1) !important'
              : '1px solid #D5D7DC !important'};
          border-radius: 6px;

          font-size: 14px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(227, 228, 232, 1)'
              : '#878D9B'};
        }
        .quill::placeholder {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(227, 228, 232, 1)'
              : '#878D9B'};
          font-size: 14px;
        }
        .ql-snow .ql-fill {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(227, 228, 232, 1)'
              : '#878D9B'};
        }
        .ql-snow .ql-picker {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(227, 228, 232, 1)'
              : '#878D9B'};
        }
        .ql-toolbar {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(0, 0, 0, 0.5)'};

          background: transparent;
          border: none !important;
          border-radius: 5px;
          padding: 5px;
          display: flex;
          flex-wrap: wrap;
        }
        .ql-container.ql-snow {
          border: none !important;
        }
        .ql-toolbar .ql-formats {
          margin-right: 10px;
        }

        .ql-toolbar button,
        .ql-toolbar .ql-picker {
          margin-right: 5px;
          border: none;
          background: none;
          padding: 5px;
        }

        .ql-toolbar button:hover,
        .ql-toolbar .ql-picker:hover {
          background-color: #e6e6e6;
          border-radius: 5px;
        }

        .ql-toolbar .ql-active {
          background-color: #ccc;
        }
        .ql-container {
          height: 300px;
          font-size: 20px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
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
`;
