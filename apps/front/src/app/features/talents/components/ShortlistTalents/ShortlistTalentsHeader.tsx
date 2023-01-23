import { Box } from '@mui/material'
import { SearchNormal1, Candle } from 'iconsax-react'
import React from 'react'
import {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../components/AtButton/AtButton'
import AtDropdown, { DropdownItem } from '../../../../components/AtDropdown/AtDropdown'
import AtSwitchDisplayMode from '../../../../components/AtLayout/AtSwitchDisplayMode'
import AtTextField from '../../../../components/AtTextField/AtTextField'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey2 } from '../../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getActiveFolder } from '../../../../utils/redux/selectors/tree.selector'
import { handleActiveSort } from '../../../../utils/redux/actions/settings.action'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
import { SortOptions } from '../../../../utils/helpers'

const ShortlistTalentsHeader: React.FunctionComponent = () => {
  const activeFolder = useAppSelector((state) => getActiveFolder(state))
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const dispatch = useAppDispatch()

  const handleSort = (item: DropdownItem) => {
    dispatch(handleActiveSort({ sort: item.value as string }))
  }

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
          placeholder={`Search in ${activeFolder.isParent() ? 'Shortlisted talents' : activeFolder.name
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
              $listItems={SortOptions(activeTab)}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Contained}
              handleSelect={handleSort}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ShortlistTalentsHeader
