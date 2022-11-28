import { Grid } from '@mui/material'
import React from 'react'
import { Talent } from '../../../utils/redux/types/talents.type'
import AtTalentCard from '../../AtCard/AtTalentCard'

const TalentCard: React.FunctionComponent<TalentCardProps> = (
  props: TalentCardProps,
) => {
  return (
    <>
      {props.talents.map((talent: Talent) => (
        <Grid
          item={true}
          xs={6}
          xl={4}
          key={talent.id}
          display={'flex'}
          flexDirection={'column'}
        >
          <AtTalentCard
            talent={talent}
            onClick={() => props.openTalent(talent.id)}
            fullHeight={true}
            openShortlist={props.openShortlist}
            openAccepted={props.openAccepted}
            openEmailToTalent={props.openEmailToTalent}
          />
        </Grid>
      ))}
    </>
  )
}

interface TalentCardProps {
  talents: Talent[]
  openTalent: (id: number) => void
  openShortlist: () => void
  openAccepted: () => void
  openEmailToTalent: () => void
}

export default TalentCard
