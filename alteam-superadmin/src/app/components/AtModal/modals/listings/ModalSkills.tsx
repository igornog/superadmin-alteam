import { Box } from '@mui/material'
import { ClientListing } from '@yjcapp/app'
import { grey2 } from '../../../../utils/colors'
import { useAppDispatch } from '../../../..//utils/hooks/reduxHook'
import { handleUpdateListing } from '../../../..//utils/redux/actions/listing.action'
import { ModalSize } from '../../../..//utils/redux/types/settings.type'
import { CloseCircle, CloseSquare, SearchNormal1, TickSquare } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTag from '../../../AtTag/AtTag'
import AtTextField from '../../../AtTextField/AtTextField'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'

const ModalSkills: React.FunctionComponent<
  ModalSkillsProps
> = (props: ModalSkillsProps) => {
  const dispatch = useAppDispatch()
  const maxSkills = 7
  const [skills, setSkills] = useState<string[]>()

  useEffect(() => {
    setSkills(props.listing.skills)
  }, [])

  const handleSave = () => {
    dispatch(handleUpdateListing({ id: props.listing?.id, skills: skills }))
    props.onClose?.()
  }

  return (
    <AtModal
      isOpen={props.open}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Job Description</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>

        <AtTextField
          placeholder={'Search in Skills'}
          onPressEnter={(e) => {
            if (skills && skills?.length < maxSkills) {
              setSkills([...skills, e])
            }
          }}
          startIcon={<SearchNormal1 />}
          size={'small'}
        />

        <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
          {skills?.length && skills?.length > 0 ? (
            skills?.map((skill: string, index: number) => {
              return (
                <AtTag
                  label={skill}
                  key={index}
                  onDelete={() =>
                    setSkills(skills?.filter((item: string) => item !== skill))
                  }
                />
              )
            })
          ) : (
            <AtTypography color={grey2}>
              Type a skill and press enter. You can add up to 7 skills.
            </AtTypography>
          )}
        </Box>


        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleSave}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            disabled={!skills?.length}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalSkillsProps {
  listing: ClientListing;
  open: boolean
  onClose?: () => void
}

export default ModalSkills
