/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  Button,
  Checkbox,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Switch,
  Tooltip,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  StyledAuthGroup,
  StyledModalSignIn,
  StyledModalSignUp,
  StyledSignInSuccessModal,
} from './styled';
import GoogleIcon from '@/assets/icons/google_icon.svg';
import api, { requestToken } from '@/config/api';
import { fetchListSignals } from '@/redux/chart/signalsSlice.js';
import { getUserInfo } from '@/services/servicesApi/serviceApi';
import icons from '@/constants/icons';
import { io } from 'socket.io-client';
import { RootState } from '@/redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUserInfo, setLogin, setLogout, refreshAPI } from '@/redux/app';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';

import OTPInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth, provider } from '../../../../firebase/firebase.config.js';
// import three_dot from '@/assets/icons/three_dot.svg';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from 'firebase/auth';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import Messenger from '@/layouts/CommunityLayout/RightContent/RealtimeContent/Messenger';
import { config } from '@/config/env';
import darkmode_icon from '@assets/icons/darkmode_icon.svg';
import lightmode_icon from '@assets/icons/lightmode_icon.svg';
import darkmodelight_icon from '@assets/icons/darkmodelight_icon.svg';
import lightmodelight_icon from '@assets/icons/lightmodelight_icon.svg';
import useScreenMode from '@/redux/screen/hook';
import { set } from 'lodash';
import { getTimeDifference } from '@/utils/helper';
import ModalNoti from '@/components/modals/ModalNoti/ModalNoti';
import { ModalForgot } from '@/components/modals/ModalForgot/ModalForgot';
import axios from 'axios';

type FieldType = {
  username?: string;
  password?: string;
};

type Props = {
  screenMode: string;
  isOpenSignIn: any;
  setIsOpenSignIn: any;
};
const AuthGroup: React.FC<Props> = ({
  screenMode,
  isOpenSignIn,
  setIsOpenSignIn,
}) => {
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();
  const { handleChangeScreenMode } = useScreenMode();
  const dispatchRedux = useDispatch();
  const { user, refresh, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  console.log('user: ', user);
  const [sentPasscode, setSentPasscode] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [checkDisable, setSheckDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentToken, setCurrentToken] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingBtnOTP, setLoadingBtnOTP] = useState(false);
  const [confirmRule, setConfirmRule] = useState(false);
  const [modalStates, setModalStates] = useState({
    modalSignInVisible: false,
    modalSignUpVisible: false,
    modalSignInSuccessVisible: false,
    modalSignUpSuccessVisible: false,
    modalNotificationVisible: false,
  });
  const [canResend, setCanResend] = useState(false);
  const [isSendCode, setIsSendCode] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openMessenger, setOpenMessenger] = useState(false);
  const [listShareSignal, setListShareSignal] = useState([]);
  const [isHoverSignIn, setIsHoverSignIn] = useState(false);
  const [timer, setTimer] = useState(60);
  // const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const three_dot = (
    <svg
      onMouseOver={() => {
        setIsHoverSignIn(true);
      }}
      onMouseOut={() => {
        setIsHoverSignIn(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenSignIn(!isOpenSignIn);
      }}
      style={{
        height: '30px',
        backgroundColor: isHoverSignIn
          ? screenMode === 'dark'
            ? '#373943'
            : '#ECECEF'
          : 'transparent',
        borderRadius: '100px',
        marginLeft: '7px',
        userSelect: 'none',
      }}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.5C16.8284 8.5 17.5 9.1709 17.5 9.9985V10.0135C17.5 10.8411 16.8284 11.512 16 11.512C15.1716 11.512 14.5 10.8411 14.5 10.0135V9.9985C14.5 9.1709 15.1716 8.5 16 8.5ZM16 14.494C16.8284 14.494 17.5 15.1649 17.5 15.9925V16.0075C17.5 16.8351 16.8284 17.506 16 17.506C15.1716 17.506 14.5 16.8351 14.5 16.0075V15.9925C14.5 15.1649 15.1716 14.494 16 14.494ZM16 20.488C16.8284 20.488 17.5 21.1589 17.5 21.9865V22.0015C17.5 22.8291 16.8284 23.5 16 23.5C15.1716 23.5 14.5 22.8291 14.5 22.0015V21.9865C14.5 21.1589 15.1716 20.488 16 20.488Z"
        fill={screenMode === 'dark' ? 'white' : '#2E3138'}
      />
    </svg>
  );

  const navigate = useNavigate(); // Added navigate function

  useEffect(() => {
    if (!!user?.userID) {
      const socket = io(
        `${config.socket.VITE_REACT_CHAT}?userId=${user?.userID}`
      );

      socket.on('newChart', (chartInfo: any) => {
        // alert(`new chart ${JSON.stringify(chartInfo)}`);
        // alert(`bạn A đã chia sẻ 1 biểu đồ cho bạn !!!`);
        openNotification(chartInfo);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  const resgiterGG = (data) => {
    try {
      setLoading(true);
      api
        .post('/register', {
          email: data.email,
          name: data.displayName,
          phone_number: '',
          password: data.uid,
        })
        .then((res) => {
          if (res.status === 201) {
            loginGG(data);

            setLoading(false);
            // Switch to Sign-In Modal
            closeSignInModal();
            closeSignUpModal();
          } else {
            setLoading(false);
          }
        });
    } catch (error) {}
  };
  const loginGG = (data) => {
    try {
      setLoading(true);
      requestToken({
        method: 'POST',
        url: '/login',
        data: {
          identifier: data.email,
          password: data.uid,
        },
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          closeSignInModal();
          const { token } = res.data;
          localStorage.setItem('token', token);
          dispatch(setLogin());
          dispatch(refreshAPI());
          openSignInSuccessModal();
        } else {
          setLoading(false);
        }
      });
    } catch (error) {}
  };
  const handleGGLogin = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        resgiterGG(data.user);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert('An error occurred during Google sign-in. Please try again.');
      });
  };

  const openNotification = (chartInfo: any) => {
    const notificationKey = `open${Date.now()}`;
    getListNotification();
    noti.info({
      key: notificationKey,
      message: `Thông báo chia sẻ biểu đồ`,
      description: `${chartInfo[1]?.name} đã chia sẻ 1 biểu đồ cho bạn !!!`,
      placement: 'topRight',
      duration: 5,
      onClick: () => {
        //navigate to biểu đồ
        navigate('/loc-co-phieu', { state: { activeTab: 'congCu' } });
        toggleModalNoti();
        noti.destroy(notificationKey);
      },
    });
  };
  const openSignInModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignInVisible: true }));
  };
  const closeSignInModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignInVisible: false }));
  };
  const openSignUpModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignUpVisible: true }));
  };
  const closeSignUpModal = () => {
    setIsSendCode(false);
    setCanResend(false);
    setErrorMessage('');
    setOtp('');
    setModalStates((prev) => ({ ...prev, modalSignUpVisible: false }));
  };
  const openSignInSuccessModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignInSuccessVisible: true }));
  };
  const closeSignInSuccessModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignInSuccessVisible: false }));
  };
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisble',
          callback: (response) => {
            onSignUp();
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }
  const onSignup = () => {
    onCaptchVerify();
    const appVerifyer = window.recaptchaVerifier;
    const formatPh = '+' + phoneNumber;
    setLoadingBtnOTP(true);
    setLoading(false);

    signInWithPhoneNumber(auth, formatPh, appVerifyer)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoadingBtnOTP(false);
        setLoading(false);

        // ...
      })
      .catch((error) => {
        setLoadingBtnOTP(false);
        setLoading(false);

        // Error; SMS not sent
        // ...
      });
  };
  useEffect(() => {
    let interval = null;
    if (isSendCode && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCanResend(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSendCode, canResend]);

  function onOTPVerify() {
    setLoadingBtnOTP(true);
    setLoading(false);
    setSheckDisable(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUserInfo(res.user);
        setLoadingBtnOTP(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === 'auth/code-expired') {
          alert('Mã OTP đã hết hạn');
        } else {
        }
        setLoadingBtnOTP(false);
        setLoading(false);
      });
  }
  const handleSignIn = (values: any) => {
    // return;

    try {
      setLoading(true);
      requestToken({
        method: 'POST',
        url: '/login',
        data: values,
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            closeSignInModal();
            const { token } = res.data;
            localStorage.setItem('token', token);
            dispatch(setLogin());
            dispatch(refreshAPI());
            openSignInSuccessModal();
          } else if (res.status === 400) {
            form.setFields([
              {
                name: 'identifier', // required
                errors: ['Sai tên đăng nhập'],
              },
              {
                name: 'password', // required
                errors: ['Sai mật khẩu'],
              },
            ]);
          } else {
            noti.error({
              message: `Lỗi!`,
              description: 'Đã xảy ra lỗi không xác định!',
              placement: 'topRight',
            });
          }
        })
        .catch((error) => {
          noti.error({
            message: `Lỗi!`,
            description: 'Tài khoản mật khẩu không chính xác!',
            placement: 'topRight',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      noti.error({
        message: `Lỗi!`,
        description: 'Đã xảy ra lỗi không xác định!',
        placement: 'topRight',
      });
      setLoading(false);
    }
  };

  const handleSignUp = (values: any) => {
    if (!otp) {
      setErrorMessage('Vui lòng nhập mã xác nhận!');
      return;
    }
    if (otp === sentPasscode || errorMessage === '') {
      try {
        const updatedValues = { ...values };
        setLoading(true);
        api.post('/register', updatedValues).then((res) => {
          if (res.status === 201) {
            setLoading(false);
            // Switch to Sign-In Modal
            closeSignUpModal();
            openSignInModal();
          } else {
            setLoading(false);
          }
        });
      } catch (error) {}
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const toggleModal = () => {
    setModalStates((prev) => ({
      ...prev,
      modalSignInVisible: !prev.modalSignInVisible,
      modalSignUpVisible: !prev.modalSignUpVisible,
    }));
  };

  const logoutAction = () => {
    dispatch(setLogout());
    localStorage.clear();
    setCurrentToken(null);
    dispatch(refreshAPI());
  };
  const toggleConfirm = () => {
    setConfirmRule((prev) => !prev);
  };
  useEffect(() => {
    const currentToken = localStorage.getItem('authToken');
    setCurrentToken(currentToken);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) {
      getUserInfo()
        .then((res) => {
          dispatch(setUserInfo(res.data));
          dispatch(setLogin());
        })
        .catch((err) => {
          dispatch(setUserInfo(null));
        });
    }
  }, [currentToken, dispatch, refresh]);

  const toggleModalNoti = () => {
    setModalStates((prev) => ({
      ...prev,
      modalNotificationVisible: !prev.modalNotificationVisible,
    }));
  };

  const getListNotification = () => {
    const token = localStorage.getItem('token');
    if (!!token) {
      api
        .get('/signals/list-share-request', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res: any) => {
          const listShareSignal = res?.data?.sharedSignals;

          setListShareSignal(listShareSignal);
          setModalStates((prev: any) => ({
            ...prev,
            // modalNotificationVisible: !prev.modalNotificationVisible,
          }));
        });
    }
  };

  useEffect(() => {
    getListNotification();
  }, []);
  const isEmail = /^\S+@\S+\.\S+$/.test(email);
  const isValidInput = email.trim() !== '' && isEmail;
  const sendCodeSMS = async () => {
    if (!isEmail) {
      alert('Vui lòng nhập đúng email!');
      return;
    }
    setLoadingSend(true);
    setIsSendCode(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${config.app.VITE_APP_API_URL}/send-code-email`,
        { email: email }
      );
      setSentPasscode(response.data.passcode); // Store the passcode returned from the backend
      // setErrorMessage(response.data.message);

      // Start countdown timer
      setTimer(60);
      setCanResend(false);
      setLoadingSend(false);

      // Countdown logic
      const countdown = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(countdown);
            setCanResend(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to send passcode.');
    }
  };

  return (
    <StyledAuthGroup screen_mode={screenMode}>
      {contextHolder}
      {isLogin ? (
        <>
          <div className="tools-bar">
            <div
              style={{
                cursor: 'pointer',
              }}
              onClick={() => setOpenMessenger(!openMessenger)}
              className="icon-mess"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5395 17.1461H18.0748C19.0829 17.1461 19.8749 16.1764 19.8749 15.0162V5.89028C19.8749 4.73016 19.0829 3.76044 18.0748 3.76044H5.92406C4.916 3.76044 4.12395 4.73016 4.12395 5.89028V15.0162C4.12395 16.1764 4.916 17.1461 5.92406 17.1461H7.72417V21.4411H7.72755L7.7298 21.4398L12.5395 17.1461ZM8.39921 22.5332C8.15961 22.7463 7.86044 22.8373 7.56595 22.7867C7.27145 22.7361 7.00511 22.5479 6.82412 22.2626C6.67931 22.0316 6.60071 21.7499 6.60023 21.4602V18.5061H5.92518C4.30958 18.5061 3 16.9434 3 15.0162V5.89028C2.99888 3.96309 4.30846 2.40039 5.92406 2.40039H18.0748C19.6904 2.40039 21 3.96309 21 5.89028V15.0162C21 16.9448 19.6904 18.5061 18.0748 18.5061H12.9107L8.39921 22.5332Z"
                  fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                />
              </svg>
            </div>
            <div
              style={{
                display: openMessenger ? 'block' : 'none',
              }}
              className="messenger"
            >
              <Messenger setOpenMessenger={setOpenMessenger} />
            </div>
            <div
              style={{
                cursor: 'pointer',
              }}
              className="icon-noti"
              onClick={() => {
                toggleModalNoti();
              }}
            >
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.7539 0.693359C6.89931 0.693359 4.18848 2.96126 4.00503 5.89658C3.76498 9.73757 2.71024 11.369 1.92462 12.3955C1.84754 12.4962 1.7604 12.6067 1.67292 12.7177C1.54956 12.8741 1.42552 13.0314 1.32808 13.1633C1.14481 13.4113 0.96154 13.6891 0.838609 14.0064C0.564723 14.7136 0.65838 15.4295 1.08304 16.2788C1.36766 16.848 1.89282 17.2698 2.47286 17.5862C3.0632 17.9082 3.78517 18.1618 4.57198 18.3585C5.32506 18.5467 6.16124 18.6887 7.0384 18.7855C7.26774 20.2147 8.50655 21.3065 10.0004 21.3065C11.4939 21.3065 12.7325 20.2151 12.9622 18.7863C13.842 18.6894 14.6807 18.5473 15.4358 18.3585C16.2226 18.1618 16.9446 17.9082 17.5349 17.5862C18.1149 17.2698 18.6401 16.848 18.9247 16.2788C19.3435 15.4411 19.4387 14.7353 19.154 14.0377C19.0276 13.7282 18.8412 13.4592 18.6587 13.2215C18.5663 13.1012 18.4665 12.9784 18.3688 12.858L18.3651 12.8535C18.2666 12.7323 18.1677 12.6105 18.0657 12.4797C17.2884 11.4825 16.235 9.84632 16.0027 5.89929C15.9042 4.2247 15.0102 2.90951 13.8256 2.0317C12.6505 1.16091 11.1594 0.693359 9.7539 0.693359ZM5.50211 5.99014C5.63115 3.92546 7.60859 2.19336 9.7539 2.19336C10.8483 2.19336 12.0242 2.56371 12.9326 3.23686C13.8315 3.90299 14.4376 4.8378 14.5053 5.98742C14.7557 10.2422 15.9212 12.1683 16.8826 13.4018C16.994 13.5448 17.1012 13.6767 17.1977 13.7955L17.2046 13.804C17.3049 13.9273 17.3913 14.0339 17.4689 14.135C17.6265 14.3402 17.7154 14.4826 17.7652 14.6046C17.8328 14.7701 17.8831 15.0078 17.5831 15.608C17.4927 15.7887 17.2679 16.0232 16.8166 16.2693C16.3757 16.5098 15.7852 16.725 15.072 16.9033C13.6475 17.2594 11.8366 17.4434 10.0039 17.4434C8.1712 17.4434 6.36031 17.2594 4.93578 16.9033C4.22259 16.725 3.63205 16.5098 3.19113 16.2693C2.73991 16.0232 2.51507 15.7887 2.42468 15.6079C2.12131 15.0012 2.16342 14.7391 2.23735 14.5482C2.28833 14.4166 2.37882 14.2653 2.5345 14.0546C2.62842 13.9275 2.71863 13.8136 2.82154 13.6837C2.90755 13.5751 3.00244 13.4553 3.11579 13.3072C4.06905 12.0616 5.24219 10.1491 5.50211 5.99014Z"
                  fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                />
              </svg>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenSignIn(!isOpenSignIn);
              }}
              className={`${isOpenSignIn ? 'action' : ''} user`}
            >
              <img
                src={user?.avatar || icons.HEADER_AVATAR_ICON}
                alt="HEADER_AVATAR_ICON"
              />
              {/* <img src={icons.HEADER_AVATAR_ICON} alt="HEADER_AVATAR_ICON" /> */}
              <Tooltip>
                {' '}
                <div>
                  {user?.name?.length > 16
                    ? `${user?.name?.slice(0, 16)}...`
                    : user?.name}
                </div>{' '}
              </Tooltip>
              <div
                style={{
                  cursor: 'pointer',
                }}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   setIsOpenSignIn(!isOpenSignIn);
                // }}
                className="icon-up"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.68757 5.46546L7.63609 10.529C7.81573 10.7123 8.18343 10.7123 8.36167 10.529L13.3116 5.46546C13.3238 5.45301 13.3311 5.4383 13.3327 5.42295C13.3343 5.40761 13.3301 5.39224 13.3207 5.37854C13.3112 5.36484 13.2969 5.35335 13.2792 5.34534C13.2614 5.33733 13.2411 5.33312 13.2204 5.33317L12.1678 5.33317C12.0962 5.33317 12.0288 5.35921 11.9867 5.40192L7.99958 9.48109L4.01242 5.40192C3.97031 5.35921 3.90295 5.33317 3.83137 5.33317L2.77879 5.33317C2.68757 5.33317 2.63424 5.41025 2.68757 5.46546Z"
                    fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                  />
                </svg>
              </div>
              {/* <div
                onClick={() => {
                  setIsOpenSignIn(!isOpenSignIn);
                }}
                className="icon-down"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.3124 10.5345L8.36391 5.471C8.18427 5.28766 7.81657 5.28766 7.63833 5.471L2.68841 10.5345C2.67623 10.547 2.66893 10.5617 2.66733 10.577C2.66572 10.5924 2.66988 10.6078 2.67932 10.6215C2.68877 10.6352 2.70314 10.6467 2.72085 10.6547C2.73855 10.6627 2.7589 10.6669 2.77964 10.6668H3.83221C3.90379 10.6668 3.97115 10.6408 4.01326 10.5981L8.00042 6.51891L11.9876 10.5981C12.0297 10.6408 12.0971 10.6668 12.1686 10.6668H13.2212C13.3124 10.6668 13.3658 10.5897 13.3124 10.5345Z"
                    fill="#42A732"
                  />
                </svg>
              </div> */}
              {/* <div className="dropdown">
                <Link to="/cong-dong/profile">Xem thông tin cá nhân</Link>
                <a onClick={logoutAction}>Sign Out</a>
              </div> */}
            </div>
          </div>
          {isOpenSignIn && (
            <div
              style={{
                position: 'absolute',
                width: '172px',
                height: '160px',
                backgroundColor: screenMode === 'dark' ? '#202127' : '#fff',
                top: '60px',
                right: '16px',
                padding: '8px 16px 16px 16px',
                // border: '1px solid #202127',
                borderRadius: '6px',
                zIndex: 110,
                boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/cong-dong/profile');
                  setIsOpenSignIn(!isOpenSignIn);
                }}
                style={{
                  width: '140px',
                  // border:
                  //   screenMode === 'dark'
                  //     ? '1px solid #30323B'
                  //     : '1px solid #D5D7DC',
                  borderRadius: '6px',
                  padding: '8px 0px',
                  color: screenMode === 'dark' ? '#fff' : '#2E3138',
                  fontWeight: '400',
                  fontFamily: 'Roboto Flex',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  height: '40px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.9854 0.754639C6.96759 0.754639 5.99147 1.15896 5.27177 1.87866C4.55208 2.59835 4.14776 3.57447 4.14776 4.59228C4.14776 5.61008 4.55208 6.5862 5.27177 7.3059C5.99147 8.02559 6.96759 8.42992 7.9854 8.42992C9.0032 8.42992 9.97932 8.02559 10.699 7.3059C11.4187 6.5862 11.823 5.61008 11.823 4.59228C11.823 3.57447 11.4187 2.59835 10.699 1.87866C9.97932 1.15896 9.0032 0.754639 7.9854 0.754639ZM5.35964 4.59228C5.35964 3.89588 5.63628 3.22801 6.12871 2.73559C6.62113 2.24317 7.289 1.96652 7.9854 1.96652C8.68179 1.96652 9.34966 2.24317 9.84208 2.73559C10.3345 3.22801 10.6111 3.89588 10.6111 4.59228C10.6111 5.28867 10.3345 5.95654 9.84208 6.44896C9.34966 6.94139 8.68179 7.21803 7.9854 7.21803C7.289 7.21803 6.62113 6.94139 6.12871 6.44896C5.63628 5.95654 5.35964 5.28867 5.35964 4.59228ZM7.9854 9.6418C6.11667 9.6418 4.39417 10.0668 3.11846 10.7842C1.86133 11.4919 0.916061 12.5633 0.916061 13.8834V13.9658C0.915253 14.9046 0.914445 16.0826 1.94778 16.9244C2.45596 17.3381 3.16774 17.633 4.12917 17.8269C5.09222 18.0224 6.34854 18.125 7.9854 18.125C9.62225 18.125 10.8778 18.0224 11.8424 17.8269C12.8039 17.633 13.5148 17.3381 14.0238 16.9244C15.0572 16.0826 15.0555 14.9046 15.0547 13.9658V13.8834C15.0547 12.5633 14.1095 11.4919 12.8531 10.7842C11.5766 10.0668 9.85493 9.6418 7.9854 9.6418ZM2.12795 13.8834C2.12795 13.1959 2.63048 12.4493 3.71229 11.841C4.77551 11.2431 6.28472 10.8537 7.9862 10.8537C9.68608 10.8537 11.1953 11.2431 12.2585 11.841C13.3411 12.4493 13.8428 13.1959 13.8428 13.8834C13.8428 14.9402 13.8105 15.5348 13.2579 15.984C12.959 16.228 12.4581 16.4663 11.6017 16.6392C10.7477 16.8121 9.58024 16.9131 7.9854 16.9131C6.39055 16.9131 5.2223 16.8121 4.36913 16.6392C3.51273 16.4663 3.01182 16.228 2.71288 15.9848C2.16026 15.5348 2.12795 14.9402 2.12795 13.8834Z"
                    fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                  />
                </svg>
                Thông tin cá nhân
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  logoutAction();
                  setIsOpenSignIn(!isOpenSignIn);
                }}
                style={{
                  width: '140px',
                  // border:
                  //   screenMode === 'dark'
                  //     ? '1px solid #30323B'
                  //     : '1px solid #D5D7DC',
                  // borderRadius: '6px',
                  padding: '8px 0px',
                  color: screenMode === 'dark' ? '#fff' : '#2E3138',
                  fontWeight: '400',
                  fontFamily: 'Roboto Flex',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  height: '40px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  paddingBottom: '16px',
                  borderBottom:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.37515 12.8334C7.37515 12.6677 7.441 12.5087 7.55821 12.3915C7.67542 12.2743 7.83439 12.2084 8.00015 12.2084H13.0002C13.0554 12.2084 13.1084 12.1865 13.1475 12.1474C13.1865 12.1083 13.2085 12.0553 13.2085 12.0001V2.00008C13.2085 1.94483 13.1865 1.89184 13.1475 1.85277C13.1084 1.8137 13.0554 1.79175 13.0002 1.79175H8.00015C7.83439 1.79175 7.67542 1.7259 7.55821 1.60869C7.441 1.49148 7.37515 1.33251 7.37515 1.16675C7.37515 1.00099 7.441 0.842016 7.55821 0.724806C7.67542 0.607596 7.83439 0.541748 8.00015 0.541748H13.0002C13.8052 0.541748 14.4585 1.19508 14.4585 2.00008V12.0001C14.4585 12.3869 14.3048 12.7578 14.0313 13.0313C13.7579 13.3048 13.3869 13.4584 13.0002 13.4584H8.00015C7.83439 13.4584 7.67542 13.3926 7.55821 13.2754C7.441 13.1581 7.37515 12.9992 7.37515 12.8334Z"
                    fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                  />
                  <path
                    d="M11.0102 7.92925C11.0102 8.15026 10.9224 8.36222 10.7661 8.5185C10.6098 8.67478 10.3978 8.76258 10.1768 8.76258H6.13015C6.11071 9.05869 6.08682 9.3548 6.05849 9.65092L6.03349 9.90508C6.02418 10.0009 5.9919 10.093 5.93939 10.1737C5.88688 10.2543 5.81568 10.3211 5.73185 10.3684C5.64802 10.4157 5.55402 10.442 5.45783 10.4452C5.36164 10.4484 5.2661 10.4283 5.17932 10.3867C3.65555 9.65735 2.27638 8.65819 1.10849 7.43758L1.08349 7.41175C0.976032 7.29998 0.916016 7.15096 0.916016 6.99591C0.916016 6.84087 0.976032 6.69185 1.08349 6.58008L1.10849 6.55425C2.27638 5.33364 3.65555 4.33448 5.17932 3.60508C5.2661 3.56348 5.36164 3.54343 5.45783 3.54662C5.55402 3.54982 5.64802 3.57617 5.73185 3.62345C5.81568 3.67072 5.88688 3.73752 5.93939 3.81817C5.9919 3.89883 6.02418 3.99096 6.03349 4.08675L6.05849 4.34091C6.08682 4.63647 6.11071 4.93258 6.13015 5.22925H10.1768C10.3978 5.22925 10.6098 5.31705 10.7661 5.47333C10.9224 5.62961 11.0102 5.84157 11.0102 6.06258V7.92925Z"
                    fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                  />
                </svg>
                Đăng xuất
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '16px 3.5px 0 3.5px',
                  gap: '8px',
                  alignItems: 'center',
                  borderTop:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                }}
              >
                <div
                  onClick={() => {
                    if (screenMode === 'light') {
                      handleChangeScreenMode();
                    }
                  }}
                  style={{
                    color: screenMode === 'dark' ? '#fff' : '#2E3138',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Tối
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    border:
                      screenMode === 'dark'
                        ? '1px solid #30323B'
                        : '1px solid #D5D7DC',
                    borderRadius: '100px',
                    padding: '4px',
                    width: '60px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  className="screen-mode"
                  onClick={() => {
                    handleChangeScreenMode();
                  }}
                >
                  <img
                    src={
                      screenMode === 'dark' ? darkmode_icon : darkmodelight_icon
                    }
                  />
                  <img
                    src={
                      screenMode === 'dark'
                        ? lightmode_icon
                        : lightmodelight_icon
                    }
                  />
                </div>
                <div
                  onClick={() => {
                    if (screenMode === 'dark') {
                      handleChangeScreenMode();
                    }
                  }}
                  style={{
                    color: screenMode === 'dark' ? '#fff' : '#2E3138',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Sáng
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Flex gap={12}>
          <div
            style={{
              color: screenMode === 'dark' ? '#fff' : '#2E3138',
              backgroundColor: screenMode === 'dark' ? '#101114' : '#fff',
              border:
                screenMode === 'dark'
                  ? '1px solid #40424E'
                  : '1px solid #BFC2CA',
              padding: '8px 4px 8px 16px',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              openSignInModal();
            }}
            className="sign-in"
          >
            <div
              style={{
                lineHeight: '20px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Roboto Flex',
                color: screenMode === 'dark' ? '#fff' : '#2E3138',
              }}
            >
              Đăng nhập
            </div>

            {three_dot}
            {/* <img
              onMouseOver={() => {
                setIsHoverSignIn(true);
              }}
              onMouseOut={() => {
                setIsHoverSignIn(false);
              }}
              style={{
                height: '30px',
                backgroundColor: isHoverSignIn
                  ? screenMode === 'dark'
                    ? '#373943'
                    : '#ECECEF'
                  : 'transparent',
                borderRadius: '100px',
                marginLeft: '7px',
              }}
              src={three_dot}
            /> */}
          </div>
          {isOpenSignIn && (
            <div
              style={{
                position: 'absolute',
                width: '160px',
                height: '112px',
                backgroundColor: screenMode === 'dark' ? '#202127' : '#fff',
                top: '50px',
                right: '16px',
                padding: '16px',
                border: '1px solid #202127',
                borderRadius: '6px',
                zIndex: 110,
                boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openSignUpModal();
                }}
                style={{
                  width: '128px',
                  border:
                    screenMode === 'dark'
                      ? '1px solid #30323B'
                      : '1px solid #D5D7DC',
                  borderRadius: '6px',
                  padding: '6px 39px',
                  color: screenMode === 'dark' ? '#fff' : '#2E3138',
                  fontWeight: '400',

                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                className="sign-up"
              >
                Đăng ký
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '16px 3.5px 0 3.5px',
                  gap: '8px',
                  alignItems: 'center',
                  // borderTop:
                  //   screenMode === 'dark'
                  //     ? '1px solid #30323B'
                  //     : '1px solid #D5D7DC',
                }}
              >
                <div
                  onClick={() => {
                    if (screenMode === 'light') {
                      handleChangeScreenMode();
                    }
                  }}
                  style={{
                    color: screenMode === 'dark' ? '#fff' : '#2E3138',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Tối
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    border:
                      screenMode === 'dark'
                        ? '1px solid #30323B'
                        : '1px solid #D5D7DC',
                    borderRadius: '100px',
                    padding: '4px',
                    width: '60px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  className="screen-mode"
                  onClick={() => {
                    handleChangeScreenMode();
                  }}
                >
                  <img
                    src={
                      screenMode === 'dark' ? darkmode_icon : darkmodelight_icon
                    }
                  />
                  <img
                    src={
                      screenMode === 'dark'
                        ? lightmode_icon
                        : lightmodelight_icon
                    }
                  />
                </div>
                <div
                  onClick={() => {
                    if (screenMode === 'dark') {
                      handleChangeScreenMode();
                    }
                  }}
                  style={{
                    color: screenMode === 'dark' ? '#fff' : '#2E3138',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Sáng
                </div>
              </div>

              {/* <div className="screen-mode">
                <ConfigProvider
                  direction="rtl"
                  theme={{
                    components: {
                      Tabs: {
                        inkBarColor: 'green',
                        itemActiveColor: 'green',
                        itemSelectedColor: 'green',
                      },
                    },
                  }}
                >
                  <Switch
                    unCheckedChildren="Tối"
                    checkedChildren="Sáng"
                    checked={screenMode === 'light'}
                    onChange={handleChangeScreenMode}
                  />
                </ConfigProvider>
              </div> */}
            </div>
          )}
          {/* <Button
            style={{ backgroundColor: '#197fbf', height: '30px' }}
            type="primary"
            onClick={openSignInModal}
          >
            Đăng nhập
          </Button> */}
          {/* <Button
            style={{ backgroundColor: '#197fbf', height: '30px' }}
            type="primary"
            onClick={openSignUpModal}
          >
            Đăng ký
          </Button> */}
        </Flex>
      )}
      <Modal
        centered
        open={modalStates.modalSignInSuccessVisible}
        onOk={closeSignInSuccessModal}
        onCancel={closeSignInSuccessModal}
        footer={false}
        width={500}
        closable={false}
      >
        <StyledSignInSuccessModal screen_mode={screenMode}>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M51.4456 12.991C52.5922 13.8215 52.8425 15.416 52.0045 16.5524L28.4985 45.9326C27.0653 47.8765 24.1977 48.0391 22.5501 46.2701L8.18194 30.843C7.21868 29.8087 7.28375 28.1964 8.32729 27.2417C9.37082 26.287 10.9977 26.3515 11.9609 27.3857L25.2686 41.6742L47.8523 13.545C48.6902 12.4086 50.299 12.1606 51.4456 12.991Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="message">Đăng nhập thành công</div>
          <div className="desc">
            Bạn sẽ được đăng nhập vào tài khoản của mình trong giây lát. Nếu
            không có gì xảy ra, hãy nhấp vào <span>Tiếp tục.</span>
          </div>
          <Button className="submit-btn" onClick={closeSignInSuccessModal}>
            Tiếp tục
          </Button>
        </StyledSignInSuccessModal>
      </Modal>
      <Modal
        open={modalStates.modalSignInVisible}
        onOk={openSignInModal}
        onCancel={closeSignInModal}
        footer={false}
        width={560}
        closable={false}
      >
        <StyledModalSignIn screen_mode={screenMode}>
          <div className="signIn-head">
            <div className="signIn-head__name">Welcome!</div>
            <div className="signIn-title">
              Chào mừng bạn tới <span>dautubenvung.vn</span>
            </div>
          </div>

          <div className="signIn-form">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSignIn}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div
                style={{
                  display: 'grid',
                  gap: '16px',
                }}
              >
                <Form.Item
                  name="identifier"
                  // label="Nhập tên đăng nhập hoặc tài khoản Email của bạn"
                  rules={[
                    //    { required: true },
                    {
                      required: true,
                      message:
                        'Vui lòng nhập tên đăng nhập hoặc tài khoản của bạn!',
                    },
                    { type: 'string', min: 6 },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên đăng nhập hoặc email"
                    prefix={
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5318 17.2809H2.46842C1.91589 17.2809 1.38599 17.0614 0.995285 16.6707C0.604584 16.28 0.385091 15.7501 0.385091 15.1975V14.5084C0.385091 11.2009 3.35259 8.50837 7.00009 8.50837C10.6476 8.50837 13.6151 11.1992 13.6151 14.5084V15.1975C13.6151 15.7501 13.3956 16.28 13.0049 16.6707C12.6142 17.0614 12.0843 17.2809 11.5318 17.2809ZM7.00009 9.34337C3.81176 9.34337 1.21842 11.66 1.21842 14.51V15.1992C1.21842 15.5307 1.35012 15.8487 1.58454 16.0831C1.81896 16.3175 2.1369 16.4492 2.46842 16.4492H11.5318C11.8633 16.4492 12.1812 16.3175 12.4156 16.0831C12.6501 15.8487 12.7818 15.5307 12.7818 15.1992V14.5084C12.7818 11.66 10.1884 9.34337 7.00009 9.34337ZM7.00009 7.2592C6.35331 7.25936 5.72101 7.06772 5.18315 6.70851C4.64529 6.3493 4.22604 5.83865 3.97841 5.24115C3.73078 4.64365 3.66591 3.98614 3.79199 3.35176C3.91807 2.71739 4.22944 2.13466 4.68672 1.67725C5.14401 1.21985 5.72667 0.908333 6.36101 0.782092C6.99535 0.655851 7.65288 0.720559 8.25044 0.968033C8.848 1.21551 9.35876 1.63463 9.71811 2.1724C10.0775 2.71016 10.2693 3.34242 10.2693 3.9892C10.2686 4.85611 9.92398 5.68734 9.31106 6.30041C8.69814 6.91349 7.867 7.25832 7.00009 7.2592ZM7.00009 1.55337C6.51809 1.5532 6.04687 1.69599 5.64604 1.96367C5.2452 2.23135 4.93276 2.6119 4.74823 3.05718C4.5637 3.50245 4.51538 3.99245 4.60937 4.4652C4.70336 4.93794 4.93545 5.37219 5.27627 5.71302C5.6171 6.05384 6.05135 6.28593 6.52409 6.37992C6.99684 6.47391 7.48684 6.42559 7.93212 6.24106C8.37739 6.05653 8.75794 5.74409 9.02562 5.34325C9.2933 4.94242 9.43609 4.4712 9.43592 3.9892C9.43526 3.34338 9.17842 2.7242 8.72175 2.26754C8.26509 1.81087 7.64591 1.55403 7.00009 1.55337Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                      </svg>
                    }
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  // label="Nhập mật khẩu của bạn"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu!',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu của bạn"
                    prefix={
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.79457 12.9153C7.87528 12.7765 7.91738 12.6186 7.9165 12.4581C7.91644 12.215 7.81987 11.982 7.64802 11.8101C7.47611 11.6382 7.24295 11.5416 6.99984 11.5416C6.75672 11.5416 6.52356 11.6382 6.35165 11.8101C6.17986 11.9819 6.0833 12.2149 6.08317 12.4578C6.08225 12.6185 6.12435 12.7764 6.2051 12.9153C6.27753 13.0399 6.37868 13.145 6.49984 13.2222V14.425C6.49984 14.5576 6.55251 14.6847 6.64628 14.7785C6.74005 14.8723 6.86723 14.925 6.99984 14.925C7.13244 14.925 7.25962 14.8723 7.35339 14.7785C7.44716 14.6847 7.49984 14.5576 7.49984 14.425V13.2222C7.62099 13.145 7.72214 13.0399 7.79457 12.9153Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.5331 6.69176H10.6998V4.33342C10.6998 3.35212 10.31 2.41101 9.6161 1.71713C8.92222 1.02324 7.98111 0.633423 6.9998 0.633423C6.0185 0.633423 5.07739 1.02324 4.38351 1.71713C3.68962 2.41101 3.2998 3.35212 3.2998 4.33342V6.69176H2.46647C1.89184 6.69176 1.34074 6.92003 0.934407 7.32636C0.528078 7.73269 0.299805 8.28379 0.299805 8.85842V15.2003C0.301406 15.7744 0.530168 16.3245 0.936107 16.7305C1.34205 17.1364 1.89239 17.3652 2.46647 17.3668H11.5334C12.1075 17.3652 12.6576 17.1364 13.0635 16.7305C13.4694 16.3245 13.6982 15.7742 13.6998 15.2001V8.85842C13.6998 8.28379 13.4715 7.73269 13.0652 7.32636C12.6589 6.92003 12.1078 6.69176 11.5331 6.69176ZM4.2998 4.33342C4.2998 3.61734 4.58427 2.93058 5.09062 2.42423C5.59696 1.91789 6.28372 1.63342 6.9998 1.63342C7.71589 1.63342 8.40264 1.91789 8.90899 2.42423C9.41534 2.93058 9.6998 3.61734 9.6998 4.33342V6.69176H4.2998V4.33342ZM12.6998 15.1999C12.6977 15.5087 12.5741 15.8043 12.3557 16.0226C12.1373 16.241 11.8414 16.3647 11.5326 16.3668L2.46678 16.3668C2.15793 16.3647 1.86233 16.241 1.64393 16.0226C1.42553 15.8042 1.30191 15.5086 1.2998 15.1998V8.85842C1.2998 8.549 1.42272 8.25226 1.64151 8.03347C1.86031 7.81467 2.15705 7.69176 2.46647 7.69176H11.5331C11.8426 7.69176 12.1393 7.81467 12.3581 8.03347C12.5769 8.25226 12.6998 8.54901 12.6998 8.85842V15.1999ZM4.21647 6.77509V4.33342C4.21647 4.33342 4.21647 4.33342 4.21647 4.33342V6.77509Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                      </svg>
                    }
                  />
                </Form.Item>
              </div>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Flex justify="right">
                  <span
                    onClick={() => {
                      closeSignInModal();
                      setOpenForgot(true);
                    }}
                    type="primary"
                    className="forgot-password-btn"
                  >
                    Quên mật khẩu?
                  </span>
                </Flex>
              </Form.Item>
              <Form.Item
                style={{
                  marginBottom: '16px',
                }}
              >
                <Button type="primary" htmlType="submit" className="submit-btn">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <div onClick={handleGGLogin} className="signIn-actions">
              <div className="action-btn">
                <img src={GoogleIcon} />
                <p> Đăng nhập bằng tài khoản Google</p>
              </div>
            </div>
            <div className="signIn-head__action">
              <p>Chưa có tài khoản ?</p>
              <a onClick={toggleModal}>Đăng ký</a>
            </div>
          </div>
        </StyledModalSignIn>
      </Modal>
      <Modal
        open={modalStates.modalSignUpVisible}
        onOk={openSignUpModal}
        onCancel={closeSignUpModal}
        footer={false}
        width={560}
        closable={false}
      >
        <StyledModalSignUp screen_mode={screenMode}>
          <div className="header">
            <div className="signIn-title">Đăng ký tài khoản</div>
            <div onClick={closeSignUpModal} className="icon-close">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.281 14.2198C15.3507 14.2895 15.406 14.3722 15.4437 14.4632C15.4814 14.5543 15.5008 14.6519 15.5008 14.7504C15.5008 14.849 15.4814 14.9465 15.4437 15.0376C15.406 15.1286 15.3507 15.2114 15.281 15.281C15.2114 15.3507 15.1286 15.406 15.0376 15.4437C14.9465 15.4814 14.849 15.5008 14.7504 15.5008C14.6519 15.5008 14.5543 15.4814 14.4632 15.4437C14.3722 15.406 14.2895 15.3507 14.2198 15.281L8.00042 9.06073L1.78104 15.281C1.64031 15.4218 1.44944 15.5008 1.25042 15.5008C1.05139 15.5008 0.860523 15.4218 0.719792 15.281C0.579062 15.1403 0.5 14.9494 0.5 14.7504C0.5 14.5514 0.579062 14.3605 0.719792 14.2198L6.9401 8.00042L0.719792 1.78104C0.579062 1.64031 0.5 1.44944 0.5 1.25042C0.5 1.05139 0.579062 0.860523 0.719792 0.719792C0.860523 0.579062 1.05139 0.5 1.25042 0.5C1.44944 0.5 1.64031 0.579062 1.78104 0.719792L8.00042 6.9401L14.2198 0.719792C14.3605 0.579062 14.5514 0.5 14.7504 0.5C14.9494 0.5 15.1403 0.579062 15.281 0.719792C15.4218 0.860523 15.5008 1.05139 15.5008 1.25042C15.5008 1.44944 15.4218 1.64031 15.281 1.78104L9.06073 8.00042L15.281 14.2198Z"
                  fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                />
              </svg>
            </div>
          </div>

          {/* <div className="signIn-divider">
            <div className="text">Hoặc</div>
          </div> */}
          <div className="signIn-form">
            <Form
              layout="vertical"
              onFinish={handleSignUp}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="phone_number"
                label="Số điện thoại:"
                rules={[
                  {
                    pattern: /^[0-9]{10,15}$/,
                    message: 'Số điện thoại không hợp lệ!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                label="Tên đăng nhập:"
                rules={[
                  //    { required: true },
                  // { type: 'url', warningOnly: true },
                  { type: 'string', min: 6 },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email:"
                rules={[
                  //    { required: true },
                  { type: 'email', warningOnly: true },
                  { type: 'string', min: 6 },
                ]}
              >
                <Input
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <button
                type="button"
                disabled={!isValidInput || loadingSend}
                className={isValidInput ? 'active' : 'button-send-phone'}
                onClick={sendCodeSMS}
              >
                {loadingSend ? 'Đang gửi mã...' : 'Gửi mã'}
              </button>
              {isSendCode && (
                <div className="text-des">
                  Chúng tôi vừa gửi cho bạn tin nhắn chứa mã xác nhận. Vui lòng
                  kiểm tra tin nhắn của bạn và nhập mã xác nhận vào ô bên dưới.
                </div>
              )}
              {isSendCode && (
                <div className="time-text">
                  {!canResend ? (
                    <>
                      Không nhận được mã xác nhận?{' '}
                      <span>Gửi lại một lần nữa</span> 00:{timer}
                    </>
                  ) : (
                    <span>
                      Không nhận được mã xác nhận?{' '}
                      <span onClick={sendCodeSMS} className="send-again">
                        Gửi lại một lần nữa
                      </span>
                    </span>
                  )}
                </div>
              )}

              <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <Form.Item<FieldType>
                label="Mật khẩu:"
                name="password"
                rules={[
                  {
                    message: 'Please input your password!',
                  },
                  { min: 8 },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  className="submit-btn"
                  disabled={otp === sentPasscode || errorMessage === ''}
                >
                  {!loading && 'Đăng ký'}
                </Button>
              </Form.Item>
            </Form>
            <div onClick={handleGGLogin} className="signIn-actions">
              <div className="action-btn">
                <img src={GoogleIcon} />
                <p> Đăng nhập bằng tài khoản Google</p>
              </div>
            </div>{' '}
            <Flex justify="left">
              <div className="signIn-head">
                <div className="signIn-head__action">
                  <p>Đã có tài khoản ?</p>
                  <a onClick={toggleModal}>Đăng nhập</a>
                </div>
              </div>
            </Flex>
          </div>
        </StyledModalSignUp>
      </Modal>
      <ModalForgot
        screenMode={screenMode}
        openForgot={openForgot}
        setOpenForgot={setOpenForgot}
      />

      <ModalNoti
        getListNotification={getListNotification}
        modalStates={modalStates}
        toggleModalNoti={toggleModalNoti}
        listShareSignal={listShareSignal}
        screenMode={screenMode}
        getTimeDifference={getTimeDifference}
        api={api}
        dispatchRedux={dispatchRedux}
        fetchListSignals={fetchListSignals}
        navigate={navigate}
      ></ModalNoti>
    </StyledAuthGroup>
  );
};

export default AuthGroup;
