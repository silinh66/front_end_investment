import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const modalSelector = (state: RootState) => {
  return state.modal;
};

export const modalModeSelector = createSelector(
  modalSelector,
  (state) => state.modal
);
