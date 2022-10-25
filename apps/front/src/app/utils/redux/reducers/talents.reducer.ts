import { createSlice } from '@reduxjs/toolkit';
import { handleSelectTalent, handleTalents } from '../actions/talents.action';
import { StatusType } from '../types/status.type';
import { TalentsState } from '../types/talents.type';

const initialState: TalentsState = {
  talents: [],
  selectedTalent: null,
  status: StatusType.Idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'talents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleTalents.pending, (state) => {
        state.status = StatusType.Loading;
      })
      .addCase(handleTalents.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded;
        state.talents = payload;
      })
      .addCase(handleTalents.rejected, (state, action) => {
        state.status = StatusType.Failed;
        state.error = action.error.message;
      })

      .addCase(handleSelectTalent.fulfilled, (state, { payload }) => {
        state.selectedTalent = payload;
      });
  },
});

export default reducer;
