import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import AtTypography from '../../AtTypography/AtTypography'
import { AtContextMenuItem } from '../AtRightClick'
import Arrow2 from '../../../assets/images/icons/arrow2.svg'
import ArrowCircle from '../../../assets/images/icons/refresh-circle.svg'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { RightClick } from '../../../utils/types'
import { TrushSquare } from 'iconsax-react'
import { handleClients, handleDeleteClient, handlePatchClient } from '../../../utils/redux/actions/clients.action'
import { ClientStatus } from '@yjcapp/app'
import { Client } from '../../../utils/redux/types/clients.type'
import { useNavigate } from 'react-router-dom'

const ClientMenu: React.FunctionComponent<ClientMenuProps> = (
  props: ClientMenuProps,
) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const isCurrentTabAllowed = (rightclickFunc: RightClick) => {
    return activeTab.clientRightClick.includes(rightclickFunc)
  }

  const moveToAccepted = () => {
    dispatch(handlePatchClient({
      id: props.client.id,
      status: ClientStatus.Active,
    }))
  }

  const moveToDeclined = () => {
    dispatch(handlePatchClient({
      id: props.client.id,
      status: ClientStatus.Declined,
    }))
  }

  const moveToInactive = () => {
    dispatch(handlePatchClient({
      id: props.client.id,
      status: ClientStatus.Inactive,
    }))
  }

  const deleteClient = async () => {
    await dispatch(handleDeleteClient(props.client.id as number))
    await dispatch(handleClients({}))
  }

  return (
    <>
      {isCurrentTabAllowed(RightClick.MoveToActive) && (
        <AtContextMenuItem onSelect={moveToAccepted}>
          <AtTypography>
            <img src={Arrow2} alt={'Arrow'} width={20} />
            {RightClick.MoveToActive}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.MoveToInactive) && (
        <AtContextMenuItem onSelect={moveToInactive}>
          <AtTypography>
            <img src={ArrowCircle} alt={'ArrowCircle'} width={20} />
            {RightClick.MoveToInactive}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {/* {isCurrentTabAllowed(RightClick.ShareRequest) && (
        <AtContextMenuItem onSelect={() => console.log('Share Request clicked!')}>
          <AtTypography>
            <Share size={20} />
            {RightClick.ShareRequest}
          </AtTypography>
        </AtContextMenuItem>
      )} */}

      {isCurrentTabAllowed(RightClick.MoveToDeclined) && (
        <AtContextMenuItem
          variant="danger"
          onSelect={moveToDeclined}
        >
          <AtTypography>
            <TrushSquare size={20} />
            {RightClick.MoveToDeclined}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {/* {isCurrentTabAllowed(RightClick.ShareClient) && (
        <AtContextMenuItem onSelect={() => console.log(undefined)}>
          <AtTypography>
            <Share size={20} />
            {RightClick.ShareClient}
          </AtTypography>
        </AtContextMenuItem>
      )} */}

      {isCurrentTabAllowed(RightClick.DeleteRequest) && (
        <AtContextMenuItem variant="danger" onSelect={deleteClient}>
          <AtTypography>
            <TrushSquare size={20} />
            {RightClick.DeleteRequest}
          </AtTypography>
        </AtContextMenuItem>
      )}
    </>
  )
}

interface ClientMenuProps {
  client: Client
}

export default ClientMenu
