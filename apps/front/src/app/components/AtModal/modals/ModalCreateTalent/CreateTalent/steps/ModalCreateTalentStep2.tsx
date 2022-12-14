import { Box } from '@mui/material'
import { SearchNormal1 } from 'iconsax-react'
import React from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtTag from '../../../../../AtTag/AtTag'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'

const ModalCreateTalentStep2: React.FunctionComponent<
  ModalCreateTalentStep2Props
> = (props: ModalCreateTalentStep2Props) => {
  const handleDeleteTag = (value: string) => {
    props.setSkills(props.skills.filter((skill) => skill !== value))
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
        <AtTypography color={grey2}>
          Please select talent skills and add about talent information. This
          field is free to enter any information about the talent. Fields with *
          are mandatory to fill.
        </AtTypography>

        <AtTextField
          placeholder={'Search in Skills *'}
          value={''}
          startIcon={<SearchNormal1 />}
          onPressEnter={(e) => props.setSkills([...props.skills, e])}
          size={'small'}
        />

        {props.skills.length === 0 ? (
          <AtTypography color={grey2}>
            No skills have been added by the talent, please add them by
            searching below. Please note that you may add only up to 5 skills.
          </AtTypography>
        ) : (
          <Box display={'flex'} gap={'15px'} flexWrap={'wrap'}>
            {props.skills.map((skill: string, index: number) => {
              return (
                <AtTag
                  label={skill}
                  key={index}
                  onDelete={() => handleDeleteTag(skill)}
                />
              )
            })}
          </Box>
        )}
      </Box>

      <AtTextField
        multiline={true}
        rows={8}
        onValueChange={props.setAbout}
        value={props.about}
        label={'About Talent'}
        placeholder={'Enter About Talent'}
      />
    </Box>
  )
}
interface ModalCreateTalentStep2Props {
  skills: Array<string>
  setSkills: React.Dispatch<React.SetStateAction<string[]>>
  about: string
  setAbout: React.Dispatch<React.SetStateAction<string>>
}

export default ModalCreateTalentStep2
