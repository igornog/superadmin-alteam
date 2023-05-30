import { Box, Collapse } from '@mui/material'
import { ArrowDown, ArrowUp, Edit } from 'iconsax-react'
import React, { useState } from 'react'
import { grey } from '../../../../utils/colors'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../AtButton/AtButton'
import AtFrame from '../../../AtFrame/AtFrame'
import AtTypography from '../../../AtTypography/AtTypography'
import ModalJobDescription from '../../../AtModal/modals/listings/ModalJobDescription'

const JobDescription: React.FunctionComponent<JobDescriptionProps> = (
  props: JobDescriptionProps,
) => {
  const [collapseDescription, setCollapseDescription] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Job Description'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
      backgroundColor={'#FBFCFF'}
    >
      <Collapse in={collapseDescription} collapsedSize={40}>
        <AtTypography color={grey}>
          {props.selectedListing.jobDescription}
        </AtTypography>
      </Collapse>

      <Box display={'flex'}>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={collapseDescription ? <ArrowUp /> : <ArrowDown />}
          name={`${collapseDescription ? 'Hide' : 'View'} Full Description`}
          fontSize={'14px'}
          onClick={() => setCollapseDescription(!collapseDescription)}
        />
      </Box>

      <ModalJobDescription
        open={openModal}
        listing={props.selectedListing}
        onClose={() => setOpenModal(false)}
      />
    </AtFrame>
  )
}

interface JobDescriptionProps {
  selectedListing: any
}

export default JobDescription
