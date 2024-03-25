<br>

| Beschreibung             | **URL-Pfad**                | `GET` | `POST` | `PUT` | `PATCH` | `DELETE` |
|--------------------------|-----------------------------| :---: | :---:  | :---: | :---:   | :---:    |
| Ressource  "Studiengang" | `/api/v1/sg/:abk`           | X     |        |       |         |          |
| Collection "Studiengang" | `/api/v1/sg/`               | X     | X      |       |         |          |
| Ressource  "Studi"       | `/api/v1/studi/:matrikelnr` | X     |        |       | X       | X        |
| Collection "Studi"       | `/api/v1/studi/`            | X     | X      |       |         |          |

<br>

Die Operaiton `GET` auf den Collections beinhaltet auch die Volltextsuche mit URL-Parameter `q` (für "query"), z.B.:
* `/api/v1/sg/?q=medien`
* `/api/v1/studi/?q=meyer`

<br>
