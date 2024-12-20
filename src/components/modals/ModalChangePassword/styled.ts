import styled from 'styled-components';
export const StyledModalChangePassword = styled.div`
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
  z-index: 1001;
  .wrapper-modal {
    width: 400px; /* Chiều rộng cố định của modal */
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
        display: flex;
        gap: 8px;
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
    .header-done {
      padding: 16px 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .body {
      display: grid;
      gap: 20px;
      .text-header {
        font-size: 14px;
        line-height: 20px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#abadba' : '#565B67'};
        /* padding-bottom: 16px; */
      }
      .form {
        display: grid;
        gap: 8px;
        .label {
          font-size: 14px;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#FFFFFF' : '#2E3138'};
        }
        .input-email {
          position: relative;
          input {
            border: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid #4A4C5A'
                : '1px solid #D5D7DC'};
            width: 100%;
            outline: none;
            background-color: transparent;
            border-radius: 6px;
            height: 40px;
            padding-left: 16px;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#FFFFFF' : '#2E3138'};
          }
          input::placeholder {
            color: #818498;
          }
          .text-des {
            margin: 4px 0px;
            font-size: 13px;
            line-height: 20px;
            color: #fff;
          }
          .time-text {
            font-size: 13px;
            color: #abadba;
            line-height: 20px;
            span {
              color: #575a6a;
            }
            .send-again {
              color: #99baff;
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .action {
            display: grid;
            place-content: center;
            right: 6px;
            top: 6px;
            position: absolute;
            background: #22304f;
            color: #99baff;
            font-size: 13px;
            line-height: 20px;
            border-radius: 6px;
            padding: 0px 12px;
            height: 28px;
            cursor: pointer;
            &:hover {
              color: #004aea;
            }
          }
          .btn-show-pass {
            cursor: pointer;
            display: grid;
            place-content: center;
            right: 6px;
            top: 6px;
            position: absolute;

            font-size: 13px;
            line-height: 20px;
            border-radius: 6px;
            padding: 0px 12px;
            height: 28px;
          }
        }
        .error-message {
          color: red;
          font-size: 12px;
        }
      }
      .btn-submit {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#ffffff0d' : '#CCDDFF'};
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#575a6a' : '#FFFFFF'};
        font-size: 14px;
        line-height: 20px;
        display: grid;
        place-content: center;
        width: 100%;
        border-radius: 6px;
        height: 40px;
      }
      .action-submit {
        background-color: #004aea;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
        display: grid;
        place-content: center;
        width: 100%;
        border-radius: 6px;
        cursor: pointer;
        height: 40px;
      }
    }
    .body-done {
      display: grid;
      align-items: center;
      justify-content: center;
      gap: 32px;
      .content {
        display: grid;
        align-items: center;
        justify-items: center;
        .text-top {
          margin-top: 16px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#ffffff' : '#2E3138'};
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
        }
        .des-text {
          text-align: center;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#abadba' : '#565B67'};
          font-size: 13px;
          line-height: 20px;
        }
      }
      .box-btn {
        display: flex;
        gap: 16px;
        .cancel {
          cursor: pointer;
          width: 50%;
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid #4a4c5a'
              : '1px solid #BFC2CA'};
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#ffffff' : '#2E3138'};
          background-color: transparent;
          border-radius: 6px;
          padding: 8px 20px;
          font-size: 14px;
        }
        .login {
          cursor: pointer;
          font-size: 14px;
          width: 50%;
          padding: 8px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          background-color: #004aea;
          border-radius: 6px;
        }
      }
    }
  }
`;
