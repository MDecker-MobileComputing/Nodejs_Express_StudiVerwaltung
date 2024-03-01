import logging from "logging";

import { API_PREFIX, HTTP_STATUS_CODE_200_OK } from "./konstanten.js";

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


function getCollection(req, res) {

    const suchString = req.query.q;

    if (suchString) {

    } else {

        const alleArray = sgService.getAlle();

        res.status(HTTP_STATUS_CODE_200_OK);
        res.json( alleArray );
    }
}

