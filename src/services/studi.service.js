import logging         from "logging";
import datenbankObjekt from "../datenbank.js";


const logger = logging.default("studi-service");


/**
 * Alle Studis zurückgeben.
 *
 * @returns Array mit allen Studis; kann leer sein,
 *          aber nicht `null` oder `undefined`.
 */
function getAlle() {

    const ergArray = datenbankObjekt.studiGetAlle();

    if (ergArray.length > 0) {

        logger.info(`Alle ${ergArray.length} Studis ausgelesen.` );

    } else {

        logger.warn("Keine Studis in der Datenbank.");
    }

    return ergArray;
}


/**
 * Sucht nach Studis anhand Such-String in Vor- oder Nachname.
 * Die Suche ist case-insensitive.
 *
 * @param {*} suchString Such-String, wird auf Vor- und Nachname angewendet.
 *
 * @return Array mit Studis; kann leer sein, aber nicht `null` oder `undefined`.
 */
function suche(suchString) {

    const alleArray = datenbankObjekt.studiGetAlle();

    if (alleArray.length === 0) {

        logger.warn("Keine Studis in der Datenbank.");
        return [];
    }

    const suchStringLowerCase = suchString.toLowerCase();

    const teilmengeArray =  alleArray.filter(
        (studi) => studi.vorname.toLowerCase( ).includes( suchStringLowerCase ) ||
                   studi.nachname.toLowerCase().includes( suchStringLowerCase )
    );

    logger.info(`Anzahl gefundener Studis für Such-String "${suchString}": ` +
                 teilmengeArray.length);

    return teilmengeArray;
}


/**
 * Suche nach Studi anhand Matrikelnummer.
 *
 * @param {nuber} matrikelnr Matrikelnummer (Integer).
 *
 * @returns Studi-Objekt oder `null`, wenn nicht gefunden.
 */
function getByMatrikelnr(matrikelnr) {

    const alleArray = datenbankObjekt.studiGetAlle();

    const foundStudi = alleArray.find(studi => studi.matrikelnr === matrikelnr);

    if (foundStudi) {

        logger.info(`Studi mit Matrikelnr "${matrikelnr}" gefunden: `+
                    `${foundStudi.vorname} ${foundStudi.nachname}`);
        return foundStudi;

    } else {

        logger.info(`Kein Studi mit Matrikelnr "${matrikelnr}" gefunden.`);
        return null;
    }
}


/**
 * Alle Funktionen als Objekt exportieren.
 */
export default { getAlle, suche, getByMatrikelnr };
