import { Dispatch } from 'react'
import styled from 'styled-components'
import { StyledForm } from '../../CreateListingStart'
import {
  WorkType,
  Availability,
  Currency,
  RateType,
  Difficulty,
} from '@yjcapp/app'
import AtTextFieldDropdown from '../../../../../Dropdown/TextFieldDropdown'
import AtTimezoneDropdown from '../../../../../Dropdown/TimezoneDropdown'
import AtLine from '../../../../../Line/Line'
import AtTextField, {
  AtTextFieldType,
} from '../../../../../TextField/TextField'
import AtTextFieldDate from '../../../../../TextField/TextFieldDate'
import AtTypography from '../../../../../Typography/Typography'
import { black, white, grey2 } from '../../../../../../utils/colors'
import {
  plurialize,
  getCurrencySymbol,
  convertHexToRGBA,
} from '../../../../../../utils/helpers'
import { Listing } from '../../../../../../utils/redux/types/listings.type'
import { Box } from '@mui/material'
import moment from 'moment'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px;
`

const ProjectStep1: React.FC<Step1Props> = (props: Step1Props) => {
  const isDifferentOnSite =
    props.project.workType === WorkType.Hybrid ||
    props.project.workType === WorkType.Remote

  return (
    <StyledForm>
      <Box
        padding={'20px'}
        display={'flex'}
        justifyContent={'space-between'}
        flexDirection={props.isSmallScreen ? 'column' : 'row'}
      >
        <AtTypography
          variant={'h4'}
          fontSize={props.isSmallScreen ? '1.125rem' : '1.625rem'}
        >
          General Information
        </AtTypography>
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
            required
            placeholder={'Enter Project Name'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, listingName: e })
            }
            maxLength={30}
          />

          <AtTextFieldDropdown
            fullWidth
            required
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
              <Box width={isDifferentOnSite ? '50%' : '100%'}>
                <AtTextFieldDropdown
                  fullWidth
                  required
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
              </Box>

              {isDifferentOnSite ? (
                <Box width={'50%'}>
                  <AtTimezoneDropdown
                    fullWidth
                    placeholder={'Enter Timezone'}
                    handleSelect={(e) =>
                      props.setProject({ ...props.project, timeZone: e })
                    }
                  />
                </Box>
              ) : null}
            </Box>
          </Box>
          <AtTextFieldDropdown
            fullWidth
            required
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
            required
            placeholder={'Enter Project Length'}
            maxLength={30}
            minValue={1}
            onValueChange={(e) =>
              props.setProject({ ...props.project, projectLength: parseInt(e) })
            }
            endIcon={
              <StyledPeriod>
                <AtTypography variant={'caption'}>
                  {plurialize(props.project.projectLength ?? 0, 'Month', true)}
                </AtTypography>
              </StyledPeriod>
            }
          />

          <AtTextFieldDate
            required
            value={''}
            label={'Start Date'}
            onValueChange={(e) =>
              props.setProject({
                ...props.project,
                startDate: moment(e).format('MM.DD.YYYY') as any,
              })
            }
          />

          <AtTextFieldDropdown
            fullWidth
            placeholder={'Select Your Currency'}
            $listItems={Object.values(Currency).map(
              (label: Currency, index: number) => ({
                id: index,
                key: label,
                label: label + ` (${getCurrencySymbol(label)})`,
              }),
            )}
            handleSelect={(e) =>
              props.setProject({
                ...props.project,
                currency: e.key as Currency,
              })
            }
            label={'Currency'}
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth
              required
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
                  startIcon={
                    <AtTypography color={convertHexToRGBA(black, 0.5)}>
                      {getCurrencySymbol(props.project.currency)}
                    </AtTypography>
                  }
                  maxLength={30}
                  minValue={1}
                  type={AtTextFieldType.Number}
                  value={props.project.rateFrom?.toString()}
                  onValueChange={(e) =>
                    props.rateType === RateType.Variable ?
                      props.setProject({
                        ...props.project,
                        rateFrom: parseFloat(e),
                      }) :
                      props.setProject({
                        ...props.project,
                        exactRate: parseFloat(e),
                      })}
                />
              )}

              {props.rateType === RateType.Variable && (
                <AtTextField
                  placeholder={'Rate To'}
                  maxLength={30}
                  minValue={
                    props.project.rateFrom ? props.project.rateFrom + 1 : 2
                  }
                  type={AtTextFieldType.Number}
                  startIcon={
                    <AtTypography color={convertHexToRGBA(black, 0.5)}>
                      {getCurrencySymbol(props.project.currency)}
                    </AtTypography>
                  }
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
            fullWidth
            required
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
  setProject: Dispatch<React.SetStateAction<Listing>>
  project: Listing
  rateType?: RateType
  setRateType: Dispatch<React.SetStateAction<RateType | undefined>>
  isSmallScreen?: boolean
}

export default ProjectStep1
