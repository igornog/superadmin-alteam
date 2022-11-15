import { Grid } from '@mui/material';
import React from 'react';
import { Talent } from '../../../utils/redux/types/talents.type';
import AtCard from '../../AtCard/AtCard';

const TalentsCards: React.FunctionComponent<TalentsCardProps> = (
  props: TalentsCardProps
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
          <AtCard
            talent={talent}
            onClick={() => props.openTalent(talent.id)}
            fullHeight={true}
            openShortlist={props.openShortlist}
            openAccepted={props.openAccepted}
          />
        </Grid>
      ))}
    </>
  );
};

interface TalentsCardProps {
  talents: Talent[];
  openTalent: (id: number) => void;
  openShortlist: () => void;
  openAccepted: () => void;
}

export default TalentsCards;
