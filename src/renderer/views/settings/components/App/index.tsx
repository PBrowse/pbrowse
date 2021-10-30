import * as React from 'react';
import { useState } from "react";
import { observer } from 'mobx-react-lite';
import ReactCommandPalette from 'react-command-palette';
import { SettingsSection } from '../../store';
import { Appearance } from '../Appearance';
import { AddressBar, ManageSearchEngines } from '../AddressBar';
import { Privacy } from '../Privacy';
import store from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { Button } from '~/renderer/components/Button';
import { getWebUIURL } from '~/common/webui';
import * as Strings from '~/renderer/constants/trasnlations/en';
import { ThemeProvider } from 'styled-components';
import { Autofill } from '../Autofill';
import { OnStartup } from '../Startup';
import { Content, LeftContent, Container } from '~/renderer/components/Pages';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import { Downloads } from '../Downloads';
import {
  ICON_PALETTE,
  ICON_AUTOFILL,
  ICON_POWER,
  ICON_SEARCH,
  ICON_DOWNLOAD,
  ICON_SHIELD,
  ICON_TRASH,
  ICON_EDIT,
} from '~/renderer/constants';
import {
  ContextMenuItem,
  ContextMenu,
} from '~/renderer/components/ContextMenu';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
} from '~/renderer/views/bookmarks/components/App/style';
import { Textfield } from '~/renderer/components/Textfield';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
export const NormalButton = ({
  children,
  onClick,
}: {
  children?: any;
  onClick?: any;
}) => {
  return (
    <Button
      background={
        store.theme['dialog.lightForeground']
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)'
      }
      onClick={onClick}
      foreground={store.theme['dialog.lightForeground'] ? 'white' : 'black'}
    >
      {children}
    </Button>
  );
};

const MenuItem = observer(
  ({
    section,
    subSections,
    children,
    icon,
  }: {
    section: SettingsSection;
    subSections?: SettingsSection[];
    children: any;
    icon?: string;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (store.selectedSection = section)}
      selected={
        store.selectedSection === section ||
        (subSections && subSections.includes(store.selectedSection))
      }
      icon={icon}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

const onBlur = () => {
  store.menuVisible = false;
};

const onMakeDefaultClick = () => {
  store.settings.searchEngine = store.settings.searchEngines.findIndex(
    (x) => x.keyword === store.editedSearchEngine.keyword,
  );
  store.menuVisible = false;
};

const onRemoveClick = () => {
  store.settings.searchEngines = store.settings.searchEngines.filter(
    (x) => x.keyword !== store.editedSearchEngine.keyword,
  );
  store.save();
  store.menuVisible = false;
};

const onEditClick = () => {
  store.menuVisible = false;
  store.dialogVisible = true;
  store.dialogContent = 'edit-search-engine';
  store.searchEngineInputRef.current.value = store.editedSearchEngine.name;
  store.searchEngineKeywordInputRef.current.value =
    store.editedSearchEngine.keyword;
  store.searchEngineUrlInputRef.current.value = store.editedSearchEngine.url;
};

const addNewTab = (url: string) => {
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url,
    active: true,
  });
};

const goToWebUIPage = (name: string) => () => {
  addNewTab(getWebUIURL(name));
};

const onSaveClick = () => {
  const name = store.searchEngineInputRef.current.value.trim();
  const keyword = store.searchEngineKeywordInputRef.current.value.trim();
  const url = store.searchEngineUrlInputRef.current.value.trim();

  const item = store.settings.searchEngines.find((x) => x.keyword === keyword);

  if (keyword !== '' && name !== '' && url !== '') {
    if (store.dialogContent === 'edit-search-engine') {
      item.name = name;
      item.keyword = keyword;
      item.url = url;
      store.dialogVisible = false;
    } else if (store.dialogContent === 'add-search-engine') {
      if (!item) {
        store.settings.searchEngines.push({
          name,
          keyword,
          url,
        });
        store.dialogVisible = false;
      }
    }
    store.save();
  }
};

export default observer(() => {
  const { selectedSection } = store;

  let dialogTitle = '';
  const onThemeChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
  };

  if (store.dialogContent === 'edit-search-engine') {
    dialogTitle = 'Edit search engine';
  } else if (store.dialogContent === 'add-search-engine') {
    dialogTitle = 'Add search engine';
  }
  const [open, setOpen] = useState(true);

  const commands = [{
      name: "About",
      command() {
        Promise.resolve().then(() => {
           setTimeout(function(){
          document.location.href = getWebUIURL('version');
          setOpen(false);
          },2000)
        });
      }
    },
    {
      name: "History",
      command() {
        
        Promise.resolve().then(() => {
          setTimeout(function(){
          document.location.href = getWebUIURL('history');
          setOpen(false);
          },2000)
        });
      }
    },{
      name: "Bookmarks",
      command() {
        Promise.resolve().then(() => {
          setTimeout(function(){
            document.location.href = getWebUIURL('history');
            setOpen(false);
          },2000)
          
        });
      }
    },
    {
      name: "t:Set Theme Light",
      command() {
        Promise.resolve().then(() => {
          setTimeout(function(){
            onThemeChange("wexond-light");
            setOpen(false);
          },2000)
          
        });
      }
    },
    {
      name: "t:Set Theme Blue",
      command() {
        Promise.resolve().then(() => {
          setTimeout(function(){
            onThemeChange("wexond-blue");
            setOpen(false);
          },2000)
          
        });
      }
    },
    {
      name: "t:Set Theme Dark",
      command() {
        Promise.resolve().then(() => {
          setTimeout(function(){
            onThemeChange("wexond-dark");
            setOpen(false);
          },2000)
          
        });
      }
    },{
      name: "t:Set Theme Auto",
      command() {
        Promise.resolve().then(() => {
          setTimeout(function(){
            onThemeChange("auto");
            setOpen(false);
          },2000)
          
        });
      }
    }
   ];
  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['pages.lightForeground'] }}
      fullSize={store.fullSizeImage}
    >
    
      <Container
        onMouseDown={(e) => (store.dialogVisible = false)}
        darken={store.dialogVisible}
      >
        <WebUIStyle />
        <GlobalNavigationDrawer></GlobalNavigationDrawer>
        <ContextMenu
          tabIndex={1}
          ref={store.menuRef}
          onBlur={onBlur}
          style={{
            top: store.menuInfo.top,
            left: store.menuInfo.left,
          }}
          visible={store.menuVisible}
        >
          {store.editedSearchEngine &&
            store.editedSearchEngine.keyword !== store.searchEngine.keyword && (
              <>
                <ContextMenuItem onClick={onMakeDefaultClick} icon=" ">
                  {Strings.Make_Default}
                </ContextMenuItem>
                <ContextMenuItem onClick={onRemoveClick} icon={ICON_TRASH}>
                  {Strings.Remove}
                </ContextMenuItem>
              </>
            )}
          {store.editedSearchEngine && (
            <ContextMenuItem onClick={onEditClick} icon={ICON_EDIT}>
              {Strings.Edit}
            </ContextMenuItem>
          )}
        </ContextMenu>
        <Dialog
          onMouseDown={(e) => e.stopPropagation()}
          visible={store.dialogVisible}
          ref={store.dialogRef}
          style={{ width: 350 }}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Textfield
            style={{ width: '100%' }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.searchEngineInputRef}
            label={Strings.Search_Engine}
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
            }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.searchEngineKeywordInputRef}
            label={Strings.Keyword}
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
            }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.searchEngineUrlInputRef}
            label={Strings.Url_wit_percents}
          ></Textfield>

          <DialogButtons>
            <NormalButton onClick={() => (store.dialogVisible = false)}>
              {Strings.Cancel}
            </NormalButton>
            <Button onClick={onSaveClick} style={{ marginLeft: 8 }}>
              {Strings.Save}
            </Button>
          </DialogButtons>
          <div style={{ clear: 'both' }}></div>
        </Dialog>
        <NavigationDrawer title="Settings" search>
          <MenuItem icon={ICON_PALETTE} section="appearance">
            {Strings.Appearance}
          </MenuItem>
          <MenuItem icon={ICON_AUTOFILL} section="autofill">
            {Strings.Autofill}
          </MenuItem>
          <MenuItem icon={ICON_POWER} section="startup">
            {Strings.On_startup}
          </MenuItem>
          <MenuItem
            icon={ICON_SEARCH}
            section="address-bar"
            subSections={['search-engines']}
          >
            {Strings.Address_bar}
          </MenuItem>
          <MenuItem icon={ICON_DOWNLOAD} section="downloads">
            {Strings.Downloads}
          </MenuItem>
          <MenuItem icon={ICON_SHIELD} section="privacy">
            {Strings.Privacy}
          </MenuItem>
          {/* <MenuItem section="permissions">Site permissions</MenuItem> */}

          {/* <MenuItem section="language">Languages</MenuItem> */}
          {/* <MenuItem section="shortcuts">Keyboard shortcuts</MenuItem> */}
          {/* <MenuItem section="system">System</MenuItem> */}
        </NavigationDrawer>
        <Content>
          <LeftContent style={{ maxWidth: 800, marginTop: 56 }}>
          <ReactCommandPalette
            closeOnSelect={false}
            showSpinnerOnSelect={true}
            resetInputOnOpen
            placeholder={Strings.naviagte_quick}
            defaultInputValue="."
            onAfterOpen={() => {
              setOpen(false);
            }}
             filterSearchQuery={ inputValue => {
              // strip action keys "? or >" from input before searching commands, ex:
              // "?something" or ">something" should search using "something" as the query
              return inputValue.replace(/^(>|\?)/g, '');
            }}
            commands={commands}
            open={open}
          />
            {selectedSection === 'appearance' && <Appearance />}
            {selectedSection === 'autofill' && (
              <Autofill />
            )}
            {selectedSection === 'address-bar' && <AddressBar />}
            {selectedSection === 'search-engines' && <ManageSearchEngines />}
            {selectedSection === 'startup' && <OnStartup />}
            {selectedSection === 'privacy' && <Privacy />}
            {selectedSection === 'downloads' && <Downloads />}
          </LeftContent>
        </Content>
      </Container>
    </ThemeProvider>
  );
});
