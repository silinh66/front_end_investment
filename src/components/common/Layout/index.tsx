/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router-dom';
import Header from 'src/components/common/Header';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Layout = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  // const [width, setWidth] = useState(window.innerWidth);

  // function handleWindowSizeChange() {
  //   setWidth(window.innerWidth);
  // }
  // useEffect(() => {
  //   window.addEventListener('resize', handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener('resize', handleWindowSizeChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   window.history.scrollRestoration = 'manual';
  // }, []);

  // const isMobile = width <= 1536;
  // useEffect(() => {
  //   localStorage.setItem('screen_mode', screenMode);
  //   if (width <= 1440) {
  //     document.body.style.zoom = '76%';
  //   } else if (isMobile) {
  //     document.body.style.zoom = '80%';
  //   } else {
  //     document.body.style.zoom = '100%';
  //   }
  // }, [screenMode, isMobile]);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  return (
    <StyledMainLayout
      screen_mode={screenMode}
      onClick={() => {
        setIsOpenSignIn(false);
      }}
      // style={{ background: screenMode === 'dark' ? '#0F1015' : '#ECECEF' }}
      style={{
        // background: screenMode === 'dark' ? '#121314' : '#fff',
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // flex: 1,
        backgroundColor: screenMode === 'dark' ? '#101114' : '#fff',
        height: '100vh',
      }}
    >
      <Header
        isOpenSignIn={isOpenSignIn}
        setIsOpenSignIn={setIsOpenSignIn}
        screenMode={screenMode}
      />
      <Outlet />
    </StyledMainLayout>
  );
};

export default Layout;

type Props = {
  screen_mode: string;
};
const StyledMainLayout = styled.div<Props>`
  // flex: 1,
  // width: 100%;
  // min-height: 100vh;
  // padding: 0px;
  // position: relative;

  /* * {
    scrollbar-color: ${(props) =>
    props.screen_mode === 'light'
      ? '#f5f5f5 #fff'
      : 'rgba(42, 46, 57, 1) #1f232c'};
    scrollbar-width: thin;
  } */

  ::-webkit-scrollbar {
    height: 4px;
    width: 6px;
    background: ${(props) =>
      props.screen_mode === 'light' ? '#ECECEF' : ' #202127'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.screen_mode === 'light' ? '#bfbfbf' : 'rgba(42, 46, 57, 1)'};
    -webkit-border-radius: 1ex;
    /* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
  }

  ::-webkit-scrollbar-corner {
    background: ${(props) =>
      props.screen_mode === 'light' ? '#ECECEF' : ' #202127'};
  }
`;
