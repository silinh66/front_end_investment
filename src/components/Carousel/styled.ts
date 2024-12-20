import styled from 'styled-components';

export const StyledCarouselPost = styled.div<{
  screen_mode: string;
}>`
  /* .box-carousel {
    display: flex;
    width: 1101px;
    align-items: flex-start;
    gap: 16px; */
  .item-caroulsel {
    display: flex;
    width: 164.5px;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;

    background: ${(props) =>
      props.screen_mode === 'dark' ? '#2a2e39' : '#F0F3FA'};
    .title {
      display: flex;
      align-items: center;
      gap: 24px;
      .text-title {
        color: #3594ef;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      align-self: stretch;
      .body-first {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        align-self: stretch;
        .item-first {
          color: ${(props) =>
            props.screen_mode === 'dark' ? '#fff' : '#080808'};
          font-family: Roboto;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .body-second {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        align-self: stretch;
        .item-second {
          display: flex;
          align-items: flex-start;
          gap: 4px;
          .item {
            color: ${(props) =>
              props.screen_mode === 'dark' ? '#fff' : '#080808'};
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          .item-value {
            color: ${(props) =>
              props.screen_mode === 'dark'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(8, 8, 8, 0.5)'};
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
      }
    }
  }
  /* } */
`;
