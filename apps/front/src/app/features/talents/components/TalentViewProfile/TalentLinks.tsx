import { Box } from '@mui/material'
import { AddCircle, Edit } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ModalLink from '../../../../components/AtModal/modals/ModalLink'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { black, grey4 } from '../../../../utils/colors'
import { Talent } from '../../../../utils/redux/types/talents.type'
import { Link } from '@yjcapp/app'
import { getCorrectNetwork } from '../../../../utils/helpers'
import AtLine from '../../../../components/AtLine/AtLine'
import AtCopyTo from '../../../../components/AtCopyTo/AtCopyTo'
import { v4 as uuid } from 'uuid'

export const StyledLink = styled(Box)<{ padding?: string }>`
  border: 1px solid ${grey4};
  border-radius: 5px;
  padding: ${({ padding }) => (padding ? padding : '20px')};
  display: flex;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    border-color: ${black};
    cursor: pointer;
    transition: 0.3s;
  }
`

const TalentLinks: React.FunctionComponent<TalentLinksProps> = (
  props: TalentLinksProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    const values = props.talent.links?.map((element: Link) => ({
      id: uuid(),
      name: element?.name,
      link: element?.link ?? '',
    }))

    setLinks(values || [])
  }, [props.talent])

  return (
    <>
      {links.length > 0 ? (
        <AtFrame
          title={'Additional Links'}
          icon={
            <AtTypography>
              <Edit size={16} />
              Edit
            </AtTypography>
          }
          onClick={() => {
            setOpenModal(true)
            setEditModal(true)
          }}
          gap={0}
        >
          {links.map((item: Link) => (
            <>
              <AtLine spacing={15} />
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                  {getCorrectNetwork(item.link)}
                  <AtTypography>{item.link}</AtTypography>
                </Box>
                <AtCopyTo text={item.link} />
              </Box>
            </>
          ))}
        </AtFrame>
      ) : (
        <StyledLink
          onClick={() => {
            setOpenModal(true)
            setEditModal(false)
          }}
        >
          <AtTypography>
            <AddCircle size={20} /> Add links
          </AtTypography>
        </StyledLink>
      )}

      <ModalLink
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        edit={editModal}
      />
    </>
  )
}

interface TalentLinksProps {
  talent: Talent
}

export default TalentLinks
