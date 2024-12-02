import {Button} from "@/components/ui/button.tsx";
import {LuMoon, LuSun} from "react-icons/lu";
import {useTheme} from "@/components/features/theme-provider.tsx";


export default function Header() {
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-5 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Moki</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Button onClick={toggleTheme}
                    className="rounded-full w-10 h-10 flex items-center justify-center">
                    {theme === 'dark' ? <LuMoon size={24}/> : <LuSun size={24}/>}
                  </Button>
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