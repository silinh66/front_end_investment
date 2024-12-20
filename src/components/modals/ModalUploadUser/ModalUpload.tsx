/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { StyledUpload } from './styled';
import avt from '@assets/icons/avt-upload.svg';
import icon_upload from '@assets/icons/icon-upload.svg';
import icon_upload_light from '@assets/icons/icon_upload_light.svg';
import { makeUploadImage } from '@/components/ConvertLinkImage';
import { DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { ModalChangePassword } from '../ModalChangePassword/ModalChangePassword';
export const ModalUpload = ({
  user,
  updateProfile,
  setUpdateProfile,
  handleUpdateUser,
  myLinkYoutube,
  setMyLinkYoutube,
  setAvt,
  onChange,
  dateFormatList,
  dateBirthDay,
  myLinkTikTok,
  avt,
  setMyLinkTikTok,
}: any) => {
  const screenMode = useSelector(screenModeSelector);
  const [showLayoutPass, setShowLayoutPass] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [preview, setPreview] = useState(null);

  const closeModal = () => {
    setUpdateProfile(false);
  };
  useEffect(() => {
    const isValid =
      user?.name && dateBirthDay && myLinkYoutube && myLinkTikTok && avt;
    setIsFormValid(!!isValid); // Ensure the values are not null or empty
  }, [user?.name, dateBirthDay, myLinkYoutube, myLinkTikTok, avt]);
  return (
    <>
      <StyledUpload
        screen_mode={screenMode}
        show={updateProfile}
        onClick={closeModal}
      >
        <div className="wrapper-modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <div className="title-modal">Sửa thông tin cá nhân</div>
            <div
              className="close"
              style={{ cursor: 'pointer' }}
              onClick={closeModal}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.281 14.2198C15.3507 14.2895 15.406 14.3722 15.4437 14.4632C15.4814 14.5543 15.5008 14.6519 15.5008 14.7504C15.5008 14.849 15.4814 14.9465 15.4437 15.0376C15.406 15.1286 15.3507 15.2114 15.281 15.281C15.2114 15.3507 15.1286 15.406 15.0376 15.4437C14.9465 15.4814 14.849 15.5008 14.7504 15.5008C14.6519 15.5008 14.5543 15.4814 14.4632 15.4437C14.3722 15.406 14.2895 15.3507 14.2198 15.281L8.00042 9.06073L1.78104 15.281C1.64031 15.4218 1.44944 15.5008 1.25042 15.5008C1.05139 15.5008 0.860523 15.4218 0.719792 15.281C0.579062 15.1403 0.5 14.9494 0.5 14.7504C0.5 14.5514 0.579062 14.3605 0.719792 14.2198L6.9401 8.00042L0.719792 1.78104C0.579062 1.64031 0.5 1.44944 0.5 1.25042C0.5 1.05139 0.579062 0.860523 0.719792 0.719792C0.860523 0.579062 1.05139 0.5 1.25042 0.5C1.44944 0.5 1.64031 0.579062 1.78104 0.719792L8.00042 6.9401L14.2198 0.719792C14.3605 0.579062 14.5514 0.5 14.7504 0.5C14.9494 0.5 15.1403 0.579062 15.281 0.719792C15.4218 0.860523 15.5008 1.05139 15.5008 1.25042C15.5008 1.44944 15.4218 1.64031 15.281 1.78104L9.06073 8.00042L15.281 14.2198Z"
                  fill="#ABADBA"
                />
              </svg>
            </div>
          </div>
          <div className="body-upload">
            <div className="auth-modal">
              <div className="avt">
                {preview ? (
                  <div className="avt-upload">
                    <img
                      className="preview-image"
                      src={preview}
                      alt="Preview"
                    />
                  </div>
                ) : (
                  <div className="avt-upload">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M40 0C17.908 0 0 17.908 0 40C0 62.092 17.908 80 40 80C62.092 80 80 62.092 80 40C80 17.908 62.092 0 40 0ZM26 30C26 28.1615 26.3621 26.341 27.0657 24.6424C27.7693 22.9439 28.8005 21.4005 30.1005 20.1005C31.4005 18.8005 32.9439 17.7693 34.6424 17.0657C36.341 16.3621 38.1615 16 40 16C41.8385 16 43.659 16.3621 45.3576 17.0657C47.0561 17.7693 48.5995 18.8005 49.8995 20.1005C51.1995 21.4005 52.2307 22.9439 52.9343 24.6424C53.6379 26.341 54 28.1615 54 30C54 33.713 52.525 37.274 49.8995 39.8995C47.274 42.525 43.713 44 40 44C36.287 44 32.726 42.525 30.1005 39.8995C27.475 37.274 26 33.713 26 30ZM65.032 59.936C62.0368 63.7014 58.23 66.7419 53.8957 68.8308C49.5614 70.9197 44.8114 72.003 40 72C35.1886 72.003 30.4386 70.9197 26.1043 68.8308C21.77 66.7419 17.9632 63.7014 14.968 59.936C21.452 55.284 30.3 52 40 52C49.7 52 58.548 55.284 65.032 59.936Z"
                        fill={screenMode === 'dark' ? '#575A6A' : '#B1B5BE'}
                      />
                    </svg>
                  </div>
                )}

                <label htmlFor="img">
                  <img
                    className="icon-upload"
                    src={
                      screenMode === 'dark' ? icon_upload : icon_upload_light
                    }
                    alt="Upload"
                  />
                </label>
                <input
                  className="upload"
                  onChange={async (e: any) => {
                    const file = e.target.files[0];
                    let response = await makeUploadImage(file);
                    let filePreview = await URL.createObjectURL(file);

                    setAvt(filePreview);
                    setPreview(filePreview);
                    // Clear the input value after setting the image
                    e.target.value = null;
                  }}
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                />
              </div>
              <div className="name">{user?.name}</div>
            </div>
            <div className="form-input">
              <div className="text">Mật khẩu:</div>
              <input
                style={{ cursor: 'pointer' }}
                type="button"
                value="Thay đổi mật khẩu"
                onClick={() => {
                  setShowLayoutPass(true);
                  setUpdateProfile(false);
                }}
              />
            </div>
            <div className="form-input">
              <div className="text">Sinh nhật:</div>
              <DatePicker
                value={dateBirthDay}
                format={dateFormatList}
                onChange={onChange}
              />
            </div>
            {/* <div className="form-input">
              <div className="text">Youtube:</div>
              <input
                type="text"
                value={myLinkYoutube}
                onChange={(e) => setMyLinkYoutube(e.target.value)}
              />
            </div>
            <div className="form-input">
              <div className="text">Tiktok:</div>
              <input
                type="text"
                value={myLinkTikTok}
                onChange={(e) => setMyLinkTikTok(e.target.value)}
              />
            </div> */}
            <div className="wrapper">
              <div className="cancel">Huỷ</div>
              <div
                onClick={handleUpdateUser}
                className={`save click`}
                style={{ cursor: 'pointer' }}
              >
                Lưu
              </div>
            </div>
          </div>
        </div>
      </StyledUpload>
      <ModalChangePassword
        screenMode={screenMode}
        setChangeLayout={setShowLayoutPass}
        changeLayout={showLayoutPass}
        type="changePass"
      />
    </>
  );
};
