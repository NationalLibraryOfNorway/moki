'use client';

import {Button} from "@/components/ui/button";
import {LuMoon, LuSun} from "react-icons/lu";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function ThemeToggler() {
  const {theme, setTheme} = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prevents hydration mismatch
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      onClick={() => {setTheme(theme === 'dark' ? 'light' : 'dark')}}
      className="rounded-full size-10 flex items-center justify-center">
      {theme === 'dark' ? <LuSun style={{ width: '24px', height: '24px' }} /> : <LuMoon style={{ width: '24px', height: '24px' }} />}
    </Button>
  );
}