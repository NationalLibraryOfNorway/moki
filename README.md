# Moki
Verktøy for batch-oppslag av objekter i produksjonsløype.

## Lokalt oppsett
For at applikasjonen skal fungere trengs tilkobling mot PAPI. Opprett en environment fil fra eksempelet slik:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```
Erstatt verdiene i `environment.ts` med de riktige verdiene for ditt lokale oppsett.
Bytt også target i proxy.conf.ts som matcher URL for PAPI satt i environment.

For å kjøre prosjektet lokalt, kjør følgende kommandoer:
```bash
npm install
npm start
```

Tester kan kjøres med:
`npm test` eller `npm run test:ci` for headless tester.
