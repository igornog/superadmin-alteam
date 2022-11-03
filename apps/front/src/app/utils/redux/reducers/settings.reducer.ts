import { createSlice } from '@reduxjs/toolkit';
import {
  handleActiveFilter,
  handleActiveTab,
  handleRefreshFilters,
  handleInitSettings,
  handleSettingsTab,
  handleSwitchDisplayMode,
  handleModal,
  handleDrawer,
} from '../actions/settings.action';
import { DisplayMode, Filter, SettingsState } from '../types/settings.type';
import { StatusType } from '../types/status.type';

const initialState: SettingsState = {
  tabs: [],
  filters: {
    skills: [],
    jobTypes: [],
  },
  header: {},
  displayMode: DisplayMode.List,
  selectedModal: null,
  selectedDrawer: null,
  status: StatusType.Idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleInitSettings.pending, (state) => {
        state.status = StatusType.Loading;
      })
      .addCase(handleInitSettings.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded;
        state.tabs = payload.tabs;
        state.filters.skills = payload.filters;
        state.filters.jobTypes = payload.jobTypes;
      })
      .addCase(handleInitSettings.rejected, (state, action) => {
        state.status = StatusType.Failed;
        state.error = action.error.message;
      })

      .addCase(handleSettingsTab.fulfilled, (state, { payload }) => {
        state.header = payload;
      })

      .addCase(handleActiveTab.fulfilled, (state, { payload }) => {
        const activeIndex = state.tabs.findIndex((tab) => tab.active === true);
        const index = state.tabs.findIndex(
          (tab) => tab.title === payload.title
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
      })

      .addCase(handleModal.fulfilled, (state, { payload }) => {
        state.selectedModal = payload;
      })

      .addCase(handleDrawer.fulfilled, (state, { payload }) => {
        state.selectedDrawer = payload;
      });
  },
});

export default reducer;
