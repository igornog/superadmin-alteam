import { Box } from '@mui/material'
import { ClientListing, Role } from '@yjcapp/app'
import { black } from '../../../../utils/colors'
import { convertHexToRGBA, getCurrencySymbol } from '../../../../utils/helpers'
import { useAppDispatch } from '../../../../utils/hooks/reduxHook'
import { handleUpdateListing } from '../../../../utils/redux/actions/listing.action'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTextField, { AtTextFieldType } from '../../../AtTextField/AtTextField'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'

const ModalRoles: React.FunctionComponent<
  ModalRolesProps
> = (props: ModalRolesProps) => {
  const dispatch = useAppDispatch()
  // const [role, setRole] = useState<Role>(props.listing.roles[props.roleIndex])
  const [roleName, setRoleName] = useState<string>(props.listing.roles[props.roleIndex].roleName)
  const [roleDescription, setRoleDescription] = useState<string | undefined>(props.listing.roles[props.roleIndex].description)
  const [price, setPrice] = useState<number | undefined>(props.listing.roles[props.roleIndex].price)
  const [percentage, setPercentage] = useState<number | undefined>(props.listing.roles[props.roleIndex].percentage)

  // useEffect(() => {
  //   setRoles(props.listing.roles)
  // }, [])

  // const handleArrayValueChange = (
  //   index: number,
  //   array: any[],
  //   newValue: string,
  // ) => {
  //   const newArray = [...array]
  //   if (newValue.length) {
  //     newArray[index] = newValue
  //     setRoles(newArray)
  //   }
  // }

  const handleSave = () => {
    const roleUpdated = {
      roleName: roleName,
      description: roleDescription,
      price: price,
      percentage: percentage
    } as Role

    dispatch(handleUpdateListing({
      id: props.listing?.id,
      roles: [...props.listing.roles, props.listing.roles[props.roleIndex] = roleUpdated]
    }))
    props.onClose?.()
  }

  return (
    <AtModal
      size={ModalSize.ExtraLarge}
      isOpen={props.open}
      onClose={props.onClose}
      maxWidth='1000px'
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Role</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>

        <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
          <Box display={'flex'} gap={'16px'}>
            <Box width={props.listing.exactRate ? '65%' : '80%'}>
              <AtTextField
                placeholder={'Enter Role Name'}
                label={`Role Name`}
                required
                value={props.listing.roles[props.roleIndex].roleName}
                onValueChange={setRoleName}
              />
            </Box>

            <Box width={'40%'}>
              <AtTextField
                type={AtTextFieldType.Number}
                label={`Cost per month`}
                value={props.listing.roles[props.roleIndex].price?.toFixed(0)}
                onValueChange={setPrice}
                startIcon={
                  <AtTypography color={convertHexToRGBA(black, 0.5)}>
                    {getCurrencySymbol(props.listing.currency)}
                  </AtTypography>
                }
              />
            </Box>
          </Box>

          <AtTextField
            value={props.listing.roles[props.roleIndex].description}
            onValueChange={setRoleDescription}
            maxLength={500}
            label={`Role Description`}
            multiline
            rows={6}
            required
            placeholder={'Enter Description'}
            charCounter
          />
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
            onClick={handleSave}
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

interface ModalRolesProps {
  listing: ClientListing;
  roleIndex: number;
  open: boolean
  onClose?: () => void
}

export default ModalRoles
