import { Box } from '@mui/material'
import { AddCircle, Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalAddNote from '../../../../components/AtModal/modals/ModalAddNote'
import ModalEditNote from '../../../../components/AtModal/modals/ModalEditNote'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey3 } from '../../../../utils/colors'
import { Client } from '../../../../utils/redux/types/clients.type'
import moment from 'moment'
import AtLine from '../../../../components/AtLine/AtLine'

const Notes: React.FunctionComponent<ClientProps> = (props: ClientProps) => {
  const [openModalAddNote, setOpenModalAddNote] = useState(false)
  const [openModalEditNote, setOpenModalEditNote] = useState(false)

  return (
    <AtFrame
      title={'Notes'}
      icon={
        !props.client.notes?.length ?
          <AtTypography>
            <AddCircle size={16} />
            Add note
          </AtTypography> :
          <AtTypography>
            <Edit size={16} />
            Edit
          </AtTypography>
      }
      onClick={() => !props.client.notes?.length ?
        setOpenModalAddNote(true) :
        setOpenModalEditNote(true)}
    >
      
      <AtLine spacing={15} />

      {props.client.notes?.length ?
        <>
          <Box display={'flex'} justifyContent={'space-between'}>
            <AtTypography color={grey3}>
              {'Created by ' + props.client.notes[0].author}
            </AtTypography>
            <AtTypography color={grey3}>
              {!props.client.notes[0].updatedAt ? 'Created at:' : 'Updated at: '}
              {moment(!props.client.notes[0].updatedAt ? props.client.notes[0].createdAt : props.client.notes[0].updatedAt).format('DD.MM.YYYY')}
            </AtTypography>
          </Box>

          <AtTypography color={grey}>
            {props.client.notes[0].text}
          </AtTypography>
        </> :
        <AtTypography color={grey3}>
          No notes added.
        </AtTypography>}

      <ModalAddNote
        isOpen={openModalAddNote}
        onClose={() => setOpenModalAddNote(false)}
        isClient={!!props.client}
      />

      <ModalEditNote
        isOpen={openModalEditNote}
        onClose={() => setOpenModalEditNote(false)}
        isClient={!!props.client}
      />
    </AtFrame>
  )
}

interface ClientProps {
  client: Client
}

export default Notes
