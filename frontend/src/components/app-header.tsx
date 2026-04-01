import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"

import {
    Button
} from "@/components/ui/button"

export function AppHeader() {
    return (
          <header className="w-full bg-background px-4 py-2 flex items-center relative z-20 md:pl-[5rem] ml-8 mt-2 flex">
            <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex-1">
                <span className="font-bold text-2xl">Team Name</span>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div className="font-bold ml-4 border-l border-text-primary p-4">1st April 2026</div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button>Continue</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
    )
}