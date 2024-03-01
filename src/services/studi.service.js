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

    logger.info(`Alle ${ergArray.length} Studis ausgelesen.` );

    return ergArray;
}

/**
 * Alle Funktionen als Objekt exportieren.
 */
export default { getAlle };
