const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');
if (!app.requestSingleInstanceLock()) app.quit();
let win;
function create() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1100, height: 800, minWidth: 380, minHeight: 500,
    icon: path.join(__dirname, 'icons', 'icon-512.png'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile('index.html');
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  // Allow the weather "use my location" button
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb) => cb(perm === 'geolocation'));
}
app.whenReady().then(create);
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.on('window-all-closed', () => app.quit());
