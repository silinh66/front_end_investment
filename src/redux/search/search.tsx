import { createSlice } from '@reduxjs/toolkit';
const initialState: ScreenState = {
  user: null,
  isLogin: false,
  refresh: true,
  modal: <></>,
};
const { reducer, actions } = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, actions) => {
      state.code = actions.payload;
    },
  },
});
export const { setSearch } = actions;
export default reducer;
