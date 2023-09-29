import { Box } from '@mui/material'
import { AddCircle, Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalAddNote from '../../../../components/AtModal/modals/ModalAddNote'
import ModalEditNote from '../../../../components/AtModal/modals/ModalEditNote'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey3 } from '../../../../utils/colors'
import AtLine from '../../../../components/AtLine/AtLine'
import { Talent } from '@yjcapp/app'
import moment from 'moment'

const TalentNotes: React.FunctionComponent<TalentNotesProps> = (
  props: TalentNotesProps,
) => {
  const [openModalAddNote, setOpenModalAddNote] = useState(false)
  const [openModalEditNote, setOpenModalEditNote] = useState(false)

  return (
    <AtFrame
      title={'Notes'}
      gap={0}
      icon={
        !props.talent.notes?.length ?
          <AtTypography>
            <AddCircle size={16} />
            Add note
          </AtTypography> :
          <AtTypography>
            <Edit size={16} />
            Edit
          </AtTypography>
      }
      onClick={() => !props.talent.notes?.length ?
        setOpenModalAddNote(true) :
        setOpenModalEditNote(true)}
    >
      <AtLine spacing={15} />
      {props.talent.notes?.length ?
        <>
          <Box display={'flex'} justifyContent={'space-between'}>
            <AtTypography color={grey3}>
              {'Created by ' + props.talent.notes[0].author}
            </AtTypography>
            <AtTypography color={grey3}>
              {!props.talent.notes[0].updatedAt ? 'Created at:' : 'Updated at: '}
              {moment(!props.talent.notes[0].updatedAt ? props.talent.notes[0].createdAt : props.talent.notes[0].updatedAt).format('DD.MM.YYYY')}
            </AtTypography>
          </Box>

          <AtTypography color={grey}>
            {props.talent.notes[0].text}
          </AtTypography>
        </> :
        <AtTypography color={grey3}>
          No notes added.
        </AtTypography>}

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

interface TalentNotesProps {
  talent: Talent
  notEditable?: boolean
}

export default TalentNotes
