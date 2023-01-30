import { Box } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { black, grey2, white } from '../../../../../../utils/colors'
import AtLine from '../../../../../AtLine/AtLine'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { useAppSelector } from '../../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../../utils/redux/selectors/clients.selector'
import {
  Availability,
  Currency,
  Difficulty,
  RateType,
  WorkType,
} from '@yjcapp/app'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTextField, {
  AtTextFieldType,
} from '../../../../../AtTextField/AtTextField'
import { Listing } from '../../../../../../utils/redux/types/listings.type'
import styled from 'styled-components'
import {
  convertHexToRGBA,
  getCurrencySymbol,
  plurialize,
} from '../../../../../../utils/helpers'
import AtTimezoneDropdown from '../../../../../AtDropdown/AtTimezoneDropdown'
import AtTextFieldDate from '../../../../../AtTextField/AtTextFieldDate'
import { Client } from '../../../../../../utils/redux/types/clients.type'
import { clientService } from '../../../../../../utils/services'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px;
`

const ProjectStep1: React.FunctionComponent<Step1Props> = (
  props: Step1Props,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const isDifferentOnSite =
    props.project.workType === WorkType.Hybrid ||
    props.project.workType === WorkType.Remote
  const [listClients, setListClients] = useState<Client[]>()

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
            placeholder={'Enter Project Name'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, listingName: e })
            }
            maxLength={30}
          />

          {listClients && (
            <AtTextFieldDropdown
              fullWidth={true}
              searchable={true}
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
                  props.setProject({
                    ...props.project,
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
              </Box>

              {isDifferentOnSite ? (
                <Box width={'50%'}>
                  <AtTimezoneDropdown
                    fullWidth={true}
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
            endIcon={
              <StyledPeriod>
                <AtTypography variant={'caption'}>
                  {plurialize(props.project.projectLength ?? 0, 'Month', true)}
                </AtTypography>
              </StyledPeriod>
            }
          />

          <AtTextFieldDate
            required={true}
            label={'Start Date'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, startDate: e as any })
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
              props.setProject({
                ...props.project,
                currency: e.key as Currency,
              })
            }
            label={'Currency'}
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
                  startIcon={
                    <AtTypography color={convertHexToRGBA(black, 0.5)}>
                      {getCurrencySymbol(props.project.currency)}
                    </AtTypography>
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
  setProject: Dispatch<React.SetStateAction<Listing>>
  project: Listing
  rateType?: RateType
  setRateType: Dispatch<React.SetStateAction<RateType | undefined>>
}

export default ProjectStep1
