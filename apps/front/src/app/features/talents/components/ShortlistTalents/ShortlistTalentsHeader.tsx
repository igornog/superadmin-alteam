import { Box } from '@mui/material';
import { SearchNormal1, Candle } from 'iconsax-react';
import React from 'react';
import AtDropdown from '../../../../components/AtDropdown/AtDropdown';
import AtSwitchDisplayMode from '../../../../components/AtLayout/AtSwitchDisplayMode';
import AtTextField from '../../../../components/AtTextField/AtTextField';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey2 } from '../../../../utils/colors';

const ShortlistTalentsHeader: React.FunctionComponent = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={'flex'} flex={1}>
        <AtTypography variant={'h4'}>All Shortlisted Talent</AtTypography>
      </Box>

      <Box display={'flex'} gap={'30px'} alignItems={'center'} flex={2}>
        <AtTextField
          startIcon={<SearchNormal1 />}
          placeholder={'Search in Shortlisted talent...'}
          value={''}
        />

        <Box display={'flex'} gap={'30px'}>
          <AtSwitchDisplayMode />

          <Box
            display={'flex'}
            gap={'5px'}
            justifyContent={'flex-end'}
            alignItems={'center'}
            width={'75%'}
          >
            <AtTypography color={grey2} whiteSpace={'nowrap'}>
              <Candle /> Sort by:
            </AtTypography>
            <AtDropdown
              value={'None'}
              width={'fit-content'}
              fullWidth={true}
              listItems={[
                { id: 0, label: 'None' },
                { id: 1, label: 'None' },
              ]}
              size={'small'}
              bgColor={'black'}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShortlistTalentsHeader;
