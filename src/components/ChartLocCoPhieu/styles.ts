import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledChartFilter = styled.div<Props>`
  border: ${(props) =>
    props.screen_mode === 'dark' ? 'none' : '1px solid #e1e1e1'};
  /* position: absolute; */
  inset: 0px;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px; /* Adjust the border radius as needed */
  overflow: hidden; /* Ensures rounded corners hide overflowing content */
  .TVChartContainer {
    height: 100%;
  }
`;
