// Diese Datei enthält die Business-Logik für den Entitätstyp "Studiengang" (sg).

import logging from "logging";

import {getStudiengaengeAlle} from "../datenbank.js";

const logger = logging.default("sg-service");


/**
 * Alle Studiengänge zurückgeben.
 *
 * @returns Array mit Studiengangsobjekten; kann leer sein,
 *          aber nicht `null` oder `undefined`.
 */
function getAlle() {

    return getStudiengaengeAlle();
}


/**
 * Volltextsuche Studiengänge.
 *
 * @param {*} suchString Such-String, wird auf Kurz- und
 *                       Lang-Bezeichnung angewendet.
 *
 * @returns Array mit Studiengangsobjekten; kann leer sein,
 *          aber nicht `null` oder `undefined`.
 */
function suche(suchString) {

    const alleArray = getStudiengaengeAlle();

    if (alleArray.length === 0) {

        logger.warn("Keine Studiengänge in der Datenbank.");
        return [];
    }

    let lowerCaseSuchString = suchString.toLowerCase();

    const teilmengeArray =  alleArray.filter(
        (sg) => sg.kurz.toLowerCase().includes(lowerCaseSuchString) ||
                sg.lang.toLowerCase().includes(lowerCaseSuchString)
    );

    logger.info(`Anzahl gefundener Studiengänge für Such-String "${suchString}":`+
                teilmengeArray.length);

    return teilmengeArray;
}

/**
 * Alle Funktionen als Objekt exportieren
 */
export default { getAlle, suche };
