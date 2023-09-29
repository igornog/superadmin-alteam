import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { grey2, grey3 } from '../../utils/colors'
import AtTypography from '../AtTypography/AtTypography'
import download from '../../assets/images/icons/download-arrow.svg'
import { Box } from '@mui/material'

const StyledDropbox = styled.div`
  padding: 30px;
  position: relative;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23E7E8E9FF' stroke-width='4' stroke-dasharray='25' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
   
    &:hover {
      cursor: pointer;
    }
  }
`

const AtDropBox: React.FunctionComponent<
  DropBoxProps
> = (props: DropBoxProps) => {
  const [file, setFile] = useState<File>()

  useEffect(() => {
    if (file) {
      props.setAssets([file])
    }
  }, [file])

  return (
    <>
      {file?.name ?
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <AtTypography variant={'h5'} fontSize='16px' color={grey2}>File added:</AtTypography>
          <AtTypography variant={'h5'} color={grey3} $bold>{file?.name}</AtTypography>
        </Box> : null}
      <StyledDropbox>
        <input type='file' onChange={(e) => setFile(e.currentTarget.files?.[0])} />
        <img src={download} alt={'Download Arrow'} width={!file ? 50 : 30} />
        {!file ?
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'10px'}>
            <AtTypography variant={'h5'} color={grey2}>
              Upload CV and portfolio (if you have in PDF)
            </AtTypography>
            <AtTypography color={grey2}>
              Maximum file size: 10mb. Supported Files: PDF, PNG, SVG, JPEG, DOC.
            </AtTypography>
          </Box> :
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <AtTypography variant={'h5'} fontSize={'16px'} color={grey3}>
              Upload a new file
            </AtTypography>
          </Box>
        }
      </StyledDropbox>
    </>
  )
}

interface DropBoxProps {
  assets: File
  setAssets: React.Dispatch<React.SetStateAction<any>>
}

export default AtDropBox
