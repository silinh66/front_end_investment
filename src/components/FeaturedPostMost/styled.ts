import styled from 'styled-components';

export const StyledFeaturedPostMost = styled.div<{
  screen_mode: string;
}>`
  .box-most {
    margin-top: 16px;
    display: flex;
    /* width: 1101px; */
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    .title {
      color: #fff;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .body-most {
      display: flex;
      padding: 16px;
      align-items: flex-start;
      gap: 16px;
      align-self: stretch;
      border-radius: 8px;
      background: ${(props) =>
        props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
      .img-most {
        flex: 1 0 0;
        align-self: stretch;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        width: 526.5px;
        height: 204px;
        object-fit: cover;
        box-shadow: 0px 2px 6px 0px rgba(43, 0, 212, 0.06);
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        flex: 1 0 0;
        .header-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          align-self: stretch;
          .header {
            display: flex;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            .title {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
              flex: 1 0 0;
              .text-title {
                align-self: stretch;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#080808'};
                font-family: Roboto;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 16px; /* 114.286% */
              }
              .text-bottom {
                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(8, 8, 8, 0.5)'};

                font-family: Roboto;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px; /* 133.333% */
              }
            }
            .icon-header {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              .icon {
                display: flex;
                padding: 8px;
                align-items: flex-start;
                gap: 10px;
                border-radius: 8px;
                background: ${(props) =>
                  props.screen_mode === 'dark' ? '#1f232c' : '#FDFDFD'};
                cursor: pointer;
              }
            }
          }
          .info-user {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
            .user {
              display: flex;
              align-items: center;
              gap: 8px;
              .avt {
                width: 42px;
                align-self: stretch;
                border-radius: 8px;
                border: 1.5px solid rgba(30, 30, 30, 0);
              }
              .info {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
                .name {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  .name-user {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: ${(props) =>
                      props.screen_mode === 'dark' ? '#fff' : '#080808'};
                    font-feature-settings:
                      'clig' off,
                      'liga' off;
                    font-family: Roboto;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 22px; /* 157.143% */
                  }
                  .btn-vip {
                    display: flex;
                    height: 22px;
                    padding: 3px 8px;
                    justify-content: center;
                    align-items: center;
                    gap: 4px;
                    border-radius: 4px;
                    background: #f37500;
                    .icon {
                      cursor: pointer;
                      display: flex;
                      width: 12px;
                      height: 12px;
                      justify-content: center;
                      align-items: center;
                    }
                    .text {
                      color: #fff;
                      font-family: Roboto;
                      font-size: 10px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: 16px; /* 160% */
                    }
                  }
                }
                .role {
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(8, 8, 8, 0.5)'};
                  font-family: Roboto;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 16px; /* 133.333% */
                }
              }
            }
            .relationship {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              .btn-add {
                display: flex;
                height: 22px;
                padding: 3px 8px;
                align-items: center;
                gap: 10px;
                border-radius: 4px;
                background: #3594ef;
                font-size: 10px;
                font-weight: 500;
                color: #fff;
              }
              .btn-fl {
                border-radius: 4px;
                background: #42a732;
                display: flex;
                height: 22px;
                padding: 3px 8px;
                align-items: center;
                gap: 10px;
                color: #fff;
                font-family: Roboto;
                font-size: 10px;
                font-style: normal;
                font-weight: 500;
                line-height: 16px; /* 160% */
              }
            }
          }
        }
        .body-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          align-self: stretch;
          .text {
            align-self: stretch;
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.5)'};
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          .list-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
            .view {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              .number {
                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(8, 8, 8, 0.5)'};
                font-feature-settings:
                  'clig' off,
                  'liga' off;
                font-family: Roboto;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 183.333% */
              }
              .text {
                color: ${(props) =>
                  props.screen_mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(8, 8, 8, 0.5)'};
                font-feature-settings:
                  'clig' off,
                  'liga' off;
                font-family: Roboto;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 183.333% */
              }
            }
          }
        }
      }
    }
  }
`;
