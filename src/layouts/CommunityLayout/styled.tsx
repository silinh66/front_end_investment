import { styled } from 'styled-components';

export const StyledCommunityLayout = styled.div<{ screen_mode: string }>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};

  padding: 0px 16px;
  /*CSS for Navs  */

  .center-layout {
    flex-grow: 1;
  }

  .navs {
    margin-bottom: 16px;
    /* BELOW: Custom css antd for child nav */
    .parent-navs {
      .ant-menu-light {
        .ant-menu-item {
          color: ${(props) =>
            props.screen_mode === 'dark' ? 'white' : 'black'};
        }
        .ant-menu-item:not(.ant-menu-item-selected):not(
            .ant-menu-submenu-selected
          ):hover {
          color: white;
        }
        &.ant-menu-horizontal {
          > .ant-menu-item-selected {
            &:hover {
              a {
                color: white !important;
              }
            }
            .ant-menu-item-icon {
              & > * {
                font-size: 14px;
              }
              svg {
                path {
                  fill: #42a732;
                }
              }
            }

            .ant-menu-horizontal .ant-menu-item {
              height: 40px;
              display: flex;
              align-items: center;
            }
          }
          > .ant-menu-item:after {
            border-bottom-color: transparent !important;
          }

          > .ant-menu-item {
            background-color: rgba(66, 167, 50, 0.2);
            margin-right: 8px;
            border-radius: 8px;
            border: 1px solid rgba(66, 167, 50, 0.2);
          }
          > .ant-menu-item:hover {
            border: 1px solid #42a732;
          }
        }
      }
      .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected {
        color: white;
        background-color: #42a732;
        border-radius: 8px;
        font-weight: 500;

        .ant-menu-item-icon {
          background-color: white !important;
          & > * {
            color: #42a732;
            font-size: 14px;
          }
        }
      }

      .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected::after {
        display: none;
      }
    }
    .menu-navs {
      z-index: 2;
      display: flex;
      width: 234px;
      padding: 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      position: absolute;
      left: 24px;
      top: 155px;
      border-radius: 8px;
      border: 1.5px solid rgba(66, 167, 50, 0.6);
      background: rgba(30, 72, 23, 0.5);
      backdrop-filter: blur(7px);
      .item-menu {
        display: flex;
        padding: 8px 12px;
        align-items: center;
        gap: 8px;
        align-self: stretch;
        border-radius: 8px;
        backdrop-filter: blur(7px);
        color: #fff;
        text-align: center;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        background-color: transparent;
      }
      .item-true {
        background-color: #42a732;
        display: flex;
        padding: 8px 12px;
        align-items: center;
        gap: 8px;
        align-self: stretch;
        border-radius: 8px;
        backdrop-filter: blur(7px);
        color: #fff;
        text-align: center;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      /* .ant-menu {
        &::before {
          display: none !important;
        }
      }
      .ant-menu-light {
        padding: 4px 12px;
        gap: 8px;
      }
      .ant-menu-light {
        .ant-menu-item:not(.ant-menu-item-selected):not(
            .ant-menu-submenu-selected
          ) {
          transition: 0.05s linear;
          &:after {
            display: none;
          }
          :hover {
            color: rgba(255, 255, 255, 0.6);

            &:after {
              display: none;
            }
          }
        }

        .ant-menu-horizontal > .ant-menu-item-selected::after {
          display: none;
        }
      }
      .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected {
      }
      .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected::after {
        display: none;
      }
      .ant-menu-light .ant-menu-item {
        padding: 0;
      }
      .ant-menu-light {
        .ant-menu-item a {
          padding: 6px 12px;
        }
        .ant-menu-item-selected {
          a {
            padding: 6px 12px;
            font-weight: 500;
          }
        }
      }

      .ant-menu-light .ant-menu-item-selected a {
        color: #42a732;
        background-color: white;
        border-radius: 8px;
        backdrop-filter: blur(7px);
      } */
    }
    /*BELOW: Custom css antd for child nav */
    .child-navs {
      margin-top: 16px;
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 16px;
      align-self: stretch;
      border-radius: 8px;
      background: rgba(30, 72, 23, 0.5);
      flex: 1 0 0;
      color: #fff;
      font-family: Roboto;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
