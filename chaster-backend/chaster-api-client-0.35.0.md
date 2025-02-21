# 📚 Chaster Extensions API - Entwicklerdokumentation

Diese Dokumentation beschreibt alle Endpunkte der **Chaster Extensions API** und zeigt, wie du sie mit **NestJS** und dem generierten API-Client nutzen kannst.

## ✨ Voraussetzungen
Bevor du die API nutzt, stelle sicher, dass:
- ✅ Dein **NestJS-Backend** eingerichtet ist.
- ✅ Der **API-Client fu00fcr Chaster** generiert und installiert wurde.
- ✅ Dein **Developer-Token** in der `.env`-Datei gespeichert ist (`CHASTER_API_TOKEN`).

---

## 🔹 1. Alle Erweiterungen abrufen (`GET /api/extensions`)
### 📌 Beschreibung
Ruft eine Liste aller registrierten Erweiterungen ab.

### 📂 Codebeispiel (NestJS)
```ts
async getAllExtensions() {
  try {
    const response = await this.api.extensionsControllerGetAllExtensions();
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Erweiterungen: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions"
```

---

## 🔹 2. Erweiterung erstellen (`POST /api/extensions`)
### 📌 Beschreibung
Erstellt eine neue Erweiterung mit den angegebenen Parametern.

### 📂 Codebeispiel (NestJS)
```ts
async createExtension(extensionData: any) {
  try {
    const response = await this.api.extensionsControllerCreateExtension(extensionData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Erstellen der Erweiterung: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "name": "Meine Erweiterung",
  "description": "Eine Beschreibung meiner Erweiterung",
  "version": "1.0.0"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions" -H "Content-Type: application/json" -d @extension.json
```

---

## 🔹 3. Erweiterung abrufen (`GET /api/extensions/{extensionId}`)
### 📌 Beschreibung
Holt die Details einer bestimmten Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async getExtensionById(extensionId: string) {
  try {
    const response = await this.api.extensionsControllerGetExtensionById(extensionId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Erweiterung: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions/12345"
```

---

## 🔹 4. Erweiterung aktualisieren (`PATCH /api/extensions/{extensionId}`)
### 📌 Beschreibung
Aktualisiert die Eigenschaften einer bestimmten Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async updateExtension(extensionId: string, updateData: any) {
  try {
    const response = await this.api.extensionsControllerUpdateExtension(extensionId, updateData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Aktualisieren der Erweiterung: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "description": "Aktualisierte Beschreibung",
  "version": "1.0.1"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X PATCH "http://localhost:3000/chaster/extensions/12345" -H "Content-Type: application/json" -d @update.json
```

---

## 🔹 5. Erweiterung löschen (`DELETE /api/extensions/{extensionId}`)
### 📌 Beschreibung
Löscht eine spezifische Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async deleteExtension(extensionId: string) {
  try {
    await this.api.extensionsControllerDeleteExtension(extensionId);
    return { message: "Erweiterung erfolgreich gelöscht" };
  } catch (error) {
    throw new Error(`Fehler beim Löschen der Erweiterung: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X DELETE "http://localhost:3000/chaster/extensions/12345"
```

---

## 🔹 6. Alle Versionen einer Erweiterung abrufen (`GET /api/extensions/{extensionId}/versions`)
### 📌 Beschreibung
Listet alle Versionen einer bestimmten Erweiterung auf.

### 📂 Codebeispiel (NestJS)
```ts
async getAllVersions(extensionId: string) {
  try {
    const response = await this.api.extensionsControllerGetAllVersions(extensionId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Versionen: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions/12345/versions"
```

---

## 🔹 7. Neue Version erstellen (`POST /api/extensions/{extensionId}/versions`)
### 📌 Beschreibung
Erstellt eine neue Version einer Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async createVersion(extensionId: string, versionData: any) {
  try {
    const response = await this.api.extensionsControllerCreateVersion(extensionId, versionData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Erstellen der Version: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "version": "1.1.0",
  "changes": "Neue Funktionen hinzugefügt"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/12345/versions" -H "Content-Type: application/json" -d @version.json
```

---

## 🔹 8. Version abrufen (`GET /api/extensions/{extensionId}/versions/{versionId}`)
### 📌 Beschreibung
Holt die Details einer bestimmten Version einer Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async getVersionById(extensionId: string, versionId: string) {
  try {
    const response = await this.api.extensionsControllerGetVersionById(extensionId, versionId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Version: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions/12345/versions/1"
```

---

## 🔹 9. Version aktualisieren (`PATCH /api/extensions/{extensionId}/versions/{versionId}`)
### 📌 Beschreibung
Aktualisiert eine bestehende Version einer Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async updateVersion(extensionId: string, versionId: string, updateData: any) {
  try {
    const response = await this.api.extensionsControllerUpdateVersion(extensionId, versionId, updateData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Aktualisieren der Version: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "changes": "Bugfixes und Optimierungen"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X PATCH "http://localhost:3000/chaster/extensions/12345/versions/1" -H "Content-Type: application/json" -d @update.json
```

---

## 🔹 10. Version löschen (`DELETE /api/extensions/{extensionId}/versions/{versionId}`)
### 📌 Beschreibung
Löscht eine bestimmte Version einer Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async deleteVersion(extensionId: string, versionId: string) {
  try {
    await this.api.extensionsControllerDeleteVersion(extensionId, versionId);
    return { message: "Version erfolgreich gelöscht" };
  } catch (error) {
    throw new Error(`Fehler beim Löschen der Version: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X DELETE "http://localhost:3000/chaster/extensions/12345/versions/1"
```

---

## 🔹 11. Alle Webhooks einer Erweiterung abrufen (`GET /api/extensions/{extensionId}/webhooks`)
### 📌 Beschreibung
Listet alle registrierten Webhooks einer bestimmten Erweiterung auf.

### 📂 Codebeispiel (NestJS)
```ts
async getAllWebhooks(extensionId: string) {
  try {
    const response = await this.api.extensionsControllerGetAllWebhooks(extensionId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Webhooks: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions/12345/webhooks"
```

---

## 🔹 12. Webhook erstellen (`POST /api/extensions/{extensionId}/webhooks`)
### 📌 Beschreibung
Erstellt einen neuen Webhook für eine Erweiterung.

### 📂 Codebeispiel (NestJS)
```ts
async createWebhook(extensionId: string, webhookData: any) {
  try {
    const response = await this.api.extensionsControllerCreateWebhook(extensionId, webhookData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Erstellen des Webhooks: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "url": "https://mein-webhook-url.com",
  "events": ["session_created", "session_updated"]
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/12345/webhooks" -H "Content-Type: application/json" -d @webhook.json
```

---

## 🔹 13. Webhook abrufen (`GET /api/extensions/{extensionId}/webhooks/{webhookId}`)
### 📌 Beschreibung
Holt die Details eines spezifischen Webhooks.

### 📂 Codebeispiel (NestJS)
```ts
async getWebhookById(extensionId: string, webhookId: string) {
  try {
    const response = await this.api.extensionsControllerGetWebhookById(extensionId, webhookId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen des Webhooks: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions/12345/webhooks/1"
```

---

## 🔹 14. Webhook aktualisieren (`PATCH /api/extensions/{extensionId}/webhooks/{webhookId}`)
### 📌 Beschreibung
Aktualisiert einen bestehenden Webhook.

### 📂 Codebeispiel (NestJS)
```ts
async updateWebhook(extensionId: string, webhookId: string, updateData: any) {
  try {
    const response = await this.api.extensionsControllerUpdateWebhook(extensionId, webhookId, updateData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Aktualisieren des Webhooks: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "url": "https://neue-webhook-url.com"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X PATCH "http://localhost:3000/chaster/extensions/12345/webhooks/1" -H "Content-Type: application/json" -d @update.json
```

---

## 🔹 15. Webhook löschen (`DELETE /api/extensions/{extensionId}/webhooks/{webhookId}`)
### 📌 Beschreibung
Löscht einen bestimmten Webhook.

### 📂 Codebeispiel (NestJS)
```ts
async deleteWebhook(extensionId: string, webhookId: string) {
  try {
    await this.api.extensionsControllerDeleteWebhook(extensionId, webhookId);
    return { message: "Webhook erfolgreich gelöscht" };
  } catch (error) {
    throw new Error(`Fehler beim Löschen des Webhooks: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X DELETE "http://localhost:3000/chaster/extensions/12345/webhooks/1"
```

---

## 🔹 16. Sitzung suchen (`POST /api/extensions/sessions/search`)
### 📌 Beschreibung
Sucht nach aktiven Sitzungen basierend auf Suchkriterien.

### 📂 Codebeispiel (NestJS)
```ts
async searchSessions(searchCriteria: any) {
  try {
    const response = await this.api.extensionsControllerSearchSessions(searchCriteria);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler bei der Sitzungssuche: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "status": "active"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/sessions/search" -H "Content-Type: application/json" -d @search.json
```

---

## 🔹 17. Sitzung abrufen (`GET /api/extensions/sessions/{sessionId}`)
### 📌 Beschreibung
Holt die Details einer bestimmten Sitzung.

### 📂 Codebeispiel (NestJS)
```ts
async getSessionById(sessionId: string) {
  try {
    const response = await this.api.extensionsControllerGetSessionById(sessionId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Sitzung: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X GET "http://localhost:3000/chaster/extensions/sessions/12345"
```

---

## 🔹 18. Sitzung aktualisieren (`PATCH /api/extensions/sessions/{sessionId}`)
### 📌 Beschreibung
Aktualisiert den Status oder andere Attribute einer Sitzung.

### 📂 Codebeispiel (NestJS)
```ts
async updateSession(sessionId: string, updateData: any) {
  try {
    const response = await this.api.extensionsControllerUpdateSession(sessionId, updateData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Aktualisieren der Sitzung: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "status": "completed"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X PATCH "http://localhost:3000/chaster/extensions/sessions/12345" -H "Content-Type: application/json" -d @update.json
```

---

## 🔹 19. Sitzungshistorie abrufen (`POST /api/extensions/sessions/{sessionId}/logs/search`)
### 📌 Beschreibung
Holt die Logs einer bestimmten Sitzung.

### 📂 Codebeispiel (NestJS)
```ts
async getSessionLogs(sessionId: string) {
  try {
    const response = await this.api.extensionsControllerGetSessionLogs(sessionId);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Abrufen der Sitzungsprotokolle: ${error.message}`);
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/sessions/12345/logs/search"
```

---

## 🔹 20. Eigene Logs zur Sitzung hinzufügen (`POST /api/extensions/sessions/{sessionId}/logs/custom`)
### 📌 Beschreibung
Fügt ein benutzerdefiniertes Log zu einer bestimmten Sitzung hinzu.

### 📂 Codebeispiel (NestJS)
```ts
async addCustomLog(sessionId: string, logData: any) {
  try {
    const response = await this.api.extensionsControllerAddCustomLog(sessionId, logData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Hinzufügen des benutzerdefinierten Logs: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "message": "Benutzer hat die Aufgabe abgeschlossen",
  "timestamp": "2024-02-17T12:00:00Z"
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/sessions/12345/logs/custom" -H "Content-Type: application/json" -d @log.json
```

---

## 🔹 21. Reguläre Aktion innerhalb einer Sitzung ausführen (`POST /api/extensions/sessions/{sessionId}/regular-actions`)
### 📌 Beschreibung
Führt eine reguläre Aktion in einer Sitzung aus, z. B. das Zurücksetzen eines Timers.

### 📂 Codebeispiel (NestJS)
```ts
async performRegularAction(sessionId: string, actionData: any) {
  try {
    const response = await this.api.extensionsControllerPerformRegularAction(sessionId, actionData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Ausführen der regelmäßigen Aktion: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "actionType": "resetTimer",
  "parameters": {
    "newTime": 300
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/sessions/12345/regular-actions" -H "Content-Type: application/json" -d @regular-action.json
```

---

---

## 🔹 22. Sitzung regelmäßige Aktionen (`POST /api/extensions/sessions/{sessionId}/regular-actions`)
### 📌 Beschreibung
Führt eine regelmäßige Aktion innerhalb einer Sitzung aus.

### 📂 Codebeispiel (NestJS)
```ts
async performRegularAction(sessionId: string, actionData: any) {
  try {
    const response = await this.api.extensionsControllerPerformRegularAction(sessionId, actionData);
    return response.data;
  } catch (error) {
    throw new Error(`Fehler beim Ausführen der regelmäßigen Aktion: ${error.message}`);
  }
}
```

### 🔧 Beispiel-Daten (`JSON`)
```json
{
  "actionType": "resetTimer",
  "parameters": {
    "newTime": 300
  }
}
```

### 🛠️ Beispiel-Anfrage (cURL)
```sh
curl -X POST "http://localhost:3000/chaster/extensions/sessions/12345/regular-actions" -H "Content-Type: application/json" -d @regular-action.json
```

---

## 🎯 Fazit
Diese Dokumentation enthält alle **22 Endpunkte** der **Chaster Extensions API** mit vollständigen Codebeispielen für **NestJS**.
Falls du weitere Methoden oder Erklärungen brauchst, lass es mich wissen! 🚀

