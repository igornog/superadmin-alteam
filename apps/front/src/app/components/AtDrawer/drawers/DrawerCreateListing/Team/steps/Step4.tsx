import { Box } from '@mui/material'
import React from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2 } from '../../../../../../utils/colors'
import { SearchNormal1 } from 'iconsax-react'
import AtTag from '../../../../../AtTag/AtTag'
import { Listing } from '../../../../../../utils/redux/types/listings.type'

const TeamStep4: React.FunctionComponent<Step4Props> = (props: Step4Props) => {
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
            onPressEnter={(e) =>
              props.setTeam({
                ...props.team,
                skills: [...props.team.skills, e],
              })
            }
            startIcon={<SearchNormal1 />}
            size={'small'}
          />
          <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
            {props.team.skills?.length > 0 ? (
              props.team.skills?.map((skill: string, index: number) => {
                return (
                  <AtTag
                    label={skill}
                    key={index}
                    onDelete={() =>
                      props.setTeam({
                        ...props.team,
                        skills: props.team.skills.filter(
                          (item: string) => item !== skill,
                        ),
                      })
                    }
                  />
                )
              })
            ) : (
              <AtTypography color={grey2}>
                No skills have been added by the talent, please add them by
                searching below. Please note that you may add only up to 7
                skills.
              </AtTypography>
            )}
          </Box>
        </Box>
      </StyledForm>
    </Box>
  )
}

interface Step4Props {
  setTeam: React.Dispatch<React.SetStateAction<Listing>>
  team: Listing
}

export default TeamStep4
