"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { ArrowRightIcon, CalendarIcon, DoorClosedIcon, PersonStandingIcon, RocketIcon, ScanFaceIcon, Settings } from "lucide-react"
import { SearchHeader } from "./searchHeader"
import Link from "next/link"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  React.useEffect(() => {
    const handleFocus = (event: FocusEvent) => {

      setTimeout(() => setOpen(true), 0)
      //
      setOpen(true);
    }
    const handleBlur = (event: FocusEvent) => {
      const relatedTarget = event.relatedTarget as HTMLElement;
      // Close only if the related target is not the command dialog or input
      // console.log(relatedTarget)
      // console.log(searchInputRef.current?.contains(relatedTarget))
      if (!relatedTarget || !searchInputRef.current?.contains(relatedTarget)) {
        // console.log("yse")
        setOpen(false);
      }
    }

    const input = searchInputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
    };
  }, [searchInputRef]);

  return (
    <>
      <SearchHeader ref={searchInputRef} />
      <CommandDialog open={open} onOpenChange={setOpen} >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <ScanFaceIcon className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <PersonStandingIcon className="mr-2 h-4 w-4" />
              <Link href="/" onClick={() => setOpen(false)}><span>Profile</span>
              </Link>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <DoorClosedIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

