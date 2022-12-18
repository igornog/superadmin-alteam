import React, { useState } from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2, red } from '../../../../../../utils/colors'
import { Box } from '@mui/material'
import styled from 'styled-components'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../../../AtButton/AtButton'
import { AddSquare } from 'iconsax-react'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTag from '../../../../../AtTag/AtTag'


const StyledBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`

const StyledTag = styled(AtTag)`
  background: transparent;
  height: auto;
  
  svg {
    color: ${red} !important;
  }
`

const Step2: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState([{}])
  const [jobDescriptions, setJobDescriptions] = useState([
    {
      role: '',
      jobDescription: ''
    }
  ])

  const StyledButton = styled(AtButton)`
    width: fit-content;
    align-self: flex-end;
  `

  const handleInputChange = (e: string, id: number) => {
    setInputValue((prev) => ({ ...prev, [id]: e }));
  };

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
        {jobDescriptions.map((jobDescription, i) => {
          return (
            <Box
              gap={'30px'}
              display={'flex'}
              flexDirection={'column'}
              position={'relative'}
              alignItems={'flex-end'}
            >

              <Box
                display={'flex'}
                width={'100%'}
              >
                <AtTextFieldDropdown
                  fullWidth={true}
                  required={true}
                  value={''}
                  placeholder={'Enter Role Name'}
                  listItems={[]}
                  label={`Role Name ${i + 1}`}
                />

                {jobDescriptions.length > 1 ?
                  <StyledTag
                    delete={true}
                    key={i}
                  /> : ''}
              </Box>

              <AtTextField
                onValueChange={(e) => handleInputChange(e, i)}
                value={inputValue[i]}
                maxLength={500}
                multiline={true}
                rows={6}
                required={true}
                label={`Job Description ${i + 1}`}
                placeholder={'Enter Job Description'}
                charCounter={true}
              />

              {jobDescriptions.length > 1 && i !== jobDescriptions.length - 1 ? <AtLine /> : ''}
            </Box>)
        })}

        <StyledButton
          onClick={() => setJobDescriptions([...jobDescriptions, { role: '', jobDescription: '' }])}
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
