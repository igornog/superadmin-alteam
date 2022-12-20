import { Box } from '@mui/material'
import { SearchNormal1, Candle } from 'iconsax-react'
import React from 'react'
import {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../components/AtButton/AtButton'
import AtDropdown from '../../../../components/AtDropdown/AtDropdown'
import AtSwitchDisplayMode from '../../../../components/AtLayout/AtSwitchDisplayMode'
import AtTextField from '../../../../components/AtTextField/AtTextField'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey2 } from '../../../../utils/colors'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getActiveFolder } from '../../../../utils/redux/selectors/tree.selector'

const ShortlistTalentsHeader: React.FunctionComponent = () => {
  const activeFolder = useAppSelector((state) => getActiveFolder(state))

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
          placeholder={`Search in ${
            activeFolder.isParent() ? 'Shortlisted talents' : activeFolder.name
          }...`}
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
              placeholder={'None'}
              $listItems={[
                { id: 0, value: 'None', label: 'None' },
                { id: 1, value: 'None', label: 'None' },
              ]}
              align={'bottom-right'}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Contained}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ShortlistTalentsHeader
