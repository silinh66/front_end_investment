/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
type Props = {
  screen_mode: string;
};
export const StyledAuthGroup = styled.div<Props>`
  @media (max-width: 1920px) {
    .sign-in {
      height: 40px;
    }
  }
  @media (max-width: 1600px) {
    .sign-in {
      height: 36px;
    }
  }
  .screen-mode:hover {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? ' #4a4c5a' : '#D5D7DC'};
  }
  .sign-up:hover {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? ' #4a4c5a' : '#D5D7DC'};
  }
  .sign-in:hover {
    background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? ' #4a4c5a !important'
        : '#D5D7DC !important'};
  }

  .tools-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    height: 40px;
    .icon-mess {
      padding: 8px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      &:hover {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      }
    }
    .icon-noti {
      padding: 8px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      &:hover {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      }
    }
    .messenger {
      position: fixed;
      bottom: 0;
      right: 24px;
      z-index: 2;
      background-color: #202127;
      border-radius: 6px;
      width: 360px;
      box-shadow: 0px 5px 20px 0px #00000080;
    }
    img {
      width: 24px;
      height: 24px;
    }

    .action {
      background: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
    }
    :where(.css-dev-only-do-not-override-1k979oh).ant-modal .ant-modal-content {
      box-shadow: none !important;
    }

    .user {
      display: flex;
      align-items: center;
      width: 163px;
      height: 40px;
      gap: 8px;
      position: relative;
      border-radius: 6px;
      padding: 8px 6px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127 ' : '#ECECEF'};
      }
      > img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      > span {
        font-size: 13px;
        font-weight: 500;
        width: 91px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#020202'};
      }
      .icon-up {
        display: block;
      }
      .icon-down {
        display: none;
      }
      /* &:hover {
        .dropdown {
          display: block;
          z-index: 20;
        }
        .icon-down {
          display: block;
        }
        .icon-up {
          display: none;
        }
      } */
      .dropdown {
        display: none;
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        width: 204px;
        padding: 12px;
        border-radius: 12px;
        background-color: black;
        color: white;
        a {
          cursor: pointer;
          display: block;
          padding: 10px 20px;
          font-size: 14px;
          font-family: Roboto;
          border-radius: 8px;
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
        &:after {
          position: absolute;
          content: '';
          width: 160px;
          height: 20px;
          bottom: 100%;
          right: 0;
          background-color: transparent;
        }
      }
    }
  }
`;

export const StyledModalSignIn = styled.div<{ screen_mode: string }>`
  .ant-modal .ant-modal-content {
    width: 460px;
  }
  padding: 32px;
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#202127' : '#FFFFFF'};
  backdrop-filter: blur(8px);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 40px 0px #0000004d;

  gap: 32px;

  .signIn-head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .signIn-head__name {
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      font-size: 36px;
      font-weight: 600;
      line-height: 42.19px;
    }
    .signIn-title {
      text-align: center;
      font-size: 14px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#abadba' : '#565B67'};
      span {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#99baff' : '#004AEA'};
      }
    }
  }
  .warning {
    color: red;
    font-size: 12px;
    line-height: 1.5;
    margin: 0 auto;
    width: min(400px, 90%);
  }
  .signIn-actions {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    border: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #40424e' : '1px solid #D5D7DC'};
    gap: 16px;
    border-radius: 6px;
    height: 40px;
    align-items: center;

    &:hover {
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #818498'
          : '1px solid #878D9B'};
    }
    .action-btn {
      width: 100%;
      display: flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      /* padding: 10px 22px; */
      cursor: pointer;
      transition: 0.04s linear;
      img {
        height: 20px;
        width: 20px;
      }
      &:hover {
        filter: brightness(1.2);
      }
      p {
        font-size: 14px;
        font-weight: 500;
        color: ${(props) =>
          props.screen_mode === 'dark' ? 'white' : '#2E3138'};
      }
    }
  }
  .signIn-divider {
    display: flex;
    justify-content: center;
    position: relative;

    .text {
      color: #42a732;
      padding: 0 30px;
      /* background-color: rgba(31, 35, 44, 0.8); */
    }
    &:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 138px;
      height: 1px;
      border-bottom: 1px solid green;
    }
    &:before {
      position: absolute;
      content: '';
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 138px;
      height: 1px;
      border-bottom: 1px solid green;
    }
  }
  .signIn-form {
    display: grid;
    gap: 16px;
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-background-clip: text;
      -webkit-text-fill-color: #ffffff;
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: inset 0 0 20px 20px #23232329;
    }
    .ant-form-item {
      .ant-form-item-label > label {
        display: block;
        font-size: 13px;
        font-weight: 600;

        color: #fff;
      }
    }
    :where(.css-dev-only-do-not-override-1k979oh).ant-input-outlined {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#fff'};
      border-color: ${(props) =>
        props.screen_mode === 'dark' ? '#4a4c5a' : '#D5D7DC'};
      &:hover {
        border-color: ${(props) =>
          props.screen_mode === 'dark' ? '#818498' : '#878D9B'};
      }
    }
    .ant-form-item {
      margin-bottom: 0px;
    }
    .ant-form-item .ant-form-item-control-input-content {
      position: relative;
      .icon {
        z-index: 2;
        position: absolute;
        top: 10px;
        left: 15px;
      }
    }
    .ant-input-outlined.ant-input-status-error:not(.ant-input-disabled),
    .ant-input-outlined:hover {
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#fff'};
    }

    input,
    .ant-input:placeholder-shown {
      padding-left: 5px;
      border-radius: 6px;
      height: 40px;
      display: flex;
      align-items: center;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
    }
    .ant-input-affix-wrapper {
      padding: 4px 11px 4px 15px;
      border-radius: 6px;
      height: 40px;
      display: flex;
      align-items: center;
    }
    .ant-input::placeholder {
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#818498' : '#878D9B'};
      font-size: 14px;
    }
    /* Định dạng cho các trường đã được điền tự động và được chọn */
    input:-internal-autofill-selected {
      background-color: red; /* Thay đổi màu nền khi trường nhập liệu được điền tự động và chọn */
      color: #000080; /* Màu chữ */
    }

    /* Cũng có thể thay đổi các thuộc tính khác nếu cần */
    input:-internal-autofill-selected:focus {
      outline: none; /* Xóa outline mặc định khi trường được chọn */
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Thêm bóng đổ */
    }

    .ant-input-affix-wrapper > input.ant-input {
      z-index: 10;
      height: 40px;
      border-top: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #4a4c5a'
          : '1px solid #D5D7DC'};
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #4a4c5a'
          : '1px solid #D5D7DC'};
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? 'transparent' : 'transparent'};
      border-radius: 0px !important;
      &:hover {
        border-top: ${(props) =>
          props.screen_mode === 'dark' ? '#818498' : '#878D9B'};
        border-bottom: ${(props) =>
          props.screen_mode === 'dark' ? '#818498' : '#878D9B'};
      }
    }
    .ant-input-affix-wrapper .anticon.ant-input-password-icon {
      color: #818498;
    }
    .forgot-password-btn {
      /* color: #42a732; */
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#abadba' : '#565B67'};
      font-size: 13px;
      &:hover {
        color: ${(props) =>
          props.screen_mode === 'light'
            ? 'rgb(111 155 247)'
            : 'rgb(31 102 255)'};
      }
    }
    .submit-btn {
      padding: 8px 20px;
      height: 40px;
      background-color: #004aea;
      width: 100%;
      border-radius: 6px;
      color: #ffffff;
      &:hover {
        background-color: #004aea;
        color: #ffffff;
        filter: brightness(1.2);
      }
    }
    /* .submit-btn {
      padding: 8px 20px;
      height: 40px;
      background-color: #ffffff0d;
      width: 100%;
      border-radius: 6px;
      color: #575a6a;
      &:hover {
        background-color: #ffffff0d;
        color: #575a6a;
        filter: brightness(1.2);
      }
    } */
    .ant-btn-primary {
      box-shadow: none;
    }
    .signIn-head__action {
      display: flex;
      /* flex-direction: column; */
      justify-content: center;
      align-items: end;
      /* margin-bottom: 24px; */
      gap: 8px;
      p {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        font-size: 13px;
      }
      a {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#abadba' : '#565B67'};
        &:hover {
          color: ${(props) =>
            props.screen_mode === 'light'
              ? 'rgb(111 155 247)'
              : 'rgb(31 102 255)'};
        }
      }
    }
  }
`;
export const StyledModalSignUp = styled.div<{ screen_mode: string }>`
  padding: 0px 32px 32px 32px;
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#202127' : '#fff'};
  width: 460px;
  backdrop-filter: blur(8px);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  /* gap: 30px; */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${(props) =>
      props.screen_mode === 'dark' ? '#ffffff' : '#0000'};
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: ${(props) =>
      props.screen_mode === 'dark'
        ? 'inset 0 0 20px 20px #202127'
        : 'inset 0 0 20px 20px #fff'};
  }

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
    .signIn-title {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
    }
    .icon-close {
      cursor: pointer;
      &:hover svg path {
        fill: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      }
    }
  }
  .signIn-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .signIn-head__name {
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};

      font-size: 20px;

      span {
        color: #42a732;
      }
    }
    .signIn-head__action {
      display: flex;
      /* flex-direction: column;
      align-items: end; */
      justify-content: center;
      width: 100%;
      gap: 8px;
      p {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};

        font-size: 13px;
      }
      a {
        font-size: 13px;

        color: ${(props) =>
          props.screen_mode === 'dark' ? '#abadba' : '#565B67'};
        &:hover {
          color: ${(props) =>
            props.screen_mode === 'light'
              ? 'rgb(111 155 247)'
              : 'rgb(31 102 255)'};
        }
      }
    }
  }

  .ant-form-item {
    margin: 5px 0 10px 0;
  }
  .input-otp {
    width: calc(100% / 6);
    height: 40px;
  }
  .react-tel-input .form-control {
    background: #202127 !important;
    border: 1px solid rgba(48, 50, 59, 1);
    height: 40px;
    padding-left: 70px;
    width: 100%;
    outline: none;
    &:hover {
      border: 1px solid #818498;
    }
  }
  .ant-form-vertical .ant-form-item .ant-form-item-control {
    border-radius: 6px;
    position: relative;
  }
  input {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#fff'};
    color: ${(props) =>
      props.screen_mode === 'dark' ? '#fff !important' : '#2E3138 !important'};
  }
  /* .react-tel-input .form-control, */
  .react-tel-input .flag-dropdown.open,
  .react-tel-input .flag-dropdown {
    border-radius: 6px;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#fff'};
    border: 1px solid rgba(48, 50, 59, 1);
    /* &:hover {
      border: 1px solid #818498;
    } */
    height: 40px;
    padding: 8px;
    /* width: 100%; */
    outline: none;
  }
  .react-tel-input .flag-dropdown {
    /* border: 1px solid transparent;
    background-color: transparent; */
  }
  .react-tel-input .flag-dropdown.open .selected-flag,
  .react-tel-input .selected-flag {
    border-radius: 44px 0 0 44px;
  }
  .ant-input-outlined.ant-input-status-error:not(.ant-input-disabled):hover,
  .ant-input-outlined {
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#202127 !important' : '#fff !important'};
    border: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
    border-radius: 6px;
    height: 40px;
    padding: 8px;
    width: 100%;
    outline: none;
    &:hover {
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #818498'
          : '1px solid #878D9B'};
    }
  }

  .warning {
    color: red;
    font-size: 12px;
    line-height: 1.5;
    margin: 0 auto;
    width: min(400px, 90%);
  }
  .signIn-actions {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    border: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #40424e' : '1px solid #D5D7DC'};
    gap: 16px;
    border-radius: 6px;
    height: 40px;
    align-items: center;
    margin-bottom: 24px;
    &:hover {
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #818498'
          : '1px solid #878D9B'};
    }
    .action-btn {
      width: 100%;
      display: flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      /* padding: 10px 22px; */
      cursor: pointer;
      transition: 0.04s linear;
      img {
        height: 20px;
        width: 20px;
      }
      &:hover {
        filter: brightness(1.2);
      }
      p {
        font-size: 14px;
        font-weight: 500;
        color: ${(props) =>
          props.screen_mode === 'dark' ? 'white' : '#2E3138'};
      }
    }
  }
  .signIn-divider {
    display: flex;
    justify-content: center;
    position: relative;

    .text {
      color: #42a732;
      padding: 0 30px;
    }
    &:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 130px;
      height: 1px;
      border-bottom: 1px solid green;
    }
    &:before {
      position: absolute;
      content: '';
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 130px;
      height: 1px;
      border-bottom: 1px solid green;
    }
  }
  .signIn-form {
    .ant-input-affix-wrapper .anticon.ant-input-password-icon {
      color: #818498;
    }
    .ant-form-item {
      .ant-form-item-label > label {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};

        font-size: 14px;
        line-height: 20px;
        /* margin-left: 12px; */
      }
      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #42a732;
        border: none;
      }
    }
    .forgot-password-btn {
      color: white;
    }
    .submit-btn {
      margin-top: 20px;
      padding: 8px 20px;
      height: 40px;
      background-color: #004aea;
      box-shadow: none;
      width: 100%;
      border-radius: 6px;
      color: #fff;
      &:hover {
        background-color: #004aea;

        filter: brightness(1.2);
      }
    }
    .button-send-phone {
      top: 286px;
      right: 37px;
      position: absolute;
      height: 28px;
      padding: 0px 12px;
      font-weight: 500;
      border: none;
      border-radius: 6px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#575a6a' : '#FFFFFF'};
      font-weight: 500;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#ffffff0d' : '#CCDDFF'};
      cursor: pointer;
      font-size: 13px;
      &:hover {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#ffffff0d' : '#CCDDFF'};
        color: rgba(255, 255, 255, 0.8);
        /* filter: brightness(1.2); */
      }
    }
    .active {
      top: 286px;
      right: 37px;
      position: absolute;
      height: 28px;
      padding: 0px 12px;
      font-weight: 500;
      border: none;
      border-radius: 6px;

      font-weight: 500;

      cursor: pointer;
      font-size: 13px;
      &:hover {
        color: rgba(255, 255, 255, 0.8);
        filter: brightness(1.2);
      }
      background-color: #22304f !important;
      color: #99baff !important;
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
    .error-message {
      font-size: 13px;
      color: red;
    }
    .button-send-code {
      top: 6px;
      right: 6px;
      position: absolute;
      height: 28px;
      padding: 0px 12px;
      font-weight: 500;
      border: none;
      border-radius: 6px;
      color: #575a6a;
      font-weight: 500;
      background-color: #ffffff0d;
      cursor: pointer;
      font-size: 13px;
      &:hover {
        background-color: #ffffff0d;
        color: rgba(255, 255, 255, 0.8);
        filter: brightness(1.2);
      }
    }
  }
`;

export const StyledSignInSuccessModal = styled.div<any>`
  padding: 28px;
  border-radius: 40px;
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? 'rgba(31, 35, 44, 0.8)' : '#FFFFFF'};
  backdrop-filter: blur(8px);
  .icon {
    background-color: #42a732;
    margin: 0 auto;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .message {
    text-align: center;
    font-size: 24px;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};

    margin: 20px 0;
  }
  .desc {
    font-size: 16px;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};

    span {
      color: #42a732;
    }
  }
  .submit-btn {
    background-color: #42a732;
    border: none;
    margin-top: 24px;
    color: white;
    font-size: 16px;
    width: 100%;
    height: fit-content;
    padding: 20px;
    border-radius: 40px;
    &:hover {
      color: white !important;
      filter: brightness(1.2);
    }
  }
  :where(.css-dev-only-do-not-override-1k979oh).ant-btn-default:not(
      :disabled
    ):not(.ant-btn-disabled):hover {
    color: #4096ff;
    border-color: #4096ff;
    background: #42a732 !important;
  }
`;
