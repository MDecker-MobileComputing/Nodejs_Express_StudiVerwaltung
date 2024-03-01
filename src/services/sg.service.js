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

    const suchStringLowerCase = suchString.toLowerCase();

    const teilmengeArray =  alleArray.filter(
        (sg) => sg.kurz.toLowerCase().includes(suchStringLowerCase) ||
                sg.lang.toLowerCase().includes(suchStringLowerCase)
    );

    logger.info(`Anzahl gefundener Studiengänge für Such-String "${suchString}": `+
                teilmengeArray.length);

    return teilmengeArray;
}

/**
 * Studiengang anhand des Kurznamens zurückgeben.
 *
 * @param {string} kurzname Kurzname des Studiengangs, z.B. "VWL"
 *
 * @return Studiengangsobjekt oder `null`, wenn
 *         kein Studiengang mit dem Kurznamen gefunden wurde.
 */
function getByKurzname(kurzname) {

    const kurznameLowerCase = kurzname.toLowerCase();

    const alleArray = getStudiengaengeAlle();

    const filterFkt = (sg) => sg.kurz.toLowerCase() === kurznameLowerCase;

    const ergArray = alleArray.filter( filterFkt );

    if (ergArray.length === 0) {

        logger.warn(`Kein Studiengang mit Kurzname "${kurzname}" gefunden.`);
        return null;

    } else {

        logger.info(`Studiengang mit Kurzname "${kurzname}" gefunden.`);
        return ergArray[0];
    }
}

/**
 * Alle Funktionen als Objekt exportieren
 */
export default { getAlle, suche, getByKurzname };
