import { observable, computed, action, makeObservable } from 'mobx';
import {
  ISettings,
  IHistoryItem,
  IHistorySection,
  IFavicon,
  ITheme,
} from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { PreloadDatabase } from '~/preloads/models/database';
import { getSectionLabel, compareDates } from '../utils';

export type QuickRange =
  | 'all'
  | 'today'
  | 'yesterday'
  | 'last-week'
  | 'last-month'
  | 'older';

export class Store {
  public faviconsDb = new PreloadDatabase<IFavicon>('favicons');

  // Observable

  @observable
  public settings: ISettings = { ...(window as any).settings };

  @observable
  public favicons: Map<string, string> = new Map();

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  
}

export default new Store();
