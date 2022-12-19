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
import AtTextFieldDropdown, { DropdownItem } from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTag from '../../../../../AtTag/AtTag'
import { v4 as uuid } from 'uuid'

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
  const [jobDescriptions, setJobDescriptions] = useState([
    {
      id: 0,
      role: '',
      description: ''
    }
  ])

  const StyledButton = styled(AtButton)`
    width: fit-content;
    align-self: flex-end;
  `

  const test = [{
    id: 0,
    label: 'Front End Dev'
  }, {
    id: 1,
    label: 'Back End Dev'
  }, {
    id: 2,
    label: 'Product Owner'
  }]

  const handleRoleChange = (e: DropdownItem, i: number) => {
    setJobDescriptions(
      jobDescriptions.map((item) => {
        if (item.id === i) {
          return { ...item, role: e.label }
        }

        return item
      })
    )
  }

  const handleJobDescriptionChange = (e: string, i: number) => {
    setJobDescriptions(
      jobDescriptions.map((item) => {
        if (item.id === i) {
          return { ...item, description: e }
        }

        return item
      })
    )
  }

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
                  value={jobDescription.role}
                  placeholder={'Enter Role Name'}
                  listItems={test}
                  label={`Role Name ${i + 1}`}
                  handleSelect={(e) => handleRoleChange(e, jobDescription.id)}
                />

                {jobDescriptions.length > 1 ?
                  <StyledTag
                    delete={true}
                    key={jobDescription.id}
                  /> : ''}
              </Box>

              <AtTextField
                onValueChange={(e) => handleJobDescriptionChange(e, jobDescription.id)}
                value={jobDescription.description}
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
          onClick={() => setJobDescriptions([...jobDescriptions, { id: uuid(), role: '', description: '' }])}
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Outlined}
          endIcon={<AddSquare size={16} />}
          name={'Add Another Job Description'}
        />

      </StyledBox>
      <>
        {console.log('jobDescriptions', jobDescriptions)}
      </>
    </StyledForm>
  )
}

export default Step2
