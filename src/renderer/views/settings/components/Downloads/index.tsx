import * as React from 'react';

import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { DownloadItem } from '../DownloadItem';
import { observer } from 'mobx-react-lite';
import { NormalButton } from '../App';
import * as Strings from '~/renderer/constants/trasnlations/en';
const downloadssss = require('/downloads.json');
const downloads: IDownloadItem[] = Array.from(downloadssss.downloads);;

console.log(downloads);

const AskToggle = observer(() => {
  const { downloadsDialog } = store.settings;

  return (
    <Row onClick={onSwitchChange('downloadsDialog')}>
      <Title>{Strings.Ask_Download}</Title>
      <Control>
        <Switch value={downloadsDialog} />
      </Control>
    </Row>
  );
});

const onChangeClick = () => {
  ipcRenderer.send('downloads-path-change');
};

const Location = observer(() => {
  return (
    <Row>
      <div>
        <Title>{Strings.Location}</Title>
        <SecondaryText>{store.settings.downloadsPath}</SecondaryText>
      </div>

      <Control>
        <NormalButton onClick={onChangeClick}>{Strings.Change_Location}</NormalButton>
      </Control>
    </Row>
  );
});

const DDItems = observer(() => {
  return (
    <Row>
      <div>
        <Title>Downloads</Title>
      </div>

      <div>
        
      </div>
    </Row>
  );
});

export const Downloads = () => {
  return (
    <>
      <Header>Download Settings</Header>
      <Location />
      <AskToggle />

      <DDItems />

      {downloads.map((item) => (
        <DownloadItem item={item} key={item.id}></DownloadItem>
      ))}
    </>
  );
};
