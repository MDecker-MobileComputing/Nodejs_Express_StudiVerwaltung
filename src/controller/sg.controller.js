import logging from "logging";

import { API_PREFIX } from "./konstanten.js";

const logger = logging.default("sgang-controller");

/**
 * Routen für einzelne REST-Endpunkte für den Entity-Typ `sg`
 * (Studiengang) registrieren.
 *
 * @param {*} Express-App-Objekt
 */
export default function routenRegistrieren(app) {

    const entityTyp = "sg"; // "sg" für "Studiengang"

    const prefixFuerRouten = `${API_PREFIX}/${entityTyp}`;

    const routeRessource  = `${prefixFuerRouten}/${entityTyp}/:abk`;
    const routeCollection = `${prefixFuerRouten}/${entityTyp}/`;

    app.get( routeRessource, getResource );
    logger.info(`Route registriert: GET ${routeRessource}`);

    app.get( routeCollection, getCollection );
    logger.info(`Route registriert: GET ${routeCollection}`);
};

// Namenskonvention für Funktionen, die HTTP-Requests verarbeiten:
// [GET|POST|PUT|...][Ressource|Collection]

function getResource(req, res) {
}


function getCollection(req, res) {
}

