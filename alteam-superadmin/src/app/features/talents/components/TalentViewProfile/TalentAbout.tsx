import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalAbout from '../../../../components/AtModal/modals/ModalAbout'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey } from '../../../../utils/colors'
import { Talent } from '../../../../utils/redux/types/talents.type'
import AtLine from '../../../../components/AtLine/AtLine'

const TalentAbout: React.FunctionComponent<TalentAboutProps> = (
  props: TalentAboutProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'About Talent'}
      icon={
        !props.notEditable && (
          <AtTypography>
            <Edit size={16} />
            Edit
          </AtTypography>
        )
      }
      onClick={() => setOpenModal(true)}
    >
      <AtLine spacing={15} />
      <AtTypography color={grey}>
        {props.talent.about?.length
          ? props.talent.about
          : 'No description added.'}
      </AtTypography>

      <ModalAbout isOpen={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

interface TalentAboutProps {
  talent: Talent
  notEditable?: boolean
}

export default TalentAbout
