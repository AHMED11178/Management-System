const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true, // Enable transparency
    roundedCorners: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  mainWindow.webContents.openDevTools(); // Open DevTools for debugging
}


const { ipcMain } = require("electron");

// Simulate order events
setTimeout(() => {
  mainWindow.webContents.send('order-preparing', '101');
}, 5000);

setTimeout(() => {
  mainWindow.webContents.send('order-ready', '101');
}, 10000);

setTimeout(() => {
  mainWindow.webContents.send('order-completed', '101');
}, 15000);



app.on("ready", createWindow);
