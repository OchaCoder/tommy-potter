"use client"

import { useEffect, useState } from "react"
import { IconDarkMode, IconLightMode } from "../__c_utils__svg"

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || prefersDark) {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <>
      {isDark ? (
        <>
          <button aria-label="Toggle light mode" className="cursor-pointer" onClick={toggleTheme}>
            <IconLightMode size={35} fill={"white"} />
          </button>
        </>
      ) : (
        <>
          <button aria-label="Toggle dark mode" className="cursor-pointer" onClick={toggleTheme}>
            <IconDarkMode size={35} fill={"black"} />
          </button>
        </>
      )}
    </>
  )
}
