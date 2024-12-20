import { RenderModal } from '@/utils/renderHepler';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ScreenState = {
  modal: React.ReactNode;
};

const initialState: ScreenState = {
  modal: <></>,
};

const { reducer, actions } = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    updateModalState: (state, action: PayloadAction<React.ReactNode>) => {
      state.modal =
        action.payload === null ? (
          <div></div>
        ) : (
          <RenderModal>{action.payload}</RenderModal>
        );
    },
  },
});
export const { updateModalState } = actions;

export default reducer;
