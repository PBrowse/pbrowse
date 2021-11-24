import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StyledDownloadItem,
  Title,
  Progress,
  ProgressBackground,
  Info,
  Icon,
  MoreButton,
  Separator,
  SecondaryText,
} from './style';
import { IDownloadItem } from '~/interfaces';
import prettyBytes = require('pretty-bytes');
import { shell , ipcRenderer } from 'electron';
import Button from '@mui/material/Button';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import CloseIcon from '@mui/icons-material/Close';
const onClick = (item: IDownloadItem) => () => {
  if (item.completed) {
    shell.openPath(item.savePath);
  }
};

const onMoreClick = (item: IDownloadItem) => () =>{
  console.log(item.id);
  ipcRenderer.send('cancel-download-'+item.id);
}

export const DownloadItem = observer(({ item }: { item: IDownloadItem }) => {
  let received = prettyBytes(item.receivedBytes);
  const total = prettyBytes(item.totalBytes);

  const receivedSplit = received.split(' ');

  if (receivedSplit[1] === total.split(' ')[1]) {
    received = receivedSplit[0];
  }

  return (
    <StyledDownloadItem>
      <Icon></Icon>
      <Info>
        <Title>{item.fileName}</Title>
        {!item.completed && (
          <>
            <ProgressBackground>
              <Progress
                style={{
                  width: `calc((${item.receivedBytes} / ${item.totalBytes}) * 100%)`,
                }}
              ></Progress>
            </ProgressBackground>
            <SecondaryText>{`${received}/${total}`}</SecondaryText>
          </>
        )}
      </Info>
      <Separator></Separator>
      <Button variant="contained" onClick={onClick(item)}><FileOpenIcon/></Button>
      <Button variant="contained" onClick={onMoreClick(item)}><CloseIcon/></Button>
    </StyledDownloadItem>
  );
});
