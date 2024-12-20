import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledNews = styled.div<Props>`
  @media (max-width: 1130px) {
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
  }
  .box-type-news {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 1px solid #000;
    .tile-type {
      color: #000;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 24px;
      cursor: pointer;
    }
    .layout-header-news {
      width: 100%;
      display: flex;
      .big-news {
        width: 40%;
        padding: 0 16px 16px 0px;
        border-right: 1px solid #d9d9d9;
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
                line-height: 42.19x;
              }
            }
            .e7x1xmz0 {
              margin: 8px 0px;
              line-height: 24px;
              color: #c7c8d1;
              font-size: 16px;
            }
          }
        }
      }
      .second-header {
        display: flex;
        width: 60%;
        .news-child {
          width: 100%;
          padding: 0 0 16px 16px;

          .news-first {
            padding-bottom: 16px;
            border-bottom: 1px solid #d9d9d9;
            img {
              width: 30%;
              height: 33.33%;
            }
          }
          .news-second {
            img {
              width: 30%;
              height: 33.33%;
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
                  font-size: 1.35rem;
                }
              }
              .des {
                margin-top: 0.5rem;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
`;
