import { Grid } from '@mui/material';
import React, { useState } from 'react';
import AtCard from '../../../../components/AtCard/AtCard';
import ModalShortlist from '../../../../components/AtModal/modals/ModalShortlist';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey3 } from '../../../../utils/colors';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook';
import { handleDrawer } from '../../../../utils/redux/actions/settings.action';
import { handleSelectTalent } from '../../../../utils/redux/actions/talents.action';
import {
  DisplayMode,
  SideDrawerVariant,
} from '../../../../utils/redux/types/settings.type';
import InboundTalentsTable from './InboundTalentsTable';

const InboundTalentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const talents = useAppSelector((state) => state.talents);
  const listTalent = talents.listTalents;

  const [openModal, setOpenModal] = useState(false);

  const handleClickTalent = (id: number) => {
    dispatch(handleSelectTalent(id));
    dispatch(handleDrawer(SideDrawerVariant.Talent));
  };

  return (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      {listTalent.length === 0 ? (
        <Grid item={true} xs={12}>
          <AtTypography variant={'h3'} color={grey3}>
            No Recent Candidates
          </AtTypography>
        </Grid>
      ) : settings.displayMode === DisplayMode.Grid ? (
        listTalent.map((talent) => (
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
              onClick={() => handleClickTalent(talent.id)}
              fullHeight={true}
              openShortlist={() => setOpenModal(true)}
            />
          </Grid>
        ))
      ) : settings.displayMode === DisplayMode.List ? (
        <Grid item={true} xs={12}>
          <InboundTalentsTable
            talents={listTalent}
            onClick={handleClickTalent}
            openShortlist={() => setOpenModal(true)}
          />
        </Grid>
      ) : null}

      <ModalShortlist isOpen={openModal} onClose={() => setOpenModal(false)} />
    </Grid>
  );
};

export default InboundTalentsView;
