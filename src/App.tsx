import './App.css'
import Header from "@/components/features/header.tsx";
import ProductionStatusLayout from "@/components/layouts/production-status-layout.tsx";
import {ThemeProvider} from "@/components/features/theme-provider.tsx";

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="moki-ui-theme">
      <div className="min-h-screen flex-flex-col">
        <Header/>
        <main className="flex-grow w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
          <ProductionStatusLayout />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
