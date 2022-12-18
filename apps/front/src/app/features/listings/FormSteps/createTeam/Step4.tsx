import { Box } from '@mui/material'
import React, { useState } from 'react'
import { StyledForm } from '../../CreateListing'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey2 } from '../../../../utils/colors'
import AtLine from '../../../../components/AtLine/AtLine'
import AtTextField from '../../../../components/AtTextField/AtTextField'
import { SearchNormal1 } from 'iconsax-react'
import { Skill } from '../../../../utils/redux/types/talents.type'
import AtTag from '../../../../components/AtTag/AtTag'


const Step2: React.FunctionComponent = () => {
  const [skills, setSkills] = useState([
    { label: 'UI/UX Design' },
    { label: 'Figma' },
    { label: 'Sketch' },
    { label: 'Wireframe' }
  ])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>Add Skills</AtTypography>
          <AtTypography variant={'caption'} color={grey2}>
            Fields with * are mandatory
          </AtTypography>
        </Box>
        <AtLine />
        <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
          <AtTextField
            placeholder={'Search in Skills'}
            value={''}
            startIcon={<SearchNormal1 />}
            size={'small'}
          />
          <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
            {skills && skills.length > 0 ? (
              skills?.map((skill: Skill, index) => {
                return <AtTag label={skill.label} delete={true} key={index} />
              })
            ) : (
              <AtTypography color={grey2}>
                No skills have been added by the talent, please add them by
                searching below. Please note that you may add only up to 5 skills.{' '}
              </AtTypography>
            )}
          </Box>
        </Box>
      </StyledForm>

    </Box>
  )
}

export default Step2
