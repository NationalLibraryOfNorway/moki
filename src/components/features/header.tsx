import {Button} from "@/components/ui/button.tsx";
import {LuMoon, LuSun} from "react-icons/lu";
import {useTheme} from "@/components/features/theme-provider.tsx";
import {HelpDialog} from "@/components/features/help-dialog.tsx";


export default function Header() {
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-5 backdrop-blur-md shadow-md">
        <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Moki</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li className="flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="rounded-full w-10 h-10 flex items-center justify-center">
                    {theme === 'dark' ? <LuSun style={{ width: '24px', height: '24px' }} /> : <LuMoon style={{ width: '24px', height: '24px' }} />}
                  </Button>
                  <HelpDialog
                    title="Brukerveiledning for Moki"
                    body={
                      <>
                        <h3 className="text-lg my-2.5">Slik bruker du Moki</h3>
                        <p className="mb-5">I Moki kan du gjøre oppslag på URN eller DokID for å se status på objekter i produksjonsløypen.</p>

                        <p className="my-5">
                          For bøker kan du søke både med og uten digibok_-prefiksen.
                          For eksempel vil begge disse søkene gi samme resultat: digibok_2010010400001 og 2010010400001.
                        </p>

                        <p className="my-5">
                          For batch-oppslag brukes linjeskift for å skille mellom ulike IDer.
                          Bruk
                          <span className=" font-mono mx-0.5 bg-gray-200 border border-gray-300 dark:text-gray-700 rounded px-1 py-0.5">ctrl</span>+
                          <span className=" font-mono mx-0.5 bg-gray-200 border border-gray-300 dark:text-gray-700 rounded px-1 py-0.5">Enter</span>
                          for å søke mens markøren er i tekstfeltet, eller trykk på Søk-knappen.
                        </p>

                        <p className="my-5">
                          Bøker er klare dersom de er sendt til bevaring, og indikeres med en tommel opp.
                          Tidsskriftpermer vises som klare dersom alle heftene er sendt til bevaring.
                          Om en bok eller et tidsskrift ikke er klar vises en tommel ned.
                          Objekter som verken er bøker eller tidsskrift viser ikke noen indikasjon på om de er klare.
                        </p>

                        <p className="my-2.5">
                          For mer detaljert info om et objekt kan du klikke på det i listen og få utvidet informasjon om hendelser og status.
                        </p>

                        <h3 className="text-lg mb-2.5">Videre hjelp</h3>
                        <p className="my-2.5">Denne applikasjonen vedlikeholdes av team tekst, ta kontakt ved behov.</p>
                      </>
                    }
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-20"></div>
    </>
  )
}