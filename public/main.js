// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const globalShortcut = electron.globalShortcut
const path = require('path')
const os = require('os')
const isDev = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadFile('file:///' + __dirname + "/index.html")
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.webContents.openDevTools()

 
  console.log(os.homedir());
  globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		mainWindow.reload()
  })
  
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3001"
      : `file://${path.join(__dirname, "/index.html")}`
  );

  //Add React Dev tools
  //BrowserWindow.addDevToolsExtension("C:/Users/jixiang.li/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0")
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

