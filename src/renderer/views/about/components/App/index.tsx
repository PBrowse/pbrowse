import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store, { QuickRange } from '../../store';
import { ThemeProvider } from 'styled-components';
import { HistorySection } from '../HistorySection';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import {
  ICON_HISTORY,
  ICON_ALL,
  ICON_TODAY,
  ICON_WEEK,
  ICON_CALENDAR,
  ICON_TRASH,
} from '~/renderer/constants';
import { WebUIStyle } from '~/renderer/mixins/default-styles';

const onScroll = (e: any) => {
  const scrollPos = e.target.scrollTop;
  const scrollMax = e.target.scrollHeight - e.target.clientHeight - 256;

  if (scrollPos >= scrollMax) {
    store.itemsLoaded += store.getDefaultLoaded();
  }
};

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
    <title>About</title>
     <h4 align="center">PBrowse Dev</h4>
     <p>Version : Build 7.9.89</p>
    <table border="1">
      <th>
        <td>Thing</td>
        <td>Credits</td>
      </th>
      <tbody>
        <tr>
          <td>Logo</td>
          <td>TWORLD (tech4help.org)</td>
        </tr>
        <tr>
          <td>Spanish Edition</td>
          <td>PWLYT (PHT Technologies)</td>
        </tr>
        <tr>
          <td>Italian Edition</td>
          <td>Luis Antonio Carbone</td>
        </tr>  
      </tbody>
    </table>
    </ThemeProvider>
  );
});
