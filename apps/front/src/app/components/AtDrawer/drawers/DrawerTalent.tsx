import { Box } from '@mui/material';
import { CloseSquare, TickSquare } from 'iconsax-react';
import React, { useState } from 'react';
import TalentAbout from '../../../features/talents/components/TalentViewProfile/TalentAbout';
import TalentAttachments from '../../../features/talents/components/TalentViewProfile/TalentAttachments';
import TalentGeneral from '../../../features/talents/components/TalentViewProfile/TalentGeneral';
import TalentLinks from '../../../features/talents/components/TalentViewProfile/TalentLinks';
import TalentNotes from '../../../features/talents/components/TalentViewProfile/TalentNotes';
import TalentSkills from '../../../features/talents/components/TalentViewProfile/TalentSkills';
import { grey3 } from '../../../utils/colors';
import { useAppSelector } from '../../../utils/hooks/reduxHook';
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector';
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../AtButton/AtButton';
import ModalDecline from '../../AtModal/modals/ModalDecline';
import ModalShortlist from '../../AtModal/modals/ModalShortlist/ModalShortlist';
import AtTypography from '../../AtTypography/AtTypography';
import AtDrawerHeader from '../AtDrawerHeader';

const DrawerTalent: React.FunctionComponent = () => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state));

  const [openModalShortlist, setOpenModalShortlist] = useState(false);
  const [openModalDecline, setOpenModalDecline] = useState(false);

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
            onClick={() => setOpenModalDecline(true)}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Contained}
            name={'Decline'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={() => setOpenModalShortlist(true)}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Shortlist'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>

      <ModalShortlist
        isOpen={openModalShortlist}
        onClose={() => setOpenModalShortlist(false)}
      />
      <ModalDecline
        isOpen={openModalDecline}
        onClose={() => setOpenModalDecline(false)}
      />
    </Box>
  );
};

export default DrawerTalent;
