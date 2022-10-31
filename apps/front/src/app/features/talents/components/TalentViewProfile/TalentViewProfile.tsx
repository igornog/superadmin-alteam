import { Box, Drawer } from '@mui/material';
import { ArrowLeft2, CloseSquare, TickSquare } from 'iconsax-react';
import React from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../components/AtButton/AtButton';
import AtLine from '../../../../components/AtLine/AtLine';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { black, grey3 } from '../../../../utils/colors';
import { convertHexToRGBA } from '../../../../utils/helpers';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook';
import { handleModal } from '../../../../utils/redux/actions/settings.action';
import { handleSelectTalent } from '../../../../utils/redux/actions/talents.action';
import { getActiveTalent } from '../../../../utils/redux/selectors/talents.selector';
import { ModalVariant } from '../../../../utils/redux/types/settings.type';
import TalentAbout from './TalentAbout';
import TalentAttachments from './TalentAttachments';
import TalentGeneral from './TalentGeneral';
import TalentLinks from './TalentLinks';
import TalentNotes from './TalentNotes';
import TalentSkills from './TalentSkills';

const TalentViewProfile: React.FunctionComponent = () => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state));
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(handleSelectTalent(null));
  };

  const handleDecline = () => {
    dispatch(handleModal(ModalVariant.DeclineTalent));
  };

  const handleShortlist = () => {
    console.log('Shortlisted');
  };

  return (
    <Drawer
      anchor={'right'}
      open={selectedTalent.isEmpty()}
      onClose={handleClose}
      transitionDuration={{ enter: 600, exit: 300 }}
      BackdropProps={{
        style: {
          backgroundColor: convertHexToRGBA(black, 0.5),
        },
      }}
      PaperProps={{
        style: {
          boxShadow: 'none',
        },
      }}
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

            <Box
              display={'flex'}
              flexDirection={'column'}
              padding={'0 20px 25px 20px'}
              gap={'25px'}
            >
              <TalentSkills talent={selectedTalent} />

              <TalentGeneral talent={selectedTalent} />

              <TalentAbout talent={selectedTalent} />

              <TalentLinks talent={selectedTalent} />

              <TalentAttachments talent={selectedTalent} />

              <TalentNotes talent={selectedTalent} />

              <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
                <AtButton
                  onClick={handleDecline}
                  kind={AtButtonKind.Danger}
                  variant={AtButtonVariant.Contained}
                  name={'Decline'}
                  endIcon={<CloseSquare size={16} />}
                />
                <AtButton
                  onClick={handleShortlist}
                  kind={AtButtonKind.Success}
                  variant={AtButtonVariant.Contained}
                  name={'Shortlist'}
                  endIcon={<TickSquare size={16} />}
                />
              </Box>
            </Box>
          </>
        ) : null}
      </Box>
    </Drawer>
  );
};

export default TalentViewProfile;
