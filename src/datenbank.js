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
let db = null;

export async function datenbankInitialisieren() {

    db = await JSONFilePreset( dbDateiName, anfangsDaten );

    await db.write();

    logger.info(`Datenbank mit Datei "${dbDateiName}" initialisiert.` );
    logger.info(`Anzahl Studiengänge: ${db.data.studiengaenge.length}`);
    logger.info(`Anzahl Studierende : ${db.data.studis.length}`       );
}








