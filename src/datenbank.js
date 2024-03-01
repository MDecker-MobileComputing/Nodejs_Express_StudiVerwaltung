import { JSONFilePreset } from 'lowdb/node';
import logging from "logging";


const logger = logging.default("datenbank");

const dbDateiName = "db.json"; // diese Datei in .gitignore und Ingore-Liste für nodemon aufnehmen


const anfangsDaten =  {
    "studiengaenge": [
       {
        "kurz": "BWL",
        "lang": "Betriebswirtschaftslehre"
       },{
        "kurz": "WING",
        "lang": "Wirtschaftsingenieurwesen"
       },{
        "kurz": "WINF",
        "lang": "Wirtschaftsinformatik"
       },{
        "kurz": "INFO",
        "lang": "Informatik"
       },{
        "kurz": "IWMM",
        "lang": "Irgendwas mit Medien"
       },{
        "kurz": "VWL",
        "lang": "Volkswirtschaftslehre"
       },{
        "kurz": "BW",
        "lang": "Brauereiwesen"
       },{
        "kurz": "WBÖ",
        "lang": "Weinbau und Önologie"
       },{
        "kurz": "LUD",
        "lang": "Ludologie"
       }
    ],

    "studis": [
        {
            "matrikelnr": 123456,
            "vorname": "Hans",
            "nachname": "Wiwi",
            "studiengang": "BWL"
        },{
            "matrikelnr": 234567,
            "vorname": "Nina",
            "nachname": "Info",
            "studiengang": "INFO"
        }
    ]
};


/* Objekt für Zugriff auf Datenbank. */
let datenbank = null;

/**
 * Initialisiert die Datenbank. Wenn die Datenbank-Datei nicht existiert,
 * wird sie mit den Anfangsdaten initialisiert.
 */
export async function initialisieren() {

    datenbank = await JSONFilePreset( dbDateiName, anfangsDaten );

    await datenbank.write();

    logger.info(`Datenbank mit Datei "${dbDateiName}" initialisiert.` );
    logger.info(`Anzahl Studiengänge: ${datenbank.data.studiengaenge.length}`);
    logger.info(`Anzahl Studierende : ${datenbank.data.studis.length}`       );
}


// Namenskonvention: Alle Funktionen für den Zugriff auf die Datenbank
//                   müssen mit dem Namen des Entitätstyps beginnen,
//                   also entweder "studiengang..." oder "studi...".


/**
 * Alle Studiengänge von Datenbank holen.
 *
 * @returns Array mit allen Studiengängen;
 *          wird nicht `null` oder `undefined` sein;
 *          alphabetisch sortiert nach `kurz`.
 */
export function studiengangGetAlle() {

    if (datenbank.data && datenbank.data.studiengaenge) {

        return datenbank.data.studiengaenge.sort((a, b) => a.kurz.localeCompare(b.kurz));

    } else {

        return [];
    }
}


/**
 * Neuen Studiengang anlegen. Es muss sichergestellt sein,
 * dass es nur keinen Studiengang mit dem gleichen Kurznamen
 * gibt!
 *
 * @param {*} sgObjekt Objekt mit neuem Studiengang, muss
 *            die Attribute `kurz` und `lang` enthalten.
 */
export async function studiengangNeu(sgObjekt) {

    datenbank.data.studiengaenge.push(sgObjekt)
    await datenbank.write();
}


/**
 * Alle Funktionen mit Default-Objekt exportieren.
 */
export default {
    initialisieren,
    studiengangGetAlle,
    studiengangNeu
 };