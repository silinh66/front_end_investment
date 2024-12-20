import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledNews = styled.div<Props>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  padding-bottom: 24px;
  @media (max-width: 1920px) {
    .container-footer,
    .container {
      max-width: 1280px;
    }
  }
  @media (max-width: 1600px) {
    .container-footer,
    .container {
      max-width: 1140px;
      .box-header-news {
        .big-news {
          .title {
            font-size: 34px !important;
          }
        }
        .gioithieu {
          a {
            font-size: 18px !important;
          }
        }
      }
      .mobile .item-three-header .title {
        font-size: 18px !important;
      }
      .box-type-news .tile-type {
      }
      .big-news .css-1rxr2le .e1ik1iw00 .e7j57mt0 a {
        font-size: 34px !important;
      }
      .box-type-news
        .layout-header-news
        .second-header
        .news-child
        .news-second
        .info
        .gioithieu
        a {
        font-size: 20px !important;
      }
    }
  }
  @media (min-width: 1130px) {
    .mobile {
      width: 100%;
      display: flex;
      gap: 24px;
      margin-top: 32px;
      margin-bottom: 24px;

      .item-three-header {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: calc(100% / 4);
        .title {
          font-size: 20px;
        }
        p {
          margin: 8px 0px;
          font-size: 14px;
          line-height: 20px;
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#C7C8D1' : '#565B67'};
        }
        .time {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#818498' : '#747B8B'};
          line-height: 20px;
          font-size: 13px;
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
    .mobile-right {
      display: block;
    }
    .new-world {
      display: none;
    }
    .bghltop {
      display: flex;
      .box-content {
        width: 50%;
      }
      .avatar {
        width: 50%;
      }
    }
  }
  @media (max-width: 1130px) {
    .box-header-news {
      .layout-header-news {
        flex-direction: column;
        gap: 16px;
        .big-news {
          width: 100% !important;
          border-bottom: 1px solid #d9d9d9;
          border-right: none !important;
        }
        .second-header {
          flex-direction: column-reverse;
          width: 100% !important;
          .news-child {
            padding: 16px 0px !important;
            width: 100% !important;
            border-bottom: 1px solid #d9d9d9;
            border-right: none !important;
            .news-second,
            .news-first {
              .info {
                .type {
                  color: #e3120b;
                  font-size: 1rem !important;
                }
                .gioithieu {
                  a {
                    font-size: 36px !important;
                  }
                }
                .des {
                  margin-top: 0.5rem;
                  font-size: 1rem !important;
                }
              }
            }
          }
          .hot-news {
            margin-top: 16px;
            width: 100% !important;
            margin-left: 0 !important;
            border-bottom: 1px solid #d9d9d9;
            padding-bottom: 16px;
          }
        }
      }
    }
    .box-type-news {
      .tile-type {
      }
      .layout-header-news {
        flex-direction: column;
        gap: 16px;
        .big-news {
          width: 100% !important;
          border-bottom: 1px solid #d9d9d9;
          border-right: none !important;
        }
        .second-header {
          flex-direction: column-reverse;
          width: 100% !important;
          .news-child {
            padding: 16px 0px !important;
            width: 100% !important;
            border-bottom: 1px solid #d9d9d9;
            border-right: none !important;
            .news-first {
              flex-direction: column-reverse;
              img {
                width: 100% !important;
                margin-bottom: 16px;
              }
            }
            .news-second {
              flex-direction: column-reverse;
              img {
                width: 100% !important;
                margin-bottom: 16px;
              }
            }
          }
          .hot-news {
            margin-top: 16px;
            width: 100% !important;
            margin-left: 0 !important;
            border-bottom: 1px solid #d9d9d9;
            padding-bottom: 16px;
          }
        }
      }
    }
    .mobile {
      display: grid;
      width: 100%;
      .item-three-header {
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-start;
        /* flex-wrap: wrap; */
        padding: 25px 10px 25px 0;

        gap: 16px;
        margin-top: 20px;
        .avt {
          width: 30%;
        }
        .title {
          font-size: 1.5rem;
          width: calc(100% - 32%);
        }
        .des-mobile {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#C7C8D1' : '#565B67'};
          font-size: 14px;
        }
      }

      .item-three-header:last-child {
        border-bottom: 1px dotted #ccc;
      }
    }
    .section-teasers-layout {
      flex-direction: column;
    }
    .box-break {
      flex-direction: column;
      .featured-read,
      .break-stories {
        width: 100% !important;
      }
      .break-stories {
        .break-stories-child {
          .info {
            width: 100% !important;
          }
          img {
            display: none;
          }
        }
      }
    }
  }

  .wrapper-footer {
    border-top: 1px solid #30323b;
    margin-top: 40px;
    .container-footer {
      margin: 0px auto;
    }
  }
  .stock-box {
    display: flex;
    gap: 8px;
    .item-stock {
      display: grid;
      gap: 12px;
      padding: 20px 16px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      border-radius: 6px;
      min-width: 156px;
      .symbol {
        font-size: 14px;
        line-height: 20px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#c7c8d1' : '#2E3138'};
      }
      .numbers {
        font-size: 16px;
        line-height: 20px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        .number2 {
          font-size: 13px;
        }
      }
    }
    .chart {
      position: relative;
    }
    .chart,
    .hot-stock {
      height: 116px;
      min-width: 226px;
      padding: 20px 16px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
      border-radius: 6px;
      display: grid;
      gap: 8px;
      .children {
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
  .box-header-news {
    .layout-header-news {
      width: 100%;
      display: flex;
      gap: 24px;
      .big-news {
        width: 50%;
        .css-1rxr2le {
          display: grid;
          gap: 16px;
          .e1ik1iw00 {
            .e8l300f0 {
              border-radius: 100px;

              padding: 2px 12px;
              color: #fff;
              font-size: 14px;
              line-height: 20px;
            }
            .e7j57mt0 {
              margin: 8px 0;

              a {
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#000'};
                line-height: 42.19px;
                font-weight: 600;
                font-size: 36px;
              }
            }
            .e7x1xmz0 {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#C7C8D1' : '#565B67'};
              /* margin-top: 0.5rem; */
              line-height: 24px;
              font-size: 16px;
            }
            .time {
              font-size: 13px;
              line-height: 20px;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#818498 ' : '#747B8B'};
            }
          }
        }
      }
      .second-header {
        display: flex;
        width: 50%;
        gap: 24px;
        .news-child {
          width: 50%;
          .news-first {
            padding-bottom: 16px;
            border-bottom: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid #30323b'
                : '1px solid #D5D7DC'};
          }
          .news-second {
            padding-top: 16px;
          }
          .news-second,
          .news-first {
            display: grid;
            gap: 16px;
            .info {
              .type {
                color: #fff;
                padding: 2px 12px;
                font-size: 14px;
                line-height: 20px;
                border-radius: 100px;
              }
              .gioithieu {
                margin-top: 16px;
                a {
                  line-height: 20px;
                  color: #fff;
                  font-size: 20px;
                }
              }
              .des {
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#C7C8D1' : '#565B67'};
                margin: 8px 0px;
                font-size: 14px;
                line-height: 20px;
              }
              .time {
                font-size: 13px;
                line-height: 20px;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#818498 ' : '#747B8B'};
              }
            }
          }
        }
        .hot-news {
          width: 50%;
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
    }
  }
  .box-type-news {
    padding-top: 24px;
    border-top: ${(props) =>
      props.screen_mode === 'dark' ? '1px solid #30323B' : '1px solid #D5D7DC'};
    .header-more {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
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
          props.screen_mode === 'dark' ? '#99BAFF' : '#004AEA'};
        &:hover {
          color: #7fa7fb;
        }
        &:hover svg path {
          fill: #7fa7fb;
        }
      }
    }
    .layout-header-news {
      width: 100%;
      display: flex;
      gap: 24px;
      .big-news {
        width: 628px;

        .css-1rxr2le {
          display: grid;
          gap: 16px;
          .e1ik1iw00 {
            .e8l300f0 {
              color: #e3120b;
              font-size: 0.8rem;
            }
            .e7j57mt0 {
              a {
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#000'};
                font-weight: 600;

                font-size: 36px;
              }
            }
            .e7x1xmz0 {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#C7C8D1' : '#565B67'};

              margin: 8px 0px;
              font-size: 16px;
              line-height: 24px;
            }
            .time {
              font-size: 13px;
              line-height: 20px;
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#818498 ' : '#747B8B'};
            }
          }
        }
      }
      .second-header {
        display: flex;
        width: calc(100% - 628px);
        .news-child {
          width: 100%;
          display: grid;
          gap: 32px;
          .news-first {
            padding-bottom: 16px;
            border-bottom: 1px solid #d9d9d9;
            img {
              width: 193px;
              height: 128px;
            }
          }
          .news-second {
            gap: 16px;
            img {
              width: 193px;
              height: 128px;
              border-radius: 6px;
            }
          }

          .news-second,
          .news-first {
            display: flex;

            .info {
              width: 70%;
              .type {
                color: #e3120b;
                font-size: 0.8rem;
              }
              .gioithieu {
                a {
                  color: ${(props) =>
                    props.screen_mode === 'dark' ? '#fff' : '#000'};
                  font-weight: 600;

                  font-size: 20px;
                  line-height: 28px;
                }
              }
              .des {
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#C7C8D1' : '#000'};

                margin: 8px 0px;
                font-size: 14px;
              }
              .time {
                font-size: 13px;
                line-height: 20px;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#818498' : '#000'};
              }
            }
          }
        }
      }
    }
  }
  .box-break {
    display: flex;
    gap: 24px;
    .break-stories {
      width: 50%;
      padding-top: 16px;
      border-top: 1px solid #000;
      .title-break-stories {
        color: #000;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 24px;
      }
      .break-stories-child {
        border-bottom: 1px solid #d9d9d9;
        display: flex;
        padding: 8px 0;
        .info {
          width: 70%;
          display: flex;
          align-items: center;
          .index {
            font-size: 1.6rem;
            color: #e3120b;
          }
          .title-break-child {
            font-size: 1.4rem;
          }
        }
        img {
          width: 30%;
        }
      }
      .break-stories-child:last-child {
        border-bottom: none;
      }
    }
    .featured-read {
      padding-top: 16px;
      border-top: 1px solid #000;
      width: 50%;
      .title-featured-read {
        color: #000;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 24px;
      }
      .box-news {
        width: 100%;
        padding: 0 16px 16px 0px;
        .css-1rxr2le {
          .e1ik1iw00 {
            .e8l300f0 {
              color: #e3120b;
              font-size: 0.8rem;
            }
            .e7j57mt0 {
              a {
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : '#000'};
                font-weight: 600;

                font-size: 36px;
              }
            }
            .e7x1xmz0 {
              color: ${(props) =>
                props.screen_mode === 'dark' ? '#818498 ' : '#747B8B'};

              margin-top: 0.5rem;
              font-size: 0.85rem;
            }
          }
        }
      }
    }
  }
  .section-teasers-layout {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    gap: 24px;
    .section-teasers {
      padding-top: 16px;
      border-top: 1px solid #000;
      .title-section-teasers {
        color: #000;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 24px;
      }
      .hot-section {
        padding: 10px 0;
        border-bottom: 1px solid #d9d9d9;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        .title-hot-section {
          font-size: 1.3rem;
        }
      }
      .section-child {
        padding: 10px 0;
        font-size: 1.1rem;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .section-child:last-child {
        border-top: 1px solid #d9d9d9;
      }
    }
  }
  .c-topevent {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    position: relative;
    z-index: 1;
    padding: 5px 0;
    width: 100%;
    label {
      font-size: 14px;
    }
    .c-topevent__content {
      margin-left: 30px;
      margin-top: 10px;
      width: 100%;
      .c-topevent__scroll {
        display: flex;
        padding-bottom: 10px !important;
        overflow-x: scroll;
        width: 100%;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        transition: all 0.2s ease;
        display: inline-block;
        white-space: nowrap;
        color: #757575;
        padding: 2px 10px;
        background-color: #d5d5d5;
        border-radius: 12px;
      }
      a:hover {
        font-size: 14px;
        margin-right: 15px;
        transition: all 0.2s ease;
        display: inline-block;
        white-space: nowrap;
        color: black;
        padding: 2px 10px;
        background-color: #ee7224;
        border-radius: 12px;
      }
    }
  }
  .bg-gray-light {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#343434' : '#f7f7f7'};
    .c-box__title {
      padding-top: 8px;
      padding-right: 10px;
      margin: -1px -1px 0 -1px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#b4b4b4' : '#ededed'};
      .c-box__title__name {
        display: inline-block;
        vertical-align: top;
        font-size: 18px;
        line-height: 1.3;
        font-weight: 700;
        text-transform: uppercase;
        padding-left: 18px;
        position: relative;
        z-index: 1;
      }
      .c-box__title__name::before {
        content: '';
        width: 8px;
        background-color: #ee7224;
        top: 0;
        left: 0;
        bottom: 0;
        position: absolute;
        z-index: 2;
      }
    }
    .c-box__content {
      padding: 10px 15px 12px;
      .c-news-topread {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        .c-news-topread__left {
          width: 50%;
          position: relative;
          z-index: 1;
          border-right: ${(props) =>
            props.screen_mode === 'dark'
              ? '1px solid #7a7a7a'
              : '1px solid #e3e3e3'};

          ul {
            list-style: none;
            li {
              border-bottom-color: #e5e5e5;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              padding-bottom: 10px;
              margin-bottom: 10px;
              border-bottom: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid #7a7a7a'
                  : '1px solid #e3e3e3'};
              padding-right: 10px;
              .c-news-topread__number {
                width: 30px;
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'black'};
              }
              .c-news-topread__title {
                margin: 0;
                line-height: 1.4;
                font-size: 18px;
                font-weight: 700;
                width: calc(100% - 30px);
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'black'};
              }
            }
          }
        }
        .c-news-topread__right {
          width: 50%;
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
              border-bottom-color: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid #7a7a7a'
                  : '1px solid #e3e3e3'};
              padding-left: 10px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              padding-bottom: 10px;
              margin-bottom: 10px;
              border-bottom: ${(props) =>
                props.screen_mode === 'dark'
                  ? '1px solid #7a7a7a'
                  : '1px solid #e3e3e3'};
              .c-news-topread__number {
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'black'};
                width: 30px;
              }
              .c-news-topread__title {
                margin: 0;
                line-height: 1.4;
                font-size: 18px;
                font-weight: 700;
                width: calc(100% - 30px);
                color: ${(props) =>
                  props.screen_mode === 'dark' ? '#fff' : 'black'};
              }
            }
          }
        }
      }
    }
  }
  .bghltop {
    border-radius: 3px;
    background: #ecf8ff;

    .box-content {
      flex: 1;
      padding: 24px;
      .box-category-sapo {
        font-size: 16px;
        font-family: Arial;
        color: #5f5f5f;
        display: block;
        margin-top: 10px;
        line-height: 21px;
        font-weight: 400;
      }
    }
    .avatar {
      display: block;
      position: relative;
      height: max-content;
    }
  }

  .tlitem:first-child {
    border-top: none;
  }
  .tlitem {
    display: flex;
    width: 100%;
    padding: 25px 10px 25px 0;
    border-top: 1px dotted #ccc;
    box-sizing: border-box;
    .avatar {
      width: 30%;
      margin-right: 20px;
      border-radius: 3px;
      overflow: hidden;
      display: block;
      position: relative;
      height: max-content;
    }
    .knswli-right {
      width: calc(100% - 32%);
      h3 {
        a {
          color: #171717;
          font-size: 23px;
          /* font-family: Roboto-Bold; */
          font-weight: 700;
          line-height: 28px;
        }
      }
      .time_cate {
        display: flex;
        margin-top: 10px;
        gap: 8px;
        a {
          font-size: 15px;
          color: #404f5d;
        }
        .time-ago {
          color: #929292;
        }
      }
      .sapo {
        font-family: Arial;
        font-size: 16px;
        color: #5f5f5f;
        display: block;
        margin-top: 14px;
        line-height: 20px;
      }
    }
  }
  .l-sidebar {
    width: 300px;
    .c-box {
      margin-bottom: 20px;
      border: 1px solid #b4b4b4;
      border-radius: 3px;
      .c-box__title {
        padding-top: 8px;
        padding-right: 10px;
        background-color: #b4b4b4;
        margin: -1px -1px 0 -1px;
        padding-bottom: 8px;
        .c-box__title__name {
          display: inline-block;
          vertical-align: top;
          font-size: 18px;
          line-height: 1.3;
          font-weight: 700;
          text-transform: uppercase;
          padding-left: 18px;
          position: relative;
          z-index: 1;
        }
      }
      .c-box__content {
        padding: 10px 15px;
        display: grid;
        justify-content: center;
        .c-news-topread {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .hot {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #f4f4f4;
            .c-news-topread__number {
              width: 30px;
            }
            .c-news-topread__title {
              font-size: 14px;
              margin: 0;
              line-height: 1.4;

              font-weight: 700;
              width: calc(100% - 30px);
            }
          }
        }
      }
    }
  }
  .bottom-tab:hover {
    background-color: rgb(25, 127, 191, 0.18);
    border: 1px solid #197fbf;
    cursor: pointer;
  }
  .bottom-tab {
    background-color: rgb(25, 127, 191, 0.18);
    border: 1px solid rgb(25, 127, 191, 0.18);
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
    background-color: #197fbf;
    border: 1px solid #197fbf;
    min-width: 100px;
    text-align: center;
  }
  .top-tab-active:hover {
    background-color: #197fbf;
    border: 1px solid #197fbf;
    cursor: pointer;
  }
`;
