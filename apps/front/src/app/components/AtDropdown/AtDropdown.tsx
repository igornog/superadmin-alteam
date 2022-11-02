import { Box, ClickAwayListener } from '@mui/material';
import Collapse from '@mui/material/Collapse';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { black, grey2, grey5, white } from '../../utils/colors';
import { boxShadow } from '../../utils/theme';
import AtTextField, { AtTextFieldProps } from '../AtTextField/AtTextField';
import AtTypography from '../AtTypography/AtTypography';

export const StyledContentPopover = styled(Collapse)<{
  $minWidth?: number;
  left?: number;
  top?: number;
}>`
  position: absolute;
  min-width: ${({ $minWidth }) => $minWidth && $minWidth + 'px'};
  background-color: ${white};
  box-shadow: ${boxShadow};
  border: 1px solid ${grey5};
  border-radius: 5px;
  margin-top: 5px;
  z-index: 999;
  left: ${({ left }) => left && left + 'px'};
  top: ${({ top }) => top && top + 'px'};
`;

export const StyledDropdownElement = styled.div<{ color: string }>`
  padding: 10px;
  transition: 0.25s;
  display: flex;
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
    transition: 0.5s;

    & p {
      color: ${black};
    }
  }
`;

const AtDropdown: React.FunctionComponent<AtDropdownProps> = (
  props: AtDropdownProps
) => {
  const dropdownRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<DropdownItem>(
    props.listItems[0]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    if (!props.disabled) {
      setAnchorEl(dropdownRef.current);
    }
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    props.handleSelect?.(item);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (selectedItem) {
      handleClose();
    }
  }, [selectedItem]);

  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    setMaxWidth(selectedItem.label.length);
  }, [selectedItem]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        ref={dropdownRef}
        width={props.fullWidth ? '100%' : 'fit-content'}
        position={'relative'}
      >
        <AtTextField
          {...props}
          dropdown={true}
          open={open}
          maxWidth={maxWidth}
          onClick={open ? handleClose : handleClick}
          placeholder={selectedItem ? selectedItem.label : props.placeholder}
        />
        <StyledContentPopover
          in={open}
          $minWidth={dropdownRef?.current?.offsetWidth}
        >
          {props.listItems.map((item: DropdownItem) => (
            <StyledDropdownElement
              key={item.id}
              onClick={() => handleSelect(item)}
              color={item.id === selectedItem?.id ? black : grey2}
            >
              <AtTypography>{item.label}</AtTypography>
            </StyledDropdownElement>
          ))}
        </StyledContentPopover>
      </Box>
    </ClickAwayListener>
  );
};

interface DropdownItem {
  id: number | string;
  label: string;
}

interface AtDropdownProps extends AtTextFieldProps {
  listItems: DropdownItem[];
  handleSelect?: (item: DropdownItem) => void;
}

export default AtDropdown;
