import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  DisplayMode,
  Filter,
  HandlesettingsProps,
  Page,
  Settings,
  SideDrawerVariant,
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

export const handleDrawer = createAsyncThunk(
  'settings/selectedDrawer',
  async (drawer: SideDrawerVariant | null) => {
    return drawer
  },
)
