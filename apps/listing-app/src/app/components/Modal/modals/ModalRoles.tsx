import { Box } from '@mui/material'
import { Role } from '@yjcapp/app'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../utils/hooks/reduxHook'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import CustomButton, { AtButtonKind, AtButtonVariant } from '../../Button/Button'
import AtLine from '../../Line/Line'
import AtTypography from '../../Typography/Typography'
import AtModal from '../AtModal'
import { useParams } from 'react-router-dom'
import AtTextField, { AtTextFieldType } from '../../TextField/TextField'
import { handleUpdateListing } from '../../../utils/redux/actions/listing.action'
import { black } from '../../../utils/colors'
import { convertHexToRGBA, getCurrencySymbol } from '../../../utils/helpers'

const ModalRoles: React.FunctionComponent<
  ModalRolesProps
> = (props: ModalRolesProps) => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState<Role[]>()

  const handleArrayValueChange = (
    newValue: string,
    field: string
  ) => {
    const newArray = [...props.listing.roles]
    if (newValue.length) {
      switch (field) {
        case 'roleName':
          newArray[props.roleIndex].roleName = newValue
          break
        case 'description':
          newArray[props.roleIndex].description = newValue
          break
        case 'price':
          newArray[props.roleIndex].price = parseInt(newValue)
          break
        case 'percentage':
          newArray[props.roleIndex].percentage = parseInt(newValue)
          break
      }

      setRoles(newArray)
    }
  }

  const handleSave = async () => {
    if (id) {
      await dispatch(handleUpdateListing(
        {
          id: parseInt(id),
          roles: roles
        }
      ))
      props.onClose?.()
    }
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
        <CustomButton
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
                required={true}
                value={props.listing.roles[props.roleIndex].roleName}
                onValueChange={(e) =>
                  handleArrayValueChange(e, 'roleName')
                }
              />
            </Box>

            <Box width={'40%'}>
              <AtTextField
                type={AtTextFieldType.Number}
                label={`Cost per month`}
                value={props.listing.roles[props.roleIndex].price?.toFixed(0)}
                onValueChange={(e) =>
                  handleArrayValueChange(e, 'price')
                }
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
            onValueChange={(e) =>
              handleArrayValueChange(e, 'description')
            }
            maxLength={500}
            label={`Role Description`}
            multiline={true}
            rows={6}
            required
            placeholder={'Enter Description'}
            charCounter={true}
          />
        </Box>


        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <CustomButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <CustomButton
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
  listing: any;
  roleIndex: number;
  open: boolean
  onClose?: () => void
}

export default ModalRoles
