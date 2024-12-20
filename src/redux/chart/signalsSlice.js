// signalsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // trạng thái ban đầu
  someState: 0, // Khởi tạo giá trị ban đầu
};

const signalsSlice = createSlice({
  name: 'signals',
  initialState,
  reducers: {
    fetchListSignals: (state, action) => {
      state.someState = Math.random();
      // Bạn có thể thay đổi state ở đây nếu cần,
      // nhưng mục đích chính là để sử dụng action này như một trigger
    },
  },
});

export const { fetchListSignals } = signalsSlice.actions;

export default signalsSlice.reducer;
