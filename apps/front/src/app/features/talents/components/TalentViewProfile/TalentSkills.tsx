import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalSkills from '../../../../components/AtModal/modals/ModalSkills'
import AtTag from '../../../../components/AtTag/AtTag'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey } from '../../../../utils/colors'
import { Talent } from '../../../../utils/redux/types/talents.type'

const TalentSkills: React.FunctionComponent<TalentSkillsProps> = (
  props: TalentSkillsProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Skills'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
        {props.talent.skills && props.talent.skills?.length > 0 ? (
          props.talent.skills?.map((value: string, index: number) => (
            <AtTag label={value} key={index} />
          ))
        ) : (
          <AtTypography color={grey}>
            No skills have been added by the talent, please add them by
            searching below. Please note that you may add only up to 5 skills.
          </AtTypography>
        )}
      </Box>
      <ModalSkills isOpen={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

interface TalentSkillsProps {
  talent: Talent
}

export default TalentSkills
