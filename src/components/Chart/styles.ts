import styled from 'styled-components';

type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledChart = styled.div<Props>`
  /* position: absolute; */
  inset: 0px;
  position: relative;
  width: 100%;
  border-radius: 6px; /* Adjust the border radius as needed */
  overflow: hidden; /* Ensures rounded corners hide overflowing content */
  .TVChartContainer {
    height: 100%;
  }
`;
