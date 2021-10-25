<ThemeProvider theme={{ ...store.theme }} fullSize={store.fullSizeImage}>
    
    <Image src={store.imageVisible ? store.image : ''}></Image>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script>
        
      </script>
      <div>
        <WebUIStyle />
        
          <Content>
            
            <h3 style = {{ color:'white' }}> TIP : Report Bugs in  <a href="https://docs.google.com/forms/d/e/1FAIpQLScAKXmjP3MURLoVbzRi67kNP5BWeLhdI1FnB-Kuws41wGzvaA/viewform?usp=sf_link" style={{ backgroundColor : 'white' , color:'black' , margin:'10px'}}>Click here</a></h3> 
          </Content>
         
        <Preferences />
        
        <Wrapper fullSize={store.fullSizeImage} style={{ height:'450px', }}>
        <Image src={store.imageVisible ? store.image : ''}></Image>
         
        <Content>{store.topSitesVisible && <TopSites></TopSites>}</Content>
        {store.quickMenuVisible && (
            <Menu>
              <IconItem
                imageSet={store.imageVisible}
                title="Settings"
                icon={ICON_SETTINGS}
                onClick={onIconClick('settings')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="History"
                icon={ICON_HISTORY}
                onClick={onIconClick('history')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="Bookmarks"
                icon={ICON_BOOKMARKS}
                onClick={onIconClick('bookmarks')}
              ></IconItem>
              {/* * <IconItem
                imageSet={store.imageVisible}
                title="Downloads"
                icon={ICON_DOWNLOAD}
                onClick={onIconClick('downloads')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="Extensions"
                icon={ICON_EXTENSIONS}
                onClick={onIconClick('extensions')}
              ></IconItem> */}
            </Menu>
          )}
          <RightBar>
            <IconItem
              imageSet={store.imageVisible}
              title="Dashboard settings"
              icon={ICON_TUNE}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={onTuneClick}
            ></IconItem>
          </RightBar>
          
        </Wrapper>
         
         <Content fullSize={store.fullSizeImage} style={{ backgroundImage:store.imageVisible ? store.image : '', }}>
           {/* <Image src={store.imageVisible ? store.image : ''}></Image>*/}
           {/*<WeatherCardReact />*/}
           <ReactWeather
              isLoading={isLoading}
              errorMessage={errorMessage}
              data={data}
              lang="en"
              locationLabel="Munich"
              unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
              showForecast
            />
           {store.newsBehavior && <News></News>}
         </Content>
        
       
      </div>
    </ThemeProvider>



    <StyledTitlebar
      onMouseDown={onMouseDown}
      isFullscreen={store.isFullscreen}
      isHTMLFullscreen={store.isHTMLFullscreen}
    >
      {store.isCompact && <NavigationButtons />}
      <Tabbar />
      {store.isCompact && <RightButtons />}
      <ToolbarButton
        toggled={false}
        icon={'https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png'}
        onClick={onICCL}
        alt="Secure PBrowse Page"
        size={25}
        style={{ marginTop:'6px' }}
        dense
        iconStyle={{ transform: 'scale(-1,1)' }}
      />
      {platform() !== 'darwin' && (
        store.isFullscreen
          ? <FullscreenExitButton
            style={{
              height: store.isCompact ? '100%' : 32,
            }}
            onMouseUp={onFullscreenExit}
            theme={store.theme}
          />
          : <WindowsControls
            style={{
              height: store.isCompact ? '100%' : 32,
              WebkitAppRegion: 'no-drag',
              marginLeft: 8,
            }}
            onClose={onCloseClick}
            onMinimize={onMinimizeClick}
            onMaximize={onMaximizeClick}
            dark={store.theme['toolbar.lightForeground']}
          />
      )}
    </StyledTitlebar>


    <NavigationDrawer dense title="">
      <MenuItem name="settings" icon={ICON_SETTINGS}>
        Settings
      </MenuItem>
      <MenuItem name="history" icon={ICON_HISTORY}>
        History
      </MenuItem>
      <MenuItem name="bookmarks" icon={ICON_BOOKMARKS}>
        Bookmarks
      </MenuItem>
      <MenuItem name="version" icon={MAINICON}>
        Version
      </MenuItem>
      {/* <MenuItem name="downloads" icon={ICON_DOWNLOAD}>
        Downloads
      </MenuItem>
      <MenuItem name="extensions" icon={ICON_EXTENSIONS}>
        Extensions
      </MenuItem> */}
    </NavigationDrawer>