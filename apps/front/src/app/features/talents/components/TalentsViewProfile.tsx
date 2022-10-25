import { Box, Drawer } from '@mui/material';
import { ArrowLeft2 } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../components/AtButton/AtButton';
import AtLine from '../../../components/AtLine/AtLine';
import AtTypography from '../../../components/AtTypography/AtTypography';
import { blue, grey3 } from '../../../utils/colors';
import { convertHexToRGBA } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector';

const StyledFrame = styled(Box)`
  background-color: ${convertHexToRGBA(blue, 0.05)};
  border-radius: 5px;
  padding: 20px;
`;

const TalentsViewProfile: React.FunctionComponent = () => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state));
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(handleSelectTalent(null));
  };

  return (
    <Drawer
      anchor={'right'}
      open={selectedTalent !== undefined}
      onClose={handleClose}
      transitionDuration={{ enter: 600, exit: 300 }}
    >
      <Box width={'50vw'}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          padding={'25px 20px 0 20px'}
        >
          <Box display={'flex'} gap={'20px'} alignItems={'center'}>
            <AtButton
              variant={AtButtonVariant.Contained}
              startIcon={<ArrowLeft2 />}
              kind={AtButtonKind.Default}
              onClick={() => handleClose()}
            />
            <AtTypography variant={'h4'}>
              {selectedTalent?.fullName}
            </AtTypography>
          </Box>
          <AtTypography color={grey3}>Applied: 23.07.2022</AtTypography>
        </Box>

        <AtLine spacing={25} />

        <Box padding={'0 20px 25px 20px'}>
          <StyledFrame>
            <AtTypography variant={'h5'}>Skills</AtTypography>
          </StyledFrame>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TalentsViewProfile;
