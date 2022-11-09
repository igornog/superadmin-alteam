import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import { handleDrawer } from '../../../utils/redux/actions/settings.action';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import {
  SideDrawerVariant,
  DisplayMode,
} from '../../../utils/redux/types/settings.type';
import ModalShortlist from '../../AtModal/modals/ModalShortlist/ModalShortlist';
import TalentsCards from './TalentsCards';
import TalentsTable from './TalentsTable';

const TalentsSwitchMode: React.FunctionComponent<TalentsSwitchModeProps> = (
  props: TalentsSwitchModeProps
) => {
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
    <Grid container={true} spacing={2.5} alignItems={'stretch'}>
      {settings.displayMode === DisplayMode.Grid ? (
        <TalentsCards
          talents={listTalent}
          openTalent={handleClickTalent}
          openShortlist={() => setOpenModal(true)}
        />
      ) : (
        <Grid item={true} xs={12}>
          <TalentsTable
            talents={listTalent}
            openTalent={handleClickTalent}
            tableColumns={props.tableColumns}
            openShortlist={() => setOpenModal(true)}
          />
        </Grid>
      )}
      <ModalShortlist isOpen={openModal} onClose={() => setOpenModal(false)} />
    </Grid>
  );
};

interface TalentsSwitchModeProps {
  tableColumns?: [];
}

export default TalentsSwitchMode;
