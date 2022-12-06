import { Box } from '@mui/material'
import { ArrowDown, Edit } from 'iconsax-react'
import React from 'react'
import { grey } from '../../../../utils/colors'
import { Listing } from '../../../../utils/redux/types/listings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../AtButton/AtButton'
import AtFrame from '../../../AtFrame/AtFrame'
import AtTypography from '../../../AtTypography/AtTypography'

const JobDescription: React.FunctionComponent<JobDescriptionProps> = (
  props: JobDescriptionProps,
) => {
  return (
    <AtFrame
      title={'Job Description'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => undefined}
      backgroundColor={'#FBFCFF'}
    >
      <AtTypography color={grey}>
        {props.selectedListing.jobDescription}
      </AtTypography>

      <Box display={'flex'}>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<ArrowDown />}
          name={'View Full Description'}
          fontSize={'14px'}
        />
      </Box>
    </AtFrame>
  )
}

interface JobDescriptionProps {
  selectedListing: Listing
}

export default JobDescription
