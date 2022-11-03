import { Box } from '@mui/material';
import { CloseSquare, SearchNormal1, TickSquare } from 'iconsax-react';
import React from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import AtTag from '../../AtTag/AtTag';
import AtTextField from '../../AtTextField/AtTextField';
import AtTypography from '../../AtTypography/AtTypography';
import { grey2 } from '../../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector';
import { AtModalContent, AtModalHeader } from '../AtModal';

const ModalSkills: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));
  const selectedTalent = useAppSelector((state) => getActiveTalent(state));

  return (
    <>
      <AtModalHeader
        title={<AtTypography variant={'h4'}>Edit Skills</AtTypography>}
      />

      <AtModalContent gap={'20px'} padding={'0 20px 20px 20px'}>
        <AtTextField
          placeholder={'Search in Skills'}
          startIcon={<SearchNormal1 />}
          size={'small'}
        />
        <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
          {selectedTalent.skills && selectedTalent.skills.length > 0 ? (
            selectedTalent?.skills?.map((skill, index) => {
              return <AtTag label={skill.label} delete={true} key={index} />;
            })
          ) : (
            <AtTypography color={grey2}>
              No skills have been added by the talent, please add them by
              searching below. Please note that you may add only up to 5 skills.{' '}
            </AtTypography>
          )}
        </Box>

        <Box display={'flex'} justifyContent={'flex-end'}>
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </AtModalContent>
    </>
  );
};

export default ModalSkills;
