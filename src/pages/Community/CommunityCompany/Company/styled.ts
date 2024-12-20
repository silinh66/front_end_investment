import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledCompanyDetail = styled.div<Props>`
  /* width: ${(props) => (props.$collapsed ? '580px' : '1128px')}; */\
flex-grow: 1;
  .wrapper {
    height: 100vh;
    overflow: scroll;
    border-radius: 6px;
  }
  .wrapper::-webkit-scrollbar {
    background: transparent !important;
  }
  .title-post-company {
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: 0.15px;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    position: sticky;
    top: 0px;
    z-index: 2;

    font-family: Inter;
    font-size: 14px;
    border-radius: 0px;
    padding: 8px;
    min-width: 10%;
  }
  .info-company {
    border-radius: 16px;
    margin-bottom: 20px;
    border-radius: 6px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 24px;
    .banner-company {
      /* border: 1px solid #cacaca; */
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};

      border-radius: 6px;
      width: 72px;
      height: 72px;
      object-fit: cover;
    }
    .title {
      padding-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 600;
      color: ${(props) =>
        props.screen_mode === 'dark' ? '#F1F1F1' : '#0f1015'};
    }
    .box-btn-header {
      height: 24px;
      display: flex;
      gap: 12px;
      .btn-is-join {
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? 'rgba(34, 79, 64, 1)' : '#A8F0D8'};
        color: ${(props) =>
          props.screen_mode === 'dark' ? 'rgba(153, 255, 221, 1)' : '#0F8A61'};
        border-radius: 6px;
        padding: 4px 8px;

        gap: 4px;
        font-size: 13px;
        line-height: 20px;
        font-weight: 500;
      }
      .btn-join {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #004aea;
        color: #fff;
        border-radius: 6px;
        padding: 4px 8px;
        gap: 4px;
        font-size: 13px;
        line-height: 20px;
        font-weight: 500;
        &:hover {
          background-color: #0042cc;
        }
      }
      .leave-group {
        cursor: pointer;
        padding: 4px 8px;

        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid rgba(74, 76, 90, 1)'
            : '1px solid #BFC2CA'};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        font-size: 13px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? '#fff' : '#2E3138'};
        font-weight: 500;
        line-height: 20px;
      }
    }
    
    .box-button {
      display: flex;
      margin: 16px 16px 0px 16px;
      border-top: ${(props) =>
        props.screen_mode === 'dark'
          ? ' 1px solid rgba(48, 50, 59, 1)'
          : '1px solid #D5D7DC'};
      .button-header {
        padding: 20px;
        border: none;
        cursor: pointer;
        background-color: transparent;
        font-size: 15px;
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.5)'};
        font-weight: 600;
        &:hover {
          border-bottom: ${(props) =>
            props.screen_mode === 'dark' ? '3px solid #2c3136' : '#ccc'};
        }
      }
      .active {
        padding: 20px;
        border: none;
        cursor: pointer;
        background-color: transparent;
        font-size: 15px;
        color: ${(props) =>
          props.screen_mode === 'dark'
            ? 'rgba(153, 186, 255, 1)'
            : 'rgba(0, 74, 234, 1)'};
        font-weight: 600;
        border-bottom: 3px solid rgba(0, 74, 234, 1);
      }
    }
  }
  .create-post {
    position: sticky;
    top: 0;
    z-index: 10; /* Đảm bảo nó nằm trên các phần tử khác */
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#ECECEF'};
    border-radius: 6px;
    padding: 16px; /* Thêm padding nếu cần để tạo khoảng cách */

    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;

    .btn-create {
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      background-color: rgba(0, 74, 234, 1);
      box-shadow: rgba(76, 78, 100, 0.56) 0px 6px 18px -8px;
      color: #fff;
      font-size: 14px;
      padding: 8px 20px;
      border-radius: 6px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        background-color: #0042cc;
      }
    }
    .filter-drop {
      position: relative;
      padding-left: 16px;
      padding-right: 8px;
      color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#2E3138')};
      border-radius: 6px;
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid #30323B '
          : '1px solid  #D5D7DC'};
      display: flex;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#202127' : '#fff'};
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      gap: 8px;
      cursor: pointer;
      &:hover {
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid #818498'
            : '1px solid  #878D9B'};
      }
      .option-drop {
        /* display: flex; */
        display: none;
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#202127' : '#fff'};
        z-index: 11;
        width: 100%;
        top: 100%;
        right: 0px;
        position: absolute;
        padding: 8px 0px;
        border: ${(props) =>
          props.screen_mode === 'dark'
            ? '1px solid #30323B '
            : '1px solid  #D5D7DC'};
        border-radius: 6px;
        box-shadow: 0px 4px 20px 0px #000000b2;

        justify-content: center;
        .item-option {
        }
      }
      .show {
        display: flex;
      }
    }
    .modal-create {
    }
  }
  .scroll-post {
    /* overflow-x: scroll;
    height: 393px;
    border-radius: 6px; */
  }
  .scroll-post::-webkit-scrollbar {
    display: none;
  }
`;
export const StyledCreatePost = styled.div<Props>`
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#ECECEF'};
  border-radius: 6px 6px 0 0;

  .title-create-post {
    margin: 0px 32px;
    font-size: 20px;
    font-weight: 600;
    padding: 16px 0;
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(0, 0, 0, 0.5)'};
    border-bottom: ${(props) =>
      props.screen_mode === 'dark'
        ? '1px solid rgba(48, 50, 59, 1)'
        : '1px solid #D5D7DC'};
  }

  .head-author {
    padding: 24px 32px;
    display: flex;
    gap: 10px;
    align-items: center;
    .head-author__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .name {
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(0, 0, 0, 0.5)'};
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
    }
  }
  .first {
    padding: 0 32px;
    margin-bottom: 20px;
    .no-resize-textarea {
      background-color: transparent;
      padding: 0px 16px;
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(74, 76, 90, 1) !important'
          : '1px solid #D5D7DC !important'};
      border-radius: 6px;
      height: 50px;
      font-size: 14px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#878D9B'};
    }
    .no-resize-textarea::placeholder {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#878D9B'};
      font-size: 14px;
    }
  }
  .second {
    padding: 0 32px;
    .quill {
      background-color: transparent;
      padding: 0px 16px;
      border: ${(props) =>
        props.screen_mode === 'dark'
          ? '1px solid rgba(74, 76, 90, 1) !important'
          : '1px solid #D5D7DC !important'};
      border-radius: 6px;

      font-size: 14px;
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(227, 228, 232, 1)' : '#878D9B'};
    }
    .quill::placeholder {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(227, 228, 232, 1)' : '#878D9B'};
      font-size: 14px;
    }
    .ql-snow .ql-fill {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(227, 228, 232, 1)' : '#878D9B'};
    }
    .ql-snow .ql-picker {
      color: ${(props) =>
        props.screen_mode === 'dark' ? 'rgba(227, 228, 232, 1)' : '#878D9B'};
    }
    .ql-toolbar {
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(0, 0, 0, 0.5)'};

      background: transparent;
      border: none !important;
      border-radius: 5px;
      padding: 5px;
      display: flex;
      flex-wrap: wrap;
    }
    .ql-container.ql-snow {
      border: none !important;
    }
    .ql-toolbar .ql-formats {
      margin-right: 10px;
    }

    .ql-toolbar button,
    .ql-toolbar .ql-picker {
      margin-right: 5px;
      border: none;
      background: none;
      padding: 5px;
    }

    .ql-toolbar button:hover,
    .ql-toolbar .ql-picker:hover {
      background-color: #e6e6e6;
      border-radius: 5px;
    }

    .ql-toolbar .ql-active {
      background-color: #ccc;
    }
    .ql-container {
      height: 300px;
      font-size: 20px;
    }
  }
`;
