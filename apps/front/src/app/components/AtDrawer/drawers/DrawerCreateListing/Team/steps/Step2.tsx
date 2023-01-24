import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField, {
  AtTextFieldType,
} from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { black, grey2 } from '../../../../../../utils/colors'
import { Listing } from '../../../../../../utils/redux/types/listings.type'
import {
  convertHexToRGBA,
  getCurrencySymbol,
} from '../../../../../../utils/helpers'

const TeamStep2: React.FunctionComponent<Step2Props> = (props: Step2Props) => {
  const [totalCost, setTotalCost] = useState(0)

  const updatePriceAndPercentage = (
    roleIndex: number,
    price: number,
    exactRate?: number,
  ) => {
    const newRoles = [...props.team.roles]
    newRoles[roleIndex] = {
      ...newRoles[roleIndex],
      price,
      percentage: exactRate ? (price * 100) / exactRate : undefined,
    }

    props.setTeam({ ...props.team, roles: newRoles })
  }

  const onPercentageChange = (e: string, i: number) => {
    if (props.team && props.team.exactRate) {
      const newPrice = (parseInt(e) * props.team.exactRate) / 100
      updatePriceAndPercentage(i, newPrice, props.team.exactRate)
    }
  }

  const onPriceChange = (e: string, i: number) => {
    if (props.team && props.team.exactRate) {
      updatePriceAndPercentage(i, parseInt(e), props.team.exactRate)
    } else {
      updatePriceAndPercentage(i, parseInt(e))
    }
  }

  useEffect(() => {
    setTotalCost(
      props.team.roles.reduce((acc, role) => {
        if (role.price) {
          return acc + role.price
        }

        return acc
      }, 0) * props.team.projectLength,
    )
  }, [props.team.projectLength, props.team.roles, props.team.individuals])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDirection={'column'}>
            <AtTypography variant={'h4'}>All Roles</AtTypography>
          </Box>
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
          <AtTypography>What is the monthly cost per role?</AtTypography>

          <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
            {props.team.roles.map((role, i) => {
              return (
                <Box display={'flex'} gap={'16px'}>
                  <Box width={props.team.exactRate ? '65%' : '80%'}>
                    <AtTextField
                      placeholder={'Enter Role Name'}
                      label={`Role Name ${i + 1}`}
                      required={true}
                      onValueChange={(e) => {
                        const newRoles = [...props.team.roles]
                        newRoles[i] = { ...newRoles[i], roleName: e }
                        props.setTeam({
                          ...props.team,
                          roles: newRoles,
                        })
                      }}
                    />
                  </Box>

                  {props.team.exactRate && (
                    <Box width={'15%'}>
                      <AtTextField
                        type={AtTextFieldType.Number}
                        label={`Percentage`}
                        value={props.team?.roles[i]?.percentage?.toFixed(0)}
                        onValueChange={(e) => onPercentageChange(e, i)}
                        endIcon={
                          <AtTypography color={convertHexToRGBA(black, 0.5)}>
                            %
                          </AtTypography>
                        }
                      />
                    </Box>
                  )}

                  <Box width={'20%'}>
                    <AtTextField
                      type={AtTextFieldType.Number}
                      label={`Cost per month`}
                      value={props.team?.roles[i]?.price?.toString()}
                      onValueChange={(e) => onPriceChange(e, i)}
                      startIcon={
                        <AtTypography color={convertHexToRGBA(black, 0.5)}>
                          {getCurrencySymbol(props.team.currency)}
                        </AtTypography>
                      }
                    />
                  </Box>
                </Box>
              )
            })}

            <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
              <AtTypography variant={'body1'}>
                <Box display={'flex'} gap={'4px'}>
                  Monthly cost of the project :{' '}
                  <AtTypography $bold={true}>
                    {props.team.roles.reduce((acc, role) => {
                      if (role.price) {
                        return acc + role.price
                      }

                      return acc
                    }, 0)}
                    {getCurrencySymbol(props.team.currency)}
                  </AtTypography>
                </Box>
              </AtTypography>
              <AtTypography variant={'body1'}>
                <Box display={'flex'} gap={'4px'}>
                  Total cost of the project :{' '}
                  <AtTypography $bold={true}>
                    {props.team.exactRate ?? totalCost}
                    {getCurrencySymbol(props.team.currency)}
                  </AtTypography>
                </Box>
              </AtTypography>
            </Box>
          </Box>
        </Box>
      </StyledForm>
    </Box>
  )
}

interface Step2Props {
  setTeam: React.Dispatch<React.SetStateAction<Listing>>
  team: Listing
}

export default TeamStep2
