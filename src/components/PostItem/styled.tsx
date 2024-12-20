/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyIfEmpty } from 'react-redux';
import styled from 'styled-components';
export const PostStyled = styled.div<{ id: number; screen_mode: string }>`
  margin-bottom: 8px;
  .ant-card {
    padding: 12px 24px 0px 24px;
    cursor: pointer;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#ECECEF'};

    .head-author {
      .head-author__info {
        h5 {
          color: ${(props) =>
            props.screen_mode === 'dark' ? 'white' : 'black'};
          margin: -2px 0px 0px 2px;
          letter-spacing: 0.15px;
          color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#000')};
          text-decoration: none;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          font-family: Inter;
          font-size: 16px;
          line-height: 170%;
          font-weight: 600;
        }
        span {
          color: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(0, 0, 0, 0.5)'};
        }
      }
    }

    .bottom-left {
      .bottom__count {
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.50)'
            : '#747B8B'};
      }
    }
    .bottom-right {
      .bottom__count {
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.50)'
            : '#747B8B'};
      }
    }
    .action-button {
      background: ${(props) =>
        props.id % 2 === 0
          ? props.screen_mode === 'dark'
            ? '#1F232C'
            : 'white'
          : props.screen_mode === 'dark'
            ? 'transparent'
            : 'transparent'};
      color: ${(props) =>
        props.screen_mode == 'dark' ? '' : 'rgba(8, 8, 8, 0.50)'};
      svg {
        path {
          fill: ${(props) =>
            props.screen_mode == 'dark' ? '' : 'rgba(8, 8, 8, 0.50)'};
        }
      }
    }
  }
  .ant-card-head {
    border: none;
    padding: 0;
    .ant-card-head-title {
      overflow: visible;
    }
  }
  .ant-card-body {
    padding: 0;
  }
`;
export const StyledModalPostDetail = styled.div<{
  screen_mode: string;
}>`
  .ant-card-body {
    margin-top: 20px;
    border-radius: 8px;
    background-color: ${(props) =>
      props.screen_mode == 'dark' ? '#2A2E39' : 'white'};
  }

  .modal-post-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) =>
      props.screen_mode == 'dark' ? '#2A2E39' : 'white'};
    .head-author {
      display: flex;
      gap: 0.5rem;
      padding: 16px 16px 16px 0;
      .head-author__avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .head-author__info {
        display: flex;
        flex-direction: column;
        align-items: start;
        h5 {
          font-size: 17px;
          font-weight: 600;
          color: ${(props) =>
            props.screen_mode == 'dark' ? 'white' : 'black'};
        }
        span {
          font-size: 15px;
          color: ${(props) =>
            props.screen_mode == 'dark' ? 'rgba(19, 1, 1, 0.5)' : '#65676b'};
        }
      }
    }
    .messages {
      display: flex;
      flex-direction: column;
    }
    .head-close {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: ${(props) =>
        props.screen_mode == 'dark' ? '#1F232C' : '#ECECEF'};

      cursor: pointer;
      svg {
        path {
          fill: #42a732;
        }
      }
    }
  }

  .modal-post-bottom {
    display: flex;
    justify-content: space-between;

    .bottom-left {
      .bottom__count {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#65676b' : '#65676b'};
        padding: 0;
        font-size: 16px;

        @media only screen and (min-width: 1600px) {
          font-size: 14px;
        }
      }
    }
    .bottom-right {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 12px;
      @media only screen and (min-width: 1600px) {
        gap: 24px;
      }
      .bottom__count {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#65676b' : '#65676b'};
        padding: 0;
        font-size: 16px;

        @media only screen and (min-width: 1600px) {
          font-size: 14px;
        }
      }
    }
  }
  .modal-post-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    /* margin-top: 12px;
    margin-bottom: 10px; */
    @media only screen and (min-width: 1600px) {
      gap: 40px;
    }
    .action-button {
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 30%;
      border-radius: 8px;
      font-size: 17px;
      font-weight: 500;
      font-family: Roboto;
      background: transparent;
      padding: 20px 60px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#65676b'};
      cursor: pointer;
      transition: 0.1s linear;
      &:hover {
        background-color: #f2f2f2;
      }
      &.ant-btn {
        &:hover {
          span {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(0, 0, 0, 0.5)'};
            /* color: #42a732; */
            /* &.ant-btn-icon {
              svg {
                path {
                  fill: #42a732;
                  opacity: 1;
                  fillOpacity: 1;
                }
              }
            } */
          }
        }
      }
      .icon {
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
        path {
          fill: ${(props) =>
            props.screen_mode === 'dark'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(0, 0, 0, 0.5)'};
          fillopacity: 1;
        }
      }
      &.active {
        color: #42a732;
        .icon {
          path {
            fill: #42a732;
            fillopacity: 1;
          }
        }
      }
      @media only screen and (min-width: 1600px) {
        height: 48px;
      }
    }
  }
`;
export const PostHeadStyled = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .head-author {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .title-author {
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(48, 50, 59, 1)'
          : '1px solid #D5D7DC'};
      padding-bottom: 8px;
      line-height: 20px;
    }

    .head-author__info {
      .img-header {
        position: relative;
        .head-company__avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
        }
        .head-author__avatar {
          position: absolute;
          bottom: 0px;
          right: -5px;
          width: 16px;
          height: 16px;
          border: ${(props) =>
            props.screen === 'dark'
              ? '2px solid rgba(32, 33, 39, 1)'
              : '2px solid #ECECEF'};
          border-radius: 100%;
        }
      }
      display: flex;

      gap: 12px;
      h5 {
        font-size: 14px;
        font-weight: 600;
      }
      div {
        .top-info {
          color: ${(props) =>
            props.screen_mode === 'dark' ? 'white' : '#2E3138'};
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
        }
        .bottom-info {
          display: flex;
          gap: 5px;
          align-items: center;
          .date,
          .name {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(171, 173, 186, 1)'
                : '#747B8B'};
            font-size: 10px;
            line-height: 11.72px;

            font-weight: 500;
          }
        }
      }
    }
  }
  .messages {
    display: flex;
    flex-direction: column;
  }
  .head-close {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #1f232c;
    cursor: pointer;
    &:hover {
      background-color: #42a732;
    }
  }
`;
export const PostBodyStyled = styled.div<any>`
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .body-para {
    color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
    p {
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
      font-size: 13px;
      line-height: 20px;
    }
    img {
      margin: 12px 0;
      width: 100%;
      border-radius: 6px;
    }
  }
  .body-img {
    img {
      border-radius: 16px;
      width: 100%;
    }
  }
`;
export const PostBottomStyled = styled.div<AnyIfEmpty>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .bottom-left {
    .bottom__count {
      color: rgba(255, 255, 255, 0.5);
      padding: 0 20px;
      font-size: 12px;
      @media only screen and (min-width: 1600px) {
        font-size: 14px;
      }
    }
  }
  .bottom-right {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .bottom__count {
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      @media only screen and (min-width: 1600px) {
        font-size: 13px;
      }
    }
  }
  .button-post {
    display: flex;
    /* padding-top: 12px; */
    border-top: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
    gap: 32px;
    align-items: center;

    .btn {
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#ABADBA' : '#565B67'};
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 8px 24px 0px;
      &:hover {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
      }
      &:hover svg path {
        fill: ${(props) =>
          props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
      }
    }
    .active {
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
    }
  }
`;
export const PostActionsStyled = styled.div<{
  $id: number;
  screen_mode: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
  margin-bottom: 10px;
  @media only screen and (min-width: 1600px) {
    gap: 40px;
  }
  .action-button {
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    font-family: Roboto;
    background: ${(props) =>
      props.$id % 2 === 0 ? '#1f232c' : 'rgb(42, 46, 57)'};
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: 0.1s linear;
    &.ant-btn {
      &:hover {
        span {
          color: #42a732;
          &.ant-btn-icon {
            svg {
              path {
                fill: #42a732;
                opacity: 1;
                fillopacity: 1;
              }
            }
          }
        }
      }
    }
    .icon {
      width: 18px;
      height: 18px;
    }
    &.active {
      color: #42a732;
      .icon {
        path {
          fill: #42a732;
          fillopacity: 1;
        }
      }
    }
    @media only screen and (min-width: 1600px) {
      height: 48px;
    }
  }
`;
export const CommentInputStyled = styled.div<any>`
  padding: 16px;
  border-radius: 8px;
  background-color: #1f232c;
  .ant-input {
    line-height: 28px !important;
  }
  .comment-avatar {
    display: block;
  }
  .comment-input {
    background-color: #2a2e39;
    /* height: 40px !important; */
    border: none;
    outline: none;
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .comment-button {
    background-color: #42a732;
    color: white;
    border: none;
    height: 36px;
    &:hover {
      color: white !important;
    }
  }
`;

export const StyledLikedPost = styled.div<{ screen_mode: string }>`
  background-color: #1f232c;
  border-radius: 8px;
  padding: 24px;
  h5 {
    color: white;
    font-size: 20px;
    margin-bottom: 16px;
    padding-bottom: 6px;
    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
  }
  .likedUser-list {
    list-style: none;
    > li {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      padding: 6px 12px;
      border-radius: 8px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.02);
      }
      .likedUser-info {
        display: flex;
        gap: 16px;
        align-items: center;
        &:hover {
          .likedUser-name {
            text-decoration: underline;
          }
        }
        .likedUser-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
        .likedUser-name {
          color: white;
        }
      }
      .ant-btn {
        &.unfollow-btn {
          background-color: #2a2e39;
          color: white;
          border: none;
          outline: none;
        }
        &.follow-btn {
          background-color: #42a732;
          color: white;
          border: none;
          outline: none;
        }
      }
    }
  }
`;
