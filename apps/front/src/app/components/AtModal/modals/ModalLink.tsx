import { Box } from '@mui/material'
import {
  AddCircle,
  CloseCircle,
  CloseSquare,
  TickSquare,
  TrushSquare,
} from 'iconsax-react'
import React, { useCallback, useEffect, useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextField, { LabelDropdown } from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import { StyledLink } from '../../../features/talents/components/TalentViewProfile/TalentLinks'
import { grey2 } from '../../../utils/colors'
import {
  getCorrectNetwork,
  availableNetworks,
  capitalizeFirstLetter,
} from '../../../utils/helpers'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import { Link, LinkDomain } from '@yjcapp/app'
import { v4 as uuid } from 'uuid'
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'

const ModalLink: React.FunctionComponent<ModalLinkProps> = (
  props: ModalLinkProps,
) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const [links, setLinks] = useState<Link[]>([])
  const dispatch = useAppDispatch()

  const handleUpdateLabel = ({ value }: LabelDropdown, id?: string) => {
    setLinks(
      links.map((item) => {
        if (item.id === id) {
          return { ...item, name: value as LinkDomain }
        }
        return item
      }),
    )
  }

  const handleUpdateLink = (value: string, id?: string) => {
    setLinks(
      links.map((item) => {
        if (item.id === id) {
          return { ...item, name: getCorrectNetwork(value, 'key'), link: value }
        }
        return item
      }),
    )
  }

  const addLink = useCallback(
    (element?: Link) => {
      if (!links.some((item) => item.name === undefined && item.link === '')) {
        setLinks([
          ...links,
          {
            id: uuid(),
            name: element?.name ?? undefined,
            link: element?.link ?? '',
          },
        ])
      }
    },
    [links],
  )

  const removeLink = (link: Link) => {
    setLinks(links.filter((item: Link) => item.id !== link.id))
  }

  const handleSaveChanges = () => {
    dispatch(
      handlePatchTalent({
        id: selectedTalent.id,
        links: links.map((item) => ({
          name: item.name,
          link: item.link,
        })),
      }),
    )
    props.onClose?.()
  }

  useEffect(() => {
    if (props.isOpen && selectedTalent.links) {
      const values = selectedTalent.links?.map((element: Link) => ({
        id: uuid(),
        name: element?.name ?? undefined,
        link: element?.link ?? '',
      }))

      setLinks(values)
    }
  }, [props.isOpen, selectedTalent.links])

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
        <AtTypography variant={'h4'}>
          {props.edit ? 'Edit Links' : 'Add Links'}
        </AtTypography>
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
        <AtTypography color={grey2}>
          No links has been added yet. Please paste the link below, or add
          another by clicking the button unter the field. You can just paste the
          link and we will autochoose the link type for you, or select from
          badge dropdown.
        </AtTypography>

        {links &&
          links.map((item: Link) => {
            return (
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={'25px'}
              >
                <AtTextField
                  startIcon={
                    item.name
                      ? getCorrectNetwork(item.name)
                      : getCorrectNetwork(item.link)
                  }
                  value={item.link}
                  label={item.name ?? getCorrectNetwork(item.link, 'key')}
                  defaultValue={item.link}
                  onValueChange={(e: string) => handleUpdateLink(e, item.id)}
                  labelDropdown={Object.keys(availableNetworks).map(
                    (network) => {
                      return {
                        value: network,
                        label: (
                          <AtTypography>
                            {availableNetworks[network]}
                            {capitalizeFirstLetter(network)}
                          </AtTypography>
                        ),
                      }
                    },
                  )}
                  onClickDropdownLabel={(e) => handleUpdateLabel(e, item.id)}
                />

                <AtButton
                  kind={AtButtonKind.Danger}
                  variant={AtButtonVariant.Text}
                  startIcon={<TrushSquare />}
                  $iconSize={20}
                  onClick={() => removeLink(item)}
                />
              </Box>
            )
          })}

        <StyledLink padding={'10px'} onClick={() => addLink()}>
          <AtTypography fontSize={'16px'} $bold={true}>
            Add link
            <AddCircle size={16} />
          </AtTypography>
        </StyledLink>

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleSaveChanges}
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

interface ModalLinkProps {
  isOpen: boolean
  onClose?: () => void
  edit?: boolean
}

export default ModalLink
