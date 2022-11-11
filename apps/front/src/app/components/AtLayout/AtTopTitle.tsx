import { Box, ClickAwayListener, Collapse, styled } from '@mui/material';
import { ArrowLeft2, ArrowDown2 } from 'iconsax-react';
import React, { useState } from 'react';
import { white } from '../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { handleSelectFolder } from '../../utils/redux/actions/tree.action';
import { Page } from '../../utils/redux/types/settings.type';
import { Tree } from '../../utils/redux/types/tree.type';
import { boxShadow } from '../../utils/theme';
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton';
import AtLine from '../AtLine/AtLine';
import AtDropdownTree from '../AtTree/AtDropdownTree';
import AtTypography from '../AtTypography/AtTypography';

export const StyledContentPopover = styled(Collapse)<{
  $minWidth?: number;
  left?: number;
  top?: number;
}>`
  position: sticky;
  min-width: 215px;
  background-color: ${white};
  box-shadow: ${boxShadow};
  border-radius: 5px;
  z-index: 999;
  top: 20px;
  max-height: 650px;
  overflow: auto;
`;

const StyledArrow = styled(ArrowDown2)<{ opened?: boolean }>`
  transition: transform 0.3s;
  transform: rotate(${({ opened }) => (opened ? '180' : '0')}deg);
`;

const AtTopTitle: React.FunctionComponent<AtTopTitle> = (props: AtTopTitle) => {
  const dispatch = useAppDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const tree = useAppSelector((state) => new Tree(state.tree.data));

  const handlePreviousFolder = () => {
    dispatch(handleSelectFolder(props.activeFolder?.idParent));
  };

  const handleClose = () => {
    setOpenDropdown(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        position={'relative'}
        gap={'5px'}
      >
        {!props.activeFolder.isParent() && (
          <Box
            display={'flex'}
            gap={'15px'}
            alignItems={'center'}
            marginRight={'10px'}
          >
            <AtButton
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Contained}
              startIcon={<ArrowLeft2 />}
              onClick={handlePreviousFolder}
            />
            <AtLine direction={'vertical'} />
          </Box>
        )}
        <Box
          position={'relative'}
          display={'flex'}
          alignItems={'center'}
          gap={'5px'}
        >
          <AtTypography variant={'h3'}>
            {props.activeFolder.isParent()
              ? props.activeTab.title
              : props.activeFolder.name}
          </AtTypography>
          {!props.activeFolder.isParent() && (
            <>
              <AtButton
                startIcon={<StyledArrow size={10} opened={openDropdown} />}
                kind={AtButtonKind.Default}
                variant={AtButtonVariant.Text}
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              <Box position={'absolute'} top={'110%'} height={openDropdown ? '100vh' : 0}>
                <StyledContentPopover
                  in={openDropdown}
                  orientation={'vertical'}
                >
                  <AtDropdownTree menu={tree.children} />
                </StyledContentPopover>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

interface AtTopTitle {
  activeTab: Page;
  activeFolder: Tree;
}

export default AtTopTitle;
