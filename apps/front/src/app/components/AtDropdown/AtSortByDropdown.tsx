import { grey2 } from '../../utils/colors'
import { Box } from '@mui/material'
import AtTypography from '../AtTypography/AtTypography'
import { Candle } from 'iconsax-react'
import AtDropdown, { DropdownItem } from './AtDropdown'
import { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import { handleActiveSort } from '../../utils/redux/actions/settings.action'
import { useAppDispatch } from '../../utils/hooks/reduxHook'

const AtSortByDropdown: React.FunctionComponent<AtSortByDropdownProps> = (
  props: AtSortByDropdownProps,
) => {
  const dispatch = useAppDispatch()

  const handleSort = (item: DropdownItem) => {
    dispatch(handleActiveSort({ sort: item.value as string }))
  }

  props.sortOptions.map((option: DropdownItem, i: number) => option.id = i)

  return (
    <Box
      display={'flex'}
      gap={'5px'}
      justifyContent={'flex-end'}
      alignItems={'center'}
    >
      <AtTypography color={grey2} whiteSpace={'nowrap'}>
        <Candle /> Sort by:
      </AtTypography>
      <AtDropdown
        placeholder={'None'}
        $listItems={props.sortOptions}
        kind={AtButtonKind.Default}
        variant={AtButtonVariant.Contained}
        handleSelect={handleSort}
      />
    </Box>
  )
}


interface AtSortByDropdownProps {
  sortOptions: DropdownItem[]
}

export default AtSortByDropdown
