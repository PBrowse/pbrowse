import { resolve } from 'path';
import { app } from 'electron';
import * as remote from '@electron/remote/main';

export const getPath = (...relativePaths: string[]) => {
  let path: string;

  if (app) {
    path = app.getPath('userData');
  } else if (app) {
    path = app.getPath('userData');
  } else {
    return null;
  }

  return resolve(path, ...relativePaths).replace(/\\/g, '/');
};
//