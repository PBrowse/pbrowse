import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import store from '../../store';
//import "reactweathercard/dist/index.css" // dont forget to import css 
import WeatherCardReact from 'reactweathercard'
import { ThemeProvider } from 'styled-components';
import { Wrapper, Content, IconItem, Menu, Image, RightBar } from './style';
import { TopSites } from '../TopSites';

import { News } from '../News';
import { Preferences } from '../Preferences';

import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { getWebUIURL } from '~/common/webui';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

window.addEventListener('mousedown', () => {
  store.dashboardSettingsVisible = false;
});

const onIconClick = (name: string) => () => {
  window.location.href = getWebUIURL(name);
};

const onTuneClick = () => {
  store.dashboardSettingsVisible = !store.dashboardSettingsVisible;
};

const onUpdateNews = () => {
  store.updateNews();
};

const onImageUpdate = () => {
  localStorage.removeItem("imageDate");
  localStorage.removeItem("imageURL");
  store.loadImage();
};

const onRefreshClick = () => {
  // setTimeout(() => {
  //   localStorage.setItem('imageDate', '');
  //   store.loadImage();
  // }, 50);
};

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default observer(() => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={{ ...store.theme }} fullSize={store.fullSizeImage}>
    <Image src={store.imageVisible ? store.image : ''}></Image>
    <Content>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Speed Dial
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onTuneClick}
          >
          <SettingsIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onUpdateNews}
          >
          <RefreshIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onImageUpdate}
          >
          <ImageIcon />
          </IconButton>
        </Toolbar>
        <Preferences />
      </AppBar>
      {store.topSitesVisible && <TopSites></TopSites>}
      {store.newsBehavior && <News></News>}
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {/*<IconItem
                imageSet={store.imageVisible}
                title="Settings"
                icon={ICON_SETTINGS}
                onClick={onIconClick('settings')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="History"
                icon={ICON_HISTORY}
                onClick={onIconClick('history')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="Bookmarks"
                icon={ICON_BOOKMARKS}
                onClick={onIconClick('bookmarks')}
              ></IconItem>*/}
          <IconButton color="inherit" aria-label="open drawer" onClick={onIconClick('settings')}>
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" onClick={onIconClick('history')}>
            <HistoryIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" onClick={onIconClick('bookmarks')}>
            <BookmarkIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      </Content>
    </ThemeProvider>
  );
});
