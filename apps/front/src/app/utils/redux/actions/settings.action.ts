import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DisplayMode,
  Filter,
  HandlesettingsProps,
  Page,
} from '../types/settings.type';

export const handleSettings = createAsyncThunk(
  'settings/initSettings',
  async (settings: HandlesettingsProps) => {
    return settings;
  }
);

export const handleSwitchDisplayMode = createAsyncThunk(
  'settings/switchDisplayMode',
  async (mode: DisplayMode) => {
    return mode;
  }
);

export const handleActiveTab = createAsyncThunk(
  'settings/activeTab',
  async (tab: Page) => {
    return tab;
  }
);

export const handleActiveFilter = createAsyncThunk(
  'settings/activeFilter',
  async (props: { filter: Filter; section: 'skills' | 'jobTypes' }) => {
    return props;
  }
);

export const handleRefreshFilters = createAsyncThunk(
  'settings/refreshFilters',
  async () => {
    return true;
  }
);
