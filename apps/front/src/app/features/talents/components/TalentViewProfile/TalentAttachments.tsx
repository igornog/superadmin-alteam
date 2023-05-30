import { Import } from 'iconsax-react'
import React from 'react'
import AtLine from '../../../../components/AtLine/AtLine'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'

const TalentAttachments: React.FunctionComponent<TalentAttachmentsProps> = (
  props: TalentAttachmentsProps,
) => {
  return (
    <AtFrame
      title={'Attachments'}
      icon={
        !props.notEditable && (
          <AtTypography>
            <Import size={16} />
            Download all
          </AtTypography>
        )
      }
      gap={0}
    >
      <AtLine spacing={15} />

      <AtTypography variant="body2">No Attachments added.</AtTypography>

      {/* <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'10px'}>
          <DocumentText1 />
          <AtTypography color={grey}>Filenamecanbethislong.pdf</AtTypography>
        </Box>

        <Import />
      </Box>

      <AtLine spacing={15} />

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'10px'}>
          <DocumentText1 />
          <AtTypography color={grey}>Filenamecanbethislong.jpg</AtTypography>
        </Box>

        <Import />
      </Box>

      <AtLine spacing={15} />

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'10px'}>
          <DocumentText1 />
          <AtTypography color={grey}>Filenamecanbethislong.png</AtTypography>
        </Box>

        <Import />
      </Box> */}
    </AtFrame>
  )
}

interface TalentAttachmentsProps {
  notEditable?: boolean
}

export default TalentAttachments
