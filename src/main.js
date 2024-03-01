import express from "express";
import logging from "logging";

import { datenbankInitialisieren } from "./datenbank.js";
import { middlewareLogger }        from "./middleware/allgemein.middleware.js";

import controllerArray from "./controller/index.js";


const logger = logging.default("main");

const app = express();

await datenbankInitialisieren();

app.use( express.json() );
app.use( express.static("public") );
app.use( middlewareLogger );

// Default-Funktion zum Registrieren von Routen für
// alle Controller aufrufen
let anzahlRestEndpunkte = 0;
for (const controller of controllerArray) {
    anzahlRestEndpunkte += controller(app);
}
logger.info(`Anzahl registrierter REST-Endpunkte: ${anzahlRestEndpunkte}\n`);

// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`); }
  );
