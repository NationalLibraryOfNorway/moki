# Moki
Verktøy for batch-oppslag av objekter i produksjonsløype.

## Lokalt oppsett
For at applikasjonen skal fungere trengs tilkobling mot PAPI.
Proxy er satt opp i `next.config.ts` og henter API-sti fra miljøvariabler.

| Variabel                 | Beskrivelse                             |
|--------------------------|-----------------------------------------|
| NEXT_PUBLIC_BASE_PATH    | Base path til applikasjonen, e.g. /moki |
| NEXT_PUBLIC_RELATION_URL | URL til relation frontend               |
| API_URL                  | URL til PAPI                            |


For å kjøre prosjektet lokalt, kjør følgende kommandoer:
```bash
npm install
npm run dev
```

## Shadcn - installere komponenter
Prosjektet bruker shadcn. Komponenter installert via CLI vil bli lagt til i `src/components/ui/shadcn`-mappen.
Se [shadcn](https://ui.shadcn.com/docs/installation/next) for informasjon om hvordan man installerer komponenter for Next.js.
