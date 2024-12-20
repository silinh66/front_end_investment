import { useCallback } from 'react';
import { toggleChangeScreenMode } from '.';
import { useDispatch } from 'react-redux';

const useScreenMode = () => {
  const dispatch = useDispatch();

  const handleChangeScreenMode = useCallback(() => {
    dispatch(toggleChangeScreenMode());
  }, [dispatch]);

  return { handleChangeScreenMode };
};

export default useScreenMode;
