/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const makeUploadImage = async (imageFile: any) => {
  try {
    if (typeof imageFile !== 'object') {
      // notification.error({
      //   message: "Thông báo",
      //   description: "Chưa có file ảnh.",
      // });
      alert('Chưa có file ảnh.');
      return;
    }

    const uploadPreset = 'online-quiz-dev-topics';
    const formData = new FormData();
    formData.append('cloud_name', 'dw5j6ht9n');
    formData.append('upload_preset', uploadPreset);
    formData.append('file', imageFile);

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dw5j6ht9n/image/upload',
      formData
    );

    return {
      ...response.data,
    };
  } catch (error: any) {
    if (error.response) {
      const { response } = error;
      // notification.error({
      //   message: "Đã xảy ra lôi",
      //   description: get(response, "data.error.message", ""),
      // });
      return;
    }
    throw error;
  }
};
