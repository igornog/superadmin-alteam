import { Box } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { black, grey2, white } from '../../../../../../utils/colors'
import AtLine from '../../../../../AtLine/AtLine'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { useAppSelector } from '../../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../../utils/redux/selectors/clients.selector'
import { Availability, Currency, Difficulty, WorkType } from '@yjcapp/app'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTextField, {
  AtTextFieldType,
} from '../../../../../AtTextField/AtTextField'
import AtTextFieldDate from '../../../../../AtTextField/AtTextFieldDate'
import { Listing } from '../../../../../../utils/redux/types/listings.type'
import AtSwitch from '../../../../../AtSwitch/AtSwitch'
import {
  convertHexToRGBA,
  getCurrencySymbol,
  plurialize,
} from '../../../../../../utils/helpers'
import styled from 'styled-components'
import { Client } from '../../../../../../utils/redux/types/clients.type'
import { clientService } from '../../../../../../utils/services'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px;
`

const TeamStep1: React.FunctionComponent<Step1Props> = (props: Step1Props) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const [listClients, setListClients] = useState<Client[]>()

  useEffect(() => {
    if (!props.knownTotalPrice) {
      props.setTeam({
        ...props.team,
        exactRate: undefined,
      })
    }
  }, [props.knownTotalPrice, props])

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

  useEffect(() => {
    const getListClients = async () => {
      const list = await clientService.searchClient({ clientName: '' })
      setListClients(list)
    }

    getListClients()
  }, [])

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
            placeholder={'Enter Team Project Name'}
            onValueChange={(e) =>
              props.setTeam({ ...props.team, listingName: e })
            }
            maxLength={30}
          />

          {listClients && (
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              value={selectedClient.companyName}
              placeholder={'Client'}
              $listItems={listClients.map((client: Client, index: number) => ({
                id: index,
                label: client.companyName,
              }))}
              handleSelect={(e) => {
                const getClientFromName = listClients.find(
                  (item: Client) => item.companyName === e.label,
                )

                if (getClientFromName) {
                  props.setTeam({
                    ...props.team,
                    soloClient: getClientFromName,
                  })
                }
              }}
              label={'Client'}
            />
          )}

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
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
                  props.setTeam({
                    ...props.team,
                    workType: e.label as WorkType,
                  })
                }
                label={'Work Type'}
              />

              {props.team.workType === WorkType.Hybrid ||
              props.team.workType === WorkType.Remote ? (
                <AtTextField
                  fullWidth={true}
                  required={true}
                  placeholder={'Enter Timezone'}
                  onValueChange={(e) =>
                    props.setTeam({ ...props.team, timeZone: e })
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
            required={true}
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
            required={true}
            label={'Start Date'}
            onValueChange={(e) =>
              props.setTeam({ ...props.team, startDate: e as any })
            }
          />

          <AtTextFieldDropdown
            fullWidth={true}
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
  setKnownTotalPrice: Dispatch<React.SetStateAction<boolean>>
}

export default TeamStep1
