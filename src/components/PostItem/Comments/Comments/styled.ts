import styled from 'styled-components';

export const StyledComments = styled.div<{ screen_mode: string }>`
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure the container takes the full height of its parent */
  position: relative; /* Establish a positioning context */

  .root-comment {
    flex: 1; /* Allow this section to expand and fill available space */
    display: flex;
    flex-direction: column;
    margin-bottom: 60px; /* Space for the fixed input */
  }

  .scroll-comment {
    overflow-y: auto;
    margin-top: 16px;
    padding-right: 10px; /* Optional: to prevent content from being hidden behind the scrollbar */

    /* Remove fixed height to allow flexbox to manage the height */
  }

  .scroll-comment::-webkit-scrollbar {
    display: none; /* Hide scrollbar for better aesthetics */
  }

  .empty {
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: ${(props) =>
      props.screen_mode === 'dark'
        ? 'rgba(255,255,255,0.5)'
        : 'rgba(0,0,0,0.5)'};
  }

  .comment-input {
    padding: 16px 24px;
    position: fixed; /* Fix the input at the bottom of the viewport */
    bottom: 20px; /* 20px margin from the bottom */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Adjust for exact centering */
    width: 100%; /* Responsive width */
    max-width: 610px; /* Maximum width */
    z-index: 10; /* Ensure it stays above other elements */
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#fff'};
    box-shadow: 0px -2px 5px 0px #00000099;

    @media (max-width: 600px) {
      width: 95%; /* Adjust width for smaller screens */
    }
  }
`;
