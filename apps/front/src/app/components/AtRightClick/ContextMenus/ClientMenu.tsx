import React from 'react'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import AtTypography from '../../AtTypography/AtTypography'
import { AtContextMenuItem } from '../AtRightClick'
import Arrow2 from '../../../assets/images/icons/arrow2.svg'
import ArrowCircle from '../../../assets/images/icons/refresh-circle.svg'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { RightClick } from '../../../utils/types'
import { Share, TrushSquare } from 'iconsax-react'

const ClientMenu: React.FunctionComponent = () => {
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const isCurrentTabAllowed = (rightclickFunc: RightClick) => {
    return activeTab.clientRightClick.includes(rightclickFunc)
  }

  return (
    <>
      {isCurrentTabAllowed(RightClick.MoveToActive) && (
        <AtContextMenuItem onSelect={() => console.log(undefined)}>
          <AtTypography>
            <img src={Arrow2} alt={'Arrow'} width={20} />
            {RightClick.MoveToActive}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.MoveToInactive) && (
        <AtContextMenuItem onSelect={() => console.log(undefined)}>
          <AtTypography>
            <img src={ArrowCircle} alt={'ArrowCircle'} width={20} />
            {RightClick.MoveToInactive}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.ShareRequest) && (
        <AtContextMenuItem onSelect={() => console.log(undefined)}>
          <AtTypography>
            <Share size={20} />
            {RightClick.ShareRequest}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.MoveToDeclined) && (
        <AtContextMenuItem
          variant="danger"
          onSelect={() => console.log(undefined)}
        >
          <AtTypography>
            <TrushSquare size={20} />
            {RightClick.MoveToDeclined}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.ShareClient) && (
        <AtContextMenuItem onSelect={() => console.log(undefined)}>
          <AtTypography>
            <Share size={20} />
            {RightClick.ShareClient}
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.DeleteRequest) && (
        <AtContextMenuItem variant="danger">
          <AtTypography>
            <TrushSquare size={20} />
            {RightClick.DeleteRequest}
          </AtTypography>
        </AtContextMenuItem>
      )}
    </>
  )
}

export default ClientMenu
