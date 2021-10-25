import * as React from 'react';
import { observer } from 'mobx-react-lite';

import ChromeDinoGame from 'react-chrome-dino';

import store, { QuickRange } from '../../store';
import { ThemeProvider } from 'styled-components';
import { SelectionDialog } from '~/renderer/components/SelectionDialog';
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


export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <ChromeDinoGame />
    </ThemeProvider>
  );
});
