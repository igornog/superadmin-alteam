import React from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTypography from '../../../../../../Typography/Typography'

const JobDescription: React.FunctionComponent<JobDescriptionProps> = (
  props: JobDescriptionProps,
) => {

  return (
    <AtFrame
      title={'Job Description'}
      onClick={() => undefined}
      backgroundColor={'#FBFCFF'}
    >
      <AtTypography>
        {props.listing.jobDescription}
      </AtTypography>
    </AtFrame>
  )
}

interface JobDescriptionProps {
  listing: any
}

export default JobDescription
