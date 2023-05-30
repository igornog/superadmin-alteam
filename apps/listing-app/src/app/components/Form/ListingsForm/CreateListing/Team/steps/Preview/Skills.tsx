import { Box } from '@mui/material'
import React from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTag from '../../../../../../Tag/Tag'

const Skills: React.FunctionComponent<SkillsProps> = (
  props: SkillsProps,
) => {
  return (
    <AtFrame
      title={'Skills'}
      onClick={() => undefined}
      backgroundColor={'#FBFCFF'}
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
    </AtFrame>
  )
}

interface SkillsProps {
  listing: any
}

export default Skills
