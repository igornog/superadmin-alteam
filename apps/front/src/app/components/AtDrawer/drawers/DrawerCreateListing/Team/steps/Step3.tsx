import React, { useState } from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2, grey3 } from '../../../../../../utils/colors'
import { Box } from '@mui/material'
import styled from 'styled-components'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../../../AtButton/AtButton'
import { AddSquare } from 'iconsax-react'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'

const StyledCharCounter = styled.div`
  position: absolute;
  bottom: 30px;
  padding: 10px;
  color: ${grey2}
`

const StyledBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`

const Step2: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState('')
  const [jobDescriptions, setJobDescriptions] = useState(1)

  const StyledButton = styled(AtButton)`
    width: fit-content;
    align-self: flex-end;
  `

  return (
    <StyledForm>
      <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h4'}>Job Description</AtTypography>
        <AtTypography variant={'caption'} color={grey2}>
          Fields with * are mandatory
        </AtTypography>
      </Box>
      <AtLine />

      <StyledBox>
        {Array.from(Array(jobDescriptions).keys()).map((i) => {
          return (
            <Box
              gap={'30px'}
              display={'flex'}
              flexDirection={'column'}
              position={'relative'}
              alignItems={'flex-end'}
            >

              <AtTextFieldDropdown
                fullWidth={true}
                required={true}
                value={''}
                placeholder={'Enter Role Name'}
                listItems={[]}
                label={`Role Name ${i + 1}`}
              />

              <AtTextField
                onValueChange={setInputValue}
                value={inputValue}
                maxLength={500}
                multiline={true}
                rows={6}
                required={true}
                label={`Job Description ${i + 1}`}
                placeholder={'Enter Job Description'}
              />

              <StyledCharCounter>
                <AtTypography variant={'caption'} color={grey3}>
                  {inputValue.length}/{500}
                </AtTypography>
              </StyledCharCounter>

              {jobDescriptions > 1 ? <AtLine /> : ''}
            </Box>)
        })}

        <StyledButton
          onClick={() => setJobDescriptions(jobDescriptions + 1)}
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Outlined}
          endIcon={<AddSquare size={16} />}
          name={'Add Another Job Description'}
        />

      </StyledBox>
    </StyledForm>
  )
}

export default Step2
