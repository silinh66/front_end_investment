import styled from 'styled-components';
type Props = {
  screen_mode: string;
};
export const StyledMessageItem = styled.div<Props>`
  padding: 8px 0;
  .message-head {
    display: flex;
    gap: 12px;
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 8px;
    }
  }
  .message-body {
    margin: 16px 0;
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
    font-size: 12px;
  }
  .message-bottom {
    p {
      color: rgba(255, 255, 255, 0.5);
      font-weight: 500;
      span {
        color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
        display: inline-block;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .message-name {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
  }
  .message-role {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
  }
  .message-sendDate {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
  }
`;
