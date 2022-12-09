import { Box } from '@mui/material'
import { AddCircle, Edit } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import ModalAddNote from '../../../../components/AtModal/modals/ModalAddNote'
import ModalEditNote from '../../../../components/AtModal/modals/ModalEditNote'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { black, grey, grey2, grey3 } from '../../../../utils/colors'

const StyledBox = styled(Box)`
  color: ${grey2};
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    cursor: pointer;
    color: ${black};
  }
`

const TalentNotes: React.FunctionComponent = () => {
  const [openModalAddNote, setOpenModalAddNote] = useState(false)
  const [openModalEditNote, setOpenModalEditNote] = useState(false)

  return (
    <AtFrame
      title={'Notes'}
      icon={
        <AtTypography>
          <AddCircle size={16} />
          Add note
        </AtTypography>
      }
      onClick={() => setOpenModalAddNote(true)}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'20px'}>
          <AtTypography variant={'body1'}>Yoann Demont’s Note:</AtTypography>

          <StyledBox margin={'auto'} onClick={() => setOpenModalEditNote(true)}>
            <AtTypography>
              <Edit size={16} />
              Edit note
            </AtTypography>
          </StyledBox>
        </Box>

        <AtTypography color={grey3}>23.07.2022</AtTypography>
      </Box>

      <AtTypography color={grey}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
        adipiscing placerat venenatis odio vel dignissim nec diam. Tincidunt
        ultrices sed ut odio vestibulum nisl, id vulputate. Gravida mattis
        bibendum lacus lacus pulvinar egestas proin convallis. Magna sed auctor
        diam fringilla vestibulum eu.
      </AtTypography>

      <ModalAddNote
        isOpen={openModalAddNote}
        onClose={() => setOpenModalAddNote(false)}
      />

      <ModalEditNote
        isOpen={openModalEditNote}
        onClose={() => setOpenModalEditNote(false)}
      />
    </AtFrame>
  )
}

export default TalentNotes
