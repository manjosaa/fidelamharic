const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDev = !!process.env.ELECTRON_START_URL

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  })

  if (isDev) {
    const url = process.env.ELECTRON_START_URL
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    // load built production files
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
