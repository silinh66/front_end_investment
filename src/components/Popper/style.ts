import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledPopperFriend = styled.div<Props>`
  .popper-friend {
    position: absolute;
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 12px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 8px;
    background: #1f232c;
    backdrop-filter: blur(7px);
    > .friend {
      display: flex;
      flex-direction: column;
      /* justify-content: center;
align-items: flex-end; */
      gap: 16px;
      flex: 1 0 0;
      align-self: stretch;
    }
    .input-transactions {
      position: relative;
      width: 655px;
      height: 36px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(42, 46, 57, 1)' : '#F0F3FA'};
      border-radius: 8px;
      margin: 8px 0;
    }
    .icon-search {
      position: absolute;
      top: 8px;
      left: 8px;
    }
    .search {
      background-color: transparent;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 8px;
      padding-left: 36px;
      outline: none;
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#fff' : 'rgba(8, 8, 8, 0.5)'};
    }
    .save-target {
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      background: #42a732;
      cursor: pointer;
      border: none;
      /* width: 136px; */
    }
    .list-friend {
      display: flex;
      justify-content: center;
      align-items: center;
      /* flex: 1 0 0; */
      align-self: stretch;
      flex-direction: column;
    }
    .item-friend {
      display: flex;
      padding: 4px 8px;
      align-items: center;
      gap: 16px;
      align-self: stretch;
      width: 655px;
      height: 42px;
      border-radius: 8px;
    }
    .avt {
      width: 34px;
      height: 34px;
      border-radius: 10000px;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      width: 565px;
    }
    .name {
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#fff' : 'rgba(8, 8, 8, 1)'};
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .on {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .status {
      color: ${(props) =>
        props.screen_mode === 'light' ? 'rgba(8, 8, 8, 0.50)' : '#fff'};
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px; /* 116.667% */
    }
    .check-info {
      display: flex;
      padding: 4px;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      background: #42a732;
    }
    .remove-check {
      display: flex;
      padding: 4px;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #3A3F42'
          : '1px solid rgba(207, 208, 212, 0.50)'};
      background: ${(props) =>
        props.screen_mode === 'dark' ? '#1F232C' : '#FDFDFD'};
    }
  }
  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    color: #fff;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
