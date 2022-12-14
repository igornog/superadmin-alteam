import { Box } from '@mui/material'
import { ArrowRight2 } from 'iconsax-react'
import React from 'react'
import styled, { css } from 'styled-components'
import { green, grey, grey3, grey5, white } from '../../utils/colors'
import AtLine from '../AtLine/AtLine'
import AtGroupTag from '../AtGroupTag/AtGroupTag'
import AtTypography from '../AtTypography/AtTypography'
import AtTag from '../AtTag/AtTag'
import AtRightClick from '../AtRightClick/AtRightClick'
import { boxShadow } from '../../utils/theme'
import TalentMenu from '../AtRightClick/ContextMenus/TalentMenu'
import { useAppSelector } from '../../utils/hooks/reduxHook'
import { findTalent } from '../../utils/redux/selectors/talents.selector'

export const StyledCard = styled.div<{ fullHeight?: boolean }>`
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 10px;
  padding: 20px;
  transition: 0.3s;
  min-height: 120px;
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}

  &:hover {
    box-shadow: ${boxShadow};
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }
`

const AtTalentCard: React.FunctionComponent<AtTalentCardProps> = (
  props: AtTalentCardProps,
) => {
  const talent = useAppSelector((state) => findTalent(state, props.idTalent))

  return (
    <StyledCard onClick={props.onClick} fullHeight={props.fullHeight}>
      <AtRightClick
        contextMenu={
          <TalentMenu
            talent={talent}
            openShortlist={props.openShortlist}
            openAccepted={props.openAccepted}
            openEmailToTalent={props.openEmailToTalent}
          />
        }
      >
        <Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box display={'flex'} gap={'5px'} flexDirection={'column'}>
              <Box display={'flex'} gap={'5px'} alignItems={'center'}>
                <AtTypography variant={'h5'}>
                  {talent.firstName} {talent.lastName}
                </AtTypography>
                {/* {talent.group && <AtGroupTag label={talent.group} />} */}
              </Box>
              <AtTypography variant={'body1'} color={grey}>
                {talent.role}
              </AtTypography>
            </Box>

            <Box
              display={'flex'}
              gap={'5px'}
              flexDirection={'column'}
              alignItems={'flex-end'}
            >
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <AtTypography color={grey3}>
                  <>Applied: {talent.appliedDate}</>
                </AtTypography>
                <AtGroupTag icon={<ArrowRight2 size={10} />} />
              </Box>
              <AtTypography variant={'body1'} color={grey}>
                {talent.availability}
              </AtTypography>
            </Box>
          </Box>

          <AtLine spacing={16} />

          {talent.skills && talent.skills.length > 0 ? (
            <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
              {talent.skills?.map((value: string, index: number) => (
                <AtTag label={value} key={index} />
              ))}
            </Box>
          ) : (
            <AtTypography color={grey3}>
              No skills been added by {talent.firstName} {talent.lastName}
            </AtTypography>
          )}
        </Box>
      </AtRightClick>
    </StyledCard>
  )
}

interface AtTalentCardProps {
  idTalent: string
  fullHeight?: boolean
  onClick?: (e: React.MouseEvent) => void
  openShortlist?: () => void
  openAccepted?: () => void
  openEmailToTalent?: () => void
}

export default AtTalentCard
