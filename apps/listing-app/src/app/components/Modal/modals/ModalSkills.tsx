import { Box } from '@mui/material'
import { ClientListing } from '@yjcapp/app'
import { CloseCircle, CloseSquare, SearchNormal1, TickSquare } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../utils/hooks/reduxHook'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import CustomButton, { AtButtonKind, AtButtonVariant } from '../../Button/Button'
import AtLine from '../../Line/Line'
import AtTypography from '../../Typography/Typography'
import AtModal from '../AtModal'
import { useParams } from 'react-router-dom'
import AtTextField from '../../TextField/TextField'
import { grey2 } from '../../../utils/colors'
import AtTag from '../../Tag/Tag'
import { handleUpdateListing } from '../../../utils/redux/actions/listing.action'

const ModalSkills: React.FunctionComponent<
  ModalSkillsProps
> = (props: ModalSkillsProps) => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const maxSkills = 7
  const [skills, setSkills] = useState<string[]>()

  useEffect(() => {
    setSkills(props.listing.skills)
  }, [])

  const handleSave = async () => {
    if (id) {
      await dispatch(handleUpdateListing(
        {
          id: parseInt(id),
          skills: skills
        }
      ))

      props.onClose?.()
    }
    window.location.reload()
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
        <CustomButton
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
              No skills have been added by the talent, please add them by
              searching below. Please note that you may add only up to 7
              skills.
            </AtTypography>
          )}
        </Box>


        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <CustomButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <CustomButton
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
