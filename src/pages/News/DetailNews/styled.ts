import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
  type_of: string;
};
export const StyledNewsDetail = styled.div<Props>`
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? '#000' : '#fff'};
  .news-content {
    width: 80%;
    /* display: grid; */
    gap: 15px;
    .first-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-bottom: 24px;
      border-bottom: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #30323B'
          : '1px solid #D5D7DC'};
      .router {
        display: flex;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#747B8B' : '#818498'};
        align-items: center;
        gap: 8px;
        font-size: 13px;
        span {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        }
      }
      .title {
        margin: 0;
        font-weight: 600;
        line-height: 44px;
        font-size: 32px;
        color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#000')};
      }
      .time {
        /* margin-top: 24px; */
        display: inline;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#818498' : '#747B8B'};
        font-size: 14px;
        line-height: 20px;
      }
      .intro {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#C7C8D1' : '#747B8B'};
        font-size: 15px;
        font-weight: 400;
        text-align: justify;
        line-height: 24px;
        font-style: italic;
      }
    }
    .source {
      display: flex;
      justify-content: flex-end;
      a {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#abadba ' : '#747B8B'};
        font-size: 14px;
        line-height: 20px;
        border-radius: 8px;
      }
    }
    blockquote {
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#000')};
      /* padding-top: 10px; */
      text-align: justify;
      line-height: 24px;
      font-size: 15px;
      .detail-breadcrumb,
      .detail-info {
        display: none;
      }
      .alignRight {
        display: none;
      }
      blockquote {
        background: ${(props) =>
          props.screen_mode === 'dark' ? '#3a3939 !important' : '#eeeeee'};
      }
      figure {
        margin-block-end: ${(props) =>
          props.type_of === 'Theo Chất Lượng Cuộc Sống'
            ? '34px !important'
            : '-55px !important'};
        margin-block-start: ${(props) =>
          props.type_of === 'Theo Chất Lượng Cuộc Sống'
            ? '1em !important'
            : '1em !important'};

        img {
          border-radius: 6px;
          margin-block-end: -27px !important;
        }
      }
      .VCSortableInPreviewMode {
        margin-block-end: -29px !important;
      }
      .small-img {
        margin-block-end: 0px !important;
        img {
          margin-block-end: 10px !important;
        }
      }
      .noCaption {
        margin-block-end: 34px !important;
      }
      .expNoEdit {
        flex-direction: column;
        display: flex;

        font-size: 13px;

        img {
          width: 100%;
        }
        figcaption {
          color: #abadba;
          line-height: 20px;
          font-weight: 400;
          margin-top: 40px;
        }
        .PhotoCMS_Caption {
          margin: 30px 0;
        }
      }
      .image {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* margin-block-end: -27px !important; */
      }
      .VnBizPreviewMode {
        .PhotoCMS_Caption {
          font-style: italic;
        }
      }
      .detail-breadcrumb {
        ul {
          display: flex;
          align-items: center;
          li {
            list-style: none;
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            text-transform: uppercase;
            color: #2a2d40;
            position: relative;
            margin-left: 10px;
            padding-left: 10px;
          }
        }
      }
      .detail-content {
        .VCSortableInPreviewMode {
          display: grid;
          justify-content: center;
          align-items: center;
          .PhotoCMS_Caption {
            display: flex;
            justify-content: center;
            font-style: italic;
          }
        }
        .alignRight {
          display: none;
          justify-content: start;
          margin-left: 20px;
        }
        p {
          margin: 20px 0;
        }
      }
    }
    .box-more {
      margin-top: 24px;
      padding-top: 24px;
      border-top: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #30323B'
          : '1px solid #D5D7DC'};
      .header-more {
        display: flex;
        align-items: center;
        gap: 24px;
        .title-more {
          font-size: 16px;
          line-height: 28px;
          font-weight: 600;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        }
        .more {
          cursor: pointer;
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 14px;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#99baff' : '#004AEA'};
          &:hover {
            color: #7fa7fb;
          }
          &:hover svg path {
            fill: #7fa7fb;
          }
        }
      }
      .item-three-header {
        display: flex;
        flex-direction: column;

        padding: 20px 0;
        width: calc(100% / 3);

        .title {
          font-size: 18px;
          line-height: 28px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
          font-weight: 600;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#c7c8d1' : '#565B67'};
          margin: 8px 0;
        }
        .time {
          font-size: 13px;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#818498' : '#747B8B'};
        }
      }
    }
    .item-three-header:last-child {
      border-right: none;
      padding-right: 0;
    }
    .item-three-header:first-child {
      padding-left: 0px !important;
    }
  }
  .bottom-tab-active {
    background-color: #197fbf;
    border: 1px solid #197fbf;
  }
  .bottom-tab-active:hover {
    background-color: #197fbf;
    border: 1px solid #197fbf;
    cursor: pointer;
  }

  .top-tab-active {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
    padding: 8px 0px;
    line-height: 28px;
    border-bottom: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #30323b' : '1px solid #D5D7DC'};
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    margin-right: 30px;
  }
  .mobile-right {
    width: 302px;
    .hot-news {
      width: 302px;
      padding: 4px 24px 24px 24px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      border-radius: 6px;
      .content {
        .ds-section-headline {
          font-size: 16px;
          font-weight: 600;
          line-height: 28px;
          border-bottom: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid #30323b'
              : '1px solid #D5D7DC'};
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
          padding: 8px 0px;
        }
        .e14rcxam0 {
          margin-top: 16px;
          font-size: 13px;
          line-height: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          a {
            display: flex;
            gap: 8px;
            justify-content: space-between;
            color: #fff;
            font-size: 13px;
            line-height: 20px;
            &:hover {
              color: #99baff;
            }
          }
        }
      }
    }
  }
`;
