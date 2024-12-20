import { styled } from 'styled-components';

type Props = {
  screen_mode: string;
};

const StyledHeader = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#101114' : '#fff'};
  /* padding-bottom: 20px; */
  @media (max-width: 1920px) {
    .list-nav {
      display: none;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      position: relative;
      > .navigation-mobile {
        display: none;
        z-index: 20;
        padding: 16px 16px 16px 20px;
        box-shadow: ${(props) =>
          props.screen_mode === 'light'
            ? 'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px,rgba(17, 17, 26, 0.1) 0px 16px 48px'
            : '#2c3e50 0px 1px 0px, #2c3e50 0px 8px 24px,#2c3e50 0px 16px 48px'};
        position: absolute;
        align-items: center;
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#0F1015' : '#ECECEF'};
        border-radius: 8px;
        gap: 24px;
        top: 46px;
        > .navigation-children {
          padding-right: 60px;
          /* border-right: 1px solid rgba(207, 208, 212, 0.5); */
          display: none;
          gap: 26px;
          align-items: center;
          > a {
            font-size: 14px;
            font-weight: 500;
            font-family: 'Roboto';
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255)'
                : 'rgba(2, 2, 2)'};
          }
          > a:hover {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#42a732' : 'rgba(2, 2, 2)'};
          }
          .active {
            position: relative;
            font-size: 16px;
            font-weight: 700;
            font-family: 'Roboto';
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
            padding-bottom: 3px;
          }
          .active::before {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
            width: 26px;
            height: 7px;
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
            border-radius: 8px;
          }
        }
        > .search-bar {
          width: 330px;
        }
      }
    }
    .header-layout {
      display: flex;
      flex-direction: row;
      gap: 72px;
      align-items: center;
      .navigation {
        display: flex;
        align-items: center;
        > .navigation-children {
          padding-right: 16px;
          display: flex;
          gap: 20px;
          align-items: center;
          > a {
            display: flex;
            flex-direction: row;
            line-height: 20px;
            gap: 8px;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 15px;
            font-weight: 500;
            font-family: 'Roboto Flex';
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255)'
                : 'rgba(2, 2, 2)'};
          }
          > a:hover {
            background-color: ${(props) =>
              props.screen_mode === 'dark' ? '#202127' : '#F9FAFA'};
          }

          .active {
            position: relative;
            font-size: 15px;
            font-weight: 500;
            font-family: 'Roboto Flex';
            background-color: ${(props) =>
              props.screen_mode === 'dark' ? '#1c2740' : '#CCDDFF'};
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#99baff' : '#004AEA'};
          }
          /* .active::before {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 38%;
            width: 26px;
            height: 7px;
            background: ${(props) =>
            props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
            border-radius: 8px;
          } */
        }
      }

      > .page-logo {
        font-size: 19px;
        font-weight: 900;
        font-family: 'Roboto';
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
      }
    }
    > .auth {
      display: flex;
      gap: 50px;
      align-items: center;
      > .search-bar {
        .ant-select-single {
          height: 100%;
          width: 180px;
        }
        display: flex;
        height: 40px;
        flex-direction: row;
        gap: 16px;
        width: 100%;
        /* padding: 0 24px; */
        form {
          .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
          > .ant-select .ant-select-selection-placeholder {
            color: ${(props) =>
              props.screen_mode === 'light'
                ? '#878D9B'
                : 'rgba(129, 132, 152, 1);'};
            font-size: 14px;
            font-weight: 400;
          }
          > .ant-select-outlined:not(.ant-select-customize-input)
            .ant-select-selector {
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#202127' : '#fff;'};
            border: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid #4A4C5A'
                : '1px solid #D5D7DC;'};
            padding: 10px 12px 10px 16px;
            &:hover {
              border: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid #818498'
                  : '1px solid  #878D9B'};
            }
          }
          > .ant-select .ant-select-arrow {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
          > .ant-select:not(.ant-select-customize-input)
            .ant-select-selector
            input {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
        }
      }
    }
  }
  @media (max-width: 1600px) {
    .list-nav {
      display: none;
    }
    .header-layout {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: center;
      .page-logo {
        width: 158px;
      }
      .navigation {
        .navigation-children {
          gap: 8px;
          a {
            padding: 6px 8px;
            font-size: 14px;
            svg {
              width: 16px;
              height: 16px;
            }
          }
          .active {
            padding: 6px 8px;
            svg {
              width: 16px;
              height: 16px;
            }
            font-size: 14px;
          }
        }
      }
    }
    .auth {
      .search-bar {
        height: 36px;
        display: flex;
        gap: 16px;
        align-items: center;
        .ant-select-single {
          height: 100%;
          width: 180px;
        }
        > .ant-select-outlined:not(.ant-select-customize-input)
          .ant-select-selector {
          padding: 8px 8px 8px 12px;
        }
      }
    }
  }
  @media (max-width: 1130px) {
    .list-nav {
      display: none;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      position: relative;
      > .navigation-mobile {
        display: grid;
        z-index: 20;
        padding: 16px 16px 16px 20px;
        box-shadow: ${(props) =>
          props.screen_mode === 'light'
            ? 'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px,rgba(17, 17, 26, 0.1) 0px 16px 48px'
            : '#2c3e50 0px 1px 0px, #2c3e50 0px 8px 24px,#2c3e50 0px 16px 48px'};
        position: absolute;
        align-items: center;
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#0F1015' : '#ECECEF'};
        border-radius: 8px;
        gap: 24px;
        top: 46px;
        > .navigation-children {
          display: grid;
          padding-right: 60px;
          /* border-right: 1px solid rgba(207, 208, 212, 0.5); */
          gap: 26px;
          align-items: center;
          > a {
            font-size: 14px;
            font-weight: 500;
            font-family: 'Roboto';
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255)'
                : 'rgba(2, 2, 2)'};
          }
          > a:hover {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#42a732' : 'rgba(2, 2, 2)'};
          }
          .active {
            position: relative;
            font-size: 16px;
            font-weight: 700;
            font-family: 'Roboto';
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
            padding-bottom: 3px;
          }
          .active::before {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
            width: 26px;
            height: 7px;
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
            border-radius: 8px;
          }
        }
        > .search-bar {
          width: 330px;
          /* padding: 0 24px; */
          .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
          > .ant-select .ant-select-selection-placeholder {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
          > .ant-select-outlined:not(.ant-select-customize-input)
            .ant-select-selector {
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#1f232c' : '#D4D4D4;'};
            &:hover {
              border: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid #818498'
                  : '1px solid  #878D9B'};
            }
          }
          > .ant-select .ant-select-arrow {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
          > .ant-select:not(.ant-select-customize-input)
            .ant-select-selector
            input {
            color: ${(props) =>
              props.screen_mode === 'light' ? '#1f232c' : '#D4D4D4;'};
          }
        }
      }
    }
    .navigation {
      display: none;
      align-items: center;
      > .navigation-children {
        padding-right: 60px;
        border-right: 1px solid rgba(207, 208, 212, 0.5);
        display: flex;
        gap: 24px;
        align-items: center;
        > a {
          font-size: 14px;
          font-weight: 500;
          font-family: 'Roboto';
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255)'
              : 'rgba(2, 2, 2)'};
        }
        > a:hover {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#42a732' : 'rgba(2, 2, 2)'};
        }
        .active {
          position: relative;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Roboto';
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
          padding-bottom: 3px;
        }
        .active::before {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 38%;
          width: 26px;
          height: 7px;
          background: ${(props) =>
            props.screen_mode === 'dark' ? '#42a732' : '#2E3138'};
          border-radius: 8px;
        }
      }
      > .search-bar {
        width: 360px;
        padding: 0 24px;
        > .ant-input-affix-wrapper {
          background: ${(props) =>
            props.screen_mode === 'dark' ? '#1f232c' : '#D4D4D4;'};
          border-radius: 8px;
          height: 40px;
          width: 362px;
          > .ant-input-prefix {
            > .anticon {
              width: 16px;
              height: 16px;
              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : '#2E3138'};
            }
          }
          > .ant-input {
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#1f232c' : '#D4D4D4;'};
          }
          > .ant-input::placeholder {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(2, 2, 2, 0.50)'};
          }
        }
      }
    }
    > .auth {
      display: none;
    }
    > .page-logo {
      font-size: 24px;
      font-weight: 900;
      font-family: 'Roboto';
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
    }
  }

  > .tools-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    img {
      width: 24px;
      height: 24px;
    }
    > img:nth-of-type(3) {
      width: 36px;
      height: 36px;
    }
    > span {
      font-size: 14px;
      font-weight: 500;
      font-family: 'Roboto';
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
    }
  }
  > .screen-mode {
    > button {
      width: 54px;
      height: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      > .ant-switch-handle {
        top: 5px;
        width: 8px;
        height: 8px;
      }
      > .ant-switch-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-inline-start: 0;
        padding-inline-end: 0;
        width: 100%;
        height: 100%;
        > .ant-switch-inner-checked {
          font-size: 10px;
          font-weight: 500;
          font-family: 'Inter';
          color: #fdfdfd;
          padding-left: 20px;
        }
        > .ant-switch-inner-unchecked {
          font-size: 10px;
          font-weight: 500;
          font-family: 'Inter';
          color: #fdfdfd;
          padding-right: 20px;
        }
      }
    }
    > .ant-switch {
      background: #2e3138;
      > .ant-switch-handle {
        inset-inline-start: 16px;
      }
    }
    > .ant-switch-checked {
      background: #42a732;
      &:hover {
        background: #42a732;
      }
      > .ant-switch-handle {
        inset-inline-start: calc(100% - 15px);
      }
    }
  }
`;

export default StyledHeader;
