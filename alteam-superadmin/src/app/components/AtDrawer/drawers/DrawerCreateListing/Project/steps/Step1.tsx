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
  ProjectRole,
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
import moment from 'moment'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px; 
  text-wrap: nowrap;
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
      const list = await clientService.searchClient({ companyName: '' })
      setListClients(list)
    }

    getListClients()
  }, [])

  return (
    <StyledForm>
      <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h4'}>Role Specifications</AtTypography>
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

          {listClients && (
            <AtTextFieldDropdown
              fullWidth
              searchable
              required
              value={selectedClient.companyName}
              placeholder={'Client'}
              $listItems={listClients.map((client: Client, index: number) => ({
                id: index,
                label: client.companyName,
              }))}
              handleselect={(e) => {
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
            fullWidth
            required
            placeholder={'Role'}
            $listItems={Object.values(ProjectRole).map(
              (label: ProjectRole, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            handleselect={(e) =>
              props.setProject({
                ...props.project,
                role: e.label as ProjectRole,
              })
            }
            label={'Role Type'}
          />

          <AtTextFieldDropdown
            fullWidth
            required
            placeholder={'Select Number of Individuals'}
            $listItems={Array.from(Array(10).keys()).map((key) => ({
              id: key + 1,
              label: key === 9 ? '10+' : (key + 1).toString(),
            }))}
            handleselect={(e) =>
              props.setProject({
                ...props.project,
                individuals: parseInt(e.label) as number,
              })
            }
            label={'Number of Individuals'}
          />

          <AtTextFieldDropdown
            fullWidth
            required
            placeholder={'Select Seniority'}
            $listItems={Object.values(Difficulty).map(
              (label: Difficulty, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            handleselect={(e) =>
              props.setProject({
                ...props.project,
                difficulty: e.label as Difficulty,
              })
            }
            label={'Seniority'}
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
                  handleselect={(e) =>
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
                    handleselect={(e) =>
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
            handleselect={(e) =>
              props.setProject({
                ...props.project,
                availability: e.label as Availability,
              })
            }
            label={'Availability'}
          />

          <AtTextFieldDate
            required
            value={''}
            label={'Start Date'}
            onValueChange={(e) =>
              props.setProject({ ...props.project, startDate: moment.utc(e).format('DD.MM.YYYY') as any })
            }
          />

          <AtTextField
            label={'Project Length'}
            type={AtTextFieldType.Number}
            required
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

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth
              required
              placeholder={'Select Day Rate'}
              $listItems={Object.values(RateType).map(
                (label: RateType, index: number) => ({
                  id: index,
                  label: label,
                }),
              )}
              handleselect={(e) => props.setRateType(e.label as RateType)}
              label={'Day Rate'}
            />

            <Box display={'flex'} gap={'16px'}>
              {props.rateType && (
                <AtTextField
                  placeholder={
                    props.rateType === RateType.Variable
                      ? 'Day Rate From'
                      : 'Enter Exact Day Rate'
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
                  placeholder={'Day Rate To'}
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
            fullWidth
            placeholder={'Select Your Currency'}
            $listItems={Object.values(Currency).map(
              (label: Currency, index: number) => ({
                id: index,
                key: label,
                label: label + ` (${getCurrencySymbol(label)})`,
              }),
            )}
            handleselect={(e) =>
              props.setProject({
                ...props.project,
                currency: e.key as Currency,
              })
            }
            label={'Currency'}
          />

          <AtTextField
            label={'Brief presentation'}
            placeholder={'Add a link to your deck'}
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
