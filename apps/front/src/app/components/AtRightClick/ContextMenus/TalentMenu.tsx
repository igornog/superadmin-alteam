import { Edit, Share, Sms, TickCircle, TrushSquare } from 'iconsax-react'
import { ListingStatus } from '@yjcapp/app'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import {
  handlePatchTalent,
  handleSelectTalent,
} from '../../../utils/redux/actions/talents.action'
import AtTypography from '../../AtTypography/AtTypography'
import { AtContextMenuItem } from '../AtRightClick'
import Arrow from '../../../assets/images/icons/arrow2.svg'
import ArrowRefresh from '../../../assets/images/icons/refresh-circle.svg'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { RightClick, Tabs } from '../../../utils/types'
import { Talent } from '../../../utils/redux/types/talents.type'
import { grey2 } from '../../../utils/colors'

const TalentMenu: React.FunctionComponent<TalentMenuProps> = (
  props: TalentMenuProps,
) => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const [linkCopied, setLinkCopied] = useState(false)

  const isCurrentTabAllowed = (rightclickFunc: RightClick) => {
    return activeTab.talentRightClick.includes(rightclickFunc)
  }

  const isTabAndStatusAllowed = (status: ListingStatus[]) => {
    return (
      props.talent.status &&
      activeTab.title === Tabs.AllTalent &&
      status.includes(props.talent.status)
    )
  }

  const moveToAccepted = () => {
    if (props.openAccepted) {
      dispatch(handleSelectTalent(props.talent.id))
      props.openAccepted()
    }
  }

  const MoveToDeclined = () => {
    dispatch(
      handlePatchTalent({
        id: props.talent.id,
        status: ListingStatus.Declined,
      }),
    )
  }

  const MoveToInbound = () => {
    dispatch(
      handlePatchTalent({ id: props.talent.id, status: ListingStatus.Inbound }),
    )
  }

  const moveToShortlist = () => {
    if (props.openShortlist) {
      dispatch(handleSelectTalent(props.talent.id))
      props.openShortlist()
    }
  }

  const sendEmailToTalent = () => {
    if (props.openEmailToTalent) {
      dispatch(handleSelectTalent(props.talent.id))
      props.openEmailToTalent()
    }
  }

  const copyLinkToClipboard = (e: Event) => {
    e.preventDefault()
    navigator.clipboard.writeText(props.talent.firstName)
    setLinkCopied(true)
  }

  return linkCopied ? (
    <AtContextMenuItem>
      <AtTypography color={grey2}>
        <TickCircle size={20} />
        Talent link copied to clipboard
      </AtTypography>
    </AtContextMenuItem>
  ) : (
    <>
      {isCurrentTabAllowed(RightClick.MoveToAccepted) ||
      isTabAndStatusAllowed([ListingStatus.Shortlisted]) ? (
        <AtContextMenuItem onSelect={moveToAccepted}>
          <AtTypography>
            <img src={Arrow} alt={'Arrow'} width={20} />
            Move to Accepted
          </AtTypography>
        </AtContextMenuItem>
      ) : null}

      {isCurrentTabAllowed(RightClick.MoveToShortlisted) ||
      isTabAndStatusAllowed([ListingStatus.Inbound, ListingStatus.Accepted]) ? (
        <AtContextMenuItem onSelect={moveToShortlist}>
          <AtTypography>
            {ListingStatus.Inbound ? (
              <img src={Arrow} alt={'Arrow'} width={20} />
            ) : (
              <img src={ArrowRefresh} alt={'Arrow'} width={20} />
            )}
            Move to Shortlisted
          </AtTypography>
        </AtContextMenuItem>
      ) : null}

      {isCurrentTabAllowed(RightClick.EditTalentFolders) ||
      isTabAndStatusAllowed([
        ListingStatus.Shortlisted,
        ListingStatus.Accepted,
      ]) ? (
        <AtContextMenuItem>
          <AtTypography>
            <Edit size={20} />
            Edit Talent Folders
          </AtTypography>
        </AtContextMenuItem>
      ) : null}

      {isCurrentTabAllowed(RightClick.SendEmailToTalent) ||
      isTabAndStatusAllowed([
        ListingStatus.Shortlisted,
        ListingStatus.Inbound,
        ListingStatus.Accepted,
        ListingStatus.Declined,
      ]) ? (
        <AtContextMenuItem onSelect={sendEmailToTalent}>
          <AtTypography>
            <Sms size={20} />
            Send Email to Talent
          </AtTypography>
        </AtContextMenuItem>
      ) : null}

      {isCurrentTabAllowed(RightClick.ShareTalent) ||
      isTabAndStatusAllowed([
        ListingStatus.Shortlisted,
        ListingStatus.Inbound,
        ListingStatus.Accepted,
      ]) ? (
        <AtContextMenuItem onSelect={(e: Event) => copyLinkToClipboard(e)}>
          <AtTypography>
            <Share size={20} />
            Copy Public Link
          </AtTypography>
        </AtContextMenuItem>
      ) : null}

      {isCurrentTabAllowed(RightClick.MoveToInbound) ||
      isTabAndStatusAllowed([
        ListingStatus.Shortlisted,
        ListingStatus.Accepted,
      ]) ? (
        <AtContextMenuItem onSelect={MoveToInbound}>
          <AtTypography>
            <img src={ArrowRefresh} alt={'Arrow'} width={20} />
            Move Back to Inbound
          </AtTypography>
        </AtContextMenuItem>
      ) : null}

      {isCurrentTabAllowed(RightClick.MoveToDeclined) ||
      isTabAndStatusAllowed([
        ListingStatus.Shortlisted,
        ListingStatus.Inbound,
        ListingStatus.Accepted,
      ]) ? (
        <AtContextMenuItem variant="danger" onSelect={MoveToDeclined}>
          <AtTypography>
            <TrushSquare size={20} />
            Move to Declined
          </AtTypography>
        </AtContextMenuItem>
      ) : null}
    </>
  )
}

interface TalentMenuProps {
  talent: Talent
  openAccepted?: () => void
  openShortlist?: () => void
  openEmailToTalent?: () => void
}

export default TalentMenu
