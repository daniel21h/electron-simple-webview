const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win

function createWindow() {
  // Creates a navigation window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(config.url)
}

// Open and close DevTools using shortcut
function toggleDevTools() {
  win.webContents.toggleDevTools()
}

// Create shortcut to the function toggleDevTools()
function createShortcuts() {
  globalShortcut.register("CmdOrCtrl+D", toggleDevTools)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can be used only after this event occurs.
app.whenReady().then(createWindow).then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for apps and their menu bar
  // remain active until the user explicity exits with Cmf + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
