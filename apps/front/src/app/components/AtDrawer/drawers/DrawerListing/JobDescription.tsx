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

const JobDescription: React.FunctionComponent<JobDescriptionProps> = (
  props: JobDescriptionProps,
) => {
  const [collapseDescription, setCollapseDescription] = useState(false)

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
    </AtFrame>
  )
}

interface JobDescriptionProps {
  selectedListing: any
}

export default JobDescription
