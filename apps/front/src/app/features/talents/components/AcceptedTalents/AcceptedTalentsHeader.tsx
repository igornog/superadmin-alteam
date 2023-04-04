import { Box } from '@mui/material'
import { SearchNormal1 } from 'iconsax-react'
import React from 'react'
import AtSwitchDisplayMode from '../../../../components/AtLayout/AtSwitchDisplayMode'
import AtTextField from '../../../../components/AtTextField/AtTextField'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getActiveGroup } from '../../../../utils/redux/selectors/group.selector'
import { SortTypes } from '../../../../utils/redux/types/settings.type'
import AtSortByDropdown from '../../../../components/AtDropdown/AtSortByDropdown'

const AcceptedTalentsHeader: React.FunctionComponent = () => {
  const activeFolder = useAppSelector((state) => getActiveGroup(state))

  const sortOptions = [
    { id: 0, value: null, label: 'None' },
    { id: 1, value: SortTypes.Alphabetical, label: 'A to Z' },
    { id: 2, value: SortTypes.MostRecent, label: 'Most Recent' },
  ]

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={'flex'} flex={1}>
        <AtTypography variant={'h4'}>All Accepted Talent</AtTypography>
      </Box>

      <Box display={'flex'} gap={'30px'} alignItems={'center'} flex={2}>
        <AtTextField
          startIcon={<SearchNormal1 />}
          placeholder={`Search in ${activeFolder.isParent() ? 'Accepted talents' : activeFolder.name
            }...`}
          value={''}
        />

        <Box display={'flex'} gap={'30px'}>
          <AtSwitchDisplayMode />
          <AtSortByDropdown sortOptions={sortOptions} />
        </Box>
      </Box>
    </Box>
  )
}

export default AcceptedTalentsHeader
