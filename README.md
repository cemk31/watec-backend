# WATEC Project Backend

## **Überblick**
Das Backend des WATEC-Projekts bietet die logische Grundlage für die Verwaltung und Verarbeitung von Bestellungen eines Trinkwasserprüfunternehmens.

Mit dem Backend können:
- Bestellungen in der Datenbank gespeichert und bearbeitet werden.
- Die Daten mit dem externen Unternehmen **ista** synchronisiert werden.

Es wurde mit NestJS entwickelt und verwendet Prisma als ORM für die PostgreSQL-Datenbank.

---

## **Technologien**
- **Framework**: NestJS
- **Script**: Typescript
- **Datenbank**: PostgreSQL
- **ORM**: Prisma

---

---

### **Schritte zur Einrichtung**
1. **Abhängigkeiten installieren**  
   Klone das Repository und navigiere in den Frontend-Ordner. Installiere dann die notwendigen Pakete mit:
   ```bash
   git clone <REPO_URL>
   cd <FRONTEND_FOLDER>
   npm install
   
2. **Umgebungsvariablen konfigurieren Passe die .env-Datei an, um die Verbindungsdaten zur Datenbank und andere Konfigurationen zu definieren:**
    ```bash
    DATABASE_URL=postgres://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>
    JWT_SECRET=super-secret
    SOAP_URL=http://example-soap-url.com

3. **Prisma-Migrationen ausführen**
   ```bash
   npx prisma migrate dev
   
4. **Prisma Studio starten (zum Visualisieren und Bearbeiten der Datenbank):**
   ```bash
   npx prisma studio

5. **Server starten starte den lokalen Entwicklungsserver mit:**
   ```bash
   npm run start:dev
