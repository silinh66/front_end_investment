import styled from 'styled-components';

export const StyledForum = styled.div<{
  $collapsed?: boolean;
  screen_mode: string;
}>`

  
  /* @media only screen and (min-width:1600px){
    width: ${(props) => (props.$collapsed ? '1010px' : '100%')};

  } */

  .ant-tabs-nav-list {
  }           
  .ant-tabs {
    .ant-tabs-tab{
      &:hover{
        color:white;
      }
      &.ant-tabs-tab-active{
        background-color:#42A732 !important;
      }
    }
    .ant-tabs-nav {
      margin: 0;
      &:before{
        display:none;
      }
    }
    .ant-tabs-tab {
      text-transform: uppercase;
      font-size: 20px;
      padding: 8px 12px;
      overflow:hidden;
      
      &.ant-tabs-tab-active{
        .tab-content{
          color:white;
          .icon{
            background-color: white;
            svg{
              path{
                fill:#42A732;
              }
            }
          }
        }
      }
      .tab-content {
        display: flex;
        gap: 6px;
        align-items: center;
        color:${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
        .icon{
          width:22px;
          height:22px;
          display:flex;
          justify-content:center;
          align-items:center;
          border-radius:50%;
          background-color:${(props) =>
            props.screen_mode === 'dark' ? '#42A732' : '#42A732'}
        }
      }
      &.ant-tabs-tab-active {
        background-color: #2A2E39; !important;
        border-radius: 8px;
      }
    }
  }
`;
export const StyledCreatePost = styled.div<{ screen_mode: string }>`
  .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
    background-color: #ecedf0;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    font-size: 15px;
    font-weight: bold;
  }
  .anticon {
    color: #333 !important;
  }
  .ant-input.createPost-input {
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};

    border: none;
    outline: none;
    height: 46px;
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255, 255, 255, 0.50)'
        : 'rgba(0, 0, 0, 0.50)'};
    &::placeholder {
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(255, 255, 255, 0.50)'
          : 'rgba(0, 0, 0, 0.50)'};
    }
  }
  .ant-btn.createPost-btn {
    background-color: #42a732;
    border: none;
    outline: none;
    color: white;
    width: 100px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: white;
    }
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      margin: 2px;
      border: 2px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
export const StyledSocialNetwork = styled.div<{ screen_mode: string }>`
  .list-post-scroll {
    display: grid;
    gap: 8px;
    height: 771px;
    overflow-y: scroll;
  }
  .list-post-scroll::-webkit-scrollbar {
    display: none;
  }
  .filter-post {
    display: flex;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#ECECEF'};
    padding: 0px 24px;
    height: 44px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    min-width: 610px;

    .btn-filter {
      height: 100%;
      display: flex;
      color: ${(props) => (props.screen_mode === 'dark' ? 'white' : '#2E3138')};
      justify-content: center;
      align-items: center;
      width: 50%;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      cursor: pointer;
      margin-bottom: 3px;
      &:hover {
        border-bottom: ${(props) =>
          props.screen_mode === 'dark'
            ? '3px solid #575a6a'
            : '3px solid #D0D2D8'};
      }
    }
    > .active {
      font-weight: 600;
      color: ${(props) =>
        props.screen_mode === 'dark'
          ? 'rgba(153, 186, 255, 1)'
          : ' rgba(0, 74, 234, 1)'};
      border-bottom: 3px solid rgba(0, 74, 234, 1);
    }
  }
  .anticon {
    color: #333 !important;
  }
  .skeleton {
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
    margin-bottom: 16px;
  }

  .placeholder {
    position: relative;
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
    filter: brightness(1.05);
    border-radius: 3px;
    overflow: hidden;
  }

  .placeholder:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100px;
    left: -100px;
    top: 0;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.02),
      transparent
    );
    animation: reflect 3000ms ease-out infinite;
  }

  .title {
    width: 80%;
    min-height: 20px;
    margin-bottom: 10px;
  }

  .content {
    width: 100%;
    min-height: 60px;
  }

  @keyframes reflect {
    to {
      left: calc(100% + 100px);
    }
  }
  /* .lds-hourglass {
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    margin: 40px auto;
  }
  .lds-hourglass:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 24px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  } */
`;
