import styled from 'styled-components';

export const StyledSearch = styled.div<{ screen_mode: string }>`
  width: 1128px;
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#1F232C' : 'white'};
  padding: 16px;
  .ant-form-item-label {
    .custom-label {
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    }
  }
  .ant-tabs {
    &.ant-tabs-left {
      .ant-tabs-content-holder {
        width: 100%;
        border: none !important;
      }
    }
    .ant-tabs-tabpane {
      padding-left: 0 !important;
    }
    .ant-tabs-nav {
      .ant-tabs-nav-list {
        .ant-tabs-tab {
          width: 240px;
          margin-top: 0;
          padding-left: 10px;
          padding-right: 10px;
          .label-tab {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.50)'};
            .dot {
              display: inline-block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(8, 8, 8, 0.50)'};
            }
          }
          &.ant-tabs-tab-active {
            background-color: #42a732;
            // background-color: #2a2e39;
            border-radius: 8px;
            .label-tab {
              color: rgba(255, 255, 255, 1);
              .dot {
                background-color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
    }
    .ant-form {
      .ant-input {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(8, 8, 8, 0.50)'};
        border: none;
        outline: none;
        &::placeholder {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(8, 8, 8, 0.50)'};
        }
      }
      .ant-checkbox-group {
        .ant-checkbox-wrapper {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(8, 8, 8, 0.50)'};
        }
      }
      .ant-picker {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
        border: none;
        outline: none;
        .ant-picker-input {
          > input {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.50)'};
            &::placeholder {
              color: ${(props) =>
                props.screen_mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(8, 8, 8, 0.50)'};
            }
          }
          .ant-picker-suffix {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.50)'};
          }
        }
      }
    }
  }
`;
