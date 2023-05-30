import { Box } from '@mui/material'
import { grey2 } from '../../../../utils/colors'
import { getCurrencySymbol } from '../../../../utils/helpers'
import React, { useEffect, useState } from 'react'
import AtFrame from '../../../AtFrame/AtFrame'
import AtLine from '../../../AtLine/AtLine'
import AtTypography from '../../../AtTypography/AtTypography'
import ModalRoles from '../../../AtModal/modals/listings/ModalRoles'
import { Edit } from 'iconsax-react'
import { Role } from '@yjcapp/app'

const Roles: React.FunctionComponent<RolesProps> = (
  props: RolesProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  const [roleSelected, setRoleSelected] = useState<number>()
  const [roles, setRoles] = useState<Role[]>()

  useEffect(() => {
    setRoles(props.selectedListing.roles)
  }, [])


  return (
    <AtFrame
      title={'Roles'}
      backgroundColor={'#FBFCFF'}
    >
      <Box display={'grid'} gridTemplateColumns={'50% 50%'} gap={'10px'}>
        {roles?.map((role: Role, index: number) => {
          return (
            <AtFrame
              key={index}
              backgroundColor={'#FFF'}
              icon={
                <AtTypography>
                  <Edit size={16} />
                  Edit
                </AtTypography>
              }
              onClick={() => {
                setOpenModal(true)
                setRoleSelected(index + 1)
              }}
            >
              <Box display={'flex'} gap={'10px'}>
                <AtTypography variant='subtitle1' $bold>{role.roleName}</AtTypography>
                <AtTypography color={grey2} variant={'caption'}>
                  {getCurrencySymbol(props.selectedListing.currency)}{role.price}
                </AtTypography>
              </Box>
              <AtLine />
              <AtTypography variant={role.description ? 'body2' : 'caption'}>{role.description ? role.description : 'No description added.'}</AtTypography>
            </AtFrame>
          )
        },
        )}
      </Box>

      {roleSelected &&
        <ModalRoles
          open={openModal}
          listing={props.selectedListing}
          roleIndex={roleSelected - 1}
          onClose={() => setOpenModal(false)}
        />
      }
    </AtFrame>
  )
}

interface RolesProps {
  selectedListing: any
}

export default Roles
