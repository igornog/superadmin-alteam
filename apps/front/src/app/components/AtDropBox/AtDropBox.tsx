import React from 'react'
import styled from 'styled-components'
import { grey2 } from '../../utils/colors'
import AtTypography from '../AtTypography/AtTypography'
import download from '../../assets/images/icons/download-arrow.svg'
import { Box } from '@mui/material'

const StyledDropbox = styled.div`
  min-height: 245px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23E7E8E9FF' stroke-width='4' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`

const AtDropBox: React.FunctionComponent = () => {
  return (
    <StyledDropbox>
      <img src={download} alt={'Download Arrow'} />

      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
        <AtTypography variant={'h5'} color={grey2}>
          Upload CV and portfolio (if you have in PDF)
        </AtTypography>
        <AtTypography color={grey2}>
          Maximum file size: 10mb. Supported Files: PDF, PNG, SVG, JPEG, DOC.
        </AtTypography>
      </Box>
    </StyledDropbox>
  )
}

export default AtDropBox
