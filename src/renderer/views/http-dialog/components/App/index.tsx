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
  const [username , setUsername] = React.useState('');
  const [insider , setinsider] = React.useState('');
  (async () => {
    setUsername(await ipcRenderer.invoke('ipc-userinfo',"name"));
    var ins = await ipcRenderer.invoke('ipc-userinfo',"insider");
    if(ins == false){
      setinsider("You cant use this build");
    }else{
      setinsider("You can use this build");
    }
  })();
    return (
      <ThemeProvider theme={{ ...store.theme }}>
        <StyledApp style={{ maxHeight: store.maxHeight }} visible={store.visible}>
          <UIStyle />
            <h4>Hi : {username.toString()}</h4>
            {insider.toString()}
        </StyledApp>
      </ThemeProvider>
    );
});
