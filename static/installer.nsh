!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "PBrowse" "Software\Clients\StartMenuInternet\PBrowse\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse" "" "PBrowse HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\Application" "AppUserModelId" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\Application" "ApplicationIcon" "$INSTDIR\PBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\Application" "ApplicationName" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\Application" "ApplicationCompany" "PBrowse"      
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\DefaultIcon" "DefaultIcon" "$INSTDIR\PBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\PBrowse\shell\open\command" "" '"$INSTDIR\PBrowse.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "PBrowse" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "PBrowse" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse" "" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\DefaultIcon" "" "$INSTDIR\PBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities" "ApplicationName" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities" "ApplicationIcon" "$INSTDIR\PBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities\FileAssociations" ".htm" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities\FileAssociations" ".html" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities\URLAssociations" "http" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities\URLAssociations" "https" "PBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\Capabilities\StartMenu" "StartMenuInternet" "PBrowse"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse\shell\open\command" "" "$INSTDIR\PBrowse.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\PBrowse"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\PBrowse"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "PBrowse"
!macroend