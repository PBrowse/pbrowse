import * as React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store';
//import "reactweathercard/dist/index.css" // dont forget to import css 
import { ThemeProvider } from 'styled-components';
import { Content, Image } from './style';
import { TopSites } from '../TopSites';

import * as Strings from '~/renderer/constants/trasnlations/en';

import { ipcRenderer } from 'electron';

import { News } from '../News';
import { Preferences } from '../Preferences';

import { getWebUIURL } from '~/common/webui';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
           {Strings.SPEED_DIAL} Please Note : PBrowse is going to be discountinued Please Try xBrowse
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
      <h3></h3>
      {store.topSitesVisible && <TopSites></TopSites>}
      {/*{store.newsBehavior && <News></News>}*/}
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
      </Content>
    </ThemeProvider>
  );
});
