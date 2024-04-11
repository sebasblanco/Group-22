'use client'

import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react"

export default function SignOutButton() {
    return (
        <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
}