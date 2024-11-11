"use client"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import newLogo from "@/../public/imgs/logo.png"
import { Button } from "@/_components/ui/button"

type NavbarProps = {
  links: string[]
}


export default function Navbar({ links }: NavbarProps) {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setOpen(false)
      }
    })
  }, [])

  return (
    <header
      className={`flex py-[1.6rem] mx-auto md:justify-around justify-between items-center w-full md:px-8 px-4 bg-dark-green-15 `}
    >
      <Link
        href="/"
        aria-describedby="open home page"
        aria-label="open home page"
        aria-controls="navbar-default"
        aria-expanded="false"
        className="flex lg:gap-5 md:gap3 gap-2 items-center"
      >
        <Image src={newLogo} width={50} height={75} alt="logo" priority />
      </Link>
      <NavigationMenu className={`ml-auto items-center justify-between hidden gap-2 md:flex`}>
        <NavigationMenuList className="items-center justify-between hidden gap-2 md:flex">

          {links.map((link) => (
            <NavigationMenuItem key={link}>
              <Link href={`/${link.toLowerCase() === "home" ? "/" : link.toLowerCase()}`} legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:bg-transparent bg-transparent hover:text-light-green-70 text-white`}>
                  {link}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button asChild className="bg-light-green-70 hidden md:inline-flex hover:bg-transparent ml-2 hover:border-light-green-70 hover:text-light-green-70 border border-transparent transition-colors duration-300 text-grey-15 font-semibold text-sm" variant={"ghost"}>
        <Link href="/contact">
          Contact Us
        </Link>
      </Button>

      {/* Nav for small screens */}
      <div className={`flex items-center gap-3 justify-between h-full md:hidden rounded-xl`}>
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger aria-controls="2" aria-labelledby="open menu button" asChild>
            <Button className="group inline-flex w-12 h-12 text-light-green-70 py-1 px-2 md:hidden text-center items-center justify-center rounded shadow-[0_1px_0_theme(colors.slate.950/.04),0_1px_2px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] hover:shadow-[0_1px_0_theme(colors.slate.950/.04),0_4px_8px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] transition"
              aria-pressed={open}
              onClick={() => setOpen(!open)}
              aria-describedby="open main menu"
              aria-label="open menu"
              data-collapse-toggle="navbar-default"
              type="button"
              aria-controls="navbar-default"
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              <svg className="!w-6 !h-6 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect className="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]" y="7" width="9" height="2" rx="1"></rect>
                <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45" y="7" width="16" height="2" rx="1"></rect>
                <rect className="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]" y="7" width="9" height="2" rx="1"></rect>
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="relative w-screen  top-5 border-none rounded-t-none bg-dark-green-15 ">
            <div className="flex flex-col items-center mx-auto gap-4">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col items-center justify-center gap-2">
                  {links.map((link) => (
                    <NavigationMenuItem key={link} >
                      <Link href={`/${link.toLowerCase() === "home" ? "/" : link.toLowerCase()}`} legacyBehavior passHref>
                        <NavigationMenuLink
                          onClick={() => setOpen(false)}
                          className={`${navigationMenuTriggerStyle()} hover:bg-transparent bg-transparent hover:text-light-green-70 text-white`}
                        >
                          {link}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <Button asChild className="bg-light-green-70 w-full md:hidden inline-flex hover:bg-transparent ml-2 hover:border-light-green-70 hover:text-light-green-70 border border-transparent transition-colors duration-300 text-grey-15 font-semibold text-sm" variant={"ghost"}>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
