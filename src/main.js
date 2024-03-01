import express from "express";
import logging from "logging";

import { datenbankInitialisieren } from "./datenbank.js";
import { middlewareLogger }        from "./middleware/allgemein.middleware.js";

await datenbankInitialisieren();


const logger = logging.default("main");

const app = express();

app.use( express.json() );
app.use( express.static("public") );
app.use( middlewareLogger );


// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`); }
  );
