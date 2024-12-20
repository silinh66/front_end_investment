import styled from 'styled-components';

export const StyledForum = styled.div<{ $collapsed?: boolean }>`
  background-color: #1f232c;
  padding: 24px;
  margin-bottom: 24px;
  width: ${(props) => (props.$collapsed ? '580px' : '100%')};
  @media only screen and (min-width:1600px){
    width: ${(props) => (props.$collapsed ? '694px' : '100%')};

  }
  .title{
     margin-bottom:16px;
     color:white;
     font-size:20px;
     font-weight:500;
  }
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
      .tab-content {
        display: flex;
        gap: 6px;
        align-items: center;
      }
      &.ant-tabs-tab-active {
        background-color: #2A2E39; !important;
        border-radius: 8px;
      }
    }
  }
`;
