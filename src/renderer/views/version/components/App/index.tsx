import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store, { QuickRange } from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { ThemeProvider } from 'styled-components';
import { SelectionDialog } from '~/renderer/components/SelectionDialog';
import { HistorySection } from '../HistorySection';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { makeStyles } from '@material-ui/core/styles';
const axios = require('axios');
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import {
  ICON_HISTORY,
  ICON_ALL,
  ICON_TODAY,
  ICON_WEEK,
  ICON_CALENDAR,
  ICON_TRASH,
  MAINICON,
} from '~/renderer/constants';
import { WebUIStyle } from '~/renderer/mixins/default-styles';



const onScroll = (e: any) => {
  const scrollPos = e.target.scrollTop;
  const scrollMax = e.target.scrollHeight - e.target.clientHeight - 256;

  if (scrollPos >= scrollMax) {
    store.itemsLoaded += store.getDefaultLoaded();
  }
};

const RangeItem = observer(
  ({
    range,
    children,
    icon,
  }: {
    range: QuickRange;
    children: any;
    icon: string;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (store.selectedRange = range)}
      selected={store.selectedRange === range}
      icon={icon}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

const onCancelClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.selectedItems = [];
};

const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.deleteSelected();
};



const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  store.search(e.currentTarget.value);
};

const onClearClick = () => {
  store.clear();

  ipcRenderer.send('clear-browsing-data');
};

axios.get(`https://xbrowse-update-server.preknowledgeweb.repl.co/pbrowse.php`)
  .then(function (response) {
    console.log(response.data.data_html);
    document.getElementById("important_communication").innerHTML = response.data.data_html;
  })
  .catch(function (error) {
    console.log(error);
  });

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <Container>
        <WebUIStyle />
        <GlobalNavigationDrawer></GlobalNavigationDrawer>
        
        <Content onScroll={onScroll}>
          <div style={{ margin:'1%' , float:'left' }}>
             <img src="https://www.pbrowse.ml/webres/icon.ico" style={{ borderRadius:'30px' }} />
           </div>
            <div style={{ margin:'1%' }}>
             <h3>Version : Stable</h3>
           </div>
           Important Communication : PBrowse is going to END its services soon
           <div id="important_communication"></div>
        </Content>
      </Container>
    </ThemeProvider>
  );
});
