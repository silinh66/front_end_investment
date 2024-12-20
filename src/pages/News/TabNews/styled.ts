import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledTabNews = styled.div<Props>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  padding-bottom: 24px;

  .item-three-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    img {
      width: 100%;
      height: 201px;
      border-radius: 6px;
    }

    .title {
      font-size: 20px;
      line-height: 28px;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      font-weight: 600;
    }
    p {
      font-size: 14px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#c7c8d1' : '#565B67'};
      line-height: 20px;
      margin: 8px 0px;
    }
    .time {
      font-size: 13px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#818498 ' : '#747B8B'};
      line-height: 20px;
    }
  }
  .item-three-header:last-child {
    border-right: none;
    padding-right: 0;
  }
  .item-three-header:first-child {
    padding-left: 0px !important;
  }
`;
