import { Box } from '@mui/material'
import {
  CloseCircle,
  CloseSquare,
  SearchNormal1,
  TickSquare,
} from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTag from '../../AtTag/AtTag'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import { grey2 } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtModal from '../AtModal'
import AtLine from '../../AtLine/AtLine'
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'

const ModalSkills: React.FunctionComponent<ModalSkillsProps> = (
  props: ModalSkillsProps,
) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const [skills, setSkills] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const handleDeleteTag = (value: string) => {
    setSkills(skills.filter((skill) => skill !== value))
  }

  useEffect(() => {
    setSkills(selectedTalent.skills)
  }, [selectedTalent.skills])

  const handleSaveSkills = () => {
    dispatch(handlePatchTalent({ id: selectedTalent.id, skills }))
    props.onClose?.()
  }

  return (
    <AtModal
      isOpen={props.isOpen}
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
        <AtTypography variant={'h4'}>Edit Skills</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTextField
          placeholder={'Search in Skills'}
          value={''}
          startIcon={<SearchNormal1 />}
          onPressEnter={(e) => setSkills([...skills, e])}
          size={'small'}
        />

        <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
          {skills.length > 0 ? (
            skills?.map((skill, index) => {
              return (
                <AtTag
                  label={skill}
                  key={index}
                  onDelete={() => handleDeleteTag(skill)}
                />
              )
            })
          ) : (
            <AtTypography color={grey2}>
              No skills have been added by the talent, please add them by
              searching below. Please note that you may add only up to 5 skills.{' '}
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
            onClick={handleSaveSkills}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalSkillsProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalSkills
