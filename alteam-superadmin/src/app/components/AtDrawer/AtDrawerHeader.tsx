import { Box } from '@mui/material'
import { ArrowLeft2 } from 'iconsax-react'
import AtButton, { AtButtonVariant, AtButtonKind } from '../AtButton/AtButton'
import AtLine from '../AtLine/AtLine'

const AtDrawerHeader: React.FunctionComponent<AtDrawerHeaderProps> = (
  props: AtDrawerHeaderProps,
) => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        padding={'25px 20px 0 20px'}
      >
        <Box display={'flex'} gap={'20px'} alignItems={'center'}>
          {!props.invisibleClose && (
            <AtButton
              variant={AtButtonVariant.Contained}
              startIcon={<ArrowLeft2 />}
              kind={AtButtonKind.Default}
              onClick={props.handleClose}
            />
          )}
          {props.title}
        </Box>
        {props.sideTitle}
      </Box>
      {!props.hideLine && <AtLine spacing={25} />}
    </>
  )
}

interface AtDrawerHeaderProps {
  title?: React.ReactNode
  sideTitle?: React.ReactNode
  invisibleClose?: boolean
  hideLine?: boolean

  handleClose: () => void
}

export default AtDrawerHeader
