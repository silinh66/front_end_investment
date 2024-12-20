import styled from 'styled-components';
export const StyledFeaturedPost = styled.div<{
  screen_mode: string;
  id: number;
}>`
  /*Style forum card hover  */
  .ant-card-body {
    margin-top: 16px;
    width: 359px;
    height: 312px;
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 8px;
    /* background: #2a2e39; */
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#2A2E39' : '#F0F3FA'};
    &:hover {
      border: 1px solid green;
    }
  }
  .forumCard-img {
    width: 100%;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    @media only screen and (min-width: 1600px) {
      width: 100%;
      height: 124px;
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    .header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
      .title-content {
        display: flex;
        /* flex-direction: column; */
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        .title-post {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          flex: 1 0 0;
          .title {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : 'black'};
            font-family: Roboto;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 16px; /* 114.286% */
          }
          .date {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? ' rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.50)'};
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px; /* 133.333% */
          }
        }
        .icons {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          .box-icon {
            z-index: 20;
            display: flex;
            padding: 8px;
            align-items: flex-start;
            gap: 10px;
            border-radius: 8px;
            background: ${(props) =>
              props.screen_mode === 'dark' ? '#1f232c' : '#FDFDFD'};
          }
        }
      }
      .info-user {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
              .text-name {
                display: flex;
                align-items: center;
                gap: 4px;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'black'};
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
                .icon-vip {
                  display: flex;
                  width: 12px;
                  height: 12px;
                  justify-content: center;
                  align-items: center;
                }
                .text-btn {
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
                  : 'rgba(8, 8, 8, 0.50)'};
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
          flex-direction: column;
          gap: 8px;
          .add-friend {
            display: flex;
            height: 22px;
            justify-content: center;
            /* padding: 2px 6px; */
            align-items: center;
            gap: 10px;
            border-radius: 4px;
            background: #3594ef;
            color: #fff;
            font-family: Roboto;
            font-size: 10px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px; /* 160% */
            min-width: 60.78px;
          }
          .follow {
            min-width: 60.78px;
            display: flex;
            height: 22px;
            /* padding: 2px 6px; */
            align-items: center;
            justify-content: center;
            gap: 10px;
            border-radius: 4px;
            background: #42a732;
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
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      align-self: stretch;
      .content-post {
        align-self: stretch;
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(8, 8, 8, 0.50)'};
        font-family: Roboto;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .count-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        align-self: stretch;
        .view {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          .count {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.50)'};
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
  .forumCard-title {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
  }
  .forumCard-info {
    font-size: 12px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    @media only screen and (min-width: 1600px) {
      font-size: 14px;
    }
    span {
      color: #42a732;
      font-weight: 500;
    }
  }
  .forumCard-desc {
    display: -webkit-box;
    width: 80%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 12px;
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
    @media only screen and (min-width: 1600px) {
      font-size: 14px;
    }
  }
  .forumCard-actions {
    display: flex;
    gap: 8px;
    .action {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${(props) =>
        props.id % 2 === 0
          ? props.screen_mode === 'dark'
            ? '#1F232C'
            : 'white'
          : props.screen_mode === 'dark'
            ? '#2A2E39'
            : '#F0F3FA'};
    }
  }
  .forumCard-bottom {
    margin-top: 6px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    @media only screen and (min-width: 1400px) {
      margin-top: 10px;
      flex-direction: row;
    }
    .forumCard-countInfo {
      display: flex;
      align-items: center;
      gap: 20px;
      .ant-btn {
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.50);'
            : 'rgba(8, 8, 8, 0.50);'};
      }
    }
    .forumCard-author {
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      @media only screen and (min-width: 1600px) {
        gap: 16px;
      }
      .forumCard-author__avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: block;
      }
      .forumCard-author__detail {
        display: flex;
        flex-direction: column;
        .forumCard-author__detail-name {
          font-weight: 600;
        }
        .forumCard-author__detail-createdAt {
          font-size: 12px;
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.50);'
              : 'rgba(8, 8, 8, 0.50);'};
        }
      }
    }
  }
  .forumCard-subInfo {
    font-size: 11.5px;
    color: rgba(255, 255, 255, 0.5);
    @media only screen and (min-width: 1600px) {
      font-size: 14px;
    }
  }
`;
