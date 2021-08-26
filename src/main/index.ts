import { ipcMain, app, webContents , Tray, nativeImage, Notification   } from 'electron';
import { ICON_SEARCH , ICONGLOBE_1 , HTTPS_ICON , HTTP_ICON , MAINICON } from '~/renderer/constants';
import { setIpcMain } from '@wexond/rpc-electron';
const axios = require('axios');
const { Axios } = require('axios');
setIpcMain(ipcMain);
const FileDownload = require('js-file-download');


require('@electron/remote/main').initialize();

if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install();
}

import { platform } from 'os';
import { Application } from './application';

export const isNightly = app.name === 'PBrowse';

app.allowRendererProcessReuse = true;
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
  // const NOTIFICATION_TITLE = 'PBrowse'
  // const NOTIFICATION_BODY = 'PBrowse is ready'

  // function showNotification () {
  //   new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
  // }
  // showNotification();
  // axios.get('https://pbrowse.preknowledgeweb.repl.co/.version')
  // .then(function (response) {
  //  console.log(response.data);
  //  if(response.data == 'main3'){

  //  }else{
  //   const NOTIFICATION_TITLE = 'PBrowse'
  //   const NOTIFICATION_BODY = 'PBrowse update found new version is ' + response.data;

  //   function showNotification () {
  //     new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
  //   }
  //   showNotification();
  //   //downloadUpdate(response.data);//
  //   // ^ this function is disabled //
  //  }
  // })
  // .catch(function (error) {
  //   const NOTIFICATION_TITLE = 'PBrowse'
  //   const NOTIFICATION_BODY = 'Cant check for updates : Something Went Wrong or you are offline';

  //   function showNotification () {
  //     new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
  //   }
  //   showNotification();
  //   console.log(error);
  // })
  // .then(function () {
  //    console.log('Checking for Updates');
  // });

  function downloadUpdate(version){
      Axios({
        url: 'https://pbrowse.preknowledgeweb.repl.co/releases/'+version+'.exe',
        method: 'GET',
        responseType: 'blob', // Important
      }).then((response) => {
        const NOTIFICATION_TITLE = 'PBrowse'
        const NOTIFICATION_BODY = 'Downloading ' + response.data;

        function showNotification2 () {
          new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
        }
        showNotification2();
        FileDownload(response.data, 'pbrowsenewsetup.exe').then(() => {
          const { exec } = require('child_process');
          exec('start pbrowsenewsetup.exe', (err, stdout, stderr) => {
            app.quit();
          });
        });
      });
  }
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
