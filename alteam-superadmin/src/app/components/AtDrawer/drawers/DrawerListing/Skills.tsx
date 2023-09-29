import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import AtFrame from '../../../AtFrame/AtFrame'
// import ModalSkills from '../../../AtModal/modals/ModalSkills'
import AtTag from '../../../AtTag/AtTag'
import AtTypography from '../../../AtTypography/AtTypography'
import ModalSkills from '../../../AtModal/modals/listings/ModalSkills'

const Skills: React.FunctionComponent<SkillsProps> = (
  props: SkillsProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <AtFrame
      title={'Skills'}
      backgroundColor={'#FBFCFF'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
        {props.selectedListing.skills?.map(
          (skill: string, index: number) => {
            return (
              <AtTag
                label={skill}
                key={index}
              />
            )
          },
        )}
      </Box>

      <ModalSkills
        open={openModal}
        listing={props.selectedListing}
        onClose={() => setOpenModal(false)}
      />

    </AtFrame>
  )
}

interface SkillsProps {
  selectedListing: any
  isAuthenticated?: boolean
}

export default Skills
