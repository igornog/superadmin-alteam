import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import TalentAbout from '../../features/talents/components/TalentViewProfile/TalentAbout'
import TalentAttachments from '../../features/talents/components/TalentViewProfile/TalentAttachments'
import TalentGeneral from '../../features/talents/components/TalentViewProfile/TalentGeneral'
import TalentLinks from '../../features/talents/components/TalentViewProfile/TalentLinks'
import TalentNotes from '../../features/talents/components/TalentViewProfile/TalentNotes'
import TalentSkills from '../../features/talents/components/TalentViewProfile/TalentSkills'
import { useAppDispatch } from '../../utils/hooks/reduxHook'
import { findTalent } from '../../utils/redux/actions/talents.action'
import AtTypography from '../AtTypography/AtTypography'

const AtTalentCardDetails: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [selectedTalent, setSelectedTalent] = useState<any>()

  useEffect(() => {
    if (id) {
      dispatch(findTalent(id)).then((res) => {
        if (res.payload) {
          const response: any = res.payload
          setSelectedTalent(response.data)
        }
      })
    }
  }, [])

  return selectedTalent ? (
    <Box
      display={'flex'}
      flexDirection={'column'}
      padding={'50px 100px'}
      gap={'25px'}
    >
      <AtTypography variant="h2">
        {selectedTalent.firstName} {selectedTalent.lastName}
      </AtTypography>

      <Box display={'flex'} gap={'50px'}>
        <Box width={'50%'}>
          <TalentGeneral talent={selectedTalent} notEditable />
        </Box>

        <Box
          width={'50%'}
          display={'flex'}
          flexDirection={'column'}
          gap={'50px'}
        >
          <TalentSkills talent={selectedTalent} notEditable />
          <TalentAbout talent={selectedTalent} notEditable />
        </Box>
      </Box>

      <TalentLinks talent={selectedTalent} notEditable />
      <Box display={'flex'} gap={'50px'}>
        <Box width={'50%'}>
          <TalentAttachments notEditable />
        </Box>
        <Box width={'50%'}>
          <TalentNotes notEditable />
        </Box>
      </Box>
    </Box>
  ) : null
}

export default AtTalentCardDetails
