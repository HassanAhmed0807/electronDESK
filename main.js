// const { app, BrowserWindow, ipcMain, globalShortcut, Menu } = require('electron');

// let mainWindow;

// function createWindow() {
//     // Create the main window
//     mainWindow = new BrowserWindow({
//         width: 1200,
//         height: 800,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//             preload: null, // Adjust the preload script path if needed
//         }
//     });

//     // Load the webpage directly (replace with the URL you want)
//     mainWindow.loadURL('https://www.dat.com/login');  // Replace with your URL

//     // Hide the menu bar (File, View, Edit, etc.)
//     mainWindow.setMenu(null);

//     // Handle window close event
//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });

//     // Add custom navigation functionality via IPC (Inter-Process Communication)
//     ipcMain.on('navigate-forward', () => {
//         mainWindow.webContents.goForward();
//     });

//     ipcMain.on('navigate-back', () => {
//         mainWindow.webContents.goBack();
//     });

//     ipcMain.on('reload-page', () => {
//         mainWindow.webContents.reload();
//     });
// }

// // Add keyboard shortcuts for navigation (back, forward, reload)
// app.whenReady().then(() => {
//     // Register global keyboard shortcuts for navigation
//     globalShortcut.register('Alt+Left', () => {
//         mainWindow.webContents.goBack();  // Navigate back
//     });

//     globalShortcut.register('Alt+Right', () => {
//         mainWindow.webContents.goForward();  // Navigate forward
//     });

//     globalShortcut.register('Ctrl+R', () => {
//         mainWindow.webContents.reload();  // Reload the page
//     });
// });

// // Ensure the app quits when all windows are closed
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });

// // Unregister all global shortcuts when the app quits
// app.on('will-quit', () => {
//     globalShortcut.unregisterAll();
// });

// app.on('ready', createWindow);




const { app, BrowserWindow, session , ipcMain} = require('electron');

let mainWindow;

app.on('ready', () => {
    // Disable SSL verification for localhost or any server with a self-signed certificate
    session.defaultSession.setSSLConfig({
        rejectUnauthorized: false  // Bypass SSL certificate errors
    });

    // Create the window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Adjust for security
        }
    });

    // Load the login page (index.html)
    mainWindow.loadFile('index.html');  // Ensure the file is in the correct path

    // Remove the menu bar (ribbon with File, Edit, View, etc.)
    mainWindow.setMenu(null);

        

    // Add custom navigation functionality
    // Forward button
    ipcMain.on('navigate-forward', () => {
        mainWindow.webContents.goForward();
    });

    // Backward button
    ipcMain.on('navigate-back', () => {
        mainWindow.webContents.goBack();
    });

    // Reload button
    ipcMain.on('reload-page', () => {
        mainWindow.webContents.reload();
    });

    // Handle window close event
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
