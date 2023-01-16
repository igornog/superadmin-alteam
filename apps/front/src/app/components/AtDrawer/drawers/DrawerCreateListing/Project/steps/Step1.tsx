import { Box } from '@mui/material'
import React, { Dispatch } from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtLine from '../../../../../AtLine/AtLine'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { useAppSelector } from '../../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../../utils/redux/selectors/clients.selector'
import { Availability, Difficulty, RateType, WorkType } from '@yjcapp/app'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTextField, {
  AtTextFieldType,
} from '../../../../../AtTextField/AtTextField'
import AtTextFieldDate from '../../../../../AtTextField/AtTextFieldDate'
import { Project } from '../../../../../../utils/redux/types/listings.type'

const ProjectStep1: React.FunctionComponent<Step1Props> = (
  props: Step1Props,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  return (
    <StyledForm>
      <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h4'}>General Information</AtTypography>
        <AtTypography variant={'caption'} color={grey2}>
          Fields with * are mandatory
        </AtTypography>
      </Box>
      <AtLine />

      <Box
        padding={'20px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'50px'}
      >
        <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
          <AtTextField
            label={'Project Name'}
            required={true}
            placeholder={'Enter Project Name'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, projectName: e })
            }
            maxLength={30}
          />

          <AtTextField
            label={'Client'}
            readonly={true}
            defaultValue={selectedClient.companyName}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Select Number of Individuals'}
            $listItems={Array.from(Array(10).keys()).map((key) => ({
              id: key + 1,
              label: (key + 1).toString(),
            }))}
            handleSelect={(e) =>
              props.setProject({
                ...props.project,
                individuals: parseInt(e.label) as number,
              })
            }
            label={'Number of Individuals'}
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <Box display={'flex'} gap={'16px'}>
              <AtTextFieldDropdown
                fullWidth={true}
                required={true}
                placeholder={'Select Work Type'}
                $listItems={Object.values(WorkType).map(
                  (label: WorkType, index: number) => ({
                    id: index,
                    label: label,
                  }),
                )}
                handleSelect={(e) =>
                  props.setProject({
                    ...props.project,
                    workType: e.label as WorkType,
                  })
                }
                label={'Work Type'}
              />

              {props.project.workType === WorkType.Hybrid ||
              props.project.workType === WorkType.Remote ? (
                <AtTextField
                  fullWidth={true}
                  required={true}
                  placeholder={'Enter Timezone'}
                  onValueChange={(e) =>
                    props.setProject({ ...props.project, timeZone: e })
                  }
                  maxLength={6}
                />
              ) : null}
            </Box>
          </Box>
          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Select Availability'}
            $listItems={Object.values(Availability).map(
              (label: Availability, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            handleSelect={(e) =>
              props.setProject({
                ...props.project,
                availability: e.label as Availability,
              })
            }
            label={'Availability'}
          />

          <AtTextField
            label={'Project Length'}
            type={AtTextFieldType.Number}
            required={true}
            placeholder={'Enter Project Length'}
            maxLength={30}
            onValueChange={(e) =>
              props.setProject({ ...props.project, projectLength: parseInt(e) })
            }
          />

          <AtTextFieldDate
            label={'Start Date'}
            required={true}
            placeholder={'Enter Start Date'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, startDate: e as any })
            }
          />

          <AtTextField
            label={'Start Date'}
            required={true}
            placeholder={'Enter Start Date'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, startDate: e as any })
            }
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              placeholder={'Select Rate'}
              $listItems={Object.values(RateType).map(
                (label: RateType, index: number) => ({
                  id: index,
                  label: label,
                }),
              )}
              handleSelect={(e) => props.setRateType(e.label as RateType)}
              label={'Rate'}
            />

            <Box display={'flex'} gap={'16px'}>
              {props.rateType && (
                <AtTextField
                  placeholder={
                    props.rateType === RateType.Variable
                      ? 'Rate From'
                      : 'Enter Exact Rate'
                  }
                  maxLength={30}
                  value={props.project.rateFrom?.toString()}
                  onValueChange={(e) =>
                    props.setProject({
                      ...props.project,
                      rateFrom: parseFloat(e),
                    })
                  }
                />
              )}

              {props.rateType === RateType.Variable && (
                <AtTextField
                  placeholder={'Rate To'}
                  maxLength={30}
                  value={props.project.rateTo?.toString()}
                  onValueChange={(e) =>
                    props.setProject({
                      ...props.project,
                      rateTo: parseFloat(e),
                    })
                  }
                />
              )}
            </Box>
          </Box>

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Select Difficulty'}
            $listItems={Object.values(Difficulty).map(
              (label: Difficulty, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            handleSelect={(e) =>
              props.setProject({
                ...props.project,
                difficulty: e.label as Difficulty,
              })
            }
            label={'Difficulty'}
          />

          <AtTextField
            label={'Learning'}
            placeholder={'Enter Learning Link'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, learningLink: e })
            }
          />
        </Box>
      </Box>
    </StyledForm>
  )
}

interface Step1Props {
  setProject: Dispatch<React.SetStateAction<Project>>
  project: Project
  rateType?: RateType
  setRateType: Dispatch<React.SetStateAction<RateType | undefined>>
}

export default ProjectStep1
