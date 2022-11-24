import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalAbout from '../../../../components/AtModal/modals/ModalAbout'
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey } from '../../../../utils/colors'
import { Talent } from '../../../../utils/redux/types/talents.type'

const TalentAbout: React.FunctionComponent<TalentAboutProps> = (
  props: TalentAboutProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtTalentFrame
      title={'About Talent'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <AtTypography color={grey}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
        adipiscing placerat venenatis odio vel dignissim nec diam. Tincidunt
        ultrices sed ut odio vestibulum nisl, id vulputate. Gravida mattis
        bibendum lacus lacus pulvinar egestas proin convallis. Magna sed auctor
        diam fringilla vestibulum eu.
      </AtTypography>
      <ModalAbout isOpen={openModal} onClose={() => setOpenModal(false)} />
    </AtTalentFrame>
  )
}

interface TalentAboutProps {
  talent: Talent
}

export default TalentAbout
