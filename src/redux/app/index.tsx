import { IUser } from '@/types/postsType';
import { createSlice } from '@reduxjs/toolkit';
// type User = {
//   name: string;
//   email: string;
//   phone: string;
//   userID: number;
// };
type ScreenState = {
  user: IUser | null;
  isLogin: boolean;
  refresh: boolean;
  modal: React.ReactNode;
};

const initialState: ScreenState = {
  user: null,
  isLogin: false,
  refresh: true,
  modal: <></>,
};

const { reducer, actions } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setLogin: (state) => {
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.isLogin = false;
    },
    refreshAPI: (state) => {
      state.refresh = !state.refresh;
    },
  },
});
export const { setUserInfo, setLogin, setLogout, refreshAPI } = actions;

export default reducer;
