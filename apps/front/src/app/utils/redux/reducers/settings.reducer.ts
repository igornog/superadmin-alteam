import { createSlice } from '@reduxjs/toolkit'
import { skillsFilters, availabilityFilters } from '../../../features/talents'
import {
  handleActiveFilter,
  handleActiveSort,
  handleActiveTab,
  handleInitSettings,
  handleRefreshFilters,
  handleSettingsTab,
  handleSwitchDisplayMode,
  handleUpdateFilter,
} from '../actions/settings.action'
import { DisplayMode, SettingsState } from '../types/settings.type'
import { StatusType } from '../types/status.type'

const initialState: SettingsState = {
  tabs: [],
  filters: {
    skills: [],
    jobTypes: [],
    searchName: '',
  },
  sort: null,
  header: {},
  displayMode: DisplayMode.List,
  status: StatusType.Idle,
  error: null,
}

const { reducer } = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleInitSettings.pending, (state) => {
        state.status = StatusType.Loading
      })

      .addCase(handleInitSettings.fulfilled, (state, { payload }) => {
        state.status = StatusType.Succeeded
        state.tabs = payload.tabs.map(({ _, ...rest }: any) => rest)

        if (payload.filters) {
          state.filters.skills = payload.filters
        }

        if (payload.jobTypes) {
          state.filters
          .jobTypes = payload.jobTypes
        }
      })

      .addCase(handleInitSettings.rejected, (state, action) => {
        state.status = StatusType.Failed
        state.error = action.error.message
      })

      .addCase(handleSettingsTab.fulfilled, (state, { payload }) => {
        state.header = payload
      })

      .addCase(handleActiveTab.fulfilled, (state, { payload }) => {
        const activeIndex = state.tabs.find((tab) => tab.active === true)
        const index = state.tabs.find((tab) => tab.title === payload.title)

        if (activeIndex) activeIndex.active = false

        if (index) index.active = true
      })

      .addCase(handleActiveSort.fulfilled, (state, { payload }) => {
        state.sort = payload.sort
      })

      .addCase(handleActiveFilter.fulfilled, (state, { payload }) => {
        const activeIndex = state.filters[payload.section]?.find(
          (filter) => filter.label === payload.filter.label,
        )

        if (activeIndex) activeIndex.active = !payload.filter.active
      })

      .addCase(handleUpdateFilter.fulfilled, (state, { payload }) => {
        state.filters.searchName = payload.searchName
      })

      .addCase(handleRefreshFilters.fulfilled, (state: SettingsState) => {
        state.filters.skills = skillsFilters
        state.filters.jobTypes = availabilityFilters
        state.filters.searchName = ''
      })

      .addCase(handleSwitchDisplayMode.fulfilled, (state, { payload }) => {
        state.displayMode = payload
      })
  },
})

export default reducer
