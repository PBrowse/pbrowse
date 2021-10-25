import * as React from 'react';
import { NavigationDrawer } from '../NavigationDrawer';
import { observer } from 'mobx-react-lite';
import {
  ICON_SETTINGS,
  ICON_HISTORY,
  ICON_BOOKMARKS,
  ICON_EXTENSIONS,
  ICON_DOWNLOAD,
  MAINICON,
} from '~/renderer/constants/icons';
import { getWebUIURL } from '~/common/webui';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InfoIcon from '@mui/icons-material/Info';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const MenuItem = observer(
  ({
    name,
    children,
    icon,
  }: {
    name: string;
    children: any;
    icon?: string;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (window.location.href = getWebUIURL(name))}
      selected={window.location.href.startsWith(getWebUIURL(name))}
      icon={icon}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

export const GlobalNavigationDrawer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        <MenuItem name="settings">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <SettingsIcon/>
          </IconButton>
          Settings
        </MenuItem>
        <MenuItem name="history">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <HistoryIcon/>
          </IconButton>
          History
        </MenuItem>
        <MenuItem name="bookmarks">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <BookmarkIcon/>
          </IconButton>
          Bookmarks
        </MenuItem>
        <MenuItem name="version">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <InfoIcon/>
          </IconButton>
          About Browser
        </MenuItem>
        </Toolbar>
      </AppBar>
  );
};
