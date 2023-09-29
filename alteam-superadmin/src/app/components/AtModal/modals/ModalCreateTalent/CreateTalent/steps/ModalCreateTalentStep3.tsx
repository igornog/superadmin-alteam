import { Box } from '@mui/material'
import React from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtDropBox from '../../../../../AtDropBox/AtDropBox'
import AtTypography from '../../../../../AtTypography/AtTypography'

const ModalCreateTalentStep3: React.FunctionComponent<
  ModalCreateTalentStep3Props
> = (props: ModalCreateTalentStep3Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTypography color={grey2}>
        Please attach any documents that are related to this talent. Fields with
        * are mandatory to fill.
      </AtTypography>

      <AtDropBox setAssets={props.setAssets} assets={props.assets} />

      <Box display={'flex'} flexDirection={'column'} gap={'10px'}></Box>
    </Box>
  )
}

interface ModalCreateTalentStep3Props {
  assets: File
  setAssets: React.Dispatch<React.SetStateAction<any>>
}


export default ModalCreateTalentStep3
