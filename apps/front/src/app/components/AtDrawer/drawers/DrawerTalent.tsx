import { Box } from '@mui/material';
import { CloseSquare, TickSquare } from 'iconsax-react';
import React from 'react';
import TalentAbout from '../../../features/talents/components/TalentViewProfile/TalentAbout';
import TalentAttachments from '../../../features/talents/components/TalentViewProfile/TalentAttachments';
import TalentGeneral from '../../../features/talents/components/TalentViewProfile/TalentGeneral';
import TalentLinks from '../../../features/talents/components/TalentViewProfile/TalentLinks';
import TalentNotes from '../../../features/talents/components/TalentViewProfile/TalentNotes';
import TalentSkills from '../../../features/talents/components/TalentViewProfile/TalentSkills';
import { grey3, grey5 } from '../../../utils/colors';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector';
import { ModalVariant } from '../../../utils/redux/types/settings.type';
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../AtButton/AtButton';
import AtTypography from '../../AtTypography/AtTypography';
import AtDrawerHeader from '../AtDrawerHeader';

const DrawerTalent: React.FunctionComponent = () => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state));
  const dispatch = useAppDispatch();

  const handleDecline = () => {
    dispatch(handleModal(ModalVariant.DeclineTalent));
  };

  const handleShortlist = () => {
    dispatch(handleModal(ModalVariant.Shortlist));
  };

  return (
    <Box>
      <AtDrawerHeader
        title={
          <AtTypography variant={'h4'}>{selectedTalent?.fullName}</AtTypography>
        }
        sideTitle={
          <AtTypography color={grey3}>Applied: 23.07.2022</AtTypography>
        }
      />

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
    </Box>
  );
};

export default DrawerTalent;
