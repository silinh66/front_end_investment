import { styled } from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyledHome = styled.div<Props>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  .tab-home-icon {
    display: flex;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10000000px;
    /* background: #42a732; */
  }
  .bienDongNganh {
    overflow-x: scroll;
    display: flex;
    /* padding: 6px 16px 12px 24px; */
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    /* background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#1f232c' : 'rgba(253, 253, 253, 1)'}; */
    /* background:  #1f232c; */
  }
  .sectorTable {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
    border-radius: 4px;
    border: 1px solid rgba(58, 63, 66, 0);
    width: 100%;
    height: 237px;
  }
  .bienDongNganhHeader {
    font-family: roboto;
    font-weight: 500;
    font-size: 14px;

    color: ${(props) =>
      props.screen_mode === 'dark' ? 'rgb(200, 195, 188)' : '#66676B '};
  }
  .header {
    display: flex;
    align-items: flex-end;
    align-self: stretch;
    background: #2a2e39;
    width: 100%;
    height: 60px;
  }
  .body {
    display: flex;
    height: 255px;
    /* padding: 6px 16px 12px 24px; */
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
  }
  .sectionHeader1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
  }

  .sectionHeader3 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .section-header1-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    height: 100%;
  }
  .firstSectionCol {
    display: flex;
    align-items: flex-start;
    flex: 1 0 0;
  }
  .col1 {
    display: flex;
    width: 202px;
    padding: 0px 4px;
    /* align-items: center; */
    margin-top: 6px;
    align-self: stretch;
    border-top: 1px solid rgba(58, 63, 66, 0);
    border-bottom: 1px solid rgba(58, 63, 66, 0);
    color: #3594ef;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .col2 {
    display: flex;
    width: 138px;
    padding: 0px 4px;
    /* align-items: center; */
    margin-top: 6px;
    align-self: stretch;
    border-top: 1px solid rgba(58, 63, 66, 0);
    border-bottom: 1px solid rgba(58, 63, 66, 0);
    border-left: 1px solid rgba(58, 63, 66, 0);
    color: #3594ef;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .sectionHeader2 {
    display: flex;
    width: 282px;
    height: 60px;
    padding-left: 21px;
    /* justify-content: center; */
    /* align-items: center; */
    border-bottom: 1px solid rgba(58, 63, 66, 0);
    border-left: 1px solid rgba(58, 63, 66, 0);
    padding-top: 6px;
  }
  .col3 {
    color: #3594ef;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .sectionHeader3 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .sectionHeader3First {
    display: flex;
    width: 464px;
    padding: 0px 16px;
    align-items: flex-start;
  }
  .sectionHeader3Second {
    display: flex;
    width: 464px;
    padding: 0px 16px;
    justify-content: space-between;
    /* align-items: center; */
    height: 30px;
  }
  .bienDongGiaHeader {
    display: flex;
    height: 40px;
    padding-left: 4px;
    justify-content: center;
    /* align-items: center; */
    margin-top: 4px;
    flex: 1 0 0;
    border-right: 1px solid rgba(58, 63, 66, 0);
    border-left: 1px solid rgba(58, 63, 66, 0);
  }
  .bienDongGiaTitle {
    color: #3594ef;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 16px;
  }
  .nuocNgoaiHeader {
    display: flex;
    width: 168px;
    height: 40px;
    padding-left: 4px;
    justify-content: center;
    /* align-items: center; */
    flex-shrink: 0;
    margin-top: 4px;
  }
  .col4 {
    display: flex;
    width: 80px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .col5 {
    display: flex;
    width: 80px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .col6 {
    display: flex;
    width: 80px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .col7 {
    display: flex;
    width: 80px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .col8 {
    display: flex;
    width: 80px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .headerSection3Title {
    color: #3594ef;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .body {
    display: flex;
    width: 756px;
    // width: 886px;
    padding-bottom: 9px;
    /* justify-content: center; */
    align-items: center;
    border-radius: 0px 0px 4px 4px;
  }
  .title {
    display: flex;
    height: 20px;
    padding-left: 4px;
    align-items: center;
    gap: 10px;
    min-width: 162px;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
  }
  .vonHoa {
    display: flex;
    width: 138px;
    height: 20px;
    padding-left: 4px;
    align-items: center;
    gap: 10px;
    border-left: 1px solid rgba(58, 63, 66, 0);
  }
  .phanBoDongTien {
    display: flex;
    width: 122px;
    // width: 152px;
    // width: 222px;
    height: 20px;
    padding: 2px 4px;
    align-items: center;
    gap: 10px;
    border-left: 1px solid rgba(58, 63, 66, 0);
    justify-content: center;
    min-width: 142px;
  }
  .rightCol {
    display: flex;
    width: 464px;
    padding: 0px 16px;
    justify-content: space-between;
    align-items: flex-end;
  }
  .oneDay {
    display: flex;
    width: 90px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .oneWeek {
    display: flex;
    width: 86px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .oneMonth {
    display: flex;
    width: 90px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .buy {
    display: flex;
    width: 90px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .sell {
    display: flex;
    width: 80px;
    height: 20px;
    padding-left: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .row {
    display: flex;
    align-items: flex-start;
    align-self: stretch;
  }
  .titleText {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};

    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .vonHoaText {
    color: #fff;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .phanBoDongTienText {
    width: 184px;
    height: 16px;
    flex-shrink: 0;
  }
  .oneDayText {
    color: #42a732;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .oneWeekText {
    color: #42a732;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .oneMonthText {
    color: #42a732;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .buyText {
    color: #fff;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .sellText {
    color: #fff;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .tab-home-item:hover .tab-home-des {
    /* background-color: rgba(66, 167, 50, 0.18); */
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
  }

  .tab-home-item:hover .tab-home-icon {
    display: flex;
    padding: 18px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10000000px;
  }
  .tab-home-item {
    cursor: pointer;
  }
  .tab-home-des {
    color: #66676b;
  }
  /* .tab-home-des:hover {
    color: #fff;
  } */
  .left-tab:hover {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid #197fbf;
    cursor: pointer;
    border-bottom: 3px solid #575a6a;
  }
  .left-tab {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid rgb(25, 127, 191, 0.18);
  }
  .left-tab-active {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    border-bottom: 3px solid #004aea;
  }
  .left-tab-active:hover {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    cursor: pointer;
  }

  .left-san:hover {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? ' #4a4c5a' : '#D5D7DC'};
    // border: 1px solid #197fbf;
    color: ${(props) =>
      props.screen_mode === 'dark' ? ' #ABADBA' : '#2E3138'};
    cursor: pointer;
  }
  .left-san {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid rgb(25, 127, 191, 0.18);
  }
  .left-san-active {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    // border-bottom: 3px solid #004aea;
    background-color: #4a4c5a;
  }
  .left-san-active:hover {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    cursor: pointer;
  }

  .laiSuatTab:hover {
    background-color: #22304f !important;
    background-color: ${(props) =>
      props.screen_mode === 'dark'
        ? '#22304f !important'
        : '#CCDDFF !important'};
  }

  .right-tab:hover {
    background-color: transparent;
    // border: 1px solid #197fbf;
    cursor: pointer;
    border-bottom: 3px solid #575a6a;
  }
  .right-tab {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid rgb(25, 127, 191, 0.18);
    padding: 3px 16px;
    border-bottom: 3px solid transparent;
  }
  .right-tab-active {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    border-bottom: 3px solid #004aea;
    padding: 3px 16px;
  }
  .right-tab-active:hover {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    cursor: pointer;
  }
  .bottom-tab:hover {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid #197fbf;
    cursor: pointer;
    border-bottom: 3px solid #575a6a;
  }
  .bottom-tab {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid rgb(25, 127, 191, 0.18);
  }
  .bottom-tab-active {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    border-bottom: 3px solid #004aea;
  }
  .bottom-tab-active:hover {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    cursor: pointer;
  }
  .top-tab:hover {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid #197fbf;
    border-bottom: 3px solid #575a6a;
    cursor: pointer;
  }
  .top-tab {
    // background-color: rgb(25, 127, 191, 0.18);
    // border: 1px solid rgb(25, 127, 191, 0.18);
    min-width: 80px;
    text-align: center;
    white-space: nowrap;
  }
  .hide-scrollbar {
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge, and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .dropdownLaiSuat {
    border: 1px solid rgb(25, 127, 191, 0.18);
    z-index: 9999;
  }
  .dropdownLaiSuat:hover {
    border: 1px solid #197fbf;
  }
  .dropdownSoThang {
    border: 1px solid rgb(25, 127, 191, 0.18);
  }
  /* .dropdownSoThang:hover {
    border: 1px solid #197fbf;
  } */
  .top-tab-active {
    // background-color: #197fbf;
    border-bottom: 3px solid #004aea;
    min-width: 80px;
    text-align: center;
    white-space: nowrap;
  }
  .top-tab-active:hover {
    // background-color: #197fbf;
    // border: 1px solid #197fbf;
    cursor: pointer;
  }
  .typeLaiSuat:hover {
    /* color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#fff')}; */
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255,255,255,0.8)'
        : 'rgba(255,255,255,0.8)'};
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    border: 1px solid #197fbf;
    border-radius: 4px;
  }
  .typeLaiSuat {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#fff')};
    cursor: pointer;
    border: 1px solid #197fbf;
    border-radius: 4px;
    padding: 4px;
    background-color: #197fbf;
  }
  .guiOnline:hover {
    /* color: ${(props) =>
      props.screen_mode === 'dark' ? '#197FBF' : '#197FBF'}; */
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
  }
  .guiOnline {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#66676B')};
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
    padding: 4px;
  }
  .guiTaiQuay:hover {
    /* color: ${(props) =>
      props.screen_mode === 'dark' ? '#197FBF' : '#197FBF'}; */
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
  }
  .guiTaiQuay {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#66676B')};
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
    padding: 4px;
  }
  .thang136:hover {
    /* color: ${(props) =>
      props.screen_mode === 'dark' ? '#197FBF' : '#197FBF'}; */
    border: 1px solid #197fbf;
    border-radius: 4px;
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
  }
  .thang136 {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#66676B')};
    border: 1px solid #1e3446;
    border-radius: 4px;
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
    padding: 4px;
  }
  .thang91213:hover {
    /* color: ${(props) =>
      props.screen_mode === 'dark' ? '#197FBF' : '#197FBF'}; */
    border: 1px solid #197fbf;
    border-radius: 4px;
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
  }
  .thang91213 {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#66676B')};
    border: 1px solid #1e3446;
    border-radius: 4px;
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
    padding: 4px;
  }
  .thang182436:hover {
    /* color: ${(props) =>
      props.screen_mode === 'dark' ? '#197FBF' : '#197FBF'}; */
    border: 1px solid #197fbf;
    border-radius: 4px;
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
  }
  .thang182436 {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#66676B')};
    cursor: pointer;
    border: 1px solid #1e3446;
    border-radius: 4px;
    /* border: 1px solid #197fbf;
    border-radius: 4px; */
    padding: 4px;
  }
  .soThangGui:hover {
    color: ${(props) => (props.screen_mode === 'dark' ? '#197FBF' : '#197FBF')};
    /* border: 1px solid #197fbf; */
    cursor: pointer;
    border: 1px solid #197fbf;
    border-radius: 4px;
  }
  .soThangGui {
    color: ${(props) => (props.screen_mode === 'dark' ? '#C8C3BC' : '#66676B')};
    cursor: pointer;
    border: 1px solid #197fbf;
    border-radius: 4px;
    padding: 4px;
  }
  .leftArrow:hover {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? ' #4a4c5a' : '#D5D7DC'};
    border-radius: 100%;
  }
  .rightArrow:hover {
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? ' #4a4c5a' : '#D5D7DC'};
    border-radius: 100%;
  }
  .vung1Header:hover {
    color: #fff;
  }
  .vung2Header:hover {
    color: #fff;
  }
  .ant-tooltip-inner {
    box-shadow: none !important;
    border: none !important;
    background-color: transparent !important; /* Optional: remove background color */
  }
  .vung1Header {
    color: ${(props) => (props.screen_mode === 'dark' ? '#C8C3BC' : '#66676B')};
  }
  .vung2Header {
    color: ${(props) => (props.screen_mode === 'dark' ? '#C8C3BC' : '#66676B')};
  }
  /* :where(.css-dev-only-do-not-override-nllxry).ant-tooltip .ant-tooltip-inner {
    box-shadow: none !important;
    border: 1px solid rgb(25, 127, 191, 0.18) !important;
    background-color: red !important;
  }
  .ant-tooltip .ant-tooltip-inner {
    background-color: red !important;
  } */
  :where(.css-dev-only-do-not-override-nllxry).ant-tooltip .ant-tooltip-inner {
    min-width: 32px;
    min-height: 32px;
    padding: 6px 8px;
    color: #fff;
    text-align: start;
    text-decoration: none;
    word-wrap: break-word;
    background-color: none;
    border-radius: 6px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  }
  /* .tbhistory {
    background-color: #1f232c;
  }
  .tbhistory tr:nth-child(even) {
    background-color: #2a2e39;
  } */
`;
