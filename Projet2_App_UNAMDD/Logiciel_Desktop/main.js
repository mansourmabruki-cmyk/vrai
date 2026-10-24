const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    title: 'UNAMDD Mining Sarl – Bureau technique',
    icon: path.join(__dirname, 'app', 'assets', 'icon512.png'),
    backgroundColor: '#0b245a',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Ouvrir les liens externes (OpenStreetMap, etc.) dans le navigateur par défaut.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
}

// Menu minimal (Fichier / Édition / Affichage) en français.
function buildMenu () {
  const template = [
    { label: 'Fichier', submenu: [ { role: 'quit', label: 'Quitter' } ] },
    { label: 'Édition', submenu: [
      { role: 'undo', label: 'Annuler' }, { role: 'redo', label: 'Rétablir' },
      { type: 'separator' },
      { role: 'cut', label: 'Couper' }, { role: 'copy', label: 'Copier' }, { role: 'paste', label: 'Coller' }
    ] },
    { label: 'Affichage', submenu: [
      { role: 'reload', label: 'Recharger' },
      { role: 'resetZoom', label: 'Zoom normal' }, { role: 'zoomIn', label: 'Zoom +' }, { role: 'zoomOut', label: 'Zoom -' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'Plein écran' }
    ] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
