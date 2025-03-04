# Moki
Verktøy for batch-oppslag av objekter i produksjonsløype.

## Lokalt oppsett
For at applikasjonen skal fungere trengs tilkobling mot PAPI.
Proxy er satt opp i `next.config.ts` og henter API-sti fra miljøvariabler.
Miljøvariabler for lokal utvikling kan settes i en `.env.local`-fil i rotnivå på prosjektet.
Filen er ekskludert fra git og må opprettes manuelt, f.eks. slik:
```bash
cp .env .env.local
```
Deretter kan du manuelt substituere verdiene.

| Variabel                 | Beskrivelse                             |
|--------------------------|-----------------------------------------|
| NEXT_PUBLIC_BASE_PATH    | Base path til applikasjonen, e.g. /moki |
| NEXT_PUBLIC_RELATION_URL | URL til relation frontend               |
| API_URL                  | URL til PAPI                            |


### Kjør prosjektet
For å kjøre prosjektet lokalt, kjør følgende kommandoer:
```bash
npm install
npm run dev
```

## Shadcn - installere komponenter
Prosjektet bruker shadcn. Komponenter installert via CLI vil bli lagt til i `src/components/ui/shadcn`-mappen.
Se [shadcn](https://ui.shadcn.com/docs/installation/next) for informasjon om hvordan man installerer komponenter for Next.js.
