import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalSkills from '../../../../components/AtModal/modals/ModalSkills'
import AtTag from '../../../../components/AtTag/AtTag'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey } from '../../../../utils/colors'
import { Talent } from '../../../../utils/redux/types/talents.type'
import AtLine from '../../../../components/AtLine/AtLine'

const TalentSkills: React.FunctionComponent<TalentSkillsProps> = (
  props: TalentSkillsProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Skills'}
      icon={
        !props.notEditable && (
          <AtTypography>
            <Edit size={16} />
            Edit
          </AtTypography>
        )
      }
      onClick={() => setOpenModal(true)}
    >
      <AtLine spacing={15} />
      <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
        {props.talent.skills && props.talent.skills?.length > 0 ? (
          props.talent.skills?.map((value: string, index: number) => (
            <AtTag label={value} key={index} />
          ))
        ) : (
          <AtTypography color={grey}>
            Type a skill and press enter. You can add up to 7 skills.
          </AtTypography>
        )}
      </Box>
      <ModalSkills isOpen={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

interface TalentSkillsProps {
  talent: Talent
  notEditable?: boolean
}

export default TalentSkills
