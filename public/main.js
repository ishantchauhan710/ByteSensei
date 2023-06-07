const { app, ipcMain, dialog, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000");
  //win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("openDirectoryPicker", (event, args) => {
  dialog.showOpenDialog({ properties: ["openFile"] }).then(function (response) {
    if (!response.canceled) {
      // handle fully qualified file name
      console.log(response.filePaths[0]);
    } else {
      console.log("no file selected");
    }
  });
});
