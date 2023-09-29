import { Box } from '@mui/material'
import { ClientListing } from '@yjcapp/app'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../../utils/hooks/reduxHook'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import { handleUpdateListing } from '../../../../utils/redux/actions/listing.action'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTextField from '../../../AtTextField/AtTextField'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'
import { listingService } from '../../../../utils/services'

const ModalListingName: React.FunctionComponent<
  ModalListingNameProps
> = (props: ModalListingNameProps) => {
  const dispatch = useAppDispatch()
  const listingName = useRef<string|undefined>(props.listing?.listingName)
  
  useEffect(() => {
    const getListing = async () => {
      if (props.listing?.id) {
        const listing = await listingService.searchListing({ listingId: props.listing?.id })
        listingName.current = listing[0].listingName
      }
    }

    // getting listing updated after editing
    getListing()

  }, [listingName])

  const handleSave = async () => {
    if (props.listing?.id) {
      await dispatch(handleUpdateListing(
        {
          id: props.listing?.id,
          listingName: listingName.current
        }
      ))
    }

    //   const cachedListing = JSON.parse(localStorage.getItem('listing') as string)
    //   localStorage.setItem('listing', JSON.stringify({ ...cachedListing, listingName: listingName.current }))
      
      // props.updateListing( 'listingName', listingName.current )
      props.onClose?.()
    // }
  }

  return (
    <AtModal
      isOpen={props.open}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Listing Name</AtTypography>
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

      <AtTextField
          label={'Listing name'}
          value={listingName.current ?? JSON.parse(localStorage.getItem('listing') as string).listingName}
          placeholder={'Enter Listing name'}
          onValueChange={(e) =>
            listingName.current = e
          }
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

interface ModalListingNameProps {
  listing?: ClientListing;
  // updateListing: (field: string, value: any) => void
  open: boolean
  onClose?: () => void
}

export default ModalListingName
