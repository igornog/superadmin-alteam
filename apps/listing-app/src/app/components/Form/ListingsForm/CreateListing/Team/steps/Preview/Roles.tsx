import { Box } from '@mui/material'
import React, { useState } from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTypography from '../../../../../../Typography/Typography'
import AtLine from '../../../../../../Line/Line'
import { grey2 } from '../../../../../../../utils/colors'
import { getCurrencySymbol } from '../../../../../../../utils/helpers'
import ModalRoles from '../../../../../../Modal/modals/ModalRoles'
import { Edit } from 'iconsax-react'
import { Role } from '@yjcapp/app'

const Roles: React.FunctionComponent<RolesProps> = (
  props: RolesProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  const [roleSelected, setRoleSelected] = useState<number>()

  return (
    <AtFrame
      title={'Roles'}
      padding={props.isSmallScreen ? '0px' : '20px'}
      backgroundColor={'#FBFCFF'}
    >
      <Box display={'grid'} gridTemplateColumns={'50% 50%'} gap={'10px'}>
        {props.listing.roles?.map(
          (role: Role, index: number) => {
            return (
              <AtFrame
                key={index}
                backgroundColor={'#FFF'}
                icon={props.isAuthenticated &&
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
                    {getCurrencySymbol(props.listing.currency)}{role.price}
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
          listing={props.listing}
          roleIndex={roleSelected - 1}
          onClose={() => setOpenModal(false)}
        />
      }
    </AtFrame>
  )
}

interface RolesProps {
  listing: any
  isSmallScreen?: boolean
  isAuthenticated?: boolean
}

export default Roles
