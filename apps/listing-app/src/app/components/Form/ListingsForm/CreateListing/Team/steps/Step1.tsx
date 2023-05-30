import { Box } from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import { black, grey2, white } from '../../../../../../utils/colors'
import AtLine from '../../../../../Line/Line'
import AtTypography from '../../../../../Typography/Typography'
import { WorkType, Availability, Currency, Difficulty } from '@yjcapp/app'
import AtTextFieldDropdown from '../../../../../Dropdown/TextFieldDropdown'
import AtSwitch from '../../../../../Switch/Switch'
import AtTextField, {
  AtTextFieldType,
} from '../../../../../TextField/TextField'
import AtTextFieldDate from '../../../../../TextField/TextFieldDate'
import {
  plurialize,
  getCurrencySymbol,
  convertHexToRGBA,
} from '../../../../../../utils/helpers'
import { Listing } from '../../../../../../utils/redux/types/listings.type'
import { StyledForm } from '../../CreateListingStart'
import styled from 'styled-components'
import AtTimezoneDropdown from '../../../../../Dropdown/TimezoneDropdown'
import moment from 'moment'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px;
`

const TeamStep1: React.FC<Step1Props> = (props: Step1Props) => {
  const isDifferentOnSite =
    props.team.workType === WorkType.Hybrid ||
    props.team.workType === WorkType.Remote

  useEffect(() => {
    if (!props.knownTotalPrice) {
      props.setTeam({
        ...props.team,
        exactRate: undefined,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.knownTotalPrice])

  useEffect(() => {
    if (props.team.roles.length < props.team.individuals) {
      const newRoles = Array(
        props.team.individuals - props.team.roles.length,
      ).fill({
        roleName: '',
        description: '',
        price: 0,
        percentage: 0,
      })
      props.team.roles.push(...newRoles)
    } else {
      props.team.roles.splice(
        props.team.individuals,
        props.team.roles.length - props.team.individuals,
      )
    }
  }, [props.team.roles, props.team.individuals])

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
            placeholder={'Enter Team Project Name'}
            onValueChange={(e) =>
              props.setTeam({ ...props.team, listingName: e })
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
              props.setTeam({
                ...props.team,
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
                    props.setTeam({
                      ...props.team,
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
                      props.setTeam({ ...props.team, timeZone: e })
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
              props.setTeam({
                ...props.team,
                availability: e.label as Availability,
              })
            }
            label={'Availability'}
          />

          <AtTextField
            placeholder={'Enter Project Length'}
            type={AtTextFieldType.Number}
            label={'Project Length'}
            minValue={1}
            required
            onValueChange={(e) =>
              props.setTeam({ ...props.team, projectLength: parseInt(e) })
            }
            endIcon={
              <StyledPeriod>
                <AtTypography variant={'caption'}>
                  {plurialize(props.team.projectLength ?? 0, 'Month', true)}
                </AtTypography>
              </StyledPeriod>
            }
          />

          <AtTextFieldDate
            required
            value={''}
            label={'Start Date'}
            onValueChange={(e) =>
              props.setTeam({
                ...props.team,
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
              props.setTeam({
                ...props.team,
                currency: e.key as Currency,
              })
            }
            label={'Currency'}
          />

          <Box
            display={'flex'}
            gap={props.knownTotalPrice ? '20px' : 0}
            flexDirection={'column'}
          >
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <AtTypography>Do you know in monthly team cost?</AtTypography>
              <AtSwitch
                label={props.knownTotalPrice ? 'Yes' : 'No'}
                placement={'end'}
                onChange={() =>
                  props.setKnownTotalPrice(!props.knownTotalPrice)
                }
              />
            </Box>

            <Box display={'flex'} gap={'16px'} width={'100%'}>
              {props.knownTotalPrice && (
                <AtTextField
                  label={'Team Rate'}
                  type={AtTextFieldType.Number}
                  minValue={1}
                  placeholder={'Enter Exact Rate'}
                  startIcon={
                    <AtTypography color={convertHexToRGBA(black, 0.5)}>
                      {getCurrencySymbol(props.team.currency)}
                    </AtTypography>
                  }
                  maxLength={30}
                  value={props.team.exactRate?.toString()}
                  onValueChange={(e) =>
                    props.setTeam({
                      ...props.team,
                      exactRate: parseFloat(e),
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
              props.setTeam({
                ...props.team,
                difficulty: e.label as Difficulty,
              })
            }
            label={'Difficulty'}
          />

          <AtTextField
            label={'Learning'}
            placeholder={'Enter Learning Link'}
            onValueChange={(e) =>
              props.setTeam({ ...props.team, learningLink: e })
            }
          />
        </Box>
      </Box>
    </StyledForm>
  )
}

interface Step1Props {
  setTeam: Dispatch<React.SetStateAction<Listing>>
  team: Listing
  knownTotalPrice: boolean
  isSmallScreen?: boolean
  setKnownTotalPrice: Dispatch<React.SetStateAction<boolean>>
}

export default TeamStep1
