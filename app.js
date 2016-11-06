const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
