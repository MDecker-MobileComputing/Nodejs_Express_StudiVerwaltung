<br>

| Beschreibung             | **URL-Pfad**                | `GET` | `POST` | `PUT` | `PATCH` | `DELETE` |
|--------------------------|-----------------------------| :---: | :---:  | :---: | :---:   | :---:    |
| Ressource  "Studiengang" | `/api/v1/sg/:abk`           | X     |        |       |         |          |
| Collection "Studiengang" | `/api/v1/sg/`               | X     | X      |       |         |          |
| Ressource  "Studi"       | `/api/v1/studi/:matrikelnr` | X     |        |       | X       | X        |
| Collection "Studi"       | `/api/v1/studi/`            | X     | X      |       |         |          |

<br>

Die Operation `GET` auf den Collections beinhaltet auch die Volltextsuche mit URL-Parameter `q` (für "query"), z.B.:
* `/api/v1/sg/?q=wirtschaft`
* `/api/v1/studi/?q=meyer`

<br>


----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

<br>

