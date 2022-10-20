import { Box, Grid } from '@mui/material';
import { AddCircle, Candle, Import, SearchNormal1 } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import { grey2 } from '../../utils/colors';
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton';
import AtDropdown from '../AtDropdown/AtDropdown';
import AtNavbar from '../AtNavbar/AtNavbar';
import AtNavPage from '../AtNavPage/AtNavPage';
import AtTextField, { AtTextFieldType } from '../AtTextField/AtTextField';
import AtTypography from '../AtTypography/AtTypography';

const StyledContent = styled(Grid)`
  background-color: #f7f8fe;
  margin-top: 20px;
`;

const AtLayout: React.FunctionComponent<AtLayoutProps> = (
  props: AtLayoutProps
) => {
  return (
    <Grid
      container={true}
      height={'100%'}
      columnSpacing={2.5}
      justifyContent={props.sidePanel ? 'space-between' : 'flex-start'}
    >
      <Grid item={true} xs={1}>
        <AtNavbar />
      </Grid>
      <StyledContent
        item={true}
        xs={
          props.sidePanelSize === 'small'
            ? 9
            : props.sidePanelSize === 'medium'
            ? 8
            : 11
        }
        paddingRight={props.sidePanel ? 0 : 3}
        width={'100%'}
      >
        <AtNavPage
          pages={[
            {
              label: 'All Talents',
              badge: 150,
            },
            {
              label: 'Inbound Talents',
              badge: 5,
            },
            {
              label: 'Shortlist Talents',
              badge: 40,
            },
            {
              label: 'Accepted Talents',
              badge: 20,
            },
            {
              label: 'Declined Talents',
            },
            {
              label: 'Applicants',
            },
          ]}
        />

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          marginTop={'30px'}
        >
          <AtTypography variant={'h3'}>{props.title}</AtTypography>

          <Box display={'flex'} gap={'10px'}>
            <AtButton
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Text}
              startIcon={<Import />}
              fontSize={'14px'}
              name={'Download CSV'}
            />
            <AtButton
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              startIcon={<AddCircle />}
              name={'Invite Talents'}
            />
          </Box>
        </Box>

        <Grid
          container={true}
          marginTop={'20px'}
          justifyContent={'space-between'}
        >
          <Grid item={true} xs={6.5}>
            <AtTextField
              type={AtTextFieldType.Text}
              placeholder={'Search in Inbound talents ...'}
              startIcon={<SearchNormal1 />}
            />
          </Grid>

          <Box
            display={'flex'}
            gap={'5px'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <AtTypography color={grey2}>
              <Candle /> Sort by:
            </AtTypography>
            <AtDropdown
              listItems={[{ id: 0, label: 'None' }]}
              size={'small'}
              bgColor={'black'}
            />
          </Box>
        </Grid>
        {props.children}
      </StyledContent>

      {props.sidePanel}
    </Grid>
  );
};

interface AtLayoutProps {
  children: React.ReactNode;
  title?: string;
  sidePanel?: React.ReactNode;
  sidePanelSize?: 'small' | 'medium';
}

export default AtLayout;
