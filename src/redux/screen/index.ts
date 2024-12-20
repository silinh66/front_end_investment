import { createSlice } from '@reduxjs/toolkit';

type ScreenState = {
  mode: string;
};

const initialState: ScreenState = {
  mode: 'dark',
};

const { reducer, actions } = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    toggleChangeScreenMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleChangeScreenMode } = actions;

export default reducer;
