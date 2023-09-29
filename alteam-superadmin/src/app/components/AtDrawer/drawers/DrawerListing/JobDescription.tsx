import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import { grey } from '../../../../utils/colors'


import AtFrame from '../../../AtFrame/AtFrame'
import AtTypography from '../../../AtTypography/AtTypography'
import ModalJobDescription from '../../../AtModal/modals/listings/ModalJobDescription'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  padding-right: 300px;
  overflow: hidden;
  p {
    word-break: break-all;
  }
`

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

      <StyledBox>
        <AtTypography color={grey} >
          {props.selectedListing.jobDescription}
        </AtTypography>
      </StyledBox>

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
