import styled from 'styled-components';

export const StyledMemberSetting = styled.div`
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    margin: 8px 0;
  }
  .search-input {
    background-color: #2a2e39;
    border: none;
    outline: none;
    color: white;
    margin-bottom: 8px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .notice-text {
    text-align: center;
  }
  .suggest-title {
    margin: 16px 0;
    font-size: 18px;
    font-weight: 500;
  }
  .selected-list {
    margin-top: 12px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    .close-icon {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2a2e39;
      border-radius: 50%;
    }
  }
  .select-btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: 0.1s linear;
    &.active {
      background-color: #42a732;
      &:after {
        content: '';
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #42a732;
      }
    }
    span {
      width: 16px;
      height: 16px;
      background-color: #1f232c;
      border-radius: 50%;
      display: block;
    }
  }
`;
