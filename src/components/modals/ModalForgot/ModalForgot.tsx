/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { StyledModalForgot } from './styled';
import { sendCode } from '@/services/servicesApi/serviceApi';
import axios from 'axios';
import { config } from '@/config/env';
import { ModalChangePassword } from '../ModalChangePassword/ModalChangePassword';
import useBodyScrollLock from '@/components/UseBodyScrollLock/useBodyScrollLock';

export const ModalForgot = ({ setOpenForgot, openForgot, screenMode }) => {
  const [changeLayout, setChangeLayout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acc, setAcc] = useState(''); // For storing email/phone number
  const [message, setMessage] = useState(''); // For displaying feedback message
  const [passcode, setPasscode] = useState(''); // For storing the generated passcode
  const [enteredCode, setEnteredCode] = useState('');
  const [timer, setTimer] = useState(60); // Countdown timer for resend
  const [canResend, setCanResend] = useState(false);
  const [isSendCode, setIsSendCode] = useState(false);

  const closeModal = () => {
    setOpenForgot(false);
  };
  const isEmail = /^\S+@\S+\.\S+$/.test(acc);
  const isPhoneNumber = /^[0-9]{10,15}$/.test(acc);
  const isValidInput = acc.trim() !== '' && (isEmail || isPhoneNumber); //
  const handleSendCode = async (e) => {
    setIsSendCode(true);
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isEmail) {
      try {
        const response = await axios.post(
          `${config.app.VITE_APP_API_URL}/send-code-email`,
          { email: acc }
        );
        setPasscode(response.data.passcode); // Store the passcode returned from the backend
        setMessage(response.data.message);

        // Start countdown timer
        setTimer(60);
        setCanResend(false);

        // Countdown logic
        const countdown = setInterval(() => {
          setTimer((prevTime) => {
            if (prevTime === 1) {
              clearInterval(countdown);
              setCanResend(true); // Enable resend after countdown reaches 0
            }
            return prevTime - 1;
          });
        }, 1000);
      } catch (error) {
        console.error(error);
        setMessage('Failed to send passcode.');
      }
    } else {
      setMessage('Please enter a valid email or phone number.');
    }

    setLoading(false);
  };

  // Handle the reset password action

  const handleResetPassword = () => {
    if (enteredCode === passcode) {
      setChangeLayout(true);
      setOpenForgot(false);
      // closeModal();
    } else {
      setMessage('Incorrect verification code. Please try again.');
    }
  };
  return (
    <>
      <StyledModalForgot
        screen_mode={screenMode}
        // show={openForgot}
        onClick={closeModal}
      >
        <div className="wrapper-modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <div className="title-modal">Quên mật khẩu</div>
            <div onClick={closeModal} className="close">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.281 14.2198C15.3507 14.2895 15.406 14.3722 15.4437 14.4632C15.4814 14.5543 15.5008 14.6519 15.5008 14.7504C15.5008 14.849 15.4814 14.9465 15.4437 15.0376C15.406 15.1286 15.3507 15.2114 15.281 15.281C15.2114 15.3507 15.1286 15.406 15.0376 15.4437C14.9465 15.4814 14.849 15.5008 14.7504 15.5008C14.6519 15.5008 14.5543 15.4814 14.4632 15.4437C14.3722 15.406 14.2895 15.3507 14.2198 15.281L8.00042 9.06073L1.78104 15.281C1.64031 15.4218 1.44944 15.5008 1.25042 15.5008C1.05139 15.5008 0.860523 15.4218 0.719792 15.281C0.579062 15.1403 0.5 14.9494 0.5 14.7504C0.5 14.5514 0.579062 14.3605 0.719792 14.2198L6.9401 8.00042L0.719792 1.78104C0.579062 1.64031 0.5 1.44944 0.5 1.25042C0.5 1.05139 0.579062 0.860523 0.719792 0.719792C0.860523 0.579062 1.05139 0.5 1.25042 0.5C1.44944 0.5 1.64031 0.579062 1.78104 0.719792L8.00042 6.9401L14.2198 0.719792C14.3605 0.579062 14.5514 0.5 14.7504 0.5C14.9494 0.5 15.1403 0.579062 15.281 0.719792C15.4218 0.860523 15.5008 1.05139 15.5008 1.25042C15.5008 1.44944 15.4218 1.64031 15.281 1.78104L9.06073 8.00042L15.281 14.2198Z"
                  fill={screenMode === 'dark' ? '#ABADBA' : '#747B8B'}
                />
              </svg>
            </div>
          </div>
          <div className="body">
            <div className="description">
              Nhập email i đăng ký của bạn, chúng tôi sẽ gửi mã để bạn thiết lập
              lại mật khẩu.
            </div>
            <div className="form">
              <div className="label">Email / SĐT:</div>
              <div className="input-email">
                <input
                  value={acc}
                  onChange={(e) => setAcc(e.target.value)}
                  type="text"
                  placeholder="Nhập email  của bạn"
                />
                <div
                  onClick={handleSendCode}
                  disabled={!isValidInput || loading}
                  className={isValidInput ? 'action' : 'btn-send-code'}
                >
                  {loading ? 'Đang gửi mã...' : 'Gửi mã'}
                </div>
                {isSendCode && (
                  <div className="text-des">
                    Chúng tôi vừa gửi cho bạn email chứa mã xác nhận. Vui lòng
                    kiểm tra email của bạn và nhập mã xác nhận vào ô bên dưới.
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
                        <span onClick={handleSendCode} className="send-again">
                          Gửi lại một lần nữa
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="form">
              <div className="label">Mã xác nhận:</div>
              <div className="input-email">
                <input
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  type="text"
                  placeholder="Nhập mã xác nhận"
                />
              </div>
            </div>
            <div
              className={
                enteredCode !== passcode || enteredCode === ''
                  ? 'btn-submit'
                  : 'action-submit'
              }
              onClick={handleResetPassword}
              disabled={enteredCode !== passcode || enteredCode === ''}
            >
              Reset mật khẩu
            </div>
          </div>
        </div>
      </StyledModalForgot>
      <ModalChangePassword
        setOpenForgot={setOpenForgot}
        acc={acc}
        screenMode={screenMode}
        changeLayout={changeLayout}
        setChangeLayout={setChangeLayout}
        type={'forgotPassword'}
      />
    </>
  );
};
