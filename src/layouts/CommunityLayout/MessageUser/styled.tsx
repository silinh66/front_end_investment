import styled from 'styled-components';
export const MessageUserStyled = styled.div`
  .user-badge {
    cursor: pointer;
  }
  .badge-rest {
    position: relative;
    cursor: pointer;
    &:hover {
      .restUser-pop {
        display: block;
      }
    }
    /* overlay of rest user avatar */
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(2, 2, 2, 0.5);
      color: white;
      font-size: 16px;
      font-weight: 700;
      font-family: Roboto;
    }
    /* Bridge connect rest-user to list */
    &:after {
      position: absolute;
      content: '';
      bottom: 0;
      right: 100%;
      height: 60px;
      width: 20px;
      background: transparent;
    }
    .restUser-pop {
      display: none;
      z-index: 10 !important;
      position: absolute;
      min-width: 140px;
      bottom: 0;
      right: calc(100% + 16px);
      border: 1.5px solid #42a732;
      background: rgba(30, 72, 23, 0.5);
      border-radius: 12px;

      .restUser-pop__title {
        font-size: 14px;
        font-weight: 500;
        padding: 8px 12px;
        white-space: nowrap;
        font-family: Roboto;
        color: white;
        border-bottom: 1px solid rgba(66, 167, 50, 0.6);
      }
      .restUser-pop__body {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        color: white;
      }
    }
  }
`;
