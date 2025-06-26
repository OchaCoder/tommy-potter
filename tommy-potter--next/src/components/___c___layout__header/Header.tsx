// /app/components/___c___layout__header/Header.tsx
"use client"

import { useState } from "react"
import { IconClose, IconMenu } from "../__c_utils__svg"
import DarkMode from "./DarkMode"
import Logo from "./Logo"
import MenuItem from "./MenuItem"

export default function Header() {
  const [mMenu, setMMenu] = useState(false)
  return (
    <>
      {/* <div className="bg-neutral-800 h-8 flex justify-center items-center text-white">Welcome to tommy-potter✨🫶🏻🌸</div> */}

      <header className="shadow-md">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex hidden md:flex justify-between items-center py-3">
            <Logo />

            <ul className="flex justify-around grow">
              <MenuItem url={`/#about`} title={`About`} aTag={false} />
              <MenuItem url={`/#blog`} title={`Blog`} aTag={false} />
              <MenuItem url={`/#collection`} title={`Collection`} aTag={false} />
              <MenuItem url={`https://ocha-auth-pro.ochacoder.com`} title={`OchaAuthPro`} aTag={true} />
            </ul>

            <DarkMode />
          </div>

          <div className="md:hidden flex justify-between items-center h-12 px-3">
            <button className="bg-black border-width-2 rounded-full cursor-pointer" onClick={() => setMMenu(!mMenu)}>
              <IconMenu size={36} />
            </button>
            <Logo />
            <DarkMode />
          </div>

          {/* Mobile Menu */}
          <div className={`z-4 ${mMenu ? "block" : "hidden"} fixed w-screen h-screen top-0`} onClick={() => setMMenu(!mMenu)}></div>
          <div className={`z-5 transform-gpu ${mMenu ? "-translate-x-0" : "-translate-x-200"} transition-transform duration-550 fixed top-0 bg-neutral-800 left-0 h-full w-90 p-10`}>
            <ul className=" ">
              <div className="cursor-pointer absolute right-0 pr-5" onClick={() => setMMenu(!mMenu)}>
                <IconClose size={36} />
              </div>
              <div className="grid gap-8 py-10 text-white">
                <div onClick={() => setMMenu(!mMenu)}>
                  <MenuItem url={`/#about`} title={`About`} aTag={false} />
                </div>
                <div onClick={() => setMMenu(!mMenu)}>
                  <MenuItem url={`/#blog`} title={`Blog`} aTag={false} />
                </div>
                <div onClick={() => setMMenu(!mMenu)}>
                  <MenuItem url={`/#collection`} title={`Collection`} aTag={false} />
                </div>
                <div onClick={() => setMMenu(!mMenu)}>
                  <MenuItem url={`https://ocha-auth-pro.ochacoder.com`} title={`OchaAuthPro`} aTag={true} />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
