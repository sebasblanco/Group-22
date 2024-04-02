"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../components/ui/navigation-menu"

// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

export function PagesDropDown() {
  return (
    <div className="flex">
      <NavigationMenu>
        <NavigationMenuList>

        <NavigationMenuItem>
            <Link href="/integrations" legacyBehavior passHref>
              <NavigationMenuLink className="group inline-flex h-10 w-max dark:bg-transparent dark:hover:bg-secondary items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                Features
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <Link href="/integrations" legacyBehavior passHref>
              <NavigationMenuLink className="group inline-flex h-10 w-max dark:bg-transparent dark:hover:bg-secondary items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                Integrations
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>



        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-semibold dark:bg-transparent dark:hover:bg-secondary">About</NavigationMenuTrigger>
            <NavigationMenuContent >
              <ul className="grid gap-3 p-4 w-[200px] ">
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <p className="text-md font-medium leading-none">Our Story</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/about#careers" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <p className="text-md font-medium leading-none">Careers</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/about#contact" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <p className="text-md font-medium leading-none">Contact</p>
                  </NavigationMenuLink>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div >


  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>

          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const ListItem2 = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">{title}</div>

        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem2.displayName = "ListItem2"
