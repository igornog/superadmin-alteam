import { Box, Drawer } from '@mui/material';
import { ArrowLeft2 } from 'iconsax-react';
import React from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../components/AtButton/AtButton';
import AtLine from '../../../../components/AtLine/AtLine';
import AtSpace from '../../../../components/AtSpace/AtSpace';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey3 } from '../../../../utils/colors';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../../utils/redux/actions/talents.action';
import { getActiveTalent } from '../../../../utils/redux/selectors/talents.selector';
import TalentAbout from './TalentAbout';
import TalentAttachments from './TalentAttachments';
import TalentGeneral from './TalentGeneral';
import TalentNotes from './TalentNotes';
import TalentSkills from './TalentSkills';

const TalentViewProfile: React.FunctionComponent = () => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state));
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(handleSelectTalent(null));
  };

  return (
    <Drawer
      anchor={'right'}
      open={selectedTalent !== false}
      onClose={handleClose}
      transitionDuration={{ enter: 600, exit: 300 }}
    >
      <Box width={'50vw'}>
        {selectedTalent ? (
          <>
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
              <TalentSkills talent={selectedTalent} />

              <AtSpace direction={'vertical'} spacing={'25'} />

              <TalentGeneral talent={selectedTalent} />

              <AtSpace direction={'vertical'} spacing={'25'} />

              <TalentAbout talent={selectedTalent} />

              <AtSpace direction={'vertical'} spacing={'25'} />

              <TalentAttachments talent={selectedTalent} />

              <AtSpace direction={'vertical'} spacing={'25'} />

              <TalentNotes talent={selectedTalent} />
            </Box>
          </>
        ) : null}
      </Box>
    </Drawer>
  );
};

export default TalentViewProfile;
