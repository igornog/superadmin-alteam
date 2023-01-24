import React, { useEffect, useState } from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2, red } from '../../../../../../utils/colors'
import { Box } from '@mui/material'
import styled from 'styled-components'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../../AtButton/AtButton'
import { AddSquare } from 'iconsax-react'
import AtTextFieldDropdown, {
  DropdownItem,
} from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTag from '../../../../../AtTag/AtTag'
import { v4 as uuid } from 'uuid'
import { Role } from '@yjcapp/app'
import { Listing } from '../../../../../../utils/redux/types/listings.type'

const StyledBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`

const StyledTag = styled(AtTag)`
  background: transparent;
  height: auto;

  svg {
    color: ${red} !important;
  }
`

const StyledButton = styled(AtButton)`
  width: fit-content;
  align-self: flex-end;
`

interface JobDescriptionProps {
  id: number
  role: string
  description: string
}

const TeamStep3: React.FunctionComponent<Step3Props> = (props: Step3Props) => {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescriptionProps[]>(
    [],
  )

  const handleDeleteTag = (value: number) => {
    setJobDescriptions(
      jobDescriptions.filter(
        (jobDescription: JobDescriptionProps) => jobDescription.id !== value,
      ),
    )
  }

  const handleRoleChange = (e: DropdownItem, i: number) => {
    setJobDescriptions(
      jobDescriptions.map((item: JobDescriptionProps) => {
        if (item.id === i) {
          return { ...item, role: e.label }
        }

        return item
      }),
    )
  }

  const handleJobDescriptionChange = (e: string, i: number) => {
    if (jobDescriptions.length > 0) {
      setJobDescriptions(
        jobDescriptions.map((item: JobDescriptionProps) => {
          if (item.id === i) {
            return { ...item, description: e }
          }

          return item
        }),
      )
    }
  }

  useEffect(() => {
    props.team.roles.map((teamObj: Role) => {
      const jobDescription = jobDescriptions.find(
        (job: JobDescriptionProps) => job.role === teamObj.roleName,
      )

      teamObj.description = jobDescription?.description ?? ''

      return teamObj
    })
  }, [jobDescriptions, props.team.roles])

  return (
    <StyledForm>
      <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h4'}>Job Description</AtTypography>
        <AtTypography variant={'caption'} color={grey2}>
          Fields with * are mandatory
        </AtTypography>
      </Box>

      <AtLine />

      <StyledBox>
        <Box
          gap={'15px'}
          display={'flex'}
          flexDirection={'column'}
          position={'relative'}
          alignItems={'flex-end'}
        >
          <Box display={'flex'} width={'100%'}>
            <AtTextField value={'General Description'} readonly={true} />
          </Box>

          <AtTextField
            onValueChange={(e) =>
              props.setTeam({ ...props.team, jobDescription: e as string })
            }
            maxLength={500}
            multiline={true}
            rows={6}
            required={true}
            placeholder={'Enter General Description'}
            charCounter={true}
          />
        </Box>

        {jobDescriptions.length > 0 &&
          jobDescriptions.map(
            (jobDescription: JobDescriptionProps, i: number) => {
              return (
                <Box
                  gap={'30px'}
                  display={'flex'}
                  flexDirection={'column'}
                  position={'relative'}
                  alignItems={'flex-end'}
                  key={jobDescription.id}
                >
                  <AtLine />
                  <Box display={'flex'} width={'100%'}>
                    <AtTextFieldDropdown
                      fullWidth={true}
                      required={true}
                      placeholder={'Enter Role Name'}
                      $listItems={[
                        ...props.team.roles
                          .filter(
                            (role: Role) =>
                              !jobDescriptions
                                .map((item: JobDescriptionProps) => item.role)
                                .includes(role.roleName),
                          )
                          .map((role: Role, index: number) => ({
                            id: index + 1,
                            label: role?.roleName,
                          })),
                      ]}
                      label={`Role Name ${i + 1}`}
                      handleSelect={(e) =>
                        handleRoleChange(e, jobDescription.id)
                      }
                    />

                    {jobDescriptions.length > 0 ? (
                      <StyledTag
                        label={''}
                        key={jobDescription.id}
                        onDelete={() => handleDeleteTag(jobDescription.id)}
                      />
                    ) : (
                      ''
                    )}
                  </Box>

                  <AtTextField
                    onValueChange={(e) =>
                      handleJobDescriptionChange(e, jobDescription.id)
                    }
                    value={jobDescription.description}
                    maxLength={500}
                    multiline={true}
                    rows={6}
                    required={true}
                    label={`Job Description ${i + 1}`}
                    placeholder={'Enter Job Description'}
                    charCounter={true}
                  />
                </Box>
              )
            },
          )}

        {jobDescriptions.length < props.team.roles.length && (
          <StyledButton
            onClick={() => {
              setJobDescriptions([
                ...jobDescriptions,
                { id: uuid(), role: '', description: '' },
              ])
            }}
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            endIcon={<AddSquare size={16} />}
            name={'Add Role Description'}
          />
        )}
      </StyledBox>
    </StyledForm>
  )
}

interface Step3Props {
  setTeam: React.Dispatch<React.SetStateAction<Listing>>
  team: Listing
}

export default TeamStep3
