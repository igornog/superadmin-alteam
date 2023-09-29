import { Box } from '@mui/material'
import { SearchNormal1 } from 'iconsax-react'
import React from 'react'
import styled from 'styled-components'
import { grey2 } from '../../../../../utils/colors'
import { AtButtonKind, AtButtonVariant } from '../../../../AtButton/AtButton'
import AtDropdown from '../../../../AtDropdown/AtDropdown'
import AtTag from '../../../../AtTag/AtTag'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'

const StyledTag = styled(AtTag)`
  flex: 5;
`

const ModalAcceptedStep2: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2.5}>
      <AtTextField
        placeholder={'Search in Listings'}
        value={''}
        startIcon={<SearchNormal1 />}
        size={'small'}
      />
      <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          gap={'15px'}
          alignItems={'center'}
        >
          <AtTypography color={grey2} flex={1}>
            Chaptr:
          </AtTypography>
          <StyledTag label={'Back-End Developer 6 Month Contract'}></StyledTag>
          <AtDropdown
            align={'bottom-right'}
            fontSize={'10px'}
            $listItems={[
              {
                id: 0,
                value: 'Public View',
                label: (
                  <AtTypography whiteSpace={'nowrap'}>Shortlisted</AtTypography>
                ),
              },
              {
                id: 1,
                value: 'Private View',
                label: (
                  <AtTypography whiteSpace={'nowrap'}>Accepted</AtTypography>
                ),
              },
            ]}
            padding={'5px 7px'}
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Text}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ModalAcceptedStep2
