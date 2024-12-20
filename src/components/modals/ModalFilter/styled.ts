import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledModalFilter = styled.div<Props>`
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
  .frameParent849 {
    width: 610px; /* Chiều rộng cố định của modal */
    background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(32, 33, 39, 1)'
        : 'rgba(255, 255, 255, 1)'}; /* Màu nền của nội dung modal */
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
          : '1px solid rgba(213, 215, 220, 1)'};
      margin-bottom: 24px;
      .title-modal {
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? ' #fff' : 'rgba(46, 49, 56, 1)'};
      }
      .close:hover svg path {
        cursor: pointer;
        fill: ${(props) => (props.screen_mode === 'dark' ? '#fff' : ' #333')};
      }
    }
    .frameParent850 {
      align-self: stretch;
      border-radius: 6px;

      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(74, 76, 90, 1)'
          : '1px solid rgba(213, 215, 220, 1)'};

      display: flex;
      flex-direction: row;
      padding: 8px 12px;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? ' #fff' : 'rgba(46, 49, 56, 1)'};
      &:hover {
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid #878D9B'
            : '1px solid #818498'};
      }
      .option {
        color: ${(props) =>
          props.screen_mode === 'dark' ? ' #fff' : 'rgba(46, 49, 56, 1)'};
      }
      .item-drop:hover {
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? '#99BAFF !important'
            : '#004AEA !important'};
      }
      .wrapper8 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        height: 20px;

        input::placeholder {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(129, 132, 152, 1)'
              : 'rgba(135, 141, 155, 1)'};
          line-height: 20px;
          font-size: 400;
          font-size: 14px;
        }
        /* .searchInput {
          position: relative;
          font-weight: 500;
        } */
      }
    }
    .noti {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(171, 173, 186, 1)'
          : 'rgba(116, 123, 139, 1)'};
      padding: 12px 0;
      margin-top: 8px;
    }
  }
`;
