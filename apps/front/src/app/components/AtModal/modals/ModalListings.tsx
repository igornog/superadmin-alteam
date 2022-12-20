import { Box } from '@mui/material'
import {
  CloseCircle,
  SearchNormal1,
  CloseSquare,
  TickSquare,
} from 'iconsax-react'
import React from 'react'
import styled from 'styled-components'
import { grey2 } from '../../../utils/colors'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtDropdown from '../../AtDropdown/AtDropdown'
import AtLine from '../../AtLine/AtLine'
import AtTag from '../../AtTag/AtTag'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'

const StyledTag = styled(AtTag)`
  flex: 5;
`

const ModalListings: React.FunctionComponent<ModalListingsProps> = (
  props: ModalListingsProps,
) => {
  return (
    <AtModal
      isOpen={props.isOpen}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Listings</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
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
            <StyledTag
              label={'Back-End Developer 6 Month Contract'}
            ></StyledTag>
            <AtDropdown
              align={'bottom-right'}
              placeholder={'Shortlisted'}
              fontSize={'10px'}
              $listItems={[
                {
                  id: 0,
                  value: 'Public View',
                  label: (
                    <AtTypography whiteSpace={'nowrap'}>
                      Shortlisted
                    </AtTypography>
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

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalListingsProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalListings
