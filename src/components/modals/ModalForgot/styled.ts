import styled from 'styled-components';
export const StyledModalForgot = styled.div`
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
  z-index: 1000;
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
      .description {
        font-size: 14px;
        line-height: 20px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#ABADBA' : '#747B8B'};
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
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#FFFFFF' : '#2E3138'};
          }
          .time-text {
            font-size: 13px;
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#abadba' : '#747B8B'};
            line-height: 20px;
            span {
              color: ${(props) =>
                props.screen_mode === 'dark' ? ' #575a6a ' : '#D0D2D8'};
            }
            .send-again {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#99baff' : '#004AEA'};
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
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#22304f' : '#CCDDFF'};
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#99baff ' : '#004AEA'};
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
          .btn-send-code {
            display: grid;
            place-content: center;
            right: 6px;
            top: 6px;
            position: absolute;
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#ffffff0d' : '#CCDDFF'};
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#575a6a' : '#FFFFFF'};
            font-size: 13px;
            line-height: 20px;
            border-radius: 6px;
            padding: 0px 12px;
            height: 28px;
          }
        }
      }
      .btn-submit {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#ffffff0d' : '#CCDDFF'};
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#575a6a ' : '#FFFFFF'};
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
