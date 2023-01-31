import { Box } from '@mui/material'
import { ArrowRight2 } from 'iconsax-react'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { black, green, grey, grey3, grey5, white } from '../../utils/colors'
import AtLine from '../AtLine/AtLine'
import AtGroupTag from '../AtGroupTag/AtGroupTag'
import AtTypography from '../AtTypography/AtTypography'
import AtTag from '../AtTag/AtTag'
import AtRightClick from '../AtRightClick/AtRightClick'
import { boxShadow } from '../../utils/theme'
import TalentMenu from '../AtRightClick/ContextMenus/TalentMenu'
import { useAppSelector } from '../../utils/hooks/reduxHook'
import { findTalent } from '../../utils/redux/selectors/talents.selector'
import { stringMatch } from '../../utils/helpers'
import moment from 'moment'
import { ListingStatus } from '@yjcapp/app'
import { StyledTag } from '../app/talents/TalentsTable'

export const StyledTagClients = styled(AtTag)<{
  marketplace?: ListingStatus | boolean
}>`
  border-radius: 5px;
  background-color: ${({ marketplace }) =>
    marketplace ? `${black}` : `${white}`};
  color: ${({ marketplace }) => (marketplace ? `${white}` : `${black}`)};
`

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
  const fullName = talent.firstName + ' ' + talent.lastName
  const settings = useAppSelector((state) => state.settings)
  const [maxItemPerLine] = useState(10)

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
                  {stringMatch(fullName, settings.filters.searchName ?? '')}
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
                  <>
                    Applied: {moment(talent.appliedDate).format('DD.MM.YYYY')}
                  </>
                </AtTypography>
                <AtGroupTag icon={<ArrowRight2 size={10} />} />
              </Box>
              <AtTypography variant={'body1'} color={grey}>
                {talent.availability}
              </AtTypography>
            </Box>
          </Box>

          <AtLine spacing={16} />

          {props.displayStatusTag && (
            <>
              <AtTypography color={grey3}>
                Status :
                <StyledTagClients
                  variant={'outlined'}
                  marketplace={!talent.status}
                  label={talent.status ?? ListingStatus.Marketplace}
                />
              </AtTypography>
              <AtLine spacing={16} />
            </>
          )}

          {talent.skills && talent.skills.length > 0 ? (
            <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
              {talent.skills
                ?.slice(0, maxItemPerLine)
                .map((value: string, index: number) => (
                  <AtTag label={value} key={index} />
                ))}
              {talent.skills.slice(maxItemPerLine).length > 0 && (
                <span>
                  <StyledTag
                    $hover={true}
                    variant={'outlined'}
                    label={`${talent.skills.slice(maxItemPerLine).length} more`}
                  />
                </span>
              )}
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
  idTalent: number
  fullHeight?: boolean
  displayStatusTag?: boolean | null
  onClick?: (e: React.MouseEvent) => void
  openShortlist?: () => void
  openAccepted?: () => void
  openEmailToTalent?: () => void
}

export default AtTalentCard
