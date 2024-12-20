import { styled } from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledMap = styled.div<Props>`
  @media (max-width: 1600px) {
    .box {
      height: 652px;
    }
  }
  .box {
    background: ${(props) =>
      props.screen_mode === 'light' ? '#ECECEF' : '#202127'};
    padding: 0px 24px;
    color: ${(props) => (props.screen_mode === 'light' ? '#2E3138' : '#fff')};
    border-radius: 6px;

    .header-chart {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(64, 66, 78, 1)'
          : '1px solid #D5D7DC'};
      position: relative;
      .title-chart {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
      }
      .drop-btn-since {
        height: 500px;
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        z-index: 20;
        top: 47px;

        .dropdown-menu {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border-radius: 6px;
          border: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid rgba(64, 66, 78, 1)'
              : '1px solid #D5D7DC'};
          z-index: 10;
          top: 10px;
          left: 80px;
          padding: 6px 33px;

          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    width: 100%;
    .box-btn-since {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(64, 66, 78, 1)'
          : '1px solid #D5D7DC'};
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? 'transparent' : '#fff'};
      z-index: 10;
      top: 10px;
      left: 80px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 400;
    }
    .btn-chart {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 23px;
      right: 27px;
    }
  }
`;
