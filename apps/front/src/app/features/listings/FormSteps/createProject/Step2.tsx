import React, { useState } from 'react'
import AtLine from '../../../../components/AtLine/AtLine'
import AtTextField from '../../../../components/AtTextField/AtTextField'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { StyledForm } from '../../../../components/AtDrawer/drawers/DrawerCreateListing/DrawerCreateListing'
import { grey2 } from '../../../../utils/colors'
import { Box} from '@mui/material'
import styled from 'styled-components'

const ProjectStep2: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState('')

  const StyledCharCounter = styled.div`
    position: absolute;
    bottom: 20px;
    padding: 10px;
    color: ${grey2}
  `

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>Job Description</AtTypography>
          <AtTypography variant={'caption'} color={grey2}>
            Fields with * are mandatory
          </AtTypography>
        </Box>
        <AtLine />
        <Box padding={'20px'} position={'relative'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} gap={'50px'}
        >
          <AtTextField
            onValueChange={setInputValue}
            value={inputValue}
            maxLength={500}
            multiline={true}
            rows={6}
            required={true}
            label={'Job Description'}
            placeholder={'Enter Job Description'}
          />
          <StyledCharCounter>          
            <AtTypography variant={'caption'} color={grey2}>
              {inputValue.length}/500
            </AtTypography>
          </StyledCharCounter>
        </Box>
      </StyledForm>
    </Box>
  )
}

export default ProjectStep2
