import { createSlice } from '@reduxjs/toolkit';
import {
  handleActiveFilter,
  handleActiveTab,
  handleRefreshFilters,
  handleSettings,
  handleSwitchDisplayMode,
} from '../actions/settings.action';
import { DisplayMode, Filter, SettingsState } from '../types/settings.type';
import { StatusType } from '../types/status.type';

const initialState: SettingsState = {
  tabs: [],
  filters: {
    skills: [],
    jobTypes: [],
  },
  displayMode: DisplayMode.List,
  status: StatusType.Idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSettings.pending, (state) => {
        state.status = StatusType.Loading;
      })
      .addCase(handleSettings.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded;
        state.tabs = payload.tabs;
        state.filters.skills = payload.filters;
        state.filters.jobTypes = payload.jobTypes;
      })
      .addCase(handleSettings.rejected, (state, action) => {
        state.status = StatusType.Failed;
        state.error = action.error.message;
      })

      .addCase(handleActiveTab.fulfilled, (state, { payload }) => {
        const activeIndex = state.tabs.findIndex((tab) => tab.active === true);
        const index = state.tabs.findIndex(
          (tab) => tab.label === payload.label
        );

        state.tabs[activeIndex].active = false;
        state.tabs[index].active = true;
      })

      .addCase(handleActiveFilter.fulfilled, (state, { payload }) => {
        const index = state.filters[payload.section].findIndex(
          (filter) => filter.label === payload.filter.label
        );
        state.filters[payload.section][index].active = !payload.filter.active;
      })

      .addCase(handleRefreshFilters.fulfilled, (state: SettingsState) => {
        Object.keys(state.filters).forEach((item: string) => {
          state.filters[item as keyof typeof state.filters].forEach(
            (filter: Filter) => {
              filter.active = false;
            }
          );
        });
      })

      .addCase(handleSwitchDisplayMode.fulfilled, (state, { payload }) => {
        state.displayMode = payload;
      });
  },
});

export default reducer;
