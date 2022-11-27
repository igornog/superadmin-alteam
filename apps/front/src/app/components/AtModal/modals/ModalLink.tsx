import { Box } from '@mui/material'
import { AddCircle, CloseCircle, TrushSquare } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import { StyledLink } from '../../../features/talents/components/TalentViewProfile/TalentLinks'
import { grey2 } from '../../../utils/colors'
import {
  getCorrectNetwork,
  availableNetworks,
  capitalizeFirstLetter,
} from '../../../utils/helpers'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { Link } from '../../../utils/redux/types/talents.type'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'

const ModalLink: React.FunctionComponent<ModalLinkProps> = (
  props: ModalLinkProps,
) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const [links, setLinks] = useState<Link[]>([])

  const [displayLink, setDisplayLink] = useState(false)
  const [newLink, setNewLink] = useState('')

  useEffect(() => {
    setLinks(selectedTalent.links)
  }, [selectedTalent])

  const handleUpdateLabel = () => {
    console.log('update label')
  }

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
        <AtTypography variant={'h4'}>Add Links</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          iconSize={24}
          onClick={props.onClose}
        />
      </Box>
      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTypography color={grey2}>
          No links has been added yet. Please paste the link below, or add
          another by clicking the button unter the field. You can just paste the
          link and we will autochoose the link type for you, or select from
          badge dropdown.
        </AtTypography>

        {links &&
          links.map((item: Link) => (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={'25px'}
            >
              <AtTextField
                startIcon={getCorrectNetwork(item.link)}
                value={''}
                label={getCorrectNetwork(item.link, 'key')}
                defaultValue={item.link}
                labelDropdown={Object.keys(availableNetworks).map((network) => {
                  return {
                    value: network,
                    label: (
                      <AtTypography>
                        {availableNetworks[network]}{' '}
                        {capitalizeFirstLetter(network)}
                      </AtTypography>
                    ),
                  }
                })}
                onClickDropdownLabel={handleUpdateLabel}
              />
              <AtButton
                kind={AtButtonKind.Danger}
                variant={AtButtonVariant.Text}
                startIcon={<TrushSquare />}
                iconSize={20}
              />
            </Box>
          ))}

        {displayLink && (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={'25px'}
          >
            <AtTextField
              startIcon={getCorrectNetwork(newLink)}
              value={''}
              label={getCorrectNetwork(newLink, 'key')}
              onValueChange={setNewLink}
              labelDropdown={Object.keys(availableNetworks).map((network) => {
                return {
                  value: network,
                  label: (
                    <AtTypography>
                      {availableNetworks[network]}{' '}
                      {capitalizeFirstLetter(network)}
                    </AtTypography>
                  ),
                }
              })}
            />
            <AtButton
              kind={AtButtonKind.Danger}
              variant={AtButtonVariant.Text}
              startIcon={<TrushSquare />}
              iconSize={20}
            />
          </Box>
        )}

        <StyledLink padding={'10px'} onClick={() => setDisplayLink(true)}>
          <AtTypography fontSize={'16px'} bold={true}>
            Add link
            <AddCircle size={16} />
          </AtTypography>
        </StyledLink>
      </Box>
    </AtModal>
  )
}

interface ModalLinkProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalLink
