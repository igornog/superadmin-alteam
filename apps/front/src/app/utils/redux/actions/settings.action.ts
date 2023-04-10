import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  DisplayMode,
  Filter,
  FilterInterface,
  HandlesettingsProps,
  Page,
  Settings,
} from '../types/settings.type'

export const handleInitSettings = createAsyncThunk(
  'settings/initSettings',
  async (settings: HandlesettingsProps) => {
    return settings
  },
)

export const handleSettingsTab = createAsyncThunk(
  'settings/initSettingsActiveTab',
  async (settings: Settings) => {
    return settings
  },
)

export const handleSwitchDisplayMode = createAsyncThunk(
  'settings/switchDisplayMode',
  async (mode: DisplayMode) => {
    return mode
  },
)

export const handleActiveTab = createAsyncThunk(
  'settings/activeTab',
  async (tab: Page) => {
    return tab
  },
)

export const handleUpdateFilter = createAsyncThunk(
  'settings/updateFilter',
  async (filters: FilterInterface) => {
    return filters
  },
)

export const handleActiveSort = createAsyncThunk(
  'settings/activeSort',
  async (props: { sort: string }) => {
    return props
  },
)

export const handleActiveFilter = createAsyncThunk(
  'settings/activeFilter',
  async (props: { filter: Filter; section: 'skills' | 'jobTypes' }) => {
    return props
  },
)

export const handleRefreshFilters = createAsyncThunk(
  'settings/refreshFilters',
  async () => {
    return true
  },
)
