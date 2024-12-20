import styled from 'styled-components';

export const StyledFindAll = styled.div<{ screen_mode: string }>`
  .findAll-form {
    .ant-form-item-label {
      .custom-label {
        color: ${(props) => (props.screen_mode === 'dark' ? 'white' : 'black')};
      }
    }
  }
`;
