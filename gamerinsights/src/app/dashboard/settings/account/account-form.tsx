"use client"

import DeleteUser from "./deleteUser"
import { Label } from "@/components/ui/label"


export default function AccountForm() {
  return (
    <div>
      <Label>Usernames</Label>
      <div className="pt-5">
      </div>
      <div className="pt-5">
        <DeleteUser />
      </div>
    </div >
  )
}
