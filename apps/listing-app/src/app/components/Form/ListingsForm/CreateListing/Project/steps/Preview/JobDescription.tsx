import React, { useState } from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTypography from '../../../../../../Typography/Typography'
import { Edit } from 'iconsax-react'
import ModalJobDescription from '../../../../../../Modal/modals/ModalJobDescription'

const JobDescription: React.FunctionComponent<JobDescriptionProps> = (
  props: JobDescriptionProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <AtFrame
      title={'Job Description'}
      backgroundColor={'#FBFCFF'}
      padding={props.isSmallScreen ? '0px' : '20px'}
      icon={props.isAuthenticated &&
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <AtTypography>
        {props.listing.jobDescription}
      </AtTypography>

      <ModalJobDescription
        open={openModal}
        listing={props.listing}
        onClose={() => setOpenModal(false)}
      />

    </AtFrame>
  )
}

interface JobDescriptionProps {
  listing: any
  isAuthenticated?: boolean
  isSmallScreen?: boolean
}

export default JobDescription
