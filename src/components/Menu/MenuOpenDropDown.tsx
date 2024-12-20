import React from 'react';
import { Menu, MenuItem } from '@mui/material';

export const MenuOpenDropDown = ({
  anchorEl,
  setAnchorEl,
  listOptions,
  selectedValue,
  onChange,
  // labelId
}) => {
  const isOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
      }}
    >
      {listOptions.map((option, index) => {
        return (
          <MenuItem
            key={option}
            selected={index === selectedValue}
            onClick={() => {
              onChange(index);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
