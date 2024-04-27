import { Separator } from "@/components/ui/separator";
import FullNav from "../../components/FullNav";
import SettingsProfilePage from "./profile-form";
import { SidebarNav } from "../components/sidebar-nav";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
  },
];

export default function ProfilePage() {
  return (
    <div>
      <FullNav />
      <div className=" space-y-4 p-8 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Settings
          </h2>
          <p className="text-white">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <SettingsProfilePage />
          </div>
        </div>
      </div>
    </div>
  );
}
