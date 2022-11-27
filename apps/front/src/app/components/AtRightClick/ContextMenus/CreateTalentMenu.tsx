import { AddCircle } from 'iconsax-react'
import React from 'react'
import AtTypography from '../../AtTypography/AtTypography'
import { AtContextMenuItem } from '../AtRightClick'

const CreateTalentMenu: React.FunctionComponent = () => {
  return (
    <AtContextMenuItem>
      <AtTypography>
        <AddCircle size={20} />
        Create Talent
      </AtTypography>
    </AtContextMenuItem>
  )
}

export default CreateTalentMenu
