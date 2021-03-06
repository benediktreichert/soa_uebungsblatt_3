# Übungsblatt 3
Lesen Sie zunächst dieses Übungsblatt einmal komplett, bevor Sie mit der Bearbeitung der Aufgaben beginnen.

Sollten Sie Fehler finden oder haben Verbesserungsvorschläge, stellen Sie gerne einen [Pull Request](https://guides.github.com/activities/forking/) und tragen zur Qualität dieses Übungsblattes bei.

In diesem Übungsblatt verwenden Sie den Schulungsunterlagen-Service aus Übungsblatt 2, erstellen zudem einen Kundendatenbank-Service sowie einen Bestellungs-Service. Der Bestellungs-Service verwaltet Kundenbestellungen und nutzt als Datengrundlage den Schulungs- sowie den Kundendatenbank-Service. Sie integrieren die drei Services mit einem ESB (Enterprise-Service-Bus) und entwickeln eine sinnvolle Service-Architektur. Die folgenden Aufgaben helfen Ihnen bei der Umsetzung und Entscheidungsfindung:

## Mögliche Lösung: Schulungsunterlagen-Service
Diesen Service haben Sie bereits in Übungsblatt 2 umgesetzt. Eine mögliche Architektur des Service:

### Endpoints
`GET` `/unterlagen` Listet alle `Unterlage`n auf.

`GET` `/unterlagen/:ID` Gibt die `Unterlage` `ID` zurück.

`POST` `/unterlagen` Erstellt eine `Unterlage`. Die `ID` wird bei erfolgreicher Erstellung im HTTP Body zurückgegeben.

`PATCH` `/unterlagen/:ID` Aktualisiert die `Unterlage` mit entsprechender `ID`.

`DELETE` `/unterlagen/:ID` Löscht `Unterlage` mit `ID`.

Eine `Unterlage` könnte wie folgt definiert sein:

### Unterlage
```
{
  ID: String,
  name: String,
  fachgebiet: String,
  beschreibung: String,
  preis: Number,
  multimediaKomponente: Bool
}
```
Schriftliche Unterlagen und Multimedia-Unterlagen wurden zu einem Objekt zusammengefasst und werden durch den key `multimediakomponente` unterschieden: `false`, falls die Unterlage schriftlich ist und `true` falls multimedial.

### Lektion
Eine `Lektion` ist ein Paket aus verschiedenen Unterlagen und kann daher einfach als JSON Array von `Unterlage`n modelliert werden.
```
{
  ID: String,
  name: String,
  fachgebiet: String,
  beschreibung: String,
  preis: Number,
  unterlagen: [Unterlage]
}
```

### Implementierung
[Spark](http://sparkjava.com) als HTTP/REST Framework sowie einer Datenbank Ihrer Wahl. Bei der Wahl der Datenbank helfen Ihnen folgende Fragen:

### Fragen
Sie müssen diese Fragen nicht schriftlich beantworten. Sie werden Ihnen aber bei Ihrer Lösungsfindung und Implementierung helfen:

1. Schriftliche- und Multimedia-Unterlagen können als voneinander unabhängige Entitäten definiert werden, anstatt diese wie im Lösungsbeispiel in einem Objekt zusammenzuführen und über einen zusätzlichen Schlüssel unterscheidbar zu machen. Welche Vorteile hätte dieser Ansatz? Sehen Sie Nachteile bei diesem Ansatz, wenn ja, welche?
2. Erläutern Sie Vor- und Nachteile bei der Verwendung von XML anstatt JSON
![JSON Meme](http://s2.quickmeme.com/img/37/378dc176eed7cbd89f077b3d3b065f4ac6ea9815dad3fbf71cfa94a9c92d5e93.jpg)
3. Welche Datenbank ist für diesen Service sinnvoll? Wägen Sie aufgrund des Datenmodells kritisch die Verwendung einer relationalen Datenbank (z.B. [`mySQL`](https://en.wikipedia.org/wiki/MySQL)), einer dokumentbasierten Datenbank (z.B. [`MongoDB`](https://en.wikipedia.org/wiki/MongoDB)) und einer Graph-Datenbank (z.B. [`Neo4j`](https://en.wikipedia.org/wiki/Neo4j)) gegeneinander ab und entscheiden sich für eine.
4. Wägen Sie den Nutzen und die Risiken hinsichtlich der Implementierung gegen die verschiedenen Datenbanken ab. Sie müssen kein Datenbankexperte werden, entscheiden Sie nach ein wenig Recherche und einem gewissen Grundverständnis.
5. Nachdem Sie den Service implementiert haben, machen Sie sich Gedanken wie dieser skaliert. Was passiert, wenn 1 Request pro Sekunde den Service beansprucht? Wie könnte sich bei Ihrer Implementierung und der verwendeten Datenbank der Service verhalten, wenn 1000 Requests pro Sekunde kommen? 10 000? 100 000? 1 000 000?
6. Definieren Sie Anforderungen an den key `ID`. Wie muss `ID` beschaffen sein und was müssen Sie bei der Implementierung beachten hinsichtlich Eindeutigkeit und im Zusammenspiel mit einer Datenbank? Welche Datenbanken nehmen Ihnen hier gar etwas Arbeit ab?
7. Bei der Erstellung einer Unterlage stehen Ihnen verschiedene Möglichkeiten zur Verfügung die Daten im `POST` Request zu übermitteln. Welche Möglichkeiten stellt Ihnen HTTP hier zur Verfügung (JSON im Request Body, Query Parameter, `x-www-form-urlencoded`, etc.). Welche sind sinnvoll, welche nicht? Wie erleichtert Ihnen `Spark` den Umgang mit den verschiedenen Möglichkeiten?

## Kundendatenbank Service
Schreiben Sie einen Service, der die Grundfunktionalität einer Kundendatenbank abbildet, analog zum Schulungsunterlagen-Service:
### Endpoints
Entwerfen Sie die Endpoints. Eine mögliche Lösung wird in Übungsblatt 4 veröffentlicht.
### Datenmodell: Kunde
```
{
  ID: String,
  name: String,
  adresse: String
}
```

1. Ist das obige Modell sinnvoll? 
2. Ein Name in Deutschland besteht meist aus Vor- und Nachname, sollten Sie dazu das obige Modell abändern?
3. Gilt gleiches für die Adresse?
4. Recherchieren Sie, ob zu dieser Problematik best practices existieren.

Zur Implementierung genügt obiges Modell völlig. Nutzen Sie Ihr Schulungsunterlagen-Service als Gerüst um den Kundendatenbank-Service möglichst schnell und einfach zu implementieren. Die Fragen dienen nur als Anregung.

### Datenbank
Machen Sie sich auch hier Gedanken über das Datenmodell und die verwendete Datenbank.

## Bestellungs-Service
Der Bestellungs-Service bedient Sich aus den beiden anderen Services und verwaltet Bestellungen. Entwerfen und implementieren Sie einen Bestellungs-Service analog zu den beiden anderen:
### Datenmodell
Ein Bestellungsmodell könnte wie folgt aussehen:
```
{
  ID: String,
  bestellDatum: String, // Hinweis: http://stackoverflow.com/a/15952652/6394818
  bezahlt: Bool
  kunde: Kunde,
  artikel: [Unterlage]
}
```
Eine konkrete Bestellung:
```
{
  ID: "af8b10c8cyi23urbjcosfig90r80y1grm",
  bestellDatum: "2012-04-23T18:25:43.511Z",
  bezahlt: true,
  kunde:
    {
      id: "ihfiuwgfeigfw6517653ifg",
      name: "Hans Jürgen Krabowski",
      adresse: "Im Finsterwald 5, 73727 Unna an der Wuppe"
    },
  artikel: [
    {
      name: "Hansen und Co",
      fachgebiet: "Informatik",
      beschreibung: "Aufsatz der Gleichheit",
      preis: 1.98,
      ID: "uf96vt2863tglfhfo13798yfhf",
      multimediaomponente: true
    },
    {
      name: "Gauss die zweite",
      fachgebiet: "Geologie",
      beschreibung: "Neuwerk der Moderne",
      preis: 32.799
      ID: "753vdjy4dhlfirhhhfjfu3",
      multimediaomponente: false
    }
  ]
}
```
### Architektur
Implementieren Sie zunächst den Service so, dass dieser die benötigten Daten direkt vom Unterlagen- sowie Kunden-Service bezieht.

### Fragen
1. Ihre Kommilitonen haben die Services vielleicht anders implementiert und die Datenmodelle weichen von Ihren ab. Sie möchten nun die Services Ihrer Kommilitonen verwenden und diese kommunizieren lassen. Wie könnten Sie dies erreichen und welche Lösungen existieren dafür am Markt (beispielsweise Enterprise Service Bus)?
2. Wie hätte vermieden werden können, dass unterschiedliche Lösungen für die einzelnen Services existieren?
3. Sie haben sich vielleicht Gedanken gemacht, ob die Services nicht einfach eine Datenbank teilen sollten. Welche Vor- und Nachteile hätte dies? Welche Vor- und Nachteile hätte dies insbesondere bei steigender Last?
4. Aus der Vorlesung `Distributed Systems` sind Ihnen Vor- und besonders auch Nachteile verteilter Systeme bekannt. Sie entscheiden Sich für eine Architektur, in welcher jeder Service seine eigene Datenbank erhält. Auf welches Problem stoßen Sie insbesondere in Bezug auf Integrität Ihrer Daten und welche Trade-Offs würden Sie verantworten.

## Enterprise Service Bus
Implementieren Sie nun alle Services gegen einen *Enterprise Service Bus*. Schauen Sie sich beispielsweise den [WSO2](https://docs.wso2.com/display/ESB500/About+WSO2+ESB) ESB an, welcher kostenlos und Open Source ist.

Machen Sie sich mit diesem vertraut und verstehen dessen Funktionsweise und den Nutzen eines ESB. Das [Einführungskapitel](https://docs.wso2.com/display/ESB500/About+WSO2+ESB) ermöglicht einen guten Einstieg.
Diskutieren Sie Vor- und Nachteile, Ihre Services direkt miteinander, oder über den ESB kommunizieren zu lassen.

## Hilfe
- [Patrick Petrovic: Web APIs](https://media.ccc.de/v/gpn16-7605-web_api_hacks_mit_der_jodel-app) - Eine kurze Wiederholung (Video) von HTTP, APIs und JSON. ~20 Minuten.
