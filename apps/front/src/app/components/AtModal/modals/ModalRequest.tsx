import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { DeliveryType, ProjectType, TeamRequest } from '@yjcapp/app'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handlePatchClient } from '../../../utils/redux/actions/clients.action'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextFieldDropdown from '../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../AtLine/AtLine'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'

const ModalRequest: React.FunctionComponent<ModalRequestProps> = (
  props: ModalRequestProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const dispatch = useAppDispatch()
  const [projectType, setProjectType] = useState<ProjectType>()
  const [deliveryType, setDeliveryType] = useState<DeliveryType>()
  const [teamRequest, setTeamRequest] = useState<TeamRequest>()
  const [request, setRequest] = useState<string>()

  const handleSave = () => {
    dispatch(
      handlePatchClient({
        id: selectedClient.id,
        projectType,
        deliveryType,
        teamRequest,
        request,
      }),
    )
    props.onClose?.()
  }

  return (
    <AtModal isOpen={props.open} size={ModalSize.Small} onClose={props.onClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Request</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={'30px'} padding={2.5}>
        <AtTextFieldDropdown
          fullWidth={true}
          value={selectedClient.projectType}
          placeholder={'Select option...'}
          handleSelect={(e) => setProjectType(e.label as ProjectType)}
          $listItems={Object.values(ProjectType).map(
            (label: ProjectType, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          label={'Project Type'}
        />

        <AtTextFieldDropdown
          fullWidth={true}
          value={selectedClient.deliveryType}
          placeholder={'Select option...'}
          handleSelect={(e) => setDeliveryType(e.label as DeliveryType)}
          $listItems={Object.values(DeliveryType).map(
            (label: DeliveryType, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          label={'Delivery Type'}
        />

        <AtTextFieldDropdown
          fullWidth={true}
          value={selectedClient.teamRequest}
          placeholder={'Select option...'}
          handleSelect={(e) => setTeamRequest(e.label as TeamRequest)}
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
          onValueChange={setRequest}
          rows={6}
          label={'Request'}
          value={selectedClient.request}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleSave}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalRequestProps {
  open: boolean
  onClose: () => void
}

export default ModalRequest
