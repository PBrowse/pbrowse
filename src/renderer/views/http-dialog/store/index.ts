import { ipcRenderer } from 'electron';
import { makeObservable, observable } from 'mobx';
import { IDownloadItem } from '~/interfaces';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {

  public maxHeight = 1200;

  public constructor() {
    super();

    makeObservable(this, { maxHeight: observable });

    this.init();

    ipcRenderer.on('max-height', (e, height) => {
      this.maxHeight = height;
    });
  }

  public async init() {
    
  }
}

export default new Store();
