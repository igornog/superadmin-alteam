import { Box, ClickAwayListener } from '@mui/material';
import Collapse from '@mui/material/Collapse';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { black, grey2, grey5, white } from '../../utils/colors';
import { boxShadow } from '../../utils/theme';
import AtTextField, { AtTextFieldProps } from '../AtTextField/AtTextField';
import AtTypography from '../AtTypography/AtTypography';

const StyledContentPopover = styled(Collapse)`
  background-color: ${white};
  box-shadow: ${boxShadow};
  border: 1px solid ${grey5};
  border-radius: 5px;
  margin-top: 5px;
`;

const StyledElement = styled.div`
  padding: 10px;
  transition: 0.25s;
  display: flex;

  &:hover {
    cursor: pointer;
    transition: 0.5s;

    & > p {
      color: ${black};
    }
  }
`;

const AtDropdown: React.FunctionComponent<AtDropdownProps> = (
  props: AtDropdownProps
) => {
  const dropdownRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<DropdownItem>();

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

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box ref={dropdownRef} width={'fit-content'}>
        <AtTextField
          {...props}
          dropdown={true}
          open={open}
          onClick={open ? handleClose : handleClick}
          placeholder={selectedItem ? selectedItem.label : props.placeholder}
        />
        <StyledContentPopover in={open}>
          {props.listItems.map((item: DropdownItem) => (
            <StyledElement key={item.id} onClick={() => handleSelect(item)}>
              <AtTypography
                color={item.id === selectedItem?.id ? black : grey2}
              >
                {item.label}
              </AtTypography>
            </StyledElement>
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
