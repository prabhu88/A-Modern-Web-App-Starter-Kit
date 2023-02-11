const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
let mainWindow;
function createWindow() {
    if (!isDev) {
        require(path.join(__dirname, 'build-server/server'));
    }
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });    
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function () {        
        mainWindow = null
    })
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});
app.on('activate', function () {
    if (mainWindow === null) createWindow()
});
