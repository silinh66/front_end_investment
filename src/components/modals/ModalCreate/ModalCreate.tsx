/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import { Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { StyledCreate } from './styled';

export const ModalCreate = ({
  modal2Open,
  user,
  setModal2Open,
  title,
  handleChange,
  handleChangeDes,
  description,
  submit,
}: any) => {
  const screenMode = useSelector(screenModeSelector);
  const { TextArea } = Input;
  const [isFormValid, setIsFormValid] = useState(false);
  const closeModal = () => {
    setModal2Open(false);
  };
  useEffect(() => {
    if (description && title === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [description, title]);
  return (
    <StyledCreate
      show={modal2Open}
      screen_mode={screenMode}
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
        <div className="body">
          <div className="head-author">
            <img
              src={user?.user?.avatar}
              alt=""
              className="head-author__avatar"
            />

            <span className="name">{user?.user?.name}</span>
          </div>
          <div className="first">
            <TextArea
              style={{
                resize: 'none',
              }}
              value={title}
              onChange={handleChange}
              rows={4}
              className="no-resize-textarea"
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>
          <div className="second">
            <ReactQuill
              value={description}
              onChange={handleChangeDes}
              placeholder="Nhập nôi dung, sử dụng Markdown, BBCode, hoặc HTML để định dạng, kéo hoặc dán ảnh"
              theme="snow" // Chủ đề "snow" sẽ cung cấp thanh công cụ như trong hình
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </div>
        </div>
        <div className="footer">
          <div onClick={closeModal} className="cancel">
            Huỷ
          </div>
          <div
            onClick={isFormValid ? submit : undefined}
            className={`save ${isFormValid ? 'click' : 'disabled'}`}
            style={{ cursor: isFormValid ? 'pointer' : 'not-allowed' }}
          >
            Tiếp
          </div>
        </div>
      </div>
    </StyledCreate>
  );
};
