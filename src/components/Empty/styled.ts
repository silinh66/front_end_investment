import styled from 'styled-components';

export const StyledEmpty = styled.div`
  color: white;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #1f232c;
  img {
    width: 300px;
  }
  .desc {
    margin-top: 30px;
    font-size: 22px;
    font-weight: 500;
  }
`;
