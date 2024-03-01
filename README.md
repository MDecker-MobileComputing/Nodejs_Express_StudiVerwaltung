
| Beschreibung             | **URL-Pfad**                | `GET` | `POST` | `PUT` | `PATCH` | `DELETE` |
|--------------------------|-----------------------------| :---: | :---:  | :---: | :---:   | :---:    |
| Ressource  "Studiengang" | `/api/v1/sg/:abk`           | X     |        |       |         |          |
| Collection "Studiengang" | `/api/v1/sg/`               | X     | X      |       |         |          |
| Ressource  "Studi"       | `/api/v1/studi/:matrikelnr` | Y     |        |       |         |          |
| Collection "Studi"       | `/api/v1/studi/`            | X     |        |       |         |          |

<br>

`GET` auf Ressourcen beinhaltet auch die Volltextsuche mit URL-Parameter `q` (für "query").

<br>