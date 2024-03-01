import express from "express";
import logging from "logging";

import { datenbankInitialisieren } from "./datenbank.js";


await datenbankInitialisieren();


const logger = logging.default("main");

const app = express();

app.use( express.static("public") );


// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`); }
  );
