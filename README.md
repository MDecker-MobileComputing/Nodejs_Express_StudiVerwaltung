
| Beschreibung             | **URL-Pfad**                | `GET` | `POST` | `PUT` | `PATCH` | `DELETE` |
|--------------------------|-----------------------------| :---: | :---:  | :---: | :---:   | :---:    |
| Ressource  "Studiengang" | `/api/v1/sgang/:abk`        | X     |        |       |         |          |
| Collection "Studiengang" | `/api/v1/sgang/`            | X     |        |       |         |          |
| Ressource  "Studi"       | `/api/v1/studi/:matrikelnr` | X     | X      | X     | X       | X        |
| Collection "Studi"       | `/api/v1/studi/`            | X     |        |       |         |          |

<br>

`GET` auf Ressourcen beinhaltet auch die Volltextsuche mit URL-Parameter `query`.

<br>