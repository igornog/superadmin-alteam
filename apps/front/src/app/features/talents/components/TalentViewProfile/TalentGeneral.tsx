import { Box, Grid } from '@mui/material';
import { Edit } from 'iconsax-react';
import React from 'react';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey, grey2 } from '../../../../utils/colors';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { handleModal } from '../../../../utils/redux/actions/settings.action';
import { ModalVariant } from '../../../../utils/redux/types/settings.type';
import { Talent } from '../../../../utils/redux/types/talents.type';

const TalentGeneral: React.FunctionComponent<TalentGeneralProps> = (
  props: TalentGeneralProps
) => {
  const dispatch = useAppDispatch();

  const handleEditInformations = () => {
    dispatch(handleModal(ModalVariant.GeneralInformations));
  };

  return (
    <AtTalentFrame
      title={'General information'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={handleEditInformations}
    >
      <Grid container={true} gap={'15px'}>
        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Role:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>{props.talent.jobName}</AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Availability:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>
              {props.talent.jobType ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Salary Expectations:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>
              {props.talent.salary ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Work Experience:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>
              {props.talent.experience ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Portfolio Link:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>
              {props.talent.portfolio ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Email:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>
              {props.talent.email ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item={true} xs={3}>
            <AtTypography color={grey2}>Phone Number:</AtTypography>
          </Grid>
          <Grid item={true} xs={9}>
            <AtTypography color={grey}>
              {props.talent.phone ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>
      </Grid>
    </AtTalentFrame>
  );
};

interface TalentGeneralProps {
  talent: Talent;
}

export default TalentGeneral;
