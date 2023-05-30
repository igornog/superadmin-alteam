import { Box } from '@mui/material'
import React, { useState } from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTag from '../../../../../../Tag/Tag'
import AtTypography from '../../../../../../Typography/Typography'
import { Edit } from 'iconsax-react'
import ModalSkills from '../../../../../../Modal/modals/ModalSkills'

const Skills: React.FunctionComponent<SkillsProps> = (
  props: SkillsProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <AtFrame
      title={'Skills'}
      backgroundColor={'#FBFCFF'}
      padding={props.isSmallScreen ? '0px' : '20px'}
      icon={props.isAuthenticated &&
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
        {props.listing.skills?.map(
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
        listing={props.listing}
        onClose={() => setOpenModal(false)}
      />

    </AtFrame>
  )
}

interface SkillsProps {
  listing: any
  isSmallScreen?: boolean
  isAuthenticated?: boolean
}

export default Skills
