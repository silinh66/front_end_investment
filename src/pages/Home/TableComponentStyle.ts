import { styled } from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};

export const StyleTableComponent = styled.div<Props>`
  background-color: ${(props) =>
    props.screen_mode === 'dark' ? 'pink' : '#fff'};
`;
