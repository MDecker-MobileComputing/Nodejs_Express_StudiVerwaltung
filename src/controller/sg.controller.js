import logging from "logging";

import { API_PREFIX,
         HTTP_STATUS_CODE_200_OK,
         HTTP_STATUS_CODE_404_NOT_FOUND,
         CUSTOM_HEADER_ANZAHL } from "./konstanten.js";

import sgService from "../services/sg.service.js";

const logger = logging.default("sg-controller");


/**
 * Routen für einzelne REST-Endpunkte für den Entity-Typ `sg`
 * (Studiengang) registrieren.
 *
 * Diese Funktion ist der Default-Export des Moduls, weil es
 * sich hierbei um die einzige Methode handelt, die von außen
 * aufgerufen werden soll.
 *
 * @param {*} Express-App-Objekt
 *
 * @return {number} Anzahl der registrierten REST-Endpunkte
 */
export default function routenRegistrieren(app) {

    const entityTyp = "sg"; // "sg" für "Studiengang"

    const prefixFuerRouten = `${API_PREFIX}/${entityTyp}`;

    const routeRessource  = `${prefixFuerRouten}/:abk`;
    const routeCollection = `${prefixFuerRouten}/`;

    let anzahlRestEndpunkte = 0;

    app.get( routeRessource, getResource );
    logger.info(`Route registriert: GET ${routeRessource}`);
    anzahlRestEndpunkte++;

    app.get( routeCollection, getCollection );
    logger.info(`Route registriert: GET ${routeCollection}`);
    anzahlRestEndpunkte++;

    return anzahlRestEndpunkte;
};


// Namenskonvention für Funktionen, die HTTP-Requests verarbeiten:
// [GET|POST|PUT|...][Ressource|Collection]

function getResource(req, res) {
}

/**
 * Funktion für HTTP-GET-Request auf die Collection
 * (Suche alle alle Studiengänge).
 */
function getCollection(req, res) {

    let ergebnisArray = null;

    const suchString = req.query.q;
    if (suchString) {

        ergebnisArray = sgService.suche(suchString);

    } else {

        ergebnisArray = sgService.getAlle();
    }

    const anzahl = ergebnisArray.length;

    res.setHeader(CUSTOM_HEADER_ANZAHL, anzahl);

    if (anzahl === 0) {

            res.status(HTTP_STATUS_CODE_404_NOT_FOUND);
            res.json( [] );

    } else {

            res.status( HTTP_STATUS_CODE_200_OK );
            res.json( ergebnisArray );
    }
}

