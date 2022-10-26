import { Box, Drawer, Grid } from '@mui/material';
import { ArrowLeft2, DocumentText1, Edit, Import } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../components/AtButton/AtButton';
import AtLine from '../../../components/AtLine/AtLine';
import AtSpace from '../../../components/AtSpace/AtSpace';
import AtTag from '../../../components/AtTag/AtTag';
import AtTypography from '../../../components/AtTypography/AtTypography';
import { blue, grey, grey2, grey3 } from '../../../utils/colors';
import { convertHexToRGBA } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector';
import { Skill } from '../../../utils/redux/types/talents.type';

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
              <StyledFrame
                display={'flex'}
                gap={'10px'}
                flexDirection={'column'}
              >
                <AtTypography variant={'h5'}>Skills</AtTypography>

                <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
                  {selectedTalent.skills?.map((skill: Skill, index: number) => (
                    <AtTag label={skill.label} delete={false} key={index} />
                  ))}
                </Box>
              </StyledFrame>

              <AtSpace direction={'vertical'} spacing={'25'} />

              <StyledFrame
                display={'flex'}
                gap={'10px'}
                flexDirection={'column'}
              >
                <AtTypography variant={'h5'}>General information</AtTypography>

                <Grid container={true} gap={'15px'}>
                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>Role:</AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.jobName}
                      </AtTypography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>Availability:</AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.jobType ?? 'N/A'}
                      </AtTypography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>
                        Salary Expectations:
                      </AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.salary ?? 'N/A'}
                      </AtTypography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>
                        Work Experience:
                      </AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.experience ?? 'N/A'}
                      </AtTypography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>Portfolio Link:</AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.portfolio ?? 'N/A'}
                      </AtTypography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>Email:</AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.email ?? 'N/A'}
                      </AtTypography>
                    </Grid>
                  </Box>

                  <Box display={'flex'} width={'100%'}>
                    <Grid item={true} xs={3}>
                      <AtTypography color={grey2}>Phone Number:</AtTypography>
                    </Grid>
                    <Grid item={true} xs={9}>
                      <AtTypography color={grey}>
                        {selectedTalent.phone ?? 'N/A'}
                      </AtTypography>
                    </Grid>
                  </Box>
                </Grid>
              </StyledFrame>

              <AtSpace direction={'vertical'} spacing={'25'} />

              <StyledFrame
                display={'flex'}
                gap={'10px'}
                flexDirection={'column'}
              >
                <AtTypography variant={'h5'}>About Talent</AtTypography>

                <AtTypography color={grey}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
                  adipiscing placerat venenatis odio vel dignissim nec diam.
                  Tincidunt ultrices sed ut odio vestibulum nisl, id vulputate.
                  Gravida mattis bibendum lacus lacus pulvinar egestas proin
                  convallis. Magna sed auctor diam fringilla vestibulum eu.
                </AtTypography>
              </StyledFrame>

              <AtSpace direction={'vertical'} spacing={'25'} />

              <StyledFrame display={'flex'} flexDirection={'column'}>
                <Box display={'flex'}>
                  <AtTypography variant={'h5'}>Attachments</AtTypography>
                </Box>

                <AtLine spacing={15} />

                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'} gap={'10px'}>
                    <DocumentText1 />
                    <AtTypography color={grey}>
                      Filenamecanbethislong.pdf
                    </AtTypography>
                  </Box>

                  <Import />
                </Box>

                <AtLine spacing={15} />

                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'} gap={'10px'}>
                    <DocumentText1 />
                    <AtTypography color={grey}>
                      Filenamecanbethislong.jpg
                    </AtTypography>
                  </Box>

                  <Import />
                </Box>

                <AtLine spacing={15} />

                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'} gap={'10px'}>
                    <DocumentText1 />
                    <AtTypography color={grey}>
                      Filenamecanbethislong.png
                    </AtTypography>
                  </Box>

                  <Import />
                </Box>
              </StyledFrame>

              <AtSpace direction={'vertical'} spacing={'25'} />

              <StyledFrame
                display={'flex'}
                gap={'10px'}
                flexDirection={'column'}
              >
                <AtTypography variant={'h5'}>Notes</AtTypography>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'} gap={'20px'}>
                    <AtTypography variant={'body1'}>
                      Yoann Demont’s Note:
                    </AtTypography>

                    <AtTypography color={grey2}>
                      <Edit size={16} />
                      Edit note
                    </AtTypography>
                  </Box>

                  <AtTypography color={grey3}>23.07.2022</AtTypography>
                </Box>

                <AtTypography color={grey}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
                  adipiscing placerat venenatis odio vel dignissim nec diam.
                  Tincidunt ultrices sed ut odio vestibulum nisl, id vulputate.
                  Gravida mattis bibendum lacus lacus pulvinar egestas proin
                  convallis. Magna sed auctor diam fringilla vestibulum eu.
                </AtTypography>
              </StyledFrame>
            </Box>
          </>
        ) : null}
      </Box>
    </Drawer>
  );
};

export default TalentsViewProfile;
