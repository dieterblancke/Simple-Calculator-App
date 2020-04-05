const {app, BrowserWindow} = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 600,

        // Setting icon location
        icon: __dirname + '/media/favicon.jpg',

        // Disabling resizing of our calculator window
        resizable: false,
        maximizable: false,
        fullscreenable: false,
    });

    // Loads the file index.html into the window.
    mainWindow.loadFile('index.html');

    // Removes the ElectronJS menu
    mainWindow.setMenu(null);
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});