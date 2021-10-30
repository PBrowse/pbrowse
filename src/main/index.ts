import { ipcMain, app, webContents , Tray, nativeImage, Notification, autoUpdater} from 'electron';
import { ICON_SEARCH , ICONGLOBE_1 , HTTPS_ICON , HTTP_ICON , MAINICON } from '~/renderer/constants';
import { setIpcMain } from '@wexond/rpc-electron';
setIpcMain(ipcMain);

const language_en = require('data-store')({ path: app.getPath('userData') + '/en.json' });

require('@electron/remote/main').initialize();

if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install();
}

import { platform } from 'os';
import { Application } from './application';

export const isNightly = app.name === 'PBrowse';
try{
app.allowRendererProcessReuse = true;
}catch(e){
  console.log(e);
}
app.name = isNightly ? 'PBrowse' : 'PBrowse';

(process.env as any)['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

app.commandLine.appendSwitch('--enable-transparent-visuals');
app.commandLine.appendSwitch(
  'enable-features',
  'CSSColorSchemeUARendering, ImpulseScrollAnimations, ParallelDownloading',
);

if (process.env.NODE_ENV === 'development') {
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
}

ipcMain.setMaxListeners(0);

let tray

app.whenReady().then(() => {
  language_en.set('speed_dial','Sped Dial');
})

// app.setAsDefaultProtocolClient('http');
// app.setAsDefaultProtocolClient('https');

const application = Application.instance;
application.start();

process.on('uncaughtException', (error) => {
  console.error(error);
});

app.on('window-all-closed', () => {
  if (platform() !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('get-webcontents-id', (e) => {
  e.returnValue = e.sender.id;
});

ipcMain.handle('get-string', async (event, string) => {
  const string_return = language_en.get(string);
  return string_return.toString();
})

ipcMain.on('get-window-id', (e) => {
  e.returnValue = (e.sender as any).windowId;
});

ipcMain.handle(
  `web-contents-call`,
  async (e, { webContentsId, method, args = [] }) => {
    const wc = webContents.fromId(webContentsId);
    const result = (wc as any)[method](...args);

    if (result) {
      if (result instanceof Promise) {
        return await result;
      }

      return result;
    }
  },
);

// We need to prevent extension background pages from being garbage collected.
const backgroundPages: Electron.WebContents[] = [];

app.on('web-contents-created', (e, webContents) => {
  if (webContents.getType() === 'backgroundPage')
    backgroundPages.push(webContents);
});
