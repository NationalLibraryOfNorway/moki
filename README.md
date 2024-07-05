# Moki
Verktøy for batch-oppslag av objekter i produksjonsløype.

## Lokalt oppsett
For at applikasjonen skal fungere trengs tilkobling mot PAPI. I filen `src/proxy.conf.json` må du sette target til domenet hvor PAPI kjører.

For å kjøre prosjektet lokalt, kjør følgende kommandoer:
```bash
npm install
npm start
```

Tester kan kjøres med:
`npm test` eller `npm run test:ci` for headless tester.
