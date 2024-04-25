"use client"

import React, { useState } from "react";
import DeleteUser from "./deleteUser"
import { Label } from "@/components/ui/label"
import { getUserData } from "@/lib/data"
import { prisma } from "../../../../lib/PrismaClient";
import { json } from "stream/consumers";

export default function AccountForm() {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const updateUser = async () => {
        const response = await fetch("/api/auth", {
            method: "PUT",
            body: JSON.stringify({ email, username })
        });
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        // const user = await getUserData();
        // updateUser();
    }
  return (
    <div>
          <Label>Usernames</Label>
          <div className="mb-3">
              <form onSubmit={handleSubmit}>
                  <br></br>
                  <h4>Enter Your League of Legends Username</h4>
                  <br />
                  <input
                      type="text"
                      defaultValue="username#tag"
                      className="htmlForm-control"
                      id="username"
                   onChange={handleUsernameChange}
                  />
                  <br />
                  <h4>Enter your email</h4>
                  <br />
                  <input
                      type="text"
                      className="htmlForm-control"
                      id="email"
                      onChange={handleEmailChange}
                  />
                  <br />
                  <br></br>
                  <button type="submit" className="btn btn-primary">
                      Submit
                  </button>
              </form>
          </div>
      <div className="pt-5">
      </div>
      <div className="pt-5">
        <DeleteUser />
      </div>
    </div >
  )
}
