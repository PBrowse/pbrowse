import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import {
  ContextMenu,
  ContextMenuItem,
} from '~/renderer/components/ContextMenu';
import { Passwords } from './Passwords';
import { Addresses } from './Addresses';
import { Header } from '../App/style';
import { ICON_EDIT, ICON_TRASH } from '~/renderer/constants';

import * as Strings from '~/renderer/constants/trasnlations/en';

const onEditClick = () => {
  store.dialogContent = 'edit-address';
};

const onRemoveClick = () => {
  const item = store.autoFill.selectedItem;
  store.autoFill.removeItem(item);
};

const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const Menu = observer(() => {
  const item = store.autoFill.selectedItem;

  const style: any = {
    top: store.autoFill.menuTop,
    left: store.autoFill.menuLeft - 130,
    position: 'fixed',
  };

  return (
    <ContextMenu
      onMouseDown={onMouseDown}
      style={style}
      visible={store.autoFill.menuVisible}
    >
      {item && item.type === 'address' && (
        <ContextMenuItem icon={ICON_EDIT} onClick={onEditClick}>
          {Strings.Edit}
        </ContextMenuItem>
      )}
      <ContextMenuItem icon={ICON_TRASH} onClick={onRemoveClick}>
        {Strings.Remove}
      </ContextMenuItem>
    </ContextMenu>
  );
});

export const Autofill = () => {
  return (
    <>
      <Header style={{ paddingBottom: 12 }}>Autofill</Header>
      <Passwords />
      <Addresses />
      <Menu />
    </>
  );
};
