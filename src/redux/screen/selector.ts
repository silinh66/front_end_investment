import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const screenSelector = (state: RootState) => {
  return state.screen;
};

export const screenModeSelector = createSelector(
  screenSelector,
  (state) => state.mode
);
