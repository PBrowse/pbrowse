import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Title, Permissions, Permission, Buttons } from './style';
import store from '../../store';
import { Button } from '~/renderer/components/Button';
import { UIStyle } from '~/renderer/mixins/default-styles';

const sendResult = (r: boolean) => {
  store.send('result', r);
};

const getText = (permission: string) => {
  if (permission === 'notifications') {
    return 'Show notifications';
  }

  if (permission === 'microphone') {
    return 'Access your microphone';
  }

  if (permission === 'camera') {
    return 'Access your camera';
  }

  if (permission === 'geolocation') {
    return 'Know your location';
  }

  return permission;
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp>
        <UIStyle />
        <Title>{store.domain} wants some permissions</Title>
        <Permissions>
          {store.permissions.map((item) => (
            <Permission key={item}>{getText(item)}</Permission>
          ))}
        </Permissions>
        <Buttons>
          <Button
           style = {{ backgroundColor : 'green' , color : 'white'}}
            foreground={
              store.theme['dialog.lightForeground'] ? 'white' : 'black'
            }
            onClick={() => sendResult(true)}
          >
            Allow
          </Button>
          <Button
            style = {{ backgroundColor : 'red' , color : 'white'}}
            foreground={
              store.theme['dialog.lightForeground'] ? 'white' : 'black'
            }
            style={{ marginLeft: 8 }}
            onClick={() => sendResult(false)}
          >
            Deny
          </Button>
        </Buttons>
        <div style={{ clear: 'both' }}></div>
      </StyledApp>
    </ThemeProvider>
  );
});
