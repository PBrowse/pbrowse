import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import store from '../../store';
import { Tabbar } from '../Tabbar';
import { platform } from 'os';
import { ToolbarButton } from '../ToolbarButton';
import { WindowsControls } from 'react-windows-controls';
import { StyledTitlebar, FullscreenExitButton } from './style';
import { NavigationButtons } from '../NavigationButtons';
import { ICON_AUTOFILL } from '~/renderer/constants';
import { RightButtons } from '../RightButtons';
import { Separator } from '../RightButtons/style';
import { SiteButtons } from '../SiteButtons';

const onCloseClick = () => ipcRenderer.send(`window-close-${store.windowId}`);

const onMaximizeClick = () =>
  ipcRenderer.send(`window-toggle-maximize-${store.windowId}`);

const onMinimizeClick = () =>
  ipcRenderer.send(`window-minimize-${store.windowId}`);

const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  if (store.addressbarFocused) {
    e.preventDefault();
  }
};

const onFullscreenExit = (e: React.MouseEvent<HTMLDivElement>) => {
  remote.getCurrentWindow().setFullScreen(false);
};

const onICCL = async (e: React.MouseEvent<HTMLDivElement>) => {
const { left, bottom } = e.currentTarget.getBoundingClientRect();
ipcRenderer.send(`show-http-dialog-${store.windowId}`, left, bottom);
};
/* <WindowsControls
            style={{
              height: store.isCompact ? '100%' : 32,
              WebkitAppRegion: 'no-drag',
              marginLeft: 8,
            }}
            onClose={onCloseClick}
            onMinimize={onMinimizeClick}
            onMaximize={onMaximizeClick}
            dark={store.theme['toolbar.lightForeground']}
          /> */
export const Titlebar = observer(() => {
  return (
    <StyledTitlebar
      onMouseDown={onMouseDown}
      isFullscreen={store.isFullscreen}
      isHTMLFullscreen={store.isHTMLFullscreen}
    >
      {store.isCompact && <NavigationButtons />}
      <Tabbar />
      {store.isCompact && <RightButtons />}
      <ToolbarButton
        toggled={false}
        icon={'https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png'}
        onClick={onICCL}
        alt="Secure PBrowse Page"
        size={25}
        style={{ marginTop:'6px' }}
        dense
        iconStyle={{ transform: 'scale(-1,1)' }}
      />
      {platform() !== 'darwin' && (
        store.isFullscreen
          ? <FullscreenExitButton
            style={{
              height: store.isCompact ? '100%' : 32,
            }}
            onMouseUp={onFullscreenExit}
            theme={store.theme}
          />
          : <p></p>
      )}
    </StyledTitlebar>
  );
});
