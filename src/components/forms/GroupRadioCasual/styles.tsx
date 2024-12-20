import styled from 'styled-components';

export const Styles = styled.div`
  width: 100%;
  .radio-custom {
    width: 100%;
  }
  .radio-custom .ant-radio-button-wrapper {
    border: none !important;
  }
  .radio-custom .ant-radio-button-wrapper-checked {
    background-color: #2a2e39 !important;
    border: none;
  }
  .radio-custom-label {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    margin: 0 0 0 10px;
  }
  .radio-custom-mark {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .radio-custom .ant-radio-button-wrapper-checked .radio-custom-mark {
    background-color: rgba(255, 255, 255, 1) !important;
  }
  .radio-custom .ant-radio-button-wrapper-checked .radio-custom-label {
    color: rgba(255, 255, 255, 1) !important;
  }
`;
