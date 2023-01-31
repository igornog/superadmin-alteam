import { Box } from '@mui/material'
import React, { Dispatch } from 'react'
import { Client } from '../../../../../utils/redux/types/clients.type'
import AtTextFieldDropdown from '../../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../../AtLine/AtLine'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'
import { StyledForm } from '../DrawerCreateClient'
import {
  DeliveryType,
  ProjectType,
  CreateClientStatus,
  TeamRequest,
  ClientStatus,
} from '@yjcapp/app'
import { grey2 } from '../../../../../utils/colors'

const Step2: React.FunctionComponent<Step2Props> = (props: Step2Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'}>
          <AtTypography variant={'h4'}>Request</AtTypography>
        </Box>

        <AtLine />

        <Box
          padding={'20px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'50px'}
        >
          <AtTextFieldDropdown
            fullWidth={true}
            placeholder={'Select option...'}
            value={undefined}
            $listItems={Object.values(ProjectType).map(
              (label: ProjectType, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            handleSelect={(e) =>
              props.setClient({
                ...props.client,
                projectType: e.label as ProjectType,
              })
            }
            label={'Project Type'}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            value={undefined}
            placeholder={'Select option...'}
            $listItems={Object.values(DeliveryType).map(
              (label: DeliveryType, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            handleSelect={(e) =>
              props.setClient({
                ...props.client,
                deliveryType: e.label as DeliveryType,
              })
            }
            label={'Delivery Type'}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            value={undefined}
            placeholder={'Select option...'}
            handleSelect={(e) =>
              props.setClient({
                ...props.client,
                teamRequest: e.label as TeamRequest,
              })
            }
            $listItems={Object.values(TeamRequest).map(
              (label: TeamRequest, index: number) => ({
                id: index,
                label: label,
              }),
            )}
            label={'Team Request'}
          />

          <AtTextField
            multiline={true}
            rows={6}
            label={'Request'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, request: e })
            }
          />
        </Box>
      </StyledForm>

      <StyledForm>
        <Box padding={'20px'}>
          <AtTypography variant={'h4'}>Client</AtTypography>
        </Box>

        <AtLine />

        <Box
          padding={'20px'}
          paddingTop={'30px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'30px'}
        >
          <AtTextField
            label={'Email'}
            placeholder={'Enter Email'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, email: e })
            }
          />

          <AtTextField
            label={'Full Name'}
            placeholder={'Enter Full Name'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, fullName: e })
            }
          />

          <AtTextField
            label={'Position'}
            placeholder={'Enter position'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, position: e })
            }
          />
        </Box>
      </StyledForm>

      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>Client Status</AtTypography>
          <AtTypography variant={'caption'} color={grey2}>
            Fields with * are mandatory
          </AtTypography>
        </Box>

        <AtLine />

        <Box
          padding={'20px'}
          marginBottom={'60px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'30px'}
        >
          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Client Request'}
            value={undefined}
            $listItems={CreateClientStatus.map((status, index) => ({
              id: index,
              label: status.label,
              value: status.value,
            }))}
            handleSelect={(e) => {
              props.setClient({
                ...props.client,
                status: e.value as ClientStatus,
              })
            }}
            label={'Is the client qualified?'}
          />
        </Box>
      </StyledForm>
    </Box>
  )
}

interface Step2Props {
  client: Client
  setClient: Dispatch<React.SetStateAction<Client>>
}

export default Step2
