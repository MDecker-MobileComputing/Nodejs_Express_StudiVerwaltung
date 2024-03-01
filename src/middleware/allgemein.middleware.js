import logging from "logging";

const logger = logging.default("http-anfrage");


/**
 * Diese Middleware-Funktion schreibt für jeden HTTP-Request eine Zeile
 * mit HTTP-Verb (z.B. `GET` oder `POST`) und Pfad (z.B. `/api/v1/...`
 * auf den Logger `request`.
 * <br><br>
 *
 * Beispiel-Zeile:
 * ```
 * POST /api/v1/studi/234567
 * GET  /api/v1/studi/123456
 * ```
 *
 * @param {*} req Request-Objekt, aus dem HTTP-Verb und Pfad gelesen werden
 *
 * @param {*} res Response-Objekt (wird nicht verwendet)
 *
 * @param {*} next Funktion, um nächste Middleware-Funktion aufzurufen
 */
export function middlewareLogger(req, res, next) {

    logger.info(`${req.method} ${req.originalUrl}`);

    next();
};