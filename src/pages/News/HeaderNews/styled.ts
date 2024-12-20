import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledHeaderNews = styled.div<Props>`
  .box-tab-nav {
    width: 100%;
    height: 44px;

    margin-top: 9px;
    z-index: 9999;
    border-top: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC'};
    border-bottom: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC'};
    will-change: transform;
    transform: translateZ(0);
    ul {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .tab-item {
        display: grid;
        place-content: center;
        height: 100%;
        cursor: pointer;
        padding: 0 16px;
        &:hover {
          border-bottom: 3px solid #575a6a;
        }
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fefefe' : '#2E3138'};
        font-size: 14px;
        list-style-type: none;
      }
      .active {
        font-size: 14px;
        display: grid;
        place-content: center;
        height: 100%;
        cursor: pointer;
        padding: 0 16px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#99baff' : '#004AEA'};
        border-bottom: 3px solid #004aea;
      }
    }
  }
`;
