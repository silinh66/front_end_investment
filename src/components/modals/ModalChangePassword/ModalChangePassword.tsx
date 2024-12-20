/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { StyledModalChangePassword } from './styled';
import { config } from '@/config/env';
import axios from 'axios';
import { Button, Input, Modal, Form, Flex } from 'antd';

import { StyledModalSignIn } from '@/components/common/Header/AuthGroup/styled';
import GoogleIcon from '@/assets/icons/google_icon.svg';
import { useAppSelector } from '@/redux/hooks';
import useBodyScrollLock from '@/components/UseBodyScrollLock/useBodyScrollLock';

export const ModalChangePassword = ({
  acc,
  screenMode,
  changeLayout,
  setChangeLayout,
  type,
}) => {
  const { user } = useAppSelector((state: RootState) => state.app);
  const [form] = Form.useForm();
  const [oldPass, setOldPass] = useState('');
  const [passNew, setPassNew] = useState('');
  const [passNewDone, setPassNewDone] = useState('');

  const [error, setError] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassNewDone, setShowPassNewDone] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalStates, setModalStates] = useState({
    modalSignInVisible: false,
    modalSignUpVisible: false,
    modalSignInSuccessVisible: false,
    modalSignUpSuccessVisible: false,
    modalNotificationVisible: false,
  });
  const toggleModal = () => {
    setModalStates((prev) => ({
      ...prev,
      modalSignInVisible: !prev.modalSignInVisible,
      modalSignUpVisible: !prev.modalSignUpVisible,
    }));
  };
  const openSignInModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignInVisible: true }));
  };
  const closeSignInModal = () => {
    setModalStates((prev) => ({ ...prev, modalSignInVisible: false }));
  };
  const handleGGLogin = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user);
        resgiterGG();
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert('An error occurred during Google sign-in. Please try again.');
      });
  };
  const closeModal = () => {
    setPassNew('');
    setPassNewDone('');
    setOldPass('');
    setChangeLayout(false);
    setDone(false);
    setShowOldPass(false);
    setShowPassNew(false);
    setShowPassNewDone(false);
  };

  const handleSubmit = async () => {
    // Clear previous error
    setError('');
    if (passNew.length < 8) {
      setError('Mật khẩu phải đủ 8 ký tự trở lên');
      return;
    }

    // Check if both password fields are filled
    if (!passNew || !passNewDone) {
      setError('Both password fields are required.');
      return;
    }

    // Check if new password and confirmation password match
    if (passNew !== passNewDone) {
      setError('Mật khẩu không trùng khớp!');
      return;
    }

    try {
      let response;

      // Dynamically choose which API to call based on `type`
      if (type === 'changePass') {
        response = await axios.post(
          `${config.app.VITE_APP_API_URL}/change-password`,
          {
            userID: userID,
            currentPassword: oldPass,
            newPassword: passNewDone,
          }
        );
      } else {
        response = await axios.post(
          `${config.app.VITE_APP_API_URL}/change-password-contact`,
          {
            email: acc, // acc should be the email
            password: passNew, // passNew should be the new password
          }
        );
      }
      if (res.status === 200) {
        setDone(true);
      }
    } catch (error) {
      alert('Failed to update password');
    }
  };

  const handleSignIn = (values: any) => {
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
  const onFinishFailed = (errorInfo: any) => {};
  return (
    <StyledModalChangePassword
      screen_mode={screenMode}
      // show={changeLayout}
      onClick={closeModal}
    >
      {' '}
      <div className="wrapper-modal" onClick={(e) => e.stopPropagation()}>
        {!done ? (
          <div className="header">
            <div className="title-modal">
              {' '}
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.5 7V4.5C3.5 3.30653 3.97411 2.16193 4.81802 1.31802C5.66194 0.474106 6.80653 0 8 0C9.19348 0 10.3381 0.474106 11.182 1.31802C12.0259 2.16193 12.5 3.30653 12.5 4.5V7H15C15.265 7 15.5192 7.10522 15.7068 7.29254C15.8943 7.47986 15.9997 7.73396 16 7.999V19C16.0004 19.1314 15.9748 19.2616 15.9247 19.3832C15.8746 19.5047 15.8009 19.6151 15.708 19.708C15.6151 19.8009 15.5047 19.8746 15.3832 19.9247C15.2617 19.9748 15.1314 20.0004 15 20H1C0.734961 20 0.480759 19.8948 0.293251 19.7075C0.105744 19.5201 0.000269571 19.266 4.52762e-06 19.001V8C-0.000391556 7.86857 0.0252037 7.73835 0.0753181 7.61685C0.125433 7.49534 0.199077 7.38495 0.292014 7.29201C0.384952 7.19907 0.495349 7.12543 0.616853 7.07531C0.738357 7.0252 0.868572 6.9996 1 7H3.5ZM5 7H11V4.5C11 3.70435 10.6839 2.94129 10.1213 2.37868C9.55872 1.81607 8.79565 1.5 8 1.5C7.20436 1.5 6.44129 1.81607 5.87868 2.37868C5.31607 2.94129 5 3.70435 5 4.5V7ZM7.4 13.875V16H8.60001V13.875C8.91585 13.7372 9.17459 13.4948 9.33273 13.1886C9.49088 12.8824 9.53877 12.5311 9.46836 12.1938C9.39796 11.8564 9.21354 11.5536 8.94613 11.3362C8.67872 11.1189 8.34461 11.0002 8 11.0002C7.65539 11.0002 7.32129 11.1189 7.05388 11.3362C6.78647 11.5536 6.60205 11.8564 6.53165 12.1938C6.46124 12.5311 6.50913 12.8824 6.66727 13.1886C6.82542 13.4948 7.08416 13.7372 7.4 13.875Z"
                  fill="white"
                  fillOpacity="0.8"
                />
              </svg>
              Tạo mật khẩu mới
            </div>
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
        ) : (
          <div className="header-done">
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
        )}
        {!done ? (
          <div className="body">
            {type === 'changePass' && (
              <div className="form">
                <div className="label">Mật khẩu cũ:</div>
                <div className="input-email">
                  <input
                    type={showOldPass ? 'text' : 'password'}
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                  <div
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="btn-show-pass"
                  >
                    {showOldPass ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 21 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 18.2227C19.1078 18.2227 22 12 22 12C22 12 19.1844 5.7704 12 5.77735C4.81561 5.7843 2 12 2 12C2 12 4.89222 18.2227 12 18.2227ZM12 15.1606C13.7454 15.1606 15.1604 13.7457 15.1604 12.0002C15.1604 10.2548 13.7454 8.83983 12 8.83983C10.2546 8.83983 8.8396 10.2548 8.8396 12.0002C8.8396 13.7457 10.2546 15.1606 12 15.1606Z"
                          fill="#818498"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.2433 10.538L16.6448 12.8821L15.8418 13.6667L2.9842 1.11795L3.78723 0.333374L5.86299 2.35804C6.86696 1.99583 7.92899 1.81104 8.99935 1.81231C12.6418 1.81231 15.7963 3.91831 17.3327 6.98858C16.6257 8.40687 15.563 9.6278 14.2433 10.538ZM8.10844 4.55056L11.4971 7.85819C11.6661 7.39665 11.6974 6.89773 11.5874 6.4195C11.4773 5.94127 11.2303 5.50338 10.8752 5.15679C10.5202 4.81019 10.0716 4.56915 9.58161 4.46169C9.09166 4.35424 8.58053 4.3848 8.10768 4.54982L8.10844 4.55056ZM12.1365 11.6199C11.1322 11.9819 10.0699 12.1664 8.99935 12.1648C5.35693 12.1648 2.20238 10.0588 0.666016 6.98858C1.37304 5.57029 2.43572 4.34936 3.75541 3.43914L6.50162 6.11897C6.33257 6.58051 6.30126 7.07942 6.41134 7.55766C6.52143 8.03589 6.76837 8.47378 7.12345 8.82037C7.47854 9.16697 7.92715 9.40801 8.41709 9.51546C8.90704 9.62292 9.41817 9.59236 9.89102 9.42734L12.1365 11.6191V11.6199Z"
                          fill="#818498"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="text-header">
              Vui lòng nhập mật khẩu mới của bản. Mật khẩu cần có ít nhất 8 ký
              tự.
            </div>
            <div className="form">
              <div className="label">Mật khẩu mới:</div>
              <div className="input-email">
                <input
                  type={showPassNew ? 'text' : 'password'}
                  value={passNew}
                  onChange={(e) => setPassNew(e.target.value)}
                />
                <div
                  onClick={() => setShowPassNew(!showPassNew)}
                  className="btn-show-pass"
                >
                  {showPassNew ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 21 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 18.2227C19.1078 18.2227 22 12 22 12C22 12 19.1844 5.7704 12 5.77735C4.81561 5.7843 2 12 2 12C2 12 4.89222 18.2227 12 18.2227ZM12 15.1606C13.7454 15.1606 15.1604 13.7457 15.1604 12.0002C15.1604 10.2548 13.7454 8.83983 12 8.83983C10.2546 8.83983 8.8396 10.2548 8.8396 12.0002C8.8396 13.7457 10.2546 15.1606 12 15.1606Z"
                        fill="#818498"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.2433 10.538L16.6448 12.8821L15.8418 13.6667L2.9842 1.11795L3.78723 0.333374L5.86299 2.35804C6.86696 1.99583 7.92899 1.81104 8.99935 1.81231C12.6418 1.81231 15.7963 3.91831 17.3327 6.98858C16.6257 8.40687 15.563 9.6278 14.2433 10.538ZM8.10844 4.55056L11.4971 7.85819C11.6661 7.39665 11.6974 6.89773 11.5874 6.4195C11.4773 5.94127 11.2303 5.50338 10.8752 5.15679C10.5202 4.81019 10.0716 4.56915 9.58161 4.46169C9.09166 4.35424 8.58053 4.3848 8.10768 4.54982L8.10844 4.55056ZM12.1365 11.6199C11.1322 11.9819 10.0699 12.1664 8.99935 12.1648C5.35693 12.1648 2.20238 10.0588 0.666016 6.98858C1.37304 5.57029 2.43572 4.34936 3.75541 3.43914L6.50162 6.11897C6.33257 6.58051 6.30126 7.07942 6.41134 7.55766C6.52143 8.03589 6.76837 8.47378 7.12345 8.82037C7.47854 9.16697 7.92715 9.40801 8.41709 9.51546C8.90704 9.62292 9.41817 9.59236 9.89102 9.42734L12.1365 11.6191V11.6199Z"
                        fill="#818498"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="form">
              <div className="label">Xác nhận mật khẩu:</div>
              <div className="input-email">
                <input
                  value={passNewDone}
                  onChange={(e) => setPassNewDone(e.target.value)}
                  type={showPassNewDone ? 'text' : 'password'}
                />
                <div
                  onClick={() => setShowPassNewDone(!showPassNewDone)}
                  className="btn-show-pass"
                >
                  {showPassNewDone ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 21 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 18.2227C19.1078 18.2227 22 12 22 12C22 12 19.1844 5.7704 12 5.77735C4.81561 5.7843 2 12 2 12C2 12 4.89222 18.2227 12 18.2227ZM12 15.1606C13.7454 15.1606 15.1604 13.7457 15.1604 12.0002C15.1604 10.2548 13.7454 8.83983 12 8.83983C10.2546 8.83983 8.8396 10.2548 8.8396 12.0002C8.8396 13.7457 10.2546 15.1606 12 15.1606Z"
                        fill="#818498"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.2433 10.538L16.6448 12.8821L15.8418 13.6667L2.9842 1.11795L3.78723 0.333374L5.86299 2.35804C6.86696 1.99583 7.92899 1.81104 8.99935 1.81231C12.6418 1.81231 15.7963 3.91831 17.3327 6.98858C16.6257 8.40687 15.563 9.6278 14.2433 10.538ZM8.10844 4.55056L11.4971 7.85819C11.6661 7.39665 11.6974 6.89773 11.5874 6.4195C11.4773 5.94127 11.2303 5.50338 10.8752 5.15679C10.5202 4.81019 10.0716 4.56915 9.58161 4.46169C9.09166 4.35424 8.58053 4.3848 8.10768 4.54982L8.10844 4.55056ZM12.1365 11.6199C11.1322 11.9819 10.0699 12.1664 8.99935 12.1648C5.35693 12.1648 2.20238 10.0588 0.666016 6.98858C1.37304 5.57029 2.43572 4.34936 3.75541 3.43914L6.50162 6.11897C6.33257 6.58051 6.30126 7.07942 6.41134 7.55766C6.52143 8.03589 6.76837 8.47378 7.12345 8.82037C7.47854 9.16697 7.92715 9.40801 8.41709 9.51546C8.90704 9.62292 9.41817 9.59236 9.89102 9.42734L12.1365 11.6191V11.6199Z"
                        fill="#818498"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
            <div
              className={
                passNew !== passNewDone || passNew === '' || passNewDone === ''
                  ? 'btn-submit'
                  : 'action-submit'
              }
              onClick={handleSubmit}
            >
              Tạo mật khẩu mới
            </div>
          </div>
        ) : (
          <div className="body-done">
            <div className="content">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.6125 23.1579C26.86 23.1579 22.1914 27.8265 22.1914 33.5789C22.1914 39.3314 26.86 44 32.6125 44C38.3649 44 43.0335 39.3314 43.0335 33.5789C43.0335 27.8265 38.3649 23.1579 32.6125 23.1579ZM30.5282 38.7895L25.3177 33.5789L26.7871 32.1096L30.5282 35.8403L38.4378 27.9307L39.9072 29.4105L30.5282 38.7895Z"
                  fill="#589B4B"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.71772 8.68421V13.5089H2.89618C2.64289 13.508 2.3896 13.5575 2.1544 13.6542C2.04132 13.6997 1.93729 13.7554 1.83779 13.8204C1.72924 13.8933 1.62521 13.9776 1.53022 14.0723C1.3493 14.2518 1.20909 14.4646 1.10958 14.6993C1.0146 14.9336 0.964844 15.1849 0.964844 15.4385V36.6685C0.964844 36.9828 1.04174 37.289 1.18647 37.5623C1.27693 37.7339 1.39001 37.8925 1.53022 38.0319C1.89206 38.3934 2.38507 38.5964 2.89618 38.5964H20.9023C20.242 37.0563 19.8756 35.3602 19.8756 33.5789C19.8756 26.8063 25.1721 21.263 31.8435 20.865V15.4368C31.8435 14.9251 31.64 14.435 31.2782 14.0734C30.9163 13.7118 30.4233 13.5089 29.9122 13.5089H25.0861V8.68421C25.0861 6.38114 24.1725 4.17221 22.5442 2.54364C20.9159 0.915065 18.7087 0 16.4019 0C14.0997 0 11.8925 0.915065 10.2642 2.54364C8.6359 4.17221 7.71772 6.38114 7.71772 8.68421ZM22.1914 8.68421V13.5089H10.6125V8.68421C10.6125 7.14864 11.2231 5.67612 12.3086 4.59031C12.8649 4.0351 13.5208 3.60429 14.2354 3.31566C14.9184 3.04032 15.6511 2.89474 16.4019 2.89474C17.9398 2.89474 19.4097 3.50478 20.4953 4.59031C21.5808 5.67612 22.1914 7.14864 22.1914 8.68421ZM15.244 30.8773V26.7763C14.9636 26.6536 14.7058 26.4883 14.4796 26.2875C14.2173 26.0529 13.9957 25.7702 13.8329 25.4516C13.6384 25.0782 13.5298 24.67 13.5117 24.2556C13.5027 24.0144 13.5208 23.7713 13.5705 23.5319C13.7062 22.8809 14.0635 22.2965 14.5792 21.877C15.0948 21.4575 15.737 21.2285 16.4019 21.2285C16.6597 21.2285 16.913 21.2625 17.1573 21.3278C17.5463 21.4326 17.9126 21.6189 18.2292 21.877C18.7449 22.2965 19.1022 22.8809 19.2379 23.5319C19.3736 24.1829 19.2786 24.8608 18.9755 25.4516C18.668 26.0425 18.1704 26.5103 17.5598 26.7763V30.8773H15.244Z"
                  fill="#589B4B"
                />
              </svg>
              <div className="text-top">Thiết lập mật khẩu mới thành công</div>
              <div className="des-text">
                Bạn có thể đăng nhập vào hệ thống với mật khẩu mới
              </div>
            </div>
            <div className="box-btn">
              <div className="cancel" onClick={closeModal}>
                Đóng
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openSignInModal();
                  closeModal();
                }}
                className="login"
              >
                Đăng nhập
              </div>
            </div>
          </div>
        )}
      </div>
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
                          fill="#ABADBA"
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
                          fill="#ABADBA"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.5331 6.69176H10.6998V4.33342C10.6998 3.35212 10.31 2.41101 9.6161 1.71713C8.92222 1.02324 7.98111 0.633423 6.9998 0.633423C6.0185 0.633423 5.07739 1.02324 4.38351 1.71713C3.68962 2.41101 3.2998 3.35212 3.2998 4.33342V6.69176H2.46647C1.89184 6.69176 1.34074 6.92003 0.934407 7.32636C0.528078 7.73269 0.299805 8.28379 0.299805 8.85842V15.2003C0.301406 15.7744 0.530168 16.3245 0.936107 16.7305C1.34205 17.1364 1.89239 17.3652 2.46647 17.3668H11.5334C12.1075 17.3652 12.6576 17.1364 13.0635 16.7305C13.4694 16.3245 13.6982 15.7742 13.6998 15.2001V8.85842C13.6998 8.28379 13.4715 7.73269 13.0652 7.32636C12.6589 6.92003 12.1078 6.69176 11.5331 6.69176ZM4.2998 4.33342C4.2998 3.61734 4.58427 2.93058 5.09062 2.42423C5.59696 1.91789 6.28372 1.63342 6.9998 1.63342C7.71589 1.63342 8.40264 1.91789 8.90899 2.42423C9.41534 2.93058 9.6998 3.61734 9.6998 4.33342V6.69176H4.2998V4.33342ZM12.6998 15.1999C12.6977 15.5087 12.5741 15.8043 12.3557 16.0226C12.1373 16.241 11.8414 16.3647 11.5326 16.3668L2.46678 16.3668C2.15793 16.3647 1.86233 16.241 1.64393 16.0226C1.42553 15.8042 1.30191 15.5086 1.2998 15.1998V8.85842C1.2998 8.549 1.42272 8.25226 1.64151 8.03347C1.86031 7.81467 2.15705 7.69176 2.46647 7.69176H11.5331C11.8426 7.69176 12.1393 7.81467 12.3581 8.03347C12.5769 8.25226 12.6998 8.54901 12.6998 8.85842V15.1999ZM4.21647 6.77509V4.33342C4.21647 4.33342 4.21647 4.33342 4.21647 4.33342V6.77509Z"
                          fill="#ABADBA"
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
    </StyledModalChangePassword>
  );
};
