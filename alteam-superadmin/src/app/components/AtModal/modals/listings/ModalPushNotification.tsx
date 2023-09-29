import { Box } from '@mui/material'
import { ActionItem, ClientListing, Notification } from '@yjcapp/app'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useRef, useState } from 'react'
import { useAppDispatch } from '../../../../utils/hooks/reduxHook'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTextField from '../../../AtTextField/AtTextField'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'
import AtTextFieldDropdown from '../../../AtDropdown/AtTextFieldDropdown'
import { v4 as uuid } from 'uuid'
import { handleUpdateListing } from '../../../../utils/redux/actions/listing.action'

const ModalPushNotification: React.FunctionComponent<
  ModalPushNotificationProps
> = (props: ModalPushNotificationProps) => {
  const dispatch = useAppDispatch()
  const [actionItem, setActionItem] = useState<ActionItem>()
  const inputRef = useRef<string>('')

  const handleSave = () => {
    if (props.listing) {
      const currentNotifications = props.listing.notifications as Notification[]
      const newNotification = {
        id: uuid(),
        actionItem: actionItem,
        text: inputRef.current,
        createdAt: new Date(),
      }

      dispatch(handleUpdateListing({
        id: props.listing?.id,
        notifications: currentNotifications.length ?
          [...currentNotifications, newNotification] as Notification[] :
          [newNotification]
      }))
    }

    props.onClose?.();
  }

  const getPlaceholder = (actionItem: ActionItem) => {
    let note
    switch (actionItem) {
      case ActionItem.ListingReview:
        note = `Your listing has been approved. We'll start screening potential talents for you to interview. Let us know if you have any questions.`;
        break
      case ActionItem.CallRequest:
        note = `We want to schedule a discovery call to discuss your requirements and clarify how we work. Please select a time that suits you - Click on the link`;
        break
      case ActionItem.ListingEdits:
        note = `Thank you for submitting your listing. We would like to suggest a change or edit to increase the likelihood of finding the right talent(s) for you. You can expect to hear back from us within 1-3 business days.`;
        break
      case ActionItem.TalentShortlist:
        note = `We found talented candidates for you! Check your email for a link to a free shortlist and our terms of use. Reminder: we only charge our fee once you agree to hire a solo freelancer or a team. `;
        break
      case ActionItem.TeamOnboarding:
        note = ``;
        break
      default:
        return ''
    }

    inputRef.current = note
    return note
  }

  return (
    <AtModal
      isOpen={props.open}
      size={ModalSize.Large}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Push Notification</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>

        <AtTextFieldDropdown
          fullWidth
          required
          label={'Action item'}
          placeholder={'Choose an item'}
          $listItems={Object.values(ActionItem).map(
            (label: ActionItem, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleselect={(e) =>
            setActionItem(e.label as ActionItem)
          }
        />

        <AtTextField
          maxLength={500}
          value={actionItem && getPlaceholder(actionItem).length ? getPlaceholder(actionItem) : ''}
          placeholder={actionItem && !getPlaceholder(actionItem).length ? 'Add a note' : ''}
          multiline
          onValueChange={(e) => inputRef.current = e}
          rows={6}
          required
          label={'Note'}
        />


        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5} marginTop={2}>
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

interface ModalPushNotificationProps {
  listing?: ClientListing;
  open: boolean;
  onClose?: () => void
}

export default ModalPushNotification
