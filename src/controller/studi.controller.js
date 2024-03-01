import logging from "logging";

import { API_PREFIX } from "./konstanten.js";

import studiService from "../services/studi.service.js";
import { CUSTOM_HEADER_ANZAHL, CUSTOM_HEADER_FEHLER } from "./konstanten.js";
import { HTTP_STATUS_CODES } from "./konstanten.js";

const logger = logging.default("studi-controller");


/**
 * Routen für einzelne REST-Endpunkte für den Entity-Typ `studi`
 * (Student/Studientin) registrieren.
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

    const entityTyp = "studi"; // "sg" für "Studiengang"

    const prefixFuerRouten = `${API_PREFIX}/${entityTyp}`;

    const routeRessource  = `${prefixFuerRouten}/:matrikelnr`;
    const routeCollection = `${prefixFuerRouten}/`;

    let anzahlRestEndpunkte = 0;

    app.get( routeRessource, getResource );
    logger.info(`Route registriert: GET ${routeRessource}`);
    anzahlRestEndpunkte++;

    app.get( routeCollection, getCollection );
    logger.info(`Route registriert: GET ${routeCollection}`);
    anzahlRestEndpunkte++;

    app.post( routeRessource, postResource );
    logger.info(`Route registriert: POST ${routeCollection}`);
    anzahlRestEndpunkte++;

    app.post( routeRessource, deleteResource );
    logger.info(`Route registriert: DELETE ${routeCollection}`);
    anzahlRestEndpunkte++;

    app.put( routeRessource, putResource );
    logger.info(`Route registriert: PUT ${routeCollection}`);
    anzahlRestEndpunkte++;

    app.put( routeRessource, patchResource );
    logger.info(`Route registriert: PATCH ${routeCollection}`);
    anzahlRestEndpunkte++;

    return anzahlRestEndpunkte;
};


// Namenskonvention für Funktionen, die HTTP-Requests verarbeiten:
// [GET|POST|PUT|...][Ressource|Collection]

/**
 * Funktion HTTP-GET-Request auf eine Ressource mit Matrikelnr
 * als Pfadparameter
 */
function getResource(req, res) {

    const matrikenrStr = req.params.matrikelnr;

    // versuche, die matrikelnummer zu parsen
    let matrikelnrInt = parseInt(matrikenrStr);

    if ( isNaN(matrikelnrInt) ) {

        logger.error(`Pfadparameterwert "${matrikenrStr}" konnte nicht nach Int geparst werden.`);
        res.setHeader(CUSTOM_HEADER_FEHLER, "Matrikelnummer muss eine Zahl sein.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }

    const ergebnisObjekt = studiService.getByMatrikelnr(matrikelnrInt);

    if(ergebnisObjekt) {

        res.status( HTTP_STATUS_CODES.OK_200 );
        res.json( ergebnisObjekt );

    } else {

        res.status( HTTP_STATUS_CODES.NOT_FOUND_404 );
        res.json( {} );
    }
}

/**
 * Funktion für GET-Request auf Studi-Collection.
 * Kann Such-Parameter `q` auswerten.
 */
function getCollection(req, res) {

    let ergebnisArray = null;

    const suchString = req.query.q;
    if (suchString) {

        ergebnisArray = studiService.suche(suchString);

    } else {

        ergebnisArray = studiService.getAlle();
    }

    const anzahl = ergebnisArray.length;

    res.setHeader(CUSTOM_HEADER_ANZAHL, anzahl);

    if (anzahl === 0) {

        res.status(HTTP_STATUS_CODES.NOT_FOUND_404);
        res.json( [] );

    } else {

        res.status( HTTP_STATUS_CODES.OK_200 );
        res.json( ergebnisArray );
    }
}


function postResource(req, res) {
}

function deleteResource(req, res) {
}

function putResource(req, res) {
}

function patchResource(req, res) {
}
