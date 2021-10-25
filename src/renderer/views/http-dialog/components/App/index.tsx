import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Dropdown } from '~/renderer/components/Dropdown';
import { Switch } from '~/renderer/components/Switch';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './style';
import store from '../../store';
import { ipcRenderer } from 'electron';
import { UIStyle } from '~/renderer/mixins/default-styles';

export const App = observer(() => {
  ipcRenderer.send(`height-${store.id}`, 12000);
  function checktoken(){
    var value = document.getElementById("tokenid").value ;
    alert(value);
  }
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp style={{ maxHeight: store.maxHeight }} visible={store.visible}>
        <UIStyle />
          <h4>Work in Progress</h4>
      </StyledApp>
    </ThemeProvider>
  );
});
