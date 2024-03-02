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

    app.post( routeCollection, postCollection );
    logger.info(`Route registriert: POST ${routeCollection}`);
    anzahlRestEndpunkte++;

    app.delete( routeRessource, deleteResource );
    logger.info(`Route registriert: DELETE ${routeRessource}`);
    anzahlRestEndpunkte++;

    /*
    app.put( routeCollection, putResource );
    logger.info(`Route registriert: PUT ${routeCollection}`);
    anzahlRestEndpunkte++;

    app.patch( routeCollection, patchResource );
    logger.info(`Route registriert: PATCH ${routeCollection}`);
    anzahlRestEndpunkte++;
    */

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

/**
 * Neuen Studi anlegen.
 */
async function postCollection(req, res) {

    const matrikelnr  = req.body.matrikelnr;
    const vorname     = req.body.vorname;
    const nachname    = req.body.nachname;
    const studiengang = req.body.studiengang;

    if (matrikelnr === undefined) {

        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'matrikelnr' fehlt.");
        res.status( HTTP_STATUS_CODES.BAD_REQUEST_400 );
        res.json( {} );
        return;
    }

    if (vorname === undefined || vorname.trim() === "" ) {

        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'vorname' fehlt oder ist leer");
        res.status( HTTP_STATUS_CODES.BAD_REQUEST_400 );
        res.json( {} );
        return;
    }

    if (nachname === undefined || nachname.trim() === "" ) {

        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'nachname' fehlt oder ist leer");
        res.status( HTTP_STATUS_CODES.BAD_REQUEST_400 );
        res.json( {} );
        return;
    }

    if (studiengang === undefined || studiengang.trim() === "" ) {

        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'studiengang' fehlt oder ist leer");
        res.status( HTTP_STATUS_CODES.BAD_REQUEST_400 );
        res.json( {} );
        return;
    }

    // In neues Objekt umwandeln, damit evtl. überflüssige Attribute
    // entfernt werden; außerdem werden die Werte normalisiert.
    const neuerStudi = {

        matrikelnr : matrikelnr,
        vorname    : vorname.trim(),
        nachname   : nachname.trim(),
        studiengang: studiengang.trim().toUpperCase()
    };

    const fehlerMeldung = await studiService.neu(neuerStudi);

    if (fehlerMeldung === "") {

        res.status( HTTP_STATUS_CODES.CREATED_201 );
        res.json( neuerStudi );

    } else {

        res.setHeader(CUSTOM_HEADER_FEHLER, fehlerMeldung);
        res.status( HTTP_STATUS_CODES.BAD_REQUEST_400 );
        res.json( {} );
    }
}


/**
 * Funktion für HTTP-DELETE zu Studi-Ressource, also um Studi zu löschen.
 */
async function deleteResource(req, res) {

    const matrikenrStr = req.params.matrikelnr;

    // versuche, die matrikelnummer zu parsen
    let matrikelnrInt = parseInt(matrikenrStr);

    if ( isNaN(matrikelnrInt) ) {

        logger.error(`Pfadparameterwert "${matrikenrStr}" konnte nicht nach Int geparst werden.`);
        res.setHeader(CUSTOM_HEADER_FEHLER, "Matrikelnummer muss eine ganze Zahl (Integer) sein.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json( {} );
        return;
    }

    const erfolgreich = await studiService.loeschen(matrikelnrInt);

    if (erfolgreich) {

        res.status( HTTP_STATUS_CODES.NO_CONTENT_204 );
        res.json( {} );

    } else {

        res.setHeader(CUSTOM_HEADER_FEHLER,
                      `Löschen fehlgeschlagen, kein Studi mit dieser Matrikelnummer ${matrikelnrInt} gefunden.`);
        res.status( HTTP_STATUS_CODES.NOT_FOUND_404 );
        res.json( {} );
    }
}


function putResource(req, res) {
}


function patchResource(req, res) {
}
