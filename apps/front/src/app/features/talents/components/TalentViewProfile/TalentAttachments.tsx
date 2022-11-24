import { Box } from '@mui/material'
import { Import, DocumentText1 } from 'iconsax-react'
import React from 'react'
import AtLine from '../../../../components/AtLine/AtLine'
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey } from '../../../../utils/colors'

const TalentAttachments: React.FunctionComponent = () => {
  return (
    <AtTalentFrame
      title={'Attachments'}
      icon={
        <AtTypography>
          <Import size={16} />
          Download all
        </AtTypography>
      }
      gap={0}
    >
      <AtLine spacing={15} />

      <Box display={'flex'} justifyContent={'space-between'}>
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
      </Box>
    </AtTalentFrame>
  )
}

export default TalentAttachments
