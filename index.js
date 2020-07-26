//modulos del sistama
const electron = require("electron");
const url = require("url");
const pugg = require("electron-pug");

//funcionalidades
const { app, BrowserWindow, Menu } = electron;
Menu.setApplicationMenu(null);

//recursos locales
let mainWindow;
const locals = {};


//Desarrollador
require("electron-reload")(__dirname);

// al iniciar
app.on("ready", async () => {

  try {//definiendo pug como motor de plantillas
    let pug = await pugg({ pretty: true }, locals);
    pug.on("error", (err) => console.log("electron-pug error", err));
  } catch (err) { console.log("electron pug error catch", err); }

  mainWindow = new BrowserWindow({// configuración de ventana principal
    minWidth: 1170,
    minHeight: 650,
    width: 1200,
    height: 680,
    icon: __dirname + "/assets/images/Avatar2.png"
  });
  //mainWindow.webContents.openDevTools();
  // Renderizar vista
  mainWindow.loadURL(url.format({ pathname: `file://${__dirname}/screens/login/Login.pug` }));

});

//al cerrar
app.on('closed', () => { app = null; });
